import { useReveal } from '../hooks/useReveal'

/** Grounded in BYD Seal 5 DM-i (EU) Super DM-i figures — AETHER is a demo brand. */
const BEATS = [
  {
    value: '1050',
    unit: 'km',
    label: 'WLTP combined range — full tank + full Blade Battery for weeks of mixed driving.',
  },
  {
    value: '7.5',
    unit: 's',
    label: '0–100 km/h — quiet electric pull from Super DM-i, without theatrics.',
  },
  {
    value: '100',
    unit: 'km',
    label: 'WLTP electric-only range — school runs and office loops without burning fuel.',
  },
] as const

export function Proof() {
  const ref = useReveal<HTMLElement>()

  return (
    <section className="section proof" id="proof" ref={ref} aria-labelledby="proof-title">
      <div className="proof-intro">
        <p className="section-kicker" data-reveal>
          Performance
        </p>
        <h2 id="proof-title" data-reveal>
          Numbers that earn the driveway.
        </h2>
        <p data-reveal>
          Specs aligned to real Super DM-i roads — plug-in hybrid calm with petrol backup when
          the week runs long.
        </p>
      </div>
      <div className="proof-beats">
        {BEATS.map((beat) => (
          <article className="proof-beat" key={beat.label} data-reveal="scale">
            <p className="proof-value">
              <span data-count={beat.value} data-decimals={beat.value.includes('.') ? 1 : 0}>
                0
              </span>
              <em>{beat.unit}</em>
            </p>
            <p className="proof-label">{beat.label}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
