import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { scrollState } from '../three/scrollState'

gsap.registerPlugin(ScrollTrigger)

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function useScrollFunnel() {
  const [stage, setStage] = useState(0)
  const [stickyVisible, setStickyVisible] = useState(false)
  const journeyRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    const journey = journeyRef.current
    if (!journey) return

    const reduced = prefersReducedMotion()

    if (reduced) {
      Object.assign(scrollState, {
        progress: 0.15,
        cameraAngle: 0.62,
        cameraRadius: 6.4,
        cameraHeight: 1.45,
        carYaw: 0.55,
        carPitch: 0,
        carLift: 0,
        headlightIntensity: 0.8,
        accentGlow: 0.55,
        wheelSpin: 0,
        stage: 0,
        canvasOpacity: 0,
      })
      setStage(0)
    }

    const ctx = gsap.context(() => {
      if (!reduced) {
        const proxy = {
          progress: 0,
          cameraAngle: 0.62,
          cameraRadius: 6.4,
          cameraHeight: 1.45,
          carYaw: 0.55,
          carPitch: 0.02,
          carLift: 0,
          headlightIntensity: 0.7,
          accentGlow: 0.5,
          wheelSpin: 0,
          stage: 0,
        }

        const apply = () => {
          Object.assign(scrollState, {
            ...proxy,
            canvasOpacity: scrollState.canvasOpacity,
          })
          setStage(Math.min(3, Math.max(0, Math.round(proxy.stage))))
        }

        // Journey scrub: orbit + feature stages (more expressive path)
        gsap
          .timeline({
            scrollTrigger: {
              trigger: journey,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.85,
            },
          })
          // Form — low front three-quarter
          .to(proxy, {
            progress: 0.25,
            cameraAngle: Math.PI * 0.62,
            cameraRadius: 6.9,
            cameraHeight: 1.55,
            carYaw: 0.35,
            carPitch: 0.04,
            carLift: 0.04,
            headlightIntensity: 0.85,
            accentGlow: 0.55,
            wheelSpin: Math.PI * 1.6,
            stage: 0,
            duration: 1,
            ease: 'none',
            onUpdate: apply,
          })
          // Range — long side profile pull-back
          .to(proxy, {
            progress: 0.5,
            cameraAngle: Math.PI * 1.05,
            cameraRadius: 8.1,
            cameraHeight: 1.15,
            carYaw: -0.08,
            carPitch: -0.02,
            carLift: 0,
            headlightIntensity: 1,
            accentGlow: 0.75,
            wheelSpin: Math.PI * 3.4,
            stage: 1,
            duration: 1,
            ease: 'none',
            onUpdate: apply,
          })
          // Charge — rear three-quarter dive
          .to(proxy, {
            progress: 0.75,
            cameraAngle: Math.PI * 1.42,
            cameraRadius: 5.8,
            cameraHeight: 1.05,
            carYaw: -0.28,
            carPitch: 0.06,
            carLift: 0.06,
            headlightIntensity: 1.25,
            accentGlow: 0.9,
            wheelSpin: Math.PI * 5.2,
            stage: 2,
            duration: 1,
            ease: 'none',
            onUpdate: apply,
          })
          // Drive — close nose detail
          .to(proxy, {
            progress: 1,
            cameraAngle: Math.PI * 1.88,
            cameraRadius: 4.6,
            cameraHeight: 0.95,
            carYaw: 0.42,
            carPitch: 0.08,
            carLift: 0.02,
            headlightIntensity: 1.55,
            accentGlow: 1,
            wheelSpin: Math.PI * 7.5,
            stage: 3,
            duration: 1,
            ease: 'none',
            onUpdate: apply,
          })

        ScrollTrigger.create({
          trigger: document.documentElement,
          start: 'top top',
          endTrigger: journey,
          end: 'top top',
          scrub: 0.45,
          onUpdate: (self) => {
            const t = self.progress
            scrollState.cameraAngle = 0.62 + t * 0.1
            scrollState.carYaw = 0.55 - t * 0.12
            scrollState.headlightIntensity = 0.7 + t * 0.2
            // Keep 3D hidden through hero photo; fade in toward journey
            scrollState.canvasOpacity = Math.min(1, t * 1.35)
          },
        })
      }

      // Hero photo owns first viewport — 3D stays off
      ScrollTrigger.create({
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        onEnter: () => {
          scrollState.canvasOpacity = 0
        },
        onEnterBack: () => {
          scrollState.canvasOpacity = 0
        },
        onLeave: () => {
          scrollState.canvasOpacity = 1
        },
      })

      ScrollTrigger.create({
        trigger: '#proof',
        start: 'top 70%',
        end: 'top 15%',
        scrub: true,
        onUpdate: (self) => {
          scrollState.canvasOpacity = 1 - self.progress * 0.7
        },
        onLeaveBack: () => {
          scrollState.canvasOpacity = 1
        },
      })

      // Keep car fully visible through finish picker
      ScrollTrigger.create({
        trigger: '#finish',
        start: 'top bottom',
        end: 'bottom top',
        onEnter: () => {
          scrollState.canvasOpacity = 1
        },
        onEnterBack: () => {
          scrollState.canvasOpacity = 1
        },
      })

      ScrollTrigger.create({
        trigger: '#hero',
        start: 'top bottom',
        end: 'bottom top',
        onLeaveBack: () => {
          scrollState.canvasOpacity = 0
        },
      })

      ScrollTrigger.create({
        trigger: '#hero',
        start: 'bottom top',
        onEnter: () => setStickyVisible(true),
        onLeaveBack: () => setStickyVisible(false),
      })

      ScrollTrigger.create({
        trigger: '#close',
        start: 'top 85%',
        onEnter: () => setStickyVisible(false),
        onLeaveBack: () => setStickyVisible(true),
      })
    })

    return () => ctx.revert()
  }, [])

  return { stage, stickyVisible, journeyRef }
}
