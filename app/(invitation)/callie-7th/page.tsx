'use client'
import Style from './page.module.css';
import { li } from 'framer-motion/client';
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
import callie16 from './images/callie-16.jpg';
import callie17 from './images/callie-17.jpg';
import callie18 from './images/callie-18.jpg';
import callie19 from './images/callie-19.jpg';
import callie20 from './images/callie-20.jpg';
import callie21 from './images/callie-21.jpg';
import callie22 from './images/callie-22.jpg';
import callie23 from './images/callie-23.jpg';
import callie24 from './images/callie-24.jpg';
import callie25 from './images/callie-25.jpg';
import oceanbottom from './images/oceanbottom.png';
import dresscode from './images/dresscode.png'
import CountDown from '@/components/ui/countdowntimer/CountDown';
import ParallaxGallery from "@/components/ui/parallaxgallery/ParallaxGallery";
import { ScrollGallery, ShowcaseItem } from "@/components/ui/scrollgallery/ScrollGallery";
import { GalleryMansory, MasonryItem } from "@/components/ui/gallerymansory/GalleryMansory";
import RsvpForm from '@/components/forms/callie/RsvpForm';
import OceanBubbles from '@/components/ui/effects/ocean/OceanBubbles';
import {CardCarousel} from '@/components/ui/cardcarousel/CardCadrousel'
import Link from 'next/link';
import {MusicPlayer} from '@/components/ui/musicplayer/MusicPlayer';


const debutantImages = [
  callie10,
  callie5,
  callie12,
  callie13,  
  callie4,
  callie7,
  callie15,
  callie11,
  callie9,
  callie6,  
  callie14,
  callie8
];

const mansoryImages: MasonryItem[] = [
  { id: 1, src: callie16, alt: '' },
  { id: 2, src: callie21, alt: '' },
  { id: 3, src: callie18, alt: '' },
  { id: 4, src: callie20, alt: '' },
  { id: 5, src: callie17, alt: '' },
  { id: 6, src: callie22, alt: '' },
  { id: 7, src: callie23, alt: '' },
  { id: 8, src: callie24, alt: '' },
  { id: 9, src: callie25, alt: '' },
];

const sevenRoses = [
  "Matteo Nicolas De Guzman",
  "Dwayne Francis Crisologo",
  "Jude Crisologo",
  "Ninong Leodee John Amar",
  "Ninong Davies John Cruz",
  "Lolo Ben Crisologo",
  "Daddy Rodney Ramos",
]

const sevenBills = [
    "Kevin Charles Bancod",
    "Ninang Mary Grace Vidal",
    "Ninang Anelor Endriga",
    "Ninang Gretchen Pamilaran",
    "Ate Scarlette Jayda Francisco",
    "Judaea Estrelle Crisologo",
    "Ninang Irish Mae Cruz"  
];

const sevenGifts = [
    "Jazaeah Khate Santiago",
    "Ninang Czarina Santos",
    "Kyrie Maine Crisologo",
    "Rafaella Sakia Lobo",
    "Wilmaine Celestine Crisologo",
    "Cataleya Reese Salandanan",
    "Gabriela Marie Gayeta"  
];

const sevenCandles = [
    "Nanay Wena",
    "Lola Ising",
    "Tita P & Ninang Julie",
    "Tita Etel & Ate JJ",
    "Ninang Kim & Ninang Pedi",
    "Ninang Michelle Pagurayan",
    "Ninang Cyrrah & Ninang Sam"  
];

const sevenBallons = [
    "Joshtine Kiel Jamandri",
    "Kahel Naithan Mata",
    "Gabriel Liam Fontanilla",
    "Jaeden Sto. Nino",
    "Rai Aiden Ches Bufete",
    "Cayleb Dacara",
    "Shawne Rhyley Sayno"  
];

const sevenToys = [
    "Diane Francine Crisologo",
    "Jaxianna Kiersten Santiago",
    "Gideon Cabrera",
    "Zackiesha Amber Dacara",
    "Summer Ayanah Dacara",
    "Seff Espiritu",
    "Soleil Margaux Sta. Maria"  
];

const sevenSweetTreats = [
    "Jammela Carigma",
    "Maegan Cayle Mata",
    "Briana Louise Gracia",
    "Elisha Miller Diaz",
    "Victoria Bequilla",
    "Ahzia Faith Sia",
    "Kiarra Marie Crisologo"  
];

const sampleSpeakers: ShowcaseItem[] = [
  {
    id: "1",
    title: "ALEX JOHNSON",
    subtitle: "CEO & FOUNDER",
    image: {callie8},
    className: "col-start-1 row-start-1",
  },
  {
    id: "2",
    title: "MARCUS RIVERA",
    subtitle: "LEAD DESIGNER",
    image: {callie1},
    className: "col-start-2 row-start-1 md:col-start-3",
  },
  {
    id: "3",
    title: "EMILY WATSON",
    subtitle: "PRODUCT MANAGER",
    image: {callie12},
    className: "col-start-1 row-start-2",
  },
  {
    id: "4",
    title: "DAVID KIM",
    subtitle: "SENIOR DEVELOPER",
    image: {callie5},
    className: "col-start-2 row-start-2 md:col-start-4",
  },
    {
    id: "5",
    title: "ALEX JOHNSON",
    subtitle: "CEO & FOUNDER",
    image: {callie8},
    className: "col-start-1 row-start-1",
  },
  {
    id: "6",
    title: "MARCUS RIVERA",
    subtitle: "LEAD DESIGNER",
    image: {callie1},
    className: "col-start-2 row-start-1 md:col-start-3",
  },
  {
    id: "7",
    title: "EMILY WATSON",
    subtitle: "PRODUCT MANAGER",
    image: {callie12},
    className: "col-start-1 row-start-2",
  },
  {
    id: "8",
    title: "DAVID KIM",
    subtitle: "SENIOR DEVELOPER",
    image: {callie5},
    className: "col-start-2 row-start-2 md:col-start-4",
  },
];


const handleScrollToRSVP = (e:any) => {
  e.preventDefault();
  const element = document.getElementById('rsvp');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};


export default function Callie() {

  return (
    <>

        {/* Floating Ocean Air Bubbles */}
        <OceanBubbles count={30} />  

        <MusicPlayer
          audioSrc="/music/under-the-sea.mp3"
          title="Under the Sea"
          subtitle="Callie's 7th Birthday"
          autoPlay={true}
        />


        <section className={`${Style.BannerSection} flex flex-row p-20`}>

          <div className={Style.waveTop}>
              <svg 
                className={Style.waveSvg} 
                viewBox="0 0 1200 120" 
                preserveAspectRatio="none"
              >
                {/* Background Layer Wave */}
                <path 
                  className={Style.wavePath2}
                  d="M0,0 L0,40 C150,90 280,10 420,65 C580,120 730,20 900,80 C1050,130 1150,40 1200,70 L1200,0 Z" 
                  fill="#ffffff" 
                  fillOpacity="0.35"
                />
                {/* Foreground Aggressive Wave */}
                <path 
                  className={Style.wavePath1}
                  d="M0,0 L0,20 C100,75 220,110 360,45 C500,-20 640,95 800,35 C940,-15 1080,85 1200,30 L1200,0 Z" 
                  fill="#ffffff"
                />
              </svg>
          </div>   

         <div>

                <div className="w-1/2 flex flex-col">
                  <sub className={Style.displayDestop}>YOU ARE INVITED</sub>
                  <h2 className={Style.gradientText}>Jewel Callie Rae</h2>
                  <h3 >7th</h3>
                  <h4>Birthday Celebration</h4>
                  <p>Dive into magical Under the Sea Adventure filled with pearl. Sparkles, and ocean wonders!</p>
                  <button onClick={handleScrollToRSVP}>RSVP to Celebrate</button>
                </div>

                {/* Stack Container */}
                <sub className={Style.displayMobile}>YOU ARE INVITED</sub>
                <div className={`${Style.cardStack} flex items-center justify-center w-1/2 flex flex-col`}>  
                  
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

         </div>


          <div className={Style.waveBottom}>
            <svg 
              className={Style.waveSvg} 
              viewBox="0 0 1200 120" 
              preserveAspectRatio="none"
            >
              {/* Background Layer Wave */}
              <path 
                className={Style.wavePath2}
                d="M0,120 L0,50 C120,10 270,100 420,40 C570,-20 720,80 900,30 C1040,-10 1140,60 1200,40 L1200,120 Z" 
                fill="#ffffff" 
                fillOpacity="0.35"
              />
              {/* Foreground Aggressive Wave */}
              <path 
                className={Style.wavePath1}
                d="M0,120 L0,80 C150,10 300,125 480,55 C630,-10 770,105 920,35 C1050,-25 1130,65 1200,85 L1200,120 Z" 
                fill="#ffffff"
              />
            </svg>
          </div>          

        </section>

        <section className={`${Style.countDownSection} relative flex flex-col items-center justify-center min-h-[200px] overflow-hidden`}>
          
          <h2 className={Style.gradientText}>Seven Splendid Years of Radiance</h2>
          <p>“Seven years of sunshine, giggles, and making waves! Jewel Callie Rae is overflowing with excitement to celebrate her 7th milestone voyage with her favorite family and friends. Come dive into an unforgettable day of laughter, swimming, sweet treats, and oceanic surprises!</p>

          <CountDown 
            targetDate="2026-09-26T00:16:00" 
            label="Ocean Party Countdown" 
            variant="bubble" 
          />

        </section>


          <section className={`${Style.parallaxGallerySection} ${Style.displayDestop} flex flex-col`} >

            <ParallaxGallery 
                  images={debutantImages}
                  columnSpeeds={[1.5, 2.5, 1.2, 1.8]}
            />

          </section>

         <section className={`${Style.parallaxGallerySection} ${Style.displayMobile} flex flex-col`} >
            <div className="flex h-screen items-center justify-center bg-[#f5f4f3]">
                  <CardCarousel
                    items={debutantImages}
                    autoplay={{ delay: 3000 }}
                    cardClassName="h-[400px] w-[280px]"
                  />
            </div>
         </section>
  

        <section className={`${Style.venueSection} relative flex flex-col items-center justify-center min-h-[200px] overflow-hidden p-20`} >

          <h4>Event Details</h4>
          <p>Saturday September 26, 2026 5:00pm</p>
          <h2 className={Style.gradientText}>Casa Prinza</h2>
          <p>G6P9+G3W, F. Gonzales Street, Teresa, Rizal</p>

          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3862.09827382445!2d121.21770299999999!3d14.536371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c10015adf533%3A0x7d08de1f5dd6423!2sCasa%20Prinza!5e0!3m2!1sen!2sph!4v1788976466993!5m2!1sen!2sph" 
            width="70%" 
            height="500" 
            style={{ border: 0 }} 
            allowFullScreen
            loading="lazy" 
            referrerPolicy="strict-origin-when-cross-origin" 
          ></iframe>

        </section>

        <section className={`${Style.sevenTraditionSection}`} >

          <div className={Style.waveTop}>
              <svg 
                className={Style.waveSvg} 
                viewBox="0 0 1200 120" 
                preserveAspectRatio="none"
              >
                {/* Background Layer Wave */}
                <path 
                  className={Style.wavePath2}
                  d="M0,0 L0,40 C150,90 280,10 420,65 C580,120 730,20 900,80 C1050,130 1150,40 1200,70 L1200,0 Z" 
                  fill="#ffffff" 
                  fillOpacity="0.35"
                />
                {/* Foreground Aggressive Wave */}
                <path 
                  className={Style.wavePath1}
                  d="M0,0 L0,20 C100,75 220,110 360,45 C500,-20 640,95 800,35 C940,-15 1080,85 1200,30 L1200,0 Z" 
                  fill="#ffffff"
                />
              </svg>
          </div>

          <h2 className={Style.gradientText}>The Seven Tradition</h2>
        
          <div className={Style.tranditionContainer}>
            <div>
              <h3>7 Bills</h3>
                <ul>
                  {sevenBills.map((bill, index) => (
                    <li key={index}>{bill}</li>
                  ))}
                </ul>
            </div>

            <div>
              <h3>7 Roses</h3>
                <ul>
                  {sevenRoses.map((rose, index) => (
                    <li key={index}>{rose}</li>
                  ))}
                </ul>
            </div>

            <div>
              <h3>7 Gifts</h3>
              <ul>
                {sevenGifts.map((gift, index) =>(
                  <li key={index}>{gift}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3>7 Candles</h3>
              <ul>
                {sevenCandles.map((candle, index) => (
                  <li key={index}>{candle}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3>7 Balloons</h3>
                <ul>
                  {sevenBallons.map((ballon, index) => (
                    <li key={index}>{ballon}</li>
                  ))}
                </ul>
            </div>
            <div>
              <h3>7 Toys</h3>
              <ul>
                {sevenToys.map((toy, index) => (
                  <li key={index}>{toy}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>7 Sweet Treats</h3>
              <ul>
                {sevenSweetTreats.map((sweettreat, index) => (
                  <li key={index}>{sweettreat}</li>
                ))}
              </ul>
            </div>


          </div>


          {/* Animated Bottom Ocean Wave Divider */}
            <div className={Style.waveBottom}>
              <svg 
                className={Style.waveSvg} 
                viewBox="0 0 1200 120" 
                preserveAspectRatio="none"
              >
                {/* Background Layer Wave */}
                <path 
                  className={Style.wavePath2}
                  d="M0,120 L0,50 C120,10 270,100 420,40 C570,-20 720,80 900,30 C1040,-10 1140,60 1200,40 L1200,120 Z" 
                  fill="#ffffff" 
                  fillOpacity="0.35"
                />
                {/* Foreground Aggressive Wave */}
                <path 
                  className={Style.wavePath1}
                  d="M0,120 L0,80 C150,10 300,125 480,55 C630,-10 770,105 920,35 C1050,-25 1130,65 1200,85 L1200,120 Z" 
                  fill="#ffffff"
                />
              </svg>
            </div>


        </section>   

        <section className={`w-full ${Style.gallerySection}`}>

          <GalleryMansory
                  items={mansoryImages}
                  columns={3}
                  gap={16}
                  onItemClick={(item) => console.log('Clicked item:', item)}
                  renderOverlay={(item) => (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: '12px',
                        background: 'linear-gradient(transparent, rgba(0,0,0,0.6))',
                        color: '#fff',
                      }}
                    >
                      {item.alt}
                    </div>
                  )}
          />


        </section>

        <section className={`w-full ${Style.dressCodeSection}`}>

              <h4>Dress Code</h4>
              <h2 className={Style.gradientText}>Casual attire</h2>
              <p>Or anything you’re comfortable wearing. You can also bring a swimsuit if you’d like to swim.</p>

              <Image 
                src={dresscode} 
                alt="Dress Code" 
                width={500} 
                height={500} 
              />

        </section>

        <section className={`w-full ${Style.faqSection}`}>

              <h4>Other Useful INFORMATION</h4>
              <h2 className={Style.gradientText}>FAQ</h2>
              
              <div>

                <div>
                  <Image 
                    src={callie17} 
                    alt="Faq" 
                    width={500} 
                    height={500} 
                  />
                </div>
                <div>

                <div className={Style.accordion}>

                        {/* 1. First Item - Open by default */}
                        <details className={Style.accordionItem} open>
                          <summary className={Style.accordionHeader}>When is the RSVP Deadline?</summary>
                          <div className={Style.accordionContent}>
                            <p>
                              Please RSVP by <strong>September 20, 2026</strong> so we can finalize all arrangements. You can RSVP online or by returning the card included.
                            </p>
                          </div>
                        </details>

                        {/* 2. Closed by default */}
                        <details className={Style.accordionItem}>
                          <summary className={Style.accordionHeader}>Can I bring a plus one?</summary>
                          <div className={Style.accordionContent}>
                            <p>
                              Yes, you can bring a plus-one and enjoy the party together!
                            </p>
                          </div>
                        </details>

                        {/* 3. Closed by default */}
                        <details className={Style.accordionItem}>
                          <summary className={Style.accordionHeader}>What is your gift preferences?</summary>
                          <div className={Style.accordionContent}>
                            <p>
                              We are deeply appreciative of the time and effort you’ll dedicate to joining us on our special day. 
                            </p>
                          </div>
                        </details>   

                        {/* 4. Closed by default */}
                        <details className={Style.accordionItem}>
                          <summary className={Style.accordionHeader}>Is there parking available at the venue?</summary>
                          <div className={Style.accordionContent}>
                            <p>
                              Yes there is parking in the venue but it as limited to only it about 4-5 slot only.
                            </p>
                          </div>
                        </details>                           


                    </div>
                </div>


              </div>


        </section>

        <section id="rsvp" className={`w-full ${Style.rsvpSection}`}>

              <h2 className={Style.gradientText}>RSVP</h2>
              <p>We have reserved seat/s for you. A favor of a reply is requested. Fill up the form below</p>
              
              <RsvpForm />


        </section>

        <section className={`w-full ${Style.oceanBottom}`}>     
        </section>

    </>
  );
}