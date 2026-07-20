import { useReveal } from '../hooks/useReveal'

const QUOTES = [
  {
    quote:
      'It feels premium without trying too hard — quiet, quick, and the cabin stays calm even on the highway.',
    name: 'Mara L.',
    role: 'Early allocation drive · Manila',
    rating: '4.9',
  },
  {
    quote:
      'The range is what sold me. One charge covers my week, and the fast charge stop is genuinely coffee-break quick.',
    name: 'Jonah R.',
    role: 'Launch reservation holder',
    rating: '4.8',
  },
  {
    quote:
      'Clean design inside and out. The light bar and low stance make it look more expensive than the price suggests.',
    name: 'Elena S.',
    role: 'Studio test drive',
    rating: '5.0',
  },
] as const

const LOGOS = ['AutoWeek', 'EV Pulse', 'DriveLine', 'NextMobility']

export function Testimonials() {
  const ref = useReveal<HTMLElement>()

  return (
    <section
      className="section testimonials"
      id="testimonials"
      ref={ref}
      aria-labelledby="testimonials-title"
    >
      <p className="section-kicker" data-reveal>
        Early impressions
      </p>
      <h2 id="testimonials-title" data-reveal>
        Drivers are noticing the difference.
      </h2>
      <p className="testimonials-rating" data-reveal>
        <strong>4.9</strong> average from early drives and reservation holders
      </p>

      <div className="testimonials-grid">
        {QUOTES.map((t) => (
          <blockquote key={t.name} className="testimonial-card" data-reveal>
            <p className="testimonial-stars" aria-label={`Rated ${t.rating} out of 5`}>
              ★★★★★
            </p>
            <p className="testimonial-quote">“{t.quote}”</p>
            <footer>
              <cite>{t.name}</cite>
              <span>{t.role}</span>
            </footer>
          </blockquote>
        ))}
      </div>

      <div className="press-row" data-reveal aria-label="Featured in">
        {LOGOS.map((logo) => (
          <span key={logo}>{logo}</span>
        ))}
      </div>
    </section>
  )
}
