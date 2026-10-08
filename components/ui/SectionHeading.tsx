import React from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";

interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  dark?: boolean;
}

export function SectionHeading({
  className,
  eyebrow,
  title,
  subtitle,
  align = "center",
  dark = false,
  ...props
}: SectionHeadingProps) {
  const alignStyles = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  return (
    <div
      className={cn("flex flex-col max-w-2xl mb-10 md:mb-14", alignStyles[align], className)}
      {...props}
    >
      {eyebrow && <Eyebrow color={dark ? "gold" : "gold"}>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          "font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight leading-tight mb-3.5",
          dark ? "text-[#F4ECDF]" : "text-[#12100E]"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-xs md:text-sm leading-relaxed font-sans max-w-lg",
            dark ? "text-[#F4ECDF]/70" : "text-[#666056]"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
