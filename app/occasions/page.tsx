import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/layout/PageHeader";
import { OccasionChapter } from "@/components/occasions/OccasionChapter";
import { occasionLooks } from "@/data/occasions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Occasions | Ceremonial Indian Couture",
  description: "Curated wedding occasion chapters for the groom and wedding entourage by Tatvdhan Jaipur.",
};

export default function OccasionsPage() {
  const chapter1Looks = [occasionLooks[0], occasionLooks[1]];
  const chapter2Looks = [
    occasionLooks[2],
    {
      file: "/images/image_21.webp",
      alt: "Royal Jaipur Sherwani",
      title: "The Reception Gala",
      caption: "Sculpted velvet and antique gold detailing",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#101010]">
      <Header />

      <PageHeader
        breadcrumbCurrent="Occasions"
        title="Occasion Chapters"
        eyebrow="Ceremonial Wardrobe"
        description="From moonlit Sangeet nights to the sacred pheras, each ceremonial chapter is meticulously curated in pure raw silks, zardozi needlework, and bespoke royal cuts."
      />

      <OccasionChapter
        chapterNumber="01"
        title="The Sangeet & Cocktail"
        subtitle="Rhythmic Movement & Metallic Glint"
        description="Designed for festive celebrations under chandelier light. Lightweight raw silks embellished with micro-sequins and dynamic floral zardozi motifs."
        looks={chapter1Looks}
      />

      <OccasionChapter
        chapterNumber="02"
        title="The Sacred Pheras"
        subtitle="Regal Heritage & Solemn Splendor"
        description="Heirloom silhouettes honoring Jaipur court traditions. Hand-woven tussar silks crowned with intricate marodi and zardozi borders."
        looks={chapter2Looks}
        reverse
      />

      <Footer />
    </div>
  );
}
