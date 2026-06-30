import react from 'react';
import Link from 'next/link';
import style from './Footer.module.css';
import Image from 'next/image';


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
                        width={200}
                        height={40}
                        loading="eager"
                        style={{ width: '200px', height: 'auto' }}
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
                </div>
                <div>

                </div>

            </div>
             
        
        )




}