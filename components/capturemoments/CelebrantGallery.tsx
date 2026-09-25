'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { supabase, WishRow } from '@/lib/supabaseClient';

interface CelebrantGalleryProps {
  celebrantEmail: string;
}

export default function CelebrantGallery({ celebrantEmail }: CelebrantGalleryProps) {
  const [wishes, setWishes] = useState<WishRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Modal state
  const [activeWish, setActiveWish] = useState<WishRow | null>(null);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  useEffect(() => {
    if (celebrantEmail) fetchWishes();
  }, [celebrantEmail]);

  const fetchWishes = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('wishes')
      .select('*')
      .eq('celebrant_email', celebrantEmail)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching wishes:', error);
    } else {
      setWishes((data as WishRow[]) || []);
    }

    setLoading(false);
  };

  // Pre-generate randomized animation styles for the grid
  const cardAnimationStyles = useMemo(() => {
    return wishes.map(() => {
      const isStartLeft = Math.random() > 0.5;
      const animationName = isStartLeft ? 'tiltLeftRight' : 'tiltRightLeft';
      const duration = (2.5 + Math.random() * 1.7).toFixed(2);
      const delay = (Math.random() * 1.5).toFixed(2);

      return {
        animation: `${animationName} ${duration}s ease-in-out ${delay}s infinite alternate`,
      };
    });
  }, [wishes]);

  // Handle opening modal and auto-flipping to back
  const handleCardClick = (wish: WishRow) => {
    setActiveWish(wish);
    setIsFlipped(true);
  };

  const closeModal = () => {
    setActiveWish(null);
    setIsFlipped(false);
  };

  if (loading) return <p className="text-center py-8 text-gray-500">Loading gallery...</p>;

  return (
    <div className="w-full max-w-7xl mx-auto py-6 px-2 sm:px-4">
      <style>{`
        /* Continuous Grid Tilting Animations (8 deg) */
        @keyframes tiltLeftRight {
          0% { transform: rotate(-8deg); }
          100% { transform: rotate(8deg); }
        }

        @keyframes tiltRightLeft {
          0% { transform: rotate(8deg); }
          100% { transform: rotate(-8deg); }
        }

        .tilt-card {
          will-change: transform;
          transition: transform 0.3s ease;
        }

        .tilt-card:hover {
          animation-play-state: paused !important;
          transform: scale(1.08) rotate(0deg) !important;
          z-index: 20;
        }

        /* 3D Card Flip CSS */
        .perspective-1000 {
          perspective: 1000px;
        }

        .transform-style-3d {
          transform-style: preserve-3d;
          transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
        }

        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>

      <h2 className="text-2xl font-serif font-semibold text-center mb-8 text-gray-800">
        Captured Moments
      </h2>

      {wishes.length === 0 ? (
        <p className="text-center text-gray-500">No wishes or photos shared yet.</p>
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 p-2 sm:p-4">
          {wishes.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleCardClick(item)}
              className="tilt-card cursor-pointer relative bg-white p-1 md:p-1.5 rounded-2xl shadow-md border border-gray-100"
              style={cardAnimationStyles[index]}
            >
              <div className="w-full aspect-square relative bg-gray-100 overflow-hidden rounded-xl">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt="Celebrant moment"
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center p-2 text-center text-[10px] sm:text-xs text-gray-400 bg-gray-50 rounded-xl">
                    No image attached
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3D ZOOM & FLIP LIGHTBOX MODAL (20% LARGER) */}
      {activeWish && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
          onClick={closeModal}
        >
          {/* Increased max width from max-w-sm/max-w-md to max-w-md/max-w-xl (20% increase) */}
          <div
            className="relative w-full max-w-md md:max-w-xl aspect-[3/4] max-h-[85vh] perspective-1000"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white text-3xl font-light hover:text-gray-300 z-50 focus:outline-none"
            >
              ✕
            </button>

            {/* Flipping Card Wrapper */}
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className={`w-full h-full relative cursor-pointer transform-style-3d ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* FRONT SIDE */}
              <div className="absolute inset-0 w-full h-full bg-white rounded-3xl p-5 md:p-6 shadow-2xl backface-hidden flex flex-col items-center justify-between border border-gray-100">
                <div className="w-full h-[92%] rounded-2xl overflow-hidden bg-gray-100">
                  {activeWish.image_url ? (
                    <img
                      src={activeWish.image_url}
                      alt="Wish"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Photo Attached
                    </div>
                  )}
                </div>
                <div className="text-center py-1">
                  <p className="text-xs md:text-sm text-gray-400 font-medium">
                    Tap to view message ↺
                  </p>
                </div>
              </div>

              {/* BACK SIDE */}
              <div className="absolute inset-0 w-full h-full bg-amber-50/90 rounded-3xl p-8 md:p-10 shadow-2xl backface-hidden rotate-y-180 flex flex-col justify-between border-2 border-amber-200/60 text-center">
                <div className="flex-1 flex flex-col items-center justify-center gap-4 my-auto">
                  <span className="text-4xl">💌</span>
                  <p className="text-lg md:text-xl text-gray-700 italic font-serif leading-relaxed px-2 overflow-y-auto max-h-[300px]">
                    "{activeWish.message}"
                  </p>
                </div>

                <div className="pt-4 border-t border-amber-200/80">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 font-serif">
                    {activeWish.guest_name || 'Anonymous Guest'}
                  </h3>
                  <p className="text-xs md:text-sm text-amber-700 mt-2 font-medium">
                    Tap card to flip back ↺
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}