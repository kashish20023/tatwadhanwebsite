import React from "react";
import { cn } from "@/lib/utils";

interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  dark?: boolean;
}

export function Divider({ className, dark = false, ...props }: DividerProps) {
  return (
    <hr
      className={cn(
        "w-full border-0 h-[1px]",
        dark ? "bg-[#ECE7DE]/10" : "bg-[#ECE7DE]",
        className
      )}
      {...props}
    />
  );
}
