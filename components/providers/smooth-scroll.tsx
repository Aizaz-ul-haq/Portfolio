"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

function LenisGSAPBridge() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.off("scroll", onScroll);
    };
  }, [lenis]);

  return null;
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <ReactLenis
      root
      options={{
        // Very low lerp = long, ice-skate chase to the target position.
        lerp: reduced ? 1 : 0.045,
        // Long expo-eased duration so a single wheel tick coasts for ~3s.
        duration: reduced ? 0 : 3.0,
        // Ultra-smooth out-quint easing — sharp pickup, very long tail
        easing: (t: number) =>
          t === 1 ? 1 : 1 - Math.pow(2, -12 * t),
        smoothWheel: !reduced,
        // Damped wheel so a fast spin still rides the easing curve
        // instead of teleporting past it.
        wheelMultiplier: 0.7,
        syncTouch: false,
        touchMultiplier: 2,
      }}
    >
      <LenisGSAPBridge />
      {children}
    </ReactLenis>
  );
}
