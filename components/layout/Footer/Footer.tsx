import react from 'react';
import style from './Footer.module.css';
import MainFooterContent from './MainFooterContent';





export default function Footer() {

    return (

       <footer className={style.footer}>

            <MainFooterContent />


            <div className={style.bottomFooter}>

            </div>


       </footer>

    );

}