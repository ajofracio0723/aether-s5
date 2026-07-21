import type { CSSProperties } from 'react'
import { useReveal } from '../hooks/useReveal'

/** Each src is unique across the whole site (not reused in Compare/Craft/Desire/Cabin). */
const SHOTS = [
  {
    src: '/images/gallery/shot-white.jpg?v=2',
    alt: 'Seal 5 Dynamic as an Xpress EV taxi on the street',
    caption: 'City duty',
    span: 'gallery-item--wide',
  },
  {
    src: '/images/gallery/shot-dynamic1.jpg?v=2',
    alt: 'Seal 5 Premium Harbour Grey three-quarter',
    caption: 'Harbour Grey',
    span: '',
  },
  {
    src: '/images/gallery/shot-dynamic5.jpg?v=2',
    alt: 'Seal 5 Dynamic close front detail',
    caption: 'Nose detail',
    span: '',
  },
  {
    src: '/images/gallery/shot-hg-rear.jpg?v=2',
    alt: 'Seal 5 Dynamic Harbour Grey rear three-quarter',
    caption: 'Tail light',
    span: '',
  },
  {
    src: '/images/gallery/shot-2026a.jpg?v=2',
    alt: 'Seal 5 Xpress EV taxi alternate street angle',
    caption: 'Street profile',
    span: 'gallery-item--wide',
  },
  {
    src: '/images/gallery/shot-2026b.jpg?v=2',
    alt: 'Seal 5 on a mall show floor with shoppers',
    caption: 'Show floor',
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
        Street, showroom, and detail — six different frames from the Seal 5 family.
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
