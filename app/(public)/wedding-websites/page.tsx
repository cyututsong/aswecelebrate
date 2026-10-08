"use client";

import { useState } from "react";
import Image from "next/image";
import Style from "./weddingwebsites.module.css";
import Link from 'next/link';
import imagesTop from './images/wedding-website-top.webp';

import GoogleTestimonial from "@/components/ui/widget/GoogleTestimonial";
import CtaButtons from "@/components/ui/buttons/CtaButtons";

import TemplateInvitation from './images/template.jpg';
import TemplateInvitation2 from './images/template2.jpg';
import TemplateInvitation3 from './images/template3.jpg';
import TemplateInvitation4 from './images/template4.jpg';
import TemplateInvitation5 from './images/template5.jpg';
import TemplateInvitation6 from './images/template6.jpg';
import DesignImage from './images/design.webp';
import ShareImage from './images/share.webp';
import TrackImage from './images/track.webp';


import { testimonialsData } from '@/data/testimonialsData';

const websiteDesigns = [
  { id: 1, src: TemplateInvitation, alt: 'template 1', category: 'Wedding' },
  { id: 2, src: TemplateInvitation2, alt: 'template 2', category: 'Dedication' },
  { id: 3, src: TemplateInvitation3, alt: 'template 3', category: '18 Birthday' },
  { id: 4, src: TemplateInvitation4, alt: 'template 4', category: '7th' },
  { id: 5, src: TemplateInvitation5, alt: 'template 5', category: 'Wedding' },
  { id: 6, src: TemplateInvitation6, alt: 'template 6', category: '18 Birthday' },
];


const steps = [
  { id:1, src: DesignImage, alt: 'Design', title: '1. Design', description: 'Choose a template and customize the colors, fonts, and details to match your unique style.' },
  { id:2, src: ShareImage, alt: 'Share', title: '2. Share', description: 'Send your digital invitation instantly and launch your website with one-tap RSVP.' },
  { id:3, src: TrackImage, alt: 'Celebrate', title: '3. Celebrate', description: 'Track RSVPs, manage guest preferences, and send updates in real time.' },
];




export default function WeddingWebsites() {
  const categories = ["Any Occation", "Wedding", "18 Birthday", "7th", "Dedication" ];
  
  // State to store the active category
  const [activeCategory, setActiveCategory] = useState<string>("Any Occation");

  // Filter items based on active category (or show all if "Any Occation" is picked)
  const filteredDesigns = websiteDesigns.filter((design) => {
    if (activeCategory === "Any Occation") return true;
    return design.category === activeCategory;
  });


  return (
    <>
      <section className="flex flex-col px-5 py-10 md:py-10 md:px-10 bg-[#F6F3EC]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col gap-4 w-full md:w-[60%] order-2 md:order-1">
            <h2 className="leading-[1.2em] mb-4 text-center md:text-left !text-4xl md:!text-6xl">
              Seamless Invitation for <i className="font-bold">Perfect Wedding</i> Celebration
            </h2>
            <p className="leading-[1.5em] text-center md:text-left !text-base md:!text-lg">
              Save time and money with a stunning wedding website that beautifully tells your story. Fully customizable, stress-free, and ready to share instantly.
            </p>
            <div className="flex gap-10 mt-4 flex-row align-center justify-center md:justify-start">
              <CtaButtons 
                text="Let's Make Your Invitation" href="/get-started" variant="primary" 
              />
            </div>
          </div>
          <div className="flex justify-center items-center flex-1 order-1 md:order-2">
            <Image
              src={imagesTop}
              alt="Wedding Website"
              width={500}
              height={300}
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col px-5 py-10 md:py-10 md:px-10">
        <div>    
          <div>
            <h2 className="underlineHeading text-center">Pick on our pre-designed website</h2>
            <ul className="flex flex-wrap justify-center gap-10 mt-10 mb-10 text-lg font-semibold cursor-pointer">
              {categories.map((category) => (
                <li
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`transition-colors border-b-2 pb-1 ${
                    activeCategory === category
                      ? "text-purple-600 border-purple-600"
                      : "text-gray-600 border-transparent hover:text-black"
                  }`}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto">
            {filteredDesigns.map((design) => (
              <div key={design.id} className="w-full flex justify-center">
                <Image
                  src={design.src}
                  alt={design.alt}
                  width={300}
                  height={200}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            ))}       
          </div>
          <div className="flex flex-col gap-10 mt-10 items-center justify-center">
            <CtaButtons 
              text="Let's get started" href="/get-started" variant="primary" 
            />
          </div>

        </div>
      </section>


      <section  className="flex flex-col px-5 py-10 md:py-10 md:px-10">
        <div>
          <div className="flex flex-col w-full max-w-5xl mx-auto mb-10 gap-4 justify-center items-center">
            <h2 className="underlineHeading text-center">Design for Modern Romance</h2>
            <p>We've refined event planning process into a seamless, stress-free journey.</p>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-5xl mx-auto">
              {steps.map((step)=> (
                <div key={step.id} className="w-full flex flex-col justify-center gap-5 bg-[#f6f3ec] p-5">
                  <h3 className="!text-2xl md:!text-4xl font-bold">{step.title}</h3>
                  <Image
                    src={step.src}
                    alt={step.alt}
                    width={200}
                    height={200}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                  <p>{step.description}</p>
                </div>  
              ))}
          </div>


        <div className="flex flex-col gap-10 mt-10 items-center justify-center">
            <CtaButtons 
              text="Let's get started" href="/get-started" variant="primary" 
            />
        </div>

        </div>
      </section>

      <section className={`flex flex-col px-5 py-10 md:py-30 md:px-10 bg-cover bg-center ${Style.testimonialSection}`}>
        <div>

          <div className="flex flex-col w-full max-w-5xl mx-auto mb-10 gap-4 justify-center items-center ">
            <h2 className="text-center text-white">What Our Clients Say</h2>
            <p className="text-center text-white w-[60%]">We are proud to have helped countless couples create their dream wedding websites. Here are some of their testimonials:</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-5xl mx-auto">
            {testimonialsData.map((testimonial) => (
                <div key={testimonial.id} className="w-full max-w-5xl mx-auto p-5 bg-[#f6f3ec] rounded-lg">
                  <p className="text-center text-gray-700 italic">"{testimonial.message}"</p>
                  <p className="text-center text-gray-500 mt-2">— {testimonial.name}</p>
                </div>
              ))}
          </div>   

        </div>
      </section>

    </>
  );
}