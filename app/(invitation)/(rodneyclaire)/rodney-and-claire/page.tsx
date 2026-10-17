'use client';

import React, { JSX, useState } from 'react';

export default function RodneyAndClaire(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setIsOpen(true);
  };

  return (
    <main className="min-h-screen flex items-center justify-center overflow-hidden px-4">
      <div className="w-full max-w-sm sm:max-w-md mx-auto">
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-stone-800">
          
          {/* Header Names */}
          <div className={`text-center mb-6 transition-opacity duration-700 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <h1 className="font-serif !text-[30px] sm:text-3xl md:text-4xl italic text-stone-700 tracking-wide">You are Invited</h1>
          </div>

          {/* Invitation Wrapper Container */}
          <div 
            className="relative w-full aspect-[4/3] cursor-pointer group" 
            onClick={handleOpen}
          >
            
            {/* 1. INNER INVITATION CARD (Pulls up to -translate-y-44 and settles at translate-y-0) */}
            <div className={`absolute inset-x-3 sm:inset-x-6 top-3 bottom-3 sm:top-4 sm:bottom-4 bg-stone-50 shadow-2xl rounded-sm p-4 sm:p-6 flex flex-col items-center justify-center text-center z-30 transition-all duration-1000 ease-out ${
              isOpen 
                ? 'translate-y-0 scale-100 rotate-0 opacity-100' // Settles at translate-y-0 on top of the envelope
                : 'translate-y-12 sm:translate-y-16 scale-95 -rotate-[10deg] opacity-0 pointer-events-none' // Hidden inside
            }`}
            style={{
              // This inline animation handles the upward pull (-translate-y-44) before settling at translate-y-0
              animation: isOpen ? 'pullOutAndSettle 1s cubic-bezier(0.16, 1, 0.3, 1) forwards' : 'none'
            }}
            >
              <p className="!text-[12px] sm:text-xs tracking-[0.2em] uppercase text-stone-500 mb-1 sm:mb-2">You Are Cordially Invited</p>
              
              {/* Scaled Couple Names */}
              <h2 className="font-serif !text-[30px] !sm:text-xl !md:text-2xl italic text-stone-800 mb-2 sm:mb-4 flex items-center justify-center gap-1.5 sm:gap-2">
                <span>Rodney</span>
                <span className="text-stone-400 font-normal">&</span>
                <span>Claire</span>
              </h2>

              <p className="!text-[12px] sm:text-sm text-stone-600 mb-4 sm:mb-6">Are getting married on October 18, 2026</p>
              
              <button 
                type="button"
                className="px-4 sm:px-6 py-2 bg-stone-800 text-white text-[10px] sm:text-xs uppercase tracking-widest rounded hover:bg-stone-700 transition-colors pointer-events-auto shadow-sm"
              >
                View Details & RSVP
              </button>
            </div>

            {/* 2. ENVELOPE CONTAINER */}
            <div className={`absolute inset-0 z-20 transition-transform duration-700 pointer-events-none ${isOpen ? 'opacity-95' : ''}`}>
              
              {/* Envelope Body with Downward V-Shape Cutout */}
              <div 
                className="absolute inset-0 bg-[#3b526d] shadow-md flex items-center justify-center pointer-events-auto transition-all duration-700 rounded-b-sm"
                style={{
                  clipPath: 'polygon(0% 0%, 50% 35%, 100% 0%, 100% 100%, 0% 100%)'
                }}
              >
                {/* Floral Accents (Bottom Right Corner) */}
                <div className="absolute -bottom-2 -right-2 w-24 sm:w-32 h-24 sm:h-32 pointer-events-none">
                  <div 
                    className="w-full h-full bg-contain bg-no-repeat bg-right-bottom opacity-90" 
                    style={{ backgroundImage: 'url("/floral-corner.png")' }} 
                  />
                </div>
              </div>

              {/* RESPONSIVE TOP FLAP */}
              <div 
                className={`absolute inset-0 bg-[#2e4259] origin-top transition-all duration-700 ease-in-out drop-shadow-md z-25 ${
                  isOpen ? 'rotate-x-180 opacity-40 pointer-events-none' : 'rotate-x-0'
                }`}
                style={{ 
                  clipPath: 'polygon(0% 0%, 100% 0%, 50% 45%)',
                  transformStyle: 'preserve-3d' 
                }}
              />

              {/* WAX SEAL */}
              <div className={`absolute top-[22%] sm:top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-500 ${
                isOpen ? 'scale-75 opacity-0 translate-y-4 pointer-events-none' : 'scale-100 opacity-100'
              }`}>
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-amber-600 shadow-lg border-2 border-amber-500 flex items-center justify-center font-serif font-bold text-amber-100 text-xs sm:text-sm tracking-tighter">
                  RC
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Custom Keyframe for the two-step pull up and settle down animation */}
      <style jsx global>{`
        @keyframes pullOutAndSettle {
          0% {
            transform: translateY(0px) scale(0.95) rotate(-10deg);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-200px) scale(1) rotate(0deg);
            opacity: 0.5;
          }
          100% {
            transform: translateY(0px) scale(1) rotate(0deg);
            opacity: 1;
          }
        }
      `}</style>
    </main>
  );
}