'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, 
  ChevronRight, 
  ChevronDown,
  Train 
} from 'lucide-react';
import { PANDALS_DATA } from '@/data/pandals';
import PandalCard from '@/components/PandalCard';
import { useLanguage } from '@/context/LanguageContext';

export default function HomePage() {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  // Featured Pandals (Must Visit)
  const featuredPandals = useMemo(() => {
    return PANDALS_DATA.filter((p) => p.tags.includes('Must Visit')).slice(0, 6);
  }, []);

  return (
    <div className="w-full flex flex-col gap-16 md:gap-24 overflow-hidden">
      
      {/* 1. HERO SECTION — RESPONSIVE: mobile 9:16 poster / desktop 16:9 full-bleed */}
      <section className="relative w-full h-[100dvh] overflow-hidden bg-[#0C0108]">
        {/* MOBILE: portrait 9:16 artwork — shown only on small screens */}
        <Image
          src="/brand/hero-poster.jpg"
          alt="Pandalé — Kolkata Durga Puja & Metro Guide"
          fill
          priority
          unoptimized
          quality={100}
          className="object-contain object-center md:hidden"
          sizes="100vw"
        />

        {/* DESKTOP: 16:9 landscape hero — shown md and above */}
        <Image
          src="/brand/hero-desktop.jpg"
          alt="Pandalé — Kolkata Durga Puja & Metro Guide 2026"
          fill
          priority
          unoptimized
          quality={100}
          className="hidden md:block object-cover object-center"
          sizes="100vw"
        />

        {/* Subtle bottom vignette */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

        {/* Desktop-only: bottom-left micro caption */}
        <div className="absolute bottom-8 left-8 hidden md:flex items-center gap-2 text-white/70 text-xs font-mono backdrop-blur-sm bg-black/20 px-3 py-1.5 rounded-full border border-white/10">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
          {isBn ? 'দুর্গাপূজা ২০২৬ · কলকাতা' : 'Durga Puja 2026 · Kolkata'}
        </div>

        {/* Scroll Down Mouse Indicator — Lifted higher above bottom edge */}
        <button
          type="button"
          onClick={() => {
            const nextSec = document.getElementById('explore-section');
            if (nextSec) {
              nextSec.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="absolute bottom-12 sm:bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 cursor-pointer group select-none transition-all active:scale-95"
          aria-label="Scroll down to explore pandals"
        >
          {/* Animated Mouse Icon */}
          <div className="w-5 h-8 sm:w-6 sm:h-9 rounded-full border-2 border-white/70 group-hover:border-amber-400 flex items-start justify-center p-1.5 backdrop-blur-xs transition-colors shadow-lg shadow-black/60">
            <span className="w-1 h-2 rounded-full bg-white group-hover:bg-amber-400 animate-bounce transition-colors" />
          </div>

          {/* Text & Micro Chevron */}
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-white/80 group-hover:text-amber-400 transition-colors drop-shadow-md flex items-center gap-1 font-semibold">
            <span>{isBn ? 'স্ক্রোল করুন' : 'Scroll Down'}</span>
            <ChevronDown className="w-3 h-3 animate-pulse" />
          </span>
        </button>
      </section>

      {/* 2. EXPLORE BY NEIGHBORHOODS (ARCHED DOME CARDS) */}
      <section id="explore-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full scroll-mt-20">
        {/* Centered Editorial Header */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#D8261C] dark:text-amber-400 font-bold block mb-2">
            {isBn ? 'কলকাতা পুজো সার্কিট' : 'Kolkata Pujo Circuits'}
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1917] dark:text-[#FAF8F5] leading-[1.15]">
            {isBn ? 'অঞ্চল অনুযায়ী' : 'Explore by'} <br />
            <span className="font-editorial italic font-normal text-4xl sm:text-6xl text-[#1C1917] dark:text-white">
              {isBn ? 'পরিক্রমা' : 'Neighborhoods'}
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-[#78716C] dark:text-[#A8A29E] mt-3 max-w-md mx-auto">
            {isBn 
              ? 'ঐতিহ্য, থিম এবং মেট্রো করিডোর অনুসারে কলকাতার বিশিষ্ট পুজো অঞ্চলগুলো ঘুরে দেখুন।'
              : 'Swipe through Kolkata’s iconic puja zones, each defined by distinct traditions, heritage, and transit corridors.'}
          </p>
        </div>

        {/* Arched Dome Cards Grid & Horizontal Snap on Mobile */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory px-2 sm:px-0 pb-4">
          {[
            {
              id: 'north',
              title: isBn ? 'উত্তর কলকাতা' : 'North Kolkata',
              subtitle: isBn ? 'ঐতিহ্য, সাবেকিয়ানা ও গঙ্গার ঘাট' : 'Heritage, Sabeki & River Ghats',
              metro: 'Blue Line (Shyambazar)',
              pandalsCount: isBn ? '৬টি আইকনিক প্যান্ডেল' : '6 Iconic Pandals',
              landmarks: 'Bagbazar • Kumartuli • Sovabazar',
              zoneQuery: 'North+Kolkata',
              image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=700&q=80',
            },
            {
              id: 'south',
              title: isBn ? 'দক্ষিণ কলকাতা' : 'South Kolkata',
              subtitle: isBn ? 'সেরা থিম পুজো ও জমজমাট আড্ডা' : 'Theme Powerhouses & Night Adda',
              metro: 'Blue Line (Kalighat)',
              pandalsCount: isBn ? '৬টি আইকনিক প্যান্ডেল' : '6 Iconic Pandals',
              landmarks: 'Maddox Square • Suruchi • Tridhara',
              zoneQuery: 'South+Kolkata',
              image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=700&q=80',
            },
            {
              id: 'central',
              title: isBn ? 'মধ্য কলকাতা' : 'Central Kolkata',
              subtitle: isBn ? 'আলোর রোশনাই ও সাবেক পুজো' : 'Lakeside Lights & Heritage Squares',
              metro: 'Blue & Green (Central / MG Road)',
              pandalsCount: isBn ? '৩টি আইকনিক প্যান্ডেল' : '3 Iconic Pandals',
              landmarks: 'College Square • Santosh Mitra',
              zoneQuery: 'Central+Kolkata',
              image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=700&q=80',
            },
            {
              id: 'east',
              title: isBn ? 'পূর্ব কলকাতা' : 'East Kolkata',
              subtitle: isBn ? 'সল্টলেক ও টেক করিডোর' : 'Salt Lake & Tech Corridors',
              metro: 'Green Line (Sector V / Karunamoyee)',
              pandalsCount: isBn ? '২টি আইকনিক প্যান্ডেল' : '2 Iconic Pandals',
              landmarks: 'Salt Lake FD Block • Sree Bhumi',
              zoneQuery: 'East+Kolkata',
              image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=700&q=80',
            }
          ].map((zone) => (
            <Link
              key={zone.id}
              href={`/pandals?zone=${zone.zoneQuery}`}
              className="group min-w-[280px] sm:min-w-0 flex-1 snap-center bg-white dark:bg-[#1A1210] rounded-[2.5rem] border border-[#E7E5E4] dark:border-white/8 p-5 sm:p-6 shadow-luxe shadow-luxe-hover hover:border-[#F59E0B] dark:hover:border-[#F59E0B]/40 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Card Header: Arrow ↗ top-right & Centered Title */}
              <div>
                <div className="flex items-center justify-end mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#FAF8F5] group-hover:bg-[#D8261C] group-hover:text-white text-[#1C1917] flex items-center justify-center transition-all duration-300 shadow-2xs">
                    <ArrowRight className="w-4 h-4 -rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                {/* Centered Neighborhood Title */}
                <h3 className="text-2xl sm:text-3xl font-bold font-editorial text-center text-stone-900 dark:text-white tracking-tight group-hover:text-[#D8261C] transition-colors">
                  {zone.title}
                </h3>
                <p className="text-[11px] text-stone-600 dark:text-stone-400 text-center mt-1 font-semibold">
                  {zone.subtitle}
                </p>
              </div>

              {/* The Iconic Arched Dome Artwork / Photo Window */}
              <div className="relative w-full aspect-[4/5] rounded-t-[5.5rem] sm:rounded-t-[6.5rem] overflow-hidden bg-gradient-to-b from-[#FEF3C7] dark:from-[#1E1508] via-[#FFFBEB] dark:via-[#120D0B] to-[#FEF2F2] dark:to-[#0C0A09] border border-[#FED7AA]/60 dark:border-white/8 mt-5 mb-4 shadow-inner">
                <Image
                  src={zone.image}
                  alt={zone.title}
                  fill
                  sizes="(max-width: 768px) 80vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0C0A09] via-white/20 dark:via-black/10 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />

                <div className="absolute bottom-3 left-3 right-3 text-center">
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold bg-white/95 backdrop-blur-md text-amber-900 border border-[#FED7AA] shadow-xs">
                    {zone.pandalsCount}
                  </span>
                </div>
              </div>

              {/* Card Footer Details */}
              <div className="pt-2 border-t border-[#F5F5F4] dark:border-white/8 text-center space-y-1">
                <div className="text-[11px] font-semibold text-stone-900 dark:text-stone-200 truncate">
                  {zone.landmarks}
                </div>
                <div className="text-[10px] text-stone-600 dark:text-stone-400 flex items-center justify-center gap-1 font-medium">
                  <Train className="w-3 h-3 text-blue-600" />
                  <span className="truncate">{zone.metro}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. FEATURED MUST-VISIT PANDALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-[#E9E2D8] dark:border-white/10">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#D43827] font-semibold">
              {isBn ? 'বিশেষ নির্বাচন' : 'Curated Selection'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-[#181513] dark:text-[#FAF8F5] mt-1">
              {isBn ? '২০২৬ সালের সেরা প্যান্ডেল' : 'Iconic Pandals of 2026'}
            </h2>
          </div>
          <Link
            href="/pandals?mustVisit=true"
            className="text-xs font-semibold text-[#D43827] hover:underline flex items-center gap-1 mt-2 sm:mt-0"
          >
            <span>{isBn ? 'সব সেরা প্যান্ডেল দেখুন' : 'See All Must-Visit Pandals'}</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPandals.map((pandal, idx) => (
            <PandalCard key={pandal.id} pandal={pandal} priority={idx < 3} />
          ))}
        </div>
      </section>

    </div>
  );
}
