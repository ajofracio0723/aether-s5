import { useReveal } from '../hooks/useReveal'

const FEATURES = [
  { label: 'Cabin', value: 'Whisper quiet', note: 'Double-glazed front glass' },
  { label: 'Display', value: '15.6″', note: 'Floating center canvas' },
  { label: 'Seats', value: 'Nappa-soft', note: 'Ventilated front pair' },
  { label: 'Sound', value: 'Premium audio', note: 'Multi-speaker surround' },
] as const

/** Interior stills — not reused elsewhere on the page. */
const INTERIOR_SHOTS = [
  {
    src: '/images/gallery/interior-cabin.jpg?v=3',
    alt: 'Seal 5 cabin with portrait touchscreen and digital cluster',
    caption: 'Digital cockpit',
    span: 'cabin-shot--wide',
  },
  {
    src: '/images/gallery/interior-sunroof.jpg?v=3',
    alt: 'Panoramic glass roof looking up through the cabin',
    caption: 'Panoramic roof',
    span: 'cabin-shot--wide',
  },
  {
    src: '/images/gallery/interior-console.jpg?v=3',
    alt: 'Center console with rotary gear selector and EV HEV modes',
    caption: 'Center console',
    span: '',
  },
  {
    src: '/images/gallery/interior-dash.jpg?v=3',
    alt: 'Driver instrument cluster showing range and tire status',
    caption: 'Driver display',
    span: '',
  },
  {
    src: '/images/gallery/interior-seats.jpg?v=3',
    alt: 'Front sport seats in cream and black',
    caption: 'Front seats',
    span: '',
  },
  {
    src: '/images/gallery/interior-rear.jpg?v=3',
    alt: 'Rear bench with cream upholstery and headrests',
    caption: 'Rear lounge',
    span: 'cabin-shot--wide',
  },
  {
    src: '/images/gallery/interior-rear-console.jpg?v=3',
    alt: 'Rear passenger air vents and USB ports',
    caption: 'Rear comfort',
    span: 'cabin-shot--wide',
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
          <figure key={shot.caption} className={`cabin-shot ${shot.span}`} data-reveal>
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
