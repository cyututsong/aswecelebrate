import Link from 'next/link';
import style from './Header.module.css';

export default function HeaderMainNavigation() {

    const menuItems = [
        { name: 'Templates', href: '#templates' },
        { name: 'Venues', href: '/venues' },
        { name: 'FAQ', href: '#faq' },
        { name: 'Contact', href: '/contact' },
    ];
    
    
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