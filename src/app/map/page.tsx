'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, X, Map as MapIcon, ArrowRight, Info, Train, Sparkles, ExternalLink } from 'lucide-react';
import { PANDALS_DATA } from '@/data/pandals';
import { METRO_FULL_MAP_DATA, FullMetroStation, getStationRecommendations } from '@/data/kolkataMetroFullMap';
import KolkataMetroExplorerModal from '@/components/KolkataMetroExplorerModal';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';

export default function MapPage() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [showMap, setShowMap] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInitialStation, setSelectedInitialStation] = useState<FullMetroStation | null>(null);
  const [selectedStation, setSelectedStation] = useState<FullMetroStation | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const searchWrapperRef = useRef<HTMLDivElement>(null);

  // Flatten all metro stations
  const allStations = useMemo(() => {
    const list: FullMetroStation[] = [];
    Object.values(METRO_FULL_MAP_DATA).forEach((line) => {
      line.stations.forEach((st) => {
        if (!list.some((existing) => existing.id === st.id)) list.push(st);
      });
    });
    return list.sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  // Station pandals count map
  const stationPandalsCount = useMemo(() => {
    const map: Record<string, number> = {};
    PANDALS_DATA.forEach((p) => {
      if (p.nearest_metro) {
        const norm = p.nearest_metro.toLowerCase();
        allStations.forEach((st) => {
          if (norm.includes(st.name.toLowerCase())) {
            map[st.id] = (map[st.id] || 0) + 1;
          }
        });
      }
    });
    return map;
  }, [allStations]);

  // Recommended stations based on query (supports Dhamda -> Dum Dum, station, etc.)
  const recommendations = useMemo(() => {
    return getStationRecommendations(searchQuery, allStations);
  }, [searchQuery, allStations]);

  // Close search dropdown on click outside
  useEffect(() => {
    const handler = (e: MouseEvent | TouchEvent) => {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, []);

  // Restore station from URL search params or sessionStorage on mount and browser navigation (Back/Forward)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const restoreStation = () => {
      const params = new URLSearchParams(window.location.search);
      let stationId = params.get('station');

      if (!stationId) {
        try {
          stationId = sessionStorage.getItem('pandale_map_selected_station');
        } catch (e) {}
      }

      if (stationId) {
        const found = allStations.find((s) => s.id === stationId);
        if (found) {
          setSelectedStation(found);
          setSelectedInitialStation(found);
          setSearchQuery(found.name);

          // Ensure URL reflects active station without page reload
          const url = new URL(window.location.href);
          if (url.searchParams.get('station') !== found.id) {
            url.searchParams.set('station', found.id);
            window.history.replaceState(null, '', url.toString());
          }
        }
      }

      if (params.get('view') === 'map' || window.location.hash === '#map') {
        setShowMap(true);
      }
    };

    restoreStation();

    window.addEventListener('popstate', restoreStation);
    return () => window.removeEventListener('popstate', restoreStation);
  }, [allStations]);

  const handleSelectStation = (station: FullMetroStation) => {
    setSelectedStation(station);
    setSelectedInitialStation(station);
    setSearchQuery(station.name);
    setIsSearchFocused(false);

    // Persist in URL query string & sessionStorage so back navigation remembers
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('station', station.id);
      window.history.replaceState(null, '', url.toString());
      try {
        sessionStorage.setItem('pandale_map_selected_station', station.id);
      } catch (e) {}
    }
  };

  const handleCloseStation = () => {
    setSelectedStation(null);
    setSearchQuery('');
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('station');
      window.history.replaceState(null, '', url.toString());
      try {
        sessionStorage.removeItem('pandale_map_selected_station');
      } catch (e) {}
    }
  };

  // Find all pandals linked to the selected station
  const selectedStationPandals = useMemo(() => {
    if (!selectedStation) return [];
    const stnNameNorm = selectedStation.name.toLowerCase();
    const stnId = selectedStation.id.toLowerCase();

    const matched: typeof PANDALS_DATA = [];
    const seenSlugs = new Set<string>();

    PANDALS_DATA.forEach((p) => {
      const nm = (p.nearest_metro || '').toLowerCase();
      const matchesNearest = nm.includes(stnNameNorm) || nm.includes(stnId.replace(/-/g, ' '));
      const matchesDetails = p.metro_details && p.metro_details.some(md => 
        md.station_id === selectedStation.id || 
        md.station_name.toLowerCase().includes(stnNameNorm)
      );
      if (matchesNearest || matchesDetails) {
        seenSlugs.add(p.slug);
        matched.push(p);
      }
    });

    // Also include any explicitly declared nearbyPandals on this station
    if (selectedStation.nearbyPandals) {
      selectedStation.nearbyPandals.forEach((np) => {
        if (!seenSlugs.has(np.slug)) {
          seenSlugs.add(np.slug);
          const fromData = PANDALS_DATA.find(
            (p) => p.slug === np.slug || p.name.toLowerCase().includes(np.name.toLowerCase())
          );
          if (fromData) {
            matched.push(fromData);
          } else {
            matched.push({
              id: np.slug,
              slug: np.slug,
              name: np.name,
              walking_distance: np.distance,
              featured_image: '/brand/hero-poster.jpg',
              area: selectedStation.zone || 'Kolkata',
              theme: 'Durga Puja 2026',
            } as any);
          }
        }
      });
    }

    return matched;
  }, [selectedStation]);

  // If map is shown, render the full map view
  if (showMap) {
    return (
      <div className="w-full h-[calc(100dvh-4.5rem)] md:h-[calc(100dvh-5.5rem)] flex flex-col overflow-hidden relative">
        <KolkataMetroExplorerModal 
          isPage={true} 
          initialStation={selectedInitialStation}
          onClose={() => {
            setShowMap(false);
            setSelectedInitialStation(null);
          }} 
        />
      </div>
    );
  }

  return (
    <div className={`relative min-h-[calc(100dvh-4.5rem)] md:min-h-[calc(100dvh-5.5rem)] flex flex-col items-center justify-center px-4 py-10 overflow-hidden transition-all duration-300 ${
      selectedStation ? 'pb-80 sm:pb-72' : ''
    }`}>
      {/* Full-bleed Durga Puja background */}
      <Image
        src="/brand/kolkata-metro-durga-art.jpg"
        alt="Durga Puja Background"
        fill
        className="object-cover object-center"
        priority
        quality={95}
      />
      {/* Layered gradient overlays for readability while keeping the golden idol radiant */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(220,100,0,0.15)_0%,_transparent_75%)] pointer-events-none" />
      {/* ── Centralized Hero ── */}
      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center text-center">

        {/* Logo with gentle floating jiggle */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mb-5 shadow-2xl border border-white/20 bg-black/40 backdrop-blur-xl transition-transform hover:scale-105 animate-float-jiggle">
          <Image
            src="/brand/pandale-icon.png"
            alt="Pandalé Logo"
            width={56}
            height={56}
            className="object-contain"
            priority
          />
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-2 text-white drop-shadow-lg">
          Pandal<span className="text-[#F97316]">é</span>{' '}
          <span className="text-amber-200">Metro Map</span>
        </h1>
        <p className="text-sm sm:text-base font-medium mb-8 max-w-md text-stone-300">
          {language === 'bn'
            ? 'কলকাতা মেট্রো স্টেশন ও দুর্গাপূজা প্যান্ডেল একসাথে অন্বেষণ করুন'
            : 'Explore Kolkata Metro stations & Durga Puja pandals together'}
        </p>

        {/* Search Bar + Auto Recommendations */}
        <div ref={searchWrapperRef} className="w-full relative z-30">
          {/* ── Search Input ── */}
          <div className="relative flex items-center w-full rounded-2xl border border-white/20 hover:border-white/40 focus-within:border-amber-400/60 focus-within:bg-black/60 transition-all duration-200 shadow-2xl backdrop-blur-xl bg-black/50">
            <button
              type="button"
              onClick={() => setShowMap(true)}
              className="pl-4 pr-2 flex items-center justify-center shrink-0 text-[#D8261C] cursor-pointer"
              title="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={searchQuery}
              onFocus={() => setIsSearchFocused(true)}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchFocused(true);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (recommendations.length > 0) {
                    handleSelectStation(recommendations[0]);
                  } else {
                    setShowMap(true);
                  }
                }
              }}
              placeholder={
                language === 'bn'
                  ? 'মেট্রো স্টেশন বা এলাকা খুঁজুন (যেমন: দমদম, কালীঘাট)...'
                  : 'Search metro station (e.g. Dum Dum, Kalighat)...'
              }
              className="w-full py-4 sm:py-5 text-sm sm:text-base bg-transparent focus:outline-none font-medium text-white placeholder:text-stone-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={handleCloseStation}
                className="pr-2 pl-2 flex items-center shrink-0 text-stone-400 hover:text-white transition-colors cursor-pointer"
                title="Clear"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                if (recommendations.length > 0) {
                  handleSelectStation(recommendations[0]);
                } else {
                  setShowMap(true);
                }
              }}
              className="mr-3 p-2.5 rounded-xl bg-[#D8261C] hover:bg-red-600 active:scale-95 text-white transition-all cursor-pointer shrink-0 shadow-md"
              title="Open Metro Map"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* ── Auto Recommendation Cards Dropdown ── */}
          {isSearchFocused && searchQuery.trim().length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl shadow-2xl border border-white/20 bg-stone-950/95 backdrop-blur-2xl max-h-80 overflow-y-auto z-50 divide-y divide-white/10 text-left animate-in fade-in slide-in-from-top-2 duration-150 shadow-black/80 ring-1 ring-white/10">
              <div className="px-3.5 py-2 text-[10.5px] font-mono uppercase tracking-wider text-amber-400 flex items-center justify-between bg-white/[0.03]">
                <div className="flex items-center gap-1.5 font-bold">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>
                    {language === 'bn' ? 'প্রস্তাবিত মেট্রো স্টেশন' : 'Recommended Metro Stations'} ({recommendations.length})
                  </span>
                </div>
                <span className="text-[9px] text-stone-400 font-sans">
                  Tap to view pandals ↵
                </span>
              </div>

              {recommendations.length === 0 ? (
                <div className="p-4 text-center text-xs text-stone-400">
                  {language === 'bn' ? 'কোনো মেট্রো স্টেশন পাওয়া যায়নি' : `No station matching "${searchQuery}"`}
                </div>
              ) : (
                recommendations.map((st) => {
                  const lineInfo = METRO_FULL_MAP_DATA[st.line];
                  const pCount = stationPandalsCount[st.id] || 0;
                  return (
                    <button
                      key={st.id}
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleSelectStation(st);
                      }}
                      className="w-full px-3.5 py-3 text-left flex items-center justify-between text-xs transition-colors cursor-pointer group hover:bg-white/10"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-[10.5px] font-black text-white shadow-sm"
                          style={{ backgroundColor: lineInfo?.color ?? '#1D63ED' }}
                        >
                          {st.line === 'blue' ? 'L1' : st.line === 'green' ? 'L2' : st.line === 'purple' ? 'L3' : st.line === 'yellow' ? 'L4' : 'L6'}
                        </span>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-sm text-white group-hover:text-amber-300 transition-colors">
                              {st.name}
                            </span>
                            <span className="text-xs text-stone-400">
                              ({st.bengaliName})
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-400 mt-0.5">
                            {lineInfo?.name.split(' (')[0]} • {st.zone || 'Kolkata'} Zone
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {pCount > 0 && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                            {pCount} {language === 'bn' ? 'পুজো' : 'Pandals'}
                          </span>
                        )}
                        <span className="text-[11px] font-bold text-amber-400 opacity-90 group-hover:opacity-100 flex items-center gap-0.5">
                          {language === 'bn' ? 'প্যান্ডেল দেখুন' : 'View Pandals'} <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          )}

          {/* ── Action Buttons ── */}
          <div className="flex items-center justify-center gap-3 mt-4 flex-wrap">
            {/* About Us button */}
            <button
              type="button"
              onClick={() => setIsAboutOpen(true)}
              className="px-5 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 border border-white/20 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 shadow-sm active:scale-95 transition-all cursor-pointer btn-jiggle"
            >
              <Info className="w-3.5 h-3.5 text-amber-300" />
              <span>{language === 'bn' ? 'আমাদের সম্পর্কে' : 'About Us'}</span>
            </button>

            {/* View Metro Map button */}
            <button
              type="button"
              onClick={() => setShowMap(true)}
              className="px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 bg-[#D8261C] hover:bg-[#B91C1C] text-white shadow-xl shadow-red-950/60 hover:shadow-2xl hover:shadow-red-700/60 active:scale-95 transition-all cursor-pointer btn-jiggle animate-smooth-jiggle group"
            >
              <MapIcon className="w-3.5 h-3.5 text-yellow-300 group-hover:scale-125 transition-transform" />
              <span>{language === 'bn' ? 'মেট্রো ম্যাপ দেখুন' : 'View Metro Map'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>


        {/* Bottom stats pills (hidden when a station is selected) */}
        {!selectedStation && (
          <div className="flex items-center gap-3 mt-10 flex-wrap justify-center animate-in fade-in duration-300">
            {[
              { label: language === 'bn' ? 'মেট্রো স্টেশন' : 'Metro Stations', value: allStations.length },
              { label: language === 'bn' ? 'পুজো প্যান্ডেল' : 'Puja Pandals', value: PANDALS_DATA.length },
              { label: language === 'bn' ? 'মেট্রো লাইন' : 'Metro Lines', value: 5 },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="px-4 py-2 rounded-2xl text-center border border-white/15 bg-black/40 backdrop-blur-md shadow-sm"
              >
                <div className="text-lg font-bold text-amber-300">{value}</div>
                <div className="text-[10px] font-medium uppercase tracking-wide text-stone-400">{label}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Half-Screen Station Pandals Popup Drawer ── */}
      {selectedStation && (
        <div className="fixed inset-x-0 bottom-0 z-40 flex justify-center pointer-events-auto">
          {/* Ambient Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity -z-10 animate-in fade-in duration-300"
            onClick={handleCloseStation}
          />

          {/* Drawer Card with curved borders and smooth slide-up animation */}
          <div className="w-full max-w-3xl h-[52vh] sm:h-[50vh] max-h-[58vh] bg-[#121214]/95 border-t border-x border-amber-500/30 rounded-t-[2.25rem] sm:rounded-t-[2.5rem] shadow-[0_-20px_50px_rgba(0,0,0,0.85)] backdrop-blur-2xl text-white flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300 ease-out fill-mode-both">
            {/* Drag handle pill */}
            <div className="pt-2.5 pb-1 flex justify-center shrink-0">
              <div className="w-12 h-1.5 rounded-full bg-white/20" />
            </div>

            {/* Header */}
            <div className="px-5 py-2.5 border-b border-white/10 flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <span 
                  className="w-8 h-8 rounded-xl shrink-0 flex items-center justify-center text-xs font-black text-white shadow-md"
                  style={{ backgroundColor: METRO_FULL_MAP_DATA[selectedStation.line]?.color || '#1D63ED' }}
                >
                  {selectedStation.line === 'blue' ? 'L1' : selectedStation.line === 'green' ? 'L2' : selectedStation.line === 'purple' ? 'L3' : selectedStation.line === 'yellow' ? 'L4' : 'L6'}
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base sm:text-lg font-bold text-white truncate">
                      {selectedStation.name}
                    </h3>
                    <span className="text-xs text-stone-400 font-medium truncate">
                      ({selectedStation.bengaliName})
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      {selectedStationPandals.length} {language === 'bn' ? 'পুজো প্যান্ডেল' : 'Pandals nearby'}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-400">
                    {METRO_FULL_MAP_DATA[selectedStation.line]?.name.split(' (')[0]} • {selectedStation.zone || 'Kolkata'} Zone
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedInitialStation(selectedStation);
                    setShowMap(true);
                  }}
                  className="px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 bg-[#D8261C] hover:bg-[#B91C1C] text-white shadow-md active:scale-95 transition-all cursor-pointer"
                  title="View on Interactive Metro Map"
                >
                  <MapIcon className="w-3.5 h-3.5 text-yellow-300" />
                  <span className="hidden sm:inline">{language === 'bn' ? 'ম্যাপে দেখুন' : 'View on Map'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleCloseStation}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-colors cursor-pointer"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Small Cards Content Area */}
            <div className="p-3 sm:p-4 overflow-y-auto flex-1 min-h-0">
              {selectedStationPandals.length === 0 ? (
                <div className="py-12 text-center text-sm text-stone-400">
                  {language === 'bn' ? 'এই স্টেশনের ৫০০ মিটারের মধ্যে কোনো নিবন্ধিত পুজো নেই।' : 'No direct registered pandals listed within 500m of this station.'}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedStationPandals.map((p) => {
                    const directMaps = p.google_maps_url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.name + ' Durga Puja Kolkata')}`;
                    const imgSrc = p.featured_image || '/brand/hero-poster.jpg';
                    return (
                      <div 
                        key={p.id}
                        className="p-2.5 rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-amber-400/40 transition-all flex items-center gap-3 group shadow-md backdrop-blur-md"
                      >
                        {/* Thumbnail Image */}
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-stone-800 border border-white/10">
                          <Image
                            src={imgSrc}
                            alt={p.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                            sizes="48px"
                          />
                        </div>

                        {/* Details */}
                        <div className="min-w-0 flex-1">
                          <Link 
                            href={`/pandal/${p.slug}`}
                            onClick={() => {
                              if (typeof window !== 'undefined' && selectedStation) {
                                try {
                                  sessionStorage.setItem('pandale_map_selected_station', selectedStation.id);
                                } catch (e) {}
                              }
                            }}
                            className="font-bold text-xs sm:text-sm text-white hover:text-amber-300 transition-colors block truncate leading-snug"
                          >
                            {p.name}
                          </Link>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="px-1.5 py-0.2 rounded text-[9.5px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">
                              {p.walking_distance || 'Nearby'}
                            </span>
                            {p.area && (
                              <span className="text-[10px] text-stone-400 truncate">
                                {p.area}
                              </span>
                            )}
                          </div>
                          {p.theme && (
                            <p className="text-[10.5px] text-stone-400 font-medium truncate mt-0.5">
                              🎨 {p.theme}
                            </p>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col items-end gap-1 shrink-0">
                          <Link 
                            href={`/pandal/${p.slug}`}
                            onClick={() => {
                              if (typeof window !== 'undefined' && selectedStation) {
                                try {
                                  sessionStorage.setItem('pandale_map_selected_station', selectedStation.id);
                                } catch (e) {}
                              }
                            }}
                            className="px-2.5 py-1 rounded-lg text-[10.5px] font-bold text-white bg-[#D8261C] hover:bg-red-600 active:scale-95 transition-all shadow-sm"
                          >
                            {language === 'bn' ? 'দেখুন' : 'View'}
                          </Link>
                          <a
                            href={directMaps}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 rounded-md text-stone-400 hover:text-white transition-colors"
                            title="Google Maps Directions"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── About Us Modal ── */}
      {isAboutOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setIsAboutOpen(false)}
        >
          <div
            className={`relative w-full max-w-md rounded-3xl p-6 shadow-2xl border animate-in fade-in slide-in-from-bottom-4 duration-200 ${
              isDark ? 'bg-[#1A1715] border-white/10 text-stone-100' : 'bg-white border-stone-200 text-stone-900'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsAboutOpen(false)}
              className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center border transition-colors cursor-pointer ${
                isDark ? 'border-stone-700 text-stone-400 hover:text-white hover:bg-stone-800' : 'border-stone-200 text-stone-400 hover:text-stone-700 hover:bg-stone-100'
              }`}
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${isDark ? 'bg-red-950/40 border-red-900/40' : 'bg-red-50 border-red-200'}`}>
                <Image src="/brand/pandale-icon.png" alt="Pandalé" width={32} height={32} className="object-contain" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Pandal<span className="text-[#D8261C]">é</span> 2026</h3>
                <p className={`text-xs font-medium ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  {language === 'bn' ? 'কলকাতা দুর্গাপূজা ট্রানজিট প্ল্যাটফর্ম' : 'Kolkata Durga Puja Transit Platform'}
                </p>
              </div>
            </div>

            <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
              {language === 'bn'
                ? 'প্যান্ডেল হলো কলকাতার দুর্গাপূজা পরিক্রমা সহজ করার একটি ডিজিটাল উদ্যোগ। শহরের ট্রাফিক এড়িয়ে মেট্রো ও হাঁটার দূরত্বের মাধ্যমে প্রতিটি মণ্ডপে পৌঁছানোর জন্য তৈরি।'
                : 'Pandalé is built to make Kolkata Durga Puja hopping seamless — skip the traffic, navigate via metro lines, and discover each pandal by walking distance.'}
            </p>

            {/* ── Help Creator & UPI Redirect ── */}
            <div className="mt-4 pt-4 border-t border-stone-200/60 dark:border-white/10 space-y-2.5">
              <a
                href="upi://pay?pa=joy.thesloth@okicici&pn=Joydeep%20Das&cu=INR&tn=Pandale%20Support&aid=uGICAgKCA0KWEbQ"
                onClick={() => {
                  if (typeof navigator !== 'undefined' && navigator.clipboard) {
                    navigator.clipboard.writeText('joy.thesloth@okicici').catch(() => {});
                  }
                }}
                className="w-full py-3 px-4 rounded-2xl bg-[#D8261C] hover:bg-[#B91C1C] text-white font-bold text-xs flex items-center justify-between shadow-lg shadow-red-950/40 hover:shadow-xl active:scale-98 transition-all cursor-pointer group"
                title="Help Creator via UPI (GPay, PhonePe, Paytm)"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base sm:text-lg">☕</span>
                  <div className="text-left">
                    <span className="block font-extrabold text-xs sm:text-sm">
                      {language === 'bn' ? 'নির্মাতাকে সাহায্য করুন (Help Creator)' : 'Help Creator (Support Joydeep)'}
                    </span>
                    <span className="text-[10.5px] text-white/80 font-medium">
                      Redirects to UPI App · GPay, PhonePe, Paytm
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/20 group-hover:bg-white/30 text-[11px] font-black shrink-0 transition-colors">
                  <span>Pay with UPI</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </a>

              <div className={`p-3 rounded-2xl border flex items-center justify-between text-xs ${isDark ? 'bg-stone-900 border-stone-800' : 'bg-stone-50 border-stone-200'}`}>
                <span className={isDark ? 'text-stone-400' : 'text-stone-500'}>Created with ❤️ for Kolkata</span>
                <a
                  href="upi://pay?pa=joy.thesloth@okicici&pn=Joydeep%20Das&cu=INR&tn=Pandale%20Support&aid=uGICAgKCA0KWEbQ"
                  onClick={() => {
                    if (typeof navigator !== 'undefined' && navigator.clipboard) {
                      navigator.clipboard.writeText('joy.thesloth@okicici').catch(() => {});
                    }
                  }}
                  className="font-bold text-[#D8261C] hover:underline flex items-center gap-1 cursor-pointer"
                  title="Redirect to UPI App (GPay, PhonePe, Paytm)"
                >
                  <span>Joydeep Das →</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
