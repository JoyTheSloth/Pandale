'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';
import { useLanguage } from '@/context/LanguageContext';
import { PANDALS_DATA } from '@/data/pandals';
import PandalCard from '@/components/PandalCard';
import { 
  Heart, 
  Route, 
  Compass, 
  Sparkles
} from 'lucide-react';

export default function WishlistPage() {
  const { wishlist, isLoaded } = useWishlist();
  const { language } = useLanguage();
  const isBn = language === 'bn';

  // Matched pandals
  const savedPandals = useMemo(() => {
    return PANDALS_DATA.filter((p) => wishlist.includes(p.id));
  }, [wishlist]);

  // Loading skeleton while reading localStorage on initial mount
  if (!isLoaded) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8 animate-pulse">
        <div className="space-y-3 pb-6 border-b border-[#E9E2D8] dark:border-white/10">
          <div className="w-32 h-6 bg-rose-100 dark:bg-rose-950/40 rounded-full" />
          <div className="w-64 h-10 bg-stone-200 dark:bg-stone-800 rounded-2xl" />
          <div className="w-48 h-4 bg-stone-200 dark:bg-stone-800 rounded-lg" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-44 bg-stone-100 dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-white/10" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E9E2D8] dark:border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 text-xs font-mono mb-2 border border-rose-200 dark:border-rose-900/50">
            <Heart className="w-3.5 h-3.5 fill-current text-[#D8261C]" />
            <span>{isBn ? 'ব্যক্তিগত সংগ্রহ' : 'Personal Collection'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-editorial text-[#181513] dark:text-[#FAF8F5]">
            {isBn ? 'আমার পুজো উইশলিস্ট' : 'My Pujo Wishlist'}
          </h1>
          <p className="text-xs sm:text-sm text-[#5C554E] dark:text-stone-400 mt-1">
            {savedPandals.length}{' '}
            {savedPandals.length === 1
              ? isBn ? 'টি প্যান্ডেল সংরক্ষিত' : 'pandal saved for your 2026 exploration'
              : isBn ? 'টি প্যান্ডেল সংরক্ষিত' : 'pandals saved for your 2026 exploration'}
          </p>
        </div>

        {savedPandals.length > 0 && (
          <div className="flex items-center gap-3">
            <Link
              href="/planner"
              className="px-5 py-2.5 rounded-xl bg-[#D43827] hover:bg-[#B52819] text-white text-xs font-bold flex items-center gap-2 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 group"
            >
              <Route className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" />
              <span>{isBn ? 'রুট প্ল্যানারে রূপান্তর করুন' : 'Turn into Route Itinerary'}</span>
            </Link>
          </div>
        )}
      </div>

      {/* Saved Pandals List */}
      {savedPandals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
          {savedPandals.map((pandal) => (
            <PandalCard key={pandal.id} pandal={pandal} />
          ))}
        </div>
      ) : (
        <div className="max-w-md mx-auto text-center py-20 px-4 space-y-4 bg-white dark:bg-[#1A1218] rounded-3xl border border-[#E9E2D8] dark:border-white/10 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950/40 text-[#D8261C] flex items-center justify-center mx-auto border border-rose-200 dark:border-rose-900/40">
            <Heart className="w-8 h-8 fill-rose-100 dark:fill-rose-900" />
          </div>
          <h2 className="text-xl font-bold font-editorial text-[#1C1917] dark:text-white">
            {isBn ? 'আপনার উইশলিস্ট খালি' : 'Your wishlist is empty'}
          </h2>
          <p className="text-xs text-[#57534E] dark:text-stone-400 leading-relaxed">
            {isBn
              ? 'যেকোনো প্যান্ডেল কার্ডের হার্ট আইকনে (♡) ট্যাপ করে আপনার পছন্দের প্যান্ডেলগুলি সংরক্ষণ করুন।'
              : 'Click the heart icon (♡) on any pandal card or detail page to curate your personal Kolkata Pujo 2026 tour.'}
          </p>
          <div className="pt-2">
            <Link
              href="/pandals"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#D8261C] text-white text-xs font-bold hover:bg-[#B91C1C] hover:scale-105 active:scale-95 transition-all duration-200 shadow-md group"
            >
              <Compass className="w-4 h-4 text-amber-200 group-hover:rotate-45 transition-transform duration-300" />
              <span>{isBn ? 'প্যান্ডেল আবিষ্কার করুন' : 'Discover Pandals'}</span>
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
