import Image from "next/image";
import Style from "./Home.module.css";
import Link from 'next/link';

import { MdOutlineDesignServices } from "react-icons/md";
import { IoIosShareAlt } from "react-icons/io";
import { LuPartyPopper } from "react-icons/lu";
import GoogleTestimonial from "@/components/ui/widget/GoogleTestimonial";
import VenueProperty from "@/components/ui/widget/VenueProperty";
import Ctabuttons from "@/components/ui/buttons/CtaButtons";
import SignupForm from "@/components/ui/widget/SignupForm";
import { subscribeToNewsletter } from './actions';

//data
import { featuresItems } from '@/data/featureTempalteData';
import { venuesData } from '@/data/venuesData';
import { testimonialsData } from '@/data/testimonialsData';



export default function Home() {

  const customValidate = (email: string): boolean => {
    return email.endsWith('@company.com') && email.length > 10;
  };

  const handleSubmit = async (email: string): Promise<void> => {
    console.log('Valid email:', email);
  };

  return (
    <>
      <section className={Style.bannerSection}>
        <div className={Style.overlaySection}></div>
        <div>
          <div>
            <h2>Seamless Invitation for <i>Perfect Wedding</i> Celebration</h2>
            <p>Save time and money with a stunning wedding website that beautifully tells your story. Fully customizable, stress-free, and ready to share instantly.</p>
            <div className={Style.ctaButtons}><Link href='#'><button>Let's Make Your Invitation</button></Link><Link href='#'><button>View All Templates</button></Link></div>
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
              venues={venuesData}
            />
        </div>
      </section>    

      <section className={`${Style.simplyStepSection} flex flex-col bg-[#fcf9f2]`}>
          <div className="relative flex flex-col py-40">
            <div className="flex flex-col justify-center items-center mb-25">
              <h2>Design for Modern Romance</h2>
              <p>We've refined event planning process into a seamless, stress-free journey.</p>
            </div>

            <div className="relative flex flex-col">
              <div className="flex flex-row justify-center items-center gap-20 z-20">
                  <div className="flex flex-col w-1/3 justify-center items-center gap-5 text-center">
                      <div className={`${Style.simplyStepSection} bg-[#16404d] p-8 rounded-md`}>
                        <MdOutlineDesignServices color="#ffffff" size={35} />
                      </div>
                      <h4>1. Design</h4>
                      <p className="px-6 pb-6">Choose a template and customize the colors, fonts, and details to match your unique style.</p>
                  </div>
                  <div className="flex flex-col w-1/3 justify-center items-center gap-5 text-center">
                      <div className={`${Style.simplyStepSection} bg-[#16404d] p-8 rounded-md`}>
                        <IoIosShareAlt color="#ffffff" size={35} />
                      </div>
                      <h4>2. Share</h4>
                      <p className="px-6 pb-6">Send your digital invitation instantly and launch your website with one-tap RSVP.</p>
                  </div>
                  <div className="flex flex-col w-1/3 justify-center items-center gap-5 text-center">
                      <div className={`${Style.simplyStepSection} bg-[#16404d] p-8 rounded-md`}>
                        <LuPartyPopper color="#ffffff" size={35}/>
                        </div>
                      <h4>3. Celebrate</h4>
                      <p className="px-6 pb-6">Track RSVPs, manage guest preferences, and send updates in real time.</p>
                  </div>
              </div>
              <hr className="border-[#ddd] w-full absolute top-13 z-10"/>
            </div>
          </div>
      </section> 



      <section className="flex flex-col bg-[#f8fafc]">
          <div className="relative flex flex-col py-40">
            <h2 className="text-3xl font-bold text-center mb-10">What our clients say</h2>
            <GoogleTestimonial testimonials={testimonialsData} />
          </div>
      </section>            

      <section className="flex flex-col bg-[#fff] py-40 ">
          <div className=" flex bg-[#f6f3ec] justify-center items-center w-1/2 justify-center items-center ">
          <div className="flex flex-col py-40 w-1/2 items-center justify-center">
              <h2>Join the Inner Circle</h2>
              <p>Get exclusive first access to new template and limited venue availability your inbox.</p>

              <SignupForm 
                onSubmit={subscribeToNewsletter}  // ✅ Server Action
                buttonText="Subscribe"
                buttonColor="green"
                successMessage="Successfully subscribed!"
                errorMessage="Failed to subscribe. Please try again."
              />
          </div>

          </div>

      </section>     
     

    </>
  );
}