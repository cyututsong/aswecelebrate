import react from 'react';
import style from './Footer.module.css';
import Link from 'next/link';





export default function BottomFooter() {

    return (
            <div className={style.bottomFooter}>
                <p>© 2026 As We Celebrate. All rights reserved.</p>
                <p><Link href="/privacy">Privacy Policy</Link> | <Link href="/terms">Terms of Service </Link> </p>
            </div> 
    )

}