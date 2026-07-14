import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CiLocationOn } from "react-icons/ci";
import { MdArrowOutward } from "react-icons/md";
import Style from './Venue.module.css';


export default function VenueProperty() {


    return (      
        <div className={Style.venueContainer}>
            <div>
                <div>
                    <Image
                        src="/image/venue-1.png"
                        alt="Venue Number 1"
                        width={300}
                        height={300}
                        loading="eager"
                    />
                    <span>₱25,000+</span>
                </div>
                <div>
                    <div><CiLocationOn  size={10}/> Tagaytay, City</div>
                    <h3>Villa del Sogno</h3>
                    <hr/>
                    <div>
                        <p>Up to 150 guests</p>
                        <MdArrowOutward size={40} />
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <Image
                        src="/image/venue-2.png"
                        alt="Venue Number 1"
                        width={300}
                        height={300}
                        loading="eager"
                    />
                    <span>₱25,000+</span>
                </div>
                <div>
                    <div><CiLocationOn  size={10}/> Tagaytay, City</div>
                    <h3>Villa del Sogno</h3>
                    <hr/>
                    <div>
                        <p>Up to 150 guests</p>
                        <MdArrowOutward size={40} />
                    </div>
                </div>
             </div>  
            <div>                     
                <div>
                    <Image
                        src="/image/venue-3.jpg"
                        alt="Venue Number 1"
                        width={300}
                        height={300}
                        loading="eager"
                    />
                    <span>₱25,000+</span>
                </div>
                <div>
                    <div><CiLocationOn  size={10}/> Tagaytay, City</div>
                    <h3>Villa del Sogno</h3>
                    <hr/>
                    <div>
                        <p>Up to 150 guests</p>
                        <MdArrowOutward size={40} />
                    </div>
                </div>
            </div>     
        </div>
    );




}