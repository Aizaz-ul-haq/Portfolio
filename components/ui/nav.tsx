"use client";

import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { NAV } from "@/lib/data";

export function Nav() {
  const lenis = useLenis();
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState<string>("hero");

  useEffect(() => {
    // Cache section elements once; rebuild when NAV changes (it doesn't here).
    const sections = NAV.map((item) => ({
      id: item.id,
      el: document.getElementById(item.id),
    })).filter((s) => s.el);

    let raf = 0;
    let pending = false;
    const compute = () => {
      pending = false;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const p = docH > 0 ? Math.min(1, Math.max(0, window.scrollY / docH)) : 0;
      setProgress(p);
      const trigger = window.innerHeight * 0.4;
      let current = "hero";
      for (let i = 0; i < sections.length; i++) {
        const s = sections[i];
        if (!s.el) continue;
        if (s.el.getBoundingClientRect().top <= trigger) current = s.id;
      }
      setActive((prev) => (prev === current ? prev : current));
    };
    const onScroll = () => {
      if (pending) return;
      pending = true;
      raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.6 });
    else el.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[300] focus:px-3 focus:py-2 focus:bg-black focus:text-[#FDE100] focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest"
      >
        Skip to content
      </a>

      <nav
        className="fixed top-6 left-6 right-6 md:top-8 md:left-8 md:right-8 z-[120] flex items-start justify-between"
        aria-label="Primary"
      >
        <button onClick={() => goTo("hero")} className="pill pill-solid">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FDE100]" />
          Aizaz Ulhaq
        </button>

        <div className="flex items-center gap-3">
          <span className="hidden md:inline-flex items-center gap-2 label tabular-nums">
            <span className="font-bold text-black">
              {String(Math.round(progress * 100)).padStart(2, "0")}
            </span>
            <span>/ 100</span>
          </span>

          <button
            onClick={() => setOpen((v) => !v)}
            className="pill"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className="relative inline-block w-3 h-3">
              <span
                className="absolute left-0 top-1/2 w-3 h-px transition-transform duration-300"
                style={{
                  background: "currentColor",
                  transform: open
                    ? "translateY(0) rotate(45deg)"
                    : "translateY(-2px)",
                }}
              />
              <span
                className="absolute left-0 top-1/2 w-3 h-px transition-transform duration-300"
                style={{
                  background: "currentColor",
                  transform: open
                    ? "translateY(0) rotate(-45deg)"
                    : "translateY(2px)",
                }}
              />
            </span>
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      {/* progress hairline */}
      <div
        className="fixed top-0 left-0 right-0 z-[121] h-[2px] pointer-events-none"
        style={{ background: "rgba(10,10,10,0.12)" }}
      >
        <div
          className="h-full origin-left"
          style={{
            background: "#0a0a0a",
            transform: `scaleX(${progress})`,
            transition: "transform 0.1s linear",
          }}
        />
      </div>

      {/* Fullscreen menu — black panel sliding over the yellow */}
      <div
        className={`fixed inset-0 z-[110] transition-[opacity,transform] duration-700 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{
          background: "#0a0a0a",
          color: "#FDE100",
          transform: open ? "translateY(0)" : "translateY(-12px)",
        }}
        aria-hidden={!open}
      >
        <div className="h-full flex flex-col justify-center px-6 md:px-16 gap-2 md:gap-4">
          {NAV.map((item, i) => (
            <button
              key={item.id}
              onClick={() => goTo(item.id)}
              className="group flex items-baseline gap-4 md:gap-8 text-left transition-opacity duration-300"
              style={{
                color: "#FDE100",
                opacity: active === item.id ? 1 : 0.55,
              }}
            >
              <span
                className="label tabular-nums"
                style={{ color: "rgba(253,225,0,0.55)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className="display-2 transition-transform duration-500 group-hover:translate-x-3"
                style={{ color: "#FDE100" }}
              >
                {item.label}
              </span>
            </button>
          ))}

          <div
            className="absolute bottom-8 left-6 md:left-16 right-6 md:right-16 flex items-end justify-between label"
            style={{ color: "rgba(253,225,0,0.6)" }}
          >
            <span>Edition 01 / 2026</span>
            <span>Islamabad, PK</span>
          </div>
        </div>
      </div>
    </>
  );
}
