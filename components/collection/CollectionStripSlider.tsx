"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CollectionStripItem } from "@/types/collection";
import { collectionStripItems } from "@/data/collection";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

interface CollectionStripSliderProps {
  items?: CollectionStripItem[];
  intervalMs?: number;
  autoPlay?: boolean;
  eyebrow?: string;
  title?: string;
  instagramHandle?: string;
  instagramHref?: string;
  className?: string;
}

export function CollectionStripSlider({
  items = collectionStripItems,
  intervalMs = 3200,
  autoPlay = true,
  eyebrow = "",
  title = "",
  instagramHandle = "",
  instagramHref = "",
  className = "",
}: CollectionStripSliderProps) {
  // Triple buffer to guarantee completely glitch-free, infinite continuous sliding
  const originalCount = items.length;
  // We duplicate 3 times: [Buffer A, Buffer B (active), Buffer C]
  const bufferItems = [...items, ...items, ...items];

  // Number of items visible based on screen width (larger sizing with 4 items on desktop)
  const [visibleCount, setVisibleCount] = useState<number>(5);
  // Current index starts at the beginning of middle buffer B
  const [currentIndex, setCurrentIndex] = useState<number>(originalCount);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(true);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Drag / swipe states
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStartX, setDragStartX] = useState<number>(0);
  const [dragDeltaX, setDragDeltaX] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isResettingRef = useRef<boolean>(false);

  // Dynamically compute how many items should be visible per viewport
  useEffect(() => {
    function updateVisibleCount() {
      const width = window.innerWidth;
      if (width >= 1200) {
        setVisibleCount(5); // 4 large high-impact panels on desktop
      } else if (width >= 768) {
        setVisibleCount(4); // 3 panels on tablet
      } else {
        setVisibleCount(2); // 2 panels on mobile
      }
    }

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount, { passive: true });
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  // Slide forward by 1 item (bringing the next item in from the right)
  const slideNext = useCallback(() => {
    if (isResettingRef.current) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  // Slide backward by 1 item
  const slidePrev = useCallback(() => {
    if (isResettingRef.current) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, []);

  // Continuous auto-slide timer engine
  useEffect(() => {
    if (!autoPlay || isPaused || isDragging) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(() => {
      slideNext();
    }, intervalMs);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [autoPlay, isPaused, isDragging, intervalMs, slideNext]);

  // Handle window tab visibility change (pause timer when tab is hidden)
  useEffect(() => {
    function handleVisibilityChange() {
      if (document.hidden) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Handle infinite wrap-around silently on transition end
  const handleTransitionEnd = useCallback(() => {
    // If we moved past the middle buffer into buffer C
    if (currentIndex >= originalCount * 2) {
      isResettingRef.current = true;
      setIsTransitioning(false);
      const normalizedIndex = currentIndex - originalCount;
      setCurrentIndex(normalizedIndex);

      // Re-enable transition on the subsequent frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
          isResettingRef.current = false;
        });
      });
    }
    // If user dragged backwards before middle buffer into buffer A
    else if (currentIndex < originalCount) {
      isResettingRef.current = true;
      setIsTransitioning(false);
      const normalizedIndex = currentIndex + originalCount;
      setCurrentIndex(normalizedIndex);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
          isResettingRef.current = false;
        });
      });
    }
  }, [currentIndex, originalCount]);

  // Touch and Drag handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setIsPaused(true);
    setDragStartX(e.touches[0].clientX);
    setDragDeltaX(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    setDragDeltaX(currentX - dragStartX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    setIsPaused(false);

    const threshold = 40; // minimum pixels dragged to trigger 1 step
    if (dragDeltaX < -threshold) {
      slideNext();
    } else if (dragDeltaX > threshold) {
      slidePrev();
    }
    setDragDeltaX(0);
  };

  // Mouse Drag handlers (Desktop)
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setIsPaused(true);
    setDragStartX(e.clientX);
    setDragDeltaX(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setDragDeltaX(e.clientX - dragStartX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    setIsPaused(false);

    const threshold = 50;
    if (dragDeltaX < -threshold) {
      slideNext();
    } else if (dragDeltaX > threshold) {
      slidePrev();
    }
    setDragDeltaX(0);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setDragDeltaX(0);
    }
    setIsPaused(false);
  };

  // Calculate percentage offset for translateX
  const itemWidthPercent = 100 / visibleCount;
  const baseOffsetPercent = -(currentIndex * itemWidthPercent);
  const hasHeader = Boolean(title || eyebrow || instagramHandle);

  return (
    <section
      aria-label="Collection runway and atelier ribbon"
      className={`relative w-full bg-white select-none ${hasHeader ? "pt-10 md:pt-14" : "pt-0"} pb-0 ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Optional Editorial Section Header */}
      {hasHeader && (
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 pb-6 md:pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            {eyebrow && (
              <span className="text-[9px] sm:text-[10px] tracking-[0.25em] text-[#9b7530] uppercase font-semibold block mb-1.5">
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#101010] font-normal tracking-tight">
                {title}
              </h2>
            )}
          </div>

          {instagramHandle && (
            <div className="flex items-center gap-5 justify-between md:justify-end">
              <Link
                href={instagramHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#101010] hover:text-[#9b7530] transition-colors duration-200 group"
                aria-label={`Follow on Instagram ${instagramHandle}`}
              >
                <InstagramIcon className="w-4 h-4 text-[#9b7530] group-hover:scale-110 transition-transform duration-200" />
                <span>{instagramHandle}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#9b7530] opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Seamless Continuous Carousel Viewport in Square Format without Top Border */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden bg-white cursor-grab active:cursor-grabbing border-0"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div
          ref={trackRef}
          onTransitionEnd={handleTransitionEnd}
          className="flex flex-nowrap will-change-transform"
          style={{
            transform: `translate3d(calc(${baseOffsetPercent}% + ${dragDeltaX}px), 0, 0)`,
            transition: isTransitioning && !isDragging
              ? "transform 650ms cubic-bezier(0.22, 1, 0.36, 1)"
              : "none",
          }}
        >
          {bufferItems.map((item, idx) => {
            const itemKey = `${item.id}-buffer-${idx}`;
            return (
              <div
                key={itemKey}
                style={{ width: `${itemWidthPercent}%` }}
                className="relative flex-shrink-0 flex-grow-0 aspect-square group overflow-hidden bg-[#e8e0d6]"
              >
                {/* Image element with high-precision object fit */}
                <img
                  src={item.image}
                  alt={item.alt}
                  loading={idx < visibleCount * 2 ? "eager" : "lazy"}
                  decoding="async"
                  draggable={false}
                  className="w-full h-full object-cover object-center select-none transform transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Subtle dark luxury vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Micro-editorial info overlay on hover */}
                {item.title && (
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 md:p-6 text-white transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                    {item.tag && (
                      <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-[#E8C35A] font-semibold block">
                        {item.tag}
                      </span>
                    )}
                    <p className="text-sm sm:text-base font-serif font-light truncate mt-0.5">
                      {item.title}
                    </p>
                  </div>
                )}

                {/* Hairline border divider between slides */}
                <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-white/10 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
