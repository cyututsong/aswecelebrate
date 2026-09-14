import { Metadata } from 'next';
import CallieClient from './CallieClient';

export const metadata: Metadata = {
  title: "Callie's 7th Birthday Celebration | Aswecelebrate",
  description: "Dive into a magical Under the Sea adventure filled with pearls, sparkles, and ocean wonders!",
  openGraph: {
    title: "Callie's 7th Birthday Celebration | Aswecelebrate",
    description: "Dive into a magical Under the Sea adventure filled with pearls, sparkles, and ocean wonders!",
    url: 'https://aswecelebrate.com/callie-7th',
    siteName: 'As We Celebrate',
    images: [
      {
        url: 'https://aswecelebrate.com/images/callie-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Jewel Callie Rae 7th Birthday Invitation',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Callie's 7th Birthday Celebration | Aswecelebrate",
    description: "Dive into a magical Under the Sea adventure filled with pearls, sparkles, and ocean wonders!",
    images: ['https://aswecelebrate.com/images/callie-og.jpg'],
  },
};

export default function Page() {
  return <CallieClient />;
}