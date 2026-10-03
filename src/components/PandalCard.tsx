'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Pandal } from '@/types';
import { useWishlist } from '@/context/WishlistContext';
import { useVisited } from '@/context/VisitedContext';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Heart, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Users, 
  Flame
} from 'lucide-react';
import { buildGoogleMapsUrl } from '@/lib/geo';

interface PandalCardProps {
  pandal: Pandal;
  priority?: boolean;
}

export default function PandalCard({ pandal, priority = false }: PandalCardProps) {
  const { isSaved, toggleWishlist } = useWishlist();
  const { isVisited } = useVisited();
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const saved = isSaved(pandal.id);
  const visited = isVisited(pandal.id);

  const exactMapsUrl = buildGoogleMapsUrl(
    pandal.latitude,
    pandal.longitude,
    pandal.google_place_id,
    pandal.locality ? `${pandal.name}, ${pandal.locality}` : pandal.name
  );

  // Clean up metro station name
  const cleanMetroName = pandal.nearest_metro.toLowerCase().includes('metro')
    ? pandal.nearest_metro
    : `${pandal.nearest_metro} ${isBn ? 'মেট্রো' : 'Metro'}`;

  // Clean up distance
  const cleanDistance = pandal.walking_distance.replace(/m\s*m/gi, 'm').trim();

  // Dynamic crowd styling based on level
  const getCrowdLabel = (level: string) => {
    switch (level) {
      case 'low':
        return isBn ? 'কম ভিড়' : 'Low Crowd';
      case 'heavy':
        return isBn ? 'ভারী ভিড়' : 'Heavy Crowd';
      case 'moderate':
      default:
        return isBn ? 'মাঝারি ভিড়' : 'Moderate';
    }
  };

  return (
    <div className={`group relative bg-[#FAF7F2] dark:bg-[#1A1215] rounded-[1.75rem] border p-2.5 sm:p-3 shadow-sm hover:shadow-xl hover:-translate-y-1 active:scale-[0.99] transition-all duration-300 flex flex-row md:flex-col items-stretch gap-2.5 sm:gap-3.5 md:gap-0 overflow-hidden ${
      visited ? 'border-emerald-500/50 dark:border-emerald-500/40 bg-emerald-50/10 dark:bg-emerald-950/10' : 'border-[#EFE8DD] dark:border-white/10'
    }`}>
      
      {/* Top-Right Action Controls: Wishlist (Heart) + Location (MapPin) */}
      <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5">
        {/* Wishlist Button (Left of Location) */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(pandal.id);
          }}
          aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
          title={saved ? (isBn ? 'সংরক্ষিত তালিকা থেকে সরান' : 'Remove from wishlist') : (isBn ? 'সংরক্ষিত তালিকায় যোগ করুন' : 'Save to wishlist')}
          className={`w-8 h-8 rounded-xl backdrop-blur-md transition-all flex items-center justify-center cursor-pointer shadow-xs hover:shadow-md active:scale-75 hover:scale-110 duration-150 border ${
            saved
              ? 'bg-[#D8261C] text-white border-[#FDE047] shadow-sm shadow-red-600/30'
              : 'border-stone-200/90 dark:border-white/15 bg-white/95 dark:bg-[#20161C]/95 text-stone-600 dark:text-stone-300 hover:text-[#D8261C] hover:bg-red-50 dark:hover:bg-red-950/40 hover:border-red-300 dark:hover:border-red-800/60'
          }`}
        >
          <Heart className={`w-4 h-4 transition-transform duration-200 ${saved ? 'fill-[#FDE047] text-[#FDE047] scale-110' : ''}`} />
        </button>

        {/* Location Icon Button (Opens Google Maps) */}
        <a
          href={exactMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          title={isBn ? 'গুগল ম্যাপসে অবস্থান ও দিকনির্দেশ দেখুন' : 'Get Directions on Google Maps'}
          aria-label="Get Directions on Google Maps"
          className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md hover:scale-110 active:scale-90 backdrop-blur-md border border-stone-200/90 dark:border-white/15 bg-white/95 dark:bg-[#20161C]/95 text-[#D8261C] hover:bg-red-50 dark:hover:bg-red-950/40 hover:border-red-300 dark:hover:border-red-800/60 group/loc"
        >
          <MapPin className="w-4 h-4 text-[#D8261C] transition-transform duration-200 group-hover/loc:scale-110" />
        </a>
      </div>

      {/* 1. LEFT (mobile) / TOP (desktop): MEDIA / IMAGE CONTAINER */}
      <div className="relative w-32 sm:w-40 md:w-full shrink-0 rounded-2xl overflow-hidden shadow-inner group/media min-h-[145px] sm:min-h-[160px] md:min-h-[180px] md:mb-3">
        <Image
          src={pandal.featured_image}
          alt={pandal.name}
          fill
          sizes="(max-width: 768px) 140px, 180px"
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Subtle Vignette Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/25 pointer-events-none" />

        {/* Top-Left Floating Area Badge */}
        <div className="absolute top-2 left-2 z-10">
          <span className="px-2 py-0.5 rounded-full bg-white/95 dark:bg-black/85 text-stone-900 dark:text-white text-[9.5px] font-bold shadow-xs flex items-center gap-1 backdrop-blur-md border border-white/40 dark:border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D8261C]" />
            <span className="truncate max-w-[70px]">{pandal.area}</span>
          </span>
        </div>


        {/* Bottom Floating Must-Visit Tag: 3 Fire Icons without written text */}
        {(pandal.is_must_visit || pandal.tags?.includes('Must Visit')) && (
          <div className="absolute bottom-2 left-2 z-10">
            <span 
              className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-black/70 dark:bg-black/80 backdrop-blur-md border border-orange-500/30 shadow-md"
              title={isBn ? 'অবশ্য দর্শনীয়' : 'Must Visit'}
            >
              <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
            </span>
          </div>
        )}
      </div>

      {/* 2. RIGHT: DETAILS CONTENT CONTAINER */}
      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5 space-y-1.5">
        
        {/* Locality, Category & Title */}
        <div className="pr-20">
          <div className="flex items-center justify-between gap-1 text-[9.5px] font-mono uppercase tracking-wider text-amber-800 dark:text-amber-400 font-bold mb-0.5 truncate">
            <span>{pandal.locality}</span>
          </div>

          <Link
            href={`/pandal/${pandal.slug}`}
            className="font-editorial text-sm sm:text-base font-bold text-[#7A1515] dark:text-rose-300 tracking-tight leading-snug hover:text-[#991B1B] dark:hover:text-rose-200 transition-colors line-clamp-1 block"
          >
            {pandal.name}
          </Link>

        </div>

        {/* Metro Transit Pill (Compact Row) */}
        <div className="p-1.5 sm:p-2 rounded-xl bg-[#F5F2EB] dark:bg-white/[0.04] border border-stone-200/60 dark:border-white/5 flex items-center gap-2">
          <div className="w-5.5 h-5.5 rounded-md bg-[#0052FF] text-white font-bold flex items-center justify-center text-[10px] shadow-2xs shrink-0">
            M
          </div>

          <div className="min-w-0 flex-1 flex items-center justify-between gap-1 text-[10.5px]">
            <span className="font-bold text-stone-900 dark:text-white truncate">
              {cleanMetroName}
            </span>

            <span className="flex items-center gap-0.5 text-[#D8261C] dark:text-red-400 font-bold shrink-0">
              <Clock className="w-2.5 h-2.5" />
              <span>{pandal.walking_time_mins}m</span>
              <span className="text-stone-400 font-normal hidden sm:inline">({cleanDistance.split(' ')[0]})</span>
            </span>
          </div>
        </div>

        {/* Crowd Badge & Actions Row */}
        <div className="pt-0.5 flex items-center justify-between gap-1.5 border-t border-stone-200/50 dark:border-white/5">
          {/* Crowd Pill */}
          <div className="px-1.5 py-0.5 rounded-md bg-[#F9EDE6] dark:bg-rose-950/30 text-[#8C4A32] dark:text-rose-300 border border-[#F3DACF] dark:border-rose-900/30 flex items-center gap-1 text-[9.5px] font-semibold shrink-0">
            <Users className="w-3 h-3 text-[#8C4A32] dark:text-rose-300" />
            <span>{getCrowdLabel(pandal.crowd_status.level)}</span>
          </div>

          {/* Action Button: Explore */}
          <div className="flex items-center shrink-0">
            <Link
              href={`/pandal/${pandal.slug}`}
              className="group/btn py-1.5 px-3.5 rounded-xl bg-gradient-to-r from-[#D8261C] via-[#C91F16] to-[#A81710] hover:from-[#B91C1C] hover:via-[#A81710] hover:to-[#88130E] text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-sm shadow-red-600/25 hover:shadow-md hover:shadow-red-600/35 hover:scale-105 active:scale-95 transition-all duration-200 border border-white/20"
            >
              <span>{isBn ? 'দেখুন' : 'Explore'}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
