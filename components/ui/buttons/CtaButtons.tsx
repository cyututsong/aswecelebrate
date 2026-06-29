import react from 'react';
import Link from 'next/link';
import style from './CtaButtons.module.css';


export default function CtaButtons(){
    return (
        <div className={style.ctaButtons}>
            <Link href="/get-started" className={style.ctaButton + ' ' + style.ctaButtonPrimary}>
                Get Started
            </Link>
        </div>
    );
}


