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

const websiteDesigns = [
  { id: 1, src: TemplateInvitation, alt: 'template 1', category: 'Wedding' },
  { id: 2, src: TemplateInvitation2, alt: 'template 2', category: 'Dedication' },
  { id: 3, src: TemplateInvitation3, alt: 'template 3', category: '18 Birthday' },
  { id: 4, src: TemplateInvitation4, alt: 'template 4', category: '7th' },
  { id: 5, src: TemplateInvitation5, alt: 'template 5', category: 'Wedding' },
  { id: 6, src: TemplateInvitation6, alt: 'template 6', category: '18 Birthday' },
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
        </div>
      </section>
    </>
  );
}