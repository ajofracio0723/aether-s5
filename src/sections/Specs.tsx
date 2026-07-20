import { useReveal } from '../hooks/useReveal'

const TRIMS = [
  {
    name: 'Long Range RWD',
    price: '$42,900',
    range: '520 km',
    power: '231 hp',
    charge: '150 kW DC',
    highlight: false,
  },
  {
    name: 'Performance AWD',
    price: '$48,500',
    range: '480 km',
    power: '312 hp',
    charge: '150 kW DC',
    highlight: true,
  },
] as const

const ROWS = [
  { label: 'WLTP range', key: 'range' as const },
  { label: 'Peak power', key: 'power' as const },
  { label: 'DC fast charge', key: 'charge' as const },
  { label: 'Starting MSRP', key: 'price' as const },
]

export function Specs() {
  const ref = useReveal<HTMLElement>()

  return (
    <section className="section specs" id="specs" ref={ref} aria-labelledby="specs-title">
      <p className="section-kicker" data-reveal>
        Trims & specs
      </p>
      <h2 id="specs-title" data-reveal>
        Choose the S5 that fits your drive.
      </h2>
      <p className="section-lead" data-reveal>
        Two launch configurations — both with the full driver-assist suite and fast-charge capability.
      </p>

      <div className="specs-table-wrap" data-reveal>
        <table className="specs-table">
          <thead>
            <tr>
              <th scope="col">Specification</th>
              {TRIMS.map((t) => (
                <th key={t.name} scope="col" className={t.highlight ? 'is-featured' : ''}>
                  {t.name}
                  {t.highlight ? <span className="specs-badge">Most popular</span> : null}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                {TRIMS.map((t) => (
                  <td key={t.name} className={t.highlight ? 'is-featured' : ''}>
                    {t[row.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="specs-included" data-reveal>
        <li>Heat pump climate control</li>
        <li>15.6″ floating display</li>
        <li>Adaptive cruise + lane assist</li>
        <li>8-year battery warranty</li>
      </ul>
    </section>
  )
}
