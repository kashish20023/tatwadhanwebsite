"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { mediaGalleryItems, mediaCategories } from "@/data/media";
import { cn } from "@/lib/utils";

export function MediaGallery() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [animatingKey, setAnimatingKey] = useState<number>(0);

  const filteredItems = React.useMemo(() => {
    if (activeCategory === "all") return mediaGalleryItems;
    return mediaGalleryItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const handleCategoryChange = (catId: string) => {
    if (catId === activeCategory) return;
    setActiveCategory(catId);
    setAnimatingKey((prev) => prev + 1);
  };

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setSelectedImageIndex(null);
  }, []);

  // Lock body scroll during lightbox modal view
  useEffect(() => {
    if (selectedImageIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedImageIndex]);

  const nextImage = useCallback(() => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) =>
      prev !== null ? (prev + 1) % filteredItems.length : 0
    );
  }, [selectedImageIndex, filteredItems.length]);

  const prevImage = useCallback(() => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) =>
      prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : 0
    );
  }, [selectedImageIndex, filteredItems.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex, closeLightbox, nextImage, prevImage]);

  const currentItem = selectedImageIndex !== null ? filteredItems[selectedImageIndex] : null;

  return (
    <div className="w-full">
      {/* 1. Category Filter Navigation Bar */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-10 md:mb-14">
        {mediaCategories.map((cat) => {
          const count =
            cat.id === "all"
              ? mediaGalleryItems.length
              : mediaGalleryItems.filter((i) => i.category === cat.id).length;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={cn(
                "group relative px-4 sm:px-5 py-2 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-300 rounded-full",
                isActive
                  ? "bg-[#12100E] text-[#FBF9F6] shadow-sm scale-100"
                  : "bg-white/90 text-[#666056] border border-[#ECE7DE] hover:border-[#D6B772]/80 hover:text-[#12100E] hover:bg-[#FAF8F5]"
              )}
            >
              <span>{cat.label}</span>
              <span
                className={cn(
                  "ml-1.5 text-[9px] transition-colors",
                  isActive ? "text-[#D6B772]" : "text-[#93753E]/70 group-hover:text-[#93753E]"
                )}
              >
                ({count})
              </span>
            </button>
          );
        })}
      </div>

      {/* 2. Seamless Complete Asymmetric Grid with Dense Auto-Flow (Zero Blank Holes) */}
      <div
        key={animatingKey}
        className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[220px] sm:auto-rows-[260px] md:auto-rows-[290px] lg:auto-rows-[310px] gap-3 sm:gap-4 md:gap-5 grid-flow-dense"
      >
        {filteredItems.map((item, index) => {
          // In "all" mode, use the mathematically balanced spans. In category mode, keep cards clean so rows fill completely.
          const spanClass =
            activeCategory === "all"
              ? item.spanClass
              : "col-span-1 row-span-1 lg:col-span-1 lg:row-span-1";

          return (
            <div
              key={`${item.id}-${index}`}
              onClick={() => openLightbox(index)}
              style={{
                animationDelay: `${Math.min(index * 45, 600)}ms`,
              }}
              className={cn(
                "group relative overflow-hidden rounded-sm cursor-pointer border border-[#ECE7DE] bg-[#FAF8F5] transition-all duration-500 ease-out animate-media-fade",
                spanClass,
                "hover:border-[#93753E] hover:shadow-[0_10px_35px_-8px_rgba(18,16,14,0.18)]"
              )}
            >
              {/* Image Frame */}
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                  priority={index < 4}
                />

                {/* Ambient Depth Vignette on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Top Corner Eyebrow Badge */}
                <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-1 group-hover:translate-y-0 pointer-events-none">
                  <span className="px-2 py-0.5 text-[8px] sm:text-[8.5px] uppercase tracking-[0.2em] font-medium bg-[#12100E]/85 backdrop-blur-sm text-[#D6B772] border border-[#D6B772]/30 rounded-[2px]">
                    {item.tag}
                  </span>
                </div>

                {/* Top Right Zoom Icon Indicator */}
                <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-7 h-7 rounded-full bg-[#12100E]/75 backdrop-blur-sm text-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 border border-white/20">
                  <Maximize2 className="w-3.5 h-3.5 text-[#FAF8F5]" />
                </div>

                {/* Bottom Caption & Editorial Title Reveal */}
                <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[8px] sm:text-[8.5px] uppercase tracking-[0.22em] text-[#D6B772] font-medium">
                      {item.location || "Tatvdhan Jaipur"}
                    </span>
                    {item.year && (
                      <span className="text-[8px] text-white/60">· {item.year}</span>
                    )}
                  </div>
                  <h3 className="font-serif text-base sm:text-lg md:text-xl text-white font-normal leading-tight drop-shadow-sm">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Luxury Fullscreen Editorial Lightbox Modal */}
      {selectedImageIndex !== null && currentItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0C0B0A]/95 backdrop-blur-md transition-opacity duration-300 animate-media-fade"
          onClick={closeLightbox}
        >
          {/* Top Bar Controls */}
          <div
            className="absolute top-0 inset-x-0 h-16 sm:h-20 px-6 sm:px-10 flex items-center justify-between text-white/80 z-20 pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#D6B772] font-medium">
                Tatvdhan Visual Archive
              </span>
              <span className="text-white/30">|</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/70">
                {selectedImageIndex + 1} / {filteredItems.length}
              </span>
            </div>

            <button
              onClick={closeLightbox}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors flex items-center gap-2 text-xs uppercase tracking-widest"
              aria-label="Close Lightbox"
            >
              <span className="hidden sm:inline text-[9px] tracking-[0.25em]">Close</span>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Prev Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white bg-black/40 hover:bg-black/70 rounded-full backdrop-blur-sm border border-white/10 transition-all z-20"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Navigation Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white bg-black/40 hover:bg-black/70 rounded-full backdrop-blur-sm border border-white/10 transition-all z-20"
            aria-label="Next Image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Central Image Showcase */}
          <div
            className="relative max-w-5xl max-h-[78vh] w-full h-[78vh] mx-4 sm:mx-12 p-2 flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full max-h-[68vh] flex items-center justify-center">
              <Image
                src={currentItem.src}
                alt={currentItem.alt}
                fill
                priority
                className="object-contain drop-shadow-2xl"
                sizes="(max-width: 1280px) 90vw, 1200px"
              />
            </div>

            {/* Lightbox Footer Caption */}
            <div className="w-full text-center mt-4">
              <div className="flex items-center justify-center gap-3 mb-1">
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#D6B772] font-medium">
                  {currentItem.tag}
                </span>
                {currentItem.location && (
                  <>
                    <span className="text-white/30 text-xs">·</span>
                    <span className="text-[9.5px] uppercase tracking-[0.2em] text-white/60">
                      {currentItem.location}
                    </span>
                  </>
                )}
              </div>
              <h2 className="font-serif text-xl sm:text-2xl text-white font-normal">
                {currentItem.title}
              </h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
