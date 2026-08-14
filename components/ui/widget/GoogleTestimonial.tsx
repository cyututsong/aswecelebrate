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
        <div className={'${Style.testimonialContainer} grid grid-cols-3 gap-6'}>
            {testimonials.map((testimonial) => (
                <div key={testimonial.id} className='flex flex-col bg-[#f1f1f1] p-6 rounded-sm gap-y-4 cursor-pointer hover:scale-110 transition-all delay-150 duration-300'>
                    <div className='flex flex-row gap-x-3'>
                        <Image 
                            src={testimonial.image}
                            alt={testimonial.name}
                            width={70}
                            height={70}
                            className={`${Style.authorImage} rounded-[100%]`}
                        />
                        <div className='flex flex-col gap-y-2'>
                            <h6>{testimonial.name}</h6>
                            <span>{testimonial.location}</span>
                        </div>
                    </div>
                    <div className='flex gap-x-1'>
                        {[...Array(testimonial.rate)].map((_, index) => (
                            <span key={index} className="star text-[#fcba03] text-[25px]">★</span>
                        ))}
                    </div>
                    <p>{testimonial.message}</p>
                </div>
            ))}
        </div>
    );
}