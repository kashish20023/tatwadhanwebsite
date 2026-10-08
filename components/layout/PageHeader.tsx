import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface PageHeaderProps {
  breadcrumbCurrent: string;
  breadcrumbParent?: string;
  breadcrumbParentHref?: string;
  title: string;
  eyebrow?: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  breadcrumbCurrent,
  breadcrumbParent = "Home",
  breadcrumbParentHref = "/",
  title,
  eyebrow,
  description,
  className,
  children,
}: PageHeaderProps) {
  return (
    <section
      className={cn(
        "relative border-b border-[#ECE7DE] bg-[#FAF8F5] pt-16 pb-14 md:pt-20 md:pb-16 px-6 text-center overflow-hidden",
        className
      )}
    >
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        {/* 1. Breadcrumb Eyebrow */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center justify-center gap-2.5 text-[9px] uppercase tracking-[0.28em] text-[#93753E] mb-4 font-medium font-sans"
        >
          <Link
            href={breadcrumbParentHref}
            className="hover:text-[#12100E] transition-colors"
          >
            {breadcrumbParent}
          </Link>
          <span className="text-[#D6B772]/60 font-light" aria-hidden="true">
            /
          </span>
          <span className="text-[#787268]">{breadcrumbCurrent}</span>
        </nav>

        {/* 2. Main Title in Regal Serif */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#12100E] font-normal tracking-tight leading-[1.14] mb-3">
          {title}
        </h1>

        {/* 3. Balanced Subtitle with Gold Hairline Flanks */}
        {eyebrow && (
          <div className="flex items-center justify-center gap-3 my-2.5">
            <span className="w-7 h-[1px] bg-[#D6B772]/45" aria-hidden="true" />
            <p className="text-[9.5px] uppercase tracking-[0.22em] text-[#93753E] font-medium font-sans">
              {eyebrow}
            </p>
            <span className="w-7 h-[1px] bg-[#D6B772]/45" aria-hidden="true" />
          </div>
        )}

        {/* 4. Editorial Narrative Description */}
        {description && (
          <p className="text-xs sm:text-[13px] text-[#666056] leading-[1.8] max-w-lg mx-auto font-sans font-light mt-2.5">
            {description}
          </p>
        )}

        {/* 5. Optional Action / Filter Controls */}
        {children && <div className="w-full mt-4">{children}</div>}
      </div>
    </section>
  );
}
