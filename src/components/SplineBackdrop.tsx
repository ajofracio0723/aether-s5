import { useEffect, useRef } from 'react'

const SPLINE_URL = 'https://prod.spline.design/fbY8MhCTSfLKyyaD/scene.splinecode'
const SPLINE_SCRIPT = 'https://unpkg.com/@splinetool/viewer@1.12.98/build/spline-viewer.js'

function ensureSplineScript() {
  if (document.querySelector(`script[src="${SPLINE_SCRIPT}"]`)) return
  const script = document.createElement('script')
  script.type = 'module'
  script.src = SPLINE_SCRIPT
  document.head.appendChild(script)
}

export function SplineBackdrop() {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ensureSplineScript()
    const host = hostRef.current
    if (!host || host.querySelector('spline-viewer')) return

    const viewer = document.createElement('spline-viewer')
    viewer.setAttribute('url', SPLINE_URL)
    viewer.setAttribute('loading-anim-type', 'spinner-small-dark')
    host.appendChild(viewer)

    return () => {
      viewer.remove()
    }
  }, [])

  return <div className="spline-backdrop" ref={hostRef} aria-hidden />
}
