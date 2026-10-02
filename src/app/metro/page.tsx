'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { METRO_STATIONS_DATA } from '@/data/metro';
import { PANDALS_DATA } from '@/data/pandals';
import { 
  Train, 
  MapPin, 
  Footprints, 
  Search, 
  ChevronRight, 
  LayoutGrid, 
  X, 
  ExternalLink,
  Sparkles,
  ArrowRight,
  Clock,
  Check,
  ArrowUpRight,
  Map as MapIcon
} from 'lucide-react';
import { buildGoogleMapsUrl } from '@/lib/geo';
import { useLanguage } from '@/context/LanguageContext';
import KolkataMetroExplorerModal from '@/components/KolkataMetroExplorerModal';

export default function MetroGuidePage() {
  const { language } = useLanguage();
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [selectedLine, setSelectedLine] = useState<'all' | 'blue' | 'green' | 'orange' | 'purple'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedStationId, setExpandedStationId] = useState<string | null>('shyambazar');

  // Four Square Metro Line Cards
  const METRO_LINE_CARDS = [
    {
      id: 'blue' as const,
      name: 'Blue Line',
      bengaliName: 'ব্লু লাইন',
      route: 'Dakshineswar ↔ Kavi Subhash',
      corridor: 'North-South Arterial',
      hex: '#2563EB',
      pandalCount: 12,
      stationsCount: 8,
      image: '/brand/metro-blue-line.jpg',
      badgeClass: 'bg-blue-600 text-white shadow-xs',
      borderDefault: 'border-blue-500/30 hover:border-blue-500 dark:border-blue-500/20',
      activeBorder: 'border-blue-500',
      activeRing: 'ring-4 ring-blue-500/30 shadow-xl shadow-blue-500/20',
      bgGradient: 'from-blue-600/15 via-blue-500/5 to-transparent dark:from-blue-900/30 dark:via-blue-950/20 dark:to-transparent',
      accentBg: 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60'
    },
    {
      id: 'green' as const,
      name: 'Green Line',
      bengaliName: 'গ্রিন লাইন',
      route: 'Howrah Maidan ↔ Sector V',
      corridor: 'East-West Corridor',
      hex: '#059669',
      pandalCount: 7,
      stationsCount: 6,
      image: '/brand/metro-green-line.jpg',
      badgeClass: 'bg-emerald-600 text-white shadow-xs',
      borderDefault: 'border-emerald-500/30 hover:border-emerald-500 dark:border-emerald-500/20',
      activeBorder: 'border-emerald-500',
      activeRing: 'ring-4 ring-emerald-500/30 shadow-xl shadow-emerald-500/20',
      bgGradient: 'from-emerald-600/15 via-emerald-500/5 to-transparent dark:from-emerald-900/30 dark:via-emerald-950/20 dark:to-transparent',
      accentBg: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60'
    },
    {
      id: 'orange' as const,
      name: 'Orange Line',
      bengaliName: 'অরেঞ্জ লাইন',
      route: 'Kavi Subhash ↔ VIP Bazar',
      corridor: 'EM Bypass Corridor',
      hex: '#EA580C',
      pandalCount: 3,
      stationsCount: 4,
      image: '/brand/metro-orange-line.jpg',
      badgeClass: 'bg-orange-600 text-white shadow-xs',
      borderDefault: 'border-orange-500/30 hover:border-orange-500 dark:border-orange-500/20',
      activeBorder: 'border-orange-500',
      activeRing: 'ring-4 ring-orange-500/30 shadow-xl shadow-orange-500/20',
      bgGradient: 'from-orange-600/15 via-orange-500/5 to-transparent dark:from-orange-900/30 dark:via-orange-950/20 dark:to-transparent',
      accentBg: 'bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800/60'
    },
    {
      id: 'purple' as const,
      name: 'Purple Line',
      bengaliName: 'পার্পল লাইন',
      route: 'Joka ↔ Taratala / Esplanade',
      corridor: 'Diamond Harbour Road',
      hex: '#9333EA',
      pandalCount: 7,
      stationsCount: 4,
      image: '/brand/metro-purple-line.jpg',
      badgeClass: 'bg-purple-600 text-white shadow-xs',
      borderDefault: 'border-purple-500/30 hover:border-purple-500 dark:border-purple-500/20',
      activeBorder: 'border-purple-500',
      activeRing: 'ring-4 ring-purple-500/30 shadow-xl shadow-purple-500/20',
      bgGradient: 'from-purple-600/15 via-purple-500/5 to-transparent dark:from-purple-900/30 dark:via-purple-950/20 dark:to-transparent',
      accentBg: 'bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800/60'
    }
  ];

  // Filter stations by line and search query
  const filteredStations = useMemo(() => {
    let list = METRO_STATIONS_DATA;
    if (selectedLine !== 'all') {
      list = list.filter((s) => s.line_code === selectedLine);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((s) => 
        s.name.toLowerCase().includes(q) ||
        (s.bengali_name && s.bengali_name.includes(q)) ||
        s.nearby_pandals.some((p) => p.pandal_name.toLowerCase().includes(q))
      );
    }
    return list;
  }, [selectedLine, searchQuery]);

  // Helper for line color badges
  const getLineStyles = (lineCode: string) => {
    switch (lineCode) {
      case 'blue':
        return {
          bg: 'bg-[#1D63ED]',
          border: 'border-blue-500/40',
          lightBg: 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300'
        };
      case 'green':
        return {
          bg: 'bg-[#059669]',
          border: 'border-emerald-500/40',
          lightBg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'
        };
      case 'orange':
        return {
          bg: 'bg-[#EA580C]',
          border: 'border-orange-500/40',
          lightBg: 'bg-orange-50 text-orange-700 dark:bg-orange-950/50 dark:text-orange-300'
        };
      case 'purple':
        return {
          bg: 'bg-[#9333EA]',
          border: 'border-purple-500/40',
          lightBg: 'bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300'
        };
      default:
        return {
          bg: 'bg-stone-600',
          border: 'border-stone-400',
          lightBg: 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300'
        };
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 w-full space-y-6 sm:space-y-8">
      
      {/* 1. HERO / TITLE SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-2 pb-2">
        <div className="max-w-xl space-y-4">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-editorial text-[#181513] dark:text-[#FAF8F5] leading-[1.12] tracking-tight">
            Explore <span className="inline-block text-[#D8261C] text-2xl sm:text-4xl align-top">🍂</span>
            <br />
            Kolkata Pujo
            <br />
            by Metro <span className="inline-block text-[#D8261C] font-normal text-2xl sm:text-4xl italic">〰</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#57534E] dark:text-[#A8A29E] leading-relaxed font-medium">
            Skip city traffic completely. Select any station on the Blue Line, Green Line, or Purple Line to reveal iconic pandals, walking distance, and direct routes.
          </p>

          {/* Red Color Explore Map 5 Lines Button */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setIsMapModalOpen(true)}
              className="w-full sm:w-auto py-3 px-5 rounded-2xl bg-gradient-to-r from-[#D8261C] to-[#B91C1C] hover:from-[#B91C1C] hover:to-[#991B1B] text-white font-bold text-sm inline-flex items-center justify-center gap-2.5 shadow-lg shadow-red-600/25 hover:shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/20"
            >
              <MapIcon className="w-4 h-4 text-[#FDE047]" />
              <span>Explore Metro Map • 5 Lines</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. FOUR SQUARE LINE CARDS (BLUE, GREEN, ORANGE, PURPLE) */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#D8261C] dark:text-amber-400 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Metro Line Corridors
            </span>
            <span className="text-[11px] text-stone-500 font-medium">
              (Tap a card to filter stations)
            </span>
          </div>

          {selectedLine !== 'all' && (
            <button
              type="button"
              onClick={() => setSelectedLine('all')}
              className="text-xs font-bold text-[#D8261C] dark:text-amber-400 hover:underline flex items-center gap-1 bg-white/80 dark:bg-stone-800 px-3 py-1 rounded-full border border-stone-200 dark:border-white/10 shadow-2xs transition-all"
            >
              <span>Show All Lines (24 Stations)</span>
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* The Four Cards Grid Featuring Generated Metro Images */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-5">
          {METRO_LINE_CARDS.map((line) => {
            const isSelected = selectedLine === line.id;
            return (
              <button
                key={line.id}
                type="button"
                onClick={() => setSelectedLine(isSelected ? 'all' : line.id)}
                className={`group w-full rounded-[1.75rem] p-2.5 sm:p-3 flex flex-col justify-between text-left transition-all duration-300 relative overflow-hidden cursor-pointer select-none active:scale-[0.98] ${
                  isSelected
                    ? `${line.activeBorder} ${line.activeRing} bg-gradient-to-b ${line.bgGradient} bg-white dark:bg-[#1D1119] shadow-xl`
                    : `bg-white dark:bg-[#1A1217] hover:bg-white dark:hover:bg-[#20151C] border ${line.borderDefault} shadow-md hover:shadow-xl hover:-translate-y-1`
                }`}
              >
                {/* Background decorative gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${line.bgGradient} opacity-20 dark:opacity-40 pointer-events-none`} />

                {/* 1. Metro Train Image Window */}
                <div className="relative w-full aspect-[16/11] sm:aspect-[16/10] rounded-2xl overflow-hidden shadow-inner group-hover:shadow-md transition-all shrink-0 mb-2">
                  <Image
                    src={line.image}
                    alt={line.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  {/* Subtle Cinematic Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/35 pointer-events-none" />

                  {/* Top-Left Floating Line Badge */}
                  <div className="absolute top-2 left-2 z-10 flex items-center gap-1">
                    <span
                      className="px-2 py-0.5 rounded-full text-[9px] sm:text-[9.5px] font-mono font-bold text-white shadow-xs backdrop-blur-md flex items-center gap-1 border border-white/20"
                      style={{ backgroundColor: line.hex }}
                    >
                      <Train className="w-2.5 h-2.5" />
                      <span>{line.name}</span>
                    </span>
                  </div>

                  {/* Top-Right Select Status Button */}
                  <div className="absolute top-2 right-2 z-10">
                    <div
                      className={`w-5.5 h-5.5 rounded-full flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-[#D8261C] text-white shadow-xs ring-1 ring-white/50'
                          : 'bg-black/60 text-white/90 backdrop-blur-md group-hover:bg-white group-hover:text-stone-900'
                      }`}
                    >
                      {isSelected ? (
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      ) : (
                        <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
                      )}
                    </div>
                  </div>

                  {/* Bottom Floating Stats (Stations & Pandals) */}
                  <div className="absolute bottom-1.5 inset-x-1.5 z-10 flex items-center justify-between gap-1">
                    <span className="px-1.5 py-0.5 rounded-md text-[8.5px] font-mono font-semibold bg-black/75 backdrop-blur-md text-white border border-white/15 truncate">
                      {line.stationsCount} {language === 'bn' ? 'স্টেশন' : 'Stations'}
                    </span>
                    <span className="px-1.5 py-0.5 rounded-md text-[8.5px] font-mono font-bold bg-[#D8261C] text-white shadow-xs truncate">
                      {line.pandalCount} {language === 'bn' ? 'প্যান্ডেল' : 'Pandals'}
                    </span>
                  </div>
                </div>

                {/* 2. Content Area */}
                <div className="relative z-10 px-0.5 space-y-0.5 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full shrink-0 animate-pulse"
                      style={{ backgroundColor: line.hex }}
                    />
                    <h3 className="text-sm sm:text-base font-bold text-stone-900 dark:text-white leading-tight tracking-tight truncate">
                      {language === 'bn' ? line.bengaliName : line.name}
                    </h3>
                  </div>
                  <p className="text-[11px] text-stone-600 dark:text-stone-300 font-semibold line-clamp-1">
                    {line.route}
                  </p>
                  <p className="text-[9.5px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 font-medium truncate">
                    {line.corridor}
                  </p>
                </div>

                {/* 3. Bottom Bar: Action Cue + Chevron */}
                <div className="flex items-center justify-between relative z-10 pt-1.5 border-t border-stone-200/80 dark:border-white/10 w-full text-[10.5px] font-bold px-0.5">
                  <span
                    className={
                      isSelected
                        ? 'text-[#D8261C] dark:text-amber-400'
                        : 'text-stone-600 dark:text-stone-400 group-hover:text-stone-900 dark:group-hover:text-white'
                    }
                  >
                    {isSelected
                      ? (language === 'bn' ? 'নির্বাচিত লাইন' : 'Active Line')
                      : (language === 'bn' ? 'স্টেশন ফিল্টার' : 'Filter Stations')}
                  </span>
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center transition-transform duration-300 ${
                      isSelected
                        ? 'bg-[#D8261C] text-white shadow-xs'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 group-hover:translate-x-0.5'
                    }`}
                  >
                    <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. STATIONS CARD CONTAINER — MATCHING REFERENCE MOCKUP */}
      <div className="bg-white dark:bg-[#1C1917] rounded-[2.2rem] border border-stone-200 dark:border-white/10 shadow-2xl p-4 sm:p-7 space-y-4">
        
        {/* Card Header: Stations Count & Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200/80 dark:border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-50 dark:bg-red-950/40 text-[#D8261C] flex items-center justify-center shrink-0 border border-red-200/60 dark:border-red-900/40 shadow-2xs">
              <Train className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-stone-900 dark:text-white leading-tight tracking-tight">
                {language === 'bn' ? 'মেট্রো স্টেশন' : 'Stations'} ({filteredStations.length})
              </h2>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5 font-medium">
                {language === 'bn' ? 'কাছের প্যান্ডেল দেখতে যেকোনো স্টেশন বেছে নিন' : 'Select a station to explore nearby pandals'}
              </p>
            </div>
          </div>

          {/* Search bar inside pill */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                const val = e.target.value;
                setSearchQuery(val);
                if (val.trim().length >= 3) {
                  const match = METRO_STATIONS_DATA.find((s) =>
                    s.name.toLowerCase().includes(val.trim().toLowerCase())
                  );
                  if (match) {
                    setExpandedStationId(match.id);
                  }
                }
              }}
              placeholder="Search station (e.g. Kalighat, Shyambazar)..."
              className="w-full pl-9 pr-8 py-2 rounded-full bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-white/10 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#D8261C]/30 focus:border-[#D8261C] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 dark:hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Stations Rows List */}
        <div className="divide-y divide-stone-100 dark:divide-white/5">
          {filteredStations.length === 0 ? (
            <div className="text-center py-12 text-stone-500 text-xs">
              No stations found matching &quot;{searchQuery}&quot;. Try another station or line.
            </div>
          ) : (
            filteredStations.map((station) => {
              const isExpanded = expandedStationId === station.id;
              const lineStyle = getLineStyles(station.line_code);
              const isSearchedMatch =
                searchQuery.trim().length >= 2 &&
                station.name.toLowerCase().includes(searchQuery.trim().toLowerCase());
              
              // Calculate nearest walking time, distance, and estimated steps
              const nearestPandal = station.nearby_pandals[0];
              const minWalkTime = nearestPandal ? nearestPandal.walking_time_mins : 5;
              const walkDistance = nearestPandal ? nearestPandal.walking_distance.split('(')[0].trim() : '450m';
              const approxSteps = Math.round(minWalkTime * 125);

              return (
                <div
                  key={station.id}
                  className={`py-3 sm:py-3.5 transition-colors ${
                    isSearchedMatch ? 'bg-red-50/40 dark:bg-red-950/20 rounded-2xl px-2' : ''
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setExpandedStationId(isExpanded ? null : station.id)}
                    className="w-full text-left flex items-center justify-between gap-3 group select-none py-1"
                  >
                    {/* Left: Circle "M" + Name + Bengali + Pandal Count + You Are Here badge */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-white text-xs sm:text-sm shadow-xs shrink-0 ${lineStyle.bg}`}
                      >
                        M
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm sm:text-base font-bold text-stone-900 dark:text-white group-hover:text-[#D8261C] transition-colors truncate">
                            {station.name}
                          </h3>
                          {isSearchedMatch && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-xs flex items-center gap-1 border border-amber-300 animate-pulse shrink-0">
                              <span>📍</span>
                              <span>YOU ARE HERE</span>
                            </span>
                          )}
                          <span className="bg-red-50 dark:bg-red-950/50 text-[#D8261C] dark:text-red-300 font-bold text-[10px] px-2.5 py-0.5 rounded-full border border-red-200/60 dark:border-red-900/40 shrink-0">
                            {station.nearby_pandals.length} {station.nearby_pandals.length === 1 ? 'Pandal' : 'Pandals'}
                          </span>
                        </div>
                        <div className="text-xs text-stone-600 dark:text-stone-400 mt-0.5 truncate font-medium">
                          {station.bengali_name}
                        </div>
                      </div>
                    </div>

                    {/* Right: Time, Steps, Distance stats + Circular Chevron Button */}
                    <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
                      <div className="text-right flex flex-col items-end">
                        {/* Time & Distance */}
                        <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900 dark:text-stone-100">
                          <Clock className="w-3.5 h-3.5 text-[#D8261C]" />
                          <span>{minWalkTime} min</span>
                          <span className="text-stone-300 dark:text-stone-600">•</span>
                          <span className="text-stone-700 dark:text-stone-300 font-semibold">{walkDistance}</span>
                        </div>
                        {/* Steps */}
                        <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-800 dark:text-amber-400 mt-0.5">
                          <Footprints className="w-3 h-3 text-[#D8261C]" />
                          <span>~{approxSteps.toLocaleString()} steps</span>
                        </div>
                      </div>

                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isExpanded
                            ? 'bg-[#D8261C] text-white shadow-xs rotate-90'
                            : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 group-hover:bg-[#D8261C] group-hover:text-white'
                        }`}
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </button>

                  {/* Expanded Accordion Drawer for Nearby Pandals */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-dashed border-stone-200 dark:border-white/10 animate-in fade-in slide-in-from-top-2 duration-200 space-y-3">
                      <div className="flex items-center justify-between text-xs font-semibold text-stone-600 dark:text-stone-400 px-1">
                        <span>Connected Pandals from {station.name}:</span>
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${station.latitude},${station.longitude}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#D8261C] hover:underline flex items-center gap-1 font-bold"
                        >
                          <MapPin className="w-3 h-3" />
                          <span>Station in Maps</span>
                        </a>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        {station.nearby_pandals.map((item) => {
                          const pandal = PANDALS_DATA.find((p) => p.id === item.pandal_id);
                          const pandalName = pandal?.name || item.pandal_name;
                          const pandalSlug = pandal?.slug || item.pandal_id;
                          const pandalImage = pandal?.featured_image || `/pandals/${item.pandal_id}.jpg`;
                          const pandalLocality = pandal?.locality || `${station.name} Area`;
                          const itemSteps = Math.round(item.walking_time_mins * 125);
                          const walkUrl = item.directions_url || `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(`${station.name} Metro Station, Kolkata`)}&destination=${encodeURIComponent(`${pandalName}, Kolkata`)}&travelmode=walking`;

                          return (
                            <div
                              key={item.pandal_id}
                              className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-900/80 border border-stone-200 dark:border-white/10 hover:border-[#D8261C]/50 transition-all flex flex-col justify-between gap-3 group"
                            >
                              <div className="flex items-start gap-3">
                                <div className="w-14 h-14 rounded-xl overflow-hidden relative shrink-0 border border-stone-200 dark:border-white/10 bg-stone-100">
                                  <Image
                                    src={pandalImage}
                                    alt={pandalName}
                                    fill
                                    sizes="56px"
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                  />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <Link
                                    href={`/pandal/${pandalSlug}`}
                                    className="text-xs sm:text-sm font-bold text-stone-900 dark:text-white hover:text-[#D8261C] transition-colors line-clamp-1"
                                  >
                                    {pandalName}
                                  </Link>
                                  <p className="text-[11px] text-stone-600 dark:text-stone-400 truncate mt-0.5 font-medium">
                                    {pandalLocality}
                                  </p>
                                  
                                  {/* 3 Metric Pills: Time, Steps, Distance */}
                                  <div className="mt-2 flex items-center gap-1.5 flex-wrap text-[10px] font-bold">
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-red-50 dark:bg-red-950/40 text-[#D8261C] dark:text-red-300 border border-red-200/50 dark:border-red-900/40">
                                      <Clock className="w-2.5 h-2.5" />
                                      <span>{item.walking_time_mins} min</span>
                                    </span>
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200/50 dark:border-amber-900/40">
                                      <Footprints className="w-2.5 h-2.5" />
                                      <span>~{itemSteps.toLocaleString()} steps</span>
                                    </span>
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-white/10">
                                      <MapPin className="w-2.5 h-2.5 text-[#D8261C]" />
                                      <span>{item.walking_distance}</span>
                                    </span>
                                    {(item.walking_distance.toLowerCase().includes('auto') || item.walking_time_mins >= 12) && (
                                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 border border-amber-300/60 dark:border-amber-800/50 font-bold">
                                        <span>🛺 Auto: ~{item.walking_distance.match(/Auto(?:\/E-Rickshaw)?\s*(?:available)?\s*(\d+)\s*mins?/i)?.[1] || Math.max(3, Math.round(item.walking_time_mins / 3.5))} min</span>
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 pt-2 border-t border-stone-200/60 dark:border-white/10">
                                <Link
                                  href={`/pandal/${pandalSlug}`}
                                  className="flex-1 py-1.5 rounded-lg bg-white dark:bg-stone-800 hover:bg-[#D8261C] text-stone-800 dark:text-stone-200 hover:text-white text-[11px] font-bold text-center border border-stone-200 dark:border-white/10 transition-colors"
                                >
                                  Details
                                </Link>
                                <a
                                  href={walkUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="py-1.5 px-3 rounded-lg bg-[#D8261C] hover:bg-[#B91C1C] text-white text-[11px] font-bold flex items-center gap-1 shadow-2xs transition-colors shrink-0"
                                >
                                  <MapPin className="w-3 h-3 text-[#FDE047]" />
                                  <span>Walk Path</span>
                                </a>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

      </div>

      {/* Official Kolkata Metro Map & Fare Explorer Modal */}
      <KolkataMetroExplorerModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
      />

    </div>
  );
}
