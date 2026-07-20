import { useState } from 'react'
import type { FormEvent } from 'react'
import { useReveal } from '../hooks/useReveal'

type FormState = {
  name: string
  email: string
  city: string
}

type Errors = Partial<Record<keyof FormState, string>>

const initial: FormState = { name: '', email: '', city: '' }

function validate(values: FormState): Errors {
  const errors: Errors = {}
  if (!values.name.trim()) errors.name = 'Name is required'
  if (!values.email.trim()) errors.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Enter a valid email'
  }
  if (!values.city.trim()) errors.city = 'City is required'
  return errors
}

export function Close() {
  const ref = useReveal<HTMLElement>()
  const [values, setValues] = useState<FormState>(initial)
  const [errors, setErrors] = useState<Errors>({})
  const [done, setDone] = useState(false)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const next = validate(values)
    setErrors(next)
    if (Object.keys(next).length) return
    setDone(true)
  }

  return (
    <section className="section close" id="close" ref={ref} aria-labelledby="close-title">
      <div className="close-grid">
        <div>
          <p className="section-kicker" data-reveal>
            Next step
          </p>
          <h2 id="close-title" data-reveal>
            Hold your S5.
          </h2>
          <p data-reveal>
            Tell us where you drive. We’ll confirm your launch allocation and schedule a
            private test drive within 48 hours.
          </p>
          <ul className="close-perks" data-reveal>
            <li>Refundable $500 hold</li>
            <li>Priority delivery window</li>
            <li>Private studio appointment</li>
          </ul>
        </div>

        {done ? (
          <div className="form-success" role="status" data-reveal>
            <h3>You’re on the list.</h3>
            <p>
              Check {values.email} for next steps. Your $500 hold is refundable until you
              configure.
            </p>
          </div>
        ) : (
          <form className="form" onSubmit={onSubmit} noValidate data-reveal>
            <div className="field">
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                name="name"
                autoComplete="name"
                value={values.name}
                onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
              />
              {errors.name ? <p className="field-error">{errors.name}</p> : null}
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
              />
              {errors.email ? <p className="field-error">{errors.email}</p> : null}
            </div>
            <div className="field">
              <label htmlFor="city">City</label>
              <input
                id="city"
                name="city"
                autoComplete="address-level2"
                value={values.city}
                onChange={(e) => setValues((v) => ({ ...v, city: e.target.value }))}
              />
              {errors.city ? <p className="field-error">{errors.city}</p> : null}
            </div>
            <button className="btn btn--primary" type="submit">
              Reserve / book a drive
            </button>
            <p className="form-alt">
              Prefer a PDF?{' '}
              <a href="/brochure.txt" download="AETHER-S5-brochure.txt">
                Download brochure
              </a>
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
