import { Suspense, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Html } from '@react-three/drei'
import * as THREE from 'three'
import { SplineBackdrop } from '../components/SplineBackdrop'
import { Car } from './Car'
import { scrollState } from './scrollState'

function CameraRig() {
  const lookAt = useMemo(() => new THREE.Vector3(0, 0.7, 0), [])
  const desired = useMemo(() => new THREE.Vector3(), [])

  useFrame((state) => {
    desired.set(
      Math.sin(scrollState.cameraAngle) * scrollState.cameraRadius,
      scrollState.cameraHeight,
      Math.cos(scrollState.cameraAngle) * scrollState.cameraRadius,
    )
    state.camera.position.lerp(desired, 0.15)
    state.camera.lookAt(lookAt)
  })

  return null
}

function SceneContent() {
  return (
    <>
      {/* Transparent clear so the Spline backdrop shows behind the car */}
      <hemisphereLight args={['#f0f4f8', '#1a222c', 0.85]} />
      <ambientLight intensity={0.95} />
      <directionalLight position={[6, 10, 4]} intensity={2.8} castShadow />
      <directionalLight position={[-5, 4, -3]} intensity={1.5} color="#c5dcff" />
      <directionalLight position={[0, 4, 7]} intensity={1.35} />
      <pointLight position={[2, 2, 3]} intensity={1} color="#ffffff" distance={20} />

      <CameraRig />

      <Suspense
        fallback={
          <Html center>
            <div
              style={{
                color: '#2dd4bf',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 14,
                letterSpacing: '0.08em',
              }}
            >
              Loading Seal 5…
            </div>
          </Html>
        }
      >
        <Car />
      </Suspense>

      <ContactShadows position={[0, 0.015, 0]} opacity={0.55} scale={18} blur={2.8} far={9} />
    </>
  )
}

export function Scene() {
  useEffect(() => {
    // Ensure canvas is visible after hash jumps (#close fades it)
    // Hero starts with photo — keep 3D off until scrolled
    scrollState.canvasOpacity = 0
    const el = document.getElementById('canvas-root')
    if (!el) return
    let raf = 0
    const tick = () => {
      el.style.opacity = String(Math.max(0, scrollState.canvasOpacity))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="canvas-root" id="canvas-root" aria-hidden>
      <SplineBackdrop />
      <Canvas
        className="car-canvas"
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [4.6, 1.7, 6.2], fov: 35, near: 0.1, far: 80 }}
        gl={{
          antialias: true,
          alpha: true,
          premultipliedAlpha: false,
          powerPreference: 'high-performance',
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0)
          gl.toneMapping = THREE.ACESFilmicToneMapping
          gl.toneMappingExposure = 1.35
        }}
      >
        <SceneContent />
      </Canvas>
      {/* Solid cover above Spline + car canvas — hides free-plan badge */}
      <div className="spline-logo-cover" />
    </div>
  )
}
