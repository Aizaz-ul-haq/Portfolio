"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { getSceneState } from "@/lib/use-scene-state";

/**
 * BVB Poster background:
 * - Solid yellow #FDE100 ground
 * - Two slow-drifting black halftone-dot fields layered at different
 *   scales so movement is visible but understated
 * - No cursor reactivity (no torch)
 * - Scroll subtly shifts dot density so the page breathes
 *
 * Replaces the previous dark glass shader.
 */
export function GlassFlow() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uScroll: { value: 0 },
      uIntro: { value: 0 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useFrame(({ clock, size: s }) => {
    if (!matRef.current) return;
    const state = getSceneState();
    const u = matRef.current.uniforms;
    u.uTime.value = clock.getElapsedTime();
    u.uResolution.value.set(s.width, s.height);
    u.uScroll.value = state.scroll;
    u.uIntro.value += (state.intro - u.uIntro.value) * 0.06;
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position.xy, 0.0, 1.0);
          }
        `}
        fragmentShader={`
          precision mediump float;
          uniform float uTime;
          uniform vec2  uResolution;
          uniform float uScroll;
          uniform float uIntro;
          varying vec2  vUv;

          // BVB yellow + ink black
          const vec3 PAPER = vec3(0.992, 0.882, 0.000);
          const vec3 INK   = vec3(0.039, 0.039, 0.039);

          // Pre-baked rotation matrices (cos/sin computed at compile time)
          // angle = 0.35 rad
          const mat2 R1 = mat2( 0.9393727,  0.3428978,
                               -0.3428978,  0.9393727);

          // Halftone dot field; rotation matrix is constant.
          // Returns ink coverage 0..1.
          float halftone(vec2 p, float scale, float radius, mat2 R) {
            vec2 q = R * p * scale;
            vec2 g = fract(q) - 0.5;
            float d2 = dot(g, g);
            float r2 = radius * radius;
            float r2o = (radius + 0.08) * (radius + 0.08);
            // smoothstep on squared distance — saves a sqrt per pixel
            return 1.0 - smoothstep(r2, r2o, d2);
          }

          void main() {
            vec2 uv = vUv;
            float aspect = uResolution.x / uResolution.y;
            vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

            float t = uTime * 0.06;

            // Single drifting halftone field — denser at top, sparser at bottom
            vec2 drift = p + vec2(t * 0.4, t * 0.25);
            float r1 = mix(0.18, 0.06, clamp(uv.y - uScroll * 0.2, 0.0, 1.0));
            float dots = halftone(drift, 22.0, r1, R1);

            vec3 col = mix(PAPER, INK, dots * 0.11);

            // Vignette
            float vd = dot(p, p);
            float v = smoothstep(0.9, 0.12, vd);
            col = mix(col * 0.93, col, v);

            // Intro fade
            col = mix(PAPER, col, clamp(uIntro, 0.0, 1.0));

            gl_FragColor = vec4(col, 1.0);
          }
        `}
      />
    </mesh>
  );
}
