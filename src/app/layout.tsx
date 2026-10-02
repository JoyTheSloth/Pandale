import type { Metadata, Viewport } from 'next';
import Image from 'next/image';
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { LocationProvider } from '@/context/LocationContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import CreatorConnectModal from '@/components/CreatorConnectModal';
import InstallPrompt from '@/components/InstallPrompt';

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
    icon: [
      { url: '/icons/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/icons/apple-touch-icon.png',
    shortcut: '/icons/icon-192x192.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'Pandalé — Kolkata Durga Puja & Metro Guide',
    description: 'The definitive companion for exploring Kolkata Durga Puja 2026 by Metro with exact Google Maps coordinates.',
    url: 'https://pandale.in',
    siteName: 'Pandalé',
    images: [
      {
        url: 'https://pandalekolkata.vercel.app/brand/og-image.jpg',
        width: 1280,
        height: 720,
        alt: 'Pandalé — Kolkata Durga Puja & Metro Guide 2026'
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
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth" className={`${sansFont.variable} ${editorialFont.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col relative text-[#181513] dark:text-[#FAF8F5] selection:bg-[#D43827]/20 selection:text-[#D43827]">
        {/* Fixed Festival Background Layer for all pages & rest of home page */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
          <Image
            src="/brand/page-bg.jpg"
            alt="Pandalé Kolkata Durga Puja Background"
            fill
            priority
            unoptimized
            quality={100}
            className="object-cover object-top sm:object-center select-none"
            sizes="100vw"
          />
          {/* Light Mode Ambiance: Gentle wash preserving the warm cream parchment & Durga artwork */}
          <div className="absolute inset-0 bg-[#FFFDF9]/20 dark:hidden pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFFDF9]/10 to-[#FFFDF9]/40 dark:hidden pointer-events-none" />

          {/* Dark Mode Ambiance: Deep royal crimson atmosphere where Maa Durga, dhak, bells & Howrah Bridge glow */}
          <div className="hidden dark:block absolute inset-0 bg-[#0C0206]/70" />
          <div className="hidden dark:block absolute inset-0 bg-gradient-to-b from-transparent via-[#0C0206]/40 to-[#0C0206]/90 pointer-events-none" />
        </div>

        <ThemeProvider>
          <LanguageProvider>
            <WishlistProvider>
              <LocationProvider>
                <div className="relative flex min-h-screen flex-col">
                  <Header />
                  <main className="flex-1 pb-16 md:pb-0">{children}</main>
                  <Footer />
                </div>
                <CreatorConnectModal />
                <BottomNav />
                <InstallPrompt />
              </LocationProvider>
            </WishlistProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
