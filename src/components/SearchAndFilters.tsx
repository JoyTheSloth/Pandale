'use client';

import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Search, SlidersHorizontal, X, Train, Flame, Sparkles, MapPin, Heart, Compass, Check, LocateFixed } from 'lucide-react';
import { ZoneArea } from '@/types';

interface SearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedZone: ZoneArea | 'All';
  onZoneChange: (zone: ZoneArea | 'All') => void;
  nearMetroOnly: boolean;
  onNearMetroToggle: () => void;
  mustVisitOnly: boolean;
  onMustVisitToggle: () => void;
  popularOnly: boolean;
  onPopularToggle: () => void;
  trendingOnly: boolean;
  onTrendingToggle: () => void;
  lessCrowdedOnly: boolean;
  onLessCrowdedToggle: () => void;
  wishlistOnly: boolean;
  onWishlistToggle: () => void;
  selectedDay?: string;
  onDayChange?: (day: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  isNearMeActive: boolean;
  onNearMeToggle: () => void;
  isLocating?: boolean;
  totalCount: number;
}

export default function SearchAndFilters({
  searchQuery,
  onSearchChange,
  selectedZone,
  onZoneChange,
  nearMetroOnly,
  onNearMetroToggle,
  mustVisitOnly,
  onMustVisitToggle,
  popularOnly,
  onPopularToggle,
  trendingOnly,
  onTrendingToggle,
  lessCrowdedOnly,
  onLessCrowdedToggle,
  wishlistOnly,
  onWishlistToggle,
  selectedDay,
  onDayChange,
  sortBy,
  onSortChange,
  isNearMeActive,
  onNearMeToggle,
  isLocating = false,
  totalCount
}: SearchAndFiltersProps) {
  const [showMobileFilterModal, setShowMobileFilterModal] = useState(false);
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const isMouseDownOnBackdrop = useRef(false);

  const zones: (ZoneArea | 'All')[] = [
    'All',
    'North Kolkata',
    'South Kolkata',
    'Central Kolkata',
    'East Kolkata',
    'Howrah'
  ];

  const activeFilterCount =
    (selectedZone !== 'All' ? 1 : 0) +
    (selectedDay && selectedDay !== 'All' ? 1 : 0) +
    (nearMetroOnly ? 1 : 0) +
    (mustVisitOnly ? 1 : 0) +
    (popularOnly ? 1 : 0) +
    (trendingOnly ? 1 : 0) +
    (lessCrowdedOnly ? 1 : 0) +
    (wishlistOnly ? 1 : 0) +
    (isNearMeActive ? 1 : 0);

  return (
    <div className="w-full space-y-4">
      
      {/* Primary Search Bar Row */}
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 dark:text-stone-500 group-focus-within:text-[#D8261C] transition-colors pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search pandals by name, metro station, theme, or locality..."
            className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-white dark:bg-[#1A1218] border border-stone-200 dark:border-white/10 text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-[#D8261C]/30 focus:border-[#D8261C] focus:shadow-md transition-all duration-200 shadow-xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:scale-125 hover:rotate-90 active:scale-75 transition-all duration-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Near Me GPS quick toggle */}
        <button
          type="button"
          onClick={onNearMeToggle}
          title="Show pandals nearest to your current location"
          className={`px-3.5 py-3.5 rounded-2xl text-xs font-bold flex items-center gap-1.5 transition-all duration-200 shadow-xs hover:shadow-md hover:scale-105 active:scale-95 shrink-0 border cursor-pointer group ${
            isNearMeActive
              ? 'bg-[#D8261C] text-white border-[#D8261C] shadow-md shadow-[#D8261C]/25 ring-2 ring-[#D8261C]/20'
              : 'bg-white dark:bg-[#1A1218] text-stone-800 dark:text-stone-200 border-stone-200 dark:border-white/10 hover:bg-stone-50 dark:hover:bg-stone-800 hover:border-[#D8261C]/50'
          }`}
        >
          <LocateFixed className={`w-4 h-4 transition-transform group-hover:scale-110 ${isLocating ? 'text-[#FDE047] animate-spin' : isNearMeActive ? 'text-[#FDE047]' : 'text-[#D8261C]'}`} />
          <span className="hidden sm:inline">Near Me</span>
        </button>

        {/* Filter Modal Button */}
        <button
          type="button"
          onClick={() => {
            setShowMobileFilterModal(true);
          }}
          title="Filters & Sorting"
          className="px-3.5 py-3.5 rounded-2xl bg-white dark:bg-[#1A1218] border border-stone-200 dark:border-white/10 text-stone-800 dark:text-stone-200 text-xs font-semibold flex items-center gap-1.5 shadow-sm hover:scale-105 active:scale-95 transition-all duration-200 shrink-0 cursor-pointer hover:border-[#D8261C]/50"
        >
          <SlidersHorizontal className="w-4 h-4 text-stone-500 dark:text-stone-400 pointer-events-none" />
          <span className="hidden sm:inline pointer-events-none">Filters</span>
          {activeFilterCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-[#D8261C] text-white text-[10px] flex items-center justify-center font-bold pointer-events-none">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Zone selection pill bar (Horizontal swipe on mobile) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {zones.map((zone) => {
          const isSelected = selectedZone === zone;
          return (
            <button
              key={zone}
              type="button"
              onClick={() => onZoneChange(zone)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 ${
                isSelected
                  ? 'bg-[#D8261C] text-white shadow-md shadow-[#D8261C]/25 border border-[#FDE047]/40 ring-2 ring-[#D8261C]/30'
                  : 'bg-white dark:bg-[#1A1218] border border-stone-200 dark:border-white/10 text-stone-700 dark:text-stone-300 hover:text-[#D8261C] dark:hover:text-white hover:border-[#D8261C] hover:shadow-xs'
              }`}
            >
              {zone === 'All' ? 'All Zones' : zone}
            </button>
          );
        })}
      </div>

      {/* Quick-filter emoji chip strip */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
        {/* Near Metro */}
        <button
          type="button"
          onClick={onNearMetroToggle}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 shadow-sm ${
            nearMetroOnly
              ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/25'
              : 'bg-white dark:bg-[#1A1218] border-stone-200 dark:border-white/10 text-stone-700 dark:text-stone-300 hover:border-blue-400 hover:text-blue-600'
          }`}
        >
          🚇 Near Metro
        </button>

        {/* Near Me */}
        <button
          type="button"
          onClick={onNearMeToggle}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 shadow-sm ${
            isNearMeActive
              ? 'bg-[#D8261C] border-[#D8261C] text-white shadow-md shadow-[#D8261C]/25'
              : 'bg-white dark:bg-[#1A1218] border-stone-200 dark:border-white/10 text-stone-700 dark:text-stone-300 hover:border-[#D8261C]/50 hover:text-[#D8261C]'
          }`}
        >
          📍 Near Me
        </button>

        {/* Most Famous */}
        <button
          type="button"
          onClick={onPopularToggle}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 shadow-sm ${
            popularOnly
              ? 'bg-purple-600 border-purple-600 text-white shadow-md shadow-purple-600/25'
              : 'bg-white dark:bg-[#1A1218] border-stone-200 dark:border-white/10 text-stone-700 dark:text-stone-300 hover:border-purple-400 hover:text-purple-600'
          }`}
        >
          👑 Most Famous
        </button>
      </div>

      {/* Desktop Quick Attribute Tags */}
      <div className="hidden md:flex items-center justify-between gap-4 pt-1">
        <div className="flex items-center gap-2 flex-wrap">
          
          <button
            onClick={onNearMetroToggle}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-2xs group ${
              nearMetroOnly
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-white dark:bg-[#1A1218] text-stone-700 dark:text-stone-300 border-stone-200 dark:border-white/10 hover:border-blue-500 hover:text-blue-600'
            }`}
          >
            <Train className="w-3.5 h-3.5 text-blue-600 group-hover:translate-x-0.5 transition-transform duration-200" />
            <span>Near Metro (&lt;12m walk)</span>
          </button>

          <button
            onClick={onPopularToggle}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-2xs group ${
              popularOnly
                ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-600/25'
                : 'bg-white dark:bg-[#1A1218] text-stone-700 dark:text-stone-300 border-stone-200 dark:border-white/10 hover:border-purple-500 hover:text-purple-600'
            }`}
          >
            <span className="text-sm">👑</span>
            <span>Most Famous</span>
          </button>

          <button
            onClick={onMustVisitToggle}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-2xs group ${
              mustVisitOnly
                ? 'bg-[#D8261C] text-white border-[#D8261C] shadow-md shadow-[#D8261C]/25'
                : 'bg-white dark:bg-[#1A1218] text-stone-700 dark:text-stone-300 border-stone-200 dark:border-white/10 hover:border-[#D8261C] hover:text-[#D8261C]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B] group-hover:rotate-45 group-hover:scale-115 transition-transform duration-200" />
            <span>Must Visit</span>
          </button>

          <button
            onClick={onTrendingToggle}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-2xs group ${
              trendingOnly
                ? 'bg-[#F59E0B] text-white border-[#F59E0B] shadow-md shadow-[#F59E0B]/25'
                : 'bg-white dark:bg-[#1A1218] text-stone-700 dark:text-stone-300 border-stone-200 dark:border-white/10 hover:border-amber-500 hover:text-amber-500'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-[#F59E0B] group-hover:scale-125 transition-transform duration-200" />
            <span>Trending</span>
          </button>

          <button
            onClick={onLessCrowdedToggle}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-2xs group ${
              lessCrowdedOnly
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                : 'bg-white dark:bg-[#1A1218] text-stone-700 dark:text-stone-300 border-stone-200 dark:border-white/10 hover:border-emerald-500 hover:text-emerald-500'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block group-hover:scale-150 transition-transform duration-200" />
            <span>Less Crowded</span>
          </button>

          <button
            onClick={onWishlistToggle}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-2xs group ${
              wishlistOnly
                ? 'bg-[#D8261C] text-white border-[#D8261C] shadow-sm'
                : 'bg-white dark:bg-[#1A1218] text-stone-700 dark:text-stone-300 border-stone-200 dark:border-white/10 hover:border-[#D8261C] hover:text-[#D8261C]'
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-[#D8261C] group-hover:scale-125 transition-transform duration-200" />
            <span>My Wishlist</span>
          </button>

        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="text-xs font-semibold py-1.5 px-2.5 rounded-xl bg-white dark:bg-[#1A1218] border border-stone-200 dark:border-white/10 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-[#D8261C] hover:border-[#D8261C]/50 transition-colors cursor-pointer"
          >
            <option value="trending" className="dark:bg-[#1A1218]">🔥 Trending</option>
            <option value="popular" className="dark:bg-[#1A1218]">👑 Most Popular</option>
            <option value="nearest-metro" className="dark:bg-[#1A1218]">🚇 Nearest Metro Walk</option>
            <option value="name" className="dark:bg-[#1A1218]">🔤 Alphabetical (A-Z)</option>
            <option value="distance" className="dark:bg-[#1A1218]">📍 Distance from Me</option>
          </select>
        </div>
      </div>

      {/* Filter Modal Card rendered directly to body via portal */}
      {showMobileFilterModal && mounted && createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
          {/* Backdrop scrim without blur */}
          <div
            className="fixed inset-0 bg-black/40"
            onMouseDown={() => {
              isMouseDownOnBackdrop.current = true;
            }}
            onClick={() => {
              if (isMouseDownOnBackdrop.current) {
                setShowMobileFilterModal(false);
              }
              isMouseDownOnBackdrop.current = false;
            }}
          />

          {/* Compact Modal Card */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-[90%] max-w-[340px] max-h-[85vh] bg-[#FFFDF9] dark:bg-[#140E13] p-4 sm:p-5 rounded-2xl flex flex-col justify-between overflow-hidden border border-stone-200 dark:border-white/10 text-stone-900 dark:text-stone-100 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-2.5 border-b border-stone-200 dark:border-white/10 shrink-0">
              <h3 className="text-sm font-bold font-editorial text-stone-900 dark:text-white">Filters & Sorting</h3>
              <button
                type="button"
                onClick={() => setShowMobileFilterModal(false)}
                className="p-1 rounded-full text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto space-y-3 my-2.5 pr-1">
              {/* Sort by */}
              <div>
                <label className="text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider block mb-1.5">
                  Sort Pandals By
                </label>
                <div className="grid grid-cols-1 gap-1">
                  {[
                    { id: 'trending', label: '🔥 Trending Score' },
                    { id: 'popular', label: '👑 Most Saved' },
                    { id: 'nearest-metro', label: '🚇 Shortest Metro Walk' },
                    { id: 'name', label: '🔤 Name (A to Z)' },
                    { id: 'distance', label: '📍 Distance From Me' }
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => onSortChange(s.id)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                        sortBy === s.id
                          ? 'bg-[#D8261C] text-white shadow-xs'
                          : 'bg-white dark:bg-[#1C141B] border border-stone-200 dark:border-white/10 text-stone-900 dark:text-stone-100 hover:bg-stone-50 dark:hover:bg-[#251B24]'
                      }`}
                    >
                      <span>{s.label}</span>
                      {sortBy === s.id && <Check className="w-3.5 h-3.5 text-amber-200" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Zone Filter */}
              <div>
                <label className="text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider block mb-1.5">
                  Select Pandal Zone
                </label>
                <div className="grid grid-cols-2 gap-1">
                  {zones.map((z) => (
                    <button
                      key={z}
                      type="button"
                      onClick={() => onZoneChange(z)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold text-left flex items-center justify-between transition-colors cursor-pointer ${
                        selectedZone === z
                          ? 'bg-[#D8261C] text-white shadow-xs'
                          : 'bg-white dark:bg-[#1C141B] border border-stone-200 dark:border-white/10 text-stone-900 dark:text-stone-100 hover:bg-stone-50 dark:hover:bg-[#251B24]'
                      }`}
                    >
                      <span className="truncate">{z === 'All' ? 'All Zones' : z}</span>
                      {selectedZone === z && <Check className="w-3.5 h-3.5 text-amber-200 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Toggle Filters */}
              <div>
                <label className="text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider block mb-1.5">
                  Experience Tags
                </label>
                <div className="space-y-1.5">
                  <label className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-[#1C141B] border border-stone-200 dark:border-white/10 text-xs cursor-pointer hover:bg-stone-50 dark:hover:bg-[#251B24] transition-colors">
                    <span className="flex items-center gap-2 text-stone-900 dark:text-stone-100 font-medium">
                      <Train className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> Near Metro (&lt;12m walk)
                    </span>
                    <input
                      type="checkbox"
                      checked={nearMetroOnly}
                      onChange={onNearMetroToggle}
                      className="accent-[#D8261C] w-3.5 h-3.5 rounded"
                    />
                  </label>

                  <label className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-[#1C141B] border border-stone-200 dark:border-white/10 text-xs cursor-pointer hover:bg-stone-50 dark:hover:bg-[#251B24] transition-colors">
                    <span className="flex items-center gap-2 text-stone-900 dark:text-stone-100 font-medium">
                      <span className="text-sm">👑</span> Most Famous
                    </span>
                    <input
                      type="checkbox"
                      checked={popularOnly}
                      onChange={onPopularToggle}
                      className="accent-[#D8261C] w-3.5 h-3.5 rounded"
                    />
                  </label>

                  <label className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-[#1C141B] border border-stone-200 dark:border-white/10 text-xs cursor-pointer hover:bg-stone-50 dark:hover:bg-[#251B24] transition-colors">
                    <span className="flex items-center gap-2 text-stone-900 dark:text-stone-100 font-medium">
                      <Sparkles className="w-3.5 h-3.5 text-[#D8261C] dark:text-amber-400" /> Must Visit Selection
                    </span>
                    <input
                      type="checkbox"
                      checked={mustVisitOnly}
                      onChange={onMustVisitToggle}
                      className="accent-[#D8261C] w-3.5 h-3.5 rounded"
                    />
                  </label>

                  <label className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-[#1C141B] border border-stone-200 dark:border-white/10 text-xs cursor-pointer hover:bg-stone-50 dark:hover:bg-[#251B24] transition-colors">
                    <span className="flex items-center gap-2 text-stone-900 dark:text-stone-100 font-medium">
                      <Flame className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> Trending Pandals
                    </span>
                    <input
                      type="checkbox"
                      checked={trendingOnly}
                      onChange={onTrendingToggle}
                      className="accent-[#D8261C] w-3.5 h-3.5 rounded"
                    />
                  </label>

                  <label className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-[#1C141B] border border-stone-200 dark:border-white/10 text-xs cursor-pointer hover:bg-stone-50 dark:hover:bg-[#251B24] transition-colors">
                    <span className="flex items-center gap-2 text-stone-900 dark:text-stone-100 font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" /> Less Crowded
                    </span>
                    <input
                      type="checkbox"
                      checked={lessCrowdedOnly}
                      onChange={onLessCrowdedToggle}
                      className="accent-[#D8261C] w-3.5 h-3.5 rounded"
                    />
                  </label>

                  <label className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-[#1C141B] border border-stone-200 dark:border-white/10 text-xs cursor-pointer hover:bg-stone-50 dark:hover:bg-[#251B24] transition-colors">
                    <span className="flex items-center gap-2 text-stone-900 dark:text-stone-100 font-medium">
                      <Heart className="w-3.5 h-3.5 text-rose-500" /> My Saved Wishlist
                    </span>
                    <input
                      type="checkbox"
                      checked={wishlistOnly}
                      onChange={onWishlistToggle}
                      className="accent-[#D8261C] w-3.5 h-3.5 rounded"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-2.5 border-t border-stone-200 dark:border-white/10 shrink-0">
              <button
                type="button"
                onClick={() => setShowMobileFilterModal(false)}
                className="w-full py-2.5 rounded-xl bg-[#D8261C] text-white font-semibold text-xs shadow-md active:scale-98 transition-transform cursor-pointer"
              >
                Apply Filters ({totalCount} Pandals)
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
}
