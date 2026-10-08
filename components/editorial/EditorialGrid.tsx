import React from "react";
import { cn } from "@/lib/utils";

interface EditorialGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 2 | 3 | 4;
}

export function EditorialGrid({
  columns = 2,
  className,
  children,
  ...props
}: EditorialGridProps) {
  const columnStyles = {
    2: "grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-4 lg:gap-5",
    3: "grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6",
    4: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
  };

  return (
    <div className={cn("w-full items-stretch", columnStyles[columns], className)} {...props}>
      {children}
    </div>
  );
}
