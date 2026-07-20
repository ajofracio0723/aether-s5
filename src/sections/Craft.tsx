import { useReveal } from '../hooks/useReveal'

const LINES = [
  {
    title: 'Seamless sheet metal',
    body: 'One continuous character line from headlamp to haunches — light finds it before you do.',
  },
  {
    title: 'Signature light blade',
    body: 'A full-width DRL that reads as a single stroke at night. Recognition without shouting.',
  },
  {
    title: 'Hidden aero',
    body: 'Flush door handles, closed grille, and a diffuser tuned for quiet highway miles.',
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
          Every edge on the S5 is intentional — less chrome theater, more calm presence in
          the driveway.
        </p>
      </div>
      <ol className="craft-list">
        {LINES.map((line, i) => (
          <li key={line.title} data-reveal>
            <span className="craft-index">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h3>{line.title}</h3>
              <p>{line.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
