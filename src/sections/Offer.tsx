import { useReveal } from '../hooks/useReveal'

const INCLUDES = [
  '19″ aero wheels',
  'Heat pump climate',
  '15.6″ center display',
  'Driver assist suite',
  'Lifetime warranty on battery',
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
          First 200 builds. Starting price locked.
        </h2>
        <p className="offer-price" data-reveal>
          $42,900
          <span>MSRP before incentives · Long Range RWD</span>
        </p>
        <p className="offer-scarcity" data-reveal>
          47 allocations remaining this month. Reserve with $500 refundable hold — configure
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
