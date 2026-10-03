'use client';

import React, { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PANDALS_DATA } from '@/data/pandals';
import { METRO_STATIONS_DATA } from '@/data/metro';
import { useWishlist } from '@/context/WishlistContext';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Route, 
  Plus, 
  Trash2, 
  ArrowDown, 
  ArrowUp,
  MapPin, 
  Train, 
  Footprints, 
  Clock, 
  ExternalLink, 
  Sparkles,
  Forward,
  Check,
  Search,
  X,
  Compass,
  RotateCcw,
  SlidersHorizontal,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  ArrowUpRight,
  Users
} from 'lucide-react';
import { calculateDistanceKm, formatDistance, buildGoogleMapsUrl } from '@/lib/geo';
import { ZoneArea, Pandal } from '@/types';

// Preset curated pujo itineraries for instant 1-click loading
const PRESET_CIRCUITS = [
  {
    id: 'north-heritage',
    title: 'North Kolkata',
    bengaliTitle: 'উত্তর কলকাতা',
    subtitle: 'Heritage, Sabeki & River Ghats',
    bengaliSubtitle: 'ঐতিহ্য, সাবেকিয়ানা ও গঙ্গার ঘাট',
    icon: '🏛️',
    stopsCount: 7,
    badge: '7 Iconic Pandals',
    bengaliBadge: '৭টি আইকনিক প্যান্ডেল',
    image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=700&q=80',
    landmarks: 'Shyambazar • Hatibagan • Kumartuli',
    bengaliLandmarks: 'শ্যামবাজার • হাতিবাগান • কুমারটুলি',
    description: 'Bagbazar, Hatibagan, Tala Prattay, Kumartuli & Ahiritola',
    ids: [
      'bagbazar-sarbojanin',
      'hatibagan-sarbojanin',
      'tala-prattay',
      'kashi-bose-lane',
      'kumartuli-park',
      'kumartuli-sarbojanin',
      'ahiritola-sarbojanin'
    ],
    zone: 'North Kolkata',
    metro: 'Shyambazar & Shovabazar (350m–700m walk)',
  },
  {
    id: 'south-iconic',
    title: 'South Kolkata',
    bengaliTitle: 'দক্ষিণ কলকাতা',
    subtitle: 'Theme Powerhouses & Night Adda',
    bengaliSubtitle: 'সেরা থিম পুজো ও জমজমাট আড্ডা',
    icon: '✨',
    stopsCount: 6,
    badge: '6 Iconic Pandals',
    bengaliBadge: '৬টি আইকনিক প্যান্ডেল',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=700&q=80',
    landmarks: 'Maddox Square • Suruchi • Singhi Park',
    bengaliLandmarks: 'ম্যাডক্স স্কোয়ার • সুরুচি • সিংহী পার্ক',
    description: 'Maddox Square, Ekdalia, Singhi Park, Suruchi & Badamtala',
    ids: ['maddox-square', 'ekdalia-evergreen', 'singhi-park', 'suruchi-sangha', 'chetla-agrani', 'badamtala-ashar-sangha'],
    zone: 'South Kolkata',
    metro: 'Blue Line (Kalighat & Netaji Bhavan)',
  },
  {
    id: 'central-classic',
    title: 'Central Kolkata',
    bengaliTitle: 'মধ্য কলকাতা',
    subtitle: 'Lakeside Lights & Heritage Squares',
    bengaliSubtitle: 'আলোর রোশনাই ও সাবেক পুজো',
    icon: '👑',
    stopsCount: 4,
    badge: '4 Iconic Pandals',
    bengaliBadge: '৪টি আইকনিক প্যান্ডেল',
    image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=700&q=80',
    landmarks: 'College Square • Lebutala • Sealdah',
    bengaliLandmarks: 'কলেজ স্কোয়ার • লেবুবাগান • শিয়ালদহ',
    description: 'College Square, Santosh Mitra Square & Sealdah',
    ids: ['college-square', 'santosh-mitra-square', 'sealdah-athletic-club', '37-pally'],
    zone: 'Central Kolkata',
    metro: 'Blue & Green (Central / MG Road)',
  },
  {
    id: 'east-saltlake',
    title: 'East Kolkata',
    bengaliTitle: 'পূর্ব কলকাতা',
    subtitle: 'Salt Lake & Tech Corridors',
    bengaliSubtitle: 'সল্টলেক ও টেক করিডোর',
    icon: '🚇',
    stopsCount: 4,
    badge: '4 Iconic Pandals',
    bengaliBadge: '৪টি আইকনিক প্যান্ডেল',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=700&q=80',
    landmarks: 'Salt Lake FD Block • BJ Block • Central Park',
    bengaliLandmarks: 'সল্টলেক এফডি ব্লক • বিজে ব্লক • সেন্ট্রাল পার্ক',
    description: 'FD Block, BJ Block, Central Park & New Town',
    ids: ['salt-lake-fd-block', 'salt-lake-bj-block', 'ae-block-central-park', 'sreebhumi-sporting-club-new-town'],
    zone: 'East Kolkata',
    metro: 'Green Line (City Centre / Karunamoyee)',
  }
];

// Metro hubs grouped by zone for starting point destination selection
export interface HubStationOption {
  id: string;
  name: string;
  bengaliName: string;
  line: string;
  lineColor: 'blue' | 'green' | 'purple';
  subtitle: string;
  bengaliSubtitle: string;
}

const ZONE_METRO_HUBS: Record<string, HubStationOption[]> = {
  'North Kolkata': [
    {
      id: 'shyambazar',
      name: 'Shyambazar',
      bengaliName: 'শ্যামবাজার',
      line: 'Blue Line (North-South)',
      lineColor: 'blue',
      subtitle: 'Hatibagan, Bagbazar & Tala',
      bengaliSubtitle: 'হাতিবাগান, বাগবাজার ও টালা প্রত্যয়',
    },
    {
      id: 'shovabazar',
      name: 'Shovabazar Sutanuti',
      bengaliName: 'শোভাবাজার সুতানুটি',
      line: 'Blue Line (North-South)',
      lineColor: 'blue',
      subtitle: 'Kumartuli Park & Ahiritola',
      bengaliSubtitle: 'কুমারটুলি পার্ক ও আহিরীটোলা',
    },
    {
      id: 'belgachia',
      name: 'Belgachia',
      bengaliName: 'বেলগাছিয়া',
      line: 'Blue Line (North-South)',
      lineColor: 'blue',
      subtitle: 'Sree Bhumi & Lake Town',
      bengaliSubtitle: 'শ্রীভূমি ও লেক টাউন',
    },
    {
      id: 'mg-road',
      name: 'MG Road',
      bengaliName: 'মহাত্মা গান্ধী রোড',
      line: 'Blue Line (North-South)',
      lineColor: 'blue',
      subtitle: 'College Square & Heritage North',
      bengaliSubtitle: 'কলেজ স্কোয়ার ও ঐতিহ্যবাহী উত্তর',
    },
  ],
  'South Kolkata': [
    {
      id: 'kalighat',
      name: 'Kalighat',
      bengaliName: 'কালীঘাট',
      line: 'Blue Line (North-South)',
      lineColor: 'blue',
      subtitle: 'Badamtala, 66 Pally & Deshapriya',
      bengaliSubtitle: 'বাদামতলা, ৬৬ পল্লী ও দেশপ্রিয় পার্ক',
    },
    {
      id: 'netaji-bhavan',
      name: 'Netaji Bhavan',
      bengaliName: 'নেতাজি ভবন',
      line: 'Blue Line (North-South)',
      lineColor: 'blue',
      subtitle: 'Maddox Square & Bhowanipore',
      bengaliSubtitle: 'ম্যাডক্স স্কোয়ার ও ভবানীপুর',
    },
    {
      id: 'rabindra-sarobar',
      name: 'Rabindra Sarobar',
      bengaliName: 'রবীন্দ্র সরোবর',
      line: 'Blue Line (North-South)',
      lineColor: 'blue',
      subtitle: 'Mudiali Club & Lake Pandals',
      bengaliSubtitle: 'মুদিয়ালী ক্লাব ও লেক প্যান্ডেল',
    },
    {
      id: 'behala-chowrasta',
      name: 'Behala Chowrasta',
      bengaliName: 'বেহালা চৌরাস্তা',
      line: 'Purple Line (Joka-Esplanade)',
      lineColor: 'purple',
      subtitle: 'Behala Nutan Dal & Barisha',
      bengaliSubtitle: 'বেহালা নূতন দল ও বরিষা',
    },
  ],
  'Central Kolkata': [
    {
      id: 'central',
      name: 'Central',
      bengaliName: 'সেন্ট্রাল',
      line: 'Blue Line (North-South)',
      lineColor: 'blue',
      subtitle: 'College Square & Santosh Mitra',
      bengaliSubtitle: 'কলেজ স্কোয়ার ও সন্তোষ মিত্র স্কয়ার',
    },
    {
      id: 'sealdah',
      name: 'Sealdah',
      bengaliName: 'শিয়ালদহ',
      line: 'Green Line (East-West)',
      lineColor: 'green',
      subtitle: 'Lebutala, Sealdah Athletic & 37 Pally',
      bengaliSubtitle: 'লেবুবাগান ও শিয়ালদহ অ্যাথলেটিক',
    },
    {
      id: 'chandni-chowk',
      name: 'Chandni Chowk',
      bengaliName: 'চাঁদনি চক',
      line: 'Blue Line (North-South)',
      lineColor: 'blue',
      subtitle: 'Central Hub & Bowbazar',
      bengaliSubtitle: 'সেন্ট্রাল ও বৌবাজার',
    },
  ],
  'East Kolkata': [
    {
      id: 'city-centre',
      name: 'City Centre',
      bengaliName: 'সিটি সেন্টার',
      line: 'Green Line (East-West)',
      lineColor: 'green',
      subtitle: 'Salt Lake FD Block & BD Block',
      bengaliSubtitle: 'সল্টলেক এফডি ব্লক',
    },
    {
      id: 'karunamoyee',
      name: 'Karunamoyee',
      bengaliName: 'করুণাময়ী',
      line: 'Green Line (East-West)',
      lineColor: 'green',
      subtitle: 'BJ Block & Central Salt Lake',
      bengaliSubtitle: 'সল্টলেক বিজে ব্লক',
    },
    {
      id: 'central-park',
      name: 'Central Park',
      bengaliName: 'সেন্ট্রাল পার্ক',
      line: 'Green Line (East-West)',
      lineColor: 'green',
      subtitle: 'AE Block Central Park & New Town',
      bengaliSubtitle: 'এই ব্লক ও নিউ টাউন',
    },
    {
      id: 'salt-lake-stadium',
      name: 'Salt Lake Stadium',
      bengaliName: 'সল্টলেক স্টেডিয়াম',
      line: 'Green Line (East-West)',
      lineColor: 'green',
      subtitle: 'Kadamtala & Salt Lake Gateway',
      bengaliSubtitle: 'সল্টলেক প্রবেশদ্বার',
    },
  ],
};

export default function RoutePlannerPage() {
  const { wishlist } = useWishlist();
  const { language } = useLanguage();
  const isBn = language === 'bn';

  // Metro Line & Starting Metro Hub state
  const [selectedMetroLine, setSelectedMetroLine] = useState<'blue' | 'green' | 'orange'>('blue');
  const [activeStartingHub, setActiveStartingHub] = useState<string>('shyambazar');

  // Selected pandal IDs in route order (defaults to North Kolkata sequentially ordered from Shyambazar)
  const [selectedIds, setSelectedIds] = useState<string[]>(() => {
    if (wishlist.length > 0) {
      return wishlist.slice(0, 6);
    }
    const shyambazar = METRO_STATIONS_DATA.find((s) => s.id === 'shyambazar');
    if (shyambazar) {
      const candidates = PANDALS_DATA.filter((p) => p.area === 'North Kolkata');
      const ordered: string[] = [];
      const remaining = [...candidates];
      let curLat = shyambazar.latitude;
      let curLng = shyambazar.longitude;
      while (remaining.length > 0) {
        let nearestIdx = 0;
        let minDist = Infinity;
        for (let i = 0; i < remaining.length; i++) {
          const d = calculateDistanceKm(curLat, curLng, remaining[i].latitude, remaining[i].longitude);
          if (d < minDist) {
            minDist = d;
            nearestIdx = i;
          }
        }
        const [nearest] = remaining.splice(nearestIdx, 1);
        ordered.push(nearest.id);
        curLat = nearest.latitude;
        curLng = nearest.longitude;
      }
      return ordered;
    }
    return ['hatibagan-sarbojanin', 'kashi-bose-lane', 'tala-prattay', 'bagbazar-sarbojanin'];
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addSearchQuery, setAddSearchQuery] = useState('');
  const [selectedAddZone, setSelectedAddZone] = useState<ZoneArea | 'All'>('All');
  const [copied, setCopied] = useState(false);
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -250 : 250;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Ordered list of selected pandals
  const selectedPandals = useMemo(() => {
    return selectedIds
      .map((id) => PANDALS_DATA.find((p) => p.id === id))
      .filter(Boolean) as Pandal[];
  }, [selectedIds]);

  // Available pandals to add (filtered by modal search & zone)
  const availableToAdd = useMemo(() => {
    const unselected = PANDALS_DATA.filter((p) => !selectedIds.includes(p.id));
    return unselected.filter((p) => {
      const matchesZone = selectedAddZone === 'All' || p.area === selectedAddZone;
      const q = addSearchQuery.toLowerCase().trim();
      const matchesQuery = 
        !q || 
        p.name.toLowerCase().includes(q) || 
        p.locality.toLowerCase().includes(q) || 
        p.area.toLowerCase().includes(q) || 
        p.nearest_metro.toLowerCase().includes(q);
      return matchesZone && matchesQuery;
    });
  }, [selectedIds, selectedAddZone, addSearchQuery]);

  // Route calculations (distances & estimated hops)
  const routeStats = useMemo(() => {
    let totalKm = 0;
    for (let i = 0; i < selectedPandals.length - 1; i++) {
      const p1 = selectedPandals[i];
      const p2 = selectedPandals[i + 1];
      totalKm += calculateDistanceKm(p1.latitude, p1.longitude, p2.latitude, p2.longitude);
    }

    const estimatedMins = Math.round(totalKm * 12 + selectedPandals.length * 35); // transit + viewing time
    const totalSteps = Math.round(totalKm * 1350);

    return {
      totalDistance: totalKm.toFixed(1),
      estimatedHours: (estimatedMins / 60).toFixed(1),
      totalStops: selectedPandals.length,
      estimatedSteps: totalSteps.toLocaleString()
    };
  }, [selectedPandals]);

  // Handlers
  const handleAddPandal = (id: string) => {
    if (!selectedIds.includes(id)) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleRemovePandal = (id: string) => {
    setSelectedIds(selectedIds.filter((x) => x !== id));
    setActivePreset(null);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const copy = [...selectedIds];
    const temp = copy[index - 1];
    copy[index - 1] = copy[index];
    copy[index] = temp;
    setSelectedIds(copy);
    setActivePreset(null);
  };

  const handleMoveDown = (index: number) => {
    if (index === selectedIds.length - 1) return;
    const copy = [...selectedIds];
    const temp = copy[index + 1];
    copy[index + 1] = copy[index];
    copy[index] = temp;
    setSelectedIds(copy);
    setActivePreset(null);
  };

  const handleApplyPreset = (preset: typeof PRESET_CIRCUITS[0]) => {
    setSelectedIds(preset.ids);
    setActivePreset(preset.id);
  };

  // Algorithm to auto-generate a sequential itinerary starting at the selected metro station
  const generateSequentialRoute = (stationId: string) => {
    const station = METRO_STATIONS_DATA.find((s) => s.id === stationId);
    if (!station) return;

    // Closest pandals around the selected station
    const sorted = [...PANDALS_DATA].sort((a, b) => {
      const distA = calculateDistanceKm(station.latitude, station.longitude, a.latitude, a.longitude);
      const distB = calculateDistanceKm(station.latitude, station.longitude, b.latitude, b.longitude);
      return distA - distB;
    });

    const candidates = sorted.slice(0, 8);
    const orderedIds: string[] = [];
    const remaining = [...candidates];

    let currentLat = station.latitude;
    let currentLng = station.longitude;

    // Step-by-step nearest neighbor routing starting from the metro station
    while (remaining.length > 0) {
      let nearestIdx = 0;
      let minDistance = Infinity;

      for (let i = 0; i < remaining.length; i++) {
        const dist = calculateDistanceKm(
          currentLat,
          currentLng,
          remaining[i].latitude,
          remaining[i].longitude
        );
        if (dist < minDistance) {
          minDistance = dist;
          nearestIdx = i;
        }
      }

      const [nearest] = remaining.splice(nearestIdx, 1);
      orderedIds.push(nearest.id);
      currentLat = nearest.latitude;
      currentLng = nearest.longitude;
    }

    setSelectedIds(orderedIds);
    setActiveStartingHub(stationId);
    setActivePreset(null);
  };

  // Memoized active starting station details
  const activeStartingStation = useMemo(() => {
    if (!activeStartingHub) return null;
    return METRO_STATIONS_DATA.find((s) => s.id === activeStartingHub) || null;
  }, [activeStartingHub]);

  // Distance and walk time from the starting station to Stop 01
  const distFromStationToFirst = useMemo(() => {
    if (!activeStartingStation || selectedPandals.length === 0) return null;
    const first = selectedPandals[0];
    const km = calculateDistanceKm(
      activeStartingStation.latitude,
      activeStartingStation.longitude,
      first.latitude,
      first.longitude
    );
    return {
      km,
      text: km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`,
      mins: Math.max(3, Math.round(km * 12)),
      autoMins: Math.max(3, Math.round(km * 3.2 + 1))
    };
  }, [activeStartingStation, selectedPandals]);

  // Direct walk directions from starting metro hub to Stop 01
  const walkFromHubToFirstUrl = useMemo(() => {
    if (!activeStartingStation || selectedPandals.length === 0) return null;
    const cleanHub = activeStartingStation.name.toLowerCase().includes('metro')
      ? activeStartingStation.name
      : `${activeStartingStation.name} Metro Station`;
    return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(`${cleanHub}, Kolkata`)}&destination=${encodeURIComponent(`${selectedPandals[0].name}, Kolkata`)}&travelmode=walking`;
  }, [activeStartingStation, selectedPandals]);

  const handleAppendPreset = (preset: typeof PRESET_CIRCUITS[0]) => {
    const newIds = preset.ids.filter((id) => !selectedIds.includes(id));
    if (newIds.length > 0) {
      setSelectedIds([...selectedIds, ...newIds]);
    }
  };

  const handleAddAllAvailableZone = () => {
    const toAdd = availableToAdd.map((p) => p.id);
    if (toAdd.length > 0) {
      setSelectedIds([...selectedIds, ...toAdd]);
    }
  };

  const handleClearAll = () => {
    setSelectedIds([]);
    setActivePreset(null);
  };

  const handleShareRoute = async () => {
    const routeText = `My Kolkata Durga Puja 2026 Itinerary (${selectedPandals.length} stops):\n` +
      selectedPandals.map((p, idx) => `${idx + 1}. ${p.name} (${p.nearest_metro})`).join('\n') +
      `\n\nPlan your route with Pandalé Kolkata!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Pujo 2026 Itinerary | Pandalé',
          text: routeText,
          url: window.location.href,
        });
      } catch (err) {
        // User dismissed
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Build full multi-stop Google Maps URL
  const fullGoogleMapsRouteUrl = useMemo(() => {
    if (selectedPandals.length === 0) return 'https://maps.google.com';
    
    if (selectedPandals.length === 1) {
      return buildGoogleMapsUrl(
        selectedPandals[0].latitude, 
        selectedPandals[0].longitude, 
        selectedPandals[0].google_place_id, 
        selectedPandals[0].name
      );
    }

    const origin = encodeURIComponent(`${selectedPandals[0].name}, Kolkata`);
    const destination = encodeURIComponent(`${selectedPandals[selectedPandals.length - 1].name}, Kolkata`);

    if (selectedPandals.length === 2) {
      return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=transit`;
    }

    const waypoints = selectedPandals
      .slice(1, selectedPandals.length - 1)
      .map((p) => encodeURIComponent(`${p.name}, Kolkata`))
      .join('|');

    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${waypoints}&travelmode=transit`;
  }, [selectedPandals]);

  // Crowd pill styling helper
  const getCrowdBadge = (level: string) => {
    switch (level) {
      case 'low':
        return 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/50';
      case 'moderate':
        return 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-900/50';
      case 'heavy':
        return 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-900/50';
      default:
        return 'bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-white/10';
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-10">
      
      {/* 1. Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200 dark:border-white/10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D8261C]/10 dark:bg-[#D8261C]/25 text-[#D8261C] dark:text-red-400 text-xs font-mono font-bold border border-[#D8261C]/20 dark:border-[#D8261C]/40">
            <Route className="w-3.5 h-3.5" />
            <span>{isBn ? 'স্মার্ট পুজো রুট প্ল্যানার' : 'Smart Pujo Route Planner 2026'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-editorial text-stone-900 dark:text-stone-50 tracking-tight">
            {isBn ? 'আমার পুজো পরিক্রমা' : 'Plan My Pujo Itinerary'}
          </h1>

          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed">
            {isBn 
              ? 'কলকাতা মেট্রো রুট, হাঁটার সময় ও মাল্টি-স্টপ গুগল ম্যাপস দিয়ে আপনার ব্যক্তিগত ঠাকুর দেখার পরিক্রমা সাজান।' 
              : 'Build your step-by-step Kolkata pandal hopping route with Metro connectivity, walking estimates, and seamless multi-stop Google Maps navigation.'
            }
          </p>
        </div>

        {/* Global Route CTAs */}
        <div className="flex items-center gap-2.5 flex-wrap shrink-0">
          {selectedPandals.length > 0 && (
            <>
              <button
                type="button"
                onClick={handleClearAll}
                title="Clear entire itinerary route"
                className="px-3.5 py-3 rounded-2xl bg-white dark:bg-[#1A1218] border border-stone-200 dark:border-white/10 hover:border-rose-300 dark:hover:border-rose-800/60 hover:bg-rose-50/60 dark:hover:bg-rose-950/20 text-stone-600 dark:text-stone-300 hover:text-rose-600 dark:hover:text-rose-400 text-xs font-bold flex items-center gap-1.5 shadow-xs hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer group btn-jiggle"
              >
                <RotateCcw className="w-4 h-4 text-stone-400 group-hover:text-rose-500 group-hover:-rotate-90 transition-transform duration-200" />
                <span>{isBn ? 'রুট মুছুন' : 'Clear Route'}</span>
              </button>

              <button
                type="button"
                onClick={handleShareRoute}
                title="Share Itinerary"
                className="p-3 sm:px-4 sm:py-3 rounded-2xl bg-white dark:bg-[#1A1218] border border-stone-200 dark:border-white/10 hover:border-[#D8261C] dark:hover:border-white/20 text-stone-700 dark:text-stone-200 text-xs font-bold flex items-center gap-1.5 shadow-xs hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer group btn-jiggle"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Forward className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />}
                <span className="hidden sm:inline">{copied ? (isBn ? 'কপি হয়েছে!' : 'Copied!') : (isBn ? 'শেয়ার' : 'Share')}</span>
              </button>

              <a
                href={fullGoogleMapsRouteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#D8261C] to-[#B91C1C] hover:from-[#B91C1C] hover:to-[#991B1B] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-[#D8261C]/30 hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-200 group btn-jiggle"
              >
                <MapPin className="w-4 h-4 text-[#FDE047] group-hover:-translate-y-0.5 transition-transform duration-200" />
                <span>{isBn ? 'গুগল ম্যাপসে সম্পূর্ণ রুট দেখুন' : 'Open Entire Route in Maps'}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </a>
            </>
          )}
        </div>
      </div>

      {/* 2. Preset Popular Pandal Routes (Smaller Cards Sliding Carousel) */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-mono uppercase tracking-wider text-amber-900 dark:text-amber-400 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{isBn ? 'জনপ্রিয় প্যান্ডেল রুটসমূহ' : 'Popular Pandal Routes'}</span>
            </span>
            <span className="text-[10px] text-stone-600 dark:text-stone-300 font-mono hidden sm:inline-block">
              {isBn ? '(স্লাইড করুন)' : '(Swipe / Slide)'}
            </span>
          </div>

          {/* Slider Navigation Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => scrollSlider('left')}
              aria-label="Slide left"
              className="w-7 h-7 rounded-full bg-white dark:bg-[#1C1816] border border-stone-200 dark:border-white/10 flex items-center justify-center text-stone-700 dark:text-stone-300 hover:text-[#D8261C] hover:border-[#D8261C] transition-all shadow-xs cursor-pointer active:scale-90"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollSlider('right')}
              aria-label="Slide right"
              className="w-7 h-7 rounded-full bg-white dark:bg-[#1C1816] border border-stone-200 dark:border-white/10 flex items-center justify-center text-stone-700 dark:text-stone-300 hover:text-[#D8261C] hover:border-[#D8261C] transition-all shadow-xs cursor-pointer active:scale-90"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Popular Pandal Route Cards: Compact Sliding Carousel */}
        <div
          ref={sliderRef}
          className="flex items-stretch gap-3 sm:gap-3.5 overflow-x-auto no-scrollbar snap-x snap-mandatory py-1 px-0.5 scroll-smooth"
        >
          {PRESET_CIRCUITS.map((preset) => {
            const isActive = activePreset === preset.id;
            return (
              <div
                key={preset.id}
                onClick={() => handleApplyPreset(preset)}
                className={`group cursor-pointer shrink-0 snap-start w-[155px] sm:w-[175px] rounded-2xl p-2.5 sm:p-3 relative overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:-translate-y-2 active:scale-[0.96] select-none ${
                  isActive
                    ? 'bg-[#181412] dark:bg-[#120D0B] text-white border-2 border-[#D8261C] ring-2 ring-[#D8261C]/30 shadow-[#D8261C]/20'
                    : 'bg-[#181412] dark:bg-[#140F0E] text-white border border-stone-800/80 hover:border-amber-400/50 hover:shadow-amber-500/10'
                }`}
              >
                {/* Active Indicator Top Accent Bar */}
                {isActive && (
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#D8261C] via-[#FDE047] to-[#D8261C] z-20" />
                )}

                {/* Card Top: Arrow ↗ / Check Button at Top Right */}
                <div className="flex items-center justify-end mb-1">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 shadow-xs ${
                      isActive
                        ? 'bg-[#D8261C] text-white'
                        : 'bg-white text-stone-900 group-hover:scale-115 group-hover:bg-[#FFFBEB]'
                    }`}
                  >
                    {isActive ? (
                      <Check className="w-3 h-3 text-white stroke-[2.5]" />
                    ) : (
                      <ArrowUpRight className="w-3 h-3 text-stone-900 group-hover:text-[#D8261C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all stroke-[2.5]" />
                    )}
                  </div>
                </div>

                {/* Centered Neighborhood & Route Title */}
                <div className="text-center -mt-2.5 mb-2 px-1">
                  <h3 className="text-sm sm:text-base font-bold font-editorial text-white tracking-tight group-hover:text-amber-200 transition-colors leading-tight truncate">
                    {isBn ? preset.bengaliTitle : preset.title}
                  </h3>
                  <p className="text-[9px] text-[#E7E5E4]/80 mt-0.5 font-medium truncate">
                    {isBn ? preset.bengaliSubtitle : preset.subtitle}
                  </p>
                </div>

                {/* The Iconic Arched Dome Photo Window */}
                <div className="relative w-full aspect-[1/1] rounded-t-[1.8rem] overflow-hidden bg-stone-900 border border-white/10 shadow-inner">
                  <Image
                    src={preset.image}
                    alt={preset.title}
                    fill
                    sizes="180px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-112"
                  />
                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/25 group-hover:via-black/5 transition-opacity" />

                  {/* Floating Center Badge: e.g. "6 Iconic Pandals" */}
                  <div className="absolute bottom-1.5 inset-x-1.5 text-center z-10">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[8.5px] font-bold font-mono shadow-xs backdrop-blur-md transition-all group-hover:scale-105 ${
                      isActive
                        ? 'bg-[#D8261C] text-white border border-[#FDE047]/60'
                        : 'bg-[#FFF8F0] text-[#7C2D12] border border-[#FED7AA]'
                    }`}>
                      {isBn ? preset.bengaliBadge : preset.badge}
                    </span>
                  </div>
                </div>

                {/* Card Footer Details */}
                <div className="pt-2 mt-2 border-t border-white/10 text-center space-y-1">
                  <div className="text-[10px] sm:text-[11px] font-bold text-white tracking-tight truncate">
                    {isBn ? preset.bengaliLandmarks : preset.landmarks}
                  </div>
                  <div className="text-[9px] text-blue-400 flex items-center justify-center gap-1 font-semibold">
                    <Train className="w-2.5 h-2.5 text-blue-400 shrink-0" />
                    <span className="truncate">{preset.metro}</span>
                  </div>

                  {/* 1-Click Load vs Add on Action Buttons */}
                  <div className="flex items-center gap-1 pt-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApplyPreset(preset);
                      }}
                      className={`flex-1 py-1 rounded-lg text-[9.5px] font-bold transition-all ${
                        isActive
                          ? 'bg-[#D8261C] text-white shadow-xs'
                          : 'bg-white/15 hover:bg-white/25 text-white'
                      }`}
                    >
                      {isActive ? (isBn ? 'সক্রিয়' : 'Active') : (isBn ? 'রুট লোড' : 'Load Plan')}
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAppendPreset(preset);
                      }}
                      title="Add stops from this circuit onto your current plan"
                      className="py-1 px-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/35 text-amber-300 text-[9.5px] font-bold border border-amber-500/30 flex items-center gap-0.5 transition-all"
                    >
                      <Plus className="w-2.5 h-2.5" />
                      <span>{isBn ? 'যোগ' : 'Add on'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Destination Metro Hub Selector & Sequential Proximity Route Generator */}
      <div className="bg-white dark:bg-[#1A1218] rounded-2xl sm:rounded-3xl border border-stone-200/90 dark:border-white/10 p-4 sm:p-5 shadow-luxe relative overflow-hidden transition-all">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/5 dark:bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Row with Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#D8261C] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                🚇
              </span>
              <h3 className="font-editorial text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
                {isBn ? 'গন্তব্য ও মেট্রো স্টেশন নির্বাচন করুন' : 'Select Destination & Starting Metro'}
              </h3>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 max-w-xl">
              {isBn 
                ? 'আপনার যাত্রা শুরুর মেট্রো স্টেশন বেছে নিন। সিস্টেম স্বয়ংক্রিয়ভাবে স্টেশন থেকে সবচেয়ে কাছের প্যান্ডেল আগে রেখে ক্রমানুসারে নিখুঁত রুট তৈরি করবে।'
                : 'Choose your destination hub to auto-generate a sequential itinerary ordered by walking proximity from that station.'}
            </p>
          </div>
        </div>

        {/* 3 Metro Line Tabs: Blue Line, Green Line, Orange Line */}
        <div className="flex items-center gap-2 p-1 bg-stone-100 dark:bg-white/[0.05] rounded-xl overflow-x-auto no-scrollbar mb-3.5 relative z-10">
          {[
            { id: 'blue' as const, name: 'Blue Line', bengaliName: 'ব্লু লাইন', color: '#2563EB', activeClass: 'bg-blue-600 text-white' },
            { id: 'green' as const, name: 'Green Line', bengaliName: 'গ্রিন লাইন', color: '#059669', activeClass: 'bg-emerald-600 text-white' },
            { id: 'orange' as const, name: 'Orange Line', bengaliName: 'অরেঞ্জ লাইন', color: '#EA580C', activeClass: 'bg-orange-600 text-white' }
          ].map((line) => {
            const isSelected = selectedMetroLine === line.id;
            return (
              <button
                key={line.id}
                type="button"
                onClick={() => {
                  setSelectedMetroLine(line.id);
                  const firstStation = METRO_STATIONS_DATA.find((s) => s.line_code === line.id);
                  if (firstStation) {
                    generateSequentialRoute(firstStation.id);
                  }
                }}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? `${line.activeClass} shadow-xs`
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/10'
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: line.color }} />
                <span>{isBn ? line.bengaliName : line.name}</span>
              </button>
            );
          })}
        </div>

        {/* Metro Station Selector Chips — ONLY station names */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 relative z-10">
          {METRO_STATIONS_DATA.filter((s) => s.line_code === selectedMetroLine).map((station) => {
            const isSelected = activeStartingHub === station.id;
            return (
              <button
                key={station.id}
                type="button"
                onClick={() => generateSequentialRoute(station.id)}
                className={`px-3 py-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-1.5 group ${
                  isSelected
                    ? 'bg-red-50/80 dark:bg-red-950/40 border-[#D8261C] dark:border-red-500/60 shadow-xs ring-1 ring-[#D8261C]/30'
                    : 'bg-stone-50/60 dark:bg-white/[0.02] border-stone-200/80 dark:border-white/5 hover:border-stone-300 dark:hover:border-white/20 hover:bg-stone-100/70 dark:hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white shrink-0 ${
                    selectedMetroLine === 'blue' ? 'bg-blue-600' : selectedMetroLine === 'green' ? 'bg-emerald-600' : 'bg-orange-600'
                  }`}>
                    M
                  </span>
                  <span className={`text-xs font-bold truncate ${
                    isSelected ? 'text-[#D8261C] dark:text-red-400' : 'text-stone-900 dark:text-stone-100'
                  }`}>
                    {isBn ? station.bengali_name : station.name}
                  </span>
                </div>
                {isSelected && (
                  <span className="w-4 h-4 rounded-full bg-[#D8261C] text-white flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Live Route sequencing feedback strip */}
        {activeStartingStation && (
          <div className="mt-3 pt-3 border-t border-stone-100 dark:border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-stone-700 dark:text-stone-300 flex-wrap">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="font-medium">
                {isBn ? 'যাত্রা শুরু:' : 'Starting Point:'}{' '}
                <strong className="text-stone-900 dark:text-white font-bold">
                  {isBn ? activeStartingStation.bengali_name : activeStartingStation.name} {isBn ? 'মেট্রো' : 'Metro'}
                </strong>
              </span>
              {distFromStationToFirst && selectedPandals.length > 0 && (
                <span className="text-stone-500 dark:text-stone-400">
                  → {isBn ? 'প্রথম স্টপ' : 'Stop 01'} ({selectedPandals[0].name}) {isBn ? 'মাত্র' : 'is only'}{' '}
                  <strong className="text-[#D8261C] dark:text-red-400 font-bold">{distFromStationToFirst.text}</strong> ({distFromStationToFirst.mins} mins walk)
                  {distFromStationToFirst.km >= 0.8 && (
                    <span className="ml-1 text-amber-700 dark:text-amber-400 font-bold">
                      · 🛺 ~{distFromStationToFirst.autoMins} mins by Auto
                    </span>
                  )}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={() => generateSequentialRoute(activeStartingHub)}
              className="text-[11px] font-bold text-[#D8261C] hover:text-[#B91C1C] flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{isBn ? 'পুনরায় রুট সাজান' : 'Re-sequence Proximity'}</span>
            </button>
          </div>
        )}
      </div>

      {/* 4. Step-by-Step Route Chain (Redesigned Iconic Station Cards & Connectors) */}
      {selectedPandals.length > 0 ? (
        <div className="space-y-4">
          {/* Itinerary Header & Route Actions */}
          <div className="flex items-center justify-between pt-2 pb-1 px-1">
            <div className="flex items-center gap-2.5">
              <h2 className="text-lg sm:text-2xl font-bold font-editorial text-stone-900 dark:text-stone-100">
                {isBn ? 'আপনার পরিক্রমা পথ' : 'Your Itinerary Path'}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#FEF2F2] dark:bg-[#2A1215] text-[#D8261C] border border-[#D8261C]/20 shadow-2xs">
                {selectedPandals.length} {isBn ? 'প্যান্ডেল' : 'Stops'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="px-3.5 py-1.5 rounded-full bg-white dark:bg-[#1A1218] border border-stone-200 dark:border-white/10 hover:border-[#D8261C] text-stone-800 dark:text-stone-200 text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer active:scale-95"
              >
                <Plus className="w-3.5 h-3.5 text-[#D8261C]" />
                <span className="hidden sm:inline">{isBn ? 'প্যান্ডেল যোগ করুন' : 'Add Stop'}</span>
                <span className="sm:hidden">{isBn ? 'যোগ' : 'Add'}</span>
              </button>

              <button
                type="button"
                onClick={handleClearAll}
                className="px-3.5 py-1.5 rounded-full bg-rose-50/80 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-950/70 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-400 text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer active:scale-95"
                title="Clear entire itinerary route"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{isBn ? 'রুট মুছুন' : 'Clear Route'}</span>
              </button>
            </div>
          </div>
          {selectedPandals.map((pandal, index) => {
            const isFirst = index === 0;
            const isLast = index === selectedPandals.length - 1;
            const nextPandal = selectedPandals[index + 1];

            let distanceToNext = 0;
            if (nextPandal) {
              distanceToNext = calculateDistanceKm(
                pandal.latitude,
                pandal.longitude,
                nextPandal.latitude,
                nextPandal.longitude
              );
            }

            const exactMapsUrl = buildGoogleMapsUrl(
              pandal.latitude,
              pandal.longitude,
              pandal.google_place_id,
              pandal.locality ? `${pandal.name}, ${pandal.locality}` : pandal.name
            );

            // Extract clean metro station name and line
            const metroDetail = pandal.metro_details?.[0];
            let metroStationName = '';
            let metroLine = 'Blue Line (North-South)';
            let metroLineCode: 'blue' | 'green' | 'orange' | 'purple' | 'yellow' = 'blue';

            if (metroDetail) {
              metroStationName = metroDetail.station_name.toLowerCase().includes('metro')
                ? metroDetail.station_name
                : `${metroDetail.station_name} ${isBn ? 'মেট্রো স্টেশন' : 'Metro Station'}`;
              metroLine = metroDetail.line;
              metroLineCode = (metroDetail.line_code as typeof metroLineCode) || 'blue';
            } else {
              const rawMetro = pandal.nearest_metro || '';
              const cleanKey = rawMetro.replace(/\s*metro(?:\s*station)?/i, '').trim().toLowerCase();
              const matchedStation = METRO_STATIONS_DATA.find(s =>
                s.id.toLowerCase() === cleanKey ||
                s.name.toLowerCase() === cleanKey ||
                s.name.toLowerCase().includes(cleanKey) ||
                cleanKey.includes(s.name.toLowerCase())
              );

              if (matchedStation) {
                metroStationName = isBn && matchedStation.bengali_name
                  ? `${matchedStation.bengali_name} মেট্রো স্টেশন`
                  : `${matchedStation.name} Metro Station`;
                metroLine = matchedStation.line;
                metroLineCode = matchedStation.line_code;
              } else {
                metroStationName = rawMetro.toLowerCase().includes('metro')
                  ? rawMetro
                  : `${rawMetro} ${isBn ? 'মেট্রো স্টেশন' : 'Metro Station'}`;
                metroLine = 'Blue Line (North-South)';
                metroLineCode = 'blue';
              }
            }

            const getLineStyle = (code: string) => {
              switch (code) {
                case 'green':
                  return {
                    badgeBg: 'bg-emerald-600',
                    lineTag: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/40'
                  };
                case 'orange':
                  return {
                    badgeBg: 'bg-amber-600',
                    lineTag: 'bg-amber-50 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300 border-amber-200 dark:border-amber-800/40'
                  };
                case 'purple':
                  return {
                    badgeBg: 'bg-purple-600',
                    lineTag: 'bg-purple-50 text-purple-800 dark:bg-purple-950/50 dark:text-purple-300 border-purple-200 dark:border-purple-800/40'
                  };
                case 'blue':
                default:
                  return {
                    badgeBg: 'bg-blue-600',
                    lineTag: 'bg-blue-50 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300 border-blue-200 dark:border-blue-800/40'
                  };
              }
            };
            const metroStyle = getLineStyle(metroLineCode);

            return (
              <React.Fragment key={pandal.id}>
                {/* Starting Station Hub Banner (Rendered right above Stop 01) */}
                {isFirst && activeStartingStation && (
                  <div className="space-y-3 pt-1">
                    <div className="relative bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 dark:from-[#1E1420] dark:via-[#2A1822] dark:to-[#1E1420] text-white rounded-2xl p-3.5 sm:p-4 shadow-md border border-indigo-500/30 overflow-hidden">
                      <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
                        <div className="flex items-center gap-3">
                          <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-lg text-white shadow-inner shrink-0 ${
                            activeStartingStation.line_code === 'green' ? 'bg-emerald-600 border border-emerald-400/40' : activeStartingStation.line_code === 'purple' ? 'bg-purple-600 border border-purple-400/40' : 'bg-blue-600 border border-blue-400/40'
                          }`}>
                            M
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase bg-white/10 text-white border border-white/20">
                                {activeStartingStation.line}
                              </span>
                              <span className="text-[10px] font-bold text-amber-300 flex items-center gap-1">
                                <MapPin className="w-2.5 h-2.5" />
                                <span>{isBn ? 'পরিক্রমা শুরুর স্টেশন' : 'Official Starting Metro Hub'}</span>
                              </span>
                            </div>
                            <h3 className="text-base sm:text-lg font-bold font-editorial text-white tracking-tight mt-0.5">
                              {isBn ? activeStartingStation.bengali_name : activeStartingStation.name} {isBn ? 'মেট্রো স্টেশন' : 'Metro Station'}
                            </h3>
                            {distFromStationToFirst && (
                              <p className="text-xs text-stone-200 mt-0.5 flex items-center gap-1.5 flex-wrap">
                                <span>{isBn ? 'স্টপ ০১ থেকে দূরত্ব:' : 'Distance to Stop 01:'}</span>
                                <strong className="text-amber-300 bg-white/15 px-1.5 py-0.5 rounded font-mono text-[11px]">
                                  {distFromStationToFirst.text}
                                </strong>
                                <span>(~{distFromStationToFirst.mins} mins walk)</span>
                                {distFromStationToFirst.km >= 0.8 && (
                                  <span className="inline-flex items-center gap-1 bg-amber-400/25 border border-amber-300/40 text-amber-200 px-2 py-0.5 rounded-full text-[10.5px] font-bold">
                                    <span>🛺 ~{distFromStationToFirst.autoMins} mins by Auto / Toto</span>
                                  </span>
                                )}
                              </p>
                            )}
                          </div>
                        </div>

                        {walkFromHubToFirstUrl && (
                          <a
                            href={walkFromHubToFirstUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-2 rounded-xl bg-white text-stone-900 hover:bg-stone-100 text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all shrink-0 cursor-pointer"
                          >
                            <Footprints className="w-3.5 h-3.5 text-[#D8261C]" />
                            <span>{isBn ? 'স্টেশন থেকে হাঁটার পথ' : 'Walk Directions to Stop 01'}</span>
                            <ExternalLink className="w-3 h-3 text-stone-400" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Downward Connector Track from Metro Hub to Stop 01 */}
                    <div className="flex flex-col items-center justify-center py-0.5 relative">
                      <div className="w-0.5 h-5 bg-gradient-to-b from-blue-600 via-indigo-500 to-[#D8261C]" />
                      <div className="my-1 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 flex items-center gap-2 text-[10.5px] text-blue-900 dark:text-blue-300 font-bold shadow-2xs flex-wrap justify-center">
                        <div className="flex items-center gap-1">
                          <Footprints className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                          <span>
                            {isBn ? 'হাঁটার পথ:' : 'Walk:'} {distFromStationToFirst?.text} (~{distFromStationToFirst?.mins} mins)
                          </span>
                        </div>
                        {distFromStationToFirst && distFromStationToFirst.km >= 0.8 && (
                          <>
                            <span className="text-stone-300 dark:text-stone-600">•</span>
                            <span className="inline-flex items-center gap-1 text-amber-800 dark:text-amber-300 font-bold">
                              <span>🛺 {isBn ? 'অটো / টোটো:' : 'Auto / Toto:'} ~{distFromStationToFirst.autoMins} mins</span>
                            </span>
                          </>
                        )}
                        <ArrowDown className="w-3 h-3 text-blue-600 dark:text-blue-400 animate-bounce" />
                      </div>
                      <div className="w-0.5 h-5 bg-gradient-to-b from-[#D8261C] to-[#D8261C]" />
                    </div>
                  </div>
                )}

                {/* User-Friendly Pandal Stop Card (Clean stop badge, no images, only station name & line) */}
                <div className="group relative bg-white dark:bg-[#1A1215] rounded-2xl border border-stone-200 dark:border-white/10 p-3 sm:p-3.5 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-3 sm:gap-3.5">

                    {/* Prominent Stop Sequence Indicator */}
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#D8261C] to-red-700 text-white font-mono font-bold text-sm sm:text-base flex items-center justify-center shrink-0 shadow-xs border border-white/20">
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Title row */}
                      <div className="flex items-start justify-between gap-1.5">
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <Link
                              href={`/pandal/${pandal.slug}`}
                              className="font-editorial text-sm sm:text-base font-bold text-[#7A1515] dark:text-rose-300 tracking-tight leading-tight hover:text-[#991B1B] dark:hover:text-rose-200 transition-colors line-clamp-1"
                            >
                              {pandal.name}
                            </Link>
                            {(pandal.is_must_visit || pandal.tags?.includes('Must Visit')) && (
                              <span className="px-1.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 text-[9px] font-bold border border-amber-200/60 dark:border-amber-900/40 shrink-0" title="Must Visit">
                                👑
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate mt-0.5">
                            {pandal.locality || pandal.area} {pandal.theme ? `· ${pandal.theme}` : ''}
                          </p>
                        </div>

                        {/* Badges / Links */}
                        <div className="flex items-center gap-1 shrink-0">
                          {isFirst && activeStartingStation && distFromStationToFirst && (
                            <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-[9px] font-bold border border-emerald-200 dark:border-emerald-800/40 items-center gap-1">
                              🎯 {isBn ? 'স্টেশনের নিকটতম' : 'Nearest Stop'}
                            </span>
                          )}
                          <Link
                            href={`/pandal/${pandal.slug}`}
                            className="w-6 h-6 rounded-full bg-stone-100 dark:bg-white/10 flex items-center justify-center hover:bg-[#D8261C] hover:text-white transition-all text-stone-500 dark:text-stone-300"
                            aria-label="View pandal details"
                          >
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>

                      {/* Metro Info: Only mentions metro station name and which line */}
                      <div className="flex items-center gap-2 mt-2 pt-2 border-t border-stone-100 dark:border-white/5 flex-wrap">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <div className={`w-4.5 h-4.5 rounded-md ${metroStyle.badgeBg} text-white font-bold flex items-center justify-center text-[9px] shrink-0 shadow-2xs`}>
                            M
                          </div>
                          <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 truncate">
                            {metroStationName}
                          </span>
                        </div>
                        <span className="text-stone-300 dark:text-stone-600 text-xs hidden sm:inline">•</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${metroStyle.lineTag} shrink-0`}>
                          {metroLine}
                        </span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col items-center gap-1.5 shrink-0 pl-1 border-l border-stone-100 dark:border-white/5">
                      <div className="flex flex-col items-center bg-stone-100 dark:bg-white/[0.06] rounded-xl border border-stone-200 dark:border-white/10">
                        <button
                          type="button"
                          onClick={() => handleMoveUp(index)}
                          disabled={isFirst}
                          className="p-1 rounded-t-xl text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200 dark:hover:bg-white/10 disabled:opacity-25 hover:scale-110 active:scale-85 transition-all duration-150 cursor-pointer disabled:cursor-not-allowed"
                          title="Move earlier in route"
                          aria-label="Move up"
                        >
                          <ArrowUp className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveDown(index)}
                          disabled={isLast}
                          className="p-1 rounded-b-xl text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200 dark:hover:bg-white/10 disabled:opacity-25 hover:scale-110 active:scale-85 transition-all duration-150 cursor-pointer disabled:cursor-not-allowed"
                          title="Move later in route"
                          aria-label="Move down"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="flex items-center gap-1">
                        <a
                          href={exactMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-6 h-6 rounded-lg border border-stone-200 dark:border-white/10 bg-white dark:bg-[#1A1215] hover:border-[#D8261C] hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:scale-115 active:scale-85 flex items-center justify-center transition-all duration-150 shadow-2xs cursor-pointer group/pin"
                          title="Open in Google Maps"
                          aria-label="View in Maps"
                        >
                          <MapPin className="w-3 h-3 text-[#D8261C] group-hover/pin:-translate-y-0.5 transition-transform duration-150" />
                        </a>
                        <button
                          type="button"
                          onClick={() => handleRemovePandal(pandal.id)}
                          className="w-6 h-6 rounded-lg border border-stone-200 dark:border-white/10 bg-white dark:bg-[#1A1215] hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:border-rose-300 hover:text-rose-600 text-stone-400 hover:scale-115 active:scale-85 flex items-center justify-center transition-all duration-150 shadow-2xs cursor-pointer"
                          title="Remove from itinerary"
                          aria-label="Remove stop"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Redesigned Transit Hop Connector */}
                {!isLast && nextPandal && (
                  <div className="flex flex-col items-center justify-center my-3 relative py-1">
                    {/* Upper Track */}
                    <div className="w-0.5 h-7 bg-gradient-to-b from-[#D8261C] via-amber-400 to-[#D8261C]" />
                    
                    {/* Transit Connection Pill */}
                    <div className="my-1.5 px-4 py-2 rounded-full bg-white dark:bg-[#1A1218] border border-stone-200/90 dark:border-white/15 flex items-center gap-2.5 sm:gap-3 text-xs text-stone-800 dark:text-stone-200 shadow-md hover:shadow-lg transition-shadow flex-wrap justify-center">
                      <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-[10px] shadow-xs">
                        M
                      </div>

                      <div className="flex items-center gap-1.5 font-medium">
                        <span className="text-stone-500 dark:text-stone-400 font-mono text-[11px] uppercase tracking-wider">
                          {isBn ? 'দূরত্ব:' : 'Transit Leg:'}
                        </span>
                        <span className="font-bold text-[#D8261C] dark:text-red-400 font-mono">
                          {distanceToNext < 1 ? `${Math.round(distanceToNext * 1000)} m` : `${distanceToNext.toFixed(1)} km`}
                        </span>
                      </div>

                      <span className="text-stone-300 dark:text-stone-600">•</span>

                      <div className="flex items-center gap-1 text-stone-600 dark:text-stone-300 font-semibold text-[11px]">
                        <Footprints className="w-3.5 h-3.5 text-amber-500" />
                        <span>~{Math.max(4, Math.round(distanceToNext * 12))} mins on foot</span>
                      </div>

                      {/* Auto / Toto Travel Duration for distances >= 0.8 km */}
                      {distanceToNext >= 0.8 && (
                        <>
                          <span className="text-stone-300 dark:text-stone-600">•</span>
                          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 text-[11px] font-bold border border-amber-200/60 dark:border-amber-900/40">
                            <span>🛺 ~{Math.max(3, Math.round(distanceToNext * 3.2 + 1))} mins by Auto / Toto</span>
                          </div>
                        </>
                      )}

                      <a
                        href={`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(`${pandal.name}, Kolkata`)}&destination=${encodeURIComponent(`${nextPandal.name}, Kolkata`)}&travelmode=walking`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-1 p-1 rounded-full text-stone-400 hover:text-[#D8261C] transition-colors"
                        title="Open walking directions between these two stops"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    {/* Lower Track */}
                    <div className="w-0.5 h-7 bg-gradient-to-b from-[#D8261C] via-amber-400 to-[#D8261C]" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 bg-white dark:bg-[#1A1218] rounded-[2.5rem] border border-stone-200 dark:border-white/10 max-w-lg mx-auto space-y-4 my-8 shadow-luxe">
          <div className="w-16 h-16 rounded-3xl bg-[#D8261C]/10 dark:bg-[#D8261C]/25 text-[#D8261C] flex items-center justify-center mx-auto border border-[#D8261C]/30 shadow-inner">
            <Route className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold font-editorial text-stone-900 dark:text-white">
            {isBn ? 'আপনার পরিক্রমা তালিকা ফাঁকা' : 'Your Itinerary is Empty'}
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
            {isBn 
              ? 'উপরের যেকোনো জনপ্রিয় প্যান্ডেল রুট বেছে নিন অথবা নিজের পছন্দের প্যান্ডেল যোগ করে শুরু করুন।'
              : 'Pick one of our popular pandal routes above or add iconic pandals manually to build your route.'}
          </p>
          <div className="pt-2 flex items-center justify-center gap-3 flex-wrap">
            <button
              type="button"
              onClick={() => handleApplyPreset(PRESET_CIRCUITS[0])}
              className="px-5 py-2.5 rounded-xl bg-[#D8261C] text-white text-xs font-bold hover:bg-[#B91C1C] transition-all shadow-md active:scale-95 cursor-pointer"
            >
              {isBn ? 'উত্তর কলকাতা প্যান্ডেল রুট যোগ করুন' : 'Load North Heritage Pandal Route'}
            </button>
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="px-5 py-2.5 rounded-xl border border-stone-200 dark:border-white/10 bg-white dark:bg-[#1A1218] text-stone-800 dark:text-stone-200 text-xs font-bold hover:border-[#D8261C] transition-all cursor-pointer"
            >
              {isBn ? 'প্যান্ডেল খুঁজুন' : 'Search Pandals'}
            </button>
          </div>
        </div>
      )}

      {/* 5. Add Stop Button Bar */}
      <div className="pt-2 flex items-center justify-center">
        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="px-8 py-4 rounded-2xl bg-white dark:bg-[#1A1218] border-2 border-dashed border-[#D8261C]/60 hover:border-[#D8261C] text-stone-900 dark:text-stone-100 hover:text-[#D8261C] dark:hover:text-white text-xs sm:text-sm font-bold flex items-center gap-2.5 shadow-sm transition-all hover:scale-102 cursor-pointer btn-jiggle"
        >
          <Plus className="w-5 h-5 text-[#D8261C]" />
          <span>{isBn ? 'পরিক্রমায় আরও প্যান্ডেল যোগ করুন' : 'Add Another Pandal to Itinerary'}</span>
        </button>
      </div>

      {/* 6. Searchable Add Pandal Modal / Drawer */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-2xl bg-white dark:bg-[#1A1218] rounded-[2.5rem] border border-stone-200 dark:border-white/10 shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-stone-200 dark:border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#D8261C] dark:text-amber-400 font-bold block">
                  {isBn ? 'প্যান্ডেল নির্বাচন' : 'Route Customizer'}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-editorial text-stone-900 dark:text-white">
                  {isBn ? 'নতুন প্যান্ডেল যোগ করুন' : 'Add Pandal to Route'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-2.5 rounded-full text-stone-400 hover:text-stone-800 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-white/10 hover:scale-110 hover:rotate-90 active:scale-90 transition-all duration-200 cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Search & Filters */}
            <div className="p-5 border-b border-stone-200 dark:border-white/10 space-y-3 bg-stone-50/60 dark:bg-white/[0.02]">
              <div className="relative group">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 group-focus-within:text-[#D8261C] transition-colors" />
                <input
                  type="text"
                  value={addSearchQuery}
                  onChange={(e) => setAddSearchQuery(e.target.value)}
                  placeholder={isBn ? 'প্যান্ডেল বা মেট্রো স্টেশন খুঁজুন...' : 'Search by pandal name, metro, locality...'}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#12090F] border border-stone-200 dark:border-white/10 text-xs sm:text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#D8261C]/30 focus:border-[#D8261C] focus:shadow-md transition-all duration-200"
                />
              </div>

              {/* Zone Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                {(['All', 'North Kolkata', 'South Kolkata', 'Central Kolkata', 'East Kolkata'] as const).map((zone) => {
                  const isSelected = selectedAddZone === zone;
                  return (
                    <button
                      key={zone}
                      type="button"
                      onClick={() => setSelectedAddZone(zone)}
                      className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all duration-150 cursor-pointer hover:scale-105 active:scale-95 ${
                        isSelected
                          ? 'bg-[#D8261C] text-white shadow-xs'
                          : 'bg-white dark:bg-[#12090F] border border-stone-200 dark:border-white/10 text-stone-700 dark:text-stone-300 hover:border-[#D8261C]'
                      }`}
                    >
                      {zone === 'All' ? (isBn ? 'সব এলাকা' : 'All Zones') : zone}
                    </button>
                  );
                })}
              </div>

              {/* Special Zone Context & 1-Click Add All Action */}
              <div className="flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200/70 dark:border-amber-900/40 text-xs">
                <div className="flex items-center gap-2 text-stone-700 dark:text-stone-300 min-w-0">
                  <Train className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="truncate text-[11px] font-medium">
                    {selectedAddZone === 'North Kolkata' 
                      ? (isBn ? 'উত্তর কলকাতা: শ্যামবাজার ও শোভাবাজার মেট্রো স্টেশন থেকে হাঁটার দূরত্ব নিচে দেখানো হল।' : 'North Kolkata: Walking distance from Shyambazar & Shovabazar Metro to each pandal.')
                      : (isBn ? `${selectedAddZone === 'All' ? 'কলকাতা' : selectedAddZone}: মেট্রো স্টেশন থেকে হাঁটার দূরত্ব প্রদর্শিত হচ্ছে।` : `Showing station walking distances for ${selectedAddZone === 'All' ? 'all' : selectedAddZone} pandals.`)}
                  </span>
                </div>
                {availableToAdd.length > 0 && (
                  <button
                    type="button"
                    onClick={handleAddAllAvailableZone}
                    className="px-2.5 py-1 rounded-lg bg-[#D8261C] hover:bg-[#B91C1C] text-white font-bold text-[10.5px] whitespace-nowrap shadow-xs hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer"
                  >
                    + {isBn ? `সবগুলি যোগ (${availableToAdd.length})` : `Add All (${availableToAdd.length})`}
                  </button>
                )}
              </div>
            </div>

            {/* Modal Pandals List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {availableToAdd.length > 0 ? (
                availableToAdd.map((p) => {
                  const cleanPandalDist = p.walking_distance.includes('km')
                    ? p.walking_distance
                    : (p.walking_distance.endsWith('m') ? p.walking_distance : `${p.walking_distance}m`);

                  return (
                    <div
                      key={p.id}
                      className="p-3.5 rounded-2xl bg-stone-50 dark:bg-white/[0.03] border border-stone-200/80 dark:border-white/5 hover:border-[#D8261C]/50 dark:hover:border-amber-400/30 hover:shadow-md hover:-translate-y-0.5 flex items-center justify-between gap-3 transition-all duration-200 group"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-stone-200 dark:border-white/10 bg-stone-100 dark:bg-stone-900 shadow-xs">
                          <Image
                            src={p.featured_image}
                            alt={p.name}
                            fill
                            sizes="56px"
                            className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs sm:text-sm font-bold font-editorial text-stone-900 dark:text-white truncate group-hover:text-[#D8261C] transition-colors">
                            {p.name}
                          </h4>
                          {/* Distance from nearest station badges */}
                          <div className="flex items-center gap-1.5 flex-wrap mt-1 text-[10px]">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-semibold border border-blue-200/50 dark:border-blue-900/40">
                              <Train className="w-2.5 h-2.5 text-blue-600 shrink-0" />
                              <span className="truncate max-w-[130px] sm:max-w-none">{p.nearest_metro}</span>
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-bold border border-stone-200 dark:border-white/10">
                              <MapPin className="w-2.5 h-2.5 text-[#D8261C]" />
                              <span>{cleanPandalDist} from station</span>
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-red-50 dark:bg-red-950/40 text-[#D8261C] dark:text-red-300 font-bold border border-red-200/50 dark:border-red-900/40">
                              <Clock className="w-2.5 h-2.5" />
                              <span>{p.walking_time_mins} min walk</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleAddPandal(p.id)}
                        className="px-3.5 py-1.5 rounded-xl bg-[#D8261C] hover:bg-[#B91C1C] text-white text-xs font-bold flex items-center gap-1 shadow-xs hover:shadow-md hover:scale-105 active:scale-90 transition-all duration-150 shrink-0 cursor-pointer group/add"
                      >
                        <Plus className="w-3.5 h-3.5 group-hover/add:rotate-90 transition-transform duration-200" />
                        <span>{isBn ? 'যোগ করুন' : 'Add'}</span>
                      </button>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-10 text-stone-500 dark:text-stone-400 text-xs">
                  {isBn ? 'কোনো প্যান্ডেল পাওয়া যায়নি।' : 'No matching unselected pandals found.'}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-stone-200 dark:border-white/10 flex items-center justify-between text-xs bg-stone-50/50 dark:bg-white/[0.02]">
              <span className="text-stone-500 dark:text-stone-400 font-medium">
                {selectedPandals.length} stops currently in itinerary
              </span>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-bold hover:scale-105 active:scale-95 transition-all duration-150 cursor-pointer shadow-xs hover:shadow-md"
              >
                {isBn ? 'সম্পন্ন' : 'Done'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
