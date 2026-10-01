'use client';

import React, { useState } from 'react';
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
  selectedDay: string;
  onDayChange: (day: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  isNearMeActive: boolean;
  onNearMeToggle: () => void;
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
  totalCount
}: SearchAndFiltersProps) {
  const [showMobileFilterModal, setShowMobileFilterModal] = useState(false);

  const zones: (ZoneArea | 'All')[] = [
    'All',
    'North Kolkata',
    'South Kolkata',
    'Central Kolkata',
    'East Kolkata'
  ];

  const days = ['All', 'Tonight', 'Shashti', 'Saptami', 'Ashtami', 'Nabami', 'Dashami'];

  const activeFilterCount =
    (selectedZone !== 'All' ? 1 : 0) +
    (selectedDay !== 'All' ? 1 : 0) +
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
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E857B]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search pandals by name, metro station, theme, or locality..."
            className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-white border border-[#FED7AA] text-sm text-[#1C1917] placeholder-[#78716C] focus:outline-none focus:ring-2 focus:ring-[#D8261C]/30 focus:border-[#D8261C] shadow-xs transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-[#8E857B] hover:text-[#181513]"
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
          className={`px-3.5 py-3.5 rounded-2xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs shrink-0 border ${
            isNearMeActive
              ? 'bg-[#D8261C] text-white border-[#D8261C] shadow-md shadow-[#D8261C]/25'
              : 'bg-white text-[#1C1917] border-[#FED7AA] hover:bg-[#FFFBEB]'
          }`}
        >
          <LocateFixed className={`w-4 h-4 ${isNearMeActive ? 'text-[#FDE047] animate-spin' : 'text-[#D8261C]'}`} />
          <span className="hidden sm:inline">Near Me</span>
        </button>

        {/* Mobile Filter Sheet Button */}
        <button
          type="button"
          onClick={() => setShowMobileFilterModal(true)}
          className="md:hidden px-3.5 py-3.5 rounded-2xl bg-white border border-[#E2DAD0] text-[#181513] text-xs font-semibold flex items-center gap-1.5 shadow-sm shrink-0"
        >
          <SlidersHorizontal className="w-4 h-4 text-[#8E857B]" />
          {activeFilterCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-[#D43827] text-white text-[10px] flex items-center justify-center font-bold">
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
              onClick={() => onZoneChange(zone)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-[#D8261C] text-white shadow-md shadow-[#D8261C]/25 border border-[#FDE047]/40'
                  : 'bg-white border border-[#FED7AA] text-[#57534E] hover:text-[#D8261C] hover:border-[#D8261C]'
              }`}
            >
              {zone === 'All' ? 'All Zones' : zone}
            </button>
          );
        })}
      </div>

      {/* Desktop Quick Attribute Tags */}
      <div className="hidden md:flex items-center justify-between gap-4 pt-1">
        <div className="flex items-center gap-2 flex-wrap">
          
          <button
            onClick={onNearMetroToggle}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-all ${
              nearMetroOnly
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-white text-[#5C554E] border-[#E2DAD0] hover:border-blue-400'
            }`}
          >
            <Train className="w-3.5 h-3.5" />
            <span>Near Metro (&lt;10m walk)</span>
          </button>

          <button
            onClick={onMustVisitToggle}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition-all ${
              mustVisitOnly
                ? 'bg-[#D8261C] text-white border-[#D8261C] shadow-md shadow-[#D8261C]/25'
                : 'bg-white text-[#57534E] border-[#FED7AA] hover:border-[#D8261C]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FDE047]" />
            <span>Must Visit</span>
          </button>

          <button
            onClick={onTrendingToggle}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition-all ${
              trendingOnly
                ? 'bg-[#F59E0B] text-white border-[#F59E0B] shadow-md shadow-[#F59E0B]/25'
                : 'bg-white text-[#57534E] border-[#FED7AA] hover:border-amber-400'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Trending</span>
          </button>

          <button
            onClick={onLessCrowdedToggle}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-all ${
              lessCrowdedOnly
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                : 'bg-white text-[#5C554E] border-[#E2DAD0] hover:border-emerald-400'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
            <span>Less Crowded</span>
          </button>

          <button
            onClick={onWishlistToggle}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-all ${
              wishlistOnly
                ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                : 'bg-white text-[#5C554E] border-[#E2DAD0] hover:border-rose-400'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>My Wishlist</span>
          </button>

        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-[#8E857B] font-medium">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="text-xs font-semibold py-1.5 px-2.5 rounded-xl bg-white border border-[#E2DAD0] text-[#181513] focus:outline-none focus:ring-1 focus:ring-[#D43827]"
          >
            <option value="trending">🔥 Trending</option>
            <option value="popular">👑 Most Popular</option>
            <option value="nearest-metro">🚇 Nearest Metro Walk</option>
            <option value="name">🔤 Alphabetical (A-Z)</option>
            <option value="distance">📍 Distance from Me</option>
          </select>
        </div>
      </div>

      {/* Puja Day selector bar */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1 text-xs">
        <span className="text-[#8E857B] font-mono text-[11px] shrink-0 uppercase tracking-wider">
          Day:
        </span>
        {days.map((d) => (
          <button
            key={d}
            onClick={() => onDayChange(d)}
            className={`px-3 py-1 rounded-lg transition-all shrink-0 font-medium ${
              selectedDay === d
                ? 'bg-[#D43827]/10 text-[#D43827] font-semibold border border-[#D43827]/30'
                : 'text-[#5C554E] hover:text-[#181513] bg-white border border-transparent hover:border-[#E2DAD0]'
            }`}
          >
            {d === 'Tonight' ? '🌙 Tonight' : d}
          </button>
        ))}
      </div>

      {/* Mobile Filter Drawer / Bottom Sheet */}
      {showMobileFilterModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end md:hidden animate-fade-in">
          <div className="w-[85%] max-w-sm h-full bg-[#FAF8F5] p-5 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-[#E2DAD0]">
                <h3 className="text-lg font-bold font-editorial text-[#181513]">Filters & Sorting</h3>
                <button
                  onClick={() => setShowMobileFilterModal(false)}
                  className="p-1 rounded-full text-[#8E857B] hover:text-[#181513]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Sort by */}
              <div>
                <label className="text-xs font-semibold text-[#8E857B] uppercase tracking-wider block mb-2">
                  Sort Pandals By
                </label>
                <div className="grid grid-cols-1 gap-1.5">
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
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between ${
                        sortBy === s.id
                          ? 'bg-[#181513] text-white'
                          : 'bg-white border border-[#E2DAD0] text-[#181513]'
                      }`}
                    >
                      <span>{s.label}</span>
                      {sortBy === s.id && <Check className="w-4 h-4 text-amber-300" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Toggle Filters */}
              <div>
                <label className="text-xs font-semibold text-[#8E857B] uppercase tracking-wider block mb-2">
                  Experience Tags
                </label>
                <div className="space-y-2">
                  
                  <label className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#E2DAD0] text-xs">
                    <span className="flex items-center gap-2 text-[#181513] font-medium">
                      <Train className="w-4 h-4 text-blue-600" /> Near Metro Station (&lt;10m)
                    </span>
                    <input
                      type="checkbox"
                      checked={nearMetroOnly}
                      onChange={onNearMetroToggle}
                      className="accent-[#D43827] w-4 h-4 rounded"
                    />
                  </label>

                  <label className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#E2DAD0] text-xs">
                    <span className="flex items-center gap-2 text-[#181513] font-medium">
                      <Sparkles className="w-4 h-4 text-[#D43827]" /> Must Visit Selection
                    </span>
                    <input
                      type="checkbox"
                      checked={mustVisitOnly}
                      onChange={onMustVisitToggle}
                      className="accent-[#D43827] w-4 h-4 rounded"
                    />
                  </label>

                  <label className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#E2DAD0] text-xs">
                    <span className="flex items-center gap-2 text-[#181513] font-medium">
                      <Flame className="w-4 h-4 text-amber-600" /> Trending Pandals
                    </span>
                    <input
                      type="checkbox"
                      checked={trendingOnly}
                      onChange={onTrendingToggle}
                      className="accent-[#D43827] w-4 h-4 rounded"
                    />
                  </label>

                  <label className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#E2DAD0] text-xs">
                    <span className="flex items-center gap-2 text-[#181513] font-medium">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Less Crowded
                    </span>
                    <input
                      type="checkbox"
                      checked={lessCrowdedOnly}
                      onChange={onLessCrowdedToggle}
                      className="accent-[#D43827] w-4 h-4 rounded"
                    />
                  </label>

                  <label className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#E2DAD0] text-xs">
                    <span className="flex items-center gap-2 text-[#181513] font-medium">
                      <Heart className="w-4 h-4 text-rose-500" /> My Saved Wishlist
                    </span>
                    <input
                      type="checkbox"
                      checked={wishlistOnly}
                      onChange={onWishlistToggle}
                      className="accent-[#D43827] w-4 h-4 rounded"
                    />
                  </label>

                </div>
              </div>

            </div>

            <div className="pt-4 border-t border-[#E2DAD0]">
              <button
                onClick={() => setShowMobileFilterModal(false)}
                className="w-full py-3 rounded-xl bg-[#D43827] text-white font-semibold text-sm shadow-md"
              >
                Apply Filters ({totalCount} Pandals)
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
