import react from 'react';
import Link from 'next/link';
import style from './Footer.module.css';
import Image from 'next/image';
import { FaFacebookF } from 'react-icons/fa';
import { FaPhone } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";


const quickLinks = [
    { name: 'Templates', href: '#templates' },
    { name: 'Venues', href: '/venues' },
    { name: 'Journal', href: '/journal' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '/contact' },
];


export default function MainFooterContent(){

    return (
    
            <div className={style.FooterContentContainer}>

                <div>
                    <Image
                        src="/image/ASWECELEBRATE-LOGO-BLACK.png"
                        alt="As We Celebrate Logo"
                        width={257}
                        height={40}
                        loading="eager"
                        style={{ width: '257px', height: 'auto' }}
                    />

                    <p> Beautiful wedding website designed to make your special day truly unforgettable! 💍✨</p>
                </div>
                <div>
                    <h5>Quick Links</h5>
                    <ul>
                        {quickLinks.map((link) => (
                            <li key={link.href}>
                                <Link href={link.href}>
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h5>Follow Us</h5>
                    <ul>
                        <li>
                            <a href="#" target="_blank">                               
                                <FaFacebookF size={20} />
                                <span className="elementor-icon-list-text">Facebook</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h5>Contact Us</h5>
                    <ul>
                        <li>
                            <a href="tel:+639650371441" target="_blank">
                                <FaPhone size={20} />                             
                                    <span className="elementor-icon-list-text">+63 965 037 1441</span>
                            </a>
                        </li>
                        <li>
                            <a href="mailto:info@aswecelebrate.com" target="_blank">
                               <HiOutlineMail size={20} />                           
                                    <span className="elementor-icon-list-text">info@aswecelebrate.com</span>
                            </a>
                        </li>                       
                    </ul>
                </div>

            </div>
             
        
        )




}