"use client"

import React from "react"
import { CardCarousel } from "@/components/ui/card-carousel"

const CardCarouselDemo = () => {
  const images = [
    {
      src: "/images/image_21.webp",
      alt: "The Royal Jaipur Sherwani",
    },
    {
      src: "/images/image_22.webp",
      alt: "Floral Zardozi & Sequin Grids",
    },
    {
      src: "/images/image_02.webp",
      alt: "Palace Pavilion Study",
    },
    {
      src: "/images/image_20.webp",
      alt: "Reclined Festive Silhouette",
    },
    {
      src: "/images/story_celebration.png",
      alt: "The Courtyard Celebration",
    },
    {
      src: "/images/image_18.webp",
      alt: "The Wedding Chapter Campaign",
    },
  ]

  return (
    <div className="w-full">
      <CardCarousel
        images={images}
        autoplayDelay={2000}
        showPagination={true}
        showNavigation={true}
      />
    </div>
  )
}

export default CardCarouselDemo
