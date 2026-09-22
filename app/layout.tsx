// app/layout.tsx
import type { Metadata } from "next";
import { Playfair_Display, Poppins } from 'next/font/google';
import "@/app/globals.css"; // Ensure global CSS is imported here
import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata: Metadata = {
  title: 'As We Celebrate',
  description: 'Your one-stop destination for event planning, offering a curated selection of templates, venues, and expert advice to make your celebration unforgettable.',
  icons: {
    icon: "image/favicon.png",
  },
};

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair-display',
  weight: ['400', '500', '600', '700'],
});

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" cz-shortcut-listen="true">
        {children}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  );
}