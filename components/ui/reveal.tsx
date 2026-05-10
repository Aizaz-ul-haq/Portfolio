"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  start?: string;
};

/**
 * Wrap any children in a scroll-triggered fade+rise reveal.
 * Honors prefers-reduced-motion.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  duration = 1.0,
  y = 24,
  start = "top 80%",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }
    gsap.set(el, { opacity: 0, y });
    const ctx = gsap.context(() => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration,
        ease: "expo.out",
        delay,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: "play none none reverse",
        },
      });
    }, el);
    return () => ctx.revert();
  }, [delay, duration, y, start]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
