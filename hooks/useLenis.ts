"use client";

import { useEffect } from "react";

/**
 * Native smooth scrolling initialization.
 * Respects user's prefers-reduced-motion preferences without bulky external libraries.
 */
export function useLenis() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    document.documentElement.style.scrollBehavior = "smooth";

    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);
}
