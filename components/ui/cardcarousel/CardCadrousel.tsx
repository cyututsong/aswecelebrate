"use client";

import React, { useId } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Autoplay, EffectCards, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { cn } from "@/lib/utils";

export interface CardItem {
  src?: string;
  alt?: string;
  content?: React.ReactNode;
}

export interface CardCarouselProps extends Omit<HTMLMotionProps<"div">, "children"> {
  /** Array of card items containing `src`/`alt` or custom `content` */
  items: CardItem[];
  /** Styling applied to the main outer container wrapper */
  className?: string;
  /** Styling applied directly to the Swiper container (e.g. height, width) */
  cardClassName?: string;
  /** Custom render function for each slide */
  renderItem?: (item: CardItem, index: number) => React.ReactNode;
  /** Display bottom pagination dots */
  showPagination?: boolean;
  /** Display side navigation buttons */
  showNavigation?: boolean;
  /** Enable continuous looping */
  loop?: boolean;
  /** Enable autoplay or set delay in milliseconds */
  autoplay?: boolean | { delay?: number; disableOnInteraction?: boolean };
  /** Space between cards in pixels */
  spaceBetween?: number;
}

export const CardCarousel: React.FC<CardCarouselProps> = ({
  items,
  className,
  cardClassName,
  renderItem,
  showPagination = false,
  showNavigation = false,
  loop = true,
  autoplay = false,
  spaceBetween = 40,
  initial = { opacity: 0, translateY: 20 },
  animate = { opacity: 1, translateY: 0 },
  transition = { duration: 0.3, delay: 0.2 },
  ...motionProps
}) => {
  const uniqueId = useId().replace(/:/g, "");
  const nextClass = `swiper-button-next-${uniqueId}`;
  const prevClass = `swiper-button-prev-${uniqueId}`;

  const autoplayConfig =
    typeof autoplay === "object"
      ? autoplay
      : autoplay
      ? { delay: 2500, disableOnInteraction: false }
      : false;

  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={transition}
      className={cn("relative w-full max-w-3xl", className)}
      {...motionProps}
    >
      <style>{`
        .card-swiper-container {
          padding-bottom: ${showPagination ? "50px !important" : "0px"};
        }
      `}</style>

      <Swiper
        spaceBetween={spaceBetween}
        autoplay={autoplayConfig}
        effect="cards"
        grabCursor={true}
        loop={loop}
        pagination={showPagination ? { clickable: true } : false}
        navigation={
          showNavigation
            ? {
                nextEl: `.${nextClass}`,
                prevEl: `.${prevClass}`,
              }
            : false
        }
        /* Updated height class here */
        className={cn("card-swiper-container h-[60vh] w-[260px]", cardClassName)}
        modules={[EffectCards, Autoplay, Pagination, Navigation]}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index} className="rounded-3xl overflow-hidden bg-background">
            {renderItem ? (
              renderItem(item, index)
            ) : item.content ? (
              item.content
            ) : (
              <img
                className="h-full w-full object-cover"
                src={item.src}
                alt={item.alt || `Slide ${index + 1}`}
              />
            )}
          </SwiperSlide>
        ))}

        {showNavigation && (
          <div>
            <div
              className={cn(
                "swiper-button-next after:hidden flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 transition p-2 cursor-pointer z-10",
                nextClass
              )}
            >
              <ChevronRightIcon className="h-6 w-6 text-white" />
            </div>
            <div
              className={cn(
                "swiper-button-prev after:hidden flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 transition p-2 cursor-pointer z-10",
                prevClass
              )}
            >
              <ChevronLeftIcon className="h-6 w-6 text-white" />
            </div>
          </div>
        )}
      </Swiper>
    </motion.div>
  );
};