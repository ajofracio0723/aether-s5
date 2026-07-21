import { useState } from 'react'
import type { CSSProperties } from 'react'
import { useReveal } from '../hooks/useReveal'
import { scrollState } from '../three/scrollState'

const FINISHES = [
  { id: 'harbour-grey', name: 'Harbour Grey', hex: '#5c6772' },
  { id: 'quartz-blue', name: 'Quartz Blue', hex: '#1a3558' },
  { id: 'arctic-white', name: 'Arctic White', hex: '#eef2f5' },
  { id: 'cosmos-black', name: 'Cosmos Black', hex: '#0f1218' },
] as const

export function Finish() {
  const ref = useReveal<HTMLElement>()
  const [active, setActive] = useState<(typeof FINISHES)[number]['id']>('harbour-grey')

  const select = (finish: (typeof FINISHES)[number]) => {
    setActive(finish.id)
    scrollState.paintColor = finish.hex
    scrollState.paintDirty = true
    scrollState.canvasOpacity = 1
  }

  return (
    <section className="section finish" id="finish" ref={ref} aria-labelledby="finish-title">
      <p className="section-kicker" data-reveal>
        Exterior finish
      </p>
      <h2 id="finish-title" data-reveal>
        Choose your presence.
      </h2>
      <p className="section-lead" data-reveal>
        Tap a finish — the S5 above updates live. All four factory colours included at no
        upcharge this month.
      </p>
      <div className="finish-swatches" role="list" data-reveal>
        {FINISHES.map((f) => (
          <button
            key={f.id}
            type="button"
            role="listitem"
            className={`finish-swatch${active === f.id ? ' is-active' : ''}`}
            style={{ '--swatch': f.hex } as CSSProperties}
            onClick={() => select(f)}
            aria-pressed={active === f.id}
            aria-label={f.name}
          >
            <span className="finish-swatch-chip" />
            <span className="finish-swatch-name">{f.name}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
