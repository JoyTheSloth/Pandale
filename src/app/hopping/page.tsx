'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  Train, 
  MapPin, 
  Footprints, 
  ArrowRight, 
  ExternalLink, 
  Sparkles, 
  Heart, 
  Share2, 
  Check, 
  Compass, 
  Navigation,
  ChevronRight
} from 'lucide-react';
import { FAMOUS_PUJO_CIRCUITS, PujoZoneCircuit, CircuitPandal } from '@/data/famousPujoCircuits';
import { PANDALS_DATA } from '@/data/pandals';
import { useLanguage } from '@/context/LanguageContext';
import { useWishlist } from '@/context/WishlistContext';

type ZoneKey = 'north' | 'south' | 'east' | 'central';

const ZONE_CARDS_META: {
  id: ZoneKey;
  titleEn: string;
  titleBn: string;
  subtitleEn: string;
  subtitleBn: string;
  pandalsCount: string;
  metroLine: string;
  metroBadge: string;
  image: string;
}[] = [
  {
    id: 'north',
    titleEn: 'North Zone',
    titleBn: 'উত্তর সার্কিট',
    subtitleEn: 'Shyambazar, Shovabazar & Dum Dum Hub',
    subtitleBn: 'শ্যামবাজার, শোভাবাজার ও দমদম',
    pandalsCount: '18 Famous Pandals',
    metroLine: 'Blue Line (North-South)',
    metroBadge: 'bg-blue-600 text-white',
    image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'south',
    titleEn: 'South Zone',
    titleBn: 'দক্ষিণ সার্কিট',
    subtitleEn: 'Kalighat, Gariahat & Ballygunge Hub',
    subtitleBn: 'কালীঘাট, গড়িয়াহাট ও বালিগঞ্জ',
    pandalsCount: '15 Famous Pandals',
    metroLine: 'Blue Line (Kalighat / Jatin Das Park)',
    metroBadge: 'bg-blue-600 text-white',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'east',
    titleEn: 'East Zone',
    titleBn: 'পূর্ব সার্কিট',
    subtitleEn: 'Salt Lake, Sector V & Tech Corridors',
    subtitleBn: 'সল্টলেক ও টেক করিডোর',
    pandalsCount: '8 Famous Pandals',
    metroLine: 'Green Line (East-West)',
    metroBadge: 'bg-emerald-600 text-white',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'central',
    titleEn: 'Central Zone',
    titleBn: 'মধ্য সার্কিট',
    subtitleEn: 'Central, MG Road & Sealdah Hub',
    subtitleBn: 'সেন্ট্রাল, এমজি রোড ও শিয়ালদহ',
    pandalsCount: '7 Famous Pandals',
    metroLine: 'Blue & Green Line (Central / Sealdah)',
    metroBadge: 'bg-amber-600 text-white',
    image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=700&q=80',
  }
];

function ZoneHoppingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const { wishlist, toggleWishlist } = useWishlist();

  // Zone selection defaults to 'north'
  const paramZone = searchParams.get('zone')?.toLowerCase() as ZoneKey;
  const initialZone: ZoneKey = ['north', 'south', 'east', 'central'].includes(paramZone) 
    ? paramZone 
    : 'north';

  const [activeZone, setActiveZone] = useState<ZoneKey>(initialZone);
  const [filterStation, setFilterStation] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Sync state if query parameter changes externally
  useEffect(() => {
    if (paramZone && ['north', 'south', 'east', 'central'].includes(paramZone)) {
      setActiveZone(paramZone);
      setFilterStation('all');
    }
  }, [paramZone]);

  const handleZoneSelect = (zoneKey: ZoneKey) => {
    setActiveZone(zoneKey);
    setFilterStation('all');
    router.replace(`/hopping?zone=${zoneKey}`, { scroll: false });
  };

  const currentCircuit: PujoZoneCircuit = FAMOUS_PUJO_CIRCUITS[activeZone] || FAMOUS_PUJO_CIRCUITS.north;

  // Filter pandals by selected station if applicable
  const filteredPandals = useMemo(() => {
    if (filterStation === 'all') return currentCircuit.pandals;
    return currentCircuit.pandals.filter(p =>
      p.nearestStation.toLowerCase().includes(filterStation.toLowerCase())
    );
  }, [currentCircuit, filterStation]);

  const handleCopyLink = (pandal: CircuitPandal) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(pandal.googleMapsDirectionsUrl);
      setCopiedId(pandal.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  // Find rich image from PANDALS_DATA if not provided on circuit pandal
  const getPandalImage = (pandal: CircuitPandal): string => {
    if (pandal.image) return pandal.image;
    const match = PANDALS_DATA.find(p => p.id === pandal.id || p.slug === pandal.slug);
    if (match && match.images && match.images.length > 0) {
      return match.images[0].url;
    }
    return 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=700&q=80';
  };

  const getPandalSlug = (pandal: CircuitPandal): string => {
    if (pandal.slug) return pandal.slug;
    const match = PANDALS_DATA.find(p => p.id === pandal.id);
    if (match) return match.slug;
    return pandal.id;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* 1. TOP HEADER & BREADCRUMB */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/60 text-[#D8261C] dark:text-amber-400 font-mono text-xs font-bold border border-red-200 dark:border-red-900/40 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isBn ? 'কলকাতা দুর্গাপূজা ২০২৬ • অঞ্চলভিত্তিক হপিং' : 'Kolkata Durga Puja 2026 • Zone Hopping'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-editorial text-stone-900 dark:text-stone-50 tracking-tight leading-tight">
          {isBn ? 'অঞ্চলভিত্তিক প্যান্ডেল হপিং গাইড' : 'Zone-Wise Pandal Hopping'}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 mt-2 max-w-3xl leading-relaxed">
          {isBn 
            ? 'উপরে আপনার পছন্দের অঞ্চল নির্বাচন করুন এবং দেখে নিন সংশ্লিষ্ট মেট্রো স্টেশন ও ৩টি করে সাজানো প্যান্ডেল কার্ড।'
            : 'Explore famous pandals arranged three in a line, complete with nearest metro station details, walking durations, and direct walking directions.'}
        </p>
      </div>

      {/* 2. CARDS ABOVE: NORTH ZONE, SOUTH ZONE, EAST ZONE, CENTRAL ZONE */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
            {isBn ? 'অঞ্চল বেছে নিন (Zone Switcher)' : 'Select Pandal Zone'}
          </h2>
          <span className="text-xs font-mono text-stone-400">
            {ZONE_CARDS_META.length} Zones Available
          </span>
        </div>

        {/* 4 Zone Cards Above */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {ZONE_CARDS_META.map((zone) => {
            const isActive = activeZone === zone.id;
            return (
              <button
                key={zone.id}
                type="button"
                onClick={() => handleZoneSelect(zone.id)}
                className={`relative text-left p-4 sm:p-5 rounded-[2rem] border transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between group ${
                  isActive
                    ? 'bg-gradient-to-b from-red-600 to-[#9E1B13] text-white border-red-500 shadow-xl shadow-red-600/25 ring-4 ring-red-500/20 scale-[1.02]'
                    : 'bg-white dark:bg-[#1A1210] text-stone-900 dark:text-stone-100 border-stone-200 dark:border-white/10 hover:border-amber-400 dark:hover:border-amber-400/50 hover:shadow-lg hover:-translate-y-1'
                }`}
              >
                {/* Background Ambient Glow for active */}
                {isActive && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />
                )}

                {/* Top Row: Zone Status Badge & Arrow */}
                <div className="flex items-center justify-between gap-2 mb-3 relative z-10">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wide border ${
                      isActive
                        ? 'bg-white/20 text-white border-white/30 backdrop-blur-xs'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-white/10'
                    }`}
                  >
                    {isActive ? (isBn ? 'সক্রিয় অঞ্চল' : 'Active Zone') : zone.pandalsCount}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-300 ${
                      isActive
                        ? 'bg-white text-red-600 rotate-45'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-500 group-hover:bg-[#D8261C] group-hover:text-white group-hover:rotate-45'
                    }`}
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Zone Title */}
                <div className="relative z-10 mb-3">
                  <h3 className="text-xl sm:text-2xl font-bold font-editorial leading-tight">
                    {isBn ? zone.titleBn : zone.titleEn}
                  </h3>
                  <p className={`text-xs mt-1 font-medium ${isActive ? 'text-white/80' : 'text-stone-500 dark:text-stone-400'}`}>
                    {isBn ? zone.subtitleBn : zone.subtitleEn}
                  </p>
                </div>

                {/* Metro Line Indicator Tag */}
                <div className="relative z-10 pt-2 border-t border-current/15 flex items-center gap-1.5 text-[11px] font-mono font-semibold">
                  <Train className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{zone.metroLine}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. ACTIVE ZONE BANNER & METRO STATION FILTER */}
      <div className="p-5 sm:p-6 rounded-3xl bg-stone-100 dark:bg-[#161012] border border-stone-200 dark:border-white/10 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#D8261C] dark:text-amber-400">
              {currentCircuit.name} • {currentCircuit.approxCircuitWalkKm}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-stone-900 dark:text-white">
            {isBn ? currentCircuit.bengaliName : currentCircuit.name} {isBn ? 'প্যান্ডেল তালিকা' : 'Pandals'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1">
            {currentCircuit.tagline}
          </p>
        </div>

        {/* Station Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-mono text-stone-500 dark:text-stone-400 font-semibold flex items-center gap-1 shrink-0">
            <Train className="w-3.5 h-3.5 text-[#D8261C]" />
            Station:
          </span>
          <button
            type="button"
            onClick={() => setFilterStation('all')}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all duration-150 cursor-pointer ${
              filterStation === 'all'
                ? 'bg-[#D8261C] text-white shadow-xs'
                : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 border border-stone-200 dark:border-white/10'
            }`}
          >
            All ({currentCircuit.pandals.length})
          </button>
          {currentCircuit.primaryStations.map((station) => (
            <button
              key={station}
              type="button"
              onClick={() => setFilterStation(filterStation === station ? 'all' : station)}
              className={`px-3 py-1.5 rounded-xl font-mono text-xs font-semibold transition-all duration-150 cursor-pointer ${
                filterStation === station
                  ? 'bg-[#D8261C] text-white shadow-xs'
                  : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 border border-stone-200 dark:border-white/10'
              }`}
            >
              {station}
            </button>
          ))}
        </div>
      </div>

      {/* 4. SQUARE CARDS LIST: THREE IN A LINE WITH METRO STATION NAME */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {filteredPandals.map((pandal, index) => {
          const imageUrl = getPandalImage(pandal);
          const slug = getPandalSlug(pandal);
          const isBookmarked = wishlist.includes(pandal.id);

          return (
            <div
              key={pandal.id}
              className="relative aspect-square rounded-[2rem] overflow-hidden border border-stone-200 dark:border-white/10 bg-stone-900 shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between p-5 select-none"
            >
              {/* Full Bleed Image with Dynamic Zoom on Hover */}
              <Image
                src={imageUrl}
                alt={pandal.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Rich Glass Vignette Gradient for Perfect Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/35 group-hover:via-black/50 transition-colors duration-300" />

              {/* TOP HEADER: Prominent Metro Station Name & Distance + Wishlist */}
              <div className="relative z-10 flex items-start justify-between gap-2">
                <div className="flex flex-col gap-1.5">
                  {/* Station Name Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/90 text-white font-mono text-xs font-bold backdrop-blur-md shadow-md border border-white/20">
                    <Train className="w-3.5 h-3.5 text-yellow-300 shrink-0" />
                    <span className="truncate max-w-[210px]">{pandal.nearestStation}</span>
                  </div>

                  {/* Walking Time Badge */}
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/60 text-amber-300 font-mono text-[11px] font-semibold backdrop-blur-md border border-white/10 w-fit">
                    <Footprints className="w-3 h-3 shrink-0" />
                    <span>{pandal.walkTimeToStationMins} mins walk ({pandal.distanceToStation})</span>
                  </div>
                </div>

                {/* Wishlist Heart Button */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(pandal.id)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-200 cursor-pointer shrink-0 ${
                    isBookmarked
                      ? 'bg-red-600 text-white border-red-500 shadow-md scale-105'
                      : 'bg-black/50 text-white/80 hover:text-white hover:bg-black/70 border-white/20 hover:scale-110'
                  }`}
                  aria-label="Save to wishlist"
                >
                  <Heart className={`w-4 h-4 ${isBookmarked ? 'fill-current text-white' : ''}`} />
                </button>
              </div>

              {/* BOTTOM CONTENT: Index Number, Title, Highlight Quote & Action Buttons */}
              <div className="relative z-10">
                {/* Index Pill + Bengali subtitle */}
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-6 h-6 rounded-full bg-gradient-to-r from-red-600 to-amber-600 text-white font-mono text-xs font-bold flex items-center justify-center shadow-xs">
                    {index + 1}
                  </span>
                  <span className="text-xs text-amber-200/90 font-medium font-bengali">
                    {pandal.bengaliName}
                  </span>
                </div>

                {/* Primary Pandal Name */}
                <h3 className="text-xl sm:text-2xl font-bold font-editorial text-white leading-tight tracking-tight drop-shadow-sm group-hover:text-amber-300 transition-colors">
                  {pandal.name}
                </h3>

                {/* Snippet / Highlight */}
                <p className="text-xs text-stone-200 line-clamp-2 mt-1.5 font-sans leading-snug drop-shadow-xs">
                  {pandal.highlight}
                </p>

                {/* Next Stop Indicator if present */}
                {pandal.nextPandalName && (
                  <div className="mt-2 text-[11px] font-mono text-yellow-300/90 flex items-center gap-1 truncate">
                    <span>➡️ Next stop:</span>
                    <span className="font-bold underline decoration-yellow-400/50">{pandal.nextPandalName}</span>
                    {pandal.distanceToNextPandal && (
                      <span className="text-stone-300">({pandal.distanceToNextPandal})</span>
                    )}
                  </div>
                )}

                {/* Action Buttons: View Details & Walk Route */}
                <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-white/15">
                  <Link
                    href={`/pandal/${slug}`}
                    className="px-3 py-2 rounded-xl bg-white/20 hover:bg-white text-white hover:text-stone-900 font-bold text-xs flex items-center justify-center gap-1.5 backdrop-blur-md transition-all duration-200 border border-white/25 active:scale-95"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <a
                    href={pandal.googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all duration-200 active:scale-95 group/walk"
                  >
                    <span>Walk Route</span>
                    <ExternalLink className="w-3.5 h-3.5 text-yellow-300 group-hover/walk:translate-x-0.5 group-hover/walk:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredPandals.length === 0 && (
        <div className="p-12 text-center rounded-3xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-white/10 my-8">
          <Train className="w-12 h-12 text-stone-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold font-editorial text-stone-900 dark:text-white">
            No pandals found for this station
          </h3>
          <p className="text-xs text-stone-500 mt-1 mb-4">
            Try choosing &apos;All&apos; stations to see all famous pandals in {currentCircuit.name}.
          </p>
          <button
            type="button"
            onClick={() => setFilterStation('all')}
            className="px-4 py-2 rounded-xl bg-[#D8261C] text-white font-bold text-xs"
          >
            Show All Pandals
          </button>
        </div>
      )}
    </div>
  );
}

export default function ZoneHoppingPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="w-8 h-8 border-4 border-[#D8261C] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="font-mono text-xs text-stone-500">Loading Zone Hopping Guide...</p>
      </div>
    }>
      <ZoneHoppingContent />
    </Suspense>
  );
}
