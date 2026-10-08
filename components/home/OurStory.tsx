"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { storySlides } from "@/data/occasions";
import type { StorySlide } from "@/types/occasion";
import { cn } from "@/lib/utils";

interface OurStoryProps {
  stories?: StorySlide[];
}

export function OurStory({ stories = storySlides }: OurStoryProps) {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const currentStory = stories[activeStoryIndex] || stories[0];
  const hasMultipleStories = stories.length > 1;

  const changeSlide = useCallback(
    (newIndex: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setActiveStoryIndex(newIndex);
      setTimeout(() => {
        setIsAnimating(false);
      }, 400);
    },
    [isAnimating]
  );

  const handleNext = useCallback(() => {
    const nextIdx = (activeStoryIndex + 1) % stories.length;
    changeSlide(nextIdx);
  }, [activeStoryIndex, stories.length, changeSlide]);

  const handlePrev = useCallback(() => {
    const prevIdx = (activeStoryIndex - 1 + stories.length) % stories.length;
    changeSlide(prevIdx);
  }, [activeStoryIndex, stories.length, changeSlide]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX.current - touchEndX;

    if (Math.abs(diffX) > 45) {
      if (diffX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  // Keyboard navigation when focused
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <section
      id="our-story"
      className="relative w-full py-16 sm:py-20 md:py-24 bg-[#FAF8F5]/60 border-y border-[#ECE7DE]/70 overflow-hidden"
      aria-labelledby="story-heading"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Eyebrow Header */}
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-flex items-center justify-center gap-3 mb-2.5">
            <span className="w-8 h-[1px] bg-[#D6B772]/60" aria-hidden="true" />
            <p className="text-[9.5px] uppercase tracking-[0.28em] text-[#93753E] font-medium font-sans">
              Jaipur Atelier Chronicles
            </p>
            <span className="w-8 h-[1px] bg-[#D6B772]/60" aria-hidden="true" />
          </div>
          <h2
            id="story-heading"
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#12100E] font-normal tracking-tight"
          >
            The Heritage & Founder
          </h2>
        </div>

        {/* 2-Column Responsive Editorial Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-stretch">
          {/* Left: Immersive Royal Archway Card */}
          <div className="lg:col-span-7 relative flex flex-col justify-end min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#ECE7DE] shadow-[0_8px_30px_rgb(0,0,0,0.06)] bg-[#251911]">
            {/* Background Image */}
            <div
              key={`bg-${activeStoryIndex}`}
              className={cn(
                "absolute inset-0 w-full h-full transition-opacity duration-700 ease-out",
                isAnimating ? "opacity-70 scale-[1.02]" : "opacity-100 scale-100"
              )}
            >
              <Image
                src={currentStory.backdropImage}
                alt=""
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center"
              />
            </div>

            {/* Multi-Stop Royal Ambient Vignette Gradient */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/65 to-black/30 pointer-events-none"
              aria-hidden="true"
            />

            {/* Narrative Content with Smooth Transition */}
            <div
              key={`copy-${activeStoryIndex}`}
              className="relative z-10 p-6 sm:p-10 md:p-12 text-center sm:text-left flex flex-col justify-end h-full animate-media-fade"
            >
              {/* Slide Counter / Eyebrow */}
              <div className="flex items-center justify-center sm:justify-start gap-2.5 mb-3.5">
                <span className="px-2.5 py-0.5 text-[8.5px] uppercase tracking-[0.25em] font-medium bg-[#FAF8F5]/15 backdrop-blur-md text-[#D6B772] border border-[#D6B772]/30 rounded-full">
                  Chapter {String(activeStoryIndex + 1).padStart(2, "0")} /{" "}
                  {String(stories.length).padStart(2, "0")}
                </span>
                <span className="text-[#D6B772]/70 text-xs">·</span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-white/70">
                  Jaipur Atelier
                </span>
              </div>

              {/* Title in Regal Couture Serif */}
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[42px] text-white font-normal leading-[1.16] mb-4 text-shadow-sm">
                {currentStory.title}
              </h3>

              {/* Narrative Story Body */}
              <p className="text-xs sm:text-sm md:text-[14px] leading-[1.85] text-white/90 font-light font-sans max-w-xl mx-auto sm:mx-0">
                {currentStory.narrative}
              </p>

              {/* Founder Signoff */}
              <p className="font-serif italic text-xs sm:text-sm md:text-[15px] text-[#D6B772] mt-4 pt-3 border-t border-white/15">
                {currentStory.signoff}
              </p>
            </div>
          </div>

          {/* Right: Companion Fashion Look Card + Controls */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-5">
            {/* Visual Look Card */}
            <div className="relative w-full h-[360px] sm:h-[420px] lg:h-[490px] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#ECE7DE] shadow-[0_8px_30px_rgb(0,0,0,0.06)] bg-[#EAE4DC] group">
              <div
                key={`side-${activeStoryIndex}`}
                className={cn(
                  "relative w-full h-full transition-all duration-700 ease-out",
                  isAnimating ? "opacity-60 scale-[1.02]" : "opacity-100 scale-100"
                )}
              >
                <Image
                  src={currentStory.sideImage}
                  alt={currentStory.sideAlt || currentStory.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                />

                {/* Subtle Luxury Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                {/* Corner Eyebrow Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-[8.5px] uppercase tracking-[0.2em] font-medium bg-[#12100E]/80 backdrop-blur-md text-[#D6B772] border border-[#D6B772]/30 rounded-full">
                    Ceremonial Look {String(activeStoryIndex + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Bottom Caption Pill */}
                <div className="absolute bottom-4 inset-x-4 p-3 rounded-xl bg-black/55 backdrop-blur-md border border-white/10 text-white flex items-center justify-between gap-2">
                  <span className="font-serif text-xs sm:text-sm tracking-wide text-white/95 line-clamp-1">
                    {currentStory.sideAlt}
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-[#D6B772] shrink-0">
                    Jaipur
                  </span>
                </div>
              </div>
            </div>

            {/* Luxury Navigation Bar with Circular Arrows & Indicators */}
            {hasMultipleStories && (
              <div className="flex items-center justify-between px-2 sm:px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full border border-[#ECE7DE]">
                {/* Previous Button */}
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={isAnimating}
                  aria-label="Previous story chapter"
                  className="w-10 h-10 rounded-full border border-[#ECE7DE] bg-white text-[#12100E] hover:bg-[#12100E] hover:text-[#FAF8F5] hover:border-[#12100E] transition-all duration-300 shadow-sm flex items-center justify-center cursor-pointer active:scale-95 disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Pagination Indicators */}
                <div className="flex items-center gap-2">
                  {stories.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => changeSlide(idx)}
                      aria-label={`Go to story chapter ${idx + 1}`}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                        activeStoryIndex === idx
                          ? "w-8 bg-[#93753E]"
                          : "w-2 bg-[#D6B772]/40 hover:bg-[#D6B772]/80"
                      )}
                    />
                  ))}
                </div>

                {/* Next Button */}
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={isAnimating}
                  aria-label="Next story chapter"
                  className="w-10 h-10 rounded-full border border-[#ECE7DE] bg-white text-[#12100E] hover:bg-[#12100E] hover:text-[#FAF8F5] hover:border-[#12100E] transition-all duration-300 shadow-sm flex items-center justify-center cursor-pointer active:scale-95 disabled:opacity-50"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
