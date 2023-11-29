uniform vec3 color;
uniform sampler2D pointTexture;
uniform float uOpacity;
uniform float distanceDelta;
uniform float distanceValue;

varying vec3 vColor;
varying float vAlpha;
varying float distanceToCamera;

void main() {
  float deltaAlpha = vAlpha * uOpacity;
  float alpha = distanceToCamera > distanceValue ? deltaAlpha / distanceToCamera / distanceDelta : vAlpha * uOpacity;
  gl_FragColor = vec4(color * vColor, alpha) * texture2D(pointTexture, gl_PointCoord);
}
