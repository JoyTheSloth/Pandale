'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Pandal } from '@/types';
import { useWishlist } from '@/context/WishlistContext';
import { Heart, MapPin, Train, ExternalLink, Clock, ArrowUpRight } from 'lucide-react';
import { buildGoogleMapsUrl } from '@/lib/geo';

interface PandalCardProps {
  pandal: Pandal;
  priority?: boolean;
}

export default function PandalCard({ pandal, priority = false }: PandalCardProps) {
  const { isSaved, toggleWishlist } = useWishlist();
  const saved = isSaved(pandal.id);

  const exactMapsUrl = buildGoogleMapsUrl(
    pandal.latitude,
    pandal.longitude,
    pandal.google_place_id,
    pandal.name
  );

  // Crowd status pill
  const getCrowdBg = (level: string) => {
    switch (level) {
      case 'low':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'moderate':
        return 'bg-amber-50 text-amber-800 border-amber-300';
      case 'heavy':
        return 'bg-rose-50 text-rose-700 border-rose-300';
      default:
        return 'bg-stone-50 text-stone-700 border-stone-200';
    }
  };

  const getCrowdDot = (level: string) => {
    switch (level) {
      case 'low':
        return 'bg-emerald-500';
      case 'moderate':
        return 'bg-amber-500';
      case 'heavy':
        return 'bg-rose-500 animate-pulse';
      default:
        return 'bg-stone-400';
    }
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-3xl border border-[#FEE2E2]/80 overflow-hidden shadow-luxe shadow-luxe-hover hover:border-[#F59E0B]/60 transition-all duration-300">
      
      {/* Media Container with Cinematic Vignette */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#FFFBEB]">
        <Image
          src={pandal.featured_image}
          alt={pandal.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />
        {/* Soft Vignette Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

        {/* Top Badges Row */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold backdrop-blur-md bg-white/95 text-[#D8261C] border border-[#FEE2E2] shadow-xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D8261C]" />
              {pandal.area}
            </span>
            
            {(pandal.is_must_visit || pandal.tags?.includes('Must Visit')) && (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold backdrop-blur-md bg-[#FEF3C7]/95 text-[#92400E] border border-[#FDE68A] shadow-xs flex items-center gap-1">
                <span>👑 Must Visit</span>
              </span>
            )}
          </div>

          {/* Wishlist Heart Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(pandal.id);
            }}
            aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
            className={`p-2.5 rounded-full backdrop-blur-md transition-all active:scale-90 ${
              saved
                ? 'bg-[#D8261C] text-white shadow-md shadow-[#D8261C]/40 border border-[#FDE047]'
                : 'bg-white/90 text-[#D8261C] hover:bg-white hover:scale-105 shadow-xs'
            }`}
          >
            <Heart className={`w-4 h-4 transition-transform ${saved ? 'fill-[#FDE047] scale-110' : 'fill-[#D8261C]/15'}`} />
          </button>
        </div>

        {/* Bottom Image Overlay Details */}
        <div className="absolute bottom-3.5 left-4 right-4 z-10 text-white">
          <div className="flex items-center gap-1.5 text-[11px] text-[#FDE047] font-semibold mb-1 drop-shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span className="tracking-wide uppercase font-mono">{pandal.locality}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-editorial text-white line-clamp-1 drop-shadow-md group-hover:text-[#FEF08A] transition-colors">
            {pandal.name}
          </h3>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-gradient-to-b from-white to-[#FFFDF9]">
        <div>
          {/* Theme preview with artistic accent */}
          <div className="mb-3.5">
            <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-[#B45309] font-bold mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
              <span>Theme & Architecture</span>
            </div>
            <p className="text-xs sm:text-sm text-[#292524] font-medium line-clamp-2 leading-relaxed italic">
              &ldquo;{pandal.theme}&rdquo;
            </p>
          </div>

          {/* Metro & Transit Connection Card */}
          <div className="p-3.5 rounded-2xl bg-[#FFFBEB]/80 border border-[#FDE68A]/80 mb-3.5 flex items-center justify-between text-xs hover:border-[#F59E0B] transition-colors">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center shrink-0 font-bold text-xs shadow-xs">
                M
              </div>
              <div className="truncate">
                <span className="text-[10px] text-[#78716C] block font-semibold leading-tight">Nearest Metro Station</span>
                <span className="font-bold text-[#1C1917] truncate block text-xs">
                  {pandal.nearest_metro}
                </span>
              </div>
            </div>
            <div className="text-right shrink-0 pl-2">
              <span className="text-[10px] text-[#78716C] block font-semibold leading-tight">Walking</span>
              <span className="font-bold text-[#D8261C] text-xs">
                {pandal.walking_time_mins} min <span className="text-[10px] font-normal text-[#78716C]">({pandal.walking_distance.split(' ')[0]})</span>
              </span>
            </div>
          </div>

          {/* Crowd & Best Time indicators */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border shadow-2xs ${getCrowdBg(pandal.crowd_status.level)}`}>
              <span className={`w-2 h-2 rounded-full ${getCrowdDot(pandal.crowd_status.level)}`} />
              <span className="font-bold capitalize">{pandal.crowd_status.level} Crowd</span>
              <span className="text-[9px] opacity-75 font-mono">({pandal.crowd_status.source})</span>
            </div>

            <div className="flex items-center gap-1 text-[#57534E] text-xs">
              <Clock className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span className="truncate max-w-[130px] font-medium">{pandal.best_time.split('or')[0]}</span>
            </div>
          </div>
        </div>

        {/* Footer Action Buttons */}
        <div className="pt-3 border-t border-[#FEE2E2]/70 flex items-center gap-2">
          
          <Link
            href={`/pandal/${pandal.slug}`}
            className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#D8261C] to-[#B91C1C] hover:from-[#B91C1C] hover:to-[#991B1B] text-white text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow-md shadow-[#D8261C]/25 transition-all hover:shadow-lg active:scale-98"
          >
            <span>Explore Pandal</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#FDE047]" />
          </Link>

          <a
            href={exactMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Open Exact Google Maps Coordinates"
            className="py-2.5 px-3.5 rounded-xl border border-[#FED7AA] bg-white hover:bg-[#FFFBEB] text-[#1C1917] hover:text-[#D8261C] hover:border-[#D8261C] text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-98 shadow-2xs"
          >
            <MapPin className="w-3.5 h-3.5 text-[#D8261C]" />
            <span className="hidden sm:inline">Maps</span>
            <ExternalLink className="w-3 h-3 text-[#A8A29E]" />
          </a>

        </div>

      </div>
    </div>
  );
}
