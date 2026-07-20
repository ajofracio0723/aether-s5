import { useReveal } from '../hooks/useReveal'

const BEATS = [
  {
    value: '520',
    unit: 'km',
    label: 'WLTP range — designed for full weeks of mixed driving without range anxiety.',
  },
  {
    value: '5.8',
    unit: 's',
    label: '0–100 km/h — instant torque that feels decisive without shouting.',
  },
  {
    value: '28',
    unit: 'min',
    label: '30–80% DC charge — enough recovery for another stretch of highway.',
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
          Specs tuned for real roads — not brochure fantasy. The S5 is built to disappear
          into your week and still feel special on Sunday.
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
