"use client";

import { useEffect, useRef, useState } from "react";

interface HeroProps {
  videoSrc?: string;
  fallbackImage?: string;
  eyebrow?: string;
  title?: string;
  ctaText?: string;
  ctaHref?: string;
}

export function Hero({
  videoSrc = "/final-render.mp4",
  fallbackImage = "/images/image_18.webp",
  eyebrow = "Tatvdhan · Jaipur",
  title = "The Wedding Chapter",
  ctaText = "Discover the collection",
  ctaHref = "#collection",
}: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section className="hero" aria-labelledby="hero-title">
      <img
        className="hero-image"
        src={fallbackImage}
        alt="The Tatvdhan wedding collection displayed in a heritage interior"
        loading="eager"
      />

      <video
        ref={videoRef}
        src={videoSrc}
        className={
          "hero-video transition-opacity duration-700 " +
          (videoLoaded ? "opacity-100" : "opacity-0")
        }
        autoPlay
        muted
        loop
        playsInline
        poster={fallbackImage}
        onLoadedData={() => setVideoLoaded(true)}
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      <div className="hero-shade" aria-hidden="true" />

      <div className="hero-content">
        <p className="eyebrow hero-eyebrow">{eyebrow}</p>
        <h1 id="hero-title">{title}</h1>
        <a className="hero-link" href={ctaHref}>
          {ctaText} <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
