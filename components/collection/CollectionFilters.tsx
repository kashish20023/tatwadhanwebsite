"use client";

import type { CollectionCategory, CollectionFilterOption } from "@/types/collection";

interface CollectionFiltersProps {
  filters: CollectionFilterOption[];
  activeCategory: CollectionCategory;
  onSelectCategory: (category: CollectionCategory) => void;
}

export function CollectionFilters({
  filters,
  activeCategory,
  onSelectCategory,
}: CollectionFiltersProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-8 pt-6 border-t border-[#ECE7DE]">
      {filters.map((filter) => {
        const active = activeCategory === filter.id;
        return (
          <button
            key={filter.id}
            type="button"
            onClick={() => onSelectCategory(filter.id)}
            className={`px-4 py-1.5 text-[9px] uppercase tracking-[0.2em] font-sans transition-all duration-300 cursor-pointer rounded-full ${
              active
                ? "bg-[#12100E] text-[#FBF9F6] border border-[#12100E]"
                : "bg-transparent text-[#666056] border border-[#ECE7DE] hover:border-[#12100E] hover:text-[#12100E]"
            }`}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
