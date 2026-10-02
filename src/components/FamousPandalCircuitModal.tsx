'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  X, 
  MapPin, 
  Train, 
  Clock, 
  Footprints, 
  ArrowRight, 
  ExternalLink, 
  Compass, 
  Sparkles, 
  Search,
  Navigation,
  Share2,
  Check
} from 'lucide-react';
import { FAMOUS_PUJO_CIRCUITS, PujoZoneCircuit, CircuitPandal } from '@/data/famousPujoCircuits';
import { useLanguage } from '@/context/LanguageContext';

interface FamousPandalCircuitModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialZone?: 'north' | 'central' | 'south';
}

export default function FamousPandalCircuitModal({
  isOpen,
  onClose,
  initialZone = 'north'
}: FamousPandalCircuitModalProps) {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const [activeZone, setActiveZone] = useState<'north' | 'central' | 'south'>(initialZone);
  const [filterStation, setFilterStation] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentCircuit: PujoZoneCircuit = FAMOUS_PUJO_CIRCUITS[activeZone];

  const filteredPandals = filterStation === 'all'
    ? currentCircuit.pandals
    : currentCircuit.pandals.filter(p => p.nearestStation.toLowerCase().includes(filterStation.toLowerCase()));

  const handleCopyLink = (pandal: CircuitPandal) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(pandal.googleMapsDirectionsUrl);
      setCopiedId(pandal.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 select-none animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl h-[92vh] max-h-[880px] bg-white dark:bg-[#140E13] text-stone-900 dark:text-stone-100 rounded-[2.5rem] border border-stone-200 dark:border-white/10 shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. TOP HEADER WITH CAPTION & ZONE TABS */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-red-600 via-[#D8261C] to-amber-600 text-white shrink-0 relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl pointer-events-none" />

          {/* Top Row: Title + Close Button */}
          <div className="flex items-start justify-between gap-3 relative z-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-mono font-bold tracking-wider uppercase border border-white/25 mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                <span>Kolkata Durga Puja 2026 • Official Circuit</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-extrabold font-editorial leading-tight tracking-tight text-white">
                {currentCircuit.name}
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-black/25 hover:bg-black/50 hover:scale-110 active:scale-90 text-white flex items-center justify-center transition-all duration-200 cursor-pointer border border-white/20 shrink-0 group"
              aria-label="Close circuit modal"
            >
              <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
            </button>
          </div>

          {/* User Requested Caption Text */}
          <div className="mt-3 p-2.5 sm:p-3 rounded-2xl bg-black/30 backdrop-blur-md border border-white/20 relative z-10 flex items-center gap-2">
            <span className="text-xl sm:text-2xl shrink-0">🥁</span>
            <p className="text-xs sm:text-sm font-semibold text-yellow-200 font-editorial leading-snug">
              &ldquo;{currentCircuit.captionText}&rdquo;
            </p>
          </div>

          {/* Zone Selector Pills */}
          <div className="flex items-center gap-2 mt-4 relative z-10 overflow-x-auto no-scrollbar pt-1">
            {(['north', 'central', 'south'] as const).map((zoneKey) => {
              const zone = FAMOUS_PUJO_CIRCUITS[zoneKey];
              const isActive = activeZone === zoneKey;
              return (
                <button
                  key={zoneKey}
                  type="button"
                  onClick={() => {
                    setActiveZone(zoneKey);
                    setFilterStation('all');
                  }}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold font-mono transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-white text-stone-900 shadow-lg ring-2 ring-yellow-400'
                      : 'bg-black/30 text-white/90 hover:bg-black/40 border border-white/15'
                  }`}
                >
                  <span>{zone.shortName} Circuit</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] ${isActive ? 'bg-red-600 text-white' : 'bg-white/20 text-white'}`}>
                    {zone.totalPandals}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. SUBHEADER: STATION FILTER & SUMMARY */}
        <div className="px-4 sm:px-6 py-3 bg-stone-50 dark:bg-stone-900/60 border-b border-stone-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shrink-0 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-stone-500 font-semibold uppercase text-[11px] flex items-center gap-1">
              <Train className="w-3.5 h-3.5 text-[#D8261C]" />
              Filter by Metro:
            </span>
            <button
              type="button"
              onClick={() => setFilterStation('all')}
              className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-bold transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer ${
                filterStation === 'all'
                  ? 'bg-[#D8261C] text-white shadow-xs'
                  : 'bg-stone-200/80 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-300 dark:hover:bg-stone-700'
              }`}
            >
              All ({currentCircuit.pandals.length})
            </button>
            {currentCircuit.primaryStations.map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setFilterStation(filterStation === st ? 'all' : st)}
                className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-semibold transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer ${
                  filterStation === st
                    ? 'bg-[#D8261C] text-white shadow-xs'
                    : 'bg-stone-200/80 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-300 dark:hover:bg-stone-700'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="font-mono text-[11px] text-stone-500 text-right">
            {currentCircuit.approxCircuitWalkKm}
          </div>
        </div>

        {/* 3. PANDALS LIST WITH EXACT STATION & INTER-PANDAL DISTANCE */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5">
          {filteredPandals.map((pandal, idx) => (
            <div
              key={pandal.id}
              className="group p-4 sm:p-5 rounded-3xl bg-stone-50/80 dark:bg-stone-900/50 hover:bg-white dark:hover:bg-[#1A1218] border border-stone-200/80 dark:border-white/10 hover:border-amber-400 dark:hover:border-amber-400/50 shadow-xs hover:shadow-xl hover:-translate-y-1 active:scale-[0.99] transition-all duration-200 relative overflow-hidden"
            >
              {/* Sequential Number Indicator */}
              <div className="flex items-start justify-between gap-3 mb-2.5">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-2xl bg-gradient-to-tr from-[#D8261C] to-amber-500 text-white font-mono font-bold text-xs sm:text-sm flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 transition-transform duration-200">
                    {idx + 1}
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold font-editorial text-stone-900 dark:text-white leading-tight group-hover:text-[#D8261C] transition-colors">
                      {pandal.name}
                    </h3>
                    <p className="text-xs text-stone-500 font-medium mt-0.5">
                      {pandal.bengaliName} • <span className="text-stone-400">{pandal.address}</span>
                    </p>
                  </div>
                </div>

                {/* Direct Google Maps walking link */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleCopyLink(pandal)}
                    className="p-2 rounded-xl bg-white dark:bg-stone-800 text-stone-500 hover:text-stone-900 dark:hover:text-white border border-stone-200 dark:border-white/10 hover:scale-110 active:scale-90 transition-all duration-150 cursor-pointer"
                    title="Copy Walking Route link"
                  >
                    {copiedId === pandal.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Share2 className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <a
                    href={pandal.googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-[#D8261C] hover:bg-[#B91C1C] text-white font-bold text-xs flex items-center gap-1.5 shadow-xs hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-200 group/walk"
                  >
                    <span>Walk Route</span>
                    <ExternalLink className="w-3 h-3 text-yellow-300 group-hover/walk:translate-x-0.5 group-hover/walk:-translate-y-0.5 transition-transform duration-200" />
                  </a>
                </div>
              </div>

              {/* Station Proximity & Inter-place Distance Highlight Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-3 p-3 rounded-2xl bg-white dark:bg-stone-950/70 border border-stone-200/60 dark:border-white/8 text-xs font-mono">
                {/* 1. Nearest Metro Station & Distance */}
                <div className="flex items-center gap-2 text-stone-800 dark:text-stone-200">
                  <div className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Train className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-stone-400 font-sans uppercase font-bold">
                      Nearest Metro Station
                    </div>
                    <div className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                      <span>{pandal.nearestStation}</span>
                      <span className="text-stone-400 font-normal">({pandal.nearestStationLine})</span>
                    </div>
                    <div className="text-[10.5px] text-emerald-600 dark:text-emerald-400 font-semibold">
                      {pandal.distanceToStation} • ~{pandal.walkTimeToStationMins} min walk
                    </div>
                  </div>
                </div>

                {/* 2. Hop to Next Pandal Distance in Circuit */}
                {pandal.distanceToNextPandal && pandal.nextPandalName ? (
                  <div className="flex items-center gap-2 border-t sm:border-t-0 sm:border-l border-stone-100 dark:border-white/5 pt-2 sm:pt-0 sm:pl-3 text-stone-800 dark:text-stone-200">
                    <div className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                      <Footprints className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-[10px] text-stone-400 font-sans uppercase font-bold">
                        Next in Circuit Hop
                      </div>
                      <div className="font-bold text-stone-900 dark:text-stone-100 truncate max-w-[200px]">
                        → {pandal.nextPandalName}
                      </div>
                      <div className="text-[10.5px] text-amber-600 dark:text-amber-400 font-semibold">
                        Distance: {pandal.distanceToNextPandal}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 border-t sm:border-t-0 sm:border-l border-stone-100 dark:border-white/5 pt-2 sm:pt-0 sm:pl-3 text-stone-500">
                    <div className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-[10px] text-stone-400 font-sans uppercase font-bold">
                        Circuit Climax
                      </div>
                      <div className="font-bold text-emerald-600 dark:text-emerald-400">
                        Final Pandal of this Zone
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Highlight / Heritage info */}
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-sans">
                {pandal.highlight}
              </p>
            </div>
          ))}
        </div>

        {/* 4. MODAL FOOTER */}
        <div className="p-3.5 sm:p-4 bg-stone-100 dark:bg-stone-900 border-t border-stone-200 dark:border-white/10 flex items-center justify-between text-xs shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-base">📍</span>
            <span className="font-medium text-stone-600 dark:text-stone-400">
              Showing {filteredPandals.length} of {currentCircuit.totalPandals} famous pandals with exact station walking distance.
            </span>
          </div>

          <Link
            href={`/map?zone=${activeZone === 'north' ? 'North+Kolkata' : activeZone === 'central' ? 'Central+Kolkata' : 'South+Kolkata'}`}
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-white dark:hover:bg-stone-200 text-white dark:text-stone-950 font-bold font-mono text-xs flex items-center gap-1.5 transition-all shadow-sm"
          >
            <span>Open on Live Map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
