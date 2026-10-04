'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { METRO_STATIONS_DATA } from '@/data/metro';
import { PANDALS_DATA } from '@/data/pandals';
import { calculateDistanceKm } from '@/lib/geo';
import { 
  Train, 
  MapPin, 
  Footprints, 
  Search, 
  ChevronRight, 
  ChevronLeft,
  ChevronDown,
  LayoutGrid, 
  X, 
  ExternalLink,
  Sparkles,
  ArrowRight,
  Clock,
  Check,
  ArrowUpRight,
  Map as MapIcon
} from 'lucide-react';
import { buildGoogleMapsUrl } from '@/lib/geo';
import { useLanguage } from '@/context/LanguageContext';
import PandalCard from '@/components/PandalCard';

export default function MetroGuidePage() {
  const { language } = useLanguage();
  const [selectedLine, setSelectedLine] = useState<'all' | 'blue' | 'green' | 'orange' | 'purple' | 'yellow'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedStationId, setExpandedStationId] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownSearch, setDropdownSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  // Track which line groups are expanded in the dropdown (all collapsed by default)
  const [expandedLineGroups, setExpandedLineGroups] = useState<Set<string>>(new Set());
  const [showNoMetro, setShowNoMetro] = useState(false);
  // Non-Metro Sub-area tab and pagination state (styled like planner station selector)
  const [activeNoMetroZone, setActiveNoMetroZone] = useState<string>('all');
  const [noMetroPage, setNoMetroPage] = useState<number>(1);
  // "From Station" — the station selected in the dropdown as the starting point
  const [fromStationId, setFromStationId] = useState<string | null>(null);
  const fromStation = useMemo(
    () => METRO_STATIONS_DATA.find((s) => s.id === fromStationId) ?? null,
    [fromStationId]
  );
  // Track which stations have their pandals list expanded beyond 6 cards
  const [expandedStationPandals, setExpandedStationPandals] = useState<Set<string>>(new Set());

  const toggleShowAllStationPandals = (stationId: string) => {
    setExpandedStationPandals((prev) => {
      const next = new Set(prev);
      if (next.has(stationId)) next.delete(stationId);
      else next.add(stationId);
      return next;
    });
  };
  const toggleLineGroup = (lineCode: string) => {
    setExpandedLineGroups((prev) => {
      const next = new Set(prev);
      if (next.has(lineCode)) next.delete(lineCode);
      else next.add(lineCode);
      return next;
    });
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Metro Line Cards
  const METRO_LINE_CARDS = [
    {
      id: 'blue' as const,
      name: 'Blue Line',
      bengaliName: 'ব্লু লাইন',
      route: 'Dakshineswar ↔ Kavi Subhash',
      corridor: 'North-South Arterial',
      hex: '#2563EB',
      pandalCount: 12,
      stationsCount: 26,
      image: '/brand/metro-blue-line.jpg',
      badgeClass: 'bg-blue-600 text-white shadow-xs',
      borderDefault: 'border-blue-500/30 hover:border-blue-500 dark:border-blue-500/20',
      activeBorder: 'border-blue-500',
      activeRing: 'ring-4 ring-blue-500/30 shadow-xl shadow-blue-500/20',
      bgGradient: 'from-blue-600/15 via-blue-500/5 to-transparent dark:from-blue-900/30 dark:via-blue-950/20 dark:to-transparent',
      accentBg: 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60'
    },
    {
      id: 'green' as const,
      name: 'Green Line',
      bengaliName: 'গ্রিন লাইন',
      route: 'Howrah Maidan ↔ Sector V',
      corridor: 'East-West Corridor',
      hex: '#059669',
      pandalCount: 7,
      stationsCount: 12,
      image: '/brand/metro-green-line.jpg',
      badgeClass: 'bg-emerald-600 text-white shadow-xs',
      borderDefault: 'border-emerald-500/30 hover:border-emerald-500 dark:border-emerald-500/20',
      activeBorder: 'border-emerald-500',
      activeRing: 'ring-4 ring-emerald-500/30 shadow-xl shadow-emerald-500/20',
      bgGradient: 'from-emerald-600/15 via-emerald-500/5 to-transparent dark:from-emerald-900/30 dark:via-emerald-950/20 dark:to-transparent',
      accentBg: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60'
    },
    {
      id: 'orange' as const,
      name: 'Orange Line',
      bengaliName: 'অরেঞ্জ লাইন',
      route: 'Kavi Subhash ↔ Beleghata (Hemanta Mukhopadhyay)',
      corridor: 'EM Bypass Corridor',
      hex: '#EA580C',
      pandalCount: 3,
      stationsCount: 9,
      image: '/brand/metro-orange-line.jpg',
      badgeClass: 'bg-orange-600 text-white shadow-xs',
      borderDefault: 'border-orange-500/30 hover:border-orange-500 dark:border-orange-500/20',
      activeBorder: 'border-orange-500',
      activeRing: 'ring-4 ring-orange-500/30 shadow-xl shadow-orange-500/20',
      bgGradient: 'from-orange-600/15 via-orange-500/5 to-transparent dark:from-orange-900/30 dark:via-orange-950/20 dark:to-transparent',
      accentBg: 'bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800/60'
    },
    {
      id: 'purple' as const,
      name: 'Purple Line',
      bengaliName: 'পার্পল লাইন',
      route: 'Joka ↔ Majherhat',
      corridor: 'Diamond Harbour Road',
      hex: '#9333EA',
      pandalCount: 7,
      stationsCount: 7,
      image: '/brand/metro-purple-line.jpg',
      badgeClass: 'bg-purple-600 text-white shadow-xs',
      borderDefault: 'border-purple-500/30 hover:border-purple-500 dark:border-purple-500/20',
      activeBorder: 'border-purple-500',
      activeRing: 'ring-4 ring-purple-500/30 shadow-xl shadow-purple-500/20',
      bgGradient: 'from-purple-600/15 via-purple-500/5 to-transparent dark:from-purple-900/30 dark:via-purple-950/20 dark:to-transparent',
      accentBg: 'bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800/60'
    },
    {
      id: 'yellow' as const,
      name: 'Yellow Line',
      bengaliName: 'ইয়েলো লাইন',
      route: 'Noapara ↔ Jaihind Metro',
      corridor: 'Airport Corridor',
      hex: '#EAB308',
      pandalCount: 4,
      stationsCount: 4,
      image: '/brand/kolkata-metro-header-bg.jpg',
      badgeClass: 'bg-yellow-500 text-stone-950 shadow-xs',
      borderDefault: 'border-yellow-500/30 hover:border-yellow-500 dark:border-yellow-500/20',
      activeBorder: 'border-yellow-500',
      activeRing: 'ring-4 ring-yellow-500/30 shadow-xl shadow-yellow-500/20',
      bgGradient: 'from-yellow-500/15 via-yellow-500/5 to-transparent dark:from-yellow-900/30 dark:via-yellow-950/20 dark:to-transparent',
      accentBg: 'bg-yellow-50 dark:bg-yellow-950/60 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800/60'
    }
  ];

  // Filter stations by line and search query
  const filteredStations = useMemo(() => {
    let list = METRO_STATIONS_DATA.filter((s) => s.nearby_pandals.length > 0);
    if (selectedLine !== 'all') {
      list = list.filter((s) => s.line_code === selectedLine);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((s) => 
        s.name.toLowerCase().includes(q) ||
        (s.bengali_name && s.bengali_name.includes(q)) ||
        s.nearby_pandals.some((p) => p.pandal_name.toLowerCase().includes(q))
      );
    }
    return list;
  }, [selectedLine, searchQuery]);

  // Lookup currently active expanded station
  const activeStation = useMemo(() => {
    return METRO_STATIONS_DATA.find((s) => s.id === expandedStationId);
  }, [expandedStationId]);

  // Stations for the Jump Dropdown (filterable via inline input)
  const dropdownStations = useMemo(() => {
    if (!dropdownSearch.trim()) return METRO_STATIONS_DATA;
    const q = dropdownSearch.toLowerCase().trim();
    return METRO_STATIONS_DATA.filter((s) =>
      s.name.toLowerCase().includes(q) ||
      (s.bengali_name && s.bengali_name.includes(q)) ||
      s.line.toLowerCase().includes(q)
    );
  }, [dropdownSearch]);

  // Stations grouped by line for the sub-dropdown (all 5 lines)
  const LINE_GROUP_META: { code: 'blue'|'green'|'orange'|'purple'|'yellow'; label: string; bengaliLabel: string; hex: string }[] = [
    { code: 'blue',   label: 'Blue Line',   bengaliLabel: 'ব্লু লাইন',    hex: '#2563EB' },
    { code: 'green',  label: 'Green Line',  bengaliLabel: 'গ্রিন লাইন',   hex: '#059669' },
    { code: 'orange', label: 'Orange Line', bengaliLabel: 'অরেঞ্জ লাইন',  hex: '#EA580C' },
    { code: 'purple', label: 'Purple Line', bengaliLabel: 'পার্পল লাইন',  hex: '#9333EA' },
    { code: 'yellow', label: 'Yellow Line', bengaliLabel: 'ইয়েলো লাইন',  hex: '#CA8A04' },
  ];
  const groupedDropdownStations = useMemo(() => {
    return LINE_GROUP_META.map((meta) => ({
      ...meta,
      stations: METRO_STATIONS_DATA.filter((s) => s.line_code === meta.code),
    })).filter((g) => g.stations.length > 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Set of pandals linked to any metro station in METRO_STATIONS_DATA
  const metroLinkedPandalIds = useMemo(() => {
    const ids = new Set<string>();
    METRO_STATIONS_DATA.forEach((station) => {
      station.nearby_pandals.forEach((p) => {
        if (p.pandal_id) ids.add(p.pandal_id.toLowerCase());
        if (p.pandal_slug) ids.add(p.pandal_slug.toLowerCase());
      });
    });
    return ids;
  }, []);

  // Pandals not directly served by Kolkata Metro stations
  const otherPandals = useMemo(() => {
    return PANDALS_DATA.filter((p) => {
      const isLinked = metroLinkedPandalIds.has(p.id.toLowerCase()) || metroLinkedPandalIds.has(p.slug.toLowerCase());
      return !isLinked;
    });
  }, [metroLinkedPandalIds]);

  const [noMetroSearch, setNoMetroSearch] = useState('');
  // Active Area Hub selection (defaults to Lake Town & VIP Road matching screenshot)
  const [activeAreaHubId, setActiveAreaHubId] = useState<string>('area-lake-town');

  // Prominent Non-Metro Area Hubs (exact match to planner selector)
  const NON_METRO_AREA_HUBS = [
    {
      id: 'area-lake-town',
      name: 'Lake Town & VIP Road',
      bengaliName: 'লেক টাউন ও ভিআইপি রোড',
      landmarks: 'Sree Bhumi, Dum Dum Park',
      bengaliLandmarks: 'শ্রীভূমি, দমদম পার্ক',
      matchKeywords: ['lake town', 'vip road', 'sree bhumi', 'dum dum park', 'patipukur', 'bangur']
    },
    {
      id: 'area-behala-chowrasta',
      name: 'Behala & DH Road',
      bengaliName: 'বেহালা ও ডিএইচ রোড',
      landmarks: 'Behala Club, 41 Pally, Nutan Dal',
      bengaliLandmarks: 'বেহালা ক্লাব, ৪১ পল্লী, নূতন দল',
      matchKeywords: ['behala', 'dh road', 'diamond harbour', 'barisha', 'nutan dal', '41 pally']
    },
    {
      id: 'area-sodepur-agarpara',
      name: 'Sodepur & Agarpara',
      bengaliName: 'সোদপুর ও আগরপাড়া',
      landmarks: 'Tarapukur, Adarshanagar, Sahid Colony',
      bengaliLandmarks: 'তারাপুকুর, আদর্শ নগর, শহীদ কলোনি',
      matchKeywords: ['sodepur', 'agarpara', 'panihati', 'tarapukur', 'adarshanagar', 'sukchar']
    },
    {
      id: 'area-kasba-bosepukur',
      name: 'Kasba & Bosepukur',
      bengaliName: 'কসবা ও বোসপুকুর',
      landmarks: 'Bosepukur Sitala Mandir, Parijat',
      bengaliLandmarks: 'বোসপুকুর শীতলা মন্দির, পারিজাত',
      matchKeywords: ['kasba', 'bosepukur', 'parijat', 'sitala']
    },
    {
      id: 'area-santoshpur-jadavpur',
      name: 'Santoshpur & Jadavpur',
      bengaliName: 'সন্তোষপুর ও যাদবপুর',
      landmarks: 'Lake Pally, Sammilita, Trikon Park',
      bengaliLandmarks: 'লেক পল্লী, সম্মিলিত, ত্রিকোণ পার্ক',
      matchKeywords: ['santoshpur', 'jadavpur', 'lake pally', 'sammilita', 'trikon']
    },
    {
      id: 'area-salt-lake-outer',
      name: 'Salt Lake Outer & New Town',
      bengaliName: 'সল্টলেক ও নিউ টাউন',
      landmarks: 'FD Block, BJ Block, New Town',
      bengaliLandmarks: 'এফডি ব্লক, বিজে ব্লক, নিউ টাউন',
      matchKeywords: ['salt lake', 'new town', 'fd block', 'bj block', 'action area', 'ultadanga']
    },
    {
      id: 'area-khidirpur-watgunge',
      name: 'Khidirpur & Watgunge',
      bengaliName: 'খিদিরপুর ও ওয়াটগঞ্জ',
      landmarks: '25 Pally, 74 Pally, Babu Bazar',
      bengaliLandmarks: '২৫ পল্লী, ৭৪ পল্লী, বাবু বাজার',
      matchKeywords: ['khidirpur', 'kidderpore', 'watgunge', 'babu bazar', '25 pally', '74 pally']
    },
    {
      id: 'area-gariahat-ballygunge',
      name: 'Gariahat & Ballygunge',
      bengaliName: 'গড়িয়াহাট ও বালিগঞ্জ',
      landmarks: 'Ekdalia Evergreen, Singhi Park',
      bengaliLandmarks: 'একডালিয়া এভারগ্রিন, সিংহী পার্ক',
      matchKeywords: ['gariahat', 'ballygunge', 'ekdalia', 'singhi park', 'maddox']
    },
    {
      id: 'area-howrah-salkia',
      name: 'Howrah, Salkia & Shibpur',
      bengaliName: 'হাওড়া, সালকিয়া ও শিবপুর',
      landmarks: 'Belur, Salkia, Shibpur',
      bengaliLandmarks: 'বেলুড়, সালকিয়া, শিবপুর',
      matchKeywords: ['howrah', 'salkia', 'shibpur', 'belur', 'bally', 'mandirtala', 'kadamtala', 'tikiapara']
    }
  ];

  // Filter pandals belonging to the active Area Hub (or search query)
  const activeHubPandals = useMemo(() => {
    const hub = NON_METRO_AREA_HUBS.find((h) => h.id === activeAreaHubId);
    let list = otherPandals;

    if (noMetroSearch.trim()) {
      const q = noMetroSearch.toLowerCase().trim();
      return list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.area.toLowerCase().includes(q) ||
          (p.locality && p.locality.toLowerCase().includes(q)) ||
          (p.nearest_metro && p.nearest_metro.toLowerCase().includes(q))
      );
    }

    if (!hub) return list;

    // Filter by matching keywords against pandal locality, area, tags, or name
    const matched = list.filter((p) => {
      const targetStr = `${p.name} ${p.locality} ${p.area} ${p.tags.join(' ')}`.toLowerCase();
      return hub.matchKeywords.some((kw) => targetStr.includes(kw));
    });

    // If a hub matches specific pandals, return them; otherwise fallback to area
    if (matched.length > 0) return matched;
    return list.slice(0, 8);
  }, [otherPandals, activeAreaHubId, noMetroSearch]);

  // Handle station selection from dropdown — sets "from" station + expands + scrolls
  const handleSelectDropdownStation = (st: (typeof METRO_STATIONS_DATA)[0]) => {
    if (selectedLine !== 'all' && selectedLine !== st.line_code) {
      setSelectedLine('all');
    }
    setFromStationId(st.id);
    setExpandedStationId(st.id);
    setIsDropdownOpen(false);
    setDropdownSearch('');
    setTimeout(() => {
      const el = document.getElementById(`station-${st.id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);
  };

  // Helper for line color badges
  const getLineStyles = (lineCode: string) => {
    switch (lineCode) {
      case 'blue':
        return {
          bg: 'bg-[#1D63ED]',
          border: 'border-blue-500/40',
          lightBg: 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300'
        };
      case 'green':
        return {
          bg: 'bg-[#059669]',
          border: 'border-emerald-500/40',
          lightBg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'
        };
      case 'orange':
        return {
          bg: 'bg-[#EA580C]',
          border: 'border-orange-500/40',
          lightBg: 'bg-orange-50 text-orange-700 dark:bg-orange-950/50 dark:text-orange-300'
        };
      case 'purple':
        return {
          bg: 'bg-[#9333EA]',
          border: 'border-purple-500/40',
          lightBg: 'bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300'
        };
      default:
        return {
          bg: 'bg-stone-600',
          border: 'border-stone-400',
          lightBg: 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300'
        };
    }
  };

  // Reusable Line Card Renderer (supports compact mode for 3-column rows)
  const renderLineCard = (line: (typeof METRO_LINE_CARDS)[0], isCompact = false) => {
    const isSelected = selectedLine === line.id;
    return (
      <button
        key={line.id}
        type="button"
        onClick={() => setSelectedLine(isSelected ? 'all' : line.id)}
        className={`group w-full flex flex-col justify-between text-left transition-all duration-300 relative overflow-hidden cursor-pointer select-none active:scale-[0.98] ${
          isCompact
            ? 'rounded-2xl sm:rounded-[1.75rem] p-2 sm:p-3'
            : 'rounded-[1.75rem] p-2.5 sm:p-3.5'
        } ${
          isSelected
            ? `${line.activeBorder} ${line.activeRing} bg-gradient-to-b ${line.bgGradient} bg-white dark:bg-[#1D1119] shadow-xl`
            : `bg-white dark:bg-[#1A1217] hover:bg-white dark:hover:bg-[#20151C] border ${line.borderDefault} shadow-md hover:shadow-xl hover:-translate-y-1`
        }`}
      >
        {/* Background decorative gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${line.bgGradient} opacity-20 dark:opacity-40 pointer-events-none`} />

        {/* 1. Metro Train Image Window */}
        <div className={`relative w-full aspect-[16/11] sm:aspect-[16/10] overflow-hidden shadow-inner group-hover:shadow-md transition-all shrink-0 mb-1.5 sm:mb-2 ${
          isCompact ? 'rounded-xl sm:rounded-2xl' : 'rounded-2xl'
        }`}>
          <Image
            src={line.image}
            alt={line.name}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          />
          {/* Subtle Cinematic Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/35 pointer-events-none" />

          {/* Top-Left Floating Line Badge */}
          <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 z-10 flex items-center gap-1">
            <span
              className={`rounded-full font-mono font-bold text-white shadow-xs backdrop-blur-md flex items-center gap-1 border border-white/20 ${
                isCompact ? 'px-1.5 py-0.5 text-[8px] sm:text-[9.5px]' : 'px-2 py-0.5 text-[9px] sm:text-[9.5px]'
              }`}
              style={{ backgroundColor: line.hex }}
            >
              <Train className="w-2.5 h-2.5 shrink-0" />
              <span className="truncate">{line.name}</span>
            </span>
          </div>

          {/* Top-Right Select Status Button */}
          <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 z-10">
            <div
              className={`rounded-full flex items-center justify-center transition-all ${
                isCompact ? 'w-5 h-5' : 'w-5.5 h-5.5'
              } ${
                isSelected
                  ? 'bg-[#D8261C] text-white shadow-xs ring-1 ring-white/50'
                  : 'bg-black/60 text-white/90 backdrop-blur-md group-hover:bg-white group-hover:text-stone-900'
              }`}
            >
              {isSelected ? (
                <Check className="w-3 h-3 stroke-[2.5]" />
              ) : (
                <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
              )}
            </div>
          </div>

          {/* Bottom Floating Stats (Stations & Pandals) */}
          <div className="absolute bottom-1.5 inset-x-1.5 z-10 flex items-center justify-between gap-1">
            <span className={`rounded-md font-mono font-semibold bg-black/75 backdrop-blur-md text-white border border-white/15 truncate ${
              isCompact ? 'px-1 py-0.5 text-[7.5px] sm:text-[8.5px]' : 'px-1.5 py-0.5 text-[8.5px]'
            }`}>
              {line.stationsCount} {language === 'bn' ? 'স্টেশন' : 'Stns'}
            </span>
            <span className={`rounded-md font-mono font-bold bg-[#D8261C] text-white shadow-xs truncate ${
              isCompact ? 'px-1 py-0.5 text-[7.5px] sm:text-[8.5px]' : 'px-1.5 py-0.5 text-[8.5px]'
            }`}>
              {line.pandalCount} {language === 'bn' ? 'পুজো' : 'Pandals'}
            </span>
          </div>
        </div>

        {/* 2. Content Area */}
        <div className="relative z-10 px-0.5 space-y-0.5">
          <div className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full shrink-0 animate-pulse"
              style={{ backgroundColor: line.hex }}
            />
            <h3 className={`font-bold text-stone-900 dark:text-white leading-tight tracking-tight truncate ${
              isCompact ? 'text-xs sm:text-base' : 'text-sm sm:text-base'
            }`}>
              {language === 'bn' ? line.bengaliName : line.name}
            </h3>
          </div>
          <p className="text-[10px] sm:text-[11px] text-stone-600 dark:text-stone-300 font-semibold line-clamp-1">
            {line.route}
          </p>
        </div>
      </button>
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 w-full space-y-6 sm:space-y-8">
      
      {/* 1. HERO / TITLE SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-2 pb-2">
        <div className="max-w-xl space-y-4">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-editorial text-[#181513] dark:text-[#FAF8F5] leading-[1.12] tracking-tight">
            Explore <span className="inline-block text-[#D8261C] text-2xl sm:text-4xl align-top">🍂</span>
            <br />
            Kolkata Pujo
            <br />
            by Metro <span className="inline-block text-[#D8261C] font-normal text-2xl sm:text-4xl italic">〰</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#57534E] dark:text-[#A8A29E] leading-relaxed font-medium">
            Skip city traffic completely. Select any station on the Blue Line, Green Line, or Purple Line to reveal iconic pandals, walking distance, and direct routes.
          </p>

          {/* Red Color Explore Map 5 Lines Button */}
          <div className="pt-1">
            <Link
              href="/map"
              className="w-full sm:w-auto py-3 px-5 rounded-2xl bg-gradient-to-r from-[#D8261C] to-[#B91C1C] hover:from-[#B91C1C] hover:to-[#991B1B] text-white font-bold text-sm inline-flex items-center justify-center gap-2.5 shadow-lg shadow-red-600/25 hover:shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/20"
            >
              <MapIcon className="w-4 h-4 text-[#FDE047]" />
              <span>Explore Metro Map • 5 Lines</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* 2. FOUR SQUARE LINE CARDS (BLUE, GREEN, ORANGE, PURPLE) */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#D8261C] dark:text-amber-400 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              {showNoMetro
                ? (language === 'bn' ? 'মেট্রো বহির্ভূত পুজো পরিক্রমা' : 'Non-Metro Pandals')
                : (language === 'bn' ? 'মেট্রো লাইন করিডোর' : 'Metro Line Corridors')}
            </span>
          </div>

          {/* Metro / No Metro Toggle Button (styled like English / Bengali toggle) */}
          <div className="flex items-center p-1 rounded-full bg-white dark:bg-[#1C1917] border border-stone-200 dark:border-white/20 shadow-md">
            <button
              type="button"
              onClick={() => setShowNoMetro(false)}
              aria-label="Show pandals accessible by Kolkata Metro"
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-150 cursor-pointer hover:scale-105 active:scale-90 ${
                !showNoMetro
                  ? 'bg-[#D8261C] text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              {language === 'bn' ? 'মেট্রো' : 'Metro'}
            </button>
            <button
              type="button"
              onClick={() => setShowNoMetro(true)}
              aria-label="Show pandals not directly connected by metro"
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-150 cursor-pointer hover:scale-105 active:scale-90 ${
                showNoMetro
                  ? 'bg-[#D8261C] text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              {language === 'bn' ? 'মেট্রো ছাড়া' : 'No Metro'}
            </button>
          </div>

          {!showNoMetro && selectedLine !== 'all' && (
            <button
              type="button"
              onClick={() => setSelectedLine('all')}
              className="text-xs font-bold text-[#D8261C] dark:text-amber-400 hover:underline flex items-center gap-1 bg-white/80 dark:bg-stone-800 px-3 py-1 rounded-full border border-stone-200 dark:border-white/10 shadow-2xs transition-all"
            >
              <span>{language === 'bn' ? 'সব লাইন দেখুন' : 'Show All Lines'}</span>
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Metro Lines: shown only in Metro view */}
        {!showNoMetro && (
          <div className="space-y-3 sm:space-y-4">
            {/* Row 1: Primary Arterial Corridors (Blue Line & Green Line) in 2 columns */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {METRO_LINE_CARDS.slice(0, 2).map((line) => renderLineCard(line, false))}
            </div>

            {/* Row 2: Secondary Corridors (Orange Line, Purple Line, Yellow Line) all in one line (3 columns) */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {METRO_LINE_CARDS.slice(2, 5).map((line) => renderLineCard(line, true))}
            </div>
          </div>
        )}
      </div>

      {/* NO METRO PANDALS SECTION (Directly 2 Small Cards per line) */}
      {showNoMetro && (
        <div className="space-y-6">
          {/* Main Card Container with Dark Rounded Aesthetic matching the screenshot */}
          <div className="bg-[#181513] text-white rounded-[2rem] border border-stone-800/80 p-4 sm:p-6 shadow-2xl space-y-3">
            
            {/* Exactly 2 Small Cards in One Line (Strict 2 columns on all devices) */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {NON_METRO_AREA_HUBS.map((hub) => {
                const isSelected = activeAreaHubId === hub.id;
                return (
                  <button
                    key={hub.id}
                    type="button"
                    onClick={() => setActiveAreaHubId(hub.id)}
                    className={`p-2.5 sm:p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between gap-1.5 sm:gap-3 ${
                      isSelected
                        ? 'bg-red-950/40 border-red-500 shadow-md ring-1 ring-red-500/50'
                        : 'bg-stone-900/70 border-stone-800/90 hover:border-stone-700 hover:bg-stone-800/80'
                    }`}
                  >
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      {/* Red/Pinkish pin icon container matching screenshot */}
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-xl bg-pink-950/60 text-pink-400 flex items-center justify-center text-[10px] sm:text-xs shrink-0 border border-pink-900/40 shadow-2xs">
                        📍
                      </div>
                      <div className="min-w-0">
                        <div className={`text-[11px] sm:text-sm font-bold truncate ${
                          isSelected ? 'text-red-400 font-extrabold' : 'text-stone-100'
                        }`}>
                          {language === 'bn' ? hub.bengaliName : hub.name}
                        </div>
                        <div className="text-[9px] sm:text-[11px] text-stone-400 truncate mt-0.5">
                          {language === 'bn' ? hub.bengaliLandmarks : hub.landmarks}
                        </div>
                      </div>
                    </div>

                    {/* Circular Red Checkmark when selected */}
                    {isSelected && (
                      <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#D8261C] text-white flex items-center justify-center shrink-0 shadow-xs">
                        <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

          </div>

          {/* Connected Pandals for the Selected Area Hub */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-[#1C1917] rounded-2xl p-4 sm:p-5 border border-stone-200 dark:border-white/10 shadow-sm">
              <div>
                <h3 className="text-base sm:text-lg font-bold font-editorial text-stone-900 dark:text-white flex items-center gap-2">
                  <span>📍</span>
                  <span>
                    {language === 'bn'
                      ? `${NON_METRO_AREA_HUBS.find(h => h.id === activeAreaHubId)?.bengaliName} পুজো তালিকা`
                      : `Pandals in ${NON_METRO_AREA_HUBS.find(h => h.id === activeAreaHubId)?.name}`}
                  </span>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-red-50 dark:bg-red-950/60 text-[#D8261C] dark:text-red-300 border border-red-200 dark:border-red-900/40">
                    {activeHubPandals.length}
                  </span>
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                  {language === 'bn'
                    ? 'মেট্রো ছাড়া বাস, অটো, রিকশা বা গাড়ি দিয়ে সহজেই পৌঁছানো যায়।'
                    : 'Accessible easily via local suburban trains, buses, autos, or cabs.'}
                </p>
              </div>

              {/* Search input for filtering within this hub */}
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder={language === 'bn' ? 'পুজো খুঁজুন...' : 'Filter pandals...'}
                  value={noMetroSearch}
                  onChange={(e) => setNoMetroSearch(e.target.value)}
                  className="w-full pl-8 pr-7 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-white/10 text-xs text-stone-900 dark:text-white placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-[#D8261C]"
                />
                {noMetroSearch && (
                  <button
                    type="button"
                    onClick={() => setNoMetroSearch('')}
                    aria-label="Clear search"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Pandal Cards Grid — exactly 2 cards in 1 line */}
            {activeHubPandals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                {activeHubPandals.map((pandal) => (
                  <PandalCard key={pandal.id} pandal={pandal} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white dark:bg-[#1C1917] rounded-3xl border border-stone-200 dark:border-white/10">
                <p className="text-sm font-medium text-stone-500 dark:text-stone-400">
                  {language === 'bn' ? 'এই এলাকায় কোনো পুজো পাওয়া যায়নি' : 'No pandals found in this area'}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. STATIONS CARD CONTAINER — shown only in Metro view */}
      {!showNoMetro && <div className="bg-white dark:bg-[#1C1917] rounded-[2.2rem] border border-stone-200 dark:border-white/10 shadow-2xl p-4 sm:p-7 space-y-4">
        
        {/* Card Header: Stations Count & Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200/80 dark:border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-50 dark:bg-red-950/40 text-[#D8261C] flex items-center justify-center shrink-0 border border-red-200/60 dark:border-red-900/40 shadow-2xs">
              <Train className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-stone-900 dark:text-white leading-tight tracking-tight">
                {language === 'bn' ? 'মেট্রো স্টেশন' : 'Stations'} ({filteredStations.length})
              </h2>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5 font-medium">
                {language === 'bn' ? 'কাছের প্যান্ডেল দেখতে যেকোনো স্টেশন বেছে নিন' : 'Select a station to explore nearby pandals'}
              </p>
            </div>
          </div>

          {/* Action Controls: Quick Jump Station Dropdown + Search bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
            {/* Quick Station Jump Dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`w-full sm:w-auto h-9 px-3.5 rounded-full border text-xs font-semibold flex items-center justify-between sm:justify-start gap-2 transition-all cursor-pointer select-none active:scale-95 ${
                  isDropdownOpen
                    ? 'bg-[#D8261C] text-white border-transparent shadow-md'
                    : 'bg-stone-50 dark:bg-stone-800/80 hover:bg-stone-100 dark:hover:bg-stone-700/80 border-stone-200 dark:border-white/10 text-stone-800 dark:text-stone-200'
                }`}
                title="Jump directly to any station"
              >
                <div className="flex items-center gap-1.5 truncate max-w-[190px] sm:max-w-[160px]">
                  <MapPin className={`w-3.5 h-3.5 shrink-0 ${isDropdownOpen ? 'text-white' : 'text-[#D8261C]'}`} />
                  <span className="truncate">
                    {fromStation
                      ? `${language === 'bn' ? 'থেকে:' : 'From:'} ${language === 'bn' && fromStation.bengali_name ? fromStation.bengali_name : fromStation.name}`
                      : (language === 'bn' ? 'শুরু স্টেশন বেছে নিন' : 'Select Starting Station')}
                  </span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu Modal / Popover */}
              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-full sm:w-80 max-h-80 overflow-hidden flex flex-col rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                  {/* Dropdown Quick Filter Input */}
                  <div className="p-2 border-b border-stone-100 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-950/40">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        value={dropdownSearch}
                        onChange={(e) => setDropdownSearch(e.target.value)}
                        placeholder={language === 'bn' ? 'স্টেশনের নাম খুঁজুন...' : 'Type station name...'}
                        className="w-full pl-8 pr-7 py-1.5 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#D8261C]"
                        autoFocus
                      />
                      {dropdownSearch && (
                        <button
                          type="button"
                          onClick={() => setDropdownSearch('')}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Stations Scrollable List — grouped by line or flat when searching */}
                  <div className="overflow-y-auto max-h-72">
                    {dropdownSearch.trim() ? (
                      /* ── FLAT SEARCH RESULTS ── */
                      dropdownStations.length === 0 ? (
                        <div className="p-4 text-center text-xs text-stone-500">
                          {language === 'bn' ? 'কোনো স্টেশন পাওয়া যায়নি' : 'No stations found'}
                        </div>
                      ) : (
                        <div className="divide-y divide-stone-100 dark:divide-stone-800/60">
                          {dropdownStations.map((st) => {
                            const isCurrent = expandedStationId === st.id;
                            const lineBadge = getLineStyles(st.line_code);
                            return (
                              <button
                                key={st.id}
                                type="button"
                                onClick={() => handleSelectDropdownStation(st)}
                                className={`w-full px-3 py-2 text-left flex items-center justify-between text-xs transition-colors cursor-pointer group ${
                                  isCurrent
                                    ? 'bg-red-50 dark:bg-red-950/40 text-[#D8261C] dark:text-red-300 font-bold'
                                    : 'hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200'
                                }`}
                              >
                                <div className="flex items-center gap-2 truncate">
                                  <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${lineBadge.bg}`} />
                                  <div className="truncate">
                                    <p className="leading-tight truncate font-semibold">
                                      {language === 'bn' && st.bengali_name ? st.bengali_name : st.name}
                                    </p>
                                    <p className="text-[10px] text-stone-500 dark:text-stone-400 font-normal truncate">{st.line}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
                                    {st.nearby_pandals.length} {language === 'bn' ? 'পুজো' : 'pujas'}
                                  </span>
                                  {isCurrent && <Check className="w-3.5 h-3.5 text-[#D8261C] shrink-0" />}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )
                    ) : (
                      /* ── GROUPED BY LINE (Blue & Green) + Other Pandals ── */
                      <div>
                        {groupedDropdownStations.map((group) => {
                          const isGroupOpen = expandedLineGroups.has(group.code);
                          return (
                            <div key={group.code}>
                              {/* Line Group Header */}
                              <button
                                type="button"
                                onClick={() => toggleLineGroup(group.code)}
                                className="w-full flex items-center justify-between px-3 py-2 sticky top-0 z-10 bg-stone-50 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-700/70 cursor-pointer hover:bg-stone-100 dark:hover:bg-stone-800/70 transition-colors group"
                              >
                                <div className="flex items-center gap-2">
                                  <span
                                    className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
                                    style={{ backgroundColor: group.hex }}
                                  />
                                  <span className="text-[11px] font-bold text-stone-700 dark:text-stone-200">
                                    {language === 'bn' ? group.bengaliLabel : group.label}
                                  </span>
                                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-stone-400">
                                    {group.stations.length}
                                  </span>
                                </div>
                                <ChevronDown
                                  className={`w-3 h-3 text-stone-400 transition-transform duration-200 ${
                                    isGroupOpen ? 'rotate-180' : ''
                                  }`}
                                />
                              </button>

                              {/* Stations under this line */}
                              {isGroupOpen && (
                                <div className="divide-y divide-stone-100 dark:divide-stone-800/40">
                                  {group.stations.map((st) => {
                                    const isCurrent = expandedStationId === st.id;
                                    return (
                                      <button
                                        key={st.id}
                                        type="button"
                                        onClick={() => handleSelectDropdownStation(st)}
                                        className={`w-full pl-7 pr-3 py-2 text-left flex items-center justify-between text-xs transition-colors cursor-pointer group ${
                                          isCurrent
                                            ? 'bg-red-50 dark:bg-red-950/40 text-[#D8261C] dark:text-red-300 font-bold'
                                            : 'hover:bg-stone-50 dark:hover:bg-stone-800/60 text-stone-800 dark:text-stone-200'
                                        }`}
                                      >
                                        <div className="flex items-center gap-2 truncate">
                                          <span
                                            className="w-1.5 h-1.5 rounded-full shrink-0 opacity-60"
                                            style={{ backgroundColor: group.hex }}
                                          />
                                          <span className="truncate font-medium leading-tight">
                                            {language === 'bn' && st.bengali_name ? st.bengali_name : st.name}
                                          </span>
                                        </div>
                                        <div className="flex items-center gap-1.5 shrink-0 ml-2">
                                          {st.nearby_pandals.length > 0 && (
                                            <span className="text-[9.5px] font-mono px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400">
                                              {st.nearby_pandals.length} {language === 'bn' ? 'পুজো' : 'pujas'}
                                            </span>
                                          )}
                                          {isCurrent && <Check className="w-3 h-3 text-[#D8261C] shrink-0" />}
                                        </div>
                                      </button>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        })}

                        {/* ── OTHER PANDALS (not near Blue/Green) ── */}
                        {otherPandals.length > 0 && (
                          <div>
                            <button
                              type="button"
                              onClick={() => toggleLineGroup('other')}
                              className="w-full flex items-center justify-between px-3 py-2 sticky top-0 z-10 bg-stone-50 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-700/70 cursor-pointer hover:bg-stone-100 dark:hover:bg-stone-800/70 transition-colors"
                            >
                              <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full shrink-0 bg-stone-400 dark:bg-stone-500" />
                                <span className="text-[11px] font-bold text-stone-700 dark:text-stone-200">
                                  {language === 'bn' ? 'অন্যান্য পুজো' : 'Other Pandals'}
                                </span>
                                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-stone-400">
                                  {otherPandals.length}
                                </span>
                              </div>
                              <ChevronDown
                                className={`w-3 h-3 text-stone-400 transition-transform duration-200 ${
                                  expandedLineGroups.has('other') ? 'rotate-180' : ''
                                }`}
                              />
                            </button>

                            {expandedLineGroups.has('other') && (
                              <div className="divide-y divide-stone-100 dark:divide-stone-800/40">
                                {otherPandals.map((pandal) => (
                                  <Link
                                    key={pandal.id}
                                    href={`/pandals/${pandal.slug}`}
                                    onClick={() => setIsDropdownOpen(false)}
                                    className="w-full pl-7 pr-3 py-2 flex items-center justify-between text-xs hover:bg-stone-50 dark:hover:bg-stone-800/60 text-stone-800 dark:text-stone-200 transition-colors group"
                                  >
                                    <div className="flex items-center gap-2 truncate">
                                      <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-stone-400 opacity-60" />
                                      <span className="truncate font-medium leading-tight">{pandal.name}</span>
                                    </div>
                                    <div className="flex items-center gap-1 shrink-0 ml-2">
                                      <span className="text-[9px] text-stone-400 dark:text-stone-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {language === 'bn' ? 'দেখুন' : 'View'} →
                                      </span>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Search bar inside pill */}
            <div className="relative w-full sm:w-56">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  const val = e.target.value;
                  setSearchQuery(val);
                  if (val.trim().length >= 3) {
                    const match = METRO_STATIONS_DATA.find((s) =>
                      s.name.toLowerCase().includes(val.trim().toLowerCase())
                    );
                    if (match) {
                      setExpandedStationId(match.id);
                    }
                  }
                }}
                placeholder={language === 'bn' ? 'স্টেশন খুঁজুন...' : 'Search station...'}
                className="w-full pl-9 pr-8 py-2 rounded-full bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-white/10 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#D8261C]/30 focus:border-[#D8261C] transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 dark:hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Stations Rows List */}
        <div className="divide-y divide-stone-100 dark:divide-white/5">
          {filteredStations.length === 0 ? (
            <div className="text-center py-12 text-stone-500 text-xs">
              No stations found matching &quot;{searchQuery}&quot;. Try another station or line.
            </div>
          ) : (
            filteredStations.map((station) => {
              const isExpanded = expandedStationId === station.id;
              const lineStyle = getLineStyles(station.line_code);
              const isSearchedMatch =
                searchQuery.trim().length >= 2 &&
                station.name.toLowerCase().includes(searchQuery.trim().toLowerCase());
              
              // Calculate nearest walking time, distance, and estimated steps
              const nearestPandal = station.nearby_pandals[0];
              const minWalkTime = nearestPandal ? nearestPandal.walking_time_mins : 5;
              const walkDistance = nearestPandal ? nearestPandal.walking_distance.split('(')[0].trim() : '450m';
              const approxSteps = Math.round(minWalkTime * 125);

              // ── FROM-STATION INTER-STATION DISTANCE ──
              const isFromStation = fromStation?.id === station.id;
              let stopsAway: number | null = null;
              let metroDistKm: number | null = null;
              let sameLine = false;
              if (fromStation && !isFromStation) {
                // Straight-line distance between the two stations
                metroDistKm = calculateDistanceKm(
                  fromStation.latitude, fromStation.longitude,
                  station.latitude, station.longitude
                );
                if (fromStation.line_code === station.line_code) {
                  // Count stop difference on the same line
                  const sameLineStations = METRO_STATIONS_DATA.filter(
                    (s) => s.line_code === station.line_code
                  );
                  const fromIdx = sameLineStations.findIndex((s) => s.id === fromStation.id);
                  const toIdx   = sameLineStations.findIndex((s) => s.id === station.id);
                  if (fromIdx !== -1 && toIdx !== -1) {
                    stopsAway = Math.abs(toIdx - fromIdx);
                    sameLine = true;
                  }
                }
              }

              return (
                <div
                  key={station.id}
                  id={`station-${station.id}`}
                  className={`py-3 sm:py-3.5 transition-colors scroll-mt-24 ${
                    isSearchedMatch ? 'bg-red-50/40 dark:bg-red-950/20 rounded-2xl px-2' : ''
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setExpandedStationId(isExpanded ? null : station.id)}
                    className="w-full text-left flex items-center justify-between gap-3 group select-none py-1"
                  >
                    {/* Left: Circle "M" + Name + Bengali + Pandal Count + You Are Here badge */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-white text-xs sm:text-sm shadow-xs shrink-0 ${lineStyle.bg}`}
                      >
                        M
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm sm:text-base font-bold text-stone-900 dark:text-white group-hover:text-[#D8261C] transition-colors truncate">
                            {language === 'bn' && station.bengali_name ? station.bengali_name : station.name}
                          </h3>
                          {isSearchedMatch && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-xs flex items-center gap-1 border border-amber-300 animate-pulse shrink-0">
                              <span>📍</span>
                              <span>YOU ARE HERE</span>
                            </span>
                          )}
                          <span className="bg-red-50 dark:bg-red-950/50 text-[#D8261C] dark:text-red-300 font-bold text-[10px] px-2.5 py-0.5 rounded-full border border-red-200/60 dark:border-red-900/40 shrink-0">
                            {station.nearby_pandals.length} {language === 'bn' ? 'টি পুজো' : (station.nearby_pandals.length === 1 ? 'Pandal' : 'Pandals')}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Metro-distance (if from-station set) OR walk-time fallback + Chevron */}
                    <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
                      {isFromStation ? (
                        /* This IS the origin station */
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black bg-gradient-to-r from-[#D8261C] to-amber-500 text-white shadow-sm border border-amber-300/60 shrink-0 animate-pulse">
                          <MapPin className="w-3 h-3" />
                          <span>{language === 'bn' ? 'শুরু এখান থেকে' : 'FROM HERE'}</span>
                        </span>
                      ) : fromStation && metroDistKm !== null ? (
                        /* Show inter-station metro distance */
                        <div className="text-right flex items-center gap-1.5 text-xs font-bold">
                          {sameLine && stopsAway !== null && metroDistKm !== null ? (
                            <>
                              <Train className="w-3.5 h-3.5 text-[#D8261C] shrink-0" />
                              <span className="text-stone-900 dark:text-stone-100">
                                {metroDistKm < 1
                                  ? `${Math.round(metroDistKm * 1000)}m`
                                  : `${metroDistKm.toFixed(1)} km`}
                              </span>
                              <span className="text-stone-300 dark:text-stone-600">•</span>
                              <span className="text-stone-600 dark:text-stone-400 font-semibold">
                                ~{Math.round(stopsAway * 2.5)} min
                              </span>
                            </>
                          ) : (
                            <>
                              <Train className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                              <span className="text-stone-900 dark:text-stone-100">
                                {metroDistKm < 1
                                  ? `${Math.round(metroDistKm * 1000)}m`
                                  : `${metroDistKm.toFixed(1)} km`}
                              </span>
                              <span className="text-[9px] text-purple-400 font-semibold">interchange</span>
                            </>
                          )}
                        </div>
                      ) : (
                        /* Default: walk time to nearest pandal */
                        <div className="text-right flex items-center gap-1.5 text-xs font-bold text-stone-900 dark:text-stone-100">
                          <Clock className="w-3.5 h-3.5 text-[#D8261C]" />
                          <span>{minWalkTime} {language === 'bn' ? 'মিনিট' : 'min'}</span>
                          <span className="text-stone-300 dark:text-stone-600">•</span>
                          <span className="text-stone-700 dark:text-stone-300 font-semibold">{walkDistance}</span>
                        </div>
                      )}

                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isExpanded
                            ? 'bg-[#D8261C] text-white shadow-xs rotate-90'
                            : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 group-hover:bg-[#D8261C] group-hover:text-white'
                        }`}
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </button>

                  {/* Expanded Accordion Drawer for Nearby Pandals */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-dashed border-stone-200 dark:border-white/10 animate-in fade-in slide-in-from-top-2 duration-200 space-y-3">
                      <div className="flex items-center justify-between text-xs font-semibold text-stone-600 dark:text-stone-400 px-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span>Connected Pandals from {station.name}:</span>
                          {fromStation && fromStation.id !== station.id && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50 text-[10px] font-bold">
                              <Footprints className="w-3 h-3" />
                              {language === 'bn' ? 'দূরত্ব থেকে:' : 'Distance via'} {fromStation.name}
                            </span>
                          )}
                        </div>
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${station.latitude},${station.longitude}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#D8261C] hover:underline flex items-center gap-1 font-bold"
                        >
                          <MapPin className="w-3 h-3" />
                          <span>Station in Maps</span>
                        </a>
                      </div>

                      {(() => {
                        const totalCount = station.nearby_pandals.length;
                        const isExpandedList = expandedStationPandals.has(station.id);
                        const displayedPandals = isExpandedList ? station.nearby_pandals : station.nearby_pandals.slice(0, 6);
                        const remainingCount = totalCount - 6;

                        return (
                          <>
                            <div className="grid grid-cols-2 gap-2 sm:gap-3.5 pt-1">
                              {displayedPandals.map((item) => {
                                const pandal = PANDALS_DATA.find((p) => p.id === item.pandal_id);
                                const pandalName = pandal?.name || item.pandal_name;
                                const pandalSlug = pandal?.slug || item.pandal_id;
                                const pandalImage = pandal?.featured_image || `/pandals/${item.pandal_id}.jpg`;
                                const pandalLocality = pandal?.locality || `${station.name} Area`;

                                // If user selected a fromStation different from this station,
                                // compute distance from that station to this pandal
                                let displayWalkMins = item.walking_time_mins;
                                let displayWalkDistance = item.walking_distance;
                                let walkUrl = item.directions_url || `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(`${station.name} Metro Station, Kolkata`)}&destination=${encodeURIComponent(`${pandalName}, Kolkata`)}&travelmode=walking`;

                                if (fromStation && fromStation.id !== station.id && pandal) {
                                  const distKm = calculateDistanceKm(
                                    fromStation.latitude, fromStation.longitude,
                                    pandal.latitude, pandal.longitude
                                  );
                                  // ~5 km/h walking speed
                                  displayWalkMins = Math.round(distKm / 5 * 60);
                                  displayWalkDistance = distKm < 1
                                    ? `${Math.round(distKm * 1000)}m`
                                    : `${distKm.toFixed(1)} km`;
                                  walkUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(`${fromStation.name} Metro Station, Kolkata`)}&destination=${encodeURIComponent(`${pandalName}, Kolkata`)}&travelmode=walking`;
                                }

                                return (
                                  <div
                                    key={item.pandal_id}
                                    className="p-2.5 sm:p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-900/80 border border-stone-200 dark:border-white/10 hover:border-[#D8261C]/50 transition-all flex flex-col justify-between gap-2 sm:gap-3 group"
                                  >
                                    <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-3">
                                      <div className="w-full sm:w-14 aspect-[16/10] sm:aspect-square sm:h-14 rounded-xl overflow-hidden relative shrink-0 border border-stone-200 dark:border-white/10 bg-stone-100">
                                        <Image
                                          src={pandalImage}
                                          alt={pandalName}
                                          fill
                                          sizes="(max-width: 640px) 50vw, 56px"
                                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                      </div>
                                      <div className="min-w-0 flex-1 w-full">
                                        <Link
                                          href={`/pandal/${pandalSlug}`}
                                          className="text-xs sm:text-sm font-bold text-stone-900 dark:text-white hover:text-[#D8261C] transition-colors line-clamp-1"
                                        >
                                          {pandalName}
                                        </Link>
                                        <p className="text-[10px] sm:text-[11px] text-stone-600 dark:text-stone-400 truncate mt-0.5 font-medium">
                                          {pandalLocality}
                                        </p>
                                        
                                        {/* Metric Pills: Time, Distance */}
                                        <div className="mt-1.5 flex items-center gap-1 sm:gap-1.5 flex-wrap text-[9px] sm:text-[10px] font-bold">
                                          <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 rounded-md bg-red-50 dark:bg-red-950/40 text-[#D8261C] dark:text-red-300 border border-red-200/50 dark:border-red-900/40">
                                            <Clock className="w-2.5 h-2.5" />
                                            <span>{displayWalkMins} min</span>
                                          </span>
                                          <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-white/10">
                                            <MapPin className="w-2.5 h-2.5 text-[#D8261C]" />
                                            <span>{displayWalkDistance}</span>
                                          </span>
                                          {(displayWalkDistance.toLowerCase().includes('auto') || displayWalkMins >= 12) && (
                                            <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 border border-amber-300/60 dark:border-amber-800/50 font-bold">
                                              <span>🛺 Auto: ~{displayWalkDistance.match(/Auto(?:\/E-Rickshaw)?\s*(?:available)?\s*(\d+)\s*mins?/i)?.[1] || Math.max(3, Math.round(displayWalkMins / 3.5))} min</span>
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-1.5 sm:gap-2 pt-2 border-t border-stone-200/60 dark:border-white/10">
                                      <Link
                                        href={`/pandal/${pandalSlug}`}
                                        className="flex-1 py-1.5 rounded-lg bg-white dark:bg-stone-800 hover:bg-[#D8261C] text-stone-800 dark:text-stone-200 hover:text-white text-[10px] sm:text-[11px] font-bold text-center border border-stone-200 dark:border-white/10 transition-colors"
                                      >
                                        Details
                                      </Link>
                                      <a
                                        href={walkUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="py-1.5 px-2 sm:px-3 rounded-lg bg-[#D8261C] hover:bg-[#B91C1C] text-white text-[10px] sm:text-[11px] font-bold flex items-center justify-center gap-1 shadow-2xs transition-colors shrink-0"
                                      >
                                        <MapPin className="w-3 h-3 text-[#FDE047]" />
                                        <span>Walk Path</span>
                                      </a>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>

                            {/* See More / Show Less Button if station has > 6 pandals */}
                            {totalCount > 6 && (
                              <div className="pt-2 flex justify-center">
                                <button
                                  type="button"
                                  onClick={() => toggleShowAllStationPandals(station.id)}
                                  className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-[#D8261C] text-stone-700 hover:text-white dark:bg-stone-800 dark:text-stone-300 dark:hover:text-white text-xs font-bold transition-all duration-200 shadow-2xs hover:shadow-md flex items-center gap-1.5 active:scale-95 border border-stone-200 dark:border-white/10"
                                >
                                  <span>
                                    {isExpandedList
                                      ? (language === 'bn' ? 'কম দেখুন' : 'Show Less')
                                      : (language === 'bn' ? `আরও ${remainingCount}টি দেখুন (See More)` : `See More (${remainingCount} more pandals)`)}
                                  </span>
                                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpandedList ? 'rotate-180' : ''}`} />
                                </button>
                              </div>
                            )}
                          </>
                        );
                      })()}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

      </div>}

    </div>
  );
}
