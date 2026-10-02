'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useWishlist } from '@/context/WishlistContext';
import { Sun, Moon, Languages, Heart, MapPin, ChevronDown, Loader2 } from 'lucide-react';
import { useLocation } from '@/context/LocationContext';

export default function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, toggleLanguage } = useLanguage();
  const { count } = useWishlist();
  const { location, fetchCurrentLocation } = useLocation();

  const isPandalsSection = pathname === '/pandals' || pathname.startsWith('/pandal');

  return (
    <header
      className={`z-40 w-full pt-4 sm:pt-6 pb-2 px-4 sm:px-8 pointer-events-none transition-all duration-200 ${
        pathname === '/' ? 'fixed top-0 left-0 right-0' : 'sticky top-0'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left: Brand Pill on Home vs Zomato-style Interactive Location on Pandals */}
        {isPandalsSection ? (
          <button
            type="button"
            onClick={fetchCurrentLocation}
            title={language === 'bn' ? 'বর্তমান অবস্থান নির্ণয় করতে ট্যাপ করুন' : 'Tap to ping & detect your live GPS location'}
            className="pointer-events-auto inline-flex items-center gap-2 md:gap-3 py-1 px-1 -ml-1 text-left group hover:opacity-90 active:scale-95 transition-all cursor-pointer select-none"
          >
            {/* Zomato-style MapPin / Loading Spinner */}
            <div className="relative shrink-0 flex items-center justify-center">
              {location.status === 'loading' ? (
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-red-100 dark:bg-red-950/60 flex items-center justify-center">
                  <Loader2 className="w-4 h-4 md:w-5 md:h-5 text-[#D8261C] animate-spin" />
                </div>
              ) : (
                <div className="relative">
                  <MapPin className="w-5 h-5 md:w-7 md:h-7 text-[#D8261C] fill-[#D8261C]/20 stroke-[2.2] group-hover:scale-110 group-hover:-translate-y-0.5 transition-transform duration-200" />
                  <span className={`absolute -top-0.5 -right-0.5 w-2 h-2 md:w-2.5 md:h-2.5 rounded-full ring-2 ring-white dark:ring-stone-900 ${
                    location.isLiveGps ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'
                  }`} />
                </div>
              )}
            </div>

            <div className="flex flex-col min-w-0">
              {/* Primary Location Name with Zomato Chevron */}
              <div className="flex items-center gap-1 leading-tight">
                <span className="text-base md:text-xl font-bold text-stone-900 dark:text-white tracking-tight">
                  {location.status === 'loading' 
                    ? (language === 'bn' ? 'অবস্থান খোঁজা হচ্ছে...' : 'Pinging location...') 
                    : location.areaName || (language === 'bn' ? 'কলকাতা' : 'Kolkata')}
                </span>
                <ChevronDown className="w-3.5 h-3.5 md:w-4 md:h-4 text-stone-400 group-hover:text-stone-700 dark:group-hover:text-stone-200 group-hover:translate-y-0.5 transition-all shrink-0" />
              </div>

              {/* Subtitle: Suburb or GPS hint */}
              <span className="text-[10.5px] md:text-xs text-stone-500 dark:text-stone-400 font-medium leading-none mt-0.5 truncate max-w-[190px] md:max-w-sm">
                {location.status === 'loading'
                  ? (language === 'bn' ? 'জিপিএস সংযোগ করা হচ্ছে...' : 'Pinging GPS device...')
                  : location.status === 'error'
                    ? (language === 'bn' ? 'জিপিএস অক্ষম · আবার চেষ্টা করুন' : 'GPS off · Tap to ping')
                    : location.isLiveGps
                      ? `${location.suburb}`
                      : (language === 'bn' ? 'বর্তমান অবস্থান খুঁজতে ট্যাপ করুন 📍' : 'Tap to ping live location 📍')}
              </span>
            </div>
          </button>
        ) : (
          <Link 
            href="/" 
            className={`pointer-events-auto inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-1.5 rounded-full shadow-lg active:scale-95 transition-all group ${
              pathname === '/'
                ? 'bg-black/45 backdrop-blur-md border border-white/20 hover:border-white/40'
                : 'bg-white/95 dark:bg-[#1C1917]/95 backdrop-blur-md border border-stone-200 dark:border-white/20 hover:border-[#D8261C] dark:hover:border-amber-400'
            }`}
          >
            <Image
              src="/brand/pandale-icon.png"
              alt="Pandalé"
              width={28}
              height={28}
              className="w-7 h-7 object-contain rounded-lg shrink-0 group-hover:scale-105 transition-transform"
              priority
            />
            <div className="flex flex-col text-left">
              <span className={`text-base sm:text-lg font-bold font-editorial tracking-tight leading-tight ${
                pathname === '/' ? 'text-white' : 'text-[#1C1917] dark:text-[#FAF8F5]'
              }`}>
                Pandal<span className="text-[#D8261C]">é</span>
              </span>
              <span className={`text-[8px] font-mono tracking-widest uppercase leading-none mt-0.5 font-bold ${
                pathname === '/' ? 'text-[#E7E5E4]/80' : 'text-stone-600 dark:text-stone-400'
              }`}>
                {language === 'bn' ? 'কলকাতা পুজো গাইড' : 'Kolkata Pujo Guide'}
              </span>
            </div>
          </Link>
        )}

        {/* Right Action Controls: Wishlist, Theme Toggle & Language Toggle */}
        <div className="flex items-center gap-2 md:gap-3">
          
          {/* Wishlist Link Button with Live Count Badge */}
          <Link
            href="/wishlist"
            aria-label="View Wishlist"
            title="My Wishlist"
            className={`pointer-events-auto relative w-11 h-11 md:w-12 md:h-12 rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-85 transition-all duration-200 cursor-pointer group ${
              pathname === '/wishlist'
                ? 'bg-[#D8261C] text-white border border-amber-300'
                : pathname === '/'
                  ? 'bg-black/45 backdrop-blur-md border border-white/20 text-white hover:border-white/50 hover:bg-black/60'
                  : 'bg-white dark:bg-[#1C1917] border border-stone-200 dark:border-white/20 text-stone-800 dark:text-white hover:border-[#D8261C]'
            }`}
          >
            <Heart className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${pathname === '/wishlist' ? 'fill-current' : 'group-hover:text-[#D8261C]'}`} />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#D8261C] text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-md animate-in zoom-in border border-white dark:border-stone-900">
                {count}
              </span>
            )}
          </Link>
          
          {/* Theme Toggle Button (Light & Dark Mode) */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            className={`pointer-events-auto w-11 h-11 md:w-12 md:h-12 rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-85 transition-all duration-200 cursor-pointer group ${
              pathname === '/'
                ? 'bg-black/45 backdrop-blur-md border border-white/20 text-white hover:border-white/50 hover:bg-black/60'
                : 'bg-white dark:bg-[#1C1917] border border-stone-200 dark:border-white/20 text-stone-800 dark:text-white hover:border-[#D8261C]'
            }`}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-300 transition-transform duration-300 group-hover:rotate-90 group-hover:scale-115" />
            ) : (
              <Moon className="w-5 h-5 text-amber-500 transition-transform duration-300 group-hover:-rotate-25 group-hover:scale-115" />
            )}
          </button>

          {/* English / Bengali Language Toggle Button */}
          <div
            className={`pointer-events-auto flex items-center p-1 rounded-full shadow-lg transition-all ${
              pathname === '/'
                ? 'bg-black/45 backdrop-blur-md border border-white/20'
                : 'bg-white dark:bg-[#1C1917] border border-stone-200 dark:border-white/20'
            }`}
          >
            <button
              type="button"
              onClick={() => setLanguage('en')}
              aria-label="Switch language to English"
              title="English"
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-150 cursor-pointer hover:scale-105 active:scale-90 ${
                language === 'en'
                  ? 'bg-[#D8261C] text-white shadow-xs'
                  : pathname === '/'
                    ? 'text-white/80 hover:text-white'
                    : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage('bn')}
              aria-label="বাংলা ভাষায় পরিবর্তন করুন"
              title="বাংলা (Bengali)"
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-150 cursor-pointer hover:scale-105 active:scale-90 ${
                language === 'bn'
                  ? 'bg-[#D8261C] text-white shadow-xs'
                  : pathname === '/'
                    ? 'text-white/80 hover:text-white'
                    : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              বাং
            </button>
          </div>

        </div>

      </div>
    </header>
  );
}
