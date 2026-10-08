import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/layout/PageHeader";
import { FounderSection } from "@/components/home/FounderSection";
import { OurStory } from "@/components/home/OurStory";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story | Vinayak Agarwal & Tatvdhan Jaipur",
  description: "The founding philosophy, design ethos, and master craftsmanship of Tatvdhan Jaipur by Vinayak Agarwal.",
};

export default function StoryPage() {
  return (
    <div className="min-h-screen bg-white text-[#101010]">
      <Header />

      <PageHeader
        breadcrumbCurrent="Our Story"
        title="The Heritage & Founder"
        eyebrow="Atelier Philosophy · Jaipur"
        description="Tatvdhan began with a simple idea — to bring the beauty of Indian fashion into everyday life. Rooted in tradition. Made for today."
      />

      <OurStory />
      <FounderSection />

      <Footer />
    </div>
  );
}
