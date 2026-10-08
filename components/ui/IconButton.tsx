import React from "react";
import { cn } from "@/lib/utils";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  "aria-label": string;
}

export function IconButton({ className, children, ...props }: IconButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#ECE7DE] text-[#12100E] hover:border-[#12100E] transition-colors cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
