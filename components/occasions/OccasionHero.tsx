import Link from "next/link";

interface OccasionHeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

export function OccasionHero({
  title = "Occasion Chapters",
  subtitle = "Ceremonial Wardrobe",
  description = "From moonlit Sangeet nights to the sacred pheras, each ceremonial chapter is meticulously curated in pure raw silks, zardozi needlework, and bespoke royal cuts.",
}: OccasionHeroProps) {
  return (
    <section className="border-b border-[#ECE7DE] bg-[#FBF9F6] pt-14 pb-12 px-6 text-center">
      <div className="max-w-3xl mx-auto">
        <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-[9px] uppercase tracking-[0.25em] text-[#93753E] mb-3.5 font-medium">
          <Link href="/" className="hover:text-[#12100E] transition-colors">Home</Link>
          <span className="text-[#ECE7DE]">/</span>
          <span className="text-[#666056]">Occasions</span>
        </nav>

        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#12100E] font-normal tracking-tight mb-2.5">
          {title}
        </h1>

        <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#93753E] font-medium mb-3">
          {subtitle}
        </p>

        <p className="text-xs md:text-sm text-[#666056] leading-relaxed max-w-lg mx-auto font-sans">
          {description}
        </p>
      </div>
    </section>
  );
}
