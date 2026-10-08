import React from "react";
import { cn } from "@/lib/utils";

interface EyebrowProps extends React.HTMLAttributes<HTMLParagraphElement> {
  color?: "gold" | "secondary" | "white";
}

export function Eyebrow({
  className,
  color = "gold",
  children,
  ...props
}: EyebrowProps) {
  const colorStyles = {
    gold: "text-[#93753E]",
    secondary: "text-[#666056]",
    white: "text-white/80",
  };

  return (
    <p
      className={cn(
        "text-[9px] uppercase tracking-[0.24em] font-medium font-sans mb-3",
        colorStyles[color],
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}
