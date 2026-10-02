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
  ChevronDown,
  ChevronRight,
  ArrowRight,
  ArrowUpRight,
  Users
} from 'lucide-react';
import { calculateDistanceKm, formatDistance, buildGoogleMapsUrl } from '@/lib/geo';
import { ZoneArea, Pandal } from '@/types';

// Preset curated pujo itineraries for instant 1-click loading
const PRESET_CIRCUITS = [
  {
    id: 'north-heritage',
    title: 'North Kolkata',
    bengaliTitle: 'উত্তর কলকাতা',
    subtitle: 'Heritage, Sabeki & River Ghats',
    bengaliSubtitle: 'ঐতিহ্য, সাবেকিয়ানা ও গঙ্গার ঘাট',
    icon: '🏛️',
    stopsCount: 6,
    badge: '6 Iconic Pandals',
    bengaliBadge: '৬টি আইকনিক প্যান্ডেল',
    image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=700&q=80',
    landmarks: 'Bagbazar • Kumartuli • Sovabazar',
    bengaliLandmarks: 'বাগবাজার • কুমারটুলি • শোভাবাজার',
    description: 'Bagbazar, Kumartuli, Ahiritola & Sovabazar',
    ids: ['bagbazar-sarbojanin', 'kumartuli-park', 'ahiritola-sarbojanin', 'sovabazar-rajbari'],
    zone: 'North Kolkata',
    metro: 'Blue Line (Shyambazar)',
  },
  {
    id: 'south-iconic',
    title: 'South Kolkata',
    bengaliTitle: 'দক্ষিণ কলকাতা',
    subtitle: 'Theme Powerhouses & Night Adda',
    bengaliSubtitle: 'সেরা থিম পুজো ও জমজমাট আড্ডা',
    icon: '✨',
    stopsCount: 6,
    badge: '6 Iconic Pandals',
    bengaliBadge: '৬টি আইকনিক প্যান্ডেল',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=700&q=80',
    landmarks: 'Maddox Square • Suruchi • Tridhara',
    bengaliLandmarks: 'ম্যাডক্স স্কোয়ার • সুরুচি • ত্রিধারা',
    description: 'Maddox Square, Ekdalia, Singhi Park & Suruchi',
    ids: ['maddox-square', 'ekdalia-evergreen', 'singhi-park', 'suruchi-sangha', 'chetla-agrani'],
    zone: 'South Kolkata',
    metro: 'Blue Line (Kalighat)',
  },
  {
    id: 'central-classic',
    title: 'Central Kolkata',
    bengaliTitle: 'মধ্য কলকাতা',
    subtitle: 'Lakeside Lights & Heritage Squares',
    bengaliSubtitle: 'আলোর রোশনাই ও সাবেক পুজো',
    icon: '👑',
    stopsCount: 3,
    badge: '3 Iconic Pandals',
    bengaliBadge: '৩টি আইকনিক প্যান্ডেল',
    image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=700&q=80',
    landmarks: 'College Square • Santosh Mitra',
    bengaliLandmarks: 'কলেজ স্কোয়ার • সন্তোষ মিত্র স্কোয়ার',
    description: 'College Square, Mohammad Ali & Santosh Mitra',
    ids: ['college-square', 'mohammad-ali-park', 'santosh-mitra-square'],
    zone: 'Central Kolkata',
    metro: 'Blue & Green (Central / MG Road)',
  },
  {
    id: 'east-saltlake',
    title: 'East Kolkata',
    bengaliTitle: 'পূর্ব কলকাতা',
    subtitle: 'Salt Lake & Tech Corridors',
    bengaliSubtitle: 'সল্টলেক ও টেক করিডোর',
    icon: '🚇',
    stopsCount: 4,
    badge: '4 Iconic Pandals',
    bengaliBadge: '৪টি আইকনিক প্যান্ডেল',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=700&q=80',
    landmarks: 'Salt Lake FD Block • BJ Block • Sree Bhumi',
    bengaliLandmarks: 'সল্টলেক এফডি ব্লক • বিজে ব্লক • শ্রীভূমি',
    description: 'Sealdah, FD Block, BJ Block & Sree Bhumi',
    ids: ['chaltabagan', 'salt-lake-fd-block', 'salt-lake-bj-block', 'sree-bhumi-sporting-club'],
    zone: 'East Kolkata',
    metro: 'Green Line (Sector V / Karunamoyee)',
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
    
    if (selectedPandals.length === 1) {
      return buildGoogleMapsUrl(
        selectedPandals[0].latitude, 
        selectedPandals[0].longitude, 
        selectedPandals[0].google_place_id, 
        selectedPandals[0].name
      );
    }

    const origin = encodeURIComponent(`${selectedPandals[0].name}, Kolkata`);
    const destination = encodeURIComponent(`${selectedPandals[selectedPandals.length - 1].name}, Kolkata`);

    if (selectedPandals.length === 2) {
      return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=transit`;
    }

    const waypoints = selectedPandals
      .slice(1, selectedPandals.length - 1)
      .map((p) => encodeURIComponent(`${p.name}, Kolkata`))
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-10">
      
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
                className="p-3 rounded-2xl bg-white dark:bg-[#1A1218] border border-stone-200 dark:border-white/10 hover:border-[#D8261C] dark:hover:border-white/20 text-stone-700 dark:text-stone-200 text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer btn-jiggle"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
                <span className="hidden sm:inline">{copied ? (isBn ? 'কপি হয়েছে!' : 'Copied!') : (isBn ? 'শেয়ার' : 'Share')}</span>
              </button>

              <a
                href={fullGoogleMapsRouteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#D8261C] to-[#B91C1C] hover:from-[#B91C1C] hover:to-[#991B1B] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-[#D8261C]/30 hover:shadow-xl transition-all btn-jiggle"
              >
                <MapPin className="w-4 h-4 text-[#FDE047]" />
                <span>{isBn ? 'গুগল ম্যাপসে সম্পূর্ণ রুট দেখুন' : 'Open Entire Route in Maps'}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </>
          )}
        </div>
      </div>

      {/* 2. Preset Popular Pandal Routes (2 Cards Per Line) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono uppercase tracking-wider text-amber-900 dark:text-amber-400 font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{isBn ? 'জনপ্রিয় প্যান্ডেল রুটসমূহ' : 'Popular Pandal Routes'}</span>
          </span>
          {selectedPandals.length > 0 && (
            <button
              onClick={handleClearAll}
              className="text-stone-500 hover:text-rose-600 dark:text-stone-400 dark:hover:text-rose-400 flex items-center gap-1 text-[11px] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{isBn ? 'রুট পরিষ্কার করুন' : 'Clear Route'}</span>
            </button>
          )}
        </div>

        {/* Popular Pandal Route Cards Grid: 2 Cards in One Line on Desktop / Tablet (Arched Dome Mockup) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {PRESET_CIRCUITS.map((preset) => {
            const isActive = activePreset === preset.id;
            return (
              <div
                key={preset.id}
                onClick={() => handleApplyPreset(preset)}
                className={`group cursor-pointer rounded-[2.5rem] sm:rounded-[2.8rem] p-5 sm:p-7 relative overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-2xl active:scale-[0.99] ${
                  isActive
                    ? 'bg-[#181412] dark:bg-[#120D0B] text-white border-2 border-[#D8261C] ring-4 ring-[#D8261C]/25 shadow-xl shadow-[#D8261C]/20'
                    : 'bg-[#181412] dark:bg-[#140F0E] text-white border border-stone-800/80 hover:border-amber-400/50 hover:shadow-amber-500/10'
                }`}
              >
                {/* Active Indicator Top Accent Bar */}
                {isActive && (
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#D8261C] via-[#FDE047] to-[#D8261C] z-20" />
                )}

                {/* Card Top: Arrow ↗ / Check Button at Top Right */}
                <div className="flex items-center justify-end mb-2">
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
                      isActive
                        ? 'bg-[#D8261C] text-white'
                        : 'bg-white text-stone-900 group-hover:scale-105 group-hover:bg-[#FFFBEB]'
                    }`}
                  >
                    {isActive ? (
                      <Check className="w-5 h-5 text-white stroke-[2.5]" />
                    ) : (
                      <ArrowUpRight className="w-5 h-5 text-stone-900 group-hover:text-[#D8261C] transition-colors stroke-[2.5]" />
                    )}
                  </div>
                </div>

                {/* Centered Neighborhood & Route Title */}
                <div className="text-center -mt-4 mb-5 px-2">
                  <h3 className="text-2xl sm:text-3xl font-bold font-editorial text-white tracking-tight group-hover:text-amber-200 transition-colors leading-tight">
                    {isBn ? preset.bengaliTitle : preset.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#E7E5E4]/80 mt-1 font-medium">
                    {isBn ? preset.bengaliSubtitle : preset.subtitle}
                  </p>
                </div>

                {/* The Iconic Arched Dome Photo Window */}
                <div className="relative w-full aspect-[4/5] rounded-t-full overflow-hidden bg-stone-900 border border-white/10 shadow-inner">
                  <Image
                    src={preset.image}
                    alt={preset.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/25 group-hover:via-black/5 transition-opacity" />

                  {/* Floating Center Badge: e.g. "6 Iconic Pandals" */}
                  <div className="absolute bottom-4 inset-x-4 text-center z-10">
                    <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold font-mono shadow-md backdrop-blur-md transition-all ${
                      isActive
                        ? 'bg-[#D8261C] text-white border border-[#FDE047]/60'
                        : 'bg-[#FFF8F0] text-[#7C2D12] border border-[#FED7AA]'
                    }`}>
                      {isBn ? preset.bengaliBadge : preset.badge}
                    </span>
                  </div>
                </div>

                {/* Card Footer Details */}
                <div className="pt-4 mt-4 border-t border-white/10 text-center space-y-1.5">
                  <div className="text-xs sm:text-sm font-bold text-white tracking-tight truncate">
                    {isBn ? preset.bengaliLandmarks : preset.landmarks}
                  </div>
                  <div className="text-xs text-blue-400 flex items-center justify-center gap-1.5 font-semibold">
                    <Train className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span className="truncate">{preset.metro}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Itinerary Summary Stats Bar (Executive Luxury Dashboard) */}
      {selectedPandals.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 bg-white dark:bg-[#1A1218] rounded-[2rem] border border-stone-200/90 dark:border-white/10 p-5 sm:p-6 shadow-luxe">
          <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-white/[0.03] border border-stone-200/60 dark:border-white/5 text-center">
            <span className="text-[10px] uppercase font-mono tracking-widest text-stone-500 dark:text-stone-400 block font-bold mb-1.5 flex items-center justify-center gap-1">
              <Route className="w-3 h-3 text-[#D8261C]" />
              <span>{isBn ? 'মোট প্যান্ডেল' : 'Total Stops'}</span>
            </span>
            <span className="text-2xl sm:text-3xl font-bold font-editorial text-stone-900 dark:text-white">
              {routeStats.totalStops} <span className="text-xs font-mono font-normal text-stone-400">{isBn ? 'টি' : 'stops'}</span>
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-white/[0.03] border border-stone-200/60 dark:border-white/5 text-center">
            <span className="text-[10px] uppercase font-mono tracking-widest text-stone-500 dark:text-stone-400 block font-bold mb-1.5 flex items-center justify-center gap-1">
              <Train className="w-3 h-3 text-blue-600" />
              <span>{isBn ? 'মোট দূরত্ব' : 'Transit Span'}</span>
            </span>
            <span className="text-2xl sm:text-3xl font-bold font-editorial text-[#D8261C] dark:text-red-400">
              {routeStats.totalDistance} <span className="text-xs font-mono font-normal text-stone-400">km</span>
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-white/[0.03] border border-stone-200/60 dark:border-white/5 text-center">
            <span className="text-[10px] uppercase font-mono tracking-widest text-stone-500 dark:text-stone-400 block font-bold mb-1.5 flex items-center justify-center gap-1">
              <Clock className="w-3 h-3 text-amber-500" />
              <span>{isBn ? 'আনুমানিক সময়' : 'Est. Duration'}</span>
            </span>
            <span className="text-2xl sm:text-3xl font-bold font-editorial text-amber-700 dark:text-amber-400">
              ~{routeStats.estimatedHours} <span className="text-xs font-mono font-normal text-stone-400">hrs</span>
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-white/[0.03] border border-stone-200/60 dark:border-white/5 text-center">
            <span className="text-[10px] uppercase font-mono tracking-widest text-stone-500 dark:text-stone-400 block font-bold mb-1.5 flex items-center justify-center gap-1">
              <Footprints className="w-3 h-3 text-[#D8261C]" />
              <span>{isBn ? 'আনুমানিক পদক্ষেপ' : 'Est. Steps'}</span>
            </span>
            <span className="text-2xl sm:text-3xl font-bold font-editorial text-stone-900 dark:text-white">
              ~{routeStats.estimatedSteps}
            </span>
          </div>
        </div>
      )}

      {/* 4. Step-by-Step Route Chain (Redesigned Iconic Station Cards & Connectors) */}
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
              pandal.locality ? `${pandal.name}, ${pandal.locality}` : pandal.name
            );

            return (
              <React.Fragment key={pandal.id}>
                {/* Redesigned Pandal Stop Card (Matching Mockup Aesthetic) */}
                <div className="group relative bg-[#FAF7F2] dark:bg-[#1A1215] rounded-[2.5rem] border border-[#EFE8DD] dark:border-white/10 p-4 sm:p-5 lg:p-6 shadow-luxe hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  
                  {/* Subtle Botanical Left Vine */}
                  <svg
                    className="absolute -left-2 top-4 w-10 h-32 pointer-events-none z-10 hidden sm:block opacity-80"
                    viewBox="0 0 48 144"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d="M12 2 C16 35, 8 70, 14 110" stroke="#C9A070" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
                    <path d="M14 15 C24 8, 38 12, 42 22 C34 26, 20 25, 14 15 Z" fill="#C9A070" opacity="0.85" />
                    <path d="M12 38 C4 30, -2 40, 2 52 C8 48, 11 44, 12 38 Z" fill="#9B2C2C" opacity="0.9" />
                    <path d="M11 65 C22 60, 32 68, 35 78 C26 80, 16 76, 11 65 Z" fill="#D4AF37" opacity="0.85" />
                    <path d="M13 92 C5 86, 0 98, 4 108 C10 104, 13 98, 13 92 Z" fill="#881337" opacity="0.9" />
                  </svg>

                  {/* Corner Floral Bouquet */}
                  <svg
                    className="absolute -bottom-3 -left-3 w-24 sm:w-28 h-24 sm:h-28 pointer-events-none z-20 drop-shadow-sm"
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

                  <div className="flex flex-col md:flex-row gap-5 lg:gap-6">
                    
                    {/* 1. Left Artwork Container (Organic Pebble Shape) */}
                    <div
                      className="relative w-full md:w-[40%] min-h-[220px] sm:min-h-[260px] md:min-h-[270px] shrink-0 overflow-hidden shadow-inner group/media"
                      style={{ borderRadius: '2.8rem 1.8rem 2.8rem 2.2rem' }}
                    >
                      <Image
                        src={pandal.featured_image}
                        alt={pandal.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 40vw"
                        className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/30 pointer-events-none" />

                      {/* Top Floating Badge on Image: STOP Pill */}
                      <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
                        <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#D8261C] to-[#B91C1C] text-white text-[11px] font-mono font-bold tracking-wider border border-[#FDE047]/60 shadow-md flex items-center gap-1">
                          <span>{isBn ? `স্টপ ${index + 1}` : `STOP ${String(index + 1).padStart(2, '0')}`}</span>
                        </span>
                      </div>

                      {/* Top-Right Arrow button */}
                      <Link
                        href={`/pandal/${pandal.slug}`}
                        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/95 dark:bg-black/75 backdrop-blur-md text-stone-900 dark:text-white shadow-md flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
                        aria-label="View pandal details"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>

                      {/* Bottom Floating Badges Row (Area + Must Visit) */}
                      <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center gap-2 flex-wrap">
                        <span className="px-3 py-1 rounded-full bg-white/95 dark:bg-black/85 text-stone-900 dark:text-white text-xs font-semibold shadow-md flex items-center gap-1.5 backdrop-blur-md border border-white/40 dark:border-white/10">
                          <span className="w-2 h-2 rounded-full bg-[#D8261C]" />
                          <span>{pandal.area}</span>
                        </span>

                        {(pandal.is_must_visit || pandal.tags?.includes('Must Visit')) && (
                          <span className="px-2.5 py-1 rounded-full bg-[#FFF4E5] dark:bg-amber-950/85 text-[#8C5E28] dark:text-amber-300 text-xs font-bold shadow-md flex items-center gap-1 border border-amber-200/60 dark:border-amber-900/50 backdrop-blur-md">
                            <span>👑</span>
                            <span>{isBn ? 'দর্শনীয়' : 'Must Visit'}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* 2. Middle & Right Content Area */}
                    <div className="flex-1 flex flex-col justify-between space-y-3.5 py-1">
                      
                      {/* Header: Theme & Architecture, Title, Underline */}
                      <div>
                        <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-[#9C7A5B] dark:text-amber-400 font-bold block mb-1">
                          {isBn ? 'থিম এবং স্থাপত্য' : 'THEME & ARCHITECTURE'}
                        </span>

                        <div className="flex items-center gap-2 flex-wrap">
                          <Link
                            href={`/pandal/${pandal.slug}`}
                            className="font-editorial text-2xl sm:text-3xl font-bold text-[#7A1515] dark:text-rose-300 tracking-tight leading-tight hover:text-[#991B1B] dark:hover:text-rose-200 transition-colors"
                          >
                            {pandal.name}
                          </Link>

                          {/* Decorative Leaf Sprig */}
                          <svg className="w-5 h-5 text-[#C9A070] shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M4 20 C8 14, 14 8, 20 4" stroke="#C9A070" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M12 12 C14 8, 18 8, 20 10 C18 13, 14 13, 12 12 Z" fill="#C9A070" />
                            <path d="M16 8 C17 5, 20 5, 21 7 C20 9, 17 9, 16 8 Z" fill="#991B1B" />
                            <path d="M8 16 C9 13, 13 13, 14 15 C13 17, 10 17, 8 16 Z" fill="#D4AF37" />
                          </svg>
                        </div>

                        {/* Red Accent Underline */}
                        <div className="w-12 h-0.5 bg-[#881337] dark:bg-rose-500 rounded-full mt-1.5 mb-2" />

                        {/* Theme Description */}
                        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-medium leading-relaxed line-clamp-2">
                          {pandal.theme}
                        </p>
                      </div>

                      {/* Metro Transit Card */}
                      <div className="p-3 sm:p-3.5 rounded-2xl bg-[#F5F2EB] dark:bg-white/[0.04] border border-stone-200/70 dark:border-white/5 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#0052FF] text-white font-bold flex items-center justify-center text-sm shadow-xs shrink-0">
                          M
                        </div>
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
                              <span>~{Math.round(pandal.walking_time_mins * 125).toLocaleString()} steps</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Crowd & Controls Bar */}
                      <div className="flex items-center justify-between gap-3 pt-1 flex-wrap">
                        {/* Crowd Pill */}
                        <div className="px-3 py-1.5 rounded-xl bg-[#F9EDE6] dark:bg-rose-950/30 text-[#8C4A32] dark:text-rose-300 border border-[#F3DACF] dark:border-rose-900/30 flex items-center gap-2 text-xs font-semibold shadow-2xs">
                          <Users className="w-4 h-4 text-[#8C4A32] dark:text-rose-300 shrink-0" />
                          <span>{pandal.crowd_status.level.toUpperCase()} CROWD</span>
                          <span className="text-[10px] opacity-75 font-normal">
                            ({isBn ? 'কমিউনিটি রিপোর্ট' : 'Community reported'})
                          </span>
                        </div>

                        {/* Itinerary Re-ordering & Maps Controls */}
                        <div className="flex items-center gap-2 shrink-0">
                          {/* Reorder Arrows Pill */}
                          <div className="flex items-center gap-1 bg-white dark:bg-white/[0.06] p-1 rounded-2xl border border-stone-200 dark:border-white/10 shadow-2xs">
                            <button
                              type="button"
                              onClick={() => handleMoveUp(index)}
                              disabled={isFirst}
                              className="p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-white/10 disabled:opacity-25 disabled:hover:bg-transparent transition-all cursor-pointer disabled:cursor-not-allowed btn-jiggle"
                              title="Move earlier in route"
                              aria-label="Move up"
                            >
                              <ArrowUp className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleMoveDown(index)}
                              disabled={isLast}
                              className="p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-white/10 disabled:opacity-25 disabled:hover:bg-transparent transition-all cursor-pointer disabled:cursor-not-allowed btn-jiggle"
                              title="Move later in route"
                              aria-label="Move down"
                            >
                              <ArrowDown className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Google Maps Button */}
                          <a
                            href={exactMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-2xl border border-stone-200 dark:border-white/10 bg-white dark:bg-[#1A1215] hover:border-[#D8261C] hover:bg-rose-50 dark:hover:bg-rose-950/30 text-stone-800 dark:text-stone-200 hover:text-[#D8261C] flex items-center justify-center transition-all shadow-2xs cursor-pointer btn-jiggle"
                            title="Open exact location in Google Maps"
                            aria-label="View in Maps"
                          >
                            <MapPin className="w-4 h-4 text-[#D8261C]" />
                          </a>

                          {/* Remove Stop Button */}
                          <button
                            type="button"
                            onClick={() => handleRemovePandal(pandal.id)}
                            className="w-10 h-10 rounded-2xl border border-stone-200 dark:border-white/10 bg-white dark:bg-[#1A1215] hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:border-rose-300 hover:text-rose-600 text-stone-400 flex items-center justify-center transition-all shadow-2xs cursor-pointer btn-jiggle"
                            title="Remove from itinerary"
                            aria-label="Remove stop"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                    </div>

                  </div>
                </div>

                {/* Redesigned Transit Hop Connector */}
                {!isLast && nextPandal && (
                  <div className="flex flex-col items-center justify-center my-3 relative py-1">
                    {/* Upper Track */}
                    <div className="w-0.5 h-7 bg-gradient-to-b from-[#D8261C] via-amber-400 to-[#D8261C]" />
                    
                    {/* Transit Connection Pill */}
                    <div className="my-1.5 px-4 py-2 rounded-full bg-white dark:bg-[#1A1218] border border-stone-200/90 dark:border-white/15 flex items-center gap-3 text-xs text-stone-800 dark:text-stone-200 shadow-md hover:shadow-lg transition-shadow">
                      <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-[10px] shadow-xs">
                        M
                      </div>

                      <div className="flex items-center gap-1.5 font-medium">
                        <span className="text-stone-500 dark:text-stone-400 font-mono text-[11px] uppercase tracking-wider">
                          {isBn ? 'হাঁটা বা মেট্রো সংযোগ:' : 'Transit Leg:'}
                        </span>
                        <span className="font-bold text-[#D8261C] dark:text-red-400 font-mono">
                          {distanceToNext < 1 ? `${Math.round(distanceToNext * 1000)} m` : `${distanceToNext.toFixed(1)} km`}
                        </span>
                      </div>

                      <span className="text-stone-300 dark:text-stone-600">•</span>

                      <div className="flex items-center gap-1 text-stone-600 dark:text-stone-300 font-semibold text-[11px]">
                        <Footprints className="w-3.5 h-3.5 text-amber-500" />
                        <span>~{Math.max(4, Math.round(distanceToNext * 12))} mins on foot</span>
                      </div>

                      <a
                        href={`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(`${pandal.name}, Kolkata`)}&destination=${encodeURIComponent(`${nextPandal.name}, Kolkata`)}&travelmode=walking`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-1 p-1 rounded-full text-stone-400 hover:text-[#D8261C] transition-colors"
                        title="Open walking directions between these two stops"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    {/* Lower Track */}
                    <div className="w-0.5 h-7 bg-gradient-to-b from-[#D8261C] via-amber-400 to-[#D8261C]" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 bg-white dark:bg-[#1A1218] rounded-[2.5rem] border border-stone-200 dark:border-white/10 max-w-lg mx-auto space-y-4 my-8 shadow-luxe">
          <div className="w-16 h-16 rounded-3xl bg-[#D8261C]/10 dark:bg-[#D8261C]/25 text-[#D8261C] flex items-center justify-center mx-auto border border-[#D8261C]/30 shadow-inner">
            <Route className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold font-editorial text-stone-900 dark:text-white">
            {isBn ? 'আপনার পরিক্রমা তালিকা ফাঁকা' : 'Your Itinerary is Empty'}
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
            {isBn 
              ? 'উপরের যেকোনো জনপ্রিয় প্যান্ডেল রুট বেছে নিন অথবা নিজের পছন্দের প্যান্ডেল যোগ করে শুরু করুন।'
              : 'Pick one of our popular pandal routes above or add iconic pandals manually to build your route.'}
          </p>
          <div className="pt-2 flex items-center justify-center gap-3 flex-wrap">
            <button
              type="button"
              onClick={() => handleApplyPreset(PRESET_CIRCUITS[0])}
              className="px-5 py-2.5 rounded-xl bg-[#D8261C] text-white text-xs font-bold hover:bg-[#B91C1C] transition-all shadow-md active:scale-95 cursor-pointer"
            >
              {isBn ? 'উত্তর কলকাতা প্যান্ডেল রুট যোগ করুন' : 'Load North Heritage Pandal Route'}
            </button>
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="px-5 py-2.5 rounded-xl border border-stone-200 dark:border-white/10 bg-white dark:bg-[#1A1218] text-stone-800 dark:text-stone-200 text-xs font-bold hover:border-[#D8261C] transition-all cursor-pointer"
            >
              {isBn ? 'প্যান্ডেল খুঁজুন' : 'Search Pandals'}
            </button>
          </div>
        </div>
      )}

      {/* 5. Add Stop Button Bar */}
      <div className="pt-2 flex items-center justify-center">
        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="px-8 py-4 rounded-2xl bg-white dark:bg-[#1A1218] border-2 border-dashed border-[#D8261C]/60 hover:border-[#D8261C] text-stone-900 dark:text-stone-100 hover:text-[#D8261C] dark:hover:text-white text-xs sm:text-sm font-bold flex items-center gap-2.5 shadow-sm transition-all hover:scale-102 cursor-pointer btn-jiggle"
        >
          <Plus className="w-5 h-5 text-[#D8261C]" />
          <span>{isBn ? 'পরিক্রমায় আরও প্যান্ডেল যোগ করুন' : 'Add Another Pandal to Itinerary'}</span>
        </button>
      </div>

      {/* 6. Searchable Add Pandal Modal / Drawer */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-2xl bg-white dark:bg-[#1A1218] rounded-[2.5rem] border border-stone-200 dark:border-white/10 shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-stone-200 dark:border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#D8261C] dark:text-amber-400 font-bold block">
                  {isBn ? 'প্যান্ডেল নির্বাচন' : 'Route Customizer'}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-editorial text-stone-900 dark:text-white">
                  {isBn ? 'নতুন প্যান্ডেল যোগ করুন' : 'Add Pandal to Route'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-2.5 rounded-full text-stone-400 hover:text-stone-800 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
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
                      className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
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
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {availableToAdd.length > 0 ? (
                availableToAdd.map((p) => (
                  <div
                    key={p.id}
                    className="p-3.5 rounded-2xl bg-stone-50 dark:bg-white/[0.03] border border-stone-200/80 dark:border-white/5 hover:border-[#D8261C]/50 dark:hover:border-amber-400/30 flex items-center justify-between gap-3 transition-colors group"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-stone-200 dark:border-white/10 bg-stone-100 dark:bg-stone-900 shadow-xs">
                        <Image
                          src={p.featured_image}
                          alt={p.name}
                          fill
                          sizes="56px"
                          className="object-cover group-hover:scale-108 transition-transform duration-300"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold font-editorial text-stone-900 dark:text-white truncate group-hover:text-[#D8261C] transition-colors">
                          {p.name}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                          <span className="text-[#D8261C] dark:text-red-400 font-semibold">{p.area}</span>
                          <span>•</span>
                          <span className="truncate flex items-center gap-1">
                            <Train className="w-3 h-3 text-blue-600" />
                            {p.nearest_metro}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddPandal(p.id)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#D8261C] hover:bg-[#B91C1C] text-white text-xs font-bold flex items-center gap-1 shadow-xs transition-colors shrink-0 active:scale-95 cursor-pointer"
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
            <div className="p-4 sm:p-5 border-t border-stone-200 dark:border-white/10 flex items-center justify-between text-xs bg-stone-50/50 dark:bg-white/[0.02]">
              <span className="text-stone-500 dark:text-stone-400 font-medium">
                {selectedPandals.length} stops currently in itinerary
              </span>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-bold transition-all cursor-pointer hover:opacity-90"
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
