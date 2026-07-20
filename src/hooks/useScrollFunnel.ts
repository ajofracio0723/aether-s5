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

        // Journey scrub: orbit + feature stages
        gsap
          .timeline({
            scrollTrigger: {
              trigger: journey,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.7,
            },
          })
          // Form
          .to(proxy, {
            progress: 0.25,
            cameraAngle: Math.PI * 0.55,
            cameraRadius: 6.6,
            cameraHeight: 1.4,
            carYaw: 0.2,
            headlightIntensity: 0.7,
            accentGlow: 0.5,
            wheelSpin: Math.PI * 1.2,
            stage: 0,
            duration: 1,
            ease: 'none',
            onUpdate: apply,
          })
          // Range — side profile
          .to(proxy, {
            progress: 0.5,
            cameraAngle: Math.PI * 0.95,
            cameraRadius: 7.4,
            cameraHeight: 1.25,
            carYaw: 0,
            headlightIntensity: 0.9,
            accentGlow: 0.7,
            wheelSpin: Math.PI * 2.8,
            stage: 1,
            duration: 1,
            ease: 'none',
            onUpdate: apply,
          })
          // Charge — rear three-quarter
          .to(proxy, {
            progress: 0.75,
            cameraAngle: Math.PI * 1.35,
            cameraRadius: 6.2,
            cameraHeight: 1.35,
            carYaw: -0.15,
            headlightIntensity: 1.1,
            accentGlow: 0.85,
            wheelSpin: Math.PI * 4.2,
            stage: 2,
            duration: 1,
            ease: 'none',
            onUpdate: apply,
          })
          // Drive — closer detail
          .to(proxy, {
            progress: 1,
            cameraAngle: Math.PI * 1.75,
            cameraRadius: 5.2,
            cameraHeight: 1.1,
            carYaw: 0.25,
            headlightIntensity: 1.45,
            accentGlow: 1,
            wheelSpin: Math.PI * 6,
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
