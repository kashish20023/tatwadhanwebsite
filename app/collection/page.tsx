"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/layout/PageHeader";
import { collectionFilters, collectionPairs } from "@/data/collection";
import { CollectionFilters } from "@/components/collection/CollectionFilters";
import { CollectionGrid } from "@/components/collection/CollectionGrid";
import type { CollectionCategory } from "@/types/collection";

export default function CollectionPage() {
  const [activeCategory, setActiveCategory] = useState<CollectionCategory>("all");

  const filteredPairs =
    activeCategory === "all"
      ? collectionPairs
      : collectionPairs.filter((pair) => pair.category === activeCategory);

  return (
    <div className="min-h-screen bg-white text-[#101010] selection:bg-[#E8C35A] selection:text-black">
      {/* Site Header */}
      <Header />

      {/* Unified Editorial Masthead */}
      <PageHeader
        breadcrumbCurrent="Collection"
        title="The Wedding Chapter"
        eyebrow="Autumn / Winter 2026"
        description="A dual photographic study in bespoke Indian bridal couture, juxtaposing macro craftsmanship against regal Jaipur architecture."
      >
        <CollectionFilters
          filters={collectionFilters}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
      </PageHeader>

      {/* Editorial Lookbook Photography Diptychs (Exactly 2 images per row, zero text) */}
      <CollectionGrid pairs={filteredPairs} />

      {/* Site Footer */}
      <Footer />
    </div>
  );
}
