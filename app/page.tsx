import Image from "next/image";
import Style from "./Home.module.css";
import Ctabuttons from "@/components/ui/buttons/CtaButtons"
import { LuMonitorSmartphone } from "react-icons/lu";
import { FaVideo } from "react-icons/fa6";
import { RiMultiImageLine } from "react-icons/ri";
import { HiUsers } from "react-icons/hi2";
import Link from 'next/link';

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
                  </div>
                  <div>
                    <span>Wedding</span>
                    <span>Minimalist</span>
                  </div>
                </div>
              </div>

              <div>
                <div className={`${Style.weddingTemplate} ${Style.noirGala}`}>
                  <div>
                      <span>New Release</span>
                  </div>
                  <div>
                      <h4>Noir Gala</h4>
                      <p>Digital Print</p>
                  </div>

                </div>

                <div className={`${Style.weddingTemplate} ${Style.botanicalMuse}`}>
                  <div>
                      <span>New Release</span>
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

    </>
  );
}