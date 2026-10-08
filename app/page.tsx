import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { EditorialSection } from "@/components/home/EditorialSection";
import { CollectionSection } from "@/components/home/CollectionSection";
import { JournalSection } from "@/components/home/JournalSection";
import { OurStory } from "@/components/home/OurStory";
import { FounderSection } from "@/components/home/FounderSection";
import { GalleryCarousel } from "@/components/home/GalleryCarousel";
import { FAQSection } from "@/components/home/FAQSection";

export default function HomePage() {
  return (
    <main id="top" className="min-h-screen bg-white text-[#101010]">
      <Header />
      <Hero />
      <EditorialSection />
      <CollectionSection />
      <JournalSection />
      <OurStory />
      <FounderSection />
      <GalleryCarousel />
      <FAQSection />
      <Footer />
    </main>
  );
}
