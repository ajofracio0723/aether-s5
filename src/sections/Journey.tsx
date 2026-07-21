const STAGES = [
  {
    stage: '01 — Form',
    title: 'Sculpted for silence',
    body: 'A low coupe-like silhouette cuts the air so cabin noise stays out of the commute.',
    detail: '4,780 mm · Fastback profile',
  },
  {
    stage: '02 — Range',
    title: 'Days between plugs',
    body: 'Up to 100 km electric-only (WLTP) for daily loops — then Super DM-i extends past 1,000 km combined.',
    detail: '18.3 kWh Blade · 1,050 km WLTP',
  },
  {
    stage: '03 — Charge',
    title: 'Plug in when it suits you',
    body: 'AC at home for weekday electric miles. DC top-ups when you need a quicker recovery.',
    detail: 'AC onboard · DC supported',
  },
  {
    stage: '04 — Drive',
    title: 'Quiet electric pull',
    body: 'EV-like refinement in town. Smooth hybrid assist when the road opens — 0–100 in 7.5 s.',
    detail: '212 hp system · 7.5 s',
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
