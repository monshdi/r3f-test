uniform vec3 color;
uniform sampler2D pointTexture;
uniform float uOpacity;
uniform float distanceDelta;

varying vec3 vColor;
varying float vAlpha;
varying float distanceToCamera;

void main() {
  float alpha = vAlpha * uOpacity;
  gl_FragColor = vec4(color * vColor, alpha / (distanceToCamera * distanceDelta)) * texture2D(pointTexture, gl_PointCoord);
}
