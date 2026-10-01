'use client';

import React, { useState, useMemo } from 'react';
import InteractiveMap from '@/components/InteractiveMap';
import { PANDALS_DATA } from '@/data/pandals';
import { METRO_STATIONS_DATA } from '@/data/metro';
import { ZoneArea, Pandal } from '@/types';
import { MapPin, Train, Search, Filter } from 'lucide-react';

export default function MapPage() {
  const [selectedZone, setSelectedZone] = useState<ZoneArea | 'All'>('All');
  const [search, setSearch] = useState('');
  const [selectedPandal, setSelectedPandal] = useState<Pandal | null>(null);

  const zones: (ZoneArea | 'All')[] = [
    'All',
    'North Kolkata',
    'South Kolkata',
    'Central Kolkata',
    'East Kolkata'
  ];

  const filteredPandals = useMemo(() => {
    return PANDALS_DATA.filter((p) => {
      const matchZone = selectedZone === 'All' || p.area === selectedZone;
      const matchSearch =
        !search.trim() ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.locality.toLowerCase().includes(search.toLowerCase()) ||
        p.nearest_metro.toLowerCase().includes(search.toLowerCase());
      return matchZone && matchSearch;
    });
  }, [selectedZone, search]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full space-y-4">
      
      {/* Map Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-[#E9E2D8] shadow-xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold font-editorial text-[#181513]">
            Kolkata Puja & Metro Live Map
          </h1>
          <p className="text-xs text-[#8E857B]">
            Showing {filteredPandals.length} pandals & {METRO_STATIONS_DATA.length} metro stations
          </p>
        </div>

        {/* Zone Filter pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {zones.map((z) => (
            <button
              key={z}
              onClick={() => setSelectedZone(z)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedZone === z
                  ? 'bg-[#D8261C] text-white shadow-xs'
                  : 'bg-[#FFFDF9] border border-[#E7E5E4] text-[#57534E] hover:text-[#D8261C] hover:bg-[#FEF2F2]'
              }`}
            >
              {z === 'All' ? 'All Kolkata' : z}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Map View */}
      <div className="w-full">
        <InteractiveMap
          pandals={filteredPandals}
          metroStations={METRO_STATIONS_DATA}
          selectedPandalId={selectedPandal?.id}
          onSelectPandal={(p) => setSelectedPandal(p)}
          heightClass="h-[78vh]"
        />
      </div>

    </div>
  );
}
