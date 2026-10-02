'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Train, 
  PhoneCall, 
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

export default function Footer() {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  return (
    <footer className="w-full relative bg-[#0A0207] text-stone-200 border-t border-rose-950/40 pb-32 md:pb-12 mt-20 sm:mt-32 lg:mt-40 transition-colors">
      
      {/* 1. Atmospheric Scenic Festival Backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <Image
          src="/brand/footer-bg.jpg"
          alt="Durga Puja Kolkata Sunset Ambiance"
          fill
          sizes="100vw"
          className="object-cover object-[center_35%] opacity-85 scale-102"
          priority={false}
        />
        {/* Subtle vignette keeping artwork vividly visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0207]/60 via-transparent to-[#0A0207]/75" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* 2. Top Row: Flatzy Sponsor Banner — Positioned halfway overlapping the top black edge */}
        <div className="-mt-[21.4%] mb-8 sm:mb-12 relative z-20">
          <a
            href="https://flatzy.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            title="Flat dhundh rahe ho? Visit Flatzy Kolkata"
            className="block relative w-full aspect-[1024/438] rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-amber-500/40 shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:border-amber-400/80 transition-all duration-300 group active:scale-[0.99]"
          >
            <Image
              src="/brand/flatzy-banner.png"
              alt="Flatzy — Flat dhundh rahe ho? Visit Flatzy"
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-102"
              priority
            />
            {/* Soft interactive hover sheen */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
            
            <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-md border border-white/20">
                <span>Visit Flatzy</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-amber-300" />
              </span>
            </div>
          </a>
        </div>

        {/* 3. Middle Multi-Column Hub */}
        <div className="space-y-10 pt-4">
          
          {/* Column 1: Brand & Manifesto — Centralized */}
          <div className="text-center space-y-3 max-w-lg mx-auto">
            <div className="flex items-center justify-center gap-3">
              <Image
                src="/brand/pandale-icon.png"
                alt="Pandalé"
                width={36}
                height={36}
                className="w-9 h-9 object-contain"
              />
              <span className="text-2xl sm:text-3xl font-bold font-editorial text-white tracking-tight">
                Pandal<span className="text-[#D8261C]">é</span> 2026
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-md mx-auto">
              {isBn 
                ? 'কলকাতা দুর্গাপূজার সম্পূর্ণ নির্দেশিকা — মেট্রো রুট, দূরত্ব, হাঁটার সময় ও ব্যক্তিগত ভ্রমণ পরিকল্পনা।'
                : 'The premier Kolkata Durga Puja & Metro transit companion, helping devotees and culture lovers navigate seamlessly.'}
            </p>
            <div className="inline-flex items-center justify-center gap-2 text-xs text-amber-400/90 font-mono pt-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isBn ? 'সিটি অফ জয় · শারদ উৎসব' : 'City of Joy · Sharad Utsav'}</span>
            </div>
          </div>

          {/* Columns 2 & 3: Side by Side on all screen sizes, cleanly left-aligned like before */}
          <div className="grid grid-cols-2 gap-6 sm:gap-12 max-w-2xl mx-auto">
            
            {/* Column 2: Explore by Neighborhoods */}
            <div className="space-y-3 text-left">
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#D8261C] dark:text-amber-400 font-bold">
                {isBn ? 'পুজো পরিক্রমা' : 'Puja Circuits'}
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-stone-300 font-medium">
                <li>
                  <Link href="/pandals?zone=North+Kolkata" className="hover:text-amber-400 transition-all duration-150 hover:translate-x-1 flex items-center justify-between group">
                    <span className="truncate">{isBn ? 'উত্তর কলকাতা ঐতিহ্য' : 'North Heritage'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-stone-500 shrink-0" />
                  </Link>
                </li>
                <li>
                  <Link href="/pandals?zone=South+Kolkata" className="hover:text-amber-400 transition-all duration-150 hover:translate-x-1 flex items-center justify-between group">
                    <span className="truncate">{isBn ? 'দক্ষিণ কলকাতা থিম' : 'South Theme Hubs'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-stone-500 shrink-0" />
                  </Link>
                </li>
                <li>
                  <Link href="/pandals?zone=Central+Kolkata" className="hover:text-amber-400 transition-all duration-150 hover:translate-x-1 flex items-center justify-between group">
                    <span className="truncate">{isBn ? 'মধ্য কলকাতা সাবেক' : 'Central Classics'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-stone-500 shrink-0" />
                  </Link>
                </li>
                <li>
                  <Link href="/pandals?zone=East+Kolkata" className="hover:text-amber-400 transition-all duration-150 hover:translate-x-1 flex items-center justify-between group">
                    <span className="truncate">{isBn ? 'সল্টলেক ও পূর্ব কলকাতা' : 'Salt Lake & East'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-stone-500 shrink-0" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Transit & Metro Corridors */}
            <div className="space-y-3 text-left">
              <h4 className="text-xs font-mono uppercase tracking-widest text-sky-400 font-bold">
                {isBn ? 'মেট্রো করিডোর' : 'Metro Lines'}
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-stone-300 font-medium">
                <li>
                  <Link href="/metro" className="hover:text-sky-300 transition-all duration-150 hover:translate-x-1 flex items-center gap-2 group">
                    <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 group-hover:scale-125 transition-transform" />
                    <span className="truncate">{isBn ? 'ব্লু লাইন (উত্তর-দক্ষিণ)' : 'Blue Line (North-South)'}</span>
                  </Link>
                </li>
                <li>
                  <Link href="/metro" className="hover:text-emerald-300 transition-all duration-150 hover:translate-x-1 flex items-center gap-2 group">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 group-hover:scale-125 transition-transform" />
                    <span className="truncate">{isBn ? 'গ্রিন লাইন (আন্ডারওয়াটার)' : 'Green Line (Underwater)'}</span>
                  </Link>
                </li>
                <li>
                  <Link href="/metro" className="hover:text-orange-300 transition-all duration-150 hover:translate-x-1 flex items-center gap-2 group">
                    <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0 group-hover:scale-125 transition-transform" />
                    <span className="truncate">{isBn ? 'অরেঞ্জ লাইন (ইএম বাইপাস)' : 'Orange Line (EM Bypass)'}</span>
                  </Link>
                </li>
                <li>
                  <Link href="/metro" className="hover:text-purple-300 transition-all duration-150 hover:translate-x-1 flex items-center gap-2 group">
                    <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0 group-hover:scale-125 transition-transform" />
                    <span className="truncate">{isBn ? 'পার্পল লাইন (জোকা)' : 'Purple Line (Joka Route)'}</span>
                  </Link>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* 4. Emergency Helpline & Live Status Bar */}
        <div className="rounded-2xl p-4 sm:px-6 bg-[#160711]/90 backdrop-blur-xl border border-rose-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Live Status Indicator */}
          <div className="flex items-center gap-2.5 text-xs text-stone-300">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="font-medium">
              {isBn ? 'কলকাতা দুর্গাপূজা ২০২৬ লাইভ ট্রানজিট সক্রিয়' : 'Kolkata Durga Puja 2026 Live Transit Feeds Active'}
            </span>
          </div>

          {/* Quick Dial Helplines */}
          <div className="flex items-center gap-4 sm:gap-6 text-xs font-mono">
            <a 
              href="tel:1090"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 hover:text-white hover:scale-105 active:scale-95 transition-all duration-150 group"
            >
              <PhoneCall className="w-3.5 h-3.5 text-rose-400 group-hover:rotate-12 transition-transform duration-150" />
              <span>{isBn ? 'পুলিশ' : 'Police'}: <strong className="text-white">1090</strong></span>
            </a>

            <a 
              href="tel:139"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-300 hover:text-white hover:scale-105 active:scale-95 transition-all duration-150 group"
            >
              <Train className="w-3.5 h-3.5 text-blue-400 group-hover:translate-x-0.5 transition-transform duration-150" />
              <span>{isBn ? 'মেট্রো' : 'Metro'}: <strong className="text-white">139</strong></span>
            </a>
          </div>

        </div>

        {/* 5. Grand Brand Typography Display */}
        <div className="text-center pt-8 border-t border-white/[0.08] select-none">
          <div className="text-4xl sm:text-7xl lg:text-8xl font-black font-editorial tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white/50 via-white/30 to-white/10 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
            PANDALÉ 2026
          </div>
          <p className="text-[11px] sm:text-xs text-amber-200/90 font-mono tracking-widest uppercase mt-2 drop-shadow-md font-semibold">
            Devotion · Art · Heritage · Kolkata
          </p>
        </div>

        {/* 6. Bottom Copyright Bar */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <p>
            © 2026 Pandalé Kolkata. Celebrating Durga Puja with devotion and art.
          </p>
          <div className="flex items-center gap-3 text-[11px]">
            <a 
              href="https://joydeepdas-portfolio.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-amber-300 transition-colors underline-offset-2 hover:underline"
            >
              Built by Joydeep Das
            </a>
            <span>•</span>
            <a 
              href="https://flatzy.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-amber-300 transition-colors underline-offset-2 hover:underline"
            >
              Powered by Flatzy
            </a>
            <span>•</span>
            <span>All Rights Reserved</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
