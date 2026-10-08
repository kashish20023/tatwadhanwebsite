"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollRevealProvider() {
  const pathname = usePathname();

  useEffect(() => {
    // Check for prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Select candidate elements to reveal on scroll
    const selectors = [
      "main > section",
      "main > div > section",
      "article",
      ".scroll-reveal",
      "section h2",
      "section h1",
      ".look-pair-row",
      ".editorial-grid",
      ".journal-card",
      ".faq-item",
      ".media-gallery-item",
    ];

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(selectors.join(", "))
    );

    if (elements.length === 0) return;

    const windowHeight = window.innerHeight;

    // Set up IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.classList.add("is-visible");
            observer.unobserve(target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -60px 0px", // Trigger when 60px into viewport
        threshold: 0.08,
      }
    );

    elements.forEach((el) => {
      // Don't re-observe if already revealed
      if (el.classList.contains("is-visible")) return;

      const rect = el.getBoundingClientRect();

      // If already in the upper viewport on load, reveal immediately
      if (rect.top < windowHeight * 0.95 && rect.bottom > 0) {
        el.classList.add("scroll-reveal", "is-visible");
      } else {
        // Tag as scroll-reveal and calculate stagger if in a grid/list
        el.classList.add("scroll-reveal");

        // Stagger sibling elements gently
        const siblingIndex = Array.from(
          el.parentElement?.children || []
        ).indexOf(el);
        if (siblingIndex > 0 && siblingIndex <= 5) {
          el.style.transitionDelay = `${siblingIndex * 80}ms`;
        }

        observer.observe(el);
      }
    });

    // Also observe all major images on the page for luxury fade-in rise
    const images = Array.from(
      document.querySelectorAll<HTMLElement>("main img")
    );

    images.forEach((img) => {
      if (img.classList.contains("is-visible") || img.closest(".no-scroll-reveal"))
        return;

      const rect = img.getBoundingClientRect();
      if (rect.top < windowHeight * 0.95 && rect.bottom > 0) {
        img.classList.add("scroll-reveal-img", "is-visible");
      } else {
        img.classList.add("scroll-reveal-img");
        observer.observe(img);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
