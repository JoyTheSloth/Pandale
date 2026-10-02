'use client';

import React, { useState, useMemo } from 'react';
import InteractiveMap from '@/components/InteractiveMap';
import { PANDALS_DATA } from '@/data/pandals';
import { METRO_STATIONS_DATA } from '@/data/metro';
import { ZoneArea, MetroStation } from '@/types';
import { MapPin, Train, Search, Filter, X, Sparkles, Navigation } from 'lucide-react';

export default function MapPage() {
  const [selectedZone, setSelectedZone] = useState<ZoneArea | 'All'>('All');
  const [search, setSearch] = useState('');
  const [userStation, setUserStation] = useState<MetroStation | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchContainerRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Click outside / touch outside listener to immediately close recommendation dropdown
  React.useEffect(() => {
    const closeDropdown = (e: MouseEvent | TouchEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', closeDropdown);
    document.addEventListener('touchstart', closeDropdown);
    return () => {
      document.removeEventListener('mousedown', closeDropdown);
      document.removeEventListener('touchstart', closeDropdown);
    };
  }, []);

  const zones: (ZoneArea | 'All')[] = [
    'All',
    'North Kolkata',
    'South Kolkata',
    'Central Kolkata',
    'East Kolkata'
  ];

  // Matched metro stations based on search query
  const matchedStations = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.trim().toLowerCase();
    return METRO_STATIONS_DATA.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.line.toLowerCase().includes(q) ||
        (s.bengali_name && s.bengali_name.includes(q))
    );
  }, [search]);

  // Handle station selection to set "You Are Here" - immediately closes recommendation dropdown
  const handleSelectStation = (station: MetroStation) => {
    setUserStation(station);
    setSearch(station.name);
    setShowDropdown(false);
    setIsSearchFocused(false);
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleClearStation = () => {
    setUserStation(null);
    setSearch('');
    setShowDropdown(false);
    setIsSearchFocused(false);
  };

  const filteredPandals = useMemo(() => {
    return PANDALS_DATA.filter((p) => {
      const matchZone = selectedZone === 'All' || p.area === selectedZone;
      // When a station is selected, don't filter out pandals by station name
      const isSelectedStationSearch = userStation && search.trim().toLowerCase() === userStation.name.toLowerCase();

      const matchSearch =
        !search.trim() ||
        isSelectedStationSearch ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.locality.toLowerCase().includes(search.toLowerCase()) ||
        p.nearest_metro.toLowerCase().includes(search.toLowerCase());
      return matchZone && matchSearch;
    });
  }, [selectedZone, search, userStation]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full space-y-4">
      
      {/* Map Control Bar with Integrated Search */}
      <div className="bg-white dark:bg-[#1C141B] p-4 sm:p-5 rounded-3xl border border-[#E9E2D8] dark:border-white/10 shadow-sm space-y-3.5 relative z-30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold font-editorial text-[#181513] dark:text-white">
                Kolkata Puja &amp; Metro Live Map
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-red-100 dark:bg-red-950/50 text-[#D8261C] dark:text-red-400 border border-red-200 dark:border-red-800/50">
                Interactive
              </span>
            </div>
            <p className="text-xs text-[#8E857B] dark:text-stone-400 mt-0.5">
              Showing {filteredPandals.length} pandals &amp; {METRO_STATIONS_DATA.length} metro stations. Type a metro station to drop your &quot;You Are Here&quot; pin.
            </p>
          </div>

          {/* Search Bar for Metro Station & Pandals */}
          <div ref={searchContainerRef} className="relative w-full md:w-80">
            <div className="relative group">
              <Search className="w-4 h-4 text-stone-400 group-focus-within:text-[#D8261C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setShowDropdown(true);
                  // Auto-match exact or close station name
                  const query = e.target.value.trim().toLowerCase();
                  if (query.length >= 3) {
                    const exact = METRO_STATIONS_DATA.find((s) => s.name.toLowerCase() === query);
                    if (exact) {
                      setUserStation(exact);
                    }
                  }
                }}
                onFocus={() => {
                  setIsSearchFocused(true);
                  if (!userStation || search.trim().toLowerCase() !== userStation.name.toLowerCase()) {
                    setShowDropdown(true);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setShowDropdown(false);
                    setIsSearchFocused(false);
                    inputRef.current?.blur();
                    if (matchedStations.length > 0) {
                      handleSelectStation(matchedStations[0]);
                    }
                  } else if (e.key === 'Escape') {
                    setShowDropdown(false);
                    setIsSearchFocused(false);
                    inputRef.current?.blur();
                  }
                }}
                placeholder="Enter metro station name (e.g. Kalighat, Dum Dum)..."
                className="w-full pl-9 pr-9 py-2.5 rounded-2xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-white/10 text-xs text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#D8261C]/30 focus:border-[#D8261C] focus:shadow-md transition-all duration-200 font-medium"
              />
              {search && (
                <button
                  type="button"
                  onClick={handleClearStation}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 dark:hover:text-white hover:scale-125 hover:rotate-90 active:scale-75 transition-all duration-150 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Station Suggestion Dropdown - closes immediately upon selection */}
            {showDropdown && isSearchFocused && matchedStations.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-[#1A1218] rounded-2xl border border-stone-200 dark:border-white/10 shadow-xl z-50 overflow-hidden divide-y divide-stone-100 dark:divide-white/5 max-h-60 overflow-y-auto">
                <div className="px-3 py-1.5 bg-stone-50 dark:bg-stone-900/60 text-[10px] font-mono text-stone-500 font-semibold uppercase flex items-center gap-1.5">
                  <Train className="w-3 h-3 text-[#D8261C]" />
                  <span>Tap to drop &quot;You Are Here&quot; pin:</span>
                </div>
                {matchedStations.map((station) => (
                  <button
                    key={station.id}
                    type="button"
                    onClick={() => handleSelectStation(station)}
                    className="w-full px-3.5 py-2 text-left hover:bg-red-50/60 dark:hover:bg-red-950/30 flex items-center justify-between text-xs transition-all duration-150 hover:translate-x-1 cursor-pointer group/st"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base group-hover/st:scale-125 transition-transform duration-150">📍</span>
                      <div>
                        <div className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                          <span>{station.name}</span>
                          <span className="text-[10px] text-stone-400 font-normal">Metro</span>
                        </div>
                        <div className="text-[10.5px] text-stone-500 font-mono">
                          {station.line} • {station.nearby_pandals.length} pandals
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-[#D8261C] dark:text-amber-400 font-mono group-hover/st:translate-x-0.5 transition-transform duration-150">
                      Set Here →
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Metro Station Chips & Zone Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-100 dark:border-white/5">
          {/* Active "You Are Here" Badge or Quick station buttons */}
          {userStation ? (
            <div className="flex items-center gap-2 bg-gradient-to-r from-red-600/15 via-amber-500/10 to-transparent dark:from-red-950/40 border border-red-500/30 px-3 py-1.5 rounded-full text-xs animate-in fade-in">
              <span className="text-base animate-bounce">📍</span>
              <span className="font-bold text-stone-900 dark:text-white">
                You are here: <span className="text-[#D8261C] dark:text-amber-400">{userStation.name} Metro</span>
              </span>
              <span className="text-[10px] text-stone-500 font-mono">({userStation.line})</span>
              <button
                type="button"
                onClick={handleClearStation}
                className="ml-1 text-stone-400 hover:text-stone-700 dark:hover:text-white p-0.5 rounded-full hover:bg-stone-200 dark:hover:bg-white/10 hover:scale-110 active:scale-75 transition-all duration-150 cursor-pointer"
                title="Remove location pin"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
              <span className="text-[11px] font-mono text-stone-500 font-medium whitespace-nowrap flex items-center gap-1">
                📍 Popular Metros:
              </span>
              {['kalighat', 'shyambazar', 'shobhabazar', 'esplanade', 'dumdum'].map((id) => {
                const st = METRO_STATIONS_DATA.find((s) => s.id === id);
                if (!st) return null;
                return (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => handleSelectStation(st)}
                    className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-red-50 hover:text-[#D8261C] dark:hover:bg-red-950/40 dark:hover:text-amber-400 text-stone-700 dark:text-stone-300 font-semibold text-[11px] whitespace-nowrap transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer border border-stone-200/60 dark:border-white/5"
                  >
                    {st.name}
                  </button>
                );
              })}
            </div>
          )}

          {/* Zone Filter pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {zones.map((z) => (
              <button
                key={z}
                onClick={() => setSelectedZone(z)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer ${
                  selectedZone === z
                    ? 'bg-[#D8261C] text-white shadow-xs'
                    : 'bg-[#FFFDF9] dark:bg-stone-800/80 border border-[#E7E5E4] dark:border-white/10 text-[#57534E] dark:text-stone-300 hover:text-[#D8261C] hover:bg-[#FEF2F2]'
                }`}
              >
                {z === 'All' ? 'All Kolkata' : z}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Interactive Map View */}
      <div className="w-full">
        <InteractiveMap
          pandals={filteredPandals}
          metroStations={METRO_STATIONS_DATA}
          userStationId={userStation?.id}
          heightClass="h-[78vh]"
        />
      </div>

    </div>
  );
}
