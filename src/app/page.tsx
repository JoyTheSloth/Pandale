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
import SpotlightCarousel from '@/components/SpotlightCarousel';
import { useLanguage } from '@/context/LanguageContext';

export default function HomePage() {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  // Iconic Spotlight Pandals (Top Must Visit & Highest Trending)
  const iconicPandals = useMemo(() => {
    return PANDALS_DATA.filter((p) => p.tags.includes('Must Visit') || p.tags.includes('Trending'))
      .sort((a, b) => (b.trending_score || 0) - (a.trending_score || 0))
      .slice(0, 8);
  }, []);

  return (
    <div className="w-full flex flex-col overflow-hidden">
      
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
          src="/brand/hero-desktop-v2.jpg"
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

      {/* 1.5 MOVING MARQUEE TICKER BANNER — TOTAL PANDALS IN THE LIST */}
      <Link
        href="/pandals"
        className="w-full bg-gradient-to-r from-[#140207] via-[#2A0510] to-[#140207] border-y border-amber-500/25 py-3 sm:py-3.5 overflow-hidden flex items-center relative group select-none shadow-md hover:border-amber-400/50 transition-colors z-10"
        title={isBn ? 'সম্পূর্ণ মণ্ডপ তালিকা দেখুন' : 'View all pandals in the list'}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 sm:gap-12 text-xs sm:text-sm font-medium tracking-wide">
          {[1, 2].map((groupKey) => (
            <div key={groupKey} className="flex items-center gap-8 sm:gap-12 shrink-0">
              <span className="flex items-center gap-2 text-white font-semibold">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D8261C]"></span>
                </span>
                <span className="text-amber-300 font-bold font-mono text-sm sm:text-base">
                  {PANDALS_DATA.length}
                </span>
                <span className="text-white/95 uppercase tracking-wider text-[11px] sm:text-xs font-semibold">
                  {isBn ? 'টি মণ্ডপ বর্তমানে তালিকায় অন্তর্ভুক্ত' : 'Total Pandals in the List Right Now'}
                </span>
              </span>

              <span className="text-amber-500/60 text-xs">✦</span>

              <span className="flex items-center gap-2 text-white/80 text-[11px] sm:text-xs font-mono uppercase tracking-wider">
                <span>🚇</span>
                <span>{isBn ? 'মেট্রো স্টেশন ও হাঁটার রুট ম্যাপিং' : 'Full Metro Stations & Walking Routes'}</span>
              </span>

              <span className="text-amber-500/60 text-xs">✦</span>

              <span className="flex items-center gap-2 text-amber-200 text-[11px] sm:text-xs font-semibold uppercase tracking-wider">
                <span>🌺</span>
                <span>{isBn ? 'দুর্গাপূজা ২০২৬ সম্পূর্ণ গাইড' : 'Durga Puja 2026 Live Guide'}</span>
              </span>

              <span className="text-amber-500/60 text-xs">✦</span>

              <span className="flex items-center gap-2 text-white/80 text-[11px] sm:text-xs font-mono uppercase tracking-wider">
                <span>📍</span>
                <span>{isBn ? 'উত্তর · দক্ষিণ · মধ্য · পূর্ব · এয়ারপোর্ট করিডোর' : 'North · South · Central · East · Airport Corridor'}</span>
              </span>

              <span className="text-amber-500/60 text-xs">✦</span>

              <span className="flex items-center gap-2 text-white/80 text-[11px] sm:text-xs font-mono uppercase tracking-wider">
                <span>🥁</span>
                <span>{isBn ? 'লাইভ ভিড় এবং আরতির সময়সূচী' : 'Live Crowd Status & Timings'}</span>
              </span>

              <span className="text-amber-500/60 text-xs">✦</span>
            </div>
          ))}
        </div>
      </Link>

      <div className="w-full flex flex-col gap-16 md:gap-24 pt-10 md:pt-14">
        {/* 2. EXPLORE BY NEIGHBORHOODS (ARCHED DOME CARDS) */}
      <section id="explore-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full scroll-mt-20">
        {/* Centered Editorial Header with User Requested Caption */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          {/* Visible Caption Banner */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-900/40 text-[#D8261C] dark:text-amber-300 text-[11px] sm:text-xs md:text-sm font-editorial font-semibold shadow-xs mb-3 whitespace-nowrap">
            <span className="shrink-0">🥁🌺</span>
            <span>
              {isBn 
                ? '“পুজো এসে গেল... মা আসছেন! ❤️✨”' 
                : '“The wait is almost over... Durga Puja is here! ❤️✨”'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1917] dark:text-[#FAF8F5] leading-[1.15]">
            {isBn ? 'প্যান্ডেল হপিং' : 'Explore Famous'} <br />
            <span className="font-editorial italic font-normal text-4xl sm:text-6xl text-[#1C1917] dark:text-white">
              {isBn ? 'পুজো পরিক্রমা' : 'Pandal Hopping'}
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-[#78716C] dark:text-[#A8A29E] mt-3 max-w-lg mx-auto">
            {isBn 
              ? 'যেকোনো সার্কিটে ক্লিক করে দেখে নিন প্রতিটি স্টেশন, বিখ্যাত প্যান্ডেল এবং তাদের মধ্যে হাঁটার দূরত্ব।'
              : 'Tap any card to view the famous pandals, their nearest metro stations, and exact walking distances between each stop.'}
          </p>
        </div>

        {/* Arched Dome Cards Grid & Horizontal Snap on Mobile */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory px-2 sm:px-0 pb-4">
          {[
            {
              id: 'bonedi',
              title: isBn ? 'বনেদি বাড়ি' : 'Bonedi Bari',
              subtitle: isBn ? '৯টি ঐতিহাসিক পুজো • শোভাবাজার ও জোড়াসাঁকো' : '9 Historic Pujas • Centuries of Aristocratic Heritage',
              metro: 'Blue Line (Sovabazar / Girish Park)',
              pandalsCount: isBn ? '৯টি বনেদি পুজো' : '9 Aristocratic Pujas',
              landmarks: 'Sovabazar • Daw Bari • Khelat Ghosh • Mitra Bari',
              image: '/pandals/sovabazar-rajbari.jpg',
            },
            {
              id: 'north',
              title: isBn ? 'উত্তর সার্কিট' : 'North Zone',
              subtitle: isBn ? '১৮টি বিখ্যাত পুজো • শ্যামবাজার ও শোভাবাজার' : '18 Famous Pandals • Shyambazar & Shovabazar Hub',
              metro: 'Blue Line (Shyambazar / Shovabazar)',
              pandalsCount: isBn ? '১৮টি বিখ্যাত প্যান্ডেল' : '18 Famous Pandals',
              landmarks: 'Bagbazar • Kumartuli • Hatibagan • Kashi Bose',
              image: '/brand/zone-north-durga.jpg',
            },
            {
              id: 'south',
              title: isBn ? 'দক্ষিণ সার্কিট' : 'South Zone',
              subtitle: isBn ? '১৫টি বিখ্যাত পুজো • কালীঘাট ও গড়িয়াহাট' : '15 Famous Pandals • Kalighat & Gariahat Hub',
              metro: 'Blue Line (Kalighat / Jatin Das Park)',
              pandalsCount: isBn ? '১৫টি বিখ্যাত প্যান্ডেল' : '15 Famous Pandals',
              landmarks: 'Ekdalia • Suruchi • Tridhara • Maddox',
              image: '/brand/zone-south-durga.jpg',
            },
            {
              id: 'central',
              title: isBn ? 'মধ্য সার্কিট' : 'Central Zone',
              subtitle: isBn ? '৭টি বিখ্যাত পুজো • সেন্ট্রাল ও এমজি রোড' : '7 Famous Pandals • Central & MG Road Hub',
              metro: 'Blue & Green (Central / Sealdah)',
              pandalsCount: isBn ? '৭টি বিখ্যাত প্যান্ডেল' : '7 Famous Pandals',
              landmarks: 'Santosh Mitra • College Sq • Md. Ali Park',
              image: '/brand/zone-central-durga.jpg',
            },
            {
              id: 'east',
              title: isBn ? 'পূর্ব সার্কিট' : 'East Zone',
              subtitle: isBn ? '৮টি বিখ্যাত পুজো • সল্টলেক ও টেক করিডোর' : '8 Famous Pandals • Salt Lake & Tech Corridors',
              metro: 'Green Line (Sector V / Karunamoyee)',
              pandalsCount: isBn ? '৮টি বিখ্যাত প্যান্ডেল' : '8 Famous Pandals',
              landmarks: 'Salt Lake FD Block • BJ Block • Phoolbagan',
              image: '/brand/zone-east-durga.jpg',
            }
          ].map((zone) => (
            <Link
              key={zone.id}
              href={`/hopping?zone=${zone.id}`}
              className="text-left cursor-pointer group min-w-[280px] sm:min-w-0 flex-1 snap-center bg-white dark:bg-[#1A1210] rounded-[2.5rem] border border-[#E7E5E4] dark:border-white/8 p-5 sm:p-6 shadow-luxe shadow-luxe-hover hover:border-[#F59E0B] dark:hover:border-[#F59E0B]/40 hover:-translate-y-2 hover:shadow-2xl active:scale-[0.98] transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-end mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#FAF8F5] group-hover:bg-[#D8261C] group-hover:text-white text-[#1C1917] flex items-center justify-center group-hover:scale-115 transition-all duration-300 shadow-2xs">
                    <ArrowRight className="w-4 h-4 -rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </div>
                </div>

                {/* Centered Neighborhood Title */}
                <h3 className="text-2xl sm:text-3xl font-bold font-editorial text-center text-stone-900 dark:text-white tracking-tight group-hover:text-[#D8261C] transition-colors duration-200">
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
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-112"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0C0A09] via-white/20 dark:via-black/10 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-300" />

                <div className="absolute bottom-3 left-3 right-3 text-center">
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold bg-white/95 backdrop-blur-md text-amber-900 border border-[#FED7AA] shadow-xs group-hover:scale-105 group-hover:shadow-md transition-all duration-300">
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
                  <Train className="w-3 h-3 text-blue-600 group-hover:translate-x-0.5 transition-transform" />
                  <span className="truncate">{zone.metro}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. IN THE SPOTLIGHT — AUTOMATIC MOVING COVER FLOW CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-3 border-b border-[#E9E2D8] dark:border-white/10">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#D43827] font-semibold flex items-center gap-1.5">
              <span>✦</span>
              <span>{isBn ? 'আলোর কেন্দ্রবিন্দুতে' : 'In the Spotlight'}</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-[#181513] dark:text-[#FAF8F5] mt-1">
              {isBn ? '২০২৬ সালের সেরা মণ্ডপ' : 'Iconic Pandals of 2026'}
            </h2>
          </div>
          <Link
            href="/pandals?mustVisit=true"
            className="text-xs font-bold text-[#D8261C] dark:text-amber-400 group flex items-center gap-1 mt-2 sm:mt-0 hover:gap-2 transition-all duration-200"
          >
            <span className="group-hover:underline">{isBn ? 'সব সেরা প্যান্ডেল দেখুন' : 'See All Must-Visit Pandals'}</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
          </Link>
        </div>

        {/* The Automatic Moving Spotlight Carousel */}
        <SpotlightCarousel pandals={iconicPandals} />
      </section>

      </div>
    </div>
  );
}
