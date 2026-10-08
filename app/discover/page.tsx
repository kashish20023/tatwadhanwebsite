import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/layout/PageHeader";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Discover | The Craft of Tatvdhan",
  description: "Explore the artisanal craftsmanship, Rajasthan textile heritage, and tailoring atelier behind Tatvdhan Jaipur.",
};

export default function DiscoverPage() {
  return (
    <div className="min-h-screen bg-white text-[#101010]">
      <Header />

      <PageHeader
        breadcrumbCurrent="Discover"
        title="The Craft & Heritage"
        eyebrow="Jaipur Artisans · Handloom Tradition"
        description="Centuries of royal Rajasthani court embroidery, brought into dialogue with modern tailoring and effortless contemporary silhouettes."
      />

      {/* Discovery Story Grid */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-24 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
          <div className="aspect-[4/5] bg-[#FBF9F6] overflow-hidden">
            <img
              src="/images/image_22.webp"
              alt="Macro embroidery study"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-[0.24em] font-medium text-[#93753E] block mb-2">
              Technique 01
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#12100E] font-normal mb-4">
              Real Zardozi & Metallic Filament
            </h2>
            <p className="text-xs md:text-sm text-[#666056] leading-relaxed mb-6 font-sans">
              Hand-twisted gold and silver bullion wire meticulously coiled and stitched onto raw silk. Each panel requires dozens of karigar hours to balance structural rigidity with natural movement.
            </p>
            <Link
              href="/collection"
              className="text-[9px] uppercase tracking-[0.2em] font-sans font-medium text-[#12100E] border-b border-[#12100E] pb-1 hover:text-[#93753E] hover:border-[#93753E] transition-colors"
            >
              View Finished Silhouettes ↗
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center md:flex-row-reverse">
          <div className="aspect-[4/5] bg-[#FBF9F6] overflow-hidden md:order-2">
            <img
              src="/images/image_02.webp"
              alt="Jaipur palace architecture"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:order-1">
            <span className="text-[9px] uppercase tracking-[0.24em] font-medium text-[#93753E] block mb-2">
              Atmosphere 02
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#12100E] font-normal mb-4">
              The Architecture of Jaipur
            </h2>
            <p className="text-xs md:text-sm text-[#666056] leading-relaxed mb-6 font-sans">
              From carved red sandstone jharokhas to the serene symmetry of Amber Palace courtyards, our garment proportions echo the noble scale of royal architecture.
            </p>
            <Link
              href="/our-story"
              className="text-[9px] uppercase tracking-[0.2em] font-sans font-medium text-[#12100E] border-b border-[#12100E] pb-1 hover:text-[#93753E] hover:border-[#93753E] transition-colors"
            >
              Read Atelier Story ↗
            </Link>
          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
}
