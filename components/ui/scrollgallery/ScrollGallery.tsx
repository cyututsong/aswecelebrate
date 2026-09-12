'use client'
import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

export interface ShowcaseItem {
  id: string | number;
  title: string;
  subtitle?: string;
  image: any;
  /** Tailwind CSS grid positioning or custom positioning classes */
  className?: string;
}

export interface ScrollGalleryProps {
  /** List of items/members to display in the animated grid */
  items: ShowcaseItem[];
  /** Primary headline text displayed over the grid */
  overlayTitle?: string;
  /** Secondary subtitle or date text below the primary headline */
  overlaySubtitle?: string;
  /** Container height string (e.g. '250vh', '300vh') determining scroll duration */
  containerHeight?: string;
  /** Number of grid columns for responsiveness (default: 'grid-cols-2 md:grid-cols-4') */
  gridColsClass?: string;
  /** Optional class overrides for the main outer wrapper */
  className?: string;
}

export const ScrollGallery: React.FC<ScrollGalleryProps> = ({
  items,
  overlayTitle = "Speakers",
  overlaySubtitle = "OCT 22, 2025",
  containerHeight = "250vh",
  gridColsClass = "grid-cols-2 md:grid-cols-4",
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress within the container element
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Dynamic animations driven by scroll distance
  const scale: MotionValue<number> = useTransform(scrollYProgress, [0, 1], [0.8, 1.25]);
  const opacity: MotionValue<number> = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0.3, 1, 1, 0.7]
  );
  
  // Adds upward vertical travel while scrolling through the pinned viewport
  const y: MotionValue<string> = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <div
      ref={containerRef}
      className={`relative bg-white text-black ${className}`}
      style={{ height: containerHeight }}
    >
      {/* Sticky viewport frame */}
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        
        {/* Animated Grid Container */}
        <motion.div
          style={{ scale, opacity, y }}
          className={`relative grid w-full max-w-6xl gap-6 px-6 ${gridColsClass}`}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className={`group relative flex flex-col ${item.className || ""}`}
            >
              <div className="aspect-[3/4] w-full overflow-hidden bg-neutral-200">
                <img
                  src={typeof item.image === "string" ? item.image : item.image?.src || item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover filter grayscale contrast-125 transition-transform duration-500 group-hover:scale-105 group-hover:grayscale-0"
                />
              </div>

              <div className="mt-2.5 text-xs uppercase tracking-wider text-neutral-500">
                <span className="block font-semibold text-neutral-900">
                  {item.title}
                </span>
                {item.subtitle && <span>({item.subtitle})</span>}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Blended Text Overlay */}
        {(overlayTitle || overlaySubtitle) && (
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
            {overlayTitle && (
              <h1 className="text-6xl font-black uppercase tracking-tighter text-black mix-blend-exclusion sm:text-8xl md:text-9xl">
                {overlayTitle}
              </h1>
            )}
            {overlaySubtitle && (
              <p className="mt-2 text-xs font-semibold tracking-widest text-neutral-600 sm:text-sm">
                {overlaySubtitle}
              </p>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default ScrollGallery;