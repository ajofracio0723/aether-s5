type StickyCtaProps = {
  visible: boolean
}

export function StickyCta({ visible }: StickyCtaProps) {
  return (
    <div className={`sticky-cta${visible ? ' is-visible' : ''}`} aria-hidden={!visible}>
      <a className="btn btn--primary" href="#close">
        Reserve yours
      </a>
    </div>
  )
}
