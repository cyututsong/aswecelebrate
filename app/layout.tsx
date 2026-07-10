import type { Metadata } from "next";
import { Libre_Caslon_Text, Plus_Jakarta_Sans } from 'next/font/google'
import "./globals.css";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";


const libreCaslonText = Libre_Caslon_Text({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-libre-caslon',
  weight: ['400', '700'], 
});


const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
});


export const metadata: Metadata = {
  title: 'As We Celebrate',
  description: 'Your one-stop destination for event planning, offering a curated selection of templates, venues, and expert advice to make your celebration unforgettable.',
  icons: {
    icon: "image/favicon.png",
  },
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${libreCaslonText.variable} ${plusJakartaSans.variable} h-full antialiased`}> 
      <body className="min-h-full flex flex-col" cz-shortcut-listen="true">
        <Header />
        <main className="min-h-screen flex items-top flex-col">        
          {children}
        </main>
        <Footer />    
      </body>  
    </html>
  );
}
