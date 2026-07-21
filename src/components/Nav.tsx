export function Nav() {
  return (
    <nav className="nav" aria-label="Primary">
      <a className="nav-brand" href="#hero">
        AETHER
      </a>
      <div className="nav-links">
        <a href="#compare">Compare</a>
        <a href="#gallery">Gallery</a>
        <a href="#finish">Finish</a>
        <a href="#specs">Specs</a>
        <a href="#faq">FAQ</a>
        <a className="nav-cta" href="#close">
          Reserve
        </a>
      </div>
    </nav>
  )
}
