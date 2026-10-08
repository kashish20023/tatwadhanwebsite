import React from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/Eyebrow";

interface QuoteSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  quote?: string;
  eyebrow?: string;
  supportingText?: string;
  ctaText?: string;
  ctaHref?: string;
  dark?: boolean;
}

export function QuoteSection({
  quote = "“Tatvdhan — Rooted in tradition. Made for today.”",
  eyebrow = "Bespoke Philosophy",
  supportingText = "Each silhouette is handcrafted by master karigars in Jaipur. Schedule a private consultation at our flagship or arrange a virtual trunk show.",
  ctaText = "Inquire About The Collection",
  ctaHref = "mailto:contact@tatvdhan.com?subject=Private%20Couture%20Inquiry",
  dark = true,
  className,
  ...props
}: QuoteSectionProps) {
  return (
    <section
      className={cn(
        "py-16 md:py-20 px-6 text-center border-t",
        dark
          ? "bg-[#17120E] text-white border-[#ECE7DE]/10"
          : "bg-[#FBF9F6] text-[#12100E] border-[#ECE7DE]",
        className
      )}
      {...props}
    >
      <div className="max-w-xl mx-auto">
        {eyebrow && <Eyebrow color="gold">{eyebrow}</Eyebrow>}
        <blockquote
          className={cn(
            "font-serif text-2xl md:text-3xl italic mb-4 font-normal leading-relaxed",
            dark ? "text-[#F4ECDF]" : "text-[#12100E]"
          )}
        >
          {quote}
        </blockquote>
        {supportingText && (
          <p
            className={cn(
              "text-xs leading-relaxed font-sans mb-8 max-w-md mx-auto",
              dark ? "text-[#F4ECDF]/70" : "text-[#666056]"
            )}
          >
            {supportingText}
          </p>
        )}
        {ctaText && (
          <a
            href={ctaHref}
            className="inline-flex items-center gap-3 border border-[#D6B772] text-[#F4ECDF] px-8 py-3.5 text-[9px] uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#D6B772] hover:text-[#17120E]"
          >
            <span>{ctaText}</span>
            <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </section>
  );
}
