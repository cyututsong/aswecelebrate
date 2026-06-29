'use client'
import { useState } from 'react';
import HeaderLogo from './HeaderLogo';
import style from './Header.module.css';




export default function Header() {

    return (
        <header className={style.header}>

            <HeaderLogo />


        </header>
    );

 }