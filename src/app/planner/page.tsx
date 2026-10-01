'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PANDALS_DATA } from '@/data/pandals';
import { useWishlist } from '@/context/WishlistContext';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Route, 
  Plus, 
  Trash2, 
  ArrowDown, 
  ArrowUp,
  MapPin, 
  Train, 
  Footprints, 
  Clock, 
  ExternalLink, 
  Sparkles,
  Share2,
  Check,
  Search,
  X,
  Compass,
  RotateCcw,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { calculateDistanceKm, formatDistance, buildGoogleMapsUrl } from '@/lib/geo';
import { ZoneArea, Pandal } from '@/types';

// Preset curated pujo itineraries for instant 1-click loading
const PRESET_CIRCUITS = [
  {
    id: 'north-heritage',
    title: 'North Heritage Circuit',
    bengaliTitle: 'উত্তর কলকাতা ঐতিহ্য পরিক্রমা',
    icon: '🏛️',
    stopsCount: 4,
    image: '/brand/circuit-north-heritage.jpg',
    description: 'Bagbazar, Kumartuli, Ahiritola & Sovabazar',
    ids: ['bagbazar-sarbojanin', 'kumartuli-park', 'ahiritola-sarbojanin', 'sovabazar-rajbari']
  },
  {
    id: 'south-iconic',
    title: 'South Iconic Circuit',
    bengaliTitle: 'দক্ষিণ কলকাতা আইকনিক পরিক্রমা',
    icon: '✨',
    stopsCount: 5,
    image: '/brand/circuit-south-iconic.jpg',
    description: 'Maddox Square, Ekdalia, Singhi Park & Suruchi',
    ids: ['maddox-square', 'ekdalia-evergreen', 'singhi-park', 'suruchi-sangha', 'chetla-agrani']
  },
  {
    id: 'green-line',
    title: 'Green Line Metro Express',
    bengaliTitle: 'গ্রিন লাইন মেট্রো এক্সপ্রেস',
    icon: '🚇',
    stopsCount: 4,
    image: '/brand/circuit-green-line.jpg',
    description: 'Sealdah, FD Block, BJ Block & Sree Bhumi',
    ids: ['chaltabagan', 'salt-lake-fd-block', 'salt-lake-bj-block', 'sree-bhumi-sporting-club']
  },
  {
    id: 'central-classic',
    title: 'Central Classic Grandeur',
    bengaliTitle: 'সেন্ট্রাল ক্লাসিক গ্র্যান্ডিউর',
    icon: '👑',
    stopsCount: 3,
    image: '/brand/circuit-central-classic.jpg',
    description: 'College Square, Mohammad Ali & Santosh Mitra',
    ids: ['college-square', 'mohammad-ali-park', 'santosh-mitra-square']
  }
];

export default function RoutePlannerPage() {
  const { wishlist } = useWishlist();
  const { language } = useLanguage();
  const isBn = language === 'bn';

  // Selected pandal IDs in route order
  const [selectedIds, setSelectedIds] = useState<string[]>(() => {
    if (wishlist.length > 0) {
      return wishlist.slice(0, 5);
    }
    // Default starter itinerary
    return ['bagbazar-sarbojanin', 'kumartuli-park', 'college-square', 'maddox-square'];
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addSearchQuery, setAddSearchQuery] = useState('');
  const [selectedAddZone, setSelectedAddZone] = useState<ZoneArea | 'All'>('All');
  const [copied, setCopied] = useState(false);
  const [activePreset, setActivePreset] = useState<string | null>(null);

  // Ordered list of selected pandals
  const selectedPandals = useMemo(() => {
    return selectedIds
      .map((id) => PANDALS_DATA.find((p) => p.id === id))
      .filter(Boolean) as Pandal[];
  }, [selectedIds]);

  // Available pandals to add (filtered by modal search & zone)
  const availableToAdd = useMemo(() => {
    const unselected = PANDALS_DATA.filter((p) => !selectedIds.includes(p.id));
    return unselected.filter((p) => {
      const matchesZone = selectedAddZone === 'All' || p.area === selectedAddZone;
      const q = addSearchQuery.toLowerCase().trim();
      const matchesQuery = 
        !q || 
        p.name.toLowerCase().includes(q) || 
        p.locality.toLowerCase().includes(q) || 
        p.area.toLowerCase().includes(q) || 
        p.nearest_metro.toLowerCase().includes(q);
      return matchesZone && matchesQuery;
    });
  }, [selectedIds, selectedAddZone, addSearchQuery]);

  // Route calculations (distances & estimated hops)
  const routeStats = useMemo(() => {
    let totalKm = 0;
    for (let i = 0; i < selectedPandals.length - 1; i++) {
      const p1 = selectedPandals[i];
      const p2 = selectedPandals[i + 1];
      totalKm += calculateDistanceKm(p1.latitude, p1.longitude, p2.latitude, p2.longitude);
    }

    const estimatedMins = Math.round(totalKm * 12 + selectedPandals.length * 35); // transit + viewing time
    const totalSteps = Math.round(totalKm * 1350);

    return {
      totalDistance: totalKm.toFixed(1),
      estimatedHours: (estimatedMins / 60).toFixed(1),
      totalStops: selectedPandals.length,
      estimatedSteps: totalSteps.toLocaleString()
    };
  }, [selectedPandals]);

  // Handlers
  const handleAddPandal = (id: string) => {
    if (!selectedIds.includes(id)) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleRemovePandal = (id: string) => {
    setSelectedIds(selectedIds.filter((x) => x !== id));
    setActivePreset(null);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const copy = [...selectedIds];
    const temp = copy[index - 1];
    copy[index - 1] = copy[index];
    copy[index] = temp;
    setSelectedIds(copy);
    setActivePreset(null);
  };

  const handleMoveDown = (index: number) => {
    if (index === selectedIds.length - 1) return;
    const copy = [...selectedIds];
    const temp = copy[index + 1];
    copy[index + 1] = copy[index];
    copy[index] = temp;
    setSelectedIds(copy);
    setActivePreset(null);
  };

  const handleApplyPreset = (preset: typeof PRESET_CIRCUITS[0]) => {
    setSelectedIds(preset.ids);
    setActivePreset(preset.id);
  };

  const handleClearAll = () => {
    setSelectedIds([]);
    setActivePreset(null);
  };

  const handleShareRoute = async () => {
    const routeText = `My Kolkata Durga Puja 2026 Itinerary (${selectedPandals.length} stops):\n` +
      selectedPandals.map((p, idx) => `${idx + 1}. ${p.name} (${p.nearest_metro})`).join('\n') +
      `\n\nPlan your route with Pandalé Kolkata!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Pujo 2026 Itinerary | Pandalé',
          text: routeText,
          url: window.location.href,
        });
      } catch (err) {
        // User dismissed
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Build full multi-stop Google Maps URL
  const fullGoogleMapsRouteUrl = useMemo(() => {
    if (selectedPandals.length === 0) return 'https://maps.google.com';
    const origin = `${selectedPandals[0].latitude},${selectedPandals[0].longitude}`;
    const destination = `${selectedPandals[selectedPandals.length - 1].latitude},${selectedPandals[selectedPandals.length - 1].longitude}`;
    
    if (selectedPandals.length === 1) {
      return buildGoogleMapsUrl(
        selectedPandals[0].latitude, 
        selectedPandals[0].longitude, 
        selectedPandals[0].google_place_id, 
        selectedPandals[0].name
      );
    }

    if (selectedPandals.length === 2) {
      return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=transit`;
    }

    const waypoints = selectedPandals
      .slice(1, selectedPandals.length - 1)
      .map((p) => `${p.latitude},${p.longitude}`)
      .join('|');

    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${waypoints}&travelmode=transit`;
  }, [selectedPandals]);

  // Crowd pill styling helper
  const getCrowdBadge = (level: string) => {
    switch (level) {
      case 'low':
        return 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/50';
      case 'moderate':
        return 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-900/50';
      case 'heavy':
        return 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-900/50';
      default:
        return 'bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-white/10';
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
      
      {/* 1. Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200 dark:border-white/10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D8261C]/10 dark:bg-[#D8261C]/25 text-[#D8261C] dark:text-red-400 text-xs font-mono font-bold border border-[#D8261C]/20 dark:border-[#D8261C]/40">
            <Route className="w-3.5 h-3.5" />
            <span>{isBn ? 'স্মার্ট পুজো রুট প্ল্যানার' : 'Smart Pujo Route Planner 2026'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-editorial text-stone-900 dark:text-stone-50 tracking-tight">
            {isBn ? 'আমার পুজো পরিক্রমা' : 'Plan My Pujo Itinerary'}
          </h1>

          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed">
            {isBn 
              ? 'কলকাতা মেট্রো রুট, হাঁটার সময় ও মাল্টি-স্টপ গুগল ম্যাপস দিয়ে আপনার ব্যক্তিগত ঠাকুর দেখার পরিক্রমা সাজান।' 
              : 'Build your step-by-step Kolkata pandal hopping route with Metro connectivity, walking estimates, and seamless multi-stop Google Maps navigation.'
            }
          </p>
        </div>

        {/* Global Route CTAs */}
        <div className="flex items-center gap-2.5 flex-wrap shrink-0">
          {selectedPandals.length > 0 && (
            <>
              <button
                type="button"
                onClick={handleShareRoute}
                title="Share Itinerary"
                className="p-3 rounded-2xl bg-white dark:bg-[#1A1218] border border-stone-200 dark:border-white/10 hover:border-[#D8261C] dark:hover:border-white/20 text-stone-700 dark:text-stone-200 text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
                <span className="hidden sm:inline">{copied ? (isBn ? 'কপি হয়েছে!' : 'Copied!') : (isBn ? 'শেয়ার' : 'Share')}</span>
              </button>

              <a
                href={fullGoogleMapsRouteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#D8261C] to-[#B91C1C] hover:from-[#B91C1C] hover:to-[#991B1B] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-[#D8261C]/30 hover:shadow-xl transition-all active:scale-95"
              >
                <MapPin className="w-4 h-4 text-[#FDE047]" />
                <span>{isBn ? 'গুগল ম্যাপসে সম্পূর্ণ রুট দেখুন' : 'Open Entire Route in Maps'}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </>
          )}
        </div>
      </div>

      {/* 2. Preset Curated Circuits (Quick Loaders) */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono uppercase tracking-wider text-amber-900 dark:text-amber-400 font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{isBn ? 'জনপ্রিয় কিউরেটেড রুটসমূহ' : 'Popular Curated Circuits'}</span>
          </span>
          {selectedPandals.length > 0 && (
            <button
              onClick={handleClearAll}
              className="text-stone-500 hover:text-rose-600 dark:text-stone-400 dark:hover:text-rose-400 flex items-center gap-1 text-[11px] transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{isBn ? 'রুট পরিষ্কার করুন' : 'Clear Route'}</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {PRESET_CIRCUITS.map((preset) => {
            const isActive = activePreset === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleApplyPreset(preset)}
                className={`group aspect-square w-full rounded-3xl border text-left transition-all duration-300 relative overflow-hidden flex flex-col justify-between active:scale-95 shadow-md hover:shadow-xl ${
                  isActive
                    ? 'border-[#D8261C] ring-2 ring-[#D8261C] shadow-lg shadow-[#D8261C]/35 scale-[1.02]'
                    : 'border-stone-200/80 dark:border-white/10 hover:border-white/40'
                }`}
              >
                {/* Background Generated Image */}
                <Image
                  src={preset.image}
                  alt={preset.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Cinematic Vignette Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/30 group-hover:via-black/35 transition-colors" />

                {/* Top Row: Icon badge + Stops badge */}
                <div className="relative z-10 p-3 sm:p-4 flex items-start justify-between w-full">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-black/55 backdrop-blur-md border border-white/20 flex items-center justify-center text-lg sm:text-xl shadow-xs transition-transform group-hover:scale-110">
                    <span>{preset.icon}</span>
                  </div>
                  
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold backdrop-blur-md shadow-xs flex items-center gap-1 ${
                    isActive 
                      ? 'bg-[#D8261C] text-white border border-[#FDE047]/50 shadow-sm shadow-[#D8261C]/40' 
                      : 'bg-black/55 text-white/90 border border-white/20'
                  }`}>
                    {preset.stopsCount} {isBn ? 'স্টপ' : 'Stops'}
                  </span>
                </div>

                {/* Bottom Row: Content overlay */}
                <div className="relative z-10 p-3 sm:p-4 space-y-1 text-white">
                  <div className="font-bold text-xs sm:text-base font-editorial text-white group-hover:text-[#FDE047] transition-colors line-clamp-2 leading-tight drop-shadow-md">
                    {isBn ? preset.bengaliTitle : preset.title}
                  </div>
                  <p className="text-[10px] sm:text-xs text-stone-200 line-clamp-1 leading-snug drop-shadow-sm font-medium">
                    {preset.description}
                  </p>
                  <div className="pt-1 flex items-center gap-1 text-[10px] font-mono font-bold text-amber-300 drop-shadow-sm">
                    <span>{isActive ? (isBn ? '✓ সক্রিয় রুট' : '✓ Active Route') : (isBn ? 'রুট লোড করুন →' : 'Load Route →')}</span>
                  </div>
                </div>

                {/* Active Indicator Top Accent Bar */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#D8261C] via-[#FDE047] to-[#D8261C] z-20" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Itinerary Summary Stats Bar */}
      {selectedPandals.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-white dark:bg-[#1A1218] rounded-3xl border border-stone-200 dark:border-white/10 p-5 shadow-luxe">
          <div className="p-3 rounded-2xl bg-stone-50 dark:bg-white/[0.03] border border-transparent dark:border-white/5 text-center">
            <span className="text-[10px] uppercase font-mono tracking-widest text-stone-500 dark:text-stone-400 block font-bold mb-1">
              {isBn ? 'মোট প্যান্ডেল' : 'Total Stops'}
            </span>
            <span className="text-xl sm:text-2xl font-bold font-editorial text-stone-900 dark:text-white">
              {routeStats.totalStops} {isBn ? 'টি' : 'Pandals'}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-stone-50 dark:bg-white/[0.03] border border-transparent dark:border-white/5 text-center">
            <span className="text-[10px] uppercase font-mono tracking-widest text-stone-500 dark:text-stone-400 block font-bold mb-1">
              {isBn ? 'মোট দূরত্ব' : 'Transit Span'}
            </span>
            <span className="text-xl sm:text-2xl font-bold font-editorial text-[#D8261C] dark:text-red-400">
              {routeStats.totalDistance} km
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-stone-50 dark:bg-white/[0.03] border border-transparent dark:border-white/5 text-center">
            <span className="text-[10px] uppercase font-mono tracking-widest text-stone-500 dark:text-stone-400 block font-bold mb-1">
              {isBn ? 'আনুমানিক সময়' : 'Est. Duration'}
            </span>
            <span className="text-xl sm:text-2xl font-bold font-editorial text-amber-700 dark:text-amber-400">
              ~{routeStats.estimatedHours} hrs
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-stone-50 dark:bg-white/[0.03] border border-transparent dark:border-white/5 text-center">
            <span className="text-[10px] uppercase font-mono tracking-widest text-stone-500 dark:text-stone-400 block font-bold mb-1">
              {isBn ? 'আনুমানিক পদক্ষেপ' : 'Est. Steps'}
            </span>
            <span className="text-xl sm:text-2xl font-bold font-editorial text-stone-900 dark:text-white flex items-center justify-center gap-1">
              <Footprints className="w-4 h-4 text-[#D8261C]" />
              <span>~{routeStats.estimatedSteps}</span>
            </span>
          </div>
        </div>
      )}

      {/* 4. Step-by-Step Route Chain (Redesigned Cards & Connectors) */}
      {selectedPandals.length > 0 ? (
        <div className="space-y-4">
          {selectedPandals.map((pandal, index) => {
            const isFirst = index === 0;
            const isLast = index === selectedPandals.length - 1;
            const nextPandal = selectedPandals[index + 1];

            let distanceToNext = 0;
            if (nextPandal) {
              distanceToNext = calculateDistanceKm(
                pandal.latitude,
                pandal.longitude,
                nextPandal.latitude,
                nextPandal.longitude
              );
            }

            const exactMapsUrl = buildGoogleMapsUrl(
              pandal.latitude,
              pandal.longitude,
              pandal.google_place_id,
              pandal.name
            );

            return (
              <React.Fragment key={pandal.id}>
                {/* Redesigned Pandal Stop Card */}
                <div className="group relative bg-white dark:bg-[#1A1218] rounded-3xl border border-stone-200 dark:border-white/10 p-5 sm:p-6 shadow-luxe hover:border-[#D8261C]/50 dark:hover:border-white/20 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                    
                    {/* Visual Anchor & Details */}
                    <div className="flex items-start gap-4 flex-1">
                      
                      {/* Step Number Badge */}
                      <div className="flex flex-col items-center justify-center shrink-0">
                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#D8261C] to-[#991B1B] text-white flex items-center justify-center font-bold text-sm sm:text-base border border-[#FDE047]/40 shadow-md shadow-[#D8261C]/25 group-hover:scale-105 transition-transform">
                          {index + 1}
                        </div>
                        <span className="text-[9px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mt-1 font-semibold">
                          Stop {index + 1}
                        </span>
                      </div>

                      {/* Image Thumbnail with Aspect Ratio */}
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 bg-stone-100 dark:bg-stone-900 border border-stone-200/80 dark:border-white/10 shadow-xs">
                        <Image
                          src={pandal.featured_image}
                          alt={pandal.name}
                          fill
                          sizes="96px"
                          className="object-cover group-hover:scale-108 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                      </div>

                      {/* Info Content */}
                      <div className="space-y-1.5 flex-1 min-w-0">
                        {/* Chips Row */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FEF2F2] dark:bg-stone-900 text-[#D8261C] dark:text-red-400 border border-red-100 dark:border-white/10 flex items-center gap-1 shadow-2xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D8261C]" />
                            {pandal.area}
                          </span>
                          
                          <span className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-1 truncate font-mono">
                            <MapPin className="w-3 h-3 text-[#F59E0B]" />
                            {pandal.locality}
                          </span>

                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${getCrowdBadge(pandal.crowd_status.level)}`}>
                            {pandal.crowd_status.level.toUpperCase()} CROWD
                          </span>
                        </div>

                        {/* Title */}
                        <Link
                          href={`/pandal/${pandal.slug}`}
                          className="block text-base sm:text-xl font-bold font-editorial text-stone-900 dark:text-stone-50 hover:text-[#D8261C] dark:hover:text-amber-400 transition-colors line-clamp-1"
                        >
                          {pandal.name}
                        </Link>

                        {/* Theme line */}
                        <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-1">
                          {pandal.theme}
                        </p>

                        {/* Metro & Walk connection pill */}
                        <div className="inline-flex items-center gap-3 py-1 px-2.5 rounded-xl bg-stone-50 dark:bg-white/[0.04] border border-stone-200/60 dark:border-white/5 text-xs text-stone-700 dark:text-stone-300">
                          <span className="flex items-center gap-1.5 font-medium truncate">
                            <span className="w-4 h-4 rounded-md bg-blue-600 text-white font-bold text-[9px] flex items-center justify-center shrink-0">M</span>
                            <span className="truncate">{pandal.nearest_metro}</span>
                          </span>
                          <span className="text-stone-300 dark:text-stone-600">•</span>
                          <span className="flex items-center gap-1 text-[#D8261C] dark:text-red-400 font-bold shrink-0">
                            <Clock className="w-3 h-3 text-[#D8261C]" />
                            <span>{pandal.walking_time_mins} min</span>
                          </span>
                          <span className="hidden sm:inline text-stone-300 dark:text-stone-600">•</span>
                          <span className="hidden sm:flex items-center gap-1 text-amber-800 dark:text-amber-400 font-semibold shrink-0">
                            <Footprints className="w-3 h-3 text-amber-600" />
                            <span>~{Math.round(pandal.walking_time_mins * 125).toLocaleString()} steps</span>
                          </span>
                        </div>
                      </div>

                    </div>

                    {/* Action Bar (Re-order & Open Maps) */}
                    <div className="flex items-center justify-between md:justify-end gap-2 pt-3 md:pt-0 border-t md:border-t-0 border-stone-100 dark:border-white/5 shrink-0">
                      
                      {/* Reordering Controls */}
                      <div className="flex items-center gap-1 bg-stone-100 dark:bg-white/[0.04] p-1 rounded-2xl border border-stone-200 dark:border-white/10">
                        <button
                          type="button"
                          onClick={() => handleMoveUp(index)}
                          disabled={isFirst}
                          className="p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-white dark:hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                          title="Move earlier in route"
                          aria-label="Move up"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveDown(index)}
                          disabled={isLast}
                          className="p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-white dark:hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                          title="Move later in route"
                          aria-label="Move down"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Google Maps Coordinates */}
                      <a
                        href={exactMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-2xl border border-stone-200 dark:border-white/10 bg-white dark:bg-[#1A1218] hover:border-[#D8261C] dark:hover:border-white/20 text-stone-800 dark:text-stone-200 hover:text-[#D8261C] transition-all shadow-2xs"
                        title="View exact spot in Google Maps"
                        aria-label="View in Maps"
                      >
                        <MapPin className="w-4 h-4 text-[#D8261C]" />
                      </a>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => handleRemovePandal(pandal.id)}
                        className="p-3 rounded-2xl border border-stone-200 dark:border-white/10 bg-white dark:bg-[#1A1218] hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:border-rose-300 text-stone-500 hover:text-rose-600 transition-all shadow-2xs"
                        title="Remove from itinerary"
                        aria-label="Remove stop"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                    </div>

                  </div>
                </div>

                {/* Redesigned Transit Hop Connector */}
                {!isLast && nextPandal && (
                  <div className="flex flex-col items-center justify-center my-2 relative">
                    <div className="w-0.5 h-6 bg-gradient-to-b from-[#D8261C]/50 via-stone-300 dark:via-white/20 to-[#D8261C]/50" />
                    
                    <div className="my-1 px-4 py-2 rounded-2xl bg-white dark:bg-[#1A1218] border border-stone-200 dark:border-white/10 flex items-center gap-2.5 text-xs text-stone-700 dark:text-stone-300 shadow-md">
                      <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">
                        M
                      </div>
                      <span className="font-semibold">
                        {isBn ? 'মেট্রো বা ট্রানজিট সংযোগ:' : 'Transit Hop:'}
                      </span>
                      <span className="font-bold text-[#D8261C] dark:text-red-400">
                        {distanceToNext < 1 ? `${Math.round(distanceToNext * 1000)}m` : `${distanceToNext.toFixed(1)} km`}
                      </span>
                      <span className="text-stone-300 dark:text-stone-600">•</span>
                      <span className="text-stone-500 dark:text-stone-400 text-[11px]">
                        ~{Math.max(5, Math.round(distanceToNext * 10))} mins
                      </span>
                      <ArrowDown className="w-3.5 h-3.5 text-[#D8261C] dark:text-red-400 animate-bounce" />
                    </div>

                    <div className="w-0.5 h-6 bg-gradient-to-b from-[#D8261C]/50 via-stone-300 dark:via-white/20 to-[#D8261C]/50" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 bg-white dark:bg-[#1A1218] rounded-3xl border border-stone-200 dark:border-white/10 max-w-lg mx-auto space-y-4 my-8 shadow-luxe">
          <div className="w-14 h-14 rounded-2xl bg-[#D8261C]/10 dark:bg-[#D8261C]/25 text-[#D8261C] flex items-center justify-center mx-auto border border-[#D8261C]/30">
            <Route className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold font-editorial text-stone-900 dark:text-white">
            {isBn ? 'আপনার পরিক্রমা তালিকা ফাঁকা' : 'Your Itinerary is Empty'}
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
            {isBn 
              ? 'উপরের কিউরেটেড রুট থেকে একটি বেছে নিন অথবা নিজের পছন্দের প্যান্ডেল যোগ করে শুরু করুন।'
              : 'Pick one of our popular curated circuits above or add iconic pandals manually to build your route.'}
          </p>
          <div className="pt-2 flex items-center justify-center gap-3 flex-wrap">
            <button
              type="button"
              onClick={() => handleApplyPreset(PRESET_CIRCUITS[0])}
              className="px-5 py-2.5 rounded-xl bg-[#D8261C] text-white text-xs font-bold hover:bg-[#B91C1C] transition-all shadow-md active:scale-95"
            >
              {isBn ? 'উত্তর কলকাতা রুট যোগ করুন' : 'Load North Heritage Circuit'}
            </button>
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="px-5 py-2.5 rounded-xl border border-stone-200 dark:border-white/10 bg-white dark:bg-[#1A1218] text-stone-800 dark:text-stone-200 text-xs font-bold hover:border-[#D8261C] transition-all"
            >
              {isBn ? 'প্যান্ডেল খুঁজুন' : 'Search Pandals'}
            </button>
          </div>
        </div>
      )}

      {/* 5. Add Stop Button Bar */}
      <div className="pt-4 flex items-center justify-center">
        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="px-7 py-4 rounded-2xl bg-white dark:bg-[#1A1218] border-2 border-dashed border-[#D8261C]/60 hover:border-[#D8261C] text-stone-900 dark:text-stone-100 hover:text-[#D8261C] dark:hover:text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition-all hover:scale-102 active:scale-98"
        >
          <Plus className="w-5 h-5 text-[#D8261C]" />
          <span>{isBn ? 'পরিক্রমায় আরও প্যান্ডেল যোগ করুন' : 'Add Another Pandal to Itinerary'}</span>
        </button>
      </div>

      {/* 6. Searchable Add Pandal Modal / Drawer */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-2xl bg-white dark:bg-[#1A1218] rounded-3xl border border-stone-200 dark:border-white/10 shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-stone-200 dark:border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#D8261C] dark:text-amber-400 font-bold block">
                  {isBn ? 'প্যান্ডেল নির্বাচন' : 'Route Customizer'}
                </span>
                <h3 className="text-xl font-bold font-editorial text-stone-900 dark:text-white">
                  {isBn ? 'নতুন প্যান্ডেল যোগ করুন' : 'Add Pandal to Route'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 rounded-full text-stone-400 hover:text-stone-800 dark:hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Search & Filters */}
            <div className="p-5 border-b border-stone-200 dark:border-white/10 space-y-3 bg-stone-50/60 dark:bg-white/[0.02]">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  value={addSearchQuery}
                  onChange={(e) => setAddSearchQuery(e.target.value)}
                  placeholder={isBn ? 'প্যান্ডেল বা মেট্রো স্টেশন খুঁজুন...' : 'Search by pandal name, metro, locality...'}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#12090F] border border-stone-200 dark:border-white/10 text-xs sm:text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#D8261C]/30 focus:border-[#D8261C]"
                />
              </div>

              {/* Zone Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                {(['All', 'North Kolkata', 'South Kolkata', 'Central Kolkata', 'East Kolkata'] as const).map((zone) => {
                  const isSelected = selectedAddZone === zone;
                  return (
                    <button
                      key={zone}
                      type="button"
                      onClick={() => setSelectedAddZone(zone)}
                      className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all ${
                        isSelected
                          ? 'bg-[#D8261C] text-white shadow-xs'
                          : 'bg-white dark:bg-[#12090F] border border-stone-200 dark:border-white/10 text-stone-700 dark:text-stone-300 hover:border-[#D8261C]'
                      }`}
                    >
                      {zone === 'All' ? (isBn ? 'সব এলাকা' : 'All Zones') : zone}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Modal Pandals List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-2.5">
              {availableToAdd.length > 0 ? (
                availableToAdd.map((p) => (
                  <div
                    key={p.id}
                    className="p-3 rounded-2xl bg-stone-50 dark:bg-white/[0.03] border border-stone-200/80 dark:border-white/5 hover:border-[#D8261C]/40 dark:hover:border-white/15 flex items-center justify-between gap-3 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-stone-200 dark:border-white/10 bg-stone-100 dark:bg-stone-900">
                        <Image
                          src={p.featured_image}
                          alt={p.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold font-editorial text-stone-900 dark:text-white truncate">
                          {p.name}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                          <span className="text-[#D8261C] dark:text-red-400 font-semibold">{p.area}</span>
                          <span>•</span>
                          <span className="truncate">{p.nearest_metro}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddPandal(p.id)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#D8261C] hover:bg-[#B91C1C] text-white text-xs font-bold flex items-center gap-1 shadow-xs transition-colors shrink-0 active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{isBn ? 'যোগ করুন' : 'Add'}</span>
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-stone-500 dark:text-stone-400 text-xs">
                  {isBn ? 'কোনো প্যান্ডেল পাওয়া যায়নি।' : 'No matching unselected pandals found.'}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-stone-200 dark:border-white/10 flex items-center justify-between text-xs">
              <span className="text-stone-500 dark:text-stone-400">
                {selectedPandals.length} stops currently in itinerary
              </span>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-bold transition-all"
              >
                {isBn ? 'সম্পন্ন' : 'Done'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
