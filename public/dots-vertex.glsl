attribute float size;
attribute vec3 customColor;
attribute float customAlpha;

varying vec3 vColor;
varying float vAlpha;
varying float distanceToCamera;

void main() {
  vColor = customColor;
  vAlpha = customAlpha;

  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = size * (10.0 / -mvPosition.z);
  distanceToCamera = -mvPosition.z;
  gl_Position = projectionMatrix * mvPosition;
}
