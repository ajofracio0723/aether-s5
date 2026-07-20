/** Shared mutable scroll state read by the R3F scene each frame. */
export const scrollState = {
  progress: 0,
  cameraAngle: 0.62,
  cameraRadius: 6.4,
  cameraHeight: 1.45,
  carYaw: 0.55,
  carPitch: 0,
  headlightIntensity: 0.7,
  accentGlow: 0.5,
  wheelSpin: 0,
  stage: 0,
  /** Hidden on hero photo; fades in for journey. */
  canvasOpacity: 0,
  /** Body paint hex — Finish section updates this. */
  paintColor: '#0f1218',
  paintDirty: true,
}

export type ScrollState = typeof scrollState
