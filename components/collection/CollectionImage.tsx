import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface CollectionImageProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  focalPosition?: string;
  priority?: boolean;
}

export function CollectionImage({
  src,
  alt,
  focalPosition = "center",
  priority = false,
  className,
  ...props
}: CollectionImageProps) {
  return (
    <div
      className={cn("group relative overflow-hidden aspect-[4/5] bg-[#FBF9F6] w-full", className)}
      {...props}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 800px"
        priority={priority}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        style={{ objectPosition: focalPosition }}
      />
    </div>
  );
}
