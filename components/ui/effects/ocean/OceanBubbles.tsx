// components/ui/effects/ocean/OceanBubbles.tsx

'use client';

import { useEffect, useState } from 'react';
import styles from './OceanBubbles.module.css';

interface Bubble {
  id: number;
  size: number;
  left: number;
  duration: number;
  delay: number;
}

export default function OceanBubbles({ count = 25 }: { count?: number }) {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    // Generate bubbles only after client mount to prevent hydration mismatch
    const generated: Bubble[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.floor(Math.random() * 24) + 8,     // Bubble diameter (8px - 32px)
      left: Math.floor(Math.random() * 100),         // Horizontal position (0% - 100%)
      duration: Math.floor(Math.random() * 8) + 6,   // Float duration (6s - 14s)
      delay: Math.floor(Math.random() * 10),         // Staggered start delay (0s - 10s)
    }));

    setBubbles(generated);
  }, [count]);

  return (
    <div className={styles.bubbleContainer} aria-hidden="true">
      {bubbles.map((bubble) => (
        <span
          key={bubble.id}
          className={styles.bubble}
          style={
            {
              '--size': `${bubble.size}px`,
              '--left': `${bubble.left}%`,
              '--duration': `${bubble.duration}s`,
              '--delay': `${bubble.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}