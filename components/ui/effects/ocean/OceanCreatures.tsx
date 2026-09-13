'use client';
import { useEffect, useState } from 'react';
import styles from './OceanCreatures.module.css';

interface Creature {
  id: number;
  type: 'fish1' | 'fish2' | 'jellyfish';
  top: number;          // Vertical position (10% - 90%)
  duration: number;     // Swim speed (12s - 28s)
  delay: number;        // Staggered start delay
  direction: 'leftToRight' | 'rightToLeft';
  size: number;         // Scale ratio (24px - 50px)
}

export default function OceanCreatures({ count = 12 }: { count?: number }) {
  const [creatures, setCreatures] = useState<Creature[]>([]);

  useEffect(() => {
    const types: ('fish1' | 'fish2' | 'jellyfish')[] = ['fish1', 'fish2', 'jellyfish'];
    
    const generated: Creature[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      type: types[Math.floor(Math.random() * types.length)],
      top: Math.floor(Math.random() * 75) + 10,       // Keep within 10% - 85% of section/screen
      duration: Math.floor(Math.random() * 16) + 14, // 14s to 30s cross time
      delay: Math.floor(Math.random() * 10),         // Staggered entrance
      direction: Math.random() > 0.5 ? 'leftToRight' : 'rightToLeft',
      size: Math.floor(Math.random() * 20) + 24,     // Size variation
    }));

    setCreatures(generated);
  }, [count]);

  return (
    <div className={styles.creatureContainer} aria-hidden="true">
      {creatures.map((item) => (
        <div
          key={item.id}
          className={`${styles.creature} ${styles[item.type]} ${styles[item.direction]}`}
          style={
            {
              '--top': `${item.top}%`,
              '--duration': `${item.duration}s`,
              '--delay': `${item.delay}s`,
              '--size': `${item.size}px`,
            } as React.CSSProperties
          }
        >
          {/* SVG Sea Creatures */}
          {item.type === 'jellyfish' ? (
            <svg viewBox="0 0 64 64" fill="currentColor">
              {/* Jellyfish Cap */}
              <path d="M16 28 C16 12, 48 12, 48 28 C48 32, 16 32, 16 28 Z" opacity="0.85" />
              {/* Floating Tentacles */}
              <path d="M20 32 Q 18 48, 22 60 M28 32 Q 32 48, 27 60 M36 32 Q 31 48, 37 60 M44 32 Q 46 48, 42 60" 
                    stroke="currentColor" strokeWidth="2" fill="none" opacity="0.7" />
            </svg>
          ) : (
            <svg viewBox="0 0 64 64" fill="currentColor">
              {/* Fish Body & Tail */}
              <path d="M10 32 C20 18, 48 22, 54 32 C48 42, 20 46, 10 32 Z" opacity="0.9" />
              <path d="M52 32 L62 22 L58 32 L62 42 Z" opacity="0.9" />
              <circle cx="20" cy="28" r="2" fill="#ffffff" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}