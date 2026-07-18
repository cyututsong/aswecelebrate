'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { CiLocationOn } from "react-icons/ci"
import { MdArrowOutward } from "react-icons/md"
import Style from './Venue.module.css'

// Define the type for a single venue
interface Venue {
  id: string | number;
  image: string;
  alt: string;
  price: string;
  location: string;
  name: string;
  guests: string;
}

// Define props interface
interface VenuePropertyProps {
  venues: Venue[];
  className?: string; // Optional additional styling
  onVenueClick?: (venue: Venue) => void; // Optional click handler
}

export default function VenueProperty({ 
  venues, 
  className = '',
  onVenueClick 
}: VenuePropertyProps) {
  const router = useRouter(); // ✅ Initialize router inside the component

  // ✅ Move handleVenueClick inside the component
  const handleVenueClick = (venue: Venue) => {
    // Handle the click logic here
    console.log('Clicked:', venue.name);
    
    // Example: Navigate to venue details
    router.push(`/venues/${venue.id}`);
    
    // Or show a modal
    // Or update state
    // Or anything else you need
  };

  return (
    <div className={`${Style.venueContainer} ${className}`}>
      {venues.map((venue) => (
        <div 
          key={venue.id} 
          className={Style.venueItem}
          onClick={() => handleVenueClick(venue)} // ✅ Use handleVenueClick directly
          style={{ cursor: 'pointer' }}
        >
          <div className={Style.imageWrapper}>
            <Image
              src={venue.image}
              alt={venue.alt}
              width={600}
              height={600}
              loading="eager"
              className={Style.venueImage}
            />
            <span className={Style.priceTag}>{venue.price}</span>
          </div>
          <div className={Style.detailsWrapper}>
            <div className={Style.location}>
              <CiLocationOn size={15} /> {venue.location}
            </div>
            <h4>{venue.name}</h4>
            <hr />
            <div className={Style.footer}>
              <p>{venue.guests}</p>
              <MdArrowOutward size={30} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}