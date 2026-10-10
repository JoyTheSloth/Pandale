'use client';

import React, { useState, useMemo, useEffect, Suspense, useCallback } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { PANDALS_DATA } from '@/data/pandals';
import PandalCard from '@/components/PandalCard';
import SearchAndFilters from '@/components/SearchAndFilters';
import { ZoneArea } from '@/types';
import { useWishlist } from '@/context/WishlistContext';
import { calculateDistanceKm } from '@/lib/geo';
import { Sparkles, AlertCircle, Loader2, Flame, ArrowRight, MapPin, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocation, KOLKATA_CENTROID } from '@/context/LocationContext';
import { useLanguage } from '@/context/LanguageContext';
import PandalsPageSkeleton from '@/components/PandalsPageSkeleton';

const ITEMS_PER_PAGE = 12;

function PandalsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { wishlist } = useWishlist();
  const { language } = useLanguage();
  const isBn = language === 'bn';

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
  const [currentPage, setCurrentPage] = useState(1);

  // Geolocation from Global LocationContext
  const { location, fetchCurrentLocation } = useLocation();
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isNearMeActive, setIsNearMeActive] = useState(false);

  // Sync with global pinged GPS coordinates
  useEffect(() => {
    if (location.coords) {
      setUserLocation(location.coords);
    }
  }, [location.coords]);

  // Sync URL search params if user navigated with parameters
  useEffect(() => {
    const z = searchParams.get('zone') as ZoneArea;
    if (z) {
      setSelectedZone(z);
    } else {
      setSelectedZone('All');
    }
    if (searchParams.get('nearMetro') === 'true') setNearMetroOnly(true);
    if (searchParams.get('mustVisit') === 'true') setMustVisitOnly(true);
    if (searchParams.get('trending') === 'true') setTrendingOnly(true);
  }, [searchParams]);

  // Reliable Zone switcher that toggles and keeps URL synchronized
  const handleZoneChange = useCallback((zone: ZoneArea | 'All') => {
    const nextZone = (selectedZone === zone && zone !== 'All') ? 'All' : zone;
    setSelectedZone(nextZone);

    const params = new URLSearchParams(searchParams.toString());
    if (nextZone === 'All') {
      params.delete('zone');
    } else {
      params.set('zone', nextZone);
    }
    const qs = params.toString();
    router.replace(qs ? `/pandals?${qs}` : '/pandals', { scroll: false });
  }, [selectedZone, searchParams, router]);

  // Geolocation trigger: instantly activates cards with user or centroid coordinates
  const handleNearMeToggle = useCallback(() => {
    if (isNearMeActive) {
      setIsNearMeActive(false);
      setUserLocation(null);
      setSortBy('trending');
      return;
    }

    setIsNearMeActive(true);
    setSortBy('distance');

    if (location.coords) {
      setUserLocation(location.coords);
    } else {
      // Immediately set reference coordinates so cards sort and distance badges appear INSTANTLY
      setUserLocation(KOLKATA_CENTROID);
      fetchCurrentLocation();
    }
  }, [isNearMeActive, location.coords, fetchCurrentLocation]);

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

    // Near metro (< 12 mins walk or tagged Near Metro)
    if (nearMetroOnly) {
      result = result.filter(
        (p) => (p.walking_time_mins && p.walking_time_mins <= 12) || p.tags.includes('Near Metro')
      );
    }

    // Must visit
    if (mustVisitOnly) {
      result = result.filter((p) => p.tags.includes('Must Visit') || p.is_must_visit);
    }

    // Most Famous (Popular / Highest saved / iconic pandals)
    if (popularOnly) {
      result = result.filter(
        (p) =>
          p.tags.includes('Popular') ||
          p.tags.includes('Must Visit') ||
          p.tags.includes('Trending') ||
          p.saves_count >= 1000 ||
          p.trending_score >= 88
      );
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

    // Top-rated / Must-visit classification helper (e.g. Sree Bhumi Hawa Mahal, Md Ali Park, Maddox, Tala Prattay, etc.)
    const isTopRatedPandal = (p: typeof result[0]) => {
      return (
        p.id === 'sree-bhumi' ||
        p.tags.includes('Must Visit') ||
        p.tags.includes('Popular') ||
        p.is_must_visit === true ||
        (p.trending_score && p.trending_score >= 95)
      );
    };

    // Sorting: Always prioritize top-rated flagship pandals first, then continue with others
    if (sortBy === 'distance') {
      const activeCoords = userLocation || location.coords || KOLKATA_CENTROID;
      result.sort((a, b) => {
        const topA = isTopRatedPandal(a) ? 1 : 0;
        const topB = isTopRatedPandal(b) ? 1 : 0;
        if (topB !== topA) return topB - topA;

        const dA = calculateDistanceKm(activeCoords.lat, activeCoords.lng, a.latitude, a.longitude);
        const dB = calculateDistanceKm(activeCoords.lat, activeCoords.lng, b.latitude, b.longitude);
        return dA - dB;
      });
    } else if (sortBy === 'popular') {
      result.sort((a, b) => {
        const topA = isTopRatedPandal(a) ? 1 : 0;
        const topB = isTopRatedPandal(b) ? 1 : 0;
        if (topB !== topA) return topB - topA;
        return (b.saves_count || 0) - (a.saves_count || 0);
      });
    } else if (sortBy === 'nearest-metro') {
      result.sort((a, b) => {
        const topA = isTopRatedPandal(a) ? 1 : 0;
        const topB = isTopRatedPandal(b) ? 1 : 0;
        if (topB !== topA) return topB - topA;
        return (a.walking_time_mins || 99) - (b.walking_time_mins || 99);
      });
    } else if (sortBy === 'name') {
      result.sort((a, b) => {
        const topA = isTopRatedPandal(a) ? 1 : 0;
        const topB = isTopRatedPandal(b) ? 1 : 0;
        if (topB !== topA) return topB - topA;
        return a.name.localeCompare(b.name);
      });
    } else {
      // Default: 'trending' or any standard view
      // Shows top-rated landmark pandals first (like Sree Bhumi Hawa Mahal, Maddox, Md Ali Park), then continues with others
      result.sort((a, b) => {
        const topA = isTopRatedPandal(a) ? 1 : 0;
        const topB = isTopRatedPandal(b) ? 1 : 0;
        if (topB !== topA) return topB - topA;
        return (b.trending_score || 0) - (a.trending_score || 0);
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
    location.coords,
    wishlist
  ]);

  // Reset to page 1 whenever any filter or search term changes
  useEffect(() => {
    setCurrentPage(1);
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
    isNearMeActive
  ]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredPandals.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedPandals = useMemo(() => {
    return filteredPandals.slice(startIndex, endIndex);
  }, [filteredPandals, startIndex, endIndex]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 220, behavior: 'smooth' });
    }
  };

  // Helper for generating page numbers array with ellipsis (e.g. [1, 2, '...', 7, 8])
  const getPaginationNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | string)[] = [];
    if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, '...', totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
    return pages;
  };

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
            {filteredPandals.length} pandals · Durga Puja 2026
            {filteredPandals.length > ITEMS_PER_PAGE && (
              <span className="ml-2 px-2 py-0.5 rounded-full bg-stone-100 dark:bg-white/10 text-stone-700 dark:text-stone-300 font-mono text-[11px]">
                Showing {startIndex + 1}–{Math.min(endIndex, filteredPandals.length)}
              </span>
            )}
          </p>
        </div>

        {/* Famous Pandals CTA */}
        <Link
          href="/hopping"
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#D8261C] via-[#C41E15] to-[#99140E] hover:from-[#B91C1C] hover:via-[#A81710] hover:to-[#88130E] text-white p-2.5 sm:px-4 sm:py-2.5 shadow-lg shadow-red-600/25 hover:shadow-xl hover:shadow-red-600/35 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 border border-white/20 flex items-center justify-between gap-3 shrink-0 sm:self-end w-full sm:w-auto"
        >
          {/* Shimmer light sweep */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 shadow-inner border border-white/25 group-hover:scale-110 transition-transform duration-200">
              <Flame className="w-4 h-4 text-amber-300 fill-amber-300 animate-pulse" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm leading-tight text-white tracking-tight">
                <span>{isBn ? 'বিখ্যাত পুজো সার্কিট' : 'Famous Pandals'}</span>
                <span className="text-[9.5px] font-mono px-1.5 py-0.5 rounded-full bg-amber-400 text-stone-950 font-extrabold uppercase tracking-wider">
                  Top 48
                </span>
              </div>
              <p className="text-[10.5px] text-white/80 font-medium leading-tight mt-0.5 hidden xs:block">
                {isBn ? 'অঞ্চলভিত্তিক রুট ও ৩-ইন-১ সার্কিট' : 'Zone-Wise 3-in-a-Line Circuits'}
              </p>
            </div>
          </div>

          <div className="w-7 h-7 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20 group-hover:bg-white group-hover:text-[#D8261C] transition-all duration-200 ml-2">
            <ArrowRight className="w-3.5 h-3.5 text-white group-hover:text-[#D8261C] group-hover:translate-x-0.5 transition-all duration-200" />
          </div>
        </Link>
      </div>

      {/* Search and Filters component */}
      <div className="mb-6">
        <SearchAndFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedZone={selectedZone}
          onZoneChange={handleZoneChange}
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
          isLocating={location.status === 'loading'}
          totalCount={filteredPandals.length}
        />
      </div>

      {/* Near Me Active Status Bar */}
      {isNearMeActive && (
        <div className="mb-6 p-3 sm:p-3.5 rounded-2xl bg-gradient-to-r from-red-500/10 via-amber-500/10 to-transparent border border-red-500/20 flex items-center justify-between gap-3 text-xs shadow-xs">
          <div className="flex items-center gap-2 text-stone-800 dark:text-stone-200 min-w-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
            <MapPin className="w-4 h-4 text-[#D8261C] shrink-0" />
            <p className="truncate font-medium">
              {location.isLiveGps ? (
                <>
                  <span className="font-bold text-[#D8261C] dark:text-amber-400">
                    {isBn ? 'লাইভ জিপিএস সক্রিয়:' : 'Live GPS active:'}
                  </span>{' '}
                  {isBn ? `আপনার অবস্থান (${location.areaName}) থেকে নিকটতম দূরত্বে সাজানো` : `Sorted nearest to you (${location.areaName})`}
                </>
              ) : (
                <>
                  <span className="font-bold text-[#D8261C] dark:text-amber-400">
                    {isBn ? 'নিকটবর্তী মণ্ডপ:' : 'Near Me active:'}
                  </span>{' '}
                  {isBn ? 'সেন্ট্রাল কলকাতা কেন্দ্রবিন্দু থেকে দূরত্ব অনুসারে সাজানো' : 'Sorted from Central Kolkata reference point'}
                </>
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={handleNearMeToggle}
            className="flex items-center gap-1 text-[11px] font-bold text-[#D8261C] dark:text-red-400 hover:underline shrink-0 cursor-pointer"
          >
            <span>{isBn ? 'বন্ধ করুন' : 'Turn Off'}</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Pandals List (Paginated: 12 per page) */}
      <div>
        {paginatedPandals.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
              {paginatedPandals.map((pandal) => (
                <PandalCard
                  key={pandal.id}
                  pandal={pandal}
                  userLocation={userLocation || (isNearMeActive ? (location.coords || KOLKATA_CENTROID) : null)}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-10 pt-6 border-t border-stone-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                
                {/* Page info badge */}
                <span className="text-xs font-medium text-stone-500 dark:text-stone-400 font-mono">
                  {isBn ? `পৃষ্ঠা ${currentPage} এর ${totalPages}` : `Page ${currentPage} of ${totalPages}`}
                </span>

                {/* Page Navigation Buttons */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  
                  {/* Previous Button */}
                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold flex items-center gap-1 border border-stone-200 dark:border-white/10 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95 cursor-pointer shadow-xs"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">{isBn ? 'পূর্ববর্তী' : 'Prev'}</span>
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {getPaginationNumbers().map((pageNum, idx) => {
                      if (typeof pageNum === 'string') {
                        return (
                          <span
                            key={`ellipsis-${idx}`}
                            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-xs text-stone-400 dark:text-stone-500 font-mono"
                          >
                            ...
                          </span>
                        );
                      }

                      const isActive = pageNum === currentPage;
                      return (
                        <button
                          key={pageNum}
                          type="button"
                          onClick={() => handlePageChange(pageNum)}
                          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl text-xs font-bold transition-all flex items-center justify-center font-mono cursor-pointer shadow-xs ${
                            isActive
                              ? 'bg-[#D8261C] text-white shadow-md shadow-red-600/30 scale-105'
                              : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-white/10 border border-stone-200/80 dark:border-white/10'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  {/* Next Button */}
                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold flex items-center gap-1 border border-stone-200 dark:border-white/10 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95 cursor-pointer shadow-xs"
                    aria-label="Next page"
                  >
                    <span className="hidden sm:inline">{isBn ? 'পরবর্তী' : 'Next'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                </div>

              </div>
            )}
          </>
        ) : (
          <EmptyState onReset={() => {
            setSearchQuery('');
            handleZoneChange('All');
            setNearMetroOnly(false);
            setMustVisitOnly(false);
            setPopularOnly(false);
            setTrendingOnly(false);
            setLessCrowdedOnly(false);
            setWishlistOnly(false);
            setSelectedDay('All');
            setCurrentPage(1);
            if (isNearMeActive) handleNearMeToggle();
          }} />
        )}
      </div>

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
    <Suspense fallback={<PandalsPageSkeleton />}>
      <PandalsContent />
    </Suspense>
  );
}
