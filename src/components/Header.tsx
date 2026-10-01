'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { Sun, Moon, Languages } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, toggleLanguage } = useLanguage();

  return (
    <header
      className={`z-40 w-full pt-4 sm:pt-6 pb-2 px-4 sm:px-8 pointer-events-none transition-all duration-200 ${
        pathname === '/' ? 'fixed top-0 left-0 right-0' : 'sticky top-0'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left: Floating Brand Pill Badge */}
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

        {/* Right Action Controls: Theme Toggle & English / Bengali Toggle */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          
          {/* Theme Toggle Button (Light & Dark Mode) */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            className={`pointer-events-auto w-11 h-11 sm:w-12 sm:h-12 rounded-full shadow-lg flex items-center justify-center active:scale-95 transition-all group ${
              pathname === '/'
                ? 'bg-black/45 backdrop-blur-md border border-white/20 text-white hover:border-white/40'
                : 'bg-white dark:bg-[#1C1917] border border-stone-200 dark:border-white/20 text-stone-800 dark:text-white hover:border-[#D8261C]'
            }`}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-300 transition-transform group-hover:rotate-45" />
            ) : (
              <Moon className="w-5 h-5 text-amber-500 transition-transform group-hover:-rotate-12" />
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
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
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
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
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
