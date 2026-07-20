export function Hero() {
  return (
    <header className="hero" id="hero">
      <div className="hero-media" aria-hidden>
        <picture>
          <source
            type="image/webp"
            srcSet="/images/seal5-hero.webp?v=2 2560w"
            sizes="100vw"
          />
          <img
            src="/images/seal5-hero.jpg?v=2"
            srcSet="/images/seal5-hero-1920.jpg?v=2 1920w, /images/seal5-hero.jpg?v=2 2560w"
            sizes="100vw"
            alt=""
            width={2560}
            height={1440}
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div className="hero-shade" />
      </div>

      <div className="hero-content">
        <p className="hero-eyebrow">Launch allocation · 2025</p>
        <h1 className="hero-brand">
          <span>AETHER</span>
          S5
        </h1>
        <p className="hero-copy">
          The quiet EV sedan for every commute — sculpted presence, long range, launch
          allocation open now.
        </p>
        <div className="cta-row">
          <a className="btn btn--primary" href="#close">
            Reserve yours
          </a>
          <a className="btn btn--ghost" href="#journey">
            Explore the S5
          </a>
        </div>
      </div>

      <a className="hero-scroll" href="#desire" aria-label="Scroll to continue">
        <span />
        Scroll
      </a>
    </header>
  )
}
