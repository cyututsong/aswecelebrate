import type { Metadata } from "next";
import { EB_Garamond, Manrope } from 'next/font/google'
import "./globals.css";
import Header from "@/components/layout/Header/Header";


const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-eb-garamond',
  weight: ['400', '500', '600', '700', '800'],
})

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'As We Celebrate',
  description: 'Your one-stop destination for event planning, offering a curated selection of templates, venues, and expert advice to make your celebration unforgettable.',
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ebGaramond.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" cz-shortcut-listen="true">
        <Header />
        {children}
      </body>
    </html>
  );
}
