"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  to: number;
  /** Optional suffix like "+" or "%" */
  suffix?: string;
  /** Pad with leading zeros. e.g. pad=2 → "05" */
  pad?: number;
  /** Animation duration in ms */
  duration?: number;
  /** Start when element enters viewport. */
  triggerOnView?: boolean;
  className?: string;
};

/**
 * Animated counter from 0 → `to`. Uses easeOutExpo, runs once.
 * Defaults to triggering when element enters viewport.
 */
export function Counter({
  to,
  suffix = "",
  pad = 0,
  duration = 1600,
  triggerOnView = true,
  className = "",
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;

    const start = () => {
      if (startedRef.current) return;
      startedRef.current = true;

      if (reduced) {
        setVal(to);
        return;
      }

      const t0 = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - t0) / duration);
        const eased = 1 - Math.pow(2, -10 * t);
        setVal(Math.round(eased * to));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if (!triggerOnView) {
      start();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) start();
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration, triggerOnView]);

  const display = pad > 0 ? String(val).padStart(pad, "0") : String(val);
  return (
    <span ref={ref} className={`tabular ${className}`}>
      {display}
      {suffix}
    </span>
  );
}
