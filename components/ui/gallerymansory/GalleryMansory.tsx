'use client';

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
  columns?: number; // Desktop column count
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
  const [currentColumns, setCurrentColumns] = useState<number>(columns);

  const rowHeight = 10;

  // Handle responsive column count adjustments based on viewport width
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCurrentColumns(2); // 2 columns for mobile
      } else if (width < 1024) {
        setCurrentColumns(Math.min(columns, 2)); // 2 columns for tablets
      } else {
        setCurrentColumns(columns); // Default columns for desktop
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, [columns]);

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
  }, [items, gap, currentColumns]);

  return (
    <div
      ref={containerRef}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${currentColumns}, 1fr)`, // Clean, responsive grid split
        gridAutoRows: `${rowHeight}px`,
        gap: `${gap}px`,
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          onClick={() => onItemClick && onItemClick(item)}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }} // Reduced margin threshold so items animate reliably on short mobile viewports
          transition={{
            duration: 0.6,
            delay: (index % currentColumns) * 0.15, // Smooth animation stagger per row
            ease: [0.215, 0.61, 0.355, 1],
          }}
          style={{
            gridRowEnd: `span ${spans[item.id] || 25}`,
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '12px',
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
                objectFit: 'cover',
              }}
            />
          ) : (
            <Image
              id={`masonry-img-${item.id}`}
              src={item.src}
              alt={item.alt || ''}
              onLoad={calculateSpans}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
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