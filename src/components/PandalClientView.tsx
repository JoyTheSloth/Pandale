'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Pandal } from '@/types';
import { PANDALS_DATA } from '@/data/pandals';
import { useWishlist } from '@/context/WishlistContext';
import { useVisited } from '@/context/VisitedContext';
import { buildGoogleMapsUrl, buildDirectionsUrl } from '@/lib/geo';
import GalleryLightbox from '@/components/GalleryLightbox';
import { 
  Heart, 
  MapPin, 
  Train, 
  Clock, 
  Forward, 
  ExternalLink, 
  ArrowLeft, 
  Sparkles, 
  Check, 
  Footprints
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import InstagramIcon from '@/components/icons/InstagramIcon';
import PandalCard from '@/components/PandalCard';

interface PandalClientViewProps {
  pandal: Pandal;
}

export default function PandalClientView({ pandal }: PandalClientViewProps) {
  const router = useRouter();
  const { isSaved, toggleWishlist } = useWishlist();
  const { isVisited, toggleVisited } = useVisited();
  const [copied, setCopied] = useState(false);
  const [activeGalleryTab, setActiveGalleryTab] = useState<'all' | 'official' | 'latest' | 'instagram' | 'community'>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  const saved = isSaved(pandal.id);
  const visited = isVisited(pandal.id);

  // Exact Google Maps location link (place name in search bar)
  const exactMapsUrl = buildGoogleMapsUrl(
    pandal.latitude,
    pandal.longitude,
    pandal.google_place_id,
    pandal.locality ? `${pandal.name}, ${pandal.locality}` : pandal.name
  );

  // Directions from nearest metro
  const metroDirectionsUrl = buildDirectionsUrl(
    pandal.latitude,
    pandal.longitude,
    `${pandal.nearest_metro} Metro Station, Kolkata`,
    'walking',
    pandal.name
  );

  // Share functionality
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${pandal.name} — Pujo 2026 Kolkata Guide`,
          text: `Check out ${pandal.name} for Durga Puja 2026! Nearest Metro: ${pandal.nearest_metro} (${pandal.walking_distance})`,
          url: window.location.href,
        });
      } catch (err) {
        // Ignored if cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Combine gallery items: official images + latest instagram posts
  const allGalleryItems = useMemo(() => {
    const list: any[] = [];
    (pandal.images || []).forEach((img) => list.push({ ...img, type: img.category }));
    (pandal.latest_images || []).forEach((post) => list.push({ ...post, type: 'instagram' }));
    return list;
  }, [pandal]);

  const filteredGalleryItems = useMemo(() => {
    if (activeGalleryTab === 'all') return allGalleryItems;
    return allGalleryItems.filter((item) => item.type === activeGalleryTab);
  }, [activeGalleryTab, allGalleryItems]);

  // Nearby recommended pandals
  const nearbyPandals = useMemo(() => {
    return PANDALS_DATA.filter((p) => p.id !== pandal.id && p.area === pandal.area).slice(0, 3);
  }, [pandal]);

  // Crowd helpers
  const getCrowdBg = (level: string) => {
    switch (level) {
      case 'low': return 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/50';
      case 'moderate': return 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-900/50';
      case 'heavy': return 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-900/50';
      default: return 'bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-white/10';
    }
  };

  return (
    <div className="w-full pb-20">
      
      {/* Back button & Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2 flex items-center justify-between">
        <button
          type="button"
          onClick={handleBack}
          aria-label="Back to previous page"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-700 hover:text-stone-950 dark:text-stone-300 dark:hover:text-white px-3 py-1.5 rounded-full bg-white/90 hover:bg-white dark:bg-stone-900/90 dark:hover:bg-stone-800 transition-all duration-150 hover:-translate-x-0.5 active:scale-95 cursor-pointer shadow-xs border border-stone-200 dark:border-white/10 group"
        >
          <ArrowLeft className="w-4 h-4 text-[#D8261C] group-hover:-translate-x-0.5 transition-transform duration-150" />
          <span>Back</span>
        </button>

        <Link
          href="/pandals"
          className="text-xs font-semibold text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white transition-colors"
        >
          All Pandals →
        </Link>
      </div>

      {/* 1. HERO SECTION */}
      {/* 1. HERO SECTION (Compact & Ergonomic) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-1">
        <div className="relative aspect-[16/9] sm:aspect-[24/9] max-h-[360px] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border border-[#E9E2D8] dark:border-white/10">
          <Image
            src={pandal.featured_image}
            alt={pandal.name}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

          {/* Top Hero Floating Badges & Action Buttons */}
          <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#D8261C] text-white shadow-xs">
                {pandal.area}
              </span>
              <span className="hidden sm:inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-black/60 text-stone-200 backdrop-blur-md border border-white/20">
                {pandal.locality}
              </span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Google Maps Location Button */}
              <a
                href={exactMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open in Google Maps"
                title="Open location in Google Maps"
                className="p-2.5 rounded-full bg-black/60 hover:bg-[#D8261C] text-white backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-90 shadow-sm cursor-pointer border border-white/20 flex items-center justify-center group"
              >
                <MapPin className="w-4 h-4 text-[#FDE047] group-hover:scale-110 transition-transform" />
              </a>

              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(pandal.id)}
                aria-label={saved ? 'Saved in wishlist' : 'Save to wishlist'}
                className={`p-2.5 rounded-full backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-90 shadow-sm cursor-pointer border ${
                  saved
                    ? 'bg-[#D43827] text-white border-red-500 shadow-md'
                    : 'bg-black/60 hover:bg-black/80 text-white border-white/20'
                }`}
              >
                <Heart className={`w-4 h-4 ${saved ? 'fill-current text-white' : 'text-white'}`} />
              </button>
            </div>
          </div>

          {/* Bottom Hero Info Bar */}
          <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5 z-10 text-white">
            <div className="space-y-1 max-w-3xl">
              <div className="flex items-center gap-2 text-xs text-amber-300 font-medium">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{pandal.puja_committee}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-bold font-editorial text-white tracking-tight leading-tight">
                {pandal.name}
              </h1>
              <p className="text-xs sm:text-sm text-stone-200 line-clamp-1 font-medium">
                {pandal.theme}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THREE COMPACT CARDS IN ONE ROW (Grid 1x3 on desktop) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 items-stretch">
          
          {/* CARD 1: 2026 Theme & Overview */}
          <div className="bg-white dark:bg-[#1A1218] rounded-2xl border border-[#E9E2D8] dark:border-white/10 p-5 shadow-xs flex flex-col justify-between gap-4">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#D8261C] dark:text-rose-400 font-bold block">
                2026 Theme & Story
              </span>

              {/* Theme badge */}
              <div className="p-3 rounded-xl bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/20">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#D8261C] dark:text-amber-400 font-bold block mb-0.5">
                  Concept Theme
                </span>
                <p className="text-sm font-bold text-stone-900 dark:text-stone-100 leading-snug">
                  {pandal.theme}
                </p>
              </div>

              {/* Description */}
              <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed font-medium">
                {pandal.description}
              </p>

              {pandal.heritage_note && (
                <p className="text-[11px] text-stone-500 dark:text-stone-400 pt-2 border-t border-stone-100 dark:border-white/5 italic">
                  <span className="font-semibold text-stone-700 dark:text-stone-300 not-italic mr-1">Heritage:</span>
                  {pandal.heritage_note}
                </p>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-stone-100 dark:border-white/5">
              {pandal.tags.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-white/10 text-[10px] font-semibold text-stone-700 dark:text-stone-300"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>

          {/* CARD 2: Transit & Walking Route */}
          <div className="bg-white dark:bg-[#1A1218] rounded-2xl border border-[#E9E2D8] dark:border-white/10 p-5 shadow-xs flex flex-col justify-between gap-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-bold">
                  Transit & Metro
                </span>
                <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400 truncate max-w-[140px]">
                  {pandal.locality}
                </span>
              </div>

              {/* Metro Station Card */}
              <div className="p-3.5 rounded-xl bg-blue-500/10 dark:bg-blue-400/10 border border-blue-500/20 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 font-bold text-xs shadow-xs">
                    M
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] text-stone-500 dark:text-stone-400 block font-semibold uppercase">
                      Nearest Station
                    </span>
                    <span className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate block">
                      {pandal.nearest_metro}
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-[#D8261C] dark:text-amber-400 block">
                    {pandal.walking_time_mins} mins
                  </span>
                  <span className="text-[10px] text-stone-500 dark:text-stone-400 font-medium">
                    {pandal.walking_distance}
                  </span>
                </div>
              </div>

              {/* Walking distance metrics */}
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/5">
                  <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400 uppercase block">Walking Time</span>
                  <span className="text-xs font-bold text-stone-900 dark:text-stone-100">~{pandal.walking_time_mins} minutes</span>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/5">
                  <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400 uppercase block">Distance</span>
                  <span className="text-xs font-bold text-stone-900 dark:text-stone-100">{pandal.walking_distance}</span>
                </div>
              </div>
            </div>

            {/* Direct Directions Actions */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-100 dark:border-white/5">
              <a
                href={exactMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl bg-[#D8261C] hover:bg-[#B91C1C] text-white text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-[#FDE047]" />
                <span>Google Maps</span>
              </a>
              <a
                href={metroDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl border border-stone-200 dark:border-white/10 bg-stone-50 dark:bg-white/5 hover:bg-stone-100 dark:hover:bg-white/10 text-xs font-bold text-center flex items-center justify-center gap-1.5 text-stone-800 dark:text-stone-200 active:scale-95 transition-all cursor-pointer"
              >
                <Footprints className="w-3.5 h-3.5 text-amber-500" />
                <span>Metro Route</span>
              </a>
            </div>
          </div>

          {/* CARD 3: Visiting Advice, Crowd & Best Timing */}
          <div className="bg-white dark:bg-[#1A1218] rounded-2xl border border-[#E9E2D8] dark:border-white/10 p-5 shadow-xs flex flex-col justify-between gap-4">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-bold block">
                Visiting Advice
              </span>

              {/* Crowd status pill */}
              <div className={`p-2.5 rounded-xl border flex items-center justify-between ${getCrowdBg(pandal.crowd_status.level)}`}>
                <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                  <span>{pandal.crowd_status.level} Crowd</span>
                </div>
                <span className="text-[10px] font-mono opacity-80">
                  {pandal.crowd_status.last_updated}
                </span>
              </div>

              {/* Best Time row */}
              <div className="p-3 rounded-xl bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 font-semibold block mb-1">
                  Best Time to Visit
                </span>
                <p className="text-xs font-medium text-stone-800 dark:text-stone-200 flex items-start gap-1.5 leading-snug">
                  <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>{pandal.best_time}</span>
                </p>
              </div>

              {/* Recommended Days */}
              <div className="p-3 rounded-xl bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 font-semibold block mb-1.5">
                  Recommended Days
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {pandal.recommended_days.map((day) => (
                    <span
                      key={day}
                      className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-white dark:bg-stone-800 border border-stone-200/80 dark:border-white/10 text-stone-800 dark:text-stone-200"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Committee footer */}
            <div className="pt-2 border-t border-stone-100 dark:border-white/5 text-[11px] text-stone-500 dark:text-stone-400 truncate">
              Organized by <span className="font-semibold text-stone-700 dark:text-stone-300">{pandal.puja_committee}</span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. NEARBY PANDALS */}
      {nearbyPandals.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#E9E2D8] dark:border-white/10">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#D43827] dark:text-rose-400 font-semibold">
                Explore More
              </span>
              <h2 className="text-2xl font-bold font-editorial text-[#181513] dark:text-white mt-0.5">
                Nearby in {pandal.area}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {nearbyPandals.map((p) => (
              <PandalCard key={p.id} pandal={p} />
            ))}
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      <GalleryLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={filteredGalleryItems}
        currentIndex={lightboxIndex}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />

    </div>
  );
}
