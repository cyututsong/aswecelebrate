import Link from 'next/link';
import Image from 'next/image';
import style from './Header.module.css';



export default function HeaderLogo() {

    return (
        <Link href="/" className={style.logo}>
            <Image
                src="/images/ASWECELEBRATE-LOGO-BLACK.png"
                alt="As We Celebrate Logo"
                width={200}
                height={40}
            />
        </Link>
    );
}