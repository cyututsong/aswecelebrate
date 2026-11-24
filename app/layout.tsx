import type { Metadata } from "next";
import { Poppins, Mulish, Playwrite_AU_SA_Guides } from "next/font/google";

import "@/app/globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

// ========================================
// WEBSITE METADATA
// ========================================

export const metadata: Metadata = {
  title: "As We Celebrate",
  description:
    "Discover wedding venues, suppliers and talented professionals to make your celebration unforgettable.",
  icons: {
    icon: "/image/favicon.png",
  },
};

// ========================================
// HEADING FONT - POPPINS
// ========================================

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800"],
});

// ========================================
// BODY FONT - MULISH
// ========================================

const mulish = Mulish({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mulish",
  weight: ["300", "400", "500", "600", "700", "800"],
});

// ========================================
// ACCENT FONT - PLAYWRITE AU SA GUIDES
// ========================================

const playwrite = Playwrite_AU_SA_Guides({
  display: "swap",
  variable: "--font-playwrite",
  weight: "400",
});

// ========================================
// ROOT LAYOUT
// ========================================

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`
        ${poppins.variable}
        ${mulish.variable}
        ${playwrite.variable}
        h-full antialiased
      `}
    >
      <body className="min-h-full flex flex-col">
        {children}

        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  );
}
