import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';
import { WishlistProvider } from '@/context/WishlistContext';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import Footer from '@/components/Footer';

const sansFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const editorialFont = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-editorial',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#FAF8F5',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'Pandalé | Kolkata Durga Puja Pandal & Metro Navigation Guide',
  description:
    'Discover Kolkata’s most iconic 2026 Durga Puja pandals, real-time metro walking routes, latest authorized Instagram photos, exact Google Maps locations, and personal Puja itinerary planner on Pandalé.',
  keywords: [
    'Pandalé',
    'Pandalé 2026',
    'Kolkata Durga Puja 2026',
    'Kolkata Metro pandal guide',
    'Durga Puja route planner',
    'Bagbazar Sarbojanin',
    'Sree Bhumi 2026',
    'Maddox Square',
    'College Square',
    'Suruchi Sangha',
    'North Kolkata Pujo',
    'South Kolkata Pujo'
  ],
  authors: [{ name: 'Pandalé Kolkata' }],
  icons: {
    icon: '/brand/pandale-icon.png',
    apple: '/brand/pandale-icon.png',
  },
  openGraph: {
    title: 'Pandalé — Kolkata Durga Puja & Metro Guide',
    description: 'The definitive companion for exploring Kolkata Durga Puja 2026 by Metro with exact Google Maps coordinates.',
    url: 'https://pandale.in',
    siteName: 'Pandalé',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Kolkata Durga Puja Pandal Illumination 2026'
      }
    ],
    locale: 'en_IN',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pujo 2026 — Kolkata Durga Puja & Metro Guide',
    description: 'Find iconic pandals, nearest Metro exits, latest photos, and open exact Google Maps navigation.'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sansFont.variable} ${editorialFont.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#181513] selection:bg-[#D43827]/20 selection:text-[#D43827]">
        <WishlistProvider>
          <Header />
          <main className="flex-1 pb-16 md:pb-0">{children}</main>
          <Footer />
          <BottomNav />
        </WishlistProvider>
      </body>
    </html>
  );
}
