import Image from "next/image";
import Style from "./Home.module.css";
import Ctabuttons from "@/components/ui/buttons/CtaButtons";
import { LuMonitorSmartphone } from "react-icons/lu";
import { FaVideo } from "react-icons/fa6";
import { RiMultiImageLine } from "react-icons/ri";
import { HiUsers } from "react-icons/hi2";
import Link from 'next/link';
import VenueProperty from "@/components/ui/widget/VenueProperty";
import { MdOutlineDesignServices } from "react-icons/md";
import { IoIosShareAlt } from "react-icons/io";
import { LuPartyPopper } from "react-icons/lu";

const featuresItems = [
    { 
      id:'device',
      icon: <LuMonitorSmartphone size={30} />,
      title: 'All Device View' ,
      description: 'Optimized for seamless viewing on mobile, tablet, and desktop screens'
    },
    { 
      id:'video',
      icon: <FaVideo size={30} />,
      title: 'Pre-Wedding Video' ,
      description: 'Embed your cinematic love story directly into your digital invitation'
    },
    { 
      id:'photos',
      icon: <RiMultiImageLine size={30} />,
      title: 'Prenup Photos' ,
      description: 'Display your beautiful engagement gallery with elegant zoom-in effects.'
    },
    { 
      id:'entrourage',      
      icon: <HiUsers size={30} />,
      title: 'The Entourage' ,
      description: 'Showcase your support system with detailed bridal party profiles'
    },
];

// Define your venue data
const venueData = [
  {
    id: 1,
    image: '/image/venue-1.png',
    alt: 'Venue Number 1',
    price: '₱25,000+',
    location: 'Tagaytay, City',
    name: 'Villa del Sogno',
    guests: 'Up to 150 guests'
  },
  {
    id: 2,
    image: '/image/venue-2.png',
    alt: 'Venue Number 2',
    price: '₱25,000+',
    location: 'Tagaytay, City',
    name: 'Villa del Sogno',
    guests: 'Up to 150 guests'
  },
  {
    id: 3,
    image: '/image/venue-3.jpg',
    alt: 'Venue Number 3',
    price: '₱25,000+',
    location: 'Tagaytay, City',
    name: 'Villa del Sogno',
    guests: 'Up to 150 guests'
  },
  {
    id: 4,
    image: '/image/venue-3.jpg',
    alt: 'Venue Number 4',
    price: '₱25,000+',
    location: 'Tagaytay, City',
    name: 'Villa del Sogno',
    guests: 'Up to 150 guests'
  }
];

export default function Home() {
  return (
    <>
      <section className={Style.bannerSection}>
        <div>
          <div>
            <h2>Seamless Online Invitations for Your Perfect Wedding Celebration</h2>
            <p>Save time and money with a stunning wedding website that beautifully tells your story. Fully customizable, stress-free, and ready to share instantly.</p>
            <Ctabuttons />
          </div>
          <div>
            <Image
              src="https://www.weddingwire.com/assets/img/landing-tools/websites/en/heading.webp"
              alt="Wedding Website"
              width={500}
              height={300}
            />
          </div>
        </div>
      </section>

      <section className={Style.featureSection}>
        <div>
          <div>
            <sub>PREMIUM</sub>
            <h2 className='underlineHeading'>Design for Modern Romance</h2>
          </div>

          <div>
            {featuresItems.map((item) => (
              <div key={item.id}>
                {item.icon}
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={Style.templateSection}>
        <div>
            <div>
              <h3>Featured Templates</h3>
              <div>
                <p>Curated stationery for the modern romantic</p>
                <Link href='#'><p>View All Templates</p></Link>
              </div>
            </div>

            <div>

              <div>
                <div className={`${Style.weddingTemplate} ${Style.ethernalCollection}`}>
                  <div>
                      <span>New Release</span>
                  </div>
                  <div>
                      <h4>The Ethernal Collection</h4>
                      <p>A minimalist masterpiece featuring hand-pressed texture and gold leaf accents.</p>
                      <div className={Style.templateTag}>
                        <span>Wedding</span>
                        <span>Minimalist</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className={`${Style.weddingTemplate} ${Style.noirGala}`}>
                  <div>
                  </div>
                  <div>
                      <h4>Noir Gala</h4>
                      <p>Digital Print</p>
                  </div>

                </div>

                <div className={`${Style.weddingTemplate} ${Style.botanicalMuse}`}>
                  <div>
                  </div>

                  <div>
                      <h4>Botanical Muse</h4>
                      <p>Limited Edition</p>
                  </div>
                </div>                
              </div>
            </div>

        </div>
      </section>   
      <section className={Style.venueSection}>
        <div>
            <div>
              <h3>Premium Venues</h3>
              <div>

                <p>Handpciked destination for unforgettable moments.</p>
                <Link href='#'><p>View All Venues</p></Link>
              </div>
            </div>

            <VenueProperty 
              venues={venueData}
            />
        </div>
      </section>    

      <section className={`${Style.simplyStepSection} flex flex-col bg-[#fcf9f2]`}>
          <div className="flex flex-col py-40">
            <div className="flex flex-col justify-center items-center mb-25">
              <h2>Design for Modern Romance</h2>
              <p>We've refined event planning process into a seamless, stress-free journey.</p>
            </div>
            <div className="flex flex-row justify-center items-center gap-20">
                <div className="flex flex-col w-1/3 justify-center items-center gap-5 text-center">
                    <div className={`${Style.simplyStepSection} bg-[#16404d] p-8 rounded-md`}>
                      <MdOutlineDesignServices color="#ffffff" size={35} />
                    </div>
                    <h4>1. Design</h4>
                    <p>Choose a template and customize the colors, fonts, and details to match your unique style.</p>
                </div>
                <div className="flex flex-col w-1/3 justify-center items-center gap-5 text-center">
                    <div className={`${Style.simplyStepSection} bg-[#16404d] p-8 rounded-md`}>
                      <IoIosShareAlt color="#ffffff" size={35} />
                    </div>
                    <h4>2. Share</h4>
                    <p>Send your digital invitation instantly and launch your website with one-tap RSVP.</p>
                </div>
                <div className="flex flex-col w-1/3 justify-center items-center gap-5 text-center">
                    <div className={`${Style.simplyStepSection} bg-[#16404d] p-8 rounded-md`}>
                      <LuPartyPopper color="#ffffff" size={35}/>
                      </div>
                    <h4>3. Celebrate</h4>
                    <p>Track RSVPs, manage guest preferences, and send updates in real time.</p>
                </div>
            </div>
            <hr className="border-x-teal-950 w-full"/>
          </div>
      </section>            

    </>
  );
}