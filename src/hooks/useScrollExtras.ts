import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Extra page-wide scroll motions: hero, parallax images, proof counters. */
export function useScrollExtras() {
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      // Hero: photo drifts + content exits as you leave
      const heroMedia = document.querySelector('.hero-media img')
      const heroContent = document.querySelector('.hero-content')
      const heroScroll = document.querySelector('.hero-scroll')

      if (heroMedia) {
        gsap.to(heroMedia, {
          yPercent: 18,
          scale: 1.08,
          ease: 'none',
          scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      if (heroContent) {
        gsap.fromTo(
          heroContent.children,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            stagger: 0.12,
            ease: 'power3.out',
            delay: 0.15,
          },
        )

        gsap.to(heroContent, {
          y: -80,
          autoAlpha: 0.15,
          ease: 'none',
          scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      if (heroScroll) {
        gsap.to(heroScroll, {
          autoAlpha: 0,
          y: 24,
          ease: 'none',
          scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: '30% top',
            scrub: true,
          },
        })
      }

      // Parallax stills across gallery / cabin / desire / craft
      document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((img) => {
        const amount = Number(img.dataset.parallax || 12)
        gsap.fromTo(
          img,
          { yPercent: -amount * 0.35 },
          {
            yPercent: amount,
            ease: 'none',
            scrollTrigger: {
              trigger: img.closest('figure, .craft-shot, .desire-visual') || img,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      })

      // Gallery items: slight scrub scale as they pass mid-viewport
      document.querySelectorAll<HTMLElement>('.gallery-item').forEach((item) => {
        gsap.fromTo(
          item,
          { scale: 0.97 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top 95%',
              end: 'top 45%',
              scrub: true,
            },
          },
        )
      })

      // Proof stats: count up once
      document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
        const end = Number(el.dataset.count || 0)
        const decimals = Number(el.dataset.decimals || 0)
        const proxy = { val: 0 }
        gsap.to(proxy, {
          val: end,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
          onUpdate: () => {
            el.textContent = proxy.val.toFixed(decimals)
          },
        })
      })

      // Desire: copy slides opposite the photo
      const desireCopy = document.querySelector('.desire-copy')
      const desireVisual = document.querySelector('.desire-visual')
      if (desireCopy && desireVisual) {
        gsap.fromTo(
          desireCopy,
          { x: -24 },
          {
            x: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: '#desire',
              start: 'top 80%',
              end: 'center center',
              scrub: true,
            },
          },
        )
        gsap.fromTo(
          desireVisual,
          { x: 28, rotate: 1.2 },
          {
            x: 0,
            rotate: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: '#desire',
              start: 'top 80%',
              end: 'center center',
              scrub: true,
            },
          },
        )
      }

      // Offer shell: subtle lift-in scrub
      const offerShell = document.querySelector('.offer-shell')
      if (offerShell) {
        gsap.fromTo(
          offerShell,
          { y: 48, autoAlpha: 0.4 },
          {
            y: 0,
            autoAlpha: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '#offer',
              start: 'top 90%',
              end: 'top 45%',
              scrub: true,
            },
          },
        )
      }
    })

    return () => ctx.revert()
  }, [])
}
