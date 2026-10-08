"use client";

import { BeforeAfterCard } from "@/components/ui/before-after-card";

const AFTER_SRC = "/images/image_22.webp";
const BEFORE_SRC = "/images/image_21.webp";

const settings = {
  defaultPosition: 50,
  orientation: "horizontal" as const,
  showPercent: true,
  dualImage: false,
};

export function BeforeAfterCardPreview(props: Partial<typeof settings> = {}) {
  const state = { ...settings, ...props };

  return (
    <div className="flex w-full items-center justify-center px-4 py-6 sm:px-8">
      <BeforeAfterCard
        key={`${state.orientation}-${state.dualImage}-${state.defaultPosition}`}
        className="w-full max-w-4xl"
        afterSrc={AFTER_SRC}
        beforeSrc={state.dualImage ? BEFORE_SRC : undefined}
        beforeAlt={
          state.dualImage
            ? "Raw bespoke foundation"
            : "Handcrafted zardozi metallic wirework, raw exposure"
        }
        afterAlt="Intricate royal zardozi embroidery and sequin grid, finished couture"
        beforeLabel="Raw Craft"
        afterLabel="Gold Grade"
        caption="Drag the lens to compare raw craftsmanship and finished royal zardozi finish."
        defaultPosition={state.defaultPosition}
        orientation={state.orientation}
        showPercent={state.showPercent}
        autoDemo
      />
    </div>
  );
}

export default function Demo(props: Partial<typeof settings>) {
  return <BeforeAfterCardPreview {...props} />;
}
