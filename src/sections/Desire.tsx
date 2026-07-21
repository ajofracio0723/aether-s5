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
      <div className="desire-copy">
        <p className="desire-kicker" data-reveal="left">
          Daily drive, rewritten
        </p>
        <h2 id="desire-title" data-reveal="left">
          Quiet power for every commute.
        </h2>
        <p data-reveal="left">
          No theater. No roar. Just a quiet silhouette that arrives before the day asks
          too much — and still has range left when it does.
        </p>
        <ul className="desire-line" data-reveal="left">
          <li>Acoustic glass</li>
          <li>Blade battery</li>
          <li>Super DM-i</li>
        </ul>
      </div>
    </section>
  )
}
