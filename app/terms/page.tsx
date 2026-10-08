import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/layout/PageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Tatvdhan Jaipur",
  description: "Terms and conditions governing bespoke orders and services at Tatvdhan Jaipur.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-[#101010]">
      <Header />

      <PageHeader
        breadcrumbCurrent="Terms"
        title="Terms & Conditions"
        eyebrow="Atelier Standards · 2026"
        description="Terms and conditions governing bespoke commissions, fitting milestones, and atelier craftsmanship."
      />

      <article className="max-w-3xl mx-auto px-6 py-16 md:py-20 text-[#666056] text-xs md:text-sm leading-relaxed space-y-8 font-sans">
        <section>
          <h2 className="font-serif text-xl text-[#12100E] mb-3">1. Bespoke Commissions</h2>
          <p>
            Every Tatvdhan ensemble is individually tailored to client measurements and crafted by hand in Jaipur. Due to the artisanal hand-embroidery process, subtle natural variations in dye lots and threadwork reflect true authenticity and are an inherent quality of haute couture.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-[#12100E] mb-3">2. Fitting & Delivery Timelines</h2>
          <p>
            Production timelines are estimated based on agreed ceremonial dates. We require timely completion of scheduled fitting milestones to guarantee final handover ahead of ceremonial occasions.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-[#12100E] mb-3">3. Intellectual Property</h2>
          <p>
            All campaign imagery, lookbook photography, proprietary embroidery patterns, and garment cuts remain the exclusive intellectual property of Tatvdhan Jaipur and Vinayak Agarwal.
          </p>
        </section>
      </article>

      <Footer />
    </div>
  );
}
