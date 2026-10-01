'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Pandal } from '@/types';
import { useWishlist } from '@/context/WishlistContext';
import { Heart, MapPin, Train, ExternalLink, Clock, Users, ArrowUpRight } from 'lucide-react';
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
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'heavy':
        return 'bg-rose-50 text-rose-700 border-rose-200';
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
    <div className="group relative flex flex-col bg-white rounded-2xl border border-[#EBE3D8] overflow-hidden shadow-sm hover:shadow-xl hover:border-[#D8CEBF] transition-all duration-300">
      
      {/* Media Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
        <Image
          src={pandal.featured_image}
          alt={pandal.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md bg-white/90 text-[#181513] shadow-sm">
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
                ? 'bg-[#D43827] text-white shadow-md'
                : 'bg-white/80 text-[#181513] hover:bg-white hover:text-[#D43827]'
            }`}
          >
            <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Bottom Image Overlay Details */}
        <div className="absolute bottom-3 left-3 right-3 z-10 text-white">
          <div className="flex items-center gap-1.5 text-xs text-amber-300 font-medium mb-1 drop-shadow-sm">
            <MapPin className="w-3.5 h-3.5" />
            <span>{pandal.locality}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold font-editorial text-white line-clamp-1 drop-shadow-sm group-hover:text-amber-100 transition-colors">
            {pandal.name}
          </h3>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Theme preview */}
          <div className="mb-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#8E857B] font-semibold">
              Theme / Art
            </span>
            <p className="text-xs sm:text-sm text-[#181513] font-medium line-clamp-2 mt-0.5">
              {pandal.theme}
            </p>
          </div>

          {/* Metro & Transit Connection */}
          <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#EFE9DF] mb-3.5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                <Train className="w-4 h-4" />
              </div>
              <div className="truncate">
                <span className="text-[10px] text-[#8E857B] block leading-tight">Nearest Metro</span>
                <span className="font-semibold text-[#181513] truncate block">
                  {pandal.nearest_metro}
                </span>
              </div>
            </div>
            <div className="text-right shrink-0 pl-2">
              <span className="text-[10px] text-[#8E857B] block leading-tight">Walk</span>
              <span className="font-semibold text-[#D43827]">
                {pandal.walking_time_mins} min ({pandal.walking_distance.split(' ')[0]})
              </span>
            </div>
          </div>

          {/* Crowd & Best Time indicators */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4 text-[11px]">
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${getCrowdBg(pandal.crowd_status.level)}`}>
              <span className={`w-2 h-2 rounded-full ${getCrowdDot(pandal.crowd_status.level)}`} />
              <span className="font-medium capitalize">{pandal.crowd_status.level} Crowd</span>
              <span className="text-[9px] opacity-75">({pandal.crowd_status.source})</span>
            </div>

            <div className="flex items-center gap-1 text-[#5C554E]">
              <Clock className="w-3.5 h-3.5 text-[#8E857B]" />
              <span className="truncate max-w-[130px]">{pandal.best_time.split('or')[0]}</span>
            </div>
          </div>
        </div>

        {/* Footer Action Buttons */}
        <div className="pt-3 border-t border-[#EBE3D8] flex items-center gap-2">
          
          <Link
            href={`/pandal/${pandal.slug}`}
            className="flex-1 py-2.5 px-3 rounded-xl bg-[#181513] hover:bg-[#2A2623] text-white text-xs font-semibold text-center flex items-center justify-center gap-1 transition-all active:scale-98"
          >
            <span>View Pandal</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-amber-300" />
          </Link>

          <a
            href={exactMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Open Exact Google Maps Coordinates"
            className="py-2.5 px-3 rounded-xl border border-[#D8CEBF] bg-[#FAF8F5] hover:bg-white text-[#181513] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all hover:border-[#D43827] active:scale-98"
          >
            <MapPin className="w-3.5 h-3.5 text-[#D43827]" />
            <span className="hidden sm:inline">Google Maps</span>
            <ExternalLink className="w-3 h-3 text-[#8E857B]" />
          </a>

        </div>

      </div>
    </div>
  );
}
