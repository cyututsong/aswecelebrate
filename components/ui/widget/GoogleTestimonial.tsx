import React from 'react'
import Image from 'next/image'
import Style from './GoogleTestimonial.module.css'



interface Testimonial {
    id: string | number;
    image: string;
    alt: string;
    message: string;
    name: string;
    rate: number;
    location: string;
}

interface TestimonialsProps {
    testimonials: Testimonial[];
}


export default function GoogleTestimonial({
    testimonials
}: TestimonialsProps) {

    return (
        <div className={'grid grid-cols-3 gap-6 py-6 sm:py-20 px-6 bg-[#f8fafc]'}>
            {testimonials.map((testimonial) => (
                <div key={testimonial.id} className='flex flex-col bg-white rounded-2xl p-6 shadow-sm cursor-pointer hover:shadow-lg transition-shadow gap-5'>
                    <div className='flex gap-x-1'>
                        {[...Array(testimonial.rate)].map((_, index) => (
                            <svg key={index} className="w-5 h-5 text-[#ff7f00]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        ))}
                    </div>
                    <p className='text-sm'>{testimonial.message}</p>
                    <hr className="border-[#ddd] w-full"/>
                    <div className='flex flex-row gap-x-3'>
                        <Image 
                            src={testimonial.image}
                            alt={testimonial.name}
                            width={40}
                            height={40}
                            className={`${Style.authorImage} rounded-[100%]`}
                        />
                        <div className='flex flex-col gap-y-0'>
                            <h6 className='font-bold'>{testimonial.name}</h6>
                            <span className='text-xs'>{testimonial.location}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}