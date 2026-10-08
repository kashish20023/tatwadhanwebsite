import type { OccasionLook } from "@/types/occasion";
import { EditorialImage } from "@/components/editorial/EditorialImage";

interface OccasionChapterProps {
  chapterNumber: string;
  title: string;
  subtitle: string;
  description: string;
  looks: OccasionLook[];
  reverse?: boolean;
}

export function OccasionChapter({
  chapterNumber,
  title,
  subtitle,
  description,
  looks,
  reverse = false,
}: OccasionChapterProps) {
  return (
    <article className="border-b border-[#ECE7DE] py-16 md:py-24 px-4 sm:px-6 md:px-8 max-w-[1600px] mx-auto">
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center ${reverse ? "lg:flex-row-reverse" : ""}`}>
        {/* Editorial Text Column */}
        <div className={`lg:col-span-4 ${reverse ? "lg:order-2" : "lg:order-1"}`}>
          <span className="text-[9px] uppercase tracking-[0.24em] font-medium text-[#93753E] block mb-2">
            Chapter {chapterNumber}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#12100E] font-normal tracking-tight mb-2">
            {title}
          </h2>
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#666056] font-medium mb-4">
            {subtitle}
          </p>
          <p className="text-xs md:text-sm text-[#666056] leading-relaxed font-sans mb-6">
            {description}
          </p>
          <a
            href="mailto:contact@tatvdhan.com?subject=Occasion%20Styling%20Inquiry"
            className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] font-sans font-medium text-[#12100E] border-b border-[#12100E] pb-1 hover:text-[#93753E] hover:border-[#93753E] transition-colors"
          >
            <span>Consult Atelier Stylist</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        {/* Look Images Gallery */}
        <div className={`lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 ${reverse ? "lg:order-1" : "lg:order-2"}`}>
          {looks.map((look) => (
            <div key={look.file} className="flex flex-col">
              <EditorialImage src={look.file} alt={look.alt} />
              {look.title && (
                <div className="pt-3">
                  <h3 className="font-serif text-base text-[#12100E]">{look.title}</h3>
                  {look.caption && (
                    <p className="text-[10px] text-[#787268] font-sans tracking-wide mt-0.5">
                      {look.caption}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
