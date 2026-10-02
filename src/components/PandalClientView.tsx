'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Pandal } from '@/types';
import { PANDALS_DATA } from '@/data/pandals';
import { useWishlist } from '@/context/WishlistContext';
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
import InstagramIcon from '@/components/icons/InstagramIcon';
import PandalCard from '@/components/PandalCard';

interface PandalClientViewProps {
  pandal: Pandal;
}

export default function PandalClientView({ pandal }: PandalClientViewProps) {
  const { isSaved, toggleWishlist } = useWishlist();
  const [copied, setCopied] = useState(false);
  const [activeGalleryTab, setActiveGalleryTab] = useState<'all' | 'official' | 'latest' | 'instagram' | 'community'>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const saved = isSaved(pandal.id);

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <Link
          href="/pandals"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8E857B] hover:text-[#181513] dark:text-stone-400 dark:hover:text-white transition-all duration-150 hover:-translate-x-1 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-150" />
          <span>Back to All Pandals</span>
        </Link>
      </div>

      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-3xl overflow-hidden shadow-lg border border-[#E9E2D8] dark:border-white/10">
          <Image
            src={pandal.featured_image}
            alt={pandal.name}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10" />

          {/* Top Hero Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/95 dark:bg-stone-900/90 text-[#181513] dark:text-stone-100 backdrop-blur-md shadow-sm border border-transparent dark:border-white/10">
                {pandal.area}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/50 text-white backdrop-blur-md border border-white/20">
                {pandal.locality}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Share */}
              <button
                onClick={handleShare}
                aria-label="Share Pandal details"
                className="p-3 rounded-full bg-white/90 hover:bg-white dark:bg-stone-900/90 dark:hover:bg-stone-900 text-[#181513] dark:text-stone-200 backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-85 shadow-sm hover:shadow-md cursor-pointer border border-transparent dark:border-white/10 group"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Forward className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />}
              </button>

              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(pandal.id)}
                aria-label={saved ? 'Saved in wishlist' : 'Save to wishlist'}
                className={`p-3 rounded-full backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-85 shadow-sm hover:shadow-md cursor-pointer ${
                  saved
                    ? 'bg-[#D43827] text-white shadow-md'
                    : 'bg-white/90 hover:bg-white dark:bg-stone-900/90 dark:hover:bg-stone-900 text-[#181513] dark:text-stone-200 border border-transparent dark:border-white/10'
                }`}
              >
                <Heart className={`w-4 h-4 transition-transform duration-150 active:scale-125 ${saved ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          {/* Bottom Hero Info & Primary Action Overlay */}
          <div className="absolute bottom-6 left-6 right-6 z-10 text-white flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs text-amber-300 font-medium">
                <Sparkles className="w-4 h-4" />
                <span>{pandal.puja_committee}</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold font-editorial text-white tracking-tight">
                {pandal.name}
              </h1>
              <p className="text-xs sm:text-sm text-stone-200 line-clamp-2">
                {pandal.theme}
              </p>
            </div>

            {/* Direct Google Maps Navigation Button */}
            <div className="flex items-center gap-3 shrink-0">
              <a
                href={exactMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-2xl bg-[#D8261C] hover:bg-[#B91C1C] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xl shadow-[#D8261C]/40 hover:shadow-2xl hover:scale-[1.03] active:scale-95 transition-all duration-200 group"
              >
                <MapPin className="w-4 h-4 text-[#FDE047] group-hover:-translate-y-0.5 transition-transform duration-200" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN DETAIL GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-12 gap-8 items-start">
          
          {/* Left Column (8 cols): About, Theme, Gallery */}
          <div className="col-span-12 lg:col-span-8 space-y-8">
            
            {/* About & History */}
            <div className="bg-white dark:bg-[#1A1218] rounded-3xl border border-[#E9E2D8] dark:border-white/10 p-6 sm:p-8 shadow-xs space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D43827] dark:text-rose-400 font-semibold">
                Overview
              </span>
              <h2 className="text-2xl font-bold font-editorial text-[#181513] dark:text-white">
                About {pandal.name}
              </h2>
              <p className="text-sm sm:text-base text-[#5C554E] dark:text-stone-300 leading-relaxed">
                {pandal.description}
              </p>
              {pandal.heritage_note && (
                <div className="p-4 rounded-2xl bg-[#FAF8F5] dark:bg-white/[0.04] border border-[#EBE3D8] dark:border-white/10 text-xs text-[#5C554E] dark:text-stone-300 leading-relaxed">
                  <span className="font-bold text-[#181513] dark:text-stone-100 block mb-1">Cultural Heritage:</span>
                  {pandal.heritage_note}
                </div>
              )}
            </div>

            {/* 2026 Theme */}
            <div className="bg-white dark:bg-[#1A1218] rounded-3xl border border-[#E9E2D8] dark:border-white/10 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-[#D43827] dark:text-rose-400 font-semibold">
                  Artistic Concept
                </span>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900/50">
                  2026 Preview
                </span>
              </div>
              <h2 className="text-2xl font-bold font-editorial text-[#181513] dark:text-white">
                Thematic Architecture & Artistry
              </h2>
              <p className="text-sm sm:text-base text-[#5C554E] dark:text-stone-300 leading-relaxed">
                {pandal.theme}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {pandal.tags.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full bg-[#FFFBEB] dark:bg-amber-950/30 border border-[#FED7AA] dark:border-amber-900/40 text-xs font-bold text-[#B45309] dark:text-amber-400"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* PANDAL PHOTO GALLERY (Section 10) */}
            <div className="bg-white dark:bg-[#1A1218] rounded-3xl border border-[#E9E2D8] dark:border-white/10 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#D43827] dark:text-rose-400 font-semibold">
                    Visual Archive
                  </span>
                  <h2 className="text-2xl font-bold font-editorial text-[#181513] dark:text-white mt-0.5">
                    Pandal Photo Gallery
                  </h2>
                </div>

                {/* Gallery category tabs */}
                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1">
                  {[
                    { id: 'all', label: 'All Photos' },
                    { id: 'official', label: 'Official' },
                    { id: 'latest', label: 'Latest' },
                    { id: 'instagram', label: 'Instagram' },
                    { id: 'community', label: 'Community' }
                  ].map((tab) => {
                    const isSelected = activeGalleryTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveGalleryTab(tab.id as any)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer ${
                          isSelected
                            ? 'bg-[#D8261C] text-white shadow-xs'
                            : 'bg-[#FFFDF9] dark:bg-white/[0.05] text-[#57534E] dark:text-stone-300 hover:text-[#D8261C] dark:hover:text-white hover:bg-[#FEF2F2] dark:hover:bg-white/10'
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {filteredGalleryItems.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    onClick={() => {
                      setLightboxIndex(idx);
                      setLightboxOpen(true);
                    }}
                    className="group relative aspect-square rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-900 cursor-pointer border border-[#E9E2D8] dark:border-white/10 hover:shadow-xl hover:-translate-y-1 active:scale-[0.98] transition-all duration-300"
                  >
                    <Image
                      src={item.media_url || item.url}
                      alt={item.caption || pandal.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-112"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                      <p className="text-[11px] text-white line-clamp-1 font-medium">
                        {item.caption || pandal.name}
                      </p>
                    </div>
                    {item.permalink && (
                      <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white backdrop-blur-sm group-hover:scale-110 transition-transform duration-200">
                        <InstagramIcon className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column (4 cols): Sticky How to Reach, Crowd status, Timing, Best Time */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            
            {/* HOW TO REACH (Section 5) */}
            <div className="bg-white dark:bg-[#1A1218] rounded-3xl border border-[#E9E2D8] dark:border-white/10 p-6 shadow-xs space-y-5">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D43827] dark:text-rose-400 font-semibold">
                Transit Guide
              </span>
              <h3 className="text-xl font-bold font-editorial text-[#181513] dark:text-white">
                How to Reach
              </h3>

              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-[#FFFBEB] dark:bg-white/[0.04] border border-[#FDE68A] dark:border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 font-bold shadow-xs">
                      M
                    </div>
                    <div>
                      <span className="text-[10px] text-[#78716C] dark:text-stone-400 block font-semibold uppercase">
                        Nearest Metro
                      </span>
                      <span className="text-xs font-bold text-[#1C1917] dark:text-stone-100">
                        {pandal.nearest_metro}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  <div className="p-3 rounded-2xl bg-[#FFFBEB] dark:bg-white/[0.04] border border-[#FDE68A] dark:border-white/10 text-center">
                    <span className="text-[10px] text-[#78716C] dark:text-stone-400 block font-semibold uppercase tracking-wider">
                      Time
                    </span>
                    <span className="text-sm font-bold text-[#D8261C] dark:text-rose-400">
                      {pandal.walking_time_mins} min
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#FFFBEB] dark:bg-white/[0.04] border border-[#FDE68A] dark:border-white/10 text-center">
                    <span className="text-[10px] text-[#78716C] dark:text-stone-400 block font-semibold uppercase tracking-wider">
                      Steps
                    </span>
                    <span className="text-sm font-bold text-amber-700 dark:text-amber-400">
                      ~{Math.round(pandal.walking_time_mins * 125).toLocaleString()}
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#FFFBEB] dark:bg-white/[0.04] border border-[#FDE68A] dark:border-white/10 text-center">
                    <span className="text-[10px] text-[#78716C] dark:text-stone-400 block font-semibold uppercase tracking-wider">
                      Distance
                    </span>
                    <span className="text-sm font-bold text-[#1C1917] dark:text-stone-100">
                      {pandal.walking_distance.split(' ')[0]}
                    </span>
                  </div>
                </div>
              </div>

              {/* PROMINENT "CHECK OUT IN GOOGLE MAPS →" BUTTON (Section 5) */}
              <a
                href={exactMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-4 rounded-2xl bg-[#D8261C] hover:bg-[#B91C1C] text-white text-xs font-bold tracking-wider uppercase text-center flex items-center justify-center gap-2 shadow-lg shadow-[#D8261C]/35 hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer group"
              >
                <span>CHECK OUT IN GOOGLE MAPS</span>
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </a>

              <a
                href={metroDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-xl border border-[#FED7AA] dark:border-white/10 bg-white dark:bg-white/[0.04] hover:bg-[#FFFBEB] dark:hover:bg-white/[0.08] hover:border-[#D8261C]/50 hover:scale-[1.02] active:scale-95 text-xs font-bold text-center flex items-center justify-center gap-1.5 text-[#1C1917] dark:text-stone-200 transition-all duration-200 cursor-pointer group"
              >
                <Footprints className="w-3.5 h-3.5 text-[#F59E0B] group-hover:scale-125 transition-transform duration-200" />
                <span>Walking Route from Metro Station</span>
              </a>

            </div>

            {/* CROWD STATUS & TIMING (Section 15) */}
            <div className="bg-white dark:bg-[#1A1218] rounded-3xl border border-[#E9E2D8] dark:border-white/10 p-6 shadow-xs space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D43827] dark:text-rose-400 font-semibold">
                Crowd & Best Time
              </span>

              {/* Crowd Indicator */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8E857B] dark:text-stone-400">Current Crowd Level:</span>
                  <span className="text-[10px] font-mono text-[#8E857B] dark:text-stone-400">
                    {pandal.crowd_status.last_updated}
                  </span>
                </div>

                <div className={`p-3 rounded-2xl border flex items-center justify-between ${getCrowdBg(pandal.crowd_status.level)}`}>
                  <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
                    <span className="w-2.5 h-2.5 rounded-full bg-current" />
                    <span>{pandal.crowd_status.level} Crowd</span>
                  </div>
                  <span className="text-[10px] font-mono font-semibold">
                    {pandal.crowd_status.source}
                  </span>
                </div>

                {pandal.crowd_status.notes && (
                  <p className="text-[11px] text-[#5C554E] dark:text-stone-300 italic pt-1">
                    &ldquo;{pandal.crowd_status.notes}&rdquo;
                  </p>
                )}
              </div>

              {/* Best Visiting Time */}
              <div className="pt-3 border-t border-[#EBE3D8] dark:border-white/10 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#8E857B] dark:text-stone-400 font-semibold">
                  Recommended Visiting Window:
                </span>
                <p className="text-xs font-medium text-[#181513] dark:text-stone-100 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#C99726]" />
                  <span>{pandal.best_time}</span>
                </p>
              </div>

              {/* Recommended Days */}
              <div className="pt-3 border-t border-[#EBE3D8] dark:border-white/10 space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#8E857B] dark:text-stone-400 font-semibold">
                  Optimal Days:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {pandal.recommended_days.map((day) => (
                    <span
                      key={day}
                      className="px-2.5 py-0.5 rounded-lg bg-[#FAF8F5] dark:bg-white/[0.04] border border-[#E2DAD0] dark:border-white/10 text-[11px] font-medium text-[#181513] dark:text-stone-200"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>

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
