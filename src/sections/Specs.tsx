import { useReveal } from '../hooks/useReveal'

/** Trim table mirrors Seal 5 DM-i Dynamic vs Design/Premium-class packs (export markets). */
const TRIMS = [
  {
    name: 'Comfort',
    price: 'From $34,900',
    evRange: '55–80 km*',
    combined: '1,000+ km',
    power: '163–179 hp',
    accel: '7.9 s',
    battery: '8.3 kWh Blade',
    highlight: false,
  },
  {
    name: 'Design',
    price: 'From $39,900',
    evRange: '100 km WLTP',
    combined: '1,050 km WLTP',
    power: '212 hp',
    accel: '7.5 s',
    battery: '18.3 kWh Blade',
    highlight: true,
  },
] as const

const ROWS = [
  { label: 'Electric-only range', key: 'evRange' as const },
  { label: 'Combined range', key: 'combined' as const },
  { label: 'System power', key: 'power' as const },
  { label: '0–100 km/h', key: 'accel' as const },
  { label: 'Battery', key: 'battery' as const },
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
        Super DM-i plug-in hybrid — electric for the commute, petrol when you need the long
        weekend. Demo pricing; real Seal 5 figures vary by market.
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
            <tr>
              <th scope="row">Dimensions (L×W×H)</th>
              <td colSpan={2}>4,780 × 1,837 × 1,515 mm · 2,718 mm wheelbase</td>
            </tr>
            <tr>
              <th scope="row">Boot</th>
              <td colSpan={2}>~450–508 L · seats fold for more</td>
            </tr>
            <tr>
              <th scope="row">Powertrain</th>
              <td colSpan={2}>1.5L Atkinson + front e-motor · E-CVT · FWD</td>
            </tr>
          </tbody>
        </table>
      </div>

      <ul className="specs-included" data-reveal>
        <li>BYD Blade LFP battery</li>
        <li>15.6″ floating display</li>
        <li>Adaptive cruise + lane assist</li>
        <li>8-year / 160,000 km battery warranty</li>
      </ul>
      <p className="specs-footnote" data-reveal>
        *Lower-pack electric range is NEDC/CLTC-class depending on market. Design figures follow
        EU Seal 5 DM-i 18.3 kWh WLTP publications.
      </p>
    </section>
  )
}
