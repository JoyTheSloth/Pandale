'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Pandal } from '@/types';
import { useWishlist } from '@/context/WishlistContext';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Heart, 
  MapPin, 
  Clock, 
  ArrowRight, 
  ArrowUpRight, 
  Footprints, 
  Users, 
  ExternalLink 
} from 'lucide-react';
import { buildGoogleMapsUrl } from '@/lib/geo';

interface PandalCardProps {
  pandal: Pandal;
  priority?: boolean;
}

export default function PandalCard({ pandal, priority = false }: PandalCardProps) {
  const { isSaved, toggleWishlist } = useWishlist();
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const saved = isSaved(pandal.id);

  const exactMapsUrl = buildGoogleMapsUrl(
    pandal.latitude,
    pandal.longitude,
    pandal.google_place_id,
    pandal.name
  );

  // Clean up metro station name to avoid duplicate "Metro Station"
  const cleanMetroName = pandal.nearest_metro.toLowerCase().includes('metro')
    ? pandal.nearest_metro
    : `${pandal.nearest_metro} ${isBn ? 'মেট্রো' : 'Metro'}`;

  // Clean up distance to avoid duplicate 'm'
  const cleanDistance = pandal.walking_distance.replace(/m\s*m/gi, 'm').trim();

  // Clean best time (short and neat)
  const cleanBestTime = pandal.best_time.split('(')[0].split('or')[0].trim();

  // Estimated steps from walking time (approx 125 steps per min)
  const estimatedSteps = Math.round(pandal.walking_time_mins * 125).toLocaleString();

  // Dynamic crowd styling based on level
  const getCrowdLabel = (level: string) => {
    switch (level) {
      case 'low':
        return isBn ? 'কম ভিড়' : 'Low Crowd';
      case 'heavy':
        return isBn ? 'ভারী ভিড়' : 'Heavy Crowd';
      case 'moderate':
      default:
        return isBn ? 'মাঝারি ভিড়' : 'Moderate Crowd';
    }
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = typeof window !== 'undefined' ? `${window.location.origin}/pandal/${pandal.slug}` : '';
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${pandal.name} | Pandalé 2026`,
          text: `Check out ${pandal.name} in ${pandal.area} for Kolkata Durga Puja 2026!`,
          url,
        });
      } catch {
        // dismissed
      }
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
    }
  };

  return (
    <div className="group relative bg-[#FAF7F2] dark:bg-[#1A1215] rounded-[2rem] border border-[#EFE8DD] dark:border-white/10 p-3.5 sm:p-4 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
      
      {/* Decorative Botanical Left Vine Accent */}
      <svg
        className="absolute -left-2 top-3 w-8 h-24 pointer-events-none z-10 hidden sm:block opacity-70"
        viewBox="0 0 48 144"
        fill="none"
        aria-hidden="true"
      >
        <path d="M12 2 C16 35, 8 70, 14 110" stroke="#C9A070" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
        <path d="M14 15 C24 8, 38 12, 42 22 C34 26, 20 25, 14 15 Z" fill="#C9A070" opacity="0.8" />
        <path d="M12 38 C4 30, -2 40, 2 52 C8 48, 11 44, 12 38 Z" fill="#9B2C2C" opacity="0.85" />
        <path d="M11 65 C22 60, 32 68, 35 78 C26 80, 16 76, 11 65 Z" fill="#D4AF37" opacity="0.8" />
      </svg>

      {/* Decorative Bottom-Left Floral Accent */}
      <svg
        className="absolute -bottom-2 -left-2 w-16 h-16 pointer-events-none z-20 drop-shadow-2xs opacity-90"
        viewBox="0 0 128 128"
        fill="none"
        aria-hidden="true"
      >
        <path d="M50 85 C65 72, 85 75, 95 88 C82 96, 62 95, 50 85 Z" fill="#C9A070" opacity="0.85" />
        <g transform="translate(14, 60)">
          <path d="M32 32 C15 15, 10 38, 22 52 C26 44, 30 38, 32 32 Z" fill="#78111A" />
          <path d="M32 32 C38 12, 58 14, 56 32 C48 34, 40 33, 32 32 Z" fill="#991B1B" />
          <path d="M32 32 C50 30, 60 48, 48 58 C42 50, 36 42, 32 32 Z" fill="#881337" />
          <path d="M32 32 C30 52, 44 62, 34 66 C28 56, 30 44, 32 32 Z" fill="#A31D1D" />
          <circle cx="32" cy="32" r="5" fill="#4C0519" />
          <circle cx="32" cy="32" r="2.5" fill="#F59E0B" />
        </g>
      </svg>

      {/* 1. MEDIA CONTAINER (Compact Organic Arched Shape) */}
      <div 
        className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] max-h-[190px] overflow-hidden shadow-inner group/media shrink-0"
        style={{ borderRadius: '1.75rem 1.25rem 1.75rem 1.5rem' }}
      >
        <Image
          src={pandal.featured_image}
          alt={pandal.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />

        {/* Subtle Vignette Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/25 pointer-events-none" />

        {/* Top-Right Quick Action Icons */}
        <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(pandal.id);
            }}
            aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
            className={`w-7 h-7 rounded-full backdrop-blur-md transition-all flex items-center justify-center cursor-pointer shadow-sm btn-jiggle ${
              saved
                ? 'bg-[#D8261C] text-white border border-[#FDE047]'
                : 'bg-black/60 text-white/90'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${saved ? 'fill-[#FDE047] text-[#FDE047]' : ''}`} />
          </button>

          <Link
            href={`/pandal/${pandal.slug}`}
            className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md text-white/90 shadow-sm flex items-center justify-center btn-jiggle cursor-pointer"
            aria-label="View pandal details"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Bottom Floating Badges Row (Area + Must Visit) */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 flex items-center gap-1.5 flex-wrap">
          <span className="px-2.5 py-0.5 rounded-full bg-white/95 dark:bg-black/85 text-stone-900 dark:text-white text-[10px] sm:text-[11px] font-semibold shadow-xs flex items-center gap-1 backdrop-blur-md border border-white/40 dark:border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D8261C]" />
            <span>{pandal.area}</span>
          </span>

          {(pandal.is_must_visit || pandal.tags?.includes('Must Visit')) && (
            <span className="px-2 py-0.5 rounded-full bg-[#FFF4E5] dark:bg-amber-950/85 text-[#8C5E28] dark:text-amber-300 text-[10px] font-bold shadow-xs flex items-center gap-1 border border-amber-200/60 dark:border-amber-900/50 backdrop-blur-md">
              <span>👑</span>
              <span>{isBn ? 'দর্শনীয়' : 'Must Visit'}</span>
            </span>
          )}
        </div>
      </div>

      {/* 2. CARD CONTENT BODY */}
      <div className="flex-1 flex flex-col justify-between space-y-3 pt-3">
        
        {/* Category & Title */}
        <div>
          <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-[#9C7A5B] dark:text-amber-400 font-bold block leading-none mb-1">
            {isBn ? 'থিম এবং স্থাপত্য' : 'THEME & ARCHITECTURE'}
          </span>

          <div className="flex items-center gap-1.5">
            <Link
              href={`/pandal/${pandal.slug}`}
              className="font-editorial text-lg sm:text-xl font-bold text-[#7A1515] dark:text-rose-300 tracking-tight leading-snug hover:text-[#991B1B] dark:hover:text-rose-200 transition-colors line-clamp-1"
            >
              {pandal.name}
            </Link>

            {/* Small Autumn Leaf Sprig */}
            <svg className="w-4 h-4 text-[#C9A070] shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 20 C8 14, 14 8, 20 4" stroke="#C9A070" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M12 12 C14 8, 18 8, 20 10 C18 13, 14 13, 12 12 Z" fill="#C9A070" />
              <path d="M16 8 C17 5, 20 5, 21 7 C20 9, 17 9, 16 8 Z" fill="#991B1B" />
              <path d="M8 16 C9 13, 13 13, 14 15 C13 17, 10 17, 8 16 Z" fill="#D4AF37" />
            </svg>
          </div>

          {/* Red Accent Underline */}
          <div className="w-8 h-0.5 bg-[#881337] dark:bg-rose-500 rounded-full my-1.5" />

          {/* Theme Description */}
          <p className="text-xs text-stone-600 dark:text-stone-300 font-medium leading-relaxed line-clamp-1">
            {pandal.theme}
          </p>
        </div>

        {/* Metro Transit Card (Compact) */}
        <div className="p-2 sm:p-2.5 rounded-xl bg-[#F5F2EB] dark:bg-white/[0.04] border border-stone-200/60 dark:border-white/5 flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#0052FF] text-white font-bold flex items-center justify-center text-xs shadow-2xs shrink-0">
            M
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold text-stone-900 dark:text-white truncate leading-tight">
              {cleanMetroName}
            </h4>
            
            <div className="flex items-center gap-1.5 text-[11px] text-stone-600 dark:text-stone-300 mt-0.5 flex-wrap">
              <span className="flex items-center gap-1 text-[#D8261C] dark:text-red-400 font-bold shrink-0">
                <Clock className="w-3 h-3" />
                <span>{pandal.walking_time_mins} min</span>
              </span>

              <span className="text-stone-300 dark:text-stone-600">•</span>

              <span className="font-semibold text-stone-700 dark:text-stone-300 shrink-0">
                {cleanDistance}
              </span>

              <span className="text-stone-300 dark:text-stone-600">•</span>

              <span className="flex items-center gap-1 text-stone-500 dark:text-stone-400 font-medium shrink-0">
                <Footprints className="w-3 h-3 text-[#D8261C]" />
                <span>~{estimatedSteps} steps</span>
              </span>
            </div>
          </div>
        </div>

        {/* Crowd & Best Time Row (Compact) */}
        <div className="flex items-center justify-between gap-2 text-[11px]">
          <div className="px-2.5 py-1 rounded-lg bg-[#F9EDE6] dark:bg-rose-950/30 text-[#8C4A32] dark:text-rose-300 border border-[#F3DACF] dark:border-rose-900/30 flex items-center gap-1.5 font-semibold shadow-2xs">
            <Users className="w-3.5 h-3.5 text-[#8C4A32] dark:text-rose-300 shrink-0" />
            <span>{getCrowdLabel(pandal.crowd_status.level)}</span>
            <span className="text-[9px] opacity-75 font-normal hidden sm:inline">
              ({isBn ? 'রিপোর্ট' : 'Community reported'})
            </span>
          </div>

          <div className="flex items-center gap-1 text-stone-600 dark:text-stone-400 font-medium truncate">
            <Clock className="w-3 h-3 text-amber-600 shrink-0" />
            <span className="truncate max-w-[130px]">{cleanBestTime}</span>
          </div>
        </div>

        {/* Bottom Actions Row (Compact) */}
        <div className="pt-1 flex items-center gap-2">
          {/* Primary CTA Button */}
          <Link
            href={`/pandal/${pandal.slug}`}
            className="flex-1 py-2.5 px-3.5 rounded-xl bg-[#7B0D11] hover:bg-[#680A0E] text-white font-editorial font-bold flex items-center justify-center gap-1.5 shadow-sm shadow-[#7B0D11]/20 hover:shadow-md transition-all text-xs sm:text-sm active:scale-98 relative overflow-hidden group/btn btn-jiggle"
          >
            <span className="relative z-10">{isBn ? 'প্যান্ডেল দেখুন' : 'Explore Pandal'}</span>
            <ArrowRight className="w-3.5 h-3.5 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
          </Link>

          {/* Location Pin Button */}
          <a
            href={exactMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            title={isBn ? 'গুগল ম্যাপসে দেখুন' : 'Open in Google Maps'}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-stone-200 dark:border-white/10 bg-white dark:bg-[#1A1215] flex items-center justify-center text-[#D8261C] hover:border-[#D8261C] hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all shadow-2xs shrink-0 cursor-pointer btn-jiggle"
          >
            <MapPin className="w-4 h-4 text-[#D8261C]" />
          </a>

          {/* Share Button */}
          <button
            type="button"
            onClick={handleShare}
            title={isBn ? 'শেয়ার করুন' : 'Share'}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-stone-200 dark:border-white/10 bg-white dark:bg-[#1A1215] flex items-center justify-center text-stone-700 dark:text-stone-300 hover:text-[#D8261C] hover:border-[#D8261C] hover:bg-stone-50 dark:hover:bg-white/5 transition-all shadow-2xs shrink-0 cursor-pointer btn-jiggle"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
