import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type RevealKind = 'up' | 'left' | 'right' | 'scale' | 'clip'

function fromVars(kind: RevealKind) {
  switch (kind) {
    case 'left':
      return { autoAlpha: 0, x: -36, y: 0, scale: 1, rotate: 0 }
    case 'right':
      return { autoAlpha: 0, x: 36, y: 0, scale: 1, rotate: 0 }
    case 'scale':
      return { autoAlpha: 0, x: 0, y: 18, scale: 0.94, rotate: 0 }
    case 'clip':
      return { autoAlpha: 0, x: 0, y: 40, scale: 1, rotate: 0 }
    case 'up':
    default:
      return { autoAlpha: 0, x: 0, y: 32, scale: 1, rotate: 0 }
  }
}

/** Fade/slide children in as the section enters view. Use data-reveal="up|left|right|scale|clip". */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const targets = el.querySelectorAll<HTMLElement>('[data-reveal]')
    if (!targets.length) return

    const ctx = gsap.context(() => {
      targets.forEach((target, i) => {
        const kind = (target.dataset.reveal || 'up') as RevealKind
        const delay = Number(target.dataset.revealDelay || 0)
        gsap.fromTo(
          target,
          fromVars(kind),
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotate: 0,
            duration: kind === 'scale' ? 1.05 : 0.95,
            delay: delay + i * 0.04,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: target,
              start: 'top 88%',
              once: true,
            },
          },
        )
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return ref
}
