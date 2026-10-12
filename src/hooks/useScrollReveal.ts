import { useEffect, useRef } from "react";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Progressive-enhancement scroll reveal using IntersectionObserver.
 * Adds the `is-visible` class on elements with [data-reveal]
 * contained in the returned ref, respecting prefers-reduced-motion.
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const items = root.querySelectorAll<HTMLElement>("[data-reveal]");

    // Flag the document so the "hidden" state is only applied when JS is
    // live. If the hook never runs, every [data-reveal] stays visible.
    document.documentElement.setAttribute("data-reveal-ready", "true");

    if (reduced || typeof IntersectionObserver === "undefined") {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            // Cap stagger delays so late items don't lag the whole page.
            const raw = Number(el.dataset.revealDelay ?? "0");
            const delay = Number.isFinite(raw) ? Math.min(Math.max(raw, 0), 240) : 0;
            window.setTimeout(() => el.classList.add("is-visible"), delay);
            observer.unobserve(el);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [reduced]);

  return ref;
}
