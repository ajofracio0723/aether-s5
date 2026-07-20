import { Atmosphere } from './components/Atmosphere'
import { Nav } from './components/Nav'
import { ScrollProgress } from './components/ScrollProgress'
import { StickyCta } from './components/StickyCta'
import { useScrollFunnel } from './hooks/useScrollFunnel'
import { Cabin } from './sections/Cabin'
import { Close } from './sections/Close'
import { Craft } from './sections/Craft'
import { Desire } from './sections/Desire'
import { Finish } from './sections/Finish'
import { Hero } from './sections/Hero'
import { Journey } from './sections/Journey'
import { Offer } from './sections/Offer'
import { Proof } from './sections/Proof'
import { Scene } from './three/Scene'

export default function App() {
  const { stage, stickyVisible, journeyRef } = useScrollFunnel()

  return (
    <div className="app">
      <Scene />
      <Atmosphere />
      <ScrollProgress />
      <Nav />
      <main className="page">
        <Hero />
        <Desire />
        <Journey stage={stage} journeyRef={journeyRef} />
        <Craft />
        <Cabin />
        <Finish />
        <Proof />
        <Offer />
        <Close />
        <footer className="footer">
          © {new Date().getFullYear()} AETHER · Demo funnel · 3D:{' '}
          <a
            href="https://sketchfab.com/3d-models/2025-byd-seal-5-dm-i-chazor-king-destroyer-05-c3bdefa332384e95a9fd249d0abb25c3"
            target="_blank"
            rel="noreferrer"
          >
            BYD Seal 5 DM-i by Ddiaz Design
          </a>{' '}
          (CC BY-NC-SA)
        </footer>
      </main>
      <StickyCta visible={stickyVisible} />
    </div>
  )
}
