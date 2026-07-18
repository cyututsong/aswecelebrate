import React from 'react'
import Image from 'next/image'
import Style from './GoogleTestimonial.module.css'



interface Testimonial {
    id: string | number;
    image: string;
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
        <div className={Style.testimonialContainer}>
            {testimonials.map((testimonial) => (
                <div key={testimonial.id}>
                    <Image 
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={600}
                        height={600}
                        className={Style.authorImage}
                    />
                    <h6>{testimonial.name}</h6>
                    <p>{testimonial.location}</p>
                    <p>{testimonial.rate}</p>
                    <p>{testimonial.message}</p>
                </div>
            ))}
        </div>
    );
}