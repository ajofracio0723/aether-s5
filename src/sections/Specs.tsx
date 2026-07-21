import { useReveal } from '../hooks/useReveal'

/** PH market trims — SRP from BYD Cars Philippines listings. */
const TRIMS = [
  {
    name: 'Dynamic',
    price: '₱958,000',
    evRange: '50 km NEDC',
    combined: '1,175 km',
    power: '179 PS',
    accel: '7.9 s',
    battery: 'Blade LFP',
    highlight: false,
  },
  {
    name: 'Premium',
    price: '₱1,198,000',
    evRange: 'Higher EV pack',
    combined: '1,000+ km',
    power: '212 PS class',
    accel: '7.5 s',
    battery: 'Larger Blade pack',
    highlight: true,
  },
] as const

const ROWS = [
  { label: 'Electric-only range', key: 'evRange' as const },
  { label: 'Combined range', key: 'combined' as const },
  { label: 'System power', key: 'power' as const },
  { label: '0–100 km/h', key: 'accel' as const },
  { label: 'Battery', key: 'battery' as const },
  { label: 'SRP', key: 'price' as const },
]

export function Specs() {
  const ref = useReveal<HTMLElement>()

  return (
    <section className="section specs" id="specs" ref={ref} aria-labelledby="specs-title">
      <p className="section-kicker" data-reveal>
        Trims & specs
      </p>
      <h2 id="specs-title" data-reveal>
        Choose the Seal 5 that fits your drive.
      </h2>
      <p className="section-lead" data-reveal>
        Super DM-i plug-in hybrid — electric for the commute, petrol when you need the long
        weekend. Philippines SRP shown; confirm with your dealer.
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
        SRP from BYD Cars Philippines (Dynamic ₱958,000 · Premium ₱1,198,000). Subject to
        change; provincial pricing and promos may differ. Range figures follow published market
        claims.
      </p>
    </section>
  )
}
