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
    <div className="group relative flex flex-col bg-white rounded-3xl border border-[#FEE2E2] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#F59E0B] transition-all duration-300">
      
      {/* Media Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#FFFBEB]">
        <Image
          src={pandal.featured_image}
          alt={pandal.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <span className="px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md bg-white/95 text-[#D8261C] border border-[#FEE2E2] shadow-xs">
            {pandal.area}
          </span>

          {/* Wishlist Button */}
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
            <Heart className={`w-4 h-4 ${saved ? 'fill-[#FDE047]' : 'fill-[#D8261C]/15'}`} />
          </button>
        </div>

        {/* Bottom Image Overlay Details */}
        <div className="absolute bottom-3 left-3 right-3 z-10 text-white">
          <div className="flex items-center gap-1.5 text-xs text-[#FDE047] font-semibold mb-1 drop-shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>{pandal.locality}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold font-editorial text-white line-clamp-1 drop-shadow-sm group-hover:text-[#FEF08A] transition-colors">
            {pandal.name}
          </h3>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Theme preview */}
          <div className="mb-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#B45309] font-bold">
              Theme / Art
            </span>
            <p className="text-xs sm:text-sm text-[#1C1917] font-medium line-clamp-2 mt-0.5 leading-relaxed">
              {pandal.theme}
            </p>
          </div>

          {/* Metro & Transit Connection (Marigold & White) */}
          <div className="p-3 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] mb-3.5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 font-bold text-xs shadow-xs">
                M
              </div>
              <div className="truncate">
                <span className="text-[10px] text-[#78716C] block font-semibold leading-tight">Nearest Metro</span>
                <span className="font-bold text-[#1C1917] truncate block">
                  {pandal.nearest_metro}
                </span>
              </div>
            </div>
            <div className="text-right shrink-0 pl-2">
              <span className="text-[10px] text-[#78716C] block font-semibold leading-tight">Walk</span>
              <span className="font-bold text-[#D8261C]">
                {pandal.walking_time_mins} min ({pandal.walking_distance.split(' ')[0]})
              </span>
            </div>
          </div>

          {/* Crowd & Best Time indicators */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${getCrowdBg(pandal.crowd_status.level)}`}>
              <span className={`w-2 h-2 rounded-full ${getCrowdDot(pandal.crowd_status.level)}`} />
              <span className="font-semibold capitalize">{pandal.crowd_status.level} Crowd</span>
              <span className="text-[9px] opacity-75">({pandal.crowd_status.source})</span>
            </div>

            <div className="flex items-center gap-1 text-[#57534E]">
              <Clock className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span className="truncate max-w-[130px] font-medium">{pandal.best_time.split('or')[0]}</span>
            </div>
          </div>
        </div>

        {/* Footer Action Buttons */}
        <div className="pt-3 border-t border-[#FEE2E2] flex items-center gap-2">
          
          <Link
            href={`/pandal/${pandal.slug}`}
            className="flex-1 py-2.5 px-3 rounded-xl bg-[#D8261C] hover:bg-[#B91C1C] text-white text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow-md shadow-[#D8261C]/25 transition-all active:scale-98"
          >
            <span>View Pandal</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#FDE047]" />
          </Link>

          <a
            href={exactMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Open Exact Google Maps Coordinates"
            className="py-2.5 px-3 rounded-xl border border-[#FED7AA] bg-white hover:bg-[#FFFBEB] text-[#1C1917] text-xs font-bold flex items-center justify-center gap-1.5 transition-all hover:border-[#D8261C] active:scale-98"
          >
            <MapPin className="w-3.5 h-3.5 text-[#D8261C]" />
            <span className="hidden sm:inline">Google Maps</span>
            <ExternalLink className="w-3 h-3 text-[#78716C]" />
          </a>

        </div>

      </div>
    </div>
  );
}
