'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PANDALS_DATA } from '@/data/pandals';
import { METRO_STATIONS_DATA } from '@/data/metro';
import PandalCard from '@/components/PandalCard';
import SearchAndFilters from '@/components/SearchAndFilters';
import InteractiveMap from '@/components/InteractiveMap';
import { ZoneArea, Pandal } from '@/types';
import { useWishlist } from '@/context/WishlistContext';
import { calculateDistanceKm } from '@/lib/geo';
import { LayoutGrid, Map, SlidersHorizontal, Sparkles, AlertCircle, Loader2 } from 'lucide-react';

function PandalsContent() {
  const searchParams = useSearchParams();
  const { wishlist } = useWishlist();

  // Query parameter defaults
  const initialZone = (searchParams.get('zone') as ZoneArea) || 'All';
  const initialNearMetro = searchParams.get('nearMetro') === 'true';
  const initialMustVisit = searchParams.get('mustVisit') === 'true';
  const initialTrending = searchParams.get('trending') === 'true';

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedZone, setSelectedZone] = useState<ZoneArea | 'All'>(initialZone);
  const [nearMetroOnly, setNearMetroOnly] = useState(initialNearMetro);
  const [mustVisitOnly, setMustVisitOnly] = useState(initialMustVisit);
  const [popularOnly, setPopularOnly] = useState(false);
  const [trendingOnly, setTrendingOnly] = useState(initialTrending);
  const [lessCrowdedOnly, setLessCrowdedOnly] = useState(false);
  const [wishlistOnly, setWishlistOnly] = useState(false);
  const [selectedDay, setSelectedDay] = useState('All');
  const [sortBy, setSortBy] = useState('trending');

  // View mode: 'split' (desktop side-by-side or responsive), 'grid', 'map'
  const [viewMode, setViewMode] = useState<'grid' | 'map' | 'split'>('grid');
  const [selectedPandalForMap, setSelectedPandalForMap] = useState<Pandal | null>(null);

  // Geolocation
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isNearMeActive, setIsNearMeActive] = useState(false);

  // Sync URL search params if user navigated with parameters
  useEffect(() => {
    const z = searchParams.get('zone') as ZoneArea;
    if (z) setSelectedZone(z);
    if (searchParams.get('nearMetro') === 'true') setNearMetroOnly(true);
    if (searchParams.get('mustVisit') === 'true') setMustVisitOnly(true);
    if (searchParams.get('trending') === 'true') setTrendingOnly(true);
  }, [searchParams]);

  // Geolocation trigger
  const handleNearMeToggle = () => {
    if (isNearMeActive) {
      setIsNearMeActive(false);
      setUserLocation(null);
      return;
    }

    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
        setIsNearMeActive(true);
        setSortBy('distance');
      },
      (err) => {
        alert('Could not access your location. Please check browser permissions.');
      }
    );
  };

  // Filtered & sorted Pandals
  const filteredPandals = useMemo(() => {
    let result = [...PANDALS_DATA];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.locality.toLowerCase().includes(q) ||
          p.area.toLowerCase().includes(q) ||
          p.nearest_metro.toLowerCase().includes(q) ||
          p.theme.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Zone
    if (selectedZone !== 'All') {
      result = result.filter((p) => p.area === selectedZone);
    }

    // Near metro (< 10 mins walk)
    if (nearMetroOnly) {
      result = result.filter((p) => p.walking_time_mins <= 10);
    }

    // Must visit
    if (mustVisitOnly) {
      result = result.filter((p) => p.tags.includes('Must Visit'));
    }

    // Popular
    if (popularOnly) {
      result = result.filter((p) => p.tags.includes('Popular'));
    }

    // Trending
    if (trendingOnly) {
      result = result.filter((p) => p.tags.includes('Trending') || p.trending_score >= 90);
    }

    // Less crowded
    if (lessCrowdedOnly) {
      result = result.filter(
        (p) => p.crowd_status.level === 'low' || p.tags.includes('Less Crowded')
      );
    }

    // Wishlist only
    if (wishlistOnly) {
      result = result.filter((p) => wishlist.includes(p.id));
    }

    // Day filter
    if (selectedDay !== 'All') {
      result = result.filter((p) => p.recommended_days.includes(selectedDay as any));
    }

    // Sorting
    if (sortBy === 'trending') {
      result.sort((a, b) => b.trending_score - a.trending_score);
    } else if (sortBy === 'popular') {
      result.sort((a, b) => b.saves_count - a.saves_count);
    } else if (sortBy === 'nearest-metro') {
      result.sort((a, b) => a.walking_time_mins - b.walking_time_mins);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'distance' && userLocation) {
      result.sort((a, b) => {
        const dA = calculateDistanceKm(userLocation.lat, userLocation.lng, a.latitude, a.longitude);
        const dB = calculateDistanceKm(userLocation.lat, userLocation.lng, b.latitude, b.longitude);
        return dA - dB;
      });
    }

    return result;
  }, [
    searchQuery,
    selectedZone,
    nearMetroOnly,
    mustVisitOnly,
    popularOnly,
    trendingOnly,
    lessCrowdedOnly,
    wishlistOnly,
    selectedDay,
    sortBy,
    userLocation,
    wishlist
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pb-4 border-b border-stone-200 dark:border-white/10">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#D8261C] dark:text-amber-400 font-bold">
            Discovery Catalog
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-editorial text-stone-900 dark:text-stone-50 mt-1">
            Kolkata Pandal Guide
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1 font-medium">
            Showing {filteredPandals.length} authentic 2026 Kolkata Durga Puja pandals
          </p>
        </div>

        {/* View Switcher: Grid vs Map vs Split */}
        <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-[#1A1218] border border-stone-200 dark:border-white/10 rounded-2xl shadow-xs self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              viewMode === 'grid'
                ? 'bg-[#D8261C] text-white shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-[#D8261C] dark:hover:text-white hover:bg-stone-50 dark:hover:bg-stone-800'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Grid</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('map')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              viewMode === 'map'
                ? 'bg-[#D8261C] text-white shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-[#D8261C] dark:hover:text-white hover:bg-stone-50 dark:hover:bg-stone-800'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            <span>Map Only</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('split')}
            className={`hidden lg:flex px-3 py-1.5 rounded-xl text-xs font-semibold items-center gap-1.5 transition-all ${
              viewMode === 'split'
                ? 'bg-[#D8261C] text-white shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-[#D8261C] dark:hover:text-white hover:bg-stone-50 dark:hover:bg-stone-800'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Split View</span>
          </button>
        </div>
      </div>

      {/* Search and Filters component */}
      <div className="mb-8">
        <SearchAndFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedZone={selectedZone}
          onZoneChange={setSelectedZone}
          nearMetroOnly={nearMetroOnly}
          onNearMetroToggle={() => setNearMetroOnly(!nearMetroOnly)}
          mustVisitOnly={mustVisitOnly}
          onMustVisitToggle={() => setMustVisitOnly(!mustVisitOnly)}
          popularOnly={popularOnly}
          onPopularToggle={() => setPopularOnly(!popularOnly)}
          trendingOnly={trendingOnly}
          onTrendingToggle={() => setTrendingOnly(!trendingOnly)}
          lessCrowdedOnly={lessCrowdedOnly}
          onLessCrowdedToggle={() => setLessCrowdedOnly(!lessCrowdedOnly)}
          wishlistOnly={wishlistOnly}
          onWishlistToggle={() => setWishlistOnly(!wishlistOnly)}
          selectedDay={selectedDay}
          onDayChange={setSelectedDay}
          sortBy={sortBy}
          onSortChange={setSortBy}
          isNearMeActive={isNearMeActive}
          onNearMeToggle={handleNearMeToggle}
          totalCount={filteredPandals.length}
        />
      </div>

      {/* Main Content Render based on ViewMode */}
      {viewMode === 'grid' && (
        <div>
          {filteredPandals.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredPandals.map((pandal) => (
                <PandalCard key={pandal.id} pandal={pandal} />
              ))}
            </div>
          ) : (
            <EmptyState onReset={() => {
              setSearchQuery('');
              setSelectedZone('All');
              setNearMetroOnly(false);
              setMustVisitOnly(false);
              setPopularOnly(false);
              setTrendingOnly(false);
              setLessCrowdedOnly(false);
              setWishlistOnly(false);
              setSelectedDay('All');
            }} />
          )}
        </div>
      )}

      {viewMode === 'map' && (
        <div className="w-full">
          <InteractiveMap
            pandals={filteredPandals}
            metroStations={METRO_STATIONS_DATA}
            selectedPandalId={selectedPandalForMap?.id}
            onSelectPandal={(p) => setSelectedPandalForMap(p)}
            heightClass="h-[75vh]"
          />
        </div>
      )}

      {viewMode === 'split' && (
        <div className="grid grid-cols-12 gap-6 items-start">
          {/* Left Column: Pandal cards list */}
          <div className="col-span-12 lg:col-span-7 space-y-4 max-h-[85vh] overflow-y-auto pr-2 no-scrollbar">
            {filteredPandals.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredPandals.map((pandal) => (
                  <div
                    key={pandal.id}
                    onClick={() => setSelectedPandalForMap(pandal)}
                    className="cursor-pointer"
                  >
                    <PandalCard pandal={pandal} />
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState onReset={() => {
                setSearchQuery('');
                setSelectedZone('All');
              }} />
            )}
          </div>

          {/* Right Column: Sticky Interactive Map */}
          <div className="col-span-12 lg:col-span-5 sticky top-24">
            <InteractiveMap
              pandals={filteredPandals}
              metroStations={METRO_STATIONS_DATA}
              selectedPandalId={selectedPandalForMap?.id}
              onSelectPandal={(p) => setSelectedPandalForMap(p)}
              heightClass="h-[80vh]"
            />
          </div>
        </div>
      )}

    </div>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="text-center py-16 px-4 bg-white dark:bg-[#1A1218] rounded-3xl border border-stone-200 dark:border-white/10 max-w-lg mx-auto space-y-4 my-8 shadow-sm">
      <div className="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto border border-amber-200/60 dark:border-amber-900/40">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-bold font-editorial text-stone-900 dark:text-white">
        No pandals found
      </h3>
      <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
        We couldn&rsquo;t find any pandals matching your active filter criteria. Try clearing your search keyword or relaxing zone constraints.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="px-5 py-2.5 rounded-xl bg-[#D8261C] text-white text-xs font-semibold hover:bg-[#B91C1C] transition-all shadow-sm active:scale-98"
      >
        Reset All Filters
      </button>
    </div>
  );
}

export default function PandalsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-24 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#D43827] mx-auto mb-3" />
          <p className="text-xs text-[#8E857B] font-mono">Loading Kolkata Pandals Catalog...</p>
        </div>
      }
    >
      <PandalsContent />
    </Suspense>
  );
}
