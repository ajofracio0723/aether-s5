import { useReveal } from '../hooks/useReveal'

const INCLUDES = [
  '18″ aero wheels',
  '15.6″ center display',
  'Blade LFP battery',
  'Driver assist suite',
  '8-year battery warranty',
] as const

export function Offer() {
  const ref = useReveal<HTMLElement>()

  return (
    <section className="section offer" id="offer" ref={ref} aria-labelledby="offer-title">
      <div className="offer-shell">
        <p className="offer-kicker" data-reveal>
          Launch allocation
        </p>
        <h2 id="offer-title" data-reveal>
          First 200 builds. Starting SRP locked.
        </h2>
        <p className="offer-price" data-reveal>
          ₱958,000
          <span>Dynamic SRP · Premium from ₱1,198,000</span>
        </p>
        <p className="offer-scarcity" data-reveal>
          47 allocations remaining this month. Reserve with ₱20,000 refundable hold — configure
          after your drive.
        </p>
        <ul className="offer-includes" data-reveal>
          {INCLUDES.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="cta-row" data-reveal>
          <a className="btn btn--primary" href="#close">
            Reserve yours
          </a>
          <a className="btn btn--ghost" href="#close">
            Book a test drive
          </a>
        </div>
      </div>
    </section>
  )
}
