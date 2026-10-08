import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/layout/PageHeader";
import { MediaGallery } from "@/components/media/MediaGallery";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Media & Visual Archives | Tatvdhan Jaipur",
  description: "Editorial campaigns, runway captures, and haute couture photographic chronicles from Tatvdhan Jaipur.",
};

export default function MediaPage() {
  return (
    <div className="min-h-screen bg-white text-[#101010]">
      <Header />

      <PageHeader
        breadcrumbCurrent="Media"
        title="Media & Visual Archive"
        eyebrow="Runway · Campaigns · Atelier"
        description="A photographic anthology celebrating royal Indian craftsmanship, palace campaigns, and runway artistry."
      />

      <main className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16">
        <MediaGallery />
      </main>

      <Footer />
    </div>
  );
}

