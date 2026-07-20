const STAGES = [
  {
    stage: '01 — Form',
    title: 'Sculpted for silence',
    body: 'A low coupe-like silhouette cuts the air so cabin noise stays out of the commute.',
    detail: 'Fastback profile · Flush aero',
  },
  {
    stage: '02 — Range',
    title: 'Days between plugs',
    body: 'Up to 520 km WLTP so school runs, office loops, and weekend escapes stay one charge.',
    detail: '82 kWh pack · Heat pump',
  },
  {
    stage: '03 — Charge',
    title: 'Back on the road fast',
    body: 'DC fast charge recovers 30–80% in about 28 minutes — coffee-stop energy.',
    detail: '150 kW DC · Dual ports',
  },
  {
    stage: '04 — Drive',
    title: 'Instant, quiet torque',
    body: 'Single-pedal calm in the city. A surge of electric pull when the road opens.',
    detail: '312 hp · 0–100 in 5.8 s',
  },
] as const

type JourneyProps = {
  stage: number
  journeyRef: React.RefObject<HTMLElement | null>
}

export function Journey({ stage, journeyRef }: JourneyProps) {
  const active = Math.min(Math.max(stage, 0), STAGES.length - 1)
  const current = STAGES[active]

  return (
    <section
      className="journey section--full"
      id="journey"
      ref={journeyRef as React.RefObject<HTMLElement>}
      aria-label="Product journey"
    >
      <div className="journey-sticky">
        <div className="journey-rail" aria-hidden>
          {STAGES.map((s, i) => (
            <span
              key={s.stage}
              className={`journey-dot${i === active ? ' is-active' : ''}${i < active ? ' is-done' : ''}`}
            />
          ))}
        </div>
        <article className="journey-panel is-active" key={current.stage}>
          <p className="journey-stage">{current.stage}</p>
          <h3>{current.title}</h3>
          <p>{current.body}</p>
          <p className="journey-detail">{current.detail}</p>
        </article>
      </div>
    </section>
  )
}
