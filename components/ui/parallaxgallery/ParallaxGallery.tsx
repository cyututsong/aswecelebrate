"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";

type GalleryImage = string | { src: string };

export interface ParallaxGalleryProps {
  /** Array of image URLs or imported image objects to display across the columns (minimum 12 recommended) */
  images: GalleryImage[];
  /** Height multiplier for the parallax section (e.g. "175vh", "200vh") */
  containerHeight?: string;
  /** Background color for the parallax gallery section */
  backgroundColor?: string;
  /** Custom multiplier speeds for each column [col1, col2, col3, col4] */
  columnSpeeds?: [number, number, number, number];
}

export default function ParallaxGallery({
  images,
  containerHeight = "175vh",
  backgroundColor = "bg-white",
  columnSpeeds = [2, 3.3, 1.25, 3],
}: ParallaxGalleryProps) {
  const gallery = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });

  const { height } = dimension;

  // Parallax Y-transforms for each column
  const y1 = useTransform(scrollYProgress, [0, 1], [0, height * columnSpeeds[0]]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * columnSpeeds[1]]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * columnSpeeds[2]]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * columnSpeeds[3]]);

  useEffect(() => {
    let lenis: any = null;
    let animationFrameId: number;

    // Dynamically import lenis to prevent build errors if lenis is not installed
    import("lenis")
      .then((LenisModule) => {
        const Lenis = LenisModule.default;
        lenis = new Lenis();

        const raf = (time: number) => {
          lenis?.raf(time);
          animationFrameId = requestAnimationFrame(raf);
        };
        animationFrameId = requestAnimationFrame(raf);
      })
      .catch(() => {
        // Fallback gracefully if lenis is not installed
      });

    const handleResize = () => {
      setDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (lenis) lenis.destroy();
    };
  }, []);

  // Divide images array into 4 columns evenly
  const col1 = images.slice(0, 3);
  const col2 = images.slice(3, 6);
  const col3 = images.slice(6, 9);
  const col4 = images.slice(9, 12);

  return (
    <div
      ref={gallery}
      style={{ height: containerHeight }}
      className={`relative box-border flex max-w-100 w-full gap-[2vw] overflow-hidden p-[2vw] ${backgroundColor}`}
    >
      <Column images={col1} y={y1} initialTop="-top-[45%]" />
      <Column images={col2} y={y2} initialTop="-top-[95%]" />
      <Column images={col3} y={y3} initialTop="-top-[45%]" />
      <Column images={col4} y={y4} initialTop="-top-[75%]" />
    </div>
  );
}

interface ColumnProps {
  images: GalleryImage[];
  y: MotionValue<number>;
  initialTop: string;
}

const Column = ({ images, y, initialTop }: ColumnProps) => {
  return (
    <motion.div
      className={`relative ${initialTop} flex h-full w-1/4 min-w-[200px] flex-col gap-[2vw]`}
      style={{ y }}
    >
      {images.map((src, idx) => {
        const imageSrc = typeof src === "string" ? src : src.src;

        return (
          <div key={idx} className="relative h-full w-full overflow-hidden">
            <img
              src={imageSrc}
              alt={`Parallax gallery image ${idx + 1}`}
              className="h-full w-full object-cover pointer-events-none"
            />
          </div>
        );
      })}
    </motion.div>
  );
};