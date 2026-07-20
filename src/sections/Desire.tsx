import { useReveal } from '../hooks/useReveal'

export function Desire() {
  const ref = useReveal<HTMLElement>()

  return (
    <section
      className="section desire"
      id="desire"
      ref={ref}
      aria-labelledby="desire-title"
    >
      <p className="desire-kicker" data-reveal>
        Daily drive, rewritten
      </p>
      <h2 id="desire-title" data-reveal>
        Quiet power for every commute.
      </h2>
      <p data-reveal>
        No theater. No roar. Just a low silver silhouette that arrives before the day asks
        too much — and still has range left when it does.
      </p>
      <ul className="desire-line" data-reveal>
        <li>Acoustic glass</li>
        <li>Flush handles</li>
        <li>0.23 Cd</li>
      </ul>
    </section>
  )
}
