'use client';
import Style from './page.module.css';
import React, { JSX, useState } from 'react';
import Image from 'next/image';
import ImageCelebrant from '../images/mrandmrs.jpg';
import { EnvelopSwipe, CardItem } from '@/components/ui/envelopswipe/EnvelopSwipe';
import Link from 'next/link';



export default function RodneyAndClaireEnvelope(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    if (!isOpen) setIsOpen(true);
  };

  // Build the swipeable cards: photo card + text card
  const cards: CardItem[] = [
    {
      // Photo card
      content: (
        <div className={Style.imgCelebrant} style={{ position: 'relative', width: '100%', height: '100%' }}>
          <Image
            src={ImageCelebrant}
            alt="Rodney and Claire"
            fill
            sizes="300px"
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
      ),
    },
    {
      // Letter / text card
      content: (
        <div className={Style.letter} style={{ height: '100%', width: '280px', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '20px', boxSizing: 'border-box' }}>
          <h2>Rodney &amp; Claire</h2>
          <p>You are cordially invited to celebrate our special day!</p>
          
          <Link href="/rodney-and-claire-invitation" className="py-2 px-4 mt-4 border-solid border-2 border-white rounded-lg bg-[#b81c22] text-white">
            View Details
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className={Style.container}>
      <div
        className={`${Style.envelopeWrapper} ${isOpen ? Style.open : ''}`}
        onClick={handleOpen}
      >
        <div className={Style.envelope}>
          {/* Swipeable card stack with 280px width and 230px height */}
          <div className={Style.cardStack}>
            <EnvelopSwipe
              items={cards}
              loop={false}
              showPagination={false}
              spaceBetween={0}
              cardClassName={`${Style.swiperCard} !w-[280px] !h-[230px] min-h-0 max-h-none`}
            />
          </div>

          <div className={Style.backPocket}></div>
          <div className={Style.pocket}></div>
          <div className={Style.flap}></div>

          {!isOpen && <div className={Style.seal}>Click to Open</div>}
        </div>
      </div>
    </div>
  );
}