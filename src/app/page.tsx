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
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 sm:pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 bg-gradient-to-b from-[#D43827]/8 via-[#C99726]/5 to-transparent blur-3xl -z-10 pointer-events-none" />

        <div className="text-center max-w-3xl mx-auto space-y-5">
          
          {/* Subtle Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E9E2D8] shadow-xs text-xs font-mono font-medium text-[#181513]">
            <span className="w-2 h-2 rounded-full bg-[#D43827] animate-ping" />
            <span>Pandalé • Kolkata Durga Puja 2026 Edition</span>
          </div>

          {/* Hero Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-editorial text-[#181513] tracking-tight leading-[1.08]">
            Kolkata Pujo, <br className="hidden sm:inline" />
            <span className="text-[#D43827] italic font-normal">One Guide.</span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-[#5C554E] max-w-xl mx-auto leading-relaxed">
            Discover the city’s most iconic pandals, plan your route by Metro, see verified 2026 preview photos, and never miss a Pujo worth seeing.
          </p>

          {/* Hero Search Bar */}
          <div className="relative max-w-xl mx-auto pt-2">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8E857B]" />
              <input
                type="text"
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                placeholder="Search pandals (e.g. Sree Bhumi, Bagbazar, Maddox Square)..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-[#D8CEBF] text-sm text-[#181513] placeholder-[#8E857B] shadow-md focus:outline-none focus:ring-2 focus:ring-[#D43827]/40 focus:border-[#D43827] transition-all"
              />
            </div>

            {/* Instant Search Results Dropdown */}
            {heroSearch.trim() && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-[#D8CEBF] shadow-2xl p-2 z-30 text-left">
                {searchResults.length > 0 ? (
                  searchResults.map((p) => (
                    <Link
                      key={p.id}
                      href={`/pandal/${p.slug}`}
                      className="p-3 rounded-xl hover:bg-[#FAF8F5] flex items-center justify-between transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden relative shrink-0">
                          <Image src={p.featured_image} alt={p.name} fill className="object-cover" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#181513] group-hover:text-[#D43827] transition-colors">
                            {p.name}
                          </div>
                          <div className="text-[11px] text-[#8E857B]">
                            {p.locality} • Metro: {p.nearest_metro} ({p.walking_distance.split(' ')[0]})
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#8E857B] group-hover:text-[#D43827]" />
                    </Link>
                  ))
                ) : (
                  <div className="p-4 text-xs text-center text-[#8E857B]">
                    No matching pandal found for &ldquo;{heroSearch}&rdquo;. Try searching another locality.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Action Badges / CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
            <Link
              href="/pandals"
              className="px-5 py-2.5 rounded-full bg-[#181513] hover:bg-[#2A2623] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-transform active:scale-95"
            >
              <Compass className="w-4 h-4 text-amber-300" />
              <span>Explore Pandals</span>
            </Link>

            <Link
              href="/metro"
              className="px-5 py-2.5 rounded-full bg-white hover:bg-[#FAF8F5] border border-[#D8CEBF] text-[#181513] text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-transform active:scale-95"
            >
              <Train className="w-4 h-4 text-blue-600" />
              <span>Explore by Metro</span>
            </Link>

            <Link
              href="/wishlist"
              className="px-5 py-2.5 rounded-full bg-white hover:bg-[#FAF8F5] border border-[#D8CEBF] text-[#181513] text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-transform active:scale-95"
            >
              <Heart className="w-4 h-4 text-[#D43827]" />
              <span>My Wishlist ({wishlistCount})</span>
            </Link>

            <button
              onClick={handleNearMe}
              className="px-5 py-2.5 rounded-full bg-white hover:bg-[#FAF8F5] border border-[#D8CEBF] text-[#181513] text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-transform active:scale-95"
            >
              <LocateFixed className={`w-4 h-4 ${geoLoading ? 'animate-spin text-amber-500' : 'text-emerald-600'}`} />
              <span>{userLocation ? 'Near Me Active' : 'Near Me'}</span>
            </button>
          </div>

          {geoError && (
            <p className="text-xs text-rose-600 font-medium">{geoError}</p>
          )}

        </div>

      </section>

      {/* 2. EXPLORE KOLKATA PUJO BY ZONE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-[#E9E2D8]">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#D43827] font-semibold">
              Kolkata Circuit
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-[#181513] mt-1">
              Explore by Neighbourhood
            </h2>
          </div>
          <Link
            href="/pandals"
            className="text-xs font-semibold text-[#D43827] hover:underline flex items-center gap-1 mt-2 sm:mt-0"
          >
            <span>View All Zones</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          <Link
            href="/pandals?zone=North+Kolkata"
            className="group relative h-48 sm:h-56 rounded-2xl overflow-hidden border border-[#E9E2D8] shadow-sm"
          >
            <Image
              src="https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=600&q=80"
              alt="North Kolkata Durga Puja"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <span className="text-[10px] uppercase font-mono tracking-wider text-amber-300">
                Heritage & Sabeki
              </span>
              <h3 className="text-lg font-bold font-editorial text-white group-hover:text-amber-200">
                North Kolkata
              </h3>
              <p className="text-[11px] text-stone-300 line-clamp-1">
                Bagbazar, Kumartuli, Sovabazar
              </p>
            </div>
          </Link>

          <Link
            href="/pandals?zone=South+Kolkata"
            className="group relative h-48 sm:h-56 rounded-2xl overflow-hidden border border-[#E9E2D8] shadow-sm"
          >
            <Image
              src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=600&q=80"
              alt="South Kolkata Durga Puja"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <span className="text-[10px] uppercase font-mono tracking-wider text-amber-300">
                Theme Hubs & Adda
              </span>
              <h3 className="text-lg font-bold font-editorial text-white group-hover:text-amber-200">
                South Kolkata
              </h3>
              <p className="text-[11px] text-stone-300 line-clamp-1">
                Maddox Square, Kalighat, Gariahat
              </p>
            </div>
          </Link>

          <Link
            href="/pandals?zone=Central+Kolkata"
            className="group relative h-48 sm:h-56 rounded-2xl overflow-hidden border border-[#E9E2D8] shadow-sm"
          >
            <Image
              src="https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=600&q=80"
              alt="Central Kolkata Durga Puja"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <span className="text-[10px] uppercase font-mono tracking-wider text-amber-300">
                Lights & Grandeur
              </span>
              <h3 className="text-lg font-bold font-editorial text-white group-hover:text-amber-200">
                Central Kolkata
              </h3>
              <p className="text-[11px] text-stone-300 line-clamp-1">
                College Square, Santosh Mitra
              </p>
            </div>
          </Link>

          <Link
            href="/pandals?zone=East+Kolkata"
            className="group relative h-48 sm:h-56 rounded-2xl overflow-hidden border border-[#E9E2D8] shadow-sm"
          >
            <Image
              src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80"
              alt="East Kolkata Durga Puja"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <span className="text-[10px] uppercase font-mono tracking-wider text-amber-300">
                Modern & Green Line
              </span>
              <h3 className="text-lg font-bold font-editorial text-white group-hover:text-amber-200">
                East Kolkata
              </h3>
              <p className="text-[11px] text-stone-300 line-clamp-1">
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
        <div className="bg-gradient-to-br from-[#181513] to-[#25211E] rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-[#332E2A]">
          
          <div className="max-w-2xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-mono mb-3 border border-blue-500/30">
              <Train className="w-3.5 h-3.5" />
              <span>Smart Kolkata Transit</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-editorial text-white mb-3">
              Start From Your Metro Station
            </h2>
            <p className="text-sm text-stone-300 leading-relaxed">
              Select your boarding or destination station. Instantly discover all nearby iconic pandals, exact walking distances, minutes on foot, and direct Google Maps directions.
            </p>
          </div>

          {/* Station Selector Bar */}
          <div className="mb-8">
            <span className="text-xs uppercase font-mono tracking-wider text-stone-400 block mb-3">
              Select Station:
            </span>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
              {METRO_STATIONS_DATA.map((station) => {
                const isSelected = station.id === selectedMetroId;
                return (
                  <button
                    key={station.id}
                    onClick={() => setSelectedMetroId(station.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                      isSelected
                        ? 'bg-[#D43827] text-white shadow-lg shadow-[#D43827]/30 scale-102'
                        : 'bg-[#2E2925] text-stone-300 hover:bg-[#3D3732] hover:text-white'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${station.line_code === 'blue' ? 'bg-blue-400' : 'bg-emerald-400'}`} />
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
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-stone-300 flex items-center gap-2">
                <span>Nearby Pandals from</span>
                <span className="text-white font-bold underline decoration-[#D43827]">
                  {selectedMetroStation.name}
                </span>
                <span className="text-xs text-stone-400">
                  ({selectedMetroStation.line})
                </span>
              </h3>
              <Link
                href="/metro"
                className="text-xs text-amber-300 hover:underline flex items-center gap-1"
              >
                <span>Full Metro Map</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {nearbyPandalsForMetro.map((item) => (
                <div
                  key={item.pandal_id}
                  className="bg-[#24201D] border border-[#3A342F] rounded-2xl p-4 flex flex-col justify-between hover:border-stone-500 transition-colors"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden relative shrink-0">
                      <Image
                        src={item.pandal!.featured_image}
                        alt={item.pandal!.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold font-editorial text-white line-clamp-1">
                        {item.pandal!.name}
                      </h4>
                      <p className="text-xs text-stone-400 line-clamp-1">
                        {item.pandal!.locality}
                      </p>
                      <div className="mt-1 flex items-center gap-2 text-xs">
                        <span className="text-emerald-400 font-semibold">
                          {item.walking_distance}
                        </span>
                        <span className="text-stone-500">•</span>
                        <span className="text-amber-300 font-medium">
                          {item.walking_time_mins} min walk
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-[#332E2A]">
                    <Link
                      href={`/pandal/${item.pandal!.slug}`}
                      className="flex-1 py-1.5 rounded-lg bg-stone-700 hover:bg-stone-600 text-white text-xs font-semibold text-center"
                    >
                      View Details
                    </Link>
                    <a
                      href={item.directions_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-1.5 px-3 rounded-lg bg-[#D43827] hover:bg-[#B52819] text-white text-xs font-semibold flex items-center gap-1"
                    >
                      <MapPin className="w-3 h-3" />
                      <span>Directions</span>
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
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-[#E9E2D8]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D43827] font-semibold">
                Visual Feed
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-50 text-pink-700 border border-pink-200 font-medium flex items-center gap-1">
                <InstagramIcon className="w-3 h-3" /> Authorized Media
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-[#181513] mt-1">
              Latest from Kolkata Pujo
            </h2>
          </div>
          <span className="text-xs text-[#8E857B] mt-2 sm:mt-0">
            Updated regularly across official puja committees & accredited photographers
          </span>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {allLatestPhotos.map((photo, index) => (
            <div
              key={photo.id || index}
              onClick={() => {
                setLightboxIndex(index);
                setLightboxOpen(true);
              }}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-stone-100 cursor-pointer border border-[#E9E2D8] shadow-xs hover:shadow-md transition-all"
            >
              <Image
                src={photo.media_url || photo.url}
                alt={photo.caption || 'Pandal photograph'}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Overlay on hover */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="text-[11px] font-bold truncate">
                  {photo.pandalName}
                </div>
                {photo.username && (
                  <div className="text-[10px] text-amber-300 truncate">
                    @{photo.username}
                  </div>
                )}
              </div>

              {/* Instagram badge */}
              {photo.permalink && (
                <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white backdrop-blur-sm">
                  <InstagramIcon className="w-3 h-3" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 6. WHAT'S TRENDING SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-[#E9E2D8]">
          <div>
            <div className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-[#D43827]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#D43827] font-semibold">
                Community Buzz
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-[#181513] mt-1">
              Trending Pandals Right Now
            </h2>
          </div>
          <Link
            href="/pandals?trending=true"
            className="text-xs font-semibold text-[#D43827] hover:underline flex items-center gap-1 mt-2 sm:mt-0"
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
        <div className="relative rounded-3xl overflow-hidden bg-[#FAF3EA] border border-[#E8DEC8] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
          
          <div className="max-w-xl space-y-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#D43827]/10 text-[#D43827] inline-block font-mono">
              Effortless Pandal Hopping
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-editorial text-[#181513]">
              Ready to craft your custom Pujo Itinerary?
            </h2>
            <p className="text-sm text-[#5C554E] leading-relaxed">
              Select multiple pandals across Kolkata, let our planner generate your sequential transit hops by Metro and walking, and open the complete route directly in Google Maps.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/planner"
                className="px-6 py-3 rounded-2xl bg-[#D43827] hover:bg-[#B52819] text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all active:scale-95"
              >
                <Route className="w-4 h-4" />
                <span>Launch Route Planner</span>
              </Link>
              <Link
                href="/wishlist"
                className="px-6 py-3 rounded-2xl bg-white hover:bg-stone-50 border border-[#D8CEBF] text-[#181513] text-xs font-bold flex items-center gap-2 shadow-xs transition-all active:scale-95"
              >
                <Heart className="w-4 h-4 text-[#D43827]" />
                <span>View Saved Wishlist ({wishlistCount})</span>
              </Link>
            </div>
          </div>

          <div className="w-full md:w-80 p-5 rounded-2xl bg-white border border-[#E8DEC8] shadow-md space-y-3 shrink-0">
            <div className="text-xs font-bold text-[#181513] font-editorial flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C99726]" />
              <span>Smart Pujo Tips 2026</span>
            </div>
            <ul className="text-xs text-[#5C554E] space-y-2 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-[#D43827] font-bold">•</span>
                <span>North Kolkata pandals are best visited around morning Pushpanjali or late evening.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D43827] font-bold">•</span>
                <span>Green Line Metro connects Sealdah directly to Salt Lake FD Block in under 12 mins.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D43827] font-bold">•</span>
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
