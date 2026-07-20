import { useReveal } from '../hooks/useReveal'

const FEATURES = [
  { label: 'Cabin', value: 'Whisper quiet', note: 'Double-glazed front glass' },
  { label: 'Display', value: '15.6″', note: 'Floating center canvas' },
  { label: 'Seats', value: 'Nappa-soft', note: 'Ventilated front pair' },
  { label: 'Sound', value: '12-speaker', note: 'Studio-tuned surround' },
] as const

const INTERIOR_SHOTS = [
  {
    src: '/images/gallery/interior-ambient.jpg',
    alt: 'Soft ambient cabin with warm materials',
    caption: 'Whisper-quiet cabin',
  },
  {
    src: '/images/gallery/interior-display.jpg',
    alt: '15.6 inch floating center display',
    caption: '15.6″ horizon display',
  },
  {
    src: '/images/gallery/interior-seats.jpg',
    alt: 'Nappa-soft ventilated front seats',
    caption: 'Nappa-soft seats',
  },
  {
    src: '/images/gallery/interior-dash.jpg',
    alt: 'Driver cockpit with surround speakers',
    caption: 'Studio-tuned cockpit',
  },
] as const

export function Cabin() {
  const ref = useReveal<HTMLElement>()

  return (
    <section className="section cabin" id="cabin" ref={ref} aria-labelledby="cabin-title">
      <p className="section-kicker" data-reveal>
        Interior
      </p>
      <h2 id="cabin-title" data-reveal>
        A sanctuary on four wheels.
      </h2>
      <p className="section-lead" data-reveal>
        Soft ambient ribbons, warm materials, and a horizon-wide screen — the cabin is where
        the commute becomes the calmest part of the day.
      </p>

      <div className="cabin-visuals">
        {INTERIOR_SHOTS.map((shot) => (
          <figure key={shot.caption} className="cabin-shot" data-reveal>
            <img
              src={shot.src}
              alt={shot.alt}
              loading="lazy"
              decoding="async"
              data-parallax="10"
            />
            <figcaption>{shot.caption}</figcaption>
          </figure>
        ))}
      </div>

      <div className="cabin-grid">
        {FEATURES.map((f) => (
          <article key={f.label} className="cabin-item" data-reveal>
            <p className="cabin-label">{f.label}</p>
            <p className="cabin-value">{f.value}</p>
            <p className="cabin-note">{f.note}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
