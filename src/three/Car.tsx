import { Suspense, useLayoutEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { scrollState } from './scrollState'
import { SEAL5_MODEL_URL } from './modelUrl'

const TARGET_LENGTH = 5.2

function isPaintTarget(mesh: THREE.Mesh, mat: THREE.Material) {
  const meshName = mesh.name.toLowerCase()
  const matName = mat.name.toLowerCase()
  return matName === 'carpaint' || meshName.includes('carpaint') || meshName.includes('mk_body')
}

function paintSettings(hex: string) {
  const c = new THREE.Color(hex)
  const lum = c.r * 0.3 + c.g * 0.59 + c.b * 0.11
  if (lum < 0.15) return { metalness: 0.55, roughness: 0.35 }
  if (lum > 0.85) return { metalness: 0.65, roughness: 0.22 }
  return { metalness: 0.78, roughness: 0.24 }
}

function Seal5Model() {
  const root = useRef<THREE.Group>(null)
  const paintMats = useRef<THREE.MeshStandardMaterial[]>([])
  const { scene } = useGLTF(SEAL5_MODEL_URL)

  useLayoutEffect(() => {
    paintMats.current = []

    scene.traverse((obj) => {
      if (!(obj as THREE.Mesh).isMesh) return
      const mesh = obj as THREE.Mesh
      mesh.castShadow = true
      mesh.receiveShadow = true

      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
      const nextMats = mats.map((mat) => {
        if (!mat) return mat

        if ('transmission' in mat && (mat as THREE.MeshPhysicalMaterial).transmission > 0) {
          const m = mat as THREE.MeshPhysicalMaterial
          m.transmission = 0
          m.transparent = true
          m.opacity = 0.38
          m.color = new THREE.Color('#9ec4d4')
          m.metalness = 0.12
          m.roughness = 0.06
        }

        if (isPaintTarget(mesh, mat)) {
          const paint = (mat as THREE.MeshStandardMaterial).clone()
          paint.name = 'CarPaintLive'
          paintMats.current.push(paint)
          return paint
        }

        if ('envMapIntensity' in mat) {
          ;(mat as THREE.MeshStandardMaterial).envMapIntensity = 1.3
        }
        return mat
      })

      mesh.material = Array.isArray(mesh.material) ? nextMats : nextMats[0]
      for (const m of nextMats) m?.needsUpdate && (m.needsUpdate = true)
    })

    scene.position.set(0, 0, 0)
    scene.rotation.set(0, 0, 0)
    scene.scale.set(1, 1, 1)

    const box = new THREE.Box3().setFromObject(scene)
    const size = box.getSize(new THREE.Vector3())
    const longest = Math.max(size.x, size.z) || 1
    scene.scale.setScalar(TARGET_LENGTH / longest)

    const fitted = new THREE.Box3().setFromObject(scene)
    const center = fitted.getCenter(new THREE.Vector3())
    scene.position.set(-center.x, -fitted.min.y, -center.z)

    scrollState.paintDirty = true
    console.info('[Seal5] paint materials', paintMats.current.length)
  }, [scene])

  useFrame(() => {
    if (!root.current) return
    root.current.rotation.y = scrollState.carYaw
    root.current.rotation.x = scrollState.carPitch
    root.current.position.y = scrollState.carLift

    if (scrollState.paintDirty && paintMats.current.length) {
      const color = new THREE.Color(scrollState.paintColor)
      const { metalness, roughness } = paintSettings(scrollState.paintColor)

      for (const mat of paintMats.current) {
        mat.color.copy(color)
        mat.metalness = metalness
        mat.roughness = roughness
        mat.needsUpdate = true
      }
      scrollState.paintDirty = false
    }
  })

  return (
    <group ref={root}>
      <primitive object={scene} />
    </group>
  )
}

function CarFallback() {
  return (
    <mesh position={[0, 0.55, 0]}>
      <boxGeometry args={[2.2, 0.55, 4.8]} />
      <meshStandardMaterial color="#2dd4bf" wireframe />
    </mesh>
  )
}

export function Car() {
  return (
    <Suspense fallback={<CarFallback />}>
      <Seal5Model />
    </Suspense>
  )
}

useGLTF.preload(SEAL5_MODEL_URL)
