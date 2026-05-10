"use client";

import { useEffect, useRef } from "react";

/**
 * Minimal dot cursor.
 *
 * - A small inertial outer dot trails the pointer (lerped, slight delay)
 * - A tiny inner dot snaps directly to the raw pointer for click precision
 * - Hidden on touch devices (relies on hover)
 * - Single rAF loop, single pointermove listener
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let x = tx;
    let y = ty;
    let visible = false;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!visible) {
        visible = true;
        ring.style.opacity = "1";
        dot.style.opacity = "1";
      }
    };
    const onLeave = () => {
      visible = false;
      ring.style.opacity = "0";
      dot.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);

    // Match these to the rendered element sizes
    const RING = 32;
    const DOT = 6;

    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      ring.style.transform = `translate3d(${x - RING / 2}px, ${y - RING / 2}px, 0)`;
      dot.style.transform = `translate3d(${tx - DOT / 2}px, ${ty - DOT / 2}px, 0)`;
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Outer ring — trails behind */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          borderRadius: "9999px",
          border: "2px solid #0a0a0a",
          pointerEvents: "none",
          zIndex: 9998,
          opacity: 0,
          willChange: "transform",
          transition: "opacity 0.2s ease",
        }}
      />
      {/* Inner dot — snaps to raw pointer */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: "9999px",
          background: "#0a0a0a",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: 0,
          willChange: "transform",
          transition: "opacity 0.2s ease",
        }}
      />
    </>
  );
}
