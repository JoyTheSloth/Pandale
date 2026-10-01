'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  isBengali: boolean;
  t: (key: string, fallback?: string) => string;
}

const translations: Record<string, { en: string; bn: string }> = {
  // Navigation & Header
  'guide.title': { en: 'Kolkata Pujo Guide', bn: 'কলকাতা পুজো গাইড' },
  'nav.home': { en: 'Home', bn: 'হোম' },
  'nav.pandals': { en: 'Pandals', bn: 'প্যান্ডেল' },
  'nav.metro': { en: 'Metro Route', bn: 'মেট্রো রুট' },
  'nav.wishlist': { en: 'Wishlist', bn: 'পছন্দ' },

  // Metro Lines
  'metro.blue': { en: 'Blue Line', bn: 'ব্লু লাইন' },
  'metro.green': { en: 'Green Line', bn: 'গ্রিন লাইন' },
  'metro.orange': { en: 'Orange Line', bn: 'অরেঞ্জ লাইন' },
  'metro.purple': { en: 'Purple Line', bn: 'পার্পল লাইন' },
  'metro.pandals': { en: 'Pandals', bn: 'প্যান্ডেল' },
  'metro.stations': { en: 'Stations', bn: 'স্টেশন' },
  'metro.viewPandals': { en: 'View Pandals', bn: 'প্যান্ডেল দেখুন' },
  'metro.hidePandals': { en: 'Hide Pandals', bn: 'প্যান্ডেল লুকান' },
  'metro.allStations': { en: 'All Stations', bn: 'সমস্ত স্টেশন' },
  'metro.filterStations': { en: 'Filter Stations', bn: 'স্টেশন ফিল্টার' },
  'metro.activeLine': { en: 'Active Line', bn: 'নির্বাচিত লাইন' },

  // Transit & Walking
  'transit.nearestMetro': { en: 'Nearest Metro Station', bn: 'নিকটবর্তী মেট্রো স্টেশন' },
  'transit.walking': { en: 'Walking', bn: 'হাঁটার পথ' },
  'transit.time': { en: 'Time', bn: 'সময়' },
  'transit.steps': { en: 'Steps', bn: 'পদক্ষেপ' },
  'transit.distance': { en: 'Distance', bn: 'দূরত্ব' },
  'transit.min': { en: 'min', bn: 'মিনিট' },
  'transit.walkPath': { en: 'Walk Path', bn: 'হাঁটার পথ' },
  'transit.explorePandal': { en: 'Explore Pandal', bn: 'প্যান্ডেল দেখুন' },
  'transit.details': { en: 'View Details', bn: 'বিস্তারিত দেখুন' },

  // Theme & General
  'theme.architecture': { en: 'Theme & Architecture', bn: 'ভাবনা ও শিল্পকর্ম' },
  'crowd.status': { en: 'Crowd', bn: 'ভিড়' },
  'search.placeholder': { en: 'Search pandals, artists, locations...', bn: 'প্যান্ডেল, শিল্পী, এলাকা খুঁজুন...' },
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  toggleLanguage: () => {},
  setLanguage: () => {},
  isBengali: false,
  t: (key: string, fallback?: string) => fallback || key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('pandale-language') as Language | null;
    if (saved === 'en' || saved === 'bn') {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('pandale-language', lang);
  };

  const toggleLanguage = () => {
    const next = language === 'en' ? 'bn' : 'en';
    setLanguage(next);
  };

  const t = (key: string, fallback?: string): string => {
    if (translations[key]) {
      return translations[key][language] || fallback || key;
    }
    return fallback || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        toggleLanguage,
        setLanguage,
        isBengali: language === 'bn',
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
