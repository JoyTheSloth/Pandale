'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { METRO_STATIONS_DATA } from '@/data/metro';
import { PANDALS_DATA } from '@/data/pandals';
import { Train, MapPin, Footprints, ExternalLink, ArrowRight, Compass, Info, CheckCircle2 } from 'lucide-react';
import { buildGoogleMapsUrl } from '@/lib/geo';

export default function MetroGuidePage() {
  const [selectedLine, setSelectedLine] = useState<'all' | 'blue' | 'green' | 'purple'>('all');
  const [activeStationId, setActiveStationId] = useState<string>('shyambazar');

  // Filter stations by line
  const filteredStations = useMemo(() => {
    if (selectedLine === 'all') return METRO_STATIONS_DATA;
    return METRO_STATIONS_DATA.filter((s) => s.line_code === selectedLine);
  }, [selectedLine]);

  // Active selected station
  const activeStation = useMemo(() => {
    return (
      METRO_STATIONS_DATA.find((s) => s.id === activeStationId) ||
      filteredStations[0] ||
      METRO_STATIONS_DATA[0]
    );
  }, [activeStationId, filteredStations]);

  // Nearby pandals for active station
  const nearbyPandals = useMemo(() => {
    if (!activeStation) return [];
    return activeStation.nearby_pandals.map((item) => {
      const p = PANDALS_DATA.find((x) => x.id === item.pandal_id);
      return {
        ...item,
        pandal: p
      };
    });
  }, [activeStation]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
      
      {/* Title & Introduction */}
      <div className="max-w-3xl space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-mono font-medium">
          <Train className="w-3.5 h-3.5" />
          <span>Kolkata Metro Puja Transit Hub</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-editorial text-[#181513]">
          Explore Kolkata Pujo by Metro
        </h1>
        <p className="text-sm sm:text-base text-[#5C554E] leading-relaxed">
          Skip city traffic completely. Select any station on the Blue Line, Green Line, or Purple Line to reveal all iconic pandals within walking distance, walking durations, and direct walking paths.
        </p>
      </div>

      {/* Metro Lines Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {[
          { id: 'all', label: 'All Kolkata Metro Lines' },
          { id: 'blue', label: 'Blue Line (North-South)', color: 'bg-blue-600' },
          { id: 'green', label: 'Green Line (East-West)', color: 'bg-emerald-600' },
          { id: 'purple', label: 'Purple Line (Joka-Esplanade)', color: 'bg-purple-600' }
        ].map((line) => {
          const isSelected = selectedLine === line.id;
          return (
            <button
              key={line.id}
              onClick={() => setSelectedLine(line.id as any)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                isSelected
                  ? 'bg-[#181513] text-white shadow-sm'
                  : 'bg-white border border-[#E2DAD0] text-[#5C554E] hover:text-[#181513]'
              }`}
            >
              {line.color && <span className={`w-2.5 h-2.5 rounded-full ${line.color}`} />}
              <span>{line.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Dual-Column Interactive Station & Pandal Explorer */}
      <div className="grid grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Metro Stations List / Schematic */}
        <div className="col-span-12 lg:col-span-4 bg-white rounded-3xl border border-[#E9E2D8] p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E9E2D8]">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8E857B]">
              Stations ({filteredStations.length})
            </span>
            <span className="text-[11px] text-[#D43827] font-medium">Click station to explore</span>
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto no-scrollbar pr-1">
            {filteredStations.map((station) => {
              const isSelected = station.id === activeStation.id;
              const isBlue = station.line_code === 'blue';
              const isGreen = station.line_code === 'green';

              return (
                <button
                  key={station.id}
                  onClick={() => setActiveStationId(station.id)}
                  className={`w-full text-left p-3 rounded-2xl transition-all flex items-center justify-between group ${
                    isSelected
                      ? 'bg-[#FAF8F5] border-2 border-[#D43827] shadow-sm'
                      : 'bg-stone-50/50 hover:bg-[#FAF8F5] border border-transparent hover:border-[#E2DAD0]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${
                        isBlue ? 'bg-blue-600' : isGreen ? 'bg-emerald-600' : 'bg-purple-600'
                      }`}
                    >
                      M
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#181513] group-hover:text-[#D43827] transition-colors">
                        {station.name}
                      </div>
                      <div className="text-[10px] text-[#8E857B]">
                        {station.bengali_name} • {station.nearby_pandals.length} Pandals
                      </div>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? 'text-[#D43827] translate-x-1' : 'text-[#D8CEBF]'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Station Details & Connected Pandals */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          
          {/* Station Banner */}
          <div className="bg-white rounded-3xl border border-[#E9E2D8] p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E9E2D8]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white uppercase tracking-wider ${
                      activeStation.line_code === 'blue'
                        ? 'bg-blue-600'
                        : activeStation.line_code === 'green'
                        ? 'bg-emerald-600'
                        : 'bg-purple-600'
                    }`}
                  >
                    {activeStation.line}
                  </span>
                  {activeStation.bengali_name && (
                    <span className="text-xs font-mono text-[#8E857B]">
                      {activeStation.bengali_name}
                    </span>
                  )}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-[#181513]">
                  {activeStation.name} Metro Station
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${activeStation.latitude},${activeStation.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl border border-[#D8CEBF] hover:border-[#D43827] text-xs font-semibold text-[#181513] flex items-center gap-1.5 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#D43827]" />
                  <span>Station in Maps</span>
                </a>
              </div>
            </div>

            {/* Visual Relationship Chain */}
            <div className="mt-6">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#8E857B] block mb-4">
                Walkable Pandals from {activeStation.name}:
              </span>

              {nearbyPandals.length > 0 ? (
                <div className="space-y-4">
                  {nearbyPandals.map((item, index) => {
                    const pandal = item.pandal;
                    if (!pandal) return null;

                    return (
                      <div
                        key={item.pandal_id}
                        className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E9E2D8] hover:border-[#D8CEBF] transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        {/* Pandal Info & Visual Chain */}
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden relative shrink-0">
                            <Image
                              src={pandal.featured_image}
                              alt={pandal.name}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-[#E2DAD0] font-semibold text-[#181513]">
                                {pandal.area}
                              </span>
                              <span className="text-xs text-[#8E857B]">
                                {pandal.locality}
                              </span>
                            </div>

                            <Link
                              href={`/pandal/${pandal.slug}`}
                              className="text-base sm:text-lg font-bold font-editorial text-[#181513] hover:text-[#D43827] transition-colors block"
                            >
                              {pandal.name}
                            </Link>

                            <p className="text-xs text-[#5C554E] line-clamp-1">
                              {pandal.theme}
                            </p>
                          </div>
                        </div>

                        {/* Transit Metrics & Direct Maps link */}
                        <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-[#E9E2D8]">
                          
                          <div className="text-left md:text-right">
                            <div className="flex items-center md:justify-end gap-1 text-xs font-bold text-[#D43827]">
                              <Footprints className="w-4 h-4" />
                              <span>{item.walking_distance}</span>
                            </div>
                            <span className="text-[11px] text-[#8E857B]">
                              approx. {item.walking_time_mins} min walk
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Link
                              href={`/pandal/${pandal.slug}`}
                              className="py-2 px-3 rounded-xl bg-[#181513] hover:bg-[#2A2623] text-white text-xs font-semibold"
                            >
                              Details
                            </Link>
                            
                            <a
                              href={item.directions_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="py-2 px-3 rounded-xl bg-[#D43827] hover:bg-[#B52819] text-white text-xs font-semibold flex items-center gap-1 shadow-sm"
                            >
                              <MapPin className="w-3.5 h-3.5" />
                              <span>Walk Route</span>
                            </a>
                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-8 text-center bg-[#FAF8F5] rounded-2xl border border-dashed border-[#D8CEBF] text-xs text-[#8E857B]">
                  No major iconic pandals directly mapped within 1km of this station yet.
                </div>
              )}
            </div>

          </div>

          {/* Transit Advice Card */}
          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 flex items-start gap-3">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold block">Kolkata Metro Puja Night Services:</span>
              <p className="leading-relaxed">
                During Durga Puja (Saptami through Nabami), Kolkata Metro runs round-the-clock and late-night trains until 4:00 AM on the Blue Line. Trains run every 6 to 8 minutes during peak evening pandal hours.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
