'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Sparkles, 
  Search, 
  Train, 
  Heart, 
  MapPin, 
  Flame, 
  ArrowRight, 
  Compass, 
  Clock, 
  Route, 
  ChevronRight,
  ShieldCheck,
  LocateFixed,
  ExternalLink
} from 'lucide-react';
import InstagramIcon from '@/components/icons/InstagramIcon';
import { PANDALS_DATA } from '@/data/pandals';
import { METRO_STATIONS_DATA } from '@/data/metro';
import PandalCard from '@/components/PandalCard';
import { useWishlist } from '@/context/WishlistContext';
import { calculateDistanceKm, formatDistance, buildGoogleMapsUrl } from '@/lib/geo';
import GalleryLightbox from '@/components/GalleryLightbox';
import { Pandal } from '@/types';

export default function HomePage() {
  const { count: wishlistCount } = useWishlist();
  
  // Hero Search state
  const [heroSearch, setHeroSearch] = useState('');
  
  // Metro interactive explorer state on Homepage
  const [selectedMetroId, setSelectedMetroId] = useState('shyambazar');

  // Geolocation state for "Near Me"
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);

  // Gallery lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Collect all latest Instagram & photo posts for the feed
  const allLatestPhotos = useMemo(() => {
    const list: any[] = [];
    PANDALS_DATA.forEach((p) => {
      (p.latest_images || []).forEach((img) => {
        list.push({ ...img, pandalName: p.name, pandalSlug: p.slug });
      });
      (p.images || []).forEach((img) => {
        list.push({ ...img, pandalName: p.name, pandalSlug: p.slug });
      });
    });
    return list.slice(0, 8);
  }, []);

  // Filter pandals based on hero search if user types
  const searchResults = useMemo(() => {
    if (!heroSearch.trim()) return [];
    const q = heroSearch.toLowerCase().trim();
    return PANDALS_DATA.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.locality.toLowerCase().includes(q) ||
      p.area.toLowerCase().includes(q) ||
      p.nearest_metro.toLowerCase().includes(q) ||
      p.theme.toLowerCase().includes(q)
    ).slice(0, 5);
  }, [heroSearch]);

  // Selected Metro station details & nearby pandals
  const selectedMetroStation = useMemo(() => {
    return METRO_STATIONS_DATA.find((m) => m.id === selectedMetroId) || METRO_STATIONS_DATA[0];
  }, [selectedMetroId]);

  const nearbyPandalsForMetro = useMemo(() => {
    if (!selectedMetroStation) return [];
    return selectedMetroStation.nearby_pandals.map((item) => {
      const p = PANDALS_DATA.find((x) => x.id === item.pandal_id);
      return {
        ...item,
        pandal: p
      };
    }).filter((x) => Boolean(x.pandal));
  }, [selectedMetroStation]);

  // Geolocation handler
  const handleNearMe = () => {
    if (!navigator.geolocation) {
      setGeoError('Geolocation is not supported by your browser.');
      return;
    }
    setGeoLoading(true);
    setGeoError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
        setGeoLoading(false);
      },
      (err) => {
        setGeoLoading(false);
        setGeoError('Location permission denied or unavailable. You can still browse manually.');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Featured Pandals
  const featuredPandals = useMemo(() => {
    return PANDALS_DATA.filter((p) => p.tags.includes('Must Visit')).slice(0, 6);
  }, []);

  // Trending Pandals
  const trendingPandals = useMemo(() => {
    return [...PANDALS_DATA].sort((a, b) => b.trending_score - a.trending_score).slice(0, 4);
  }, []);

  return (
    <div className="w-full flex flex-col gap-16 md:gap-24 overflow-hidden">
      
      {/* 1. HERO SECTION - LUXURY EDITORIAL EXPERIENCE */}
      <section className="relative pt-6 sm:pt-14 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        
        {/* Subtle festive decorative ambient warm glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-[radial-gradient(ellipse_at_top,_rgba(245,158,11,0.18),_rgba(216,38,28,0.10)_45%,_transparent_75%)] blur-2xl -z-10 pointer-events-none" />

        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Luxury Heritage Seal Tag */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#FDE68A] shadow-xs text-xs font-mono font-bold text-[#B91C1C]">
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span className="tracking-wider uppercase text-[11px]">ESTD. 2026 • THE DEFINITIVE KOLKATA PUJO COMPANION</span>
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
          </div>

          {/* Hero Main Headline with Playfair Display */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-editorial text-[#1C1917] tracking-tight leading-[1.05]">
            Kolkata Pujo, <br className="hidden sm:inline" />
            <span className="font-editorial italic bg-gradient-to-r from-[#D8261C] via-[#B91C1C] to-[#C2410C] bg-clip-text text-transparent">
              One Guide.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg md:text-xl text-[#57534E] max-w-2xl mx-auto leading-relaxed font-normal">
            Discover the city’s most iconic pandals, navigate via Kolkata Metro with exact walking minutes, and open verified Google Maps locations instantly.
          </p>

          {/* Luxury Hero Search Bar */}
          <div className="relative max-w-2xl mx-auto pt-3">
            <div className="relative flex items-center p-1.5 rounded-3xl bg-white/95 backdrop-blur-md border-2 border-[#FED7AA] shadow-luxe focus-within:border-[#D8261C] transition-all">
              <div className="pl-4 pr-2 flex items-center justify-center text-[#B45309]">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                placeholder="Search pandals (e.g. Sree Bhumi, Bagbazar, Maddox Square)..."
                className="w-full py-3.5 text-sm sm:text-base text-[#1C1917] placeholder-[#A8A29E] bg-transparent focus:outline-none"
              />
              <Link
                href="/pandals"
                className="shrink-0 px-5 sm:px-6 py-3 rounded-2xl bg-gradient-to-r from-[#D8261C] to-[#B91C1C] hover:from-[#B91C1C] hover:to-[#991B1B] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#D8261C]/25 flex items-center gap-1.5 transition-all"
              >
                <span>Discover</span>
                <ArrowRight className="w-4 h-4 text-[#FDE047]" />
              </Link>
            </div>

            {/* Quick Keyword Suggestion Pills */}
            <div className="flex items-center justify-center gap-2 pt-3 flex-wrap text-xs text-[#78716C]">
              <span className="font-mono text-[11px] text-[#A8A29E] uppercase tracking-wider">Quick:</span>
              {[
                { label: 'Sree Bhumi', q: 'Sree Bhumi' },
                { label: 'Bagbazar', q: 'Bagbazar' },
                { label: 'Maddox Square', q: 'Maddox Square' },
                { label: 'Suruchi Sangha', q: 'Suruchi' },
                { label: 'College Square', q: 'College Square' }
              ].map((pill) => (
                <button
                  key={pill.label}
                  onClick={() => setHeroSearch(pill.q)}
                  className="px-3 py-1 rounded-full bg-white/80 hover:bg-[#FFFBEB] border border-[#FED7AA]/70 text-[#1C1917] hover:text-[#D8261C] text-[11px] font-medium transition-colors shadow-2xs"
                >
                  {pill.label}
                </button>
              ))}
            </div>

            {/* Instant Search Results Dropdown */}
            {heroSearch.trim() && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-3xl border border-[#FED7AA] shadow-2xl p-2 z-30 text-left overflow-hidden">
                {searchResults.length > 0 ? (
                  searchResults.map((p) => (
                    <Link
                      key={p.id}
                      href={`/pandal/${p.slug}`}
                      className="p-3.5 rounded-2xl hover:bg-[#FFFBEB] flex items-center justify-between transition-colors group"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-xl overflow-hidden relative shrink-0 border border-[#FED7AA]">
                          <Image src={p.featured_image} alt={p.name} fill className="object-cover" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-[#1C1917] group-hover:text-[#D8261C] transition-colors font-editorial">
                            {p.name}
                          </div>
                          <div className="text-xs text-[#78716C] flex items-center gap-1.5 mt-0.5">
                            <span className="font-semibold text-[#D8261C]">{p.locality}</span>
                            <span>•</span>
                            <span>Metro: {p.nearest_metro} ({p.walking_distance.split(' ')[0]})</span>
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#A8A29E] group-hover:text-[#D8261C] group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))
                ) : (
                  <div className="p-5 text-xs text-center text-[#78716C]">
                    No matching pandals found for &ldquo;{heroSearch}&rdquo;. Try searching another landmark or locality.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Action Badges / CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <Link
              href="/pandals"
              className="px-6 py-3 rounded-full bg-[#D8261C] hover:bg-[#B91C1C] text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-[#D8261C]/30 transition-transform active:scale-95 hover:scale-102"
            >
              <Compass className="w-4 h-4 text-[#FDE047]" />
              <span>Explore All Pandals</span>
            </Link>

            <Link
              href="/metro"
              className="px-6 py-3 rounded-full bg-white hover:bg-[#FFFBEB] border border-[#FED7AA] text-[#1C1917] hover:text-[#D8261C] text-xs font-bold flex items-center gap-2 shadow-xs transition-transform active:scale-95"
            >
              <Train className="w-4 h-4 text-blue-600" />
              <span>Explore by Metro</span>
            </Link>

            <Link
              href="/wishlist"
              className="px-6 py-3 rounded-full bg-white hover:bg-[#FFFBEB] border border-[#FED7AA] text-[#1C1917] hover:text-[#D8261C] text-xs font-bold flex items-center gap-2 shadow-xs transition-transform active:scale-95"
            >
              <Heart className="w-4 h-4 text-[#D8261C] fill-[#D8261C]" />
              <span>My Wishlist ({wishlistCount})</span>
            </Link>

            <button
              onClick={handleNearMe}
              className="px-6 py-3 rounded-full bg-white hover:bg-[#FFFBEB] border border-[#FED7AA] text-[#1C1917] hover:text-[#D8261C] text-xs font-bold flex items-center gap-2 shadow-xs transition-transform active:scale-95"
            >
              <LocateFixed className={`w-4 h-4 ${geoLoading ? 'animate-spin text-amber-500' : 'text-[#D8261C]'}`} />
              <span>{userLocation ? 'Near Me Active' : 'Near Me'}</span>
            </button>
          </div>

          {geoError && (
            <p className="text-xs text-rose-600 font-medium">{geoError}</p>
          )}

        </div>

        {/* 4-Pillar Luxury Festival Pulse Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-5xl mx-auto">
          <div className="p-4 rounded-3xl bg-white/90 backdrop-blur-md border border-[#FED7AA]/80 shadow-luxe flex items-center gap-3.5 text-left">
            <div className="w-11 h-11 rounded-2xl bg-amber-50 text-[#D8261C] border border-[#FDE68A] flex items-center justify-center font-bold text-lg shrink-0 shadow-2xs">
              🏛️
            </div>
            <div>
              <div className="text-sm font-bold text-[#1C1917] font-editorial">14+ Iconic Pandals</div>
              <div className="text-[11px] text-[#78716C] leading-snug">North heritage & South theme powerhouses</div>
            </div>
          </div>

          <div className="p-4 rounded-3xl bg-white/90 backdrop-blur-md border border-[#FED7AA]/80 shadow-luxe flex items-center gap-3.5 text-left">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center font-bold text-lg shrink-0 shadow-2xs">
              🚇
            </div>
            <div>
              <div className="text-sm font-bold text-[#1C1917] font-editorial">3 Metro Lines</div>
              <div className="text-[11px] text-[#78716C] leading-snug">Blue, Green & Purple station-connected</div>
            </div>
          </div>

          <div className="p-4 rounded-3xl bg-white/90 backdrop-blur-md border border-[#FED7AA]/80 shadow-luxe flex items-center gap-3.5 text-left">
            <div className="w-11 h-11 rounded-2xl bg-rose-50 text-[#D8261C] border border-rose-200 flex items-center justify-center font-bold text-lg shrink-0 shadow-2xs">
              🚶
            </div>
            <div>
              <div className="text-sm font-bold text-[#1C1917] font-editorial">Walk-Verified</div>
              <div className="text-[11px] text-[#78716C] leading-snug">Precise minute & meter footpaths</div>
            </div>
          </div>

          <div className="p-4 rounded-3xl bg-white/90 backdrop-blur-md border border-[#FED7AA]/80 shadow-luxe flex items-center gap-3.5 text-left">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center font-bold text-lg shrink-0 shadow-2xs">
              📍
            </div>
            <div>
              <div className="text-sm font-bold text-[#1C1917] font-editorial">Exact GPS Nav</div>
              <div className="text-[11px] text-[#78716C] leading-snug">Direct 1-tap Google Maps coordinates</div>
            </div>
          </div>
        </div>

      </section>

      {/* 2. EXPLORE KOLKATA PUJO BY ZONE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-[#E7E5E4]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D8261C] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#D8261C]" />
              <span>Kolkata Circuit</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-editorial text-[#1C1917] mt-1">
              Explore by Neighbourhood
            </h2>
          </div>
          <Link
            href="/pandals"
            className="text-xs font-bold text-[#D8261C] hover:underline flex items-center gap-1 mt-2 sm:mt-0"
          >
            <span>View All Zones</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <Link
            href="/pandals?zone=North+Kolkata"
            className="group relative h-56 sm:h-64 rounded-3xl overflow-hidden border border-[#FED7AA]/70 shadow-luxe shadow-luxe-hover"
          >
            <Image
              src="https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=600&q=80"
              alt="North Kolkata Durga Puja"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#FDE047] font-bold block mb-1">
                Heritage & Sabeki
              </span>
              <h3 className="text-xl font-bold font-editorial text-white group-hover:text-[#FEF08A] transition-colors">
                North Kolkata
              </h3>
              <p className="text-xs text-[#E7E5E4] line-clamp-1 mt-0.5">
                Bagbazar, Kumartuli, Sovabazar
              </p>
            </div>
          </Link>

          <Link
            href="/pandals?zone=South+Kolkata"
            className="group relative h-56 sm:h-64 rounded-3xl overflow-hidden border border-[#FED7AA]/70 shadow-luxe shadow-luxe-hover"
          >
            <Image
              src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=600&q=80"
              alt="South Kolkata Durga Puja"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#FDE047] font-bold block mb-1">
                Theme Hubs & Adda
              </span>
              <h3 className="text-xl font-bold font-editorial text-white group-hover:text-[#FEF08A] transition-colors">
                South Kolkata
              </h3>
              <p className="text-xs text-[#E7E5E4] line-clamp-1 mt-0.5">
                Maddox Square, Kalighat, Gariahat
              </p>
            </div>
          </Link>

          <Link
            href="/pandals?zone=Central+Kolkata"
            className="group relative h-56 sm:h-64 rounded-3xl overflow-hidden border border-[#FED7AA]/70 shadow-luxe shadow-luxe-hover"
          >
            <Image
              src="https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=600&q=80"
              alt="Central Kolkata Durga Puja"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#FDE047] font-bold block mb-1">
                Lights & Grandeur
              </span>
              <h3 className="text-xl font-bold font-editorial text-white group-hover:text-[#FEF08A] transition-colors">
                Central Kolkata
              </h3>
              <p className="text-xs text-[#E7E5E4] line-clamp-1 mt-0.5">
                College Square, Santosh Mitra
              </p>
            </div>
          </Link>

          <Link
            href="/pandals?zone=East+Kolkata"
            className="group relative h-56 sm:h-64 rounded-3xl overflow-hidden border border-[#FED7AA]/70 shadow-luxe shadow-luxe-hover"
          >
            <Image
              src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80"
              alt="East Kolkata Durga Puja"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#FDE047] font-bold block mb-1">
                Modern & Green Line
              </span>
              <h3 className="text-xl font-bold font-editorial text-white group-hover:text-[#FEF08A] transition-colors">
                East Kolkata
              </h3>
              <p className="text-xs text-[#E7E5E4] line-clamp-1 mt-0.5">
                Salt Lake FD Block, Sector V
              </p>
            </div>
          </Link>

        </div>
      </section>

      {/* 3. FEATURED MUST-VISIT PANDALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-[#E9E2D8]">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#D43827] font-semibold">
              Curated Selection
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-[#181513] mt-1">
              Iconic Pandals of 2026
            </h2>
          </div>
          <Link
            href="/pandals?mustVisit=true"
            className="text-xs font-semibold text-[#D43827] hover:underline flex items-center gap-1 mt-2 sm:mt-0"
          >
            <span>See All Must-Visit Pandals</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPandals.map((pandal, idx) => (
            <PandalCard key={pandal.id} pandal={pandal} priority={idx < 3} />
          ))}
        </div>
      </section>

      {/* 4. "START FROM YOUR METRO STATION" - DEDICATED METRO DISCOVERY WIDGET */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-gradient-to-br from-[#FFFBEB] via-[#FEF9EE] to-[#FEF2F2] rounded-3xl p-6 sm:p-10 text-[#1C1917] shadow-xl border-2 border-[#FED7AA] relative overflow-hidden">
          
          <div className="max-w-2xl mb-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#92400E] text-xs font-mono mb-3 border border-[#FED7AA] font-bold shadow-xs">
              <Train className="w-3.5 h-3.5 text-[#D8261C]" />
              <span>Smart Kolkata Transit</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-editorial text-[#1C1917] mb-3">
              Start From Your Metro Station
            </h2>
            <p className="text-sm text-[#57534E] leading-relaxed">
              Select your boarding or destination station. Instantly discover all nearby iconic pandals, exact walking distances, minutes on foot, and direct Google Maps directions.
            </p>
          </div>

          {/* Station Selector Bar */}
          <div className="mb-8 relative z-10">
            <span className="text-xs uppercase font-mono tracking-wider text-[#92400E] font-bold block mb-3">
              Select Station:
            </span>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
              {METRO_STATIONS_DATA.map((station) => {
                const isSelected = station.id === selectedMetroId;
                return (
                  <button
                    key={station.id}
                    onClick={() => setSelectedMetroId(station.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                      isSelected
                        ? 'bg-[#D8261C] text-white shadow-md shadow-[#D8261C]/30 scale-102 border border-[#FDE047]'
                        : 'bg-white text-[#57534E] hover:bg-[#FFFBEB] hover:text-[#D8261C] border border-[#FED7AA] shadow-2xs'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${station.line_code === 'blue' ? 'bg-blue-500' : 'bg-emerald-500'}`} />
                    <span>{station.name}</span>
                    {station.bengali_name && (
                      <span className="text-[10px] opacity-75">({station.bengali_name})</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results Grid for Selected Station */}
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-[#1C1917] flex items-center gap-2">
                <span>Nearby Pandals from</span>
                <span className="text-[#D8261C] font-bold underline decoration-[#F59E0B]">
                  {selectedMetroStation.name}
                </span>
                <span className="text-xs text-[#78716C]">
                  ({selectedMetroStation.line})
                </span>
              </h3>
              <Link
                href="/metro"
                className="text-xs font-bold text-[#D8261C] hover:underline flex items-center gap-1"
              >
                <span>Full Metro Map</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#F59E0B]" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {nearbyPandalsForMetro.map((item) => (
                <div
                  key={item.pandal_id}
                  className="bg-white border border-[#FED7AA]/80 rounded-3xl p-5 flex flex-col justify-between shadow-luxe shadow-luxe-hover transition-all"
                >
                  <div className="flex items-start gap-3.5 mb-3.5">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden relative shrink-0 border border-[#FED7AA]">
                      <Image
                        src={item.pandal!.featured_image}
                        alt={item.pandal!.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="truncate">
                      <h4 className="text-base font-bold font-editorial text-[#1C1917] truncate">
                        {item.pandal!.name}
                      </h4>
                      <p className="text-xs text-[#78716C] truncate mt-0.5">
                        {item.pandal!.locality}
                      </p>
                      <div className="mt-1.5 flex items-center gap-2 text-xs">
                        <span className="text-[#D8261C] font-bold">
                          {item.walking_distance}
                        </span>
                        <span className="text-[#FED7AA]">•</span>
                        <span className="text-[#B45309] font-semibold bg-[#FEF3C7] px-2 py-0.5 rounded-full text-[10px]">
                          {item.walking_time_mins} min walk
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-[#FEE2E2]">
                    <Link
                      href={`/pandal/${item.pandal!.slug}`}
                      className="flex-1 py-2.5 rounded-xl bg-[#FFFBEB] hover:bg-[#FEF3C7] text-[#92400E] hover:text-[#B45309] text-xs font-bold text-center border border-[#FED7AA] transition-colors"
                    >
                      View Details
                    </Link>
                    <a
                      href={item.directions_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-[#D8261C] to-[#B91C1C] hover:from-[#B91C1C] hover:to-[#991B1B] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                    >
                      <MapPin className="w-3.5 h-3.5 text-[#FDE047]" />
                      <span>Walk Route</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 5. LATEST PHOTOS & AUTHORIZED INSTAGRAM FEED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-[#E7E5E4]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D8261C] font-bold">
                Visual Feed
              </span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] font-bold flex items-center gap-1">
                <InstagramIcon className="w-3 h-3 text-[#D8261C]" /> Authorized Live Media
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-editorial text-[#1C1917] mt-1">
              Latest from Kolkata Pujo
            </h2>
          </div>
          <span className="text-xs text-[#78716C] mt-2 sm:mt-0 font-medium">
            Verified streams from puja committees & accredited festival photographers
          </span>
        </div>

        {/* Gallery Grid with Luxury Editorial Masonry feel */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
          {allLatestPhotos.map((photo, index) => (
            <div
              key={photo.id || index}
              onClick={() => {
                setLightboxIndex(index);
                setLightboxOpen(true);
              }}
              className="group relative aspect-square rounded-3xl overflow-hidden bg-[#FFFBEB] cursor-pointer border border-[#FED7AA]/80 shadow-luxe shadow-luxe-hover transition-all"
            >
              <Image
                src={photo.media_url || photo.url}
                alt={photo.caption || 'Pandal photograph'}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Overlay on hover */}
              <div className="absolute bottom-3 left-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-xs font-bold font-editorial truncate text-white drop-shadow-sm">
                  {photo.pandalName}
                </div>
                {photo.username && (
                  <div className="text-[10px] text-[#FDE047] truncate font-mono mt-0.5">
                    @{photo.username}
                  </div>
                )}
              </div>

              {/* Instagram badge */}
              {photo.permalink && (
                <div className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20 shadow-xs">
                  <InstagramIcon className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 6. WHAT'S TRENDING SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-[#E7E5E4]">
          <div>
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#D8261C]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#D8261C] font-bold">
                Community Buzz
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-editorial text-[#1C1917] mt-1">
              Trending Pandals Right Now
            </h2>
          </div>
          <Link
            href="/pandals?trending=true"
            className="text-xs font-bold text-[#D8261C] hover:underline flex items-center gap-1 mt-2 sm:mt-0"
          >
            <span>Explore All Trending</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {trendingPandals.map((pandal) => (
            <PandalCard key={pandal.id} pandal={pandal} />
          ))}
        </div>
      </section>

      {/* 7. PLANNER & WISHLIST CTA HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#FFFBEB] via-[#FEF3C7]/90 to-[#FEE2E2]/90 border-2 border-[#FED7AA] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-luxe">
          
          <div className="max-w-xl space-y-4">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#D8261C] text-white inline-block font-mono shadow-xs">
              Effortless Pandal Hopping
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold font-editorial text-[#1C1917] leading-tight">
              Ready to craft your custom Pujo Itinerary?
            </h2>
            <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
              Select multiple pandals across Kolkata, let our planner generate your sequential transit hops by Metro and walking, and open the complete route directly in Google Maps.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <Link
                href="/planner"
                className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#D8261C] to-[#B91C1C] hover:from-[#B91C1C] hover:to-[#991B1B] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md shadow-[#D8261C]/30 transition-all active:scale-95 hover:scale-102"
              >
                <Route className="w-4 h-4 text-[#FDE047]" />
                <span>Launch Route Planner</span>
              </Link>
              <Link
                href="/wishlist"
                className="px-7 py-3.5 rounded-2xl bg-white hover:bg-[#FFFBEB] border border-[#FED7AA] text-[#1C1917] hover:text-[#D8261C] text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs transition-all active:scale-95"
              >
                <Heart className="w-4 h-4 text-[#D8261C] fill-[#D8261C]" />
                <span>View Saved Wishlist ({wishlistCount})</span>
              </Link>
            </div>
          </div>

          <div className="w-full md:w-88 p-6 rounded-3xl bg-white/95 backdrop-blur-md border border-[#FED7AA] shadow-luxe space-y-3.5 shrink-0">
            <div className="text-sm font-bold text-[#1C1917] font-editorial flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#F59E0B]" />
              <span>Smart Pujo Tips 2026</span>
            </div>
            <ul className="text-xs text-[#57534E] space-y-2.5 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-[#D8261C] font-bold text-sm leading-none">•</span>
                <span>North Kolkata pandals are best visited around morning Pushpanjali or late evening.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D8261C] font-bold text-sm leading-none">•</span>
                <span>Green Line Metro connects Sealdah directly to Salt Lake FD Block in under 12 mins.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D8261C] font-bold text-sm leading-none">•</span>
                <span>Carry Metro smart cards or use UPI ticketing to skip station queue counters.</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* Fullscreen Lightbox Modal */}
      <GalleryLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={allLatestPhotos}
        currentIndex={lightboxIndex}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />

    </div>
  );
}
