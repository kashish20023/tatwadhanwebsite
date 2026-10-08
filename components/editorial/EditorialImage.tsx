import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface EditorialImageProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  aspectRatio?: string;
  focalPosition?: string;
  priority?: boolean;
}

export function EditorialImage({
  src,
  alt,
  aspectRatio = "aspect-[4/5]",
  focalPosition = "center",
  priority = false,
  className,
  ...props
}: EditorialImageProps) {
  return (
    <div
      className={cn("group relative overflow-hidden bg-[#FBF9F6] w-full", aspectRatio, className)}
      {...props}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
        priority={priority}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        style={{ objectPosition: focalPosition }}
      />
    </div>
  );
}
