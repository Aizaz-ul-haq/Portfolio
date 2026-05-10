"use client";

import { useEffect } from "react";
import { useLenis } from "lenis/react";

/**
 * Globally intercepts in-page anchor clicks (`<a href="#section">`)
 * and routes them through Lenis for smooth scrolling. Without this,
 * browser-default jumps fight the Lenis lerp and feel jerky.
 *
 * Mount once at the app root. Honors modifier keys (cmd/ctrl/shift) so
 * users can still open in new tab / etc.
 */
export function AnchorScroll() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const onClick = (e: MouseEvent) => {
      // Allow modified clicks to behave normally
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (e.button !== 0) return;

      const target = e.target as HTMLElement | null;
      if (!target) return;
      const a = target.closest<HTMLAnchorElement>("a[href^='#']");
      if (!a) return;

      const href = a.getAttribute("href");
      if (!href || href === "#") return;

      const id = decodeURIComponent(href.slice(1));
      const el = document.getElementById(id);
      if (!el) return;

      e.preventDefault();
      lenis.scrollTo(el, { offset: 0, duration: 2.0 });
      // update the URL hash without scrolling
      history.replaceState(null, "", href);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [lenis]);

  return null;
}
