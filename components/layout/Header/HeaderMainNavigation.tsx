import Link from 'next/link';
import style from './Header.module.css';

const menuItems = [
    { name: 'Templates', href: '/templates' },
    { name: 'Venues', href: '/venue' },
    { name: 'Journal', href: '/journal' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact Us', href: '/contact-us' },
];
    
export default function HeaderMainNavigation() {

    return (
        <nav className={style.navMenuContainer}>
            {menuItems.map((item) => (
                <Link key={item.href} href={item.href}>
                    {item.name}
                </Link>
            ))}
        </nav>
    );


}