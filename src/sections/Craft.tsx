import { useReveal } from '../hooks/useReveal'

const LINES = [
  {
    title: 'Seamless sheet metal',
    body: 'One continuous character line from headlamp to haunches — light finds it before you do.',
    src: '/images/gallery/craft-metal.jpg',
    alt: 'Sculpted body lines on the S5',
  },
  {
    title: 'Signature light blade',
    body: 'A full-width rear signature that reads as a single stroke at night.',
    src: '/images/gallery/craft-light.jpg',
    alt: 'Full-width tail light signature',
  },
  {
    title: 'Paint that holds light',
    body: 'Deep quartz metallics shift with the sun — the silhouette stays quiet, the surface never does.',
    src: '/images/gallery/craft-oceanx.jpg',
    alt: 'Quartz Blue Seal 5 in natural light',
  },
] as const

export function Craft() {
  const ref = useReveal<HTMLElement>()

  return (
    <section className="section craft" id="craft" ref={ref} aria-labelledby="craft-title">
      <div className="craft-head">
        <p className="section-kicker" data-reveal>
          Design language
        </p>
        <h2 id="craft-title" data-reveal>
          Details you feel before you name them.
        </h2>
        <p className="section-lead" data-reveal>
          From sheet metal to signature light — every edge is intentional in the driveway.
        </p>
      </div>
      <ol className="craft-list">
        {LINES.map((line, i) => (
          <li key={line.title} data-reveal={i % 2 === 0 ? 'left' : 'right'}>
            <span className="craft-index">{String(i + 1).padStart(2, '0')}</span>
            <div className="craft-copy">
              <h3>{line.title}</h3>
              <p>{line.body}</p>
            </div>
            <figure className="craft-shot">
              <img
                src={line.src}
                alt={line.alt}
                loading="lazy"
                decoding="async"
                data-parallax="12"
              />
            </figure>
          </li>
        ))}
      </ol>
    </section>
  )
}
