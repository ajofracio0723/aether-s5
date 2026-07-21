import type { CSSProperties } from 'react'
import { useReveal } from '../hooks/useReveal'

/** Official Seal 5 stills — each src unique across the site. */
const SHOTS = [
  {
    src: '/images/gallery/shot-white.jpg?v=3',
    alt: 'Seal 5 DM-i front face outdoors',
    caption: 'Front face',
    span: 'gallery-item--wide',
  },
  {
    src: '/images/gallery/shot-dynamic1.jpg?v=3',
    alt: 'Seal 5 DM-i side profile',
    caption: 'Side profile',
    span: '',
  },
  {
    src: '/images/gallery/shot-dynamic5.jpg?v=3',
    alt: 'Seal 5 Super DM-i engine bay',
    caption: 'DM-i powertrain',
    span: '',
  },
  {
    src: '/images/gallery/shot-hg-rear.jpg?v=3',
    alt: 'Seal 5 Type 2 AC charging port',
    caption: 'Charge port',
    span: '',
  },
  {
    src: '/images/gallery/shot-2026a.jpg?v=3',
    alt: 'Portable EV charging cable kit in the trunk',
    caption: 'Charge kit',
    span: 'gallery-item--wide',
  },
  {
    src: '/images/gallery/shot-2026b.jpg?v=3',
    alt: 'Seal 5 open boot with cargo space',
    caption: 'Boot space',
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
        Exterior, powertrain, and charge — real Seal 5 frames from arrival to everyday use.
      </p>
      <div className="gallery-grid">
        {SHOTS.map((shot) => (
          <figure
            key={shot.caption}
            className={`gallery-item ${shot.span}`}
            data-reveal
            style={'pos' in shot && shot.pos ? ({ '--pos': shot.pos } as CSSProperties) : undefined}
          >
            <img
              src={shot.src}
              alt={shot.alt}
              loading="lazy"
              decoding="async"
              data-parallax="14"
            />
            <figcaption>{shot.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
