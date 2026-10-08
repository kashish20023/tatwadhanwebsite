"use client";

import React from "react";
import { BeforeAfterCard } from "@/components/ui/before-after-card";
import { Sparkles } from "lucide-react";

interface AtelierStudy {
  id: string;
  tag: string;
  title: string;
  afterSrc: string;
  afterAlt: string;
  beforeAlt: string;
  beforeLabel: string;
  afterLabel: string;
  caption: string;
  defaultPosition: number;
}

const studies: AtelierStudy[] = [
  {
    id: "zardozi",
    tag: "01. Zardozi Craft",
    title: "Micro-Zardozi Embroidery",
    afterSrc: "/images/image_22.webp",
    afterAlt: "Macro close-up of intricate floral zardozi embroidery and sequin grid details",
    beforeAlt: "Raw blush handloom silk textile without gold embroidery",
    beforeLabel: "Raw Loom",
    afterLabel: "Imperial Zardozi",
    caption: "Drag the lens to examine the transition between virgin handloom silk and generational metallic zardozi work.",
    defaultPosition: 52,
  },
  {
    id: "silhouette",
    tag: "02. Imperial Cut",
    title: "The Royal Jaipur Sherwani",
    afterSrc: "/images/image_21.webp",
    afterAlt: "Royal Jaipur sherwani silhouette in blush silk with tailored heritage details",
    beforeAlt: "Architectural silhouette drafting in monochrome tone",
    beforeLabel: "Raw Form",
    afterLabel: "Royal Blush",
    caption: "Scrub to compare tailored structural silhouette drafting against the finished royal blush silk regalia.",
    defaultPosition: 50,
  },
  {
    id: "atmosphere",
    tag: "03. Heritage Setting",
    title: "Palace Atmosphere & Light",
    afterSrc: "/images/image_02.webp",
    afterAlt: "Model in traditional couture seated in a Jaipur palace pavilion overlooking domes",
    beforeAlt: "Architectural study exposure in monochromatic tone",
    beforeLabel: "Monochrome",
    afterLabel: "Amber Mood",
    caption: "Slide to reveal the golden hour illumination and regal depth calibrated inside the historic royal fort.",
    defaultPosition: 48,
  },
];

export function CraftComparisonSection() {
  return (
    <section
      aria-labelledby="craft-comparison-heading"
      className="w-full bg-[#FAF8F5]/90 border-t border-[#ECE7DE] py-16 sm:py-20 md:py-24"
    >
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#101010]/10 shadow-xs text-xs font-medium text-[#9b7530] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="tracking-[0.2em] uppercase text-[10px]">
              Interactive Atelier Studies
            </span>
          </div>
          <h2
            id="craft-comparison-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#101010] font-normal tracking-tight"
          >
            The Art of Metamorphosis
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            Interact with our three curated atelier studies below. Drag the interactive lens on each piece to inspect the dialogue between raw unembellished foundations and master-finished royal couture.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full max-w-7xl mx-auto">
          {studies.map((study) => (
            <div
              key={study.id}
            >


              <div className="w-full flex-1 flex flex-col justify-between">
                <BeforeAfterCard
                  afterSrc={study.afterSrc}
                  afterAlt={study.afterAlt}
                  beforeAlt={study.beforeAlt}
                  beforeLabel={study.beforeLabel}
                  afterLabel={study.afterLabel}
                  caption={study.caption}
                  defaultPosition={study.defaultPosition}
                  orientation="horizontal"
                  showPercent={true}
                  autoDemo={true}
                  aspectClassName="aspect-[4/5]"
                  className="w-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
