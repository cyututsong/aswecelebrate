'use client'; // Required for Next.js App Router interactive components

import React, { useState, useEffect, useRef, ReactNode } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export interface MasonryItem {
  id: string | number;
  src: any;
  alt?: string;
  aspectRatio?: number;
}

export interface GalleryMansoryProps {
  items: MasonryItem[];
  columns?: number;
  gap?: number;
  renderOverlay?: (item: MasonryItem) => ReactNode;
  onItemClick?: (item: MasonryItem) => void;
}

export const GalleryMansory: React.FC<GalleryMansoryProps> = ({
  items,
  columns = 3,
  gap = 16,
  renderOverlay,
  onItemClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [spans, setSpans] = useState<{ [key: string | number]: number }>({});

  const rowHeight = 10; // Base grid unit height in pixels

  const calculateSpans = () => {
    if (!containerRef.current) return;

    items.forEach((item) => {
      const imgElement = document.getElementById(`masonry-img-${item.id}`) as HTMLImageElement;
      if (imgElement && imgElement.complete) {
        const height = imgElement.getBoundingClientRect().height;
        const rowSpan = Math.ceil((height + gap) / (rowHeight + gap));
        setSpans((prev) => ({ ...prev, [item.id]: rowSpan }));
      }
    });
  };

  useEffect(() => {
    calculateSpans();
    window.addEventListener('resize', calculateSpans);
    return () => window.removeEventListener('resize', calculateSpans);
  }, [items, gap]);

  return (
    <div
      ref={containerRef}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, minmax(calc(${100 / columns}% - ${gap}px), 1fr))`,
        gridAutoRows: `${rowHeight}px`,
        gap: `${gap}px`,
        width: '100%',
      }}
    >
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          onClick={() => onItemClick && onItemClick(item)}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-250px' }}
          transition={{
            duration: 0.9,
            delay: (index % columns) * 0.5, // Stagger effect across columns
            ease: [0.215, 0.61, 0.355, 1],
          }}
          style={{
            gridRowEnd: `span ${spans[item.id] || 25}`,
            position: 'relative',
            overflow: 'hidden',
            minHeight: '150px',
            cursor: onItemClick ? 'pointer' : 'default',
          }}
        >
          {typeof item.src === 'string' ? (
            <img
              id={`masonry-img-${item.id}`}
              src={item.src}
              alt={item.alt || ''}
              onLoad={calculateSpans}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                objectFit: 'cover'
              }}
            />
          ) : (
            <Image
              id={`masonry-img-${item.id}`}
              src={item.src}
              alt={item.alt || ''}
              onLoad={calculateSpans}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                objectFit: 'cover',
              }}
            />
          )}
          {renderOverlay && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
              }}
            >
              {renderOverlay(item)}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};