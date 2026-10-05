import React from 'react';
import Link from 'next/link';
import style from './CtaButtons.module.css';

export interface CtaButtonProps {
  text?: string;
  href?: string;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export default function CtaButton({
  text = "Let's Make Your Invitation",
  href = '/get-started',
  variant = 'primary',
  className = '',
}: CtaButtonProps) {
  const buttonStyle = variant === 'primary' ? style.ctaButtonPrimary : style.ctaButtonSecondary;

  return (
    <>
      <Link href={href}>
        <button className={`${style.ctaButton} ${buttonStyle} ${className}`.trim()}>
          {text}
        </button>
      </Link>
    </>
  );
}