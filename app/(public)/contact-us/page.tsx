'use client';
import react from 'react';
import style from './page.module.css';
import ImageCursorTrail from '@/components/ui/cursor/ImageCursorTrail';

const sampleImages: string[] = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300",
  "https://images.unsplash.com/photo-1472214222541-d510753a4707?w=300"
];

export default function ContactUs() {

    return (

        <div className={style.contactUsContainer}>

            <ImageCursorTrail 
                items={sampleImages} 
                maxNumberOfImages={6} 
                distance={120} 
                imgClass="w-40 h-52"
                className={style.ImageCursorTrail}
            />

            <div className="relative z-10 flex items-center justify-center min-h-screen w-full">
                    <h1 className="text-4xl font-bold"> Welcome to Contact Us Page </h1>
                    <button className={style.testButton} onClick={() => alert("Button clicked!")}>test click</button>
            </div>

        </div>
    )

}