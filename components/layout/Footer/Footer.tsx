import react from 'react';
import style from './Footer.module.css';
import MainFooterContent from './MainFooterContent';
import BottomFooter from './BottomFooter';


const menuItems = [
    { name: 'Templates', href: '#templates' },
    { name: 'Venues', href: '/venues' },
    { name: 'Journal', href: '/journal' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '/contact' },
];

export default function Footer() {

    return (

       <footer className={style.footer}>
            <MainFooterContent />
            <BottomFooter />
       </footer>

    );

}