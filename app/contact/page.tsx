import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/layout/PageHeader";
import { contactDetails } from "@/data/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private Consultation & Concierge | Tatvdhan Jaipur",
  description: "Schedule a private consultation or virtual trunk show with the Tatvdhan Jaipur concierge.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-[#101010]">
      <Header />

      <PageHeader
        breadcrumbCurrent="Contact"
        title="Atelier Consultations"
        eyebrow="Bespoke Fittings & Private Viewings"
        description="Whether visiting our flagship atelier in Jaipur or arranging a dedicated virtual consultation overseas, our concierge is at your service."
      />

      <section className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Direct Concierge Info */}
          <div className="space-y-8">
            <div>
              <p className="text-[9px] uppercase tracking-[0.22em] text-[#93753E] font-medium mb-2">Flagship Location</p>
              <h2 className="font-serif text-xl text-[#12100E]">Jaipur Flagship Atelier</h2>
              <p className="text-xs text-[#666056] mt-1 leading-relaxed">
                Civil Lines, Jaipur, Rajasthan 302006, India
              </p>
            </div>

            <div>
              <p className="text-[9px] uppercase tracking-[0.22em] text-[#93753E] font-medium mb-2">Electronic Mail</p>
              <a href={`mailto:${contactDetails.email}`} className="font-serif text-lg text-[#12100E] hover:text-[#93753E] transition-colors">
                {contactDetails.email}
              </a>
            </div>

            <div>
              <p className="text-[9px] uppercase tracking-[0.22em] text-[#93753E] font-medium mb-2">Private Hours</p>
              <p className="text-xs text-[#666056] leading-relaxed">
                Monday through Saturday, 10:30 AM – 7:30 PM IST<br />
                Strictly by prior appointment for bespoke bridal fittings.
              </p>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="bg-[#FBF9F6] p-8 border border-[#ECE7DE]">
            <h3 className="font-serif text-xl text-[#12100E] mb-2">Request an Appointment</h3>
            <p className="text-xs text-[#666056] mb-6">Our atelier concierge will respond within 24 hours.</p>

            <form className="space-y-4">
              <div>
                <label className="block text-[9px] uppercase tracking-[0.18em] text-[#666056] mb-1.5" htmlFor="name">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="Your Name"
                  className="w-full bg-white border border-[#ECE7DE] px-3.5 py-2.5 text-xs text-[#12100E] focus:outline-none focus:border-[#12100E]"
                />
              </div>

              <div>
                <label className="block text-[9px] uppercase tracking-[0.18em] text-[#666056] mb-1.5" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="w-full bg-white border border-[#ECE7DE] px-3.5 py-2.5 text-xs text-[#12100E] focus:outline-none focus:border-[#12100E]"
                />
              </div>

              <div>
                <label className="block text-[9px] uppercase tracking-[0.18em] text-[#666056] mb-1.5" htmlFor="occasion">
                  Wedding / Occasion Date
                </label>
                <input
                  id="occasion"
                  type="text"
                  placeholder="e.g. November 2026"
                  className="w-full bg-white border border-[#ECE7DE] px-3.5 py-2.5 text-xs text-[#12100E] focus:outline-none focus:border-[#12100E]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#12100E] text-[#FBF9F6] text-[10px] uppercase tracking-[0.2em] py-3 transition-colors hover:bg-[#93753E]"
              >
                Send Consultation Request
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
