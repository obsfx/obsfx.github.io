import { Mesh, PerspectiveCamera, Scene, ShaderMaterial, SphereGeometry, type WebGLRenderer } from "three";
import { simplexNoise3d } from "@/src/lib/orbs/simplex-noise";
import type { OrbFrame, OrbScene, OrbSettings } from "@/src/lib/orbs/types";

export class HoloScene implements OrbScene {
  static readonly maxPixelRatio = 2;

  private static readonly radius = 0.85;
  private static readonly amplitude = 0.2;

  private static readonly vertexShader = `
uniform float uTime;
uniform float uAmplitude;
varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec3 vObjectNormal;

${simplexNoise3d}

vec3 displaced(vec3 direction) {
  float swell = snoise(direction * 0.65 + vec3(uTime * 0.14, uTime * 0.1, -uTime * 0.08))
    + 0.25 * snoise(direction * 1.3 - vec3(uTime * 0.1));
  return direction * (1.0 + uAmplitude * swell);
}

void main() {
  vec3 direction = normalize(position);
  vec3 up = vec3(0.0, 1.0, 0.0);
  if (abs(direction.y) >= 0.99) {
    up = vec3(1.0, 0.0, 0.0);
  }
  vec3 tangent = normalize(cross(direction, up));
  vec3 bitangent = cross(direction, tangent);
  vec3 surface = displaced(direction);
  vec3 objectNormal = normalize(cross(
    displaced(normalize(direction + tangent * 0.01)) - surface,
    displaced(normalize(direction + bitangent * 0.01)) - surface
  ));

  vObjectNormal = objectNormal;
  vNormal = normalize(normalMatrix * objectNormal);
  vec4 viewPosition = modelViewMatrix * vec4(surface, 1.0);
  vViewPosition = -viewPosition.xyz;
  gl_Position = projectionMatrix * viewPosition;
}
`;

  private static readonly fragmentShader = `
uniform float uTime;
uniform float uHue;
varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec3 vObjectNormal;

${simplexNoise3d}

const vec3 ORANGE = vec3(1.0, 0.55, 0.36);
const vec3 PINK = vec3(1.0, 0.48, 0.72);
const vec3 NAVY = vec3(0.06, 0.1, 0.22);
const vec3 CYAN = vec3(0.37, 0.94, 0.88);

vec3 holographic(float t) {
  float segment = fract(t) * 4.0;
  float blend = smoothstep(0.0, 1.0, fract(segment));
  if (segment < 1.0) {
    return mix(ORANGE, PINK, blend);
  }
  if (segment < 2.0) {
    return mix(PINK, NAVY, blend);
  }
  if (segment < 3.0) {
    return mix(NAVY, CYAN, blend);
  }
  return mix(CYAN, ORANGE, blend);
}

// Hash without Sine by Dave Hoskins, MIT License: https://www.shadertoy.com/view/4djSRW
float grain(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

void main() {
  vec3 normal = normalize(vNormal);
  vec3 view = normalize(vViewPosition);
  float facing = clamp(dot(normal, view), 0.0, 1.0);

  float drift = snoise(vObjectNormal * 1.1 + vec3(uTime * 0.04));
  float t = dot(normal, normalize(vec3(0.6, 0.35, 0.2))) * 0.45 + drift * 0.15 + uTime * 0.02 + uHue;
  vec3 color = holographic(t);
  color *= 0.65 + 0.35 * dot(normal, normalize(vec3(-0.4, 0.6, 0.7)));
  color += pow(1.0 - facing, 3.0) * 0.25;
  color += (grain(gl_FragCoord.xy) - 0.5) * 0.08;
  gl_FragColor = vec4(color, 1.0);
}
`;

  private readonly renderer: WebGLRenderer;
  private readonly settings: OrbSettings;
  private readonly scene = new Scene();
  private readonly camera = new PerspectiveCamera(30, 1, 0.1, 100);
  private readonly geometry = new SphereGeometry(1, 160, 120);
  private readonly material = new ShaderMaterial({
    vertexShader: HoloScene.vertexShader,
    fragmentShader: HoloScene.fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uAmplitude: { value: HoloScene.amplitude },
      uHue: { value: 0 },
    },
  });
  private readonly blob = new Mesh(this.geometry, this.material);
  private width = 1;
  private height = 1;

  constructor(renderer: WebGLRenderer, settings: OrbSettings) {
    this.renderer = renderer;
    this.settings = settings;
    this.camera.position.set(0, 0, 7);
    this.scene.add(this.blob);
  }

  resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
  }

  render({ time, pointer, focus }: OrbFrame): void {
    const lift = Math.max(...focus);
    const uniforms = this.material.uniforms;
    uniforms.uTime.value = time;
    uniforms.uAmplitude.value = HoloScene.amplitude * (1 + 0.6 * lift);
    uniforms.uHue.value = focus[0] * 0.12 + focus[1] * 0.24 + focus[2] * 0.36;
    this.blob.scale.setScalar(HoloScene.radius * (1 + 0.08 * lift));
    this.blob.rotation.set(-pointer.y * 0.25 + Math.sin(time * 0.2) * 0.15, time * 0.12 + pointer.x * 0.35, 0);
    this.frameCamera();
    this.renderer.render(this.scene, this.camera);
  }

  dispose(): void {
    this.geometry.dispose();
    this.material.dispose();
  }

  private frameCamera(): void {
    const aspect = this.width / this.height;
    this.camera.aspect = aspect;
    this.camera.zoom = this.settings.scale * Math.min(1, aspect);
    this.camera.setViewOffset(
      this.width,
      this.height,
      (0.5 - this.settings.anchor.x) * this.width,
      (0.5 - this.settings.anchor.y) * this.height,
      this.width,
      this.height,
    );
    this.camera.updateProjectionMatrix();
  }
}
