import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const ITEMS = [
  {
    q: 'When will my Seal 5 be delivered?',
    a: 'Launch allocation builds begin this quarter. Most reservations receive a delivery window within 8–12 weeks after configuration.',
  },
  {
    q: 'Is the ₱20,000 reservation refundable?',
    a: 'Yes — fully refundable until you lock your configuration and sign the purchase agreement.',
  },
  {
    q: 'Is this a pure EV?',
    a: 'No — the Seal 5 is a Super DM-i plug-in hybrid. Drive electric for daily loops, then the petrol range-extender keeps you going past 1,000 km combined when needed.',
  },
  {
    q: 'Can I charge at home?',
    a: 'Yes. AC home charging covers most weekly electric miles. DC public charging is supported for quicker top-ups on longer trips.',
  },
  {
    q: 'What warranty is included?',
    a: '8-year / 160,000 km battery warranty plus multi-year vehicle coverage on launch allocation orders (demo terms; real BYD coverage varies by market).',
  },
  {
    q: 'Can I book a test drive first?',
    a: 'Absolutely. Reserve online or book a private studio drive — there is no obligation to purchase after your appointment.',
  },
] as const

export function Faq() {
  const ref = useReveal<HTMLElement>()
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="section faq" id="faq" ref={ref} aria-labelledby="faq-title">
      <p className="section-kicker" data-reveal>
        FAQ
      </p>
      <h2 id="faq-title" data-reveal>
        Answers before you reserve.
      </h2>
      <div className="faq-list">
        {ITEMS.map((item, i) => {
          const isOpen = open === i
          return (
            <article key={item.q} className={`faq-item${isOpen ? ' is-open' : ''}`} data-reveal>
              <button
                type="button"
                className="faq-question"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span>{item.q}</span>
                <span className="faq-icon" aria-hidden />
              </button>
              <div className="faq-answer" hidden={!isOpen}>
                <p>{item.a}</p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
