uniform vec3 color;
uniform sampler2D pointTexture;
uniform float uOpacity;

varying vec3 vColor;
varying float vAlpha;

void main() {
  float alpha = vAlpha * uOpacity;
  gl_FragColor = vec4(1.0, 1.0, 1.0, alpha) * texture2D(pointTexture, gl_PointCoord);
}
