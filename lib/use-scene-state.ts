"use client";

import { useEffect, useRef } from "react";

export type SceneState = {
  scroll: number; // 0..1
  mouse: { x: number; y: number; raw: { x: number; y: number } }; // normalized 0..1
  intro: number; // 0..1 preloader value
  velocity: number; // signed scroll velocity (units / second)
  active: string; // current section id
};

const state: SceneState = {
  scroll: 0,
  mouse: { x: 0.5, y: 0.5, raw: { x: 0.5, y: 0.5 } },
  intro: 0,
  velocity: 0,
  active: "hero",
};

export function getSceneState(): SceneState {
  return state;
}

export function setSceneState(patch: Partial<SceneState>) {
  Object.assign(state, patch);
}

export function setScroll(scroll: number, velocity: number) {
  state.scroll = scroll;
  state.velocity = velocity;
}

export function useMouseTracking() {
  const ref = useRef({ x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      ref.current.tx = e.clientX / window.innerWidth;
      ref.current.ty = 1 - e.clientY / window.innerHeight;
      state.mouse.raw.x = ref.current.tx;
      state.mouse.raw.y = ref.current.ty;
    };
    window.addEventListener("pointermove", onMove);
    let raf = 0;
    const loop = () => {
      ref.current.x += (ref.current.tx - ref.current.x) * 0.08;
      ref.current.y += (ref.current.ty - ref.current.y) * 0.08;
      state.mouse.x = ref.current.x;
      state.mouse.y = ref.current.y;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
}
