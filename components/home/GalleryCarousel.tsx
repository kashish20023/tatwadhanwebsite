"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export interface GalleryLook {
  file: string;
  alt: string;
}

const defaultLooks: GalleryLook[] = [
  {
    file: "/images/image_05.webp",
    alt: "The Wedding Chapter celebratory evening with friends",
  },
  {
    file: "/images/image_19.webp",
    alt: "Model in blush embroidered sherwani lying on carpet",
  },
  {
    file: "/images/image_20.webp",
    alt: "Model in blush embroidered sherwani",
  },
  {
    file: "/images/image_03.webp",
    alt: "Seated traditional couture portrait",
  },
  {
    file: "/images/image_21.webp",
    alt: "Model in embroidered sherwani standing",
  },
  {
    file: "/images/image_02.webp",
    alt: "Couture in Jaipur palace pavilion",
  },
];

interface GalleryCarouselProps {
  title?: string;
  description?: string;
  looks?: GalleryLook[];
}

export function GalleryCarousel({
  title = "Lorem Lipsum",
  description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  looks = defaultLooks,
}: GalleryCarouselProps) {
  const REPEAT_COUNT = 7;
  const INITIAL_INDEX = looks.length * 3;

  const [currentIndex, setCurrentIndex] = useState(INITIAL_INDEX);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [trackOffset, setTrackOffset] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const touchStartX = useRef<number | null>(null);

  const updateOffset = useCallback((index: number) => {
    const container = containerRef.current;
    const card = cardRefs.current[index];
    if (!container || !card) return;

    const containerWidth = container.offsetWidth;
    const cardLeft = card.offsetLeft;
    const cardWidth = card.offsetWidth;

    const targetOffset = containerWidth / 2 - (cardLeft + cardWidth / 2);
    setTrackOffset(targetOffset);
  }, []);

  useEffect(() => {
    updateOffset(currentIndex);

    const handleResize = () => {
      updateOffset(currentIndex);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentIndex, updateOffset]);

  const handleTransitionEnd = () => {
    const minThreshold = looks.length;
    const maxThreshold = looks.length * (REPEAT_COUNT - 1);

    if (currentIndex >= maxThreshold) {
      setIsTransitioning(false);
      const wrappedIndex = currentIndex - looks.length * 2;
      setCurrentIndex(wrappedIndex);
      requestAnimationFrame(() => {
        updateOffset(wrappedIndex);
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
    } else if (currentIndex < minThreshold) {
      setIsTransitioning(false);
      const wrappedIndex = currentIndex + looks.length * 2;
      setCurrentIndex(wrappedIndex);
      requestAnimationFrame(() => {
        updateOffset(wrappedIndex);
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
    }
  };

  const handleNext = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const handlePrev = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, []);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || isPaused) return;

    const interval = setInterval(() => {
      handleNext();
    }, 2800);

    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX.current;
    if (Math.abs(diff) > 40) {
      if (diff < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
    setIsPaused(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    }
  };

  const displayItems: { look: GalleryLook; uniqueKey: string; itemIndex: number }[] = [];
  for (let r = 0; r < REPEAT_COUNT; r++) {
    looks.forEach((look, i) => {
      const itemIndex = r * looks.length + i;
      displayItems.push({
        look,
        uniqueKey: `${look.file}-${itemIndex}`,
        itemIndex,
      });
    });
  }

  return (
    <section className="gallery-showcase-section" aria-labelledby="gallery-heading">
      <div className="gallery-header">
        <h2 id="gallery-heading">{title}</h2>
        <p>{description}</p>
      </div>

      <div
        className="gallery-track-wrap"
        ref={containerRef}
        aria-label="Tatvdhan collection slider"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="gallery-track"
          ref={trackRef}
          onTransitionEnd={handleTransitionEnd}
          style={{
            transform: `translateX(${trackOffset}px)`,
            transition: isTransitioning
              ? "transform 0.75s cubic-bezier(0.25, 1, 0.5, 1)"
              : "none",
          }}
        >
          {displayItems.map(({ look, uniqueKey, itemIndex }) => {
            const isCenter = itemIndex === currentIndex;

            return (
              <figure
                key={uniqueKey}
                ref={(el) => {
                  cardRefs.current[itemIndex] = el;
                }}
                className={
                  "gallery-card " +
                  (isCenter ? "gallery-card-center" : "gallery-card-side")
                }
                onClick={() => {
                  setIsTransitioning(true);
                  setCurrentIndex(itemIndex);
                }}
                role="button"
                tabIndex={-1}
                aria-label={`View ${look.alt}`}
              >
                <img
                  src={look.file}
                  alt={look.alt}
                  loading="lazy"
                />
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
