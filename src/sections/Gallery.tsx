import type { CSSProperties } from 'react'
import { useReveal } from '../hooks/useReveal'

const SHOTS = [
  {
    src: '/images/gallery/exterior-front.jpg',
    alt: 'AETHER S5 front three-quarter view',
    caption: 'Front presence',
    span: 'gallery-item--wide',
  },
  {
    src: '/images/gallery/exterior-aero.jpg',
    alt: 'AETHER S5 fastback side and rear profile',
    caption: 'Fastback profile',
    span: '',
    pos: '40% 45%',
  },
  {
    src: '/images/gallery/detail-light.jpg',
    alt: 'AETHER S5 LED light blade detail',
    caption: 'Light blade detail',
    span: '',
  },
  {
    src: '/images/gallery/interior-cabin.jpg',
    alt: 'AETHER S5 quiet cabin',
    caption: 'Quiet cabin',
    span: 'gallery-item--tall',
  },
  {
    src: '/images/gallery/exterior-white-front.jpg',
    alt: 'AETHER S5 ready for the driveway',
    caption: 'Driveway arrival',
    span: 'gallery-item--wide',
    pos: '50% 40%',
  },
  {
    src: '/images/gallery/interior-display.jpg',
    alt: 'AETHER S5 horizon display',
    caption: 'Horizon display',
    span: '',
  },
  {
    src: '/images/gallery/detail-wheel.jpg',
    alt: 'AETHER S5 aero wheels',
    caption: '19″ aero wheels',
    span: '',
  },
  {
    src: '/images/gallery/exterior-white-rear.jpg',
    alt: 'AETHER S5 full-width tail light',
    caption: 'Tail signature',
    span: 'gallery-item--wide',
    pos: '55% 45%',
  },
  {
    src: '/images/gallery/interior-seats.jpg',
    alt: 'AETHER S5 ventilated front seats',
    caption: 'Nappa-soft seats',
    span: '',
  },
  {
    src: '/images/gallery/detail-handle.jpg',
    alt: 'AETHER S5 flush handle and charging port',
    caption: 'Hidden aero',
    span: '',
  },
] as const

export function Gallery() {
  const ref = useReveal<HTMLElement>()

  return (
    <section className="section gallery" id="gallery" ref={ref} aria-labelledby="gallery-title">
      <p className="section-kicker" data-reveal>
        Gallery
      </p>
      <h2 id="gallery-title" data-reveal>
        Built for the driveway. Ready for the week.
      </h2>
      <p className="section-lead" data-reveal>
        Exterior sculpture, cabin calm, and the details you notice every time you walk up to it.
      </p>
      <div className="gallery-grid">
        {SHOTS.map((shot) => (
          <figure
            key={shot.caption}
            className={`gallery-item ${shot.span}`}
            data-reveal
            style={'pos' in shot && shot.pos ? ({ '--pos': shot.pos } as CSSProperties) : undefined}
          >
            <img src={shot.src} alt={shot.alt} loading="lazy" decoding="async" />
            <figcaption>{shot.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
