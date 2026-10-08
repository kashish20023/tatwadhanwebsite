import React from "react";
import Link from "next/link";

interface CollectionHeroProps {
  breadcrumbParent?: string;
  breadcrumbCurrent?: string;
  title?: string;
  season?: string;
  description?: string;
  children?: React.ReactNode;
}

export function CollectionHero({
  breadcrumbParent = "Home",
  breadcrumbCurrent = "Collection",
  title = "The Wedding Chapter",
  season = "Autumn / Winter 2026",
  description = "A dual photographic study in bespoke Indian bridal couture, juxtaposing macro craftsmanship against regal Jaipur architecture.",
  children,
}: CollectionHeroProps) {
  return (
    <section className="border-b border-[#ECE7DE] bg-[#FBF9F6] pt-14 pb-12 px-6 text-center">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb / Eyebrow */}
        <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-[9px] uppercase tracking-[0.25em] text-[#93753E] mb-3.5 font-medium">
          <Link href="/" className="hover:text-[#12100E] transition-colors">{breadcrumbParent}</Link>
          <span className="text-[#ECE7DE]">/</span>
          <span className="text-[#666056]">{breadcrumbCurrent}</span>
        </nav>

        {/* Heading */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#12100E] font-normal tracking-tight mb-2.5">
          {title}
        </h1>

        {/* Subtitle & Editorial Description */}
        <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#93753E] font-medium mb-3">
          {season}
        </p>

        <p className="text-xs md:text-sm text-[#666056] leading-relaxed max-w-lg mx-auto font-sans">
          {description}
        </p>

        {children}
      </div>
    </section>
  );
}
