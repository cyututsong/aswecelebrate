import Style from './page.module.css';
import Image from 'next/image';
import callie1 from './images/callie-1.jpg';
import callie2 from './images/callie-2.jpg';
import callie3 from './images/callie-3.jpg';
import callie4 from './images/callie-4.jpg';
import callie5 from './images/callie-5.jpg';
import callie6 from './images/callie-6.jpg';
import callie7 from './images/callie-7.jpg';
import callie8 from './images/callie-8.jpg';
import callie9 from './images/callie-9.jpg';
import callie10 from './images/callie-10.jpg';
import callie11 from './images/callie-11.jpg';
import callie12 from './images/callie-12.jpg';
import callie13 from './images/callie-13.jpg';
import callie14 from './images/callie-14.jpg';
import callie15 from './images/callie-15.jpg';
import CountDown from '@/components/ui/countdowntimer/CountDown';
import ParallaxGallery from "@/components/ui/parallaxgallery/ParallaxGallery";

const debutantImages = [
  callie15,
  callie5,
  callie12,
  callie13,  
  callie4,
  callie7,
  callie10,
  callie11,
  callie9,
  callie6,  
  callie14,
  callie8
];



export default function Callie() {

  return (
    <>
      <section className={`${Style.BannerSection} flex flex-row p-20`}>
        <div className="w-1/2">
          <sub>YOU ARE INVITED</sub>
          <h2>Jewel Callie Rae</h2>
          <h3>7th</h3>
          <h4>Birthday Celebration</h4>
          <p>Dive into magical Under the Sea Adventure filled with pearl. Sparkles, and ocean wonders!</p>
          <button>RSVP to Celebrate</button>
        </div>

        {/* Stack Container */}
        <div className={`${Style.cardStack} flex items-center justify-center w-1/2`}>  
          
          {/* Bottom Card (callie3) - Rotated Right */}
          <div className={`${Style.cardTop} ${Style.card}`}>
            <Image 
              src={callie3} 
              alt="callie 3" 
              width={300} 
              height={300} 
              className={Style.cardImage}
            />
          </div>

          {/* Middle Card (callie2) - Rotated Slightly Right */}
          <div className={`${Style.cardMiddle} ${Style.card}`}>
            <Image 
              src={callie2} 
              alt="callie 2" 
              width={300} 
              height={300} 
              className={Style.cardImage}
            />
          </div>

          {/* Top Card (callie1) - Straight / Front */}
          <div className={`${Style.cardBottom} ${Style.card}`}>
            <Image 
              src={callie1} 
              alt="callie 1" 
              width={300} 
              height={300} 
              className={Style.cardImage}
            />
          </div>

        </div>

      </section>

      <section className={`${Style.countDownSection} relative flex flex-col items-center justify-center min-h-[200px] overflow-hidden`}>
        
        <h2>Seven Splendid Years of Radiance</h2>
        <p>“Seven years of sunshine, giggles, and making waves! Jewel Callie Rae is overflowing with excitement to celebrate her 7th milestone voyage with her favorite family and friends. Come dive into an unforgettable day of laughter, swimming, sweet treats, and oceanic surprises!</p>
        <h4>Jewel Callie Rae & The Family</h4>

        <CountDown 
          targetDate="2026-09-26T00:00:00" 
          label="Ocean Party Countdown" 
          variant="bubble" 
        />


      </section>



      <section className={`${Style.parallaxGallerySection} flex flex-col`} >

        <ParallaxGallery 
              images={debutantImages}
              columnSpeeds={[1.5, 2.5, 1.2, 1.8]}
        />

      </section>


       <section>

        <h2>The Venue</h2>
        <p>La casa google map</p>

        

      </section>
     





    </>
  );
}