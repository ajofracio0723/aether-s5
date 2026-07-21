import { useReveal } from '../hooks/useReveal'

const ROWS = [
  {
    label: 'Front signature',
    note: 'Chrome Ocean grille → blacked-out 2027 face',
    classic: {
      src: '/images/gallery/classic/front.jpg',
      alt: 'Earlier Seal 5 chrome-slat front',
      caption: 'Earlier Seal 5',
    },
    next: {
      src: '/images/gallery/next/front.jpg',
      alt: 'BYD Seal 5 2027 front',
      caption: 'Seal 5 2027',
    },
  },
  {
    label: 'Side stance',
    note: 'Same fastback proportion, sharper lighting graphic',
    classic: {
      src: '/images/gallery/classic/side.jpg',
      alt: 'Earlier Seal 5 side and rear profile',
      caption: 'Earlier Seal 5',
    },
    next: {
      src: '/images/gallery/next/side.jpg',
      alt: 'BYD Seal 5 2027 side profile',
      caption: 'Seal 5 2027',
    },
  },
  {
    label: 'Driveway presence',
    note: 'From bright chrome theater to quieter blacked-out drama',
    classic: {
      src: '/images/gallery/classic/three-quarter.jpg',
      alt: 'Earlier Seal 5 three-quarter view',
      caption: 'Earlier Seal 5',
    },
    next: {
      src: '/images/gallery/next/three-quarter.jpg',
      alt: 'BYD Seal 5 2027 three-quarter view',
      caption: 'Seal 5 2027',
    },
  },
] as const

export function Compare() {
  const ref = useReveal<HTMLElement>()

  return (
    <section className="section compare" id="compare" ref={ref} aria-labelledby="compare-title">
      <p className="section-kicker" data-reveal>
        Design generations
      </p>
      <h2 id="compare-title" data-reveal>
        Earlier Seal 5. Seal 5 2027.
      </h2>
      <p className="section-lead" data-reveal>
        Side by side — the chrome-era Seal 5 and the blacked-out Seal 5 2027 face. Same
        sedan mission, two design chapters.
      </p>

      <div className="compare-rows">
        {ROWS.map((row) => (
          <article key={row.label} className="compare-row" data-reveal>
            <header className="compare-row-head">
              <h3>{row.label}</h3>
              <p>{row.note}</p>
            </header>
            <div className="compare-pair">
              <figure className="compare-shot">
                <img
                  src={row.classic.src}
                  alt={row.classic.alt}
                  loading="lazy"
                  decoding="async"
                  data-parallax="8"
                />
                <figcaption>
                  <span>Before</span>
                  {row.classic.caption}
                </figcaption>
              </figure>
              <figure className="compare-shot compare-shot--next">
                <img
                  src={row.next.src}
                  alt={row.next.alt}
                  loading="lazy"
                  decoding="async"
                  data-parallax="8"
                />
                <figcaption>
                  <span>Now</span>
                  {row.next.caption}
                </figcaption>
              </figure>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
