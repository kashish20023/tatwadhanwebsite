import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/layout/PageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy & Cookies Policy | Tatvdhan Jaipur",
  description: "Privacy and cookies policy for clients and visitors of Tatvdhan Jaipur.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-[#101010]">
      <Header />

      <PageHeader
        breadcrumbCurrent="Privacy"
        title="Privacy & Cookies Policy"
        eyebrow="Atelier Standards · 2026"
        description="Our commitments to client confidentiality, fitting data protection, and secure atelier services."
      />

      <article className="max-w-3xl mx-auto px-6 py-16 md:py-20 text-[#666056] text-xs md:text-sm leading-relaxed space-y-8 font-sans">
        <section>
          <h2 className="font-serif text-xl text-[#12100E] mb-3">1. Information Collection</h2>
          <p>
            Tatvdhan Jaipur collects personal identification details (name, email address, physical measurements, and shipping information) solely to process bespoke couture commissions, private fitting appointments, and newsletter requests.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-[#12100E] mb-3">2. Confidentiality & Atelier Security</h2>
          <p>
            Your private design consultations, bridal sketches, and personal measurements are held strictly confidential within our Jaipur atelier and are never shared with external advertisers or commercial third parties.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-[#12100E] mb-3">3. Cookies & Analytics</h2>
          <p>
            We use essential cookies strictly to provide responsive website navigation, remember currency preferences, and ensure optimal delivery of high-resolution lookbook imagery.
          </p>
        </section>
      </article>

      <Footer />
    </div>
  );
}
