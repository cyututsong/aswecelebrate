'use client';
import React, { useState, useEffect, useRef } from 'react';

// Define types for individual trail elements
interface TrailImage {
  id: number;
  x: number;
  y: number;
  url: string;
}

// Define the component's Prop interface
interface ImageCursorTrailProps {
  items: string[];
  maxNumberOfImages?: number;
  distance?: number;
  imgClass?: string;
  className?: string;
}

export default function ImageCursorTrail({
  items = [],
  maxNumberOfImages = 8,
  distance = 40,
  imgClass = "w-32 h-40",
  className = "w-full h-screen"
}: ImageCursorTrailProps) {
  const [trail, setTrail] = useState<TrailImage[]>([]);
  const lastPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const imageIndex = useRef<number>(0);

  useEffect(() => {
    if (items.length === 0) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;

      // Calculate geometric distance from the last placed image
      const totalDistance = Math.hypot(x - lastPos.current.x, y - lastPos.current.y);

      // Only drop a new image if the user moved past the threshold distance
      if (totalDistance > distance) {
        const id = Date.now() + Math.random();
        const newImage: TrailImage = {
          id,
          x,
          y,
          // Cycle through array sequentially using modulo
          url: items[imageIndex.current % items.length]
        };

        imageIndex.current += 1;
        lastPos.current = { x, y };

        setTrail((prev) => {
          const updated = [...prev, newImage];
          // Constrain the array size to maxNumberOfImages
          if (updated.length > maxNumberOfImages) {
            updated.shift();
          }
          return updated;
        });

        // Safe cleanup: erase image DOM node after fade animation finishes (1s)
        setTimeout(() => {
          setTrail((prev) => prev.filter((img) => img.id !== id));
        }, 1000);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [items, distance, maxNumberOfImages]);

  return (
    <div className={`relative overflow-hidden select-none ${className}`}>
      {trail.map((img) => (
        <img
          key={img.id}
          src={img.url}
          alt="Trail snapshot"
          className={`absolute object-cover pointer-events-none rounded-xl shadow-2xl animate-trail-fade ${imgClass}`}
          style={{
            top: img.y,
            left: img.x,
            transform: 'translate(-50%, -50%)', // Keeps cursor perfectly centered on image
          }}
        />
      ))}
    </div>
  );
}