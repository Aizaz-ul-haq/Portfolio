"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import { setScroll } from "@/lib/use-scene-state";

export function ScrollStatePublisher() {
  const lenis = useLenis();
  const last = useRef({ s: 0, t: 0 });

  useEffect(() => {
    if (!lenis) return;
    const onScroll = () => {
      const max = (lenis.dimensions?.scrollHeight ?? 1) - (lenis.dimensions?.height ?? 0);
      const p = max > 0 ? lenis.scroll / max : 0;
      const now = performance.now();
      const dt = Math.max(1, now - last.current.t);
      const v = ((p - last.current.s) / dt) * 1000;
      last.current.s = p;
      last.current.t = now;
      setScroll(p, v);
    };
    lenis.on("scroll", onScroll);
    onScroll();
    return () => {
      lenis.off("scroll", onScroll);
    };
  }, [lenis]);

  return null;
}
