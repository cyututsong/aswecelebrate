'use client';

import { useEffect, useState } from 'react';
import HeaderLogo from './HeaderLogo';
import HeaderMainNavigation from './HeaderMainNavigation';
import CtaButtons from '@/components/ui/buttons/CtaButtons';
import HamburgerMenu from '@/components/ui/hamburger/HamburgerMenu';
import style from './Header.module.css';

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Check on first load

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className={style.header}>
      <div className={style.headerContent}>
        {isMobile && <HamburgerMenu />}
        <HeaderLogo />
        {!isMobile && <HeaderMainNavigation />}
        <CtaButtons />
      </div>
    </header>
  );
}