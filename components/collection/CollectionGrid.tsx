import type { LookPair } from "@/types/collection";
import { CollectionImage } from "./CollectionImage";

interface CollectionGridProps {
  pairs: LookPair[];
}

export function CollectionGrid({ pairs }: CollectionGridProps) {
  return (
    <main
      aria-label="Collection editorial lookbook"
      className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 py-10 md:py-14 space-y-3 sm:space-y-4 md:space-y-5"
    >
      {pairs.map((pair) => (
        <div
          key={pair.id}
          className="grid grid-cols-2 md:grid-cols-2 gap-3 sm:gap-4 md:gap-4 lg:gap-5 w-full items-stretch"
        >
          {/* Left Look Diptych */}
          <CollectionImage
            src={pair.left.image}
            alt={pair.left.alt}
            focalPosition={pair.left.focalPosition}
          />

          {/* Right Look Diptych */}
          <CollectionImage
            src={pair.right.image}
            alt={pair.right.alt}
            focalPosition={pair.right.focalPosition}
          />
        </div>
      ))}
    </main>
  );
}
