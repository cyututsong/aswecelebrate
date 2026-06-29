'use client'
import { useState } from 'react';
import HeaderLogo from './HeaderLogo';
import style from './Header.module.css';
import HeaderMainNavigation from './HeaderMainNavigation';
import CtaButtons from '@/components/ui/buttons/CtaButtons';




export default function Header() {

    return (
        <header className={style.header}>
            <div className={style.headerContent}>
                <div className={style.logoContainer}>
                    <HeaderLogo />
                </div>
                <div className={style.navContainer}>
                    <HeaderMainNavigation />
                    <CtaButtons />
                </div>
            </div>

        </header>
    );

 }