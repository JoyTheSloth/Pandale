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
  Share2,
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
    <div className="group relative bg-[#FAF7F2] dark:bg-[#1A1215] rounded-[2.5rem] border border-[#EFE8DD] dark:border-white/10 p-4 sm:p-5 lg:p-6 shadow-luxe hover:shadow-2xl transition-all duration-300 flex flex-col md:flex-row gap-5 lg:gap-6 overflow-hidden">
      
      {/* Decorative Left Botanical Stem Vine (Framing the Left Border) */}
      <svg
        className="absolute -left-2 top-4 w-12 h-36 pointer-events-none z-10 hidden sm:block opacity-90"
        viewBox="0 0 48 144"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M12 2 C16 35, 8 70, 14 110 C16 120, 18 135, 12 144"
          stroke="#C9A070"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.5"
        />
        {/* Upper golden leaf */}
        <path d="M14 15 C24 8, 38 12, 42 22 C34 26, 20 25, 14 15 Z" fill="#C9A070" opacity="0.85" />
        <path d="M14 15 Q28 18 42 22" stroke="#FAF7F2" strokeWidth="0.6" opacity="0.7" />
        {/* Crimson leaf 1 */}
        <path d="M12 38 C4 30, -2 40, 2 52 C8 48, 11 44, 12 38 Z" fill="#9B2C2C" opacity="0.9" />
        <path d="M12 38 Q5 44 2 52" stroke="#FAF7F2" strokeWidth="0.6" opacity="0.6" />
        {/* Golden leaf 2 */}
        <path d="M11 65 C22 60, 32 68, 35 78 C26 80, 16 76, 11 65 Z" fill="#D4AF37" opacity="0.85" />
        <path d="M11 65 Q23 70 35 78" stroke="#FAF7F2" strokeWidth="0.6" opacity="0.7" />
        {/* Crimson leaf 2 */}
        <path d="M13 92 C5 86, 0 98, 4 108 C10 104, 13 98, 13 92 Z" fill="#881337" opacity="0.9" />
        <path d="M13 92 Q6 100 4 108" stroke="#FAF7F2" strokeWidth="0.6" opacity="0.6" />
      </svg>

      {/* Decorative Bottom-Left Floral Bouquet (Hibiscus & Golden Foliage) */}
      <svg
        className="absolute -bottom-3 -left-3 w-28 sm:w-32 h-28 sm:h-32 pointer-events-none z-20 drop-shadow-sm"
        viewBox="0 0 128 128"
        fill="none"
        aria-hidden="true"
      >
        {/* Golden background leaves radiating outward */}
        <path d="M50 85 C65 72, 85 75, 95 88 C82 96, 62 95, 50 85 Z" fill="#C9A070" opacity="0.85" />
        <path d="M50 85 Q72 82 95 88" stroke="#FFF" strokeWidth="0.6" opacity="0.7" />
        <path d="M40 98 C45 115, 60 122, 75 120 C70 108, 55 102, 40 98 Z" fill="#D4AF37" opacity="0.75" />
        <path d="M40 98 Q58 110 75 120" stroke="#FFF" strokeWidth="0.6" opacity="0.7" />

        {/* Main Festive Red Flower (Hibiscus / Pujo Jaba) */}
        <g transform="translate(14, 60)">
          <path d="M32 32 C15 15, 10 38, 22 52 C26 44, 30 38, 32 32 Z" fill="#78111A" />
          <path d="M32 32 C38 12, 58 14, 56 32 C48 34, 40 33, 32 32 Z" fill="#991B1B" />
          <path d="M32 32 C50 30, 60 48, 48 58 C42 50, 36 42, 32 32 Z" fill="#881337" />
          <path d="M32 32 C30 52, 44 62, 34 66 C28 56, 30 44, 32 32 Z" fill="#A31D1D" />
          <path d="M32 32 C12 36, 14 58, 24 62 C26 52, 28 42, 32 32 Z" fill="#B91C1C" />

          {/* Center core and golden stamen dots */}
          <circle cx="32" cy="32" r="6" fill="#4C0519" />
          <circle cx="32" cy="32" r="3" fill="#F59E0B" />
          <circle cx="30" cy="27" r="1.5" fill="#FDE047" />
          <circle cx="35" cy="28" r="1.5" fill="#FDE047" />
          <circle cx="36" cy="34" r="1.5" fill="#FDE047" />
          <circle cx="31" cy="36" r="1.5" fill="#FDE047" />
          <circle cx="28" cy="32" r="1.5" fill="#FDE047" />
        </g>

        {/* Secondary smaller bud flower */}
        <g transform="translate(48, 88) scale(0.65)">
          <path d="M20 20 C10 8, 4 24, 14 34 C16 28, 18 24, 20 20 Z" fill="#991B1B" />
          <path d="M20 20 C24 6, 38 8, 36 20 C30 22, 26 21, 20 20 Z" fill="#B91C1C" />
          <circle cx="20" cy="20" r="3.5" fill="#4C0519" />
          <circle cx="20" cy="20" r="1.5" fill="#FDE047" />
        </g>
      </svg>

      {/* 1. LEFT MEDIA CONTAINER (Organic Pebble / Arch Shape) */}
      <div className="relative w-full md:w-[42%] lg:w-[40%] min-h-[240px] sm:min-h-[280px] md:min-h-[300px] shrink-0 overflow-hidden shadow-inner group/media"
        style={{ borderRadius: '2.8rem 1.8rem 2.8rem 2.2rem' }}
      >
        <Image
          src={pandal.featured_image}
          alt={pandal.name}
          fill
          sizes="(max-width: 768px) 100vw, 42vw"
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />

        {/* Subtle Vignette Gradient for readability of pills */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/25 pointer-events-none" />

        {/* Top-Right Floating Circular Arrow Button & Wishlist Heart */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(pandal.id);
            }}
            aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
            className={`w-8 h-8 rounded-full backdrop-blur-md transition-all flex items-center justify-center cursor-pointer shadow-md ${
              saved
                ? 'bg-[#D8261C] text-white border border-[#FDE047]'
                : 'bg-white/90 dark:bg-black/75 text-stone-700 dark:text-stone-200 hover:scale-110'
            }`}
          >
            <Heart className={`w-4 h-4 ${saved ? 'fill-[#FDE047] text-[#FDE047]' : ''}`} />
          </button>

          <Link
            href={`/pandal/${pandal.slug}`}
            className="w-8 h-8 rounded-full bg-white/95 dark:bg-black/75 backdrop-blur-md text-stone-900 dark:text-white shadow-md flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
            aria-label="View pandal details"
          >
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Bottom Floating Badges Row (Area + Must Visit) */}
        <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center gap-2 flex-wrap">
          {/* White Area Pill */}
          <span className="px-3 py-1 rounded-full bg-white/95 dark:bg-black/85 text-stone-900 dark:text-white text-xs font-semibold shadow-md flex items-center gap-1.5 backdrop-blur-md border border-white/40 dark:border-white/10">
            <span className="w-2 h-2 rounded-full bg-[#D8261C]" />
            <span>{pandal.area}</span>
          </span>

          {/* Warm Sand/Gold Must Visit Pill */}
          {(pandal.is_must_visit || pandal.tags?.includes('Must Visit')) && (
            <span className="px-3 py-1 rounded-full bg-[#FFF4E5] dark:bg-amber-950/85 text-[#8C5E28] dark:text-amber-300 text-xs font-bold shadow-md flex items-center gap-1 border border-amber-200/60 dark:border-amber-900/50 backdrop-blur-md">
              <span>👑</span>
              <span>{isBn ? 'দর্শনীয়' : 'Must Visit'}</span>
            </span>
          )}
        </div>
      </div>

      {/* 2. RIGHT CONTENT AREA */}
      <div className="flex-1 flex flex-col justify-between space-y-4 py-1">
        
        {/* Header Block: Category, Title with leaf, and Red Underline */}
        <div>
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-[#9C7A5B] dark:text-amber-400 font-bold block mb-1">
            {isBn ? 'থিম এবং স্থাপত্য' : 'THEME & ARCHITECTURE'}
          </span>

          {/* Title Row with Botanical Leaf Sprig */}
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href={`/pandal/${pandal.slug}`}
              className="font-editorial text-2xl sm:text-3xl font-bold text-[#7A1515] dark:text-rose-300 tracking-tight leading-tight hover:text-[#991B1B] dark:hover:text-rose-200 transition-colors"
            >
              {pandal.name}
            </Link>

            {/* Small Decorative Autumn Leaf Sprig */}
            <svg className="w-5 h-5 text-[#C9A070] shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 20 C8 14, 14 8, 20 4" stroke="#C9A070" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M12 12 C14 8, 18 8, 20 10 C18 13, 14 13, 12 12 Z" fill="#C9A070" />
              <path d="M16 8 C17 5, 20 5, 21 7 C20 9, 17 9, 16 8 Z" fill="#991B1B" />
              <path d="M8 16 C9 13, 13 13, 14 15 C13 17, 10 17, 8 16 Z" fill="#D4AF37" />
            </svg>
          </div>

          {/* Red Accent Underline */}
          <div className="w-12 h-0.5 bg-[#881337] dark:bg-rose-500 rounded-full mt-1.5 mb-2.5" />

          {/* Theme Description */}
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-medium leading-relaxed line-clamp-2">
            {pandal.theme}
          </p>
        </div>

        {/* Metro Transit Card */}
        <div className="p-3 sm:p-3.5 rounded-2xl bg-[#F5F2EB] dark:bg-white/[0.04] border border-stone-200/70 dark:border-white/5 flex items-center gap-3">
          {/* Blue Metro 'M' Icon */}
          <div className="w-9 h-9 rounded-xl bg-[#0052FF] text-white font-bold flex items-center justify-center text-sm shadow-xs shrink-0">
            M
          </div>

          {/* Metro Station & Walking Stats */}
          <div className="min-w-0 flex-1">
            <h4 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-white truncate">
              {pandal.nearest_metro} {isBn ? 'মেট্রো স্টেশন' : 'Metro Station'}
            </h4>
            
            <div className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-300 mt-0.5 flex-wrap">
              <span className="flex items-center gap-1 text-[#D8261C] dark:text-red-400 font-bold shrink-0">
                <Clock className="w-3.5 h-3.5" />
                <span>{pandal.walking_time_mins} min</span>
              </span>

              <span className="text-stone-300 dark:text-stone-600">•</span>

              <span className="font-semibold text-stone-700 dark:text-stone-300 shrink-0">
                {pandal.walking_distance.split(' ')[0]} m
              </span>

              <span className="text-stone-300 dark:text-stone-600">•</span>

              <span className="flex items-center gap-1 text-stone-600 dark:text-stone-300 font-medium shrink-0">
                <Footprints className="w-3.5 h-3.5 text-[#D8261C]" />
                <span>~{estimatedSteps} steps</span>
              </span>
            </div>
          </div>
        </div>

        {/* Crowd & Best Time Indicators Row */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          {/* Community Reported Crowd Pill */}
          <div className="px-3 py-1.5 rounded-xl bg-[#F9EDE6] dark:bg-rose-950/30 text-[#8C4A32] dark:text-rose-300 border border-[#F3DACF] dark:border-rose-900/30 flex items-center gap-2 text-xs font-semibold shadow-2xs">
            <Users className="w-4 h-4 text-[#8C4A32] dark:text-rose-300 shrink-0" />
            <span>{getCrowdLabel(pandal.crowd_status.level)}</span>
            <span className="text-[10px] opacity-75 font-normal">
              ({isBn ? 'কমিউনিটি রিপোর্ট' : 'Community reported'})
            </span>
          </div>

          {/* Best Time Pill */}
          <div className="flex items-center gap-1.5 text-xs text-stone-700 dark:text-stone-300 font-medium">
            <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="truncate">{pandal.best_time.split('or')[0].trim()}</span>
          </div>
        </div>

        {/* Bottom Actions Row */}
        <div className="pt-2 flex items-center gap-2.5">
          {/* Primary Crimson CTA Button */}
          <Link
            href={`/pandal/${pandal.slug}`}
            className="flex-1 py-3 px-5 rounded-2xl bg-[#7B0D11] hover:bg-[#680A0E] text-white font-editorial font-bold flex items-center justify-center gap-2 shadow-md shadow-[#7B0D11]/25 hover:shadow-lg transition-all text-sm sm:text-base active:scale-98 relative overflow-hidden group/btn"
          >
            {/* Subtle Texture Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-out" />
            <span className="relative z-10">{isBn ? 'প্যান্ডেল বিস্তারিত দেখুন' : 'Explore Pandal'}</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
          </Link>

          {/* Location Pin Button */}
          <a
            href={exactMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            title={isBn ? 'গুগল ম্যাপসে দেখুন' : 'Open in Google Maps'}
            className="w-12 h-12 rounded-2xl border border-stone-200 dark:border-white/10 bg-white dark:bg-[#1A1215] flex items-center justify-center text-[#D8261C] hover:border-[#D8261C] hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all shadow-2xs shrink-0 cursor-pointer"
          >
            <MapPin className="w-5 h-5 text-[#D8261C]" />
          </a>

          {/* Share Button */}
          <button
            type="button"
            onClick={handleShare}
            title={isBn ? 'শেয়ার করুন' : 'Share'}
            className="w-12 h-12 rounded-2xl border border-stone-200 dark:border-white/10 bg-white dark:bg-[#1A1215] flex items-center justify-center text-stone-700 dark:text-stone-300 hover:text-[#D8261C] hover:border-[#D8261C] hover:bg-stone-50 dark:hover:bg-white/5 transition-all shadow-2xs shrink-0 cursor-pointer"
          >
            <ExternalLink className="w-5 h-5" />
          </button>
        </div>

      </div>

    </div>
  );
}
