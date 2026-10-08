import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { EditorialSection } from "@/components/home/EditorialSection";
import { CollectionSection } from "@/components/home/CollectionSection";
import { JournalSection } from "@/components/home/JournalSection";
import { OurStory } from "@/components/home/OurStory";
import { FounderSection } from "@/components/home/FounderSection";
import { FAQSection } from "@/components/home/FAQSection";
import { CardCarousel } from "@/components/ui/card-carousel";

const homeCarouselImages = [
  { src: "/images/image_21.webp", alt: "The Royal Jaipur Sherwani" },
  { src: "/images/image_22.webp", alt: "Floral Zardozi & Sequin Grids" },
  { src: "/images/image_02.webp", alt: "Palace Pavilion Study" },
  { src: "/images/image_20.webp", alt: "Reclined Festive Silhouette" },
  { src: "/images/story_celebration.png", alt: "The Courtyard Celebration" },
  { src: "/images/image_04.webp", alt: "The Mannequin Triptych" },
  { src: "/images/image_03.webp", alt: "The Quiet Salon Study" },
  { src: "/images/image_18.webp", alt: "The Wedding Chapter Campaign" },
];

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

      {/* 3D Coverflow Card Carousel showcasing authentic Jaipur couture */}
      <section className="w-full py-0 sm:py-0 md:py-0 ">
        <CardCarousel
          images={homeCarouselImages}
          autoplayDelay={2500}
          showPagination={true}
          showNavigation={true}
          badgeText="Atelier Showcase"
          title="The Couture In Motion"
          subtitle="Explore the intricate craft, regal silks, and Jaipur silhouettes in interactive 3D."
        />
      </section>

      <FAQSection />
      <Footer />
    </main>
  );
}
