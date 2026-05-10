"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { setSceneState } from "@/lib/use-scene-state";

export function Preloader({ onDone }: { onDone?: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setSceneState({ intro: 1 });
      setHidden(true);
      onDone?.();
      return;
    }

    document.documentElement.style.overflow = "hidden";
    const obj = { v: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        document.documentElement.style.overflow = "";
        setHidden(true);
        onDone?.();
      },
    });

    tl.to(obj, {
      v: 100,
      duration: 1.6,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = String(Math.floor(obj.v)).padStart(3, "0");
        }
        if (lineRef.current) {
          lineRef.current.style.transform = `scaleX(${obj.v / 100})`;
        }
      },
    })
      .add(() => {
        gsap.to(
          { v: 0 },
          {
            v: 1,
            duration: 1.4,
            ease: "expo.out",
            onUpdate: function () {
              setSceneState({ intro: this.targets()[0].v });
            },
          }
        );
      })
      .to(
        [counterRef.current, labelRef.current, lineRef.current],
        { opacity: 0, duration: 0.4, ease: "power2.out" },
        ">+0.05"
      )
      .to(
        panelRef.current,
        {
          y: "-100%",
          duration: 1.0,
          ease: "expo.inOut",
        },
        "<+0.1"
      );

    return () => {
      tl.kill();
      document.documentElement.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (hidden) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[200] pointer-events-none"
      aria-hidden="true"
    >
      <div
        ref={panelRef}
        className="absolute inset-0"
        style={{ background: "#0a0a0a" }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-8">
        <span
          ref={labelRef}
          className="label mb-6"
          style={{ color: "rgba(253,225,0,0.7)" }}
        >
          Aizaz Ulhaq · Edition 01
        </span>
        <div
          ref={lineRef}
          className="h-[2px] w-[min(420px,60vw)] origin-left"
          style={{ background: "#FDE100", transform: "scaleX(0)" }}
        />
        <span
          ref={counterRef}
          className="font-mono text-sm tracking-widest mt-6 tabular-nums font-bold"
          style={{ color: "#FDE100" }}
        >
          000
        </span>
      </div>
    </div>
  );
}
