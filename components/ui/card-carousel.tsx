"use client"

import React from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { SparklesIcon, ChevronLeft, ChevronRight } from "lucide-react"
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules"

import { Badge } from "@/components/ui/badge"

export interface CarouselProps {
  images: { src: string; alt: string }[]
  autoplayDelay?: number
  showPagination?: boolean
  showNavigation?: boolean
  badgeText?: string
  title?: string
  subtitle?: string
  cardWidth?: number
  cardHeight?: number
}

export const CardCarousel: React.FC<CarouselProps> = ({
  images,
  autoplayDelay = 2200,
  showPagination = true,
  showNavigation = true,
  badgeText = "Latest component",
  title = "Card Carousel",
  subtitle = "Seamless Images carousel animation.",
  cardWidth,
  cardHeight,
}) => {
  // If cardHeight or cardWidth overrides are provided, use them; otherwise use responsive couture standards
  const mobileHeight = cardHeight ? `${Math.round(Number(cardHeight) * 0.76)}px` : "420px"
  const tabletHeight = cardHeight ? `${Math.round(Number(cardHeight) * 0.88)}px` : "490px"
  const desktopHeight = cardHeight ? `${cardHeight}px` : "550px"

  const mobileWidth = cardWidth ? `${Math.round(Number(cardWidth) * 0.76)}px` : "280px"
  const tabletWidth = cardWidth ? `${Math.round(Number(cardWidth) * 0.88)}px` : "340px"
  const desktopWidth = cardWidth ? `${cardWidth}px` : "380px"

  const css = `
  .card-carousel-root .swiper {
    width: 100%;
    padding-top: 30px;
    padding-bottom: 60px;
    position: relative;
  }
  
  .card-carousel-root .swiper-slide {
    background-position: center;
    background-size: cover;
    width: ${mobileWidth};
    height: ${mobileHeight};
    transition: transform 0.35s ease;
  }
  
  @media (min-width: 640px) {
    .card-carousel-root .swiper-slide {
      width: ${tabletWidth};
      height: ${tabletHeight};
    }
  }

  @media (min-width: 1024px) {
    .card-carousel-root .swiper-slide {
      width: ${desktopWidth};
      height: ${desktopHeight};
    }
  }

  .card-carousel-root .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .card-carousel-root .swiper-3d .swiper-slide-shadow-left {
    background-image: none;
  }
  .card-carousel-root .swiper-3d .swiper-slide-shadow-right {
    background: none;
  }

  .card-carousel-root .swiper-pagination {
    bottom: 12px !important;
  }

  .card-carousel-root .swiper-pagination-bullet {
    background: #101010;
    opacity: 0.22;
    width: 7px;
    height: 7px;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .card-carousel-root .swiper-pagination-bullet-active {
    background: #9b7530 !important;
    opacity: 1;
    width: 26px;
    border-radius: 9999px;
  }

  /* Luxury Managed Arrow Buttons */
  .card-carousel-root .swiper-button-prev,
  .card-carousel-root .swiper-button-next {
    color: #101010 !important;
    width: 48px !important;
    height: 48px !important;
    background: rgba(255, 255, 255, 0.92) !important;
    backdrop-filter: blur(12px) !important;
    border: 1px solid rgba(16, 16, 16, 0.12) !important;
    border-radius: 9999px !important;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.10) !important;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
    z-index: 30 !important;
    cursor: pointer;
    top: 50% !important;
    transform: translateY(-50%) !important;
    margin-top: 0 !important;
  }

  .card-carousel-root .swiper-button-prev {
    left: 12px !important;
  }
  .card-carousel-root .swiper-button-next {
    right: 12px !important;
  }

  @media (min-width: 768px) {
    .card-carousel-root .swiper-button-prev {
      left: 20px !important;
    }
    .card-carousel-root .swiper-button-next {
      right: 20px !important;
    }
  }

  @media (min-width: 1280px) {
    .card-carousel-root .swiper-button-prev {
      left: 32px !important;
    }
    .card-carousel-root .swiper-button-next {
      right: 32px !important;
    }
  }

  .card-carousel-root .swiper-button-prev:hover,
  .card-carousel-root .swiper-button-next:hover {
    background: #101010 !important;
    color: #e8c35a !important;
    border-color: #101010 !important;
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.22) !important;
    transform: translateY(-50%) scale(1.06) !important;
  }

  .card-carousel-root .swiper-button-prev:active,
  .card-carousel-root .swiper-button-next:active {
    transform: translateY(-50%) scale(0.95) !important;
  }

  /* Completely remove Swiper's default crude text icon */
  .card-carousel-root .swiper-button-prev::after,
  .card-carousel-root .swiper-button-next::after {
    display: none !important;
    content: "" !important;
  }
  `

  return (
    <section className="card-carousel-root w-full space-y-4">
      <style>{css}</style>
      <div className="relative mx-auto flex w-full flex-col p-2 sm:p-4 md:items-start md:gap-4">


        <div className="flex flex-col justify-center pb-2 pl-2 pt-0 sm:pt-0 md:items-center w-full text-center">
          <h3 className="text-2xl sm:text-3xl md:text-4xl opacity-90 font-serif font-medium tracking-tight text-[#101010]">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-lg">
              {subtitle}
            </p>
          )}
        </div>

        <div className="relative flex w-full items-center justify-center gap-4 mt-2">
          <div className="w-full relative">
            <Swiper
              spaceBetween={30}
              autoplay={{
                delay: autoplayDelay,
                disableOnInteraction: false,
              }}
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              loop={true}
              slidesPerView={"auto"}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.2,
                slideShadows: false,
              }}
              pagination={
                showPagination
                  ? {
                    clickable: true,
                  }
                  : false
              }
              navigation={
                showNavigation
                  ? {
                    nextEl: ".card-carousel-next",
                    prevEl: ".card-carousel-prev",
                  }
                  : undefined
              }
              modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
            >
              {images.map((image, index) => (
                <SwiperSlide key={`slide-${index}-${image.src}`}>
                  <div className="w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-[#181615]">
                    <Image
                      src={image.src}
                      width={600}
                      height={850}
                      className="w-full h-full object-cover select-none"
                      alt={image.alt}
                      priority={index === 0}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Managed Navigation Arrows */}
            {showNavigation && (
              <>
                <button
                  type="button"
                  className="swiper-button-prev card-carousel-prev group !flex !items-center !justify-center"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5 text-current transition-transform duration-200 group-hover:-translate-x-0.5 stroke-[1.75]" />
                </button>
                <button
                  type="button"
                  className="swiper-button-next card-carousel-next group !flex !items-center !justify-center"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5 text-current transition-transform duration-200 group-hover:translate-x-0.5 stroke-[1.75]" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
