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
  ChevronRight,
  Flame
} from 'lucide-react';
import { FAMOUS_PUJO_CIRCUITS, PujoZoneCircuit, CircuitPandal } from '@/data/famousPujoCircuits';
import { PANDALS_DATA } from '@/data/pandals';
import { useLanguage } from '@/context/LanguageContext';
import { useWishlist } from '@/context/WishlistContext';
import SpotlightCarousel from '@/components/SpotlightCarousel';

type ZoneKey = 'bonedi' | 'north' | 'south' | 'east' | 'central';

const ZONE_CARDS_META: {
  id: ZoneKey;
  titleEn: string;
  titleBn: string;
  pandalsCount: string;
  flames: number;
  image: string;
}[] = [
  {
    id: 'bonedi',
    titleEn: 'Bonedi Bari',
    titleBn: 'বনেদি বাড়ি সার্কিট',
    pandalsCount: '9 Aristocratic Pujas',
    flames: 3,
    image: '/pandals/sovabazar-rajbari.jpg',
  },
  {
    id: 'north',
    titleEn: 'North Zone',
    titleBn: 'উত্তর সার্কিট',
    pandalsCount: '18 Famous Pandals',
    flames: 3,
    image: '/brand/zone-north-durga.jpg',
  },
  {
    id: 'south',
    titleEn: 'South Zone',
    titleBn: 'দক্ষিণ সার্কিট',
    pandalsCount: '15 Famous Pandals',
    flames: 3,
    image: '/brand/zone-south-durga.jpg',
  },
  {
    id: 'east',
    titleEn: 'East Zone',
    titleBn: 'পূর্ব সার্কিট',
    pandalsCount: '8 Famous Pandals',
    flames: 2,
    image: '/brand/zone-east-durga.jpg',
  },
  {
    id: 'central',
    titleEn: 'Central Zone',
    titleBn: 'মধ্য সার্কিট',
    pandalsCount: '7 Famous Pandals',
    flames: 2,
    image: '/brand/zone-central-durga.jpg',
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
  const initialZone: ZoneKey = ['bonedi', 'north', 'south', 'east', 'central'].includes(paramZone) 
    ? paramZone 
    : 'north';

  const [activeZone, setActiveZone] = useState<ZoneKey>(initialZone);
  const [filterStation, setFilterStation] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Sync state if query parameter changes externally
  useEffect(() => {
    if (paramZone && ['bonedi', 'north', 'south', 'east', 'central'].includes(paramZone)) {
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
    return '/brand/zone-north-durga.jpg';
  };

  const getPandalSlug = (pandal: CircuitPandal): string => {
    if (pandal.slug) return pandal.slug;
    const match = PANDALS_DATA.find(p => p.id === pandal.id);
    if (match) return match.slug;
    return pandal.id;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Back button */}
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={() => {
            if (typeof window !== 'undefined' && window.history.length > 1) {
              router.back();
            } else {
              router.push('/');
            }
          }}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-700 hover:text-stone-950 dark:text-stone-300 dark:hover:text-white px-3 py-1.5 rounded-full bg-white/90 hover:bg-white dark:bg-stone-900/90 dark:hover:bg-stone-800 transition-all duration-150 hover:-translate-x-0.5 active:scale-95 cursor-pointer shadow-xs border border-stone-200 dark:border-white/10 group"
        >
          <ArrowRight className="w-4 h-4 text-[#D8261C] rotate-180 group-hover:-translate-x-0.5 transition-transform duration-150" />
          <span>Back</span>
        </button>
      </div>

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


      {/* 1.5 SPOTLIGHT CAROUSEL — top pandals for active zone */}
      {(() => {
        const ZONE_AREA_MAP: Record<ZoneKey, string> = {
          bonedi: 'Bonedi Bari',
          north: 'North Kolkata',
          south: 'South Kolkata',
          east: 'East Kolkata',
          central: 'Central Kolkata',
        };
        const areaLabel = ZONE_AREA_MAP[activeZone];
        const zonePandals = (activeZone === 'bonedi'
          ? PANDALS_DATA.filter((p) => p.tags.includes('Bonedi Bari'))
          : PANDALS_DATA.filter((p) => p.area === areaLabel)
        )
          .sort((a, b) => b.trending_score - a.trending_score)
          .slice(0, 8);
        if (zonePandals.length === 0) return null;
        return (
          <div className="mb-10">
            <SpotlightCarousel pandals={zonePandals} />
          </div>
        );
      })()}

      {/* 2. CARDS ABOVE: BONEDI BARI, NORTH ZONE, SOUTH ZONE, EAST ZONE, CENTRAL ZONE */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
            {isBn ? 'অঞ্চল বেছে নিন (Zone Switcher)' : 'Select Pandal Zone'}
          </h2>
          <span className="text-xs font-mono text-stone-400">
            {ZONE_CARDS_META.length} Circuits Available
          </span>
        </div>

        {/* 5 Zone Cards Above */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
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
                </div>

                {/* Flame Icons — fame indicator */}
                <div className="relative z-10 pt-2 border-t border-current/15 flex items-center gap-0.5">
                  {Array.from({ length: zone.flames }).map((_, i) => (
                    <Flame
                      key={i}
                      className={`w-4 h-4 ${
                        isActive
                          ? i === 0 ? 'text-orange-300 fill-orange-300' : 'text-amber-300 fill-amber-300'
                          : i === 0 ? 'text-orange-500 fill-orange-500' : 'text-amber-400 fill-amber-400'
                      }`}
                    />
                  ))}
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
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
        {filteredPandals.map((pandal, index) => {
          const imageUrl = getPandalImage(pandal);
          const slug = getPandalSlug(pandal);
          const isBookmarked = wishlist.includes(pandal.id);

          return (
            <Link
              key={pandal.id}
              href={`/pandal/${slug}`}
              className="relative aspect-square rounded-[2rem] overflow-hidden border border-stone-200 dark:border-white/10 bg-stone-900 shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between p-5 select-none"
            >
              {/* Full Bleed Image with Dynamic Zoom on Hover */}
              <Image
                src={imageUrl}
                alt={pandal.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Rich high-contrast scrim: darker at bottom to make white text crisp and legible */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/25 pointer-events-none group-hover:from-black group-hover:via-black/65 transition-colors duration-300" />

              {/* TOP: Flames left, icons right */}
              <div className="relative z-10 flex items-start justify-between gap-2">
                {/* Flame Icons */}
                {(() => {
                  const match = PANDALS_DATA.find(p => p.id === pandal.id || p.slug === pandal.slug);
                  const score = match?.trending_score ?? 70;
                  const flames = score >= 95 ? 3 : score >= 80 ? 2 : 1;
                  return (
                    <div className="inline-flex items-center gap-0.5 px-2 py-1 rounded-full bg-black/75 backdrop-blur-md border border-orange-500/40 shadow-sm">
                      {Array.from({ length: flames }).map((_, i) => (
                        <Flame key={i} className={`w-4 h-4 ${i === 0 ? 'text-orange-500 fill-orange-500' : 'text-amber-400 fill-amber-400'}`} />
                      ))}
                    </div>
                  );
                })()}

                {/* Wishlist + Location icons */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(pandal.id); }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-200 cursor-pointer shrink-0 ${
                      isBookmarked
                        ? 'bg-red-600 text-white border-red-500 shadow-md'
                        : 'bg-black/65 text-white/90 hover:text-white hover:bg-black/85 border-white/25'
                    }`}
                    aria-label="Save to wishlist"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
                  </button>

                  <a
                    href={pandal.googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-black/65 text-white/90 hover:text-white hover:bg-black/85 backdrop-blur-md border border-white/25 transition-all duration-200 shrink-0"
                    aria-label="Open in Google Maps"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* BOTTOM: index + name + metro with high readability */}
              <div className="relative z-10 space-y-2 mt-auto">
                {/* Index pill row */}
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-gradient-to-br from-red-600 to-amber-500 text-white font-mono text-xs font-black flex items-center justify-center shadow-md shrink-0 ring-1 ring-white/30">
                    {index + 1}
                  </span>
                  {isBn && (
                    <span className="text-[11px] text-amber-300 font-bold font-bengali truncate leading-none drop-shadow-md">
                      {pandal.bengaliName}
                    </span>
                  )}
                </div>

                {/* Pandal Name with prominent contrast drop shadow */}
                <h3 className="text-base sm:text-lg font-black font-editorial text-white leading-tight tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] group-hover:text-amber-300 transition-colors line-clamp-2">
                  {isBn ? pandal.bengaliName : pandal.name}
                </h3>

                {/* Metro station pill with opaque dark background for 100% legibility */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/20 max-w-full overflow-hidden shadow-md">
                  <Train className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span className="text-[10.5px] font-mono font-bold text-white truncate">
                    {pandal.nearestStation} · {pandal.walkTimeToStationMins}m walk
                  </span>
                </div>
              </div>
            </Link>

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
