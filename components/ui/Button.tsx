import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline" | "gold" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "solid", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-sans uppercase tracking-[0.18em] transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

    const variantStyles = {
      solid: "bg-[#12100E] text-[#FBF9F6] hover:bg-[#93753E] hover:text-[#FFFFFF]",
      outline: "bg-transparent text-[#12100E] border border-[#12100E] hover:bg-[#12100E] hover:text-[#FFFFFF]",
      gold: "border border-[#D6B772] text-[#F4ECDF] hover:bg-[#D6B772] hover:text-[#17120E]",
      ghost: "bg-transparent text-[#666056] hover:text-[#12100E]",
    };

    const sizeStyles = {
      sm: "text-[9px] px-3.5 py-1.5",
      md: "text-[10px] px-6 py-3",
      lg: "text-xs px-8 py-3.5",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
