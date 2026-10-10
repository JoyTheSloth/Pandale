'use client';

import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  METRO_FULL_MAP_DATA, 
  FullMetroStation,
  HOOGHLY_RIVER_PATH,
  getStationRecommendations 
} from '@/data/kolkataMetroFullMap';
import { 
  X, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Clock, 
  Compass, 
  Sparkles, 
  Train, 
  Search,
  ArrowLeft,
  Sun,
  Moon,
  Heart,
  MapPin,
  Footprints,
  ExternalLink,
  ArrowRight,
  Navigation
} from 'lucide-react';
import { PANDALS_DATA } from '@/data/pandals';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useWishlist } from '@/context/WishlistContext';

interface KolkataMetroExplorerModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  initialStation?: FullMetroStation | null;
  isPage?: boolean;
}

export default function KolkataMetroExplorerModal({
  isOpen = true,
  onClose,
  initialStation = null,
  isPage = false
}: KolkataMetroExplorerModalProps) {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { count } = useWishlist();
  const isDark = theme === 'dark';

  const [selectedStation, setSelectedStation] = useState<FullMetroStation | null>(null);
  const [hoveredStation, setHoveredStation] = useState<FullMetroStation | null>(null);

  // Search & "You Are Here" station pin state
  const [mapSearchQuery, setMapSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userHereStation, setUserHereStation] = useState<FullMetroStation | null>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Zoom & Pan State for Map
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const lastPinchDistRef = useRef<number | null>(null);
  const [lineFilter, setLineFilter] = useState<string>('all');
  const [showOperationalOnly, setShowOperationalOnly] = useState(false);

  // Flattened station list
  const allStations = useMemo(() => {
    const list: FullMetroStation[] = [];
    Object.values(METRO_FULL_MAP_DATA).forEach((line) => {
      line.stations.forEach((st) => {
        if (!list.some((existing) => existing.id === st.id)) {
          list.push(st);
        }
      });
    });
    return list.sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  // Clamp pan so map stays strictly fixed at base full view (1.0) and pans only when zoomed in
  const clampPan = useCallback((newPan: { x: number; y: number }, currentZoom: number) => {
    // When at base full view (<= 1.02), lock strictly fixed at center (0, 0)
    if (currentZoom <= 1.02) {
      return { x: 0, y: 0 };
    }
    // Clamped panning range proportional to zoom level
    const maxPanX = 400 * (currentZoom - 1);
    const maxPanY = 500 * (currentZoom - 1);
    return {
      x: Math.max(-maxPanX, Math.min(maxPanX, newPan.x)),
      y: Math.max(-maxPanY, Math.min(maxPanY, newPan.y)),
    };
  }, []);

  // Matched stations for search in modal map (or iconic hubs when clicked without query)
  const searchMatchedStations = useMemo(() => {
    if (!mapSearchQuery.trim()) {
      const popularIds = [
        'dum-dum',
        'esplanade',
        'kalighat',
        'sovabazar-sutanuti',
        'shyambazar',
        'howrah-maidan',
        'salt-lake-sector-v',
        'park-street'
      ];
      return allStations.filter((s) => popularIds.includes(s.id));
    }
    return getStationRecommendations(mapSearchQuery, allStations);
  }, [mapSearchQuery, allStations]);

  const handleSelectHereStation = useCallback((station: FullMetroStation) => {
    setUserHereStation(station);
    setSelectedStation(station);
    setMapSearchQuery(station.name);
    setIsSearchFocused(false);
    setShowDropdown(false);
    
    // Zoom in to 1.45 to clearly focus on station and its surroundings
    const targetZoom = 1.45;
    setZoom(targetZoom);
    setPan(clampPan({
      x: (525 - station.x) * 0.75,
      y: (675 - station.y) * 0.75
    }, targetZoom));
  }, [clampPan]);

  // Sync initialStation whenever passed from parent or search
  useEffect(() => {
    if (initialStation) {
      handleSelectHereStation(initialStation);
    }
  }, [initialStation, handleSelectHereStation]);

  // Close search dropdown on click outside or touch outside
  useEffect(() => {
    const closeDropdown = (e: MouseEvent | TouchEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', closeDropdown);
    document.addEventListener('touchstart', closeDropdown);
    return () => {
      document.removeEventListener('mousedown', closeDropdown);
      document.removeEventListener('touchstart', closeDropdown);
    };
  }, []);

  const canvasRef = useRef<HTMLDivElement>(null);
  const [containerDimensions, setContainerDimensions] = useState<{ width: number; height: number }>({ width: 1050, height: 1350 });

  // Dynamically observe container dimensions so viewBox matches aspect ratio with ZERO black bars
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateDims = () => {
      if (canvas.clientWidth && canvas.clientHeight) {
        setContainerDimensions({ width: canvas.clientWidth, height: canvas.clientHeight });
      }
    };

    updateDims();
    const observer = new ResizeObserver(updateDims);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  // Compute viewBox where aspect ratio strictly equals container aspect ratio (no letterbox/pillarbox)
  const viewBox = useMemo(() => {
    const { width: cw, height: ch } = containerDimensions;
    const baseW = 1050;
    const baseH = 1350;
    if (!cw || !ch) return `0 0 ${baseW} ${baseH}`;

    const containerRatio = cw / ch;
    const baseRatio = baseW / baseH;

    let vbW = baseW;
    let vbH = baseH;

    if (containerRatio > baseRatio) {
      vbW = baseH * containerRatio;
    } else {
      vbH = baseW / containerRatio;
    }

    const minX = 525 - vbW / 2;
    const minY = 675 - vbH / 2;

    return `${minX.toFixed(1)} ${minY.toFixed(1)} ${vbW.toFixed(1)} ${vbH.toFixed(1)}`;
  }, [containerDimensions]);

  // Lock background body scroll and hide bottom nav when modal is open
  useEffect(() => {
    if (isOpen && !isPage) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.classList.remove('modal-open');
      };
    }
  }, [isOpen, isPage]);



  // Pan and drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0 || zoom <= 1.02) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoom <= 1.02) return;
    const newPan = {
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    };
    setPan(clampPan(newPan, zoom));
  };

  const handleMouseUp = () => setIsDragging(false);

  // Touch drag handlers (single finger pan)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && zoom > 1.02) {
      setIsDragging(true);
      setDragStart({ x: e.touches[0].clientX - pan.x, y: e.touches[0].clientY - pan.y });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging && zoom > 1.02) {
      e.preventDefault();
      const newPan = {
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      };
      setPan(clampPan(newPan, zoom));
    } else if (e.touches.length === 2) {
      e.preventDefault();
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (lastPinchDistRef.current !== null) {
        const scale = dist / lastPinchDistRef.current;
        setZoom((prev) => {
          const next = Math.min(3.0, Math.max(1.0, prev * scale));
          if (next <= 1.02) {
            setPan({ x: 0, y: 0 });
            return 1.0;
          }
          return next;
        });
      }
      lastPinchDistRef.current = dist;
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    lastPinchDistRef.current = null;
  };

  // Non-passive wheel handler: stops strictly at 1.0 base view
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isOpen) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const factor = e.deltaY < 0 ? 1.12 : 0.88;

      setZoom((prevZoom) => {
        const nextZoom = Math.min(3.0, Math.max(1.0, Number((prevZoom * factor).toFixed(3))));

        if (nextZoom <= 1.02) {
          // Snap back to fixed centered full view when fully zoomed out
          setPan({ x: 0, y: 0 });
          return 1.0;
        }

        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - rect.width / 2;
        const mouseY = e.clientY - rect.top - rect.height / 2;
        const ratio = nextZoom / prevZoom;

        setPan((prevPan) =>
          clampPan({
            x: mouseX - (mouseX - prevPan.x) * ratio,
            y: mouseY - (mouseY - prevPan.y) * ratio,
          }, nextZoom)
        );

        return nextZoom;
      });
    };

    canvas.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      canvas.removeEventListener('wheel', onWheel);
    };
  }, [isOpen, clampPan]);

  const handleResetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  if (!isOpen && !isPage) return null;

  const modalContent = (
    <div 
      className={
        isPage
          ? `relative w-full h-full flex flex-col overflow-hidden transition-colors duration-200 ${
              isDark ? 'bg-stone-950 text-stone-100' : 'bg-[#FAF8F5] text-stone-900'
            }`
          : `relative w-full max-w-6xl h-[92vh] max-h-[900px] border rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-colors duration-200 ${
              isDark 
                ? 'bg-stone-950 text-stone-100 border-stone-800' 
                : 'bg-[#FAF8F5] text-stone-900 border-stone-200/90 shadow-stone-900/10'
            }`
      }
      onClick={(e) => e.stopPropagation()}
    >
        {/* STREAMLINED TRANSIT HEADER BAR: SEARCH + FILTER ONLY */}
        <div className={`relative z-40 shrink-0 border-b backdrop-blur-xl transition-colors duration-200 ${
          isDark 
            ? 'bg-black/85 border-white/15 shadow-[0_4px_24px_rgba(0,0,0,0.7)] text-white' 
            : 'bg-white/95 border-stone-200 shadow-[0_2px_12px_rgba(0,0,0,0.06)] text-stone-900'
        }`}>
          {/* Multi-line accent line */}
          <div className="h-0.5 w-full bg-gradient-to-r from-blue-600 via-emerald-500 via-purple-600 via-amber-500 to-orange-500 opacity-90" />

          <div className="px-3 sm:px-5 py-2.5 flex flex-col gap-2">
            {/* Row 1: Back Button + Universal Search Bar */}
            <div className="flex items-center gap-2.5">
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className={`flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-2xl sm:rounded-full text-xs font-bold active:scale-95 transition-all shrink-0 cursor-pointer shadow-sm group border ${
                    isDark 
                      ? 'bg-white/10 hover:bg-white/20 text-white border-white/20' 
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-800 border-stone-200'
                  }`}
                  title={language === 'bn' ? 'ফিরে যান' : 'Back'}
                  aria-label="Back"
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                </button>
              )}

              {/* Universal Search Bar for both mobile & desktop */}
              <div ref={searchContainerRef} className="relative z-50 flex-1">
                <div className={`relative flex items-center w-full rounded-2xl sm:rounded-full border transition-all duration-200 shadow-md ${
                  isSearchFocused
                    ? isDark 
                      ? 'bg-[#18181b] border-stone-600 shadow-[0_0_0_2px_rgba(244,63,94,0.3)] ring-1 ring-rose-500/20' 
                      : 'bg-white border-stone-400 shadow-[0_0_0_2px_rgba(225,29,72,0.18)] ring-1 ring-stone-900/10'
                    : isDark
                      ? 'bg-[#18181b]/95 border-stone-700/80 hover:border-stone-600'
                      : 'bg-stone-50 hover:bg-white border-stone-200 hover:border-stone-300'
                }`}>
                  <div className="pl-4 sm:pl-4.5 pr-2.5 flex items-center justify-center shrink-0">
                    <Search className={`w-4.5 h-4.5 transition-all duration-300 ${isSearchFocused ? 'text-[#D8261C] scale-110' : 'text-stone-400'}`} />
                  </div>

                  <input
                    type="text"
                    value={mapSearchQuery}
                    onFocus={() => { setIsSearchFocused(true); setShowDropdown(true); }}
                    onChange={(e) => {
                      setMapSearchQuery(e.target.value);
                      setIsSearchFocused(true);
                      setShowDropdown(true);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && searchMatchedStations.length > 0) {
                        handleSelectHereStation(searchMatchedStations[0]);
                      }
                    }}
                    placeholder={language === 'bn' ? "মেট্রো স্টেশন বা পুজো খুঁজুন..." : "Search station or puja..."}
                    className={`w-full h-11 sm:h-12 py-2.5 sm:py-3 text-xs sm:text-sm bg-transparent focus:outline-none font-medium placeholder:font-normal ${
                      isDark ? 'text-stone-100 placeholder:text-stone-400' : 'text-stone-900 placeholder:text-stone-400'
                    }`}
                  />

                  <div className="flex items-center gap-1.5 pr-2.5 shrink-0">
                    {mapSearchQuery && (
                      <button
                        type="button"
                        onClick={() => {
                          setMapSearchQuery('');
                          setUserHereStation(null);
                          setIsSearchFocused(false);
                        }}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs transition-transform duration-200 hover:rotate-90 active:scale-75 cursor-pointer ${
                          isDark ? 'text-stone-400 hover:text-white hover:bg-stone-800' : 'text-stone-500 hover:text-stone-900 hover:bg-stone-200'
                        }`}
                        title="Clear"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        if (searchMatchedStations.length > 0) {
                          handleSelectHereStation(searchMatchedStations[0]);
                        }
                      }}
                      disabled={!mapSearchQuery.trim()}
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl sm:rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
                        mapSearchQuery.trim()
                          ? 'bg-[#D8261C] text-white hover:bg-rose-600 hover:scale-105 active:scale-90 shadow-md shadow-red-950/40'
                          : isDark
                            ? 'bg-stone-800 text-stone-500 cursor-default opacity-60'
                            : 'bg-stone-200 text-stone-400 cursor-default opacity-60'
                      }`}
                      title="Locate Station"
                    >
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </div>

                {/* Autocomplete Dropdown */}
                {showDropdown && isSearchFocused && (
                  <div className={`absolute top-full left-0 right-0 mt-2 rounded-2xl shadow-2xl border backdrop-blur-2xl max-h-80 overflow-y-auto z-[60] divide-y animate-in fade-in zoom-in-95 duration-150 ${
                    isDark 
                      ? 'bg-[#18181b]/98 border-stone-700/80 divide-stone-800 text-stone-200 shadow-black/80' 
                      : 'bg-white/98 border-stone-200 divide-stone-100 text-stone-800 shadow-stone-900/15'
                  }`}>
                    <div className="px-3.5 py-2 text-[10.5px] font-mono uppercase tracking-wider text-stone-400 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 font-bold">
                        {mapSearchQuery ? (
                          <>
                            <Search className="w-3 h-3 text-rose-500" />
                            <span>Matched Stations ({searchMatchedStations.length})</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3 h-3 text-amber-500" />
                            <span>Key Puja Transit Junctions</span>
                          </>
                        )}
                      </div>
                      <span className="text-[9px] text-stone-500 dark:text-stone-400 font-sans">
                        Press Enter ↵
                      </span>
                    </div>

                    {searchMatchedStations.length === 0 ? (
                      <div className="p-4 text-center text-xs text-stone-500">
                        No metro station matching &quot;{mapSearchQuery}&quot;
                      </div>
                    ) : (
                      searchMatchedStations.map((st) => (
                        <button
                          key={st.id}
                          type="button"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            handleSelectHereStation(st);
                          }}
                          className={`w-full px-3.5 py-2.5 text-left flex items-center justify-between text-xs transition-all duration-150 cursor-pointer group hover:translate-x-1.5 active:scale-[0.98] ${
                            isDark ? 'hover:bg-stone-800/80' : 'hover:bg-rose-50/80'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span 
                              className="w-3 h-3 rounded-full shrink-0 shadow-xs transition-transform duration-150 group-hover:scale-125" 
                              style={{ backgroundColor: METRO_FULL_MAP_DATA[st.line].color }} 
                            />
                            <div>
                              <p className={`font-semibold transition-colors ${
                                isDark ? 'text-stone-100 group-hover:text-amber-400' : 'text-stone-900 group-hover:text-[#D8261C]'
                              }`}>
                                {language === 'bn' ? st.bengaliName : st.name}
                              </p>
                              <p className="text-[10px] text-stone-500 dark:text-stone-400">
                                {METRO_FULL_MAP_DATA[st.line].name.split(' (')[0]} • {st.zone} Zone
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {st.isInterchange && (
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-500 dark:text-amber-400 border border-amber-500/25">
                                Interchange
                              </span>
                            )}
                            <span className="text-[10px] font-bold text-[#D8261C] dark:text-rose-400 opacity-0 group-hover:opacity-100 transition-all duration-150 group-hover:translate-x-1 flex items-center gap-0.5">
                              Locate <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Row 2: Line Filter Capsules Bar + Theme Toggle */}
            <div className="flex items-center justify-between gap-2 py-0.5">
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-1">
                <button
                  type="button"
                  onClick={() => setLineFilter('all')}
                  className={`h-7 sm:h-8 px-3 rounded-full text-xs font-bold flex items-center gap-1.5 shrink-0 cursor-pointer active:scale-90 hover:scale-105 transition-all duration-150 ${
                    lineFilter === 'all'
                      ? 'bg-[#D8261C] text-white shadow-md shadow-rose-950/40 ring-1 ring-white/20'
                      : isDark
                        ? 'bg-stone-900/90 border border-stone-800 text-stone-300 hover:text-white'
                        : 'bg-stone-100 border border-stone-200 text-stone-700 hover:text-stone-950'
                  }`}
                >
                  <span>All Lines</span>
                </button>

                {[
                  { id: 'blue', code: 'L1', name: 'Blue Line', color: '#1D63ED' },
                  { id: 'green', code: 'L2', name: 'Green Line', color: '#059669' },
                  { id: 'purple', code: 'L3', name: 'Purple Line', color: '#9333EA' },
                  { id: 'yellow', code: 'L4', name: 'Yellow Line', color: '#EAB308' },
                  { id: 'orange', code: 'L6', name: 'Orange Line', color: '#EA580C' }
                ].map((item) => {
                  const isSelected = lineFilter === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setLineFilter(isSelected ? 'all' : item.id)}
                      title={item.name}
                      className={`h-7 sm:h-8 px-2.5 rounded-full text-xs font-bold shrink-0 flex items-center gap-1.5 border cursor-pointer active:scale-90 hover:scale-105 transition-all duration-150 ${
                        isSelected
                          ? 'text-white shadow-md border-transparent ring-1 ring-white/20'
                          : isDark
                            ? 'bg-stone-900/90 border-stone-800 text-stone-300 hover:text-white'
                            : 'bg-stone-100 border-stone-200 text-stone-700 hover:text-stone-950'
                      }`}
                      style={isSelected ? { backgroundColor: item.color, boxShadow: `0 3px 12px ${item.color}55` } : undefined}
                    >
                      <span 
                        className={`w-2 h-2 rounded-full shrink-0 transition-transform duration-150 ${isSelected ? 'scale-125' : ''}`}
                        style={{ backgroundColor: isSelected ? '#FFFFFF' : item.color }}
                      />
                      <span>{item.code}</span>
                    </button>
                  );
                })}
              </div>

              {/* Theme Toggle Button */}
              <button
                type="button"
                onClick={toggleTheme}
                className={`w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all cursor-pointer border shadow-sm active:scale-90 shrink-0 ${
                  isDark 
                    ? 'border-stone-800 bg-stone-900/90 text-amber-400 hover:bg-stone-800 hover:border-stone-700' 
                    : 'border-stone-200 bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
                title={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
                aria-label="Toggle Theme"
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-amber-400 transition-transform hover:rotate-90 duration-300" />
                ) : (
                  <Moon className="w-4 h-4 text-stone-700 transition-transform hover:-rotate-12 duration-300" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* MAP CANVAS CONTAINER WITH CURVED BORDERS ON ALL SIDES */}
        <div className={`relative flex-1 w-full min-h-0 p-2.5 sm:p-4 overflow-hidden flex flex-col ${isDark ? 'bg-black' : 'bg-stone-100'} transition-colors duration-300 z-10`}>
          <div className={`relative flex-1 w-full h-full rounded-2xl sm:rounded-3xl border overflow-hidden shadow-2xl transition-colors duration-300 ${
            isDark 
              ? 'bg-[#0e0d0b] border-white/15 shadow-black/80 ring-1 ring-white/10' 
              : 'bg-white border-stone-300/80 shadow-stone-900/10 ring-1 ring-stone-900/5'
          }`}>
          
          {/* Map Zoom & Theme Controls (Top-Right Floating Glass Capsule) */}
          <div className={`absolute top-3.5 right-3.5 sm:right-4 z-20 flex flex-col gap-1 p-1 rounded-2xl backdrop-blur-md border shadow-md pointer-events-auto transition-colors ${
            isDark ? 'bg-stone-900/90 border-stone-700 text-stone-200' : 'bg-white/90 border-stone-200/90 text-stone-700'
          }`}>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(3.0, Number((z + 0.25).toFixed(2))))}
              disabled={zoom >= 3.0}
              className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-150 cursor-pointer active:scale-85 hover:scale-110 disabled:opacity-40 disabled:cursor-not-allowed btn-jiggle ${
                isDark ? 'hover:bg-stone-800 text-stone-200 hover:text-white' : 'hover:bg-stone-100 text-stone-700 hover:text-stone-950'
              }`}
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4 transition-transform active:scale-90" />
            </button>
            <div className={`w-full h-px ${isDark ? 'bg-stone-800' : 'bg-stone-100'}`} />
            <button
              type="button"
              onClick={() => {
                setZoom((z) => {
                  const nextZ = Math.max(1.0, Number((z - 0.25).toFixed(2)));
                  if (nextZ <= 1.02) setPan({ x: 0, y: 0 });
                  return nextZ;
                });
              }}
              disabled={zoom <= 1.0}
              className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-150 cursor-pointer active:scale-85 hover:scale-110 disabled:opacity-40 disabled:cursor-not-allowed btn-jiggle ${
                isDark ? 'hover:bg-stone-800 text-stone-200 hover:text-white' : 'hover:bg-stone-100 text-stone-700 hover:text-stone-950'
              }`}
              title="Zoom Out (Locks at full view)"
            >
              <ZoomOut className="w-4 h-4 transition-transform active:scale-90" />
            </button>
            <div className={`w-full h-px ${isDark ? 'bg-stone-800' : 'bg-stone-100'}`} />
            <button
              type="button"
              onClick={handleResetZoom}
              className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-150 cursor-pointer active:scale-85 hover:scale-110 group btn-jiggle ${
                isDark ? 'hover:bg-rose-950/50 text-red-400' : 'hover:bg-rose-50 text-[#D8261C]'
              }`}
              title="Reset View"
            >
              <RotateCcw className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-rotate-180" />
            </button>
          </div>

          {/* SVG Interactive Canvas — touch-action: none lets us handle all gestures */}
          <div 
            ref={canvasRef}
            className="w-full h-full cursor-grab active:cursor-grabbing overflow-hidden relative flex items-center justify-center"
            style={{ touchAction: 'none' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <svg
              width="100%"
              height="100%"
              viewBox={viewBox}
              className="w-full h-full select-none"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                transformOrigin: 'center center',
                transition: isDragging ? 'none' : 'transform 0.15s ease-out'
              }}
            >
              <defs>
                {/* Modern subtle shadows */}
                <filter id="pillShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="1.5" stdDeviation="2.5" floodColor="#000000" floodOpacity={isDark ? 0.7 : 0.22} />
                </filter>
                <filter id="glowEffect" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Subtle transit schematic grid pattern */}
                <pattern id="subwayGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path 
                    d="M 40 0 L 0 0 0 40" 
                    fill="none" 
                    stroke={isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.03)'} 
                    strokeWidth="1" 
                  />
                </pattern>

                {/* Hooghly River Gradient */}
                <linearGradient id="riverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={isDark ? '#082f49' : '#bae6fd'} stopOpacity={isDark ? 0.35 : 0.65} />
                  <stop offset="100%" stopColor={isDark ? '#075985' : '#7dd3fc'} stopOpacity={isDark ? 0.45 : 0.75} />
                </linearGradient>
              </defs>

              {/* Extended Base Plate matching the theme background */}
              <rect x="-2000" y="-2000" width="5050" height="5350" fill={isDark ? '#0c0a09' : '#FAF8F5'} />

              {/* Subtle Subway Grid Pattern */}
              <rect x="-2000" y="-2000" width="5050" height="5350" fill="url(#subwayGrid)" opacity={isDark ? 0.35 : 0.25} />

              {/* 1. ARTWORK BACKGROUND: Illustrated Kolkata Map */}
              <image
                href="/brand/kolkata-art-map.jpg"
                x="-100"
                y="-50"
                width="1250"
                height="1450"
                preserveAspectRatio="none"
                opacity={isDark ? 0.38 : 0.65}
                style={{
                  filter: isDark ? 'brightness(0.55) contrast(1.12) saturate(0.9)' : 'brightness(1.02) contrast(1.03)'
                }}
              />

              {/* HOOGHLY RIVER (Crisp, stylized transit schematic ribbon) */}
              <g id="hooghly-river" className="pointer-events-none">
                <path
                  d={HOOGHLY_RIVER_PATH}
                  fill="none"
                  stroke="url(#riverGradient)"
                  strokeWidth="48"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d={HOOGHLY_RIVER_PATH}
                  fill="none"
                  stroke={isDark ? '#38bdf8' : '#0284c7'}
                  strokeWidth="2"
                  strokeDasharray="6 6"
                  strokeOpacity={0.4}
                  className="animate-river-flow pointer-events-none"
                />
                <text
                  x="215"
                  y="730"
                  transform="rotate(-70, 215, 730)"
                  fill={isDark ? '#38bdf8' : '#0284c7'}
                  opacity={0.65}
                  fontSize="12"
                  fontWeight="bold"
                  letterSpacing="4"
                  fontFamily="sans-serif"
                >
                  HOOGHLY RIVER (গঙ্গা)
                </text>
              </g>

              {/* METRO TRACKS - DRAW LINES CONNECTING EACH STATION */}
              {Object.entries(METRO_FULL_MAP_DATA).map(([id, line]) => {
                const isVisible = lineFilter === 'all' || lineFilter === id;
                if (!isVisible) return null;

                const isLineActive = lineFilter === id;

                return (
                  <g key={`track-group-${id}`} className="transition-opacity duration-300">
                    {/* Render each segment between consecutive stations */}
                    {line.stations.slice(0, -1).map((curr, idx) => {
                      const next = line.stations[idx + 1];
                      const isSegmentOperational = curr.isOperational && next.isOperational;
                      
                      if (showOperationalOnly && !isSegmentOperational) return null;

                      const segD = `M ${curr.x} ${curr.y} L ${next.x} ${next.y}`;

                      return (
                        <g key={`seg-${id}-${curr.id}-${next.id}`}>
                          {/* Ambient Glow for active/filtered line */}
                          {isLineActive && (
                            <path
                              d={segD}
                              fill="none"
                              stroke={line.color}
                              strokeWidth={18}
                              strokeOpacity={isDark ? 0.35 : 0.25}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              filter="url(#glowEffect)"
                            />
                          )}
                          {/* High-contrast separation casing border */}
                          <path
                            d={segD}
                            fill="none"
                            stroke={isDark ? '#0C0A09' : '#FFFFFF'}
                            strokeWidth={isLineActive ? 11 : 9}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeOpacity={0.95}
                          />
                          {/* Core Vibrant Line */}
                          <path
                            d={segD}
                            fill="none"
                            stroke={line.color}
                            strokeWidth={isLineActive ? 7 : 5.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeDasharray={isSegmentOperational ? undefined : '7 6'}
                            strokeOpacity={isSegmentOperational ? 1 : 0.8}
                          />
                        </g>
                      );
                    })}

                    {/* Line Route Badge Tag at Starting Terminal */}
                    {line.stations.length > 0 && (
                      <g
                        transform={`translate(${line.stations[0].x}, ${line.stations[0].y - 20})`}
                        className="pointer-events-none"
                      >
                        <rect
                          x="-36"
                          y="-9"
                          width="72"
                          height="18"
                          rx="9"
                          fill={line.color}
                          filter="url(#pillShadow)"
                        />
                        <text
                          x="0"
                          y="3"
                          textAnchor="middle"
                          fill="#FFFFFF"
                          fontSize="9"
                          fontFamily="sans-serif"
                          fontWeight="800"
                          letterSpacing="0.5"
                        >
                          {line.name.split(' (')[0].toUpperCase()}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}

              {/* METRO STATIONS */}
              {allStations.map((station) => {
                const lineInfo = METRO_FULL_MAP_DATA[station.line];
                const isVisible = lineFilter === 'all' || lineFilter === station.line;
                if (!isVisible) return null;
                if (showOperationalOnly && !station.isOperational) return null;

                const isSelected = selectedStation?.id === station.id;
                const isUserHere = userHereStation?.id === station.id;
                const isHovered = hoveredStation?.id === station.id;

                const labelOnRight = station.x > 580;

                // Pill label sizing
                const nameText = station.name;
                const approxPillWidth = Math.max(68, nameText.length * 7.0 + (station.isInterchange ? 22 : 12));
                const pillX = labelOnRight ? 12 : -approxPillWidth - 12;

                return (
                  <g
                    key={`station-${station.id}`}
                    transform={`translate(${station.x}, ${station.y})`}
                    className="cursor-pointer group"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectHereStation(station);
                    }}
                    onMouseEnter={() => setHoveredStation(station)}
                    onMouseLeave={() => setHoveredStation(null)}
                  >
                    {/* Generous Tap Target */}
                    <circle
                      cx="0"
                      cy="0"
                      r="22"
                      fill="transparent"
                      className="cursor-pointer"
                    />

                    {/* Selected / Hover / You Are Here Ping Rings with Micro-interactions */}
                    {isSelected && (
                      <g className="pointer-events-none">
                        {/* Radar wave ping */}
                        <circle
                          cx="0"
                          cy="0"
                          r="10"
                          fill="none"
                          stroke="#D8261C"
                          strokeWidth="2.5"
                          className="animate-metro-beacon"
                        />
                        {/* Soft ambient radar aura */}
                        <circle
                          cx="0"
                          cy="0"
                          r="14"
                          fill="#D8261C"
                          fillOpacity="0.22"
                          stroke="#D8261C"
                          strokeWidth="1.5"
                          strokeDasharray="3 3"
                        />
                      </g>
                    )}

                    {isUserHere && (
                      <circle
                        cx="0"
                        cy="0"
                        r="18"
                        fill="none"
                        stroke="#F59E0B"
                        strokeWidth="2.5"
                        className="animate-ping"
                      />
                    )}

                    {isHovered && !isSelected && (
                      <circle
                        cx="0"
                        cy="0"
                        r="13"
                        fill={lineInfo.color}
                        fillOpacity="0.22"
                        stroke={lineInfo.color}
                        strokeWidth="1.5"
                        strokeDasharray="3 2"
                        className="pointer-events-none animate-metro-pulse"
                      />
                    )}

                    {/* Station Node Disc with tactile spring hover */}
                    {station.isInterchange ? (
                      <g 
                        className="transition-transform duration-200 ease-out group-hover:scale-130 active:scale-90"
                        style={{ transformOrigin: '0px 0px' }}
                      >
                        <circle
                          cx="0"
                          cy="0"
                          r="8"
                          fill={isDark ? '#0c0a09' : '#FFFFFF'}
                          stroke={isDark ? '#FBBF24' : '#D97706'}
                          strokeWidth="3.5"
                          filter="url(#pillShadow)"
                        />
                        <circle
                          cx="0"
                          cy="0"
                          r="4"
                          fill={lineInfo.color}
                        />
                      </g>
                    ) : (
                      <circle
                        cx="0"
                        cy="0"
                        r={isHovered ? 6 : 5}
                        fill={station.isOperational ? '#FFFFFF' : (isDark ? '#262626' : '#E5E5E5')}
                        stroke={lineInfo.color}
                        strokeWidth={2.8}
                        filter="url(#pillShadow)"
                        className="transition-transform duration-200 ease-out group-hover:scale-130 active:scale-90"
                        style={{ transformOrigin: '0px 0px' }}
                      />
                    )}

                    {/* CRISP FLOATING PILL LABEL with smooth hover scale */}
                    <g 
                      transform={`translate(${pillX}, -10)`}
                      className="pointer-events-none transition-transform duration-200 ease-out group-hover:scale-105"
                      style={{ transformOrigin: labelOnRight ? '0px 10px' : `${approxPillWidth}px 10px` }}
                    >
                      <rect
                        x="0"
                        y="0"
                        width={approxPillWidth}
                        height={language === 'bn' ? 24 : 19}
                        rx={language === 'bn' ? 6 : 5}
                        fill={
                          isSelected 
                            ? '#D8261C' 
                            : isUserHere 
                              ? '#D97706' 
                              : isDark 
                                ? '#1c1917' 
                                : '#ffffff'
                        }
                        stroke={
                          isSelected 
                            ? '#F43F5E' 
                            : isUserHere 
                              ? '#FBBF24' 
                              : station.isInterchange
                                ? (isDark ? 'rgba(251, 191, 36, 0.45)' : 'rgba(217, 119, 6, 0.35)')
                                : (isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.1)')
                        }
                        strokeWidth={station.isInterchange ? 1.5 : 1}
                        filter="url(#pillShadow)"
                        opacity={isDark ? 0.94 : 0.98}
                      />

                      {/* Station Color Accent Strip on Pill */}
                      <rect
                        x="2"
                        y="3"
                        width="3"
                        height={language === 'bn' ? 18 : 13}
                        rx="1.5"
                        fill={isSelected || isUserHere ? '#ffffff' : lineInfo.color}
                      />

                      {/* Primary English Station Name */}
                      <text
                        x="9"
                        y={language === 'bn' ? 11 : 13}
                        fill={
                          isSelected || isUserHere 
                            ? '#FFFFFF' 
                            : (isDark ? '#F5F5F4' : '#1C1917')
                        }
                        fontSize={station.isInterchange ? "9.5" : "8.5"}
                        fontWeight={station.isInterchange ? "800" : "700"}
                        fontFamily="system-ui, -apple-system, sans-serif"
                        className="select-none tracking-tight"
                      >
                        {station.name}
                      </text>

                      {/* Bengali Sub-label */}
                      {language === 'bn' && (
                        <text
                          x="9"
                          y="20"
                          fill={
                            isSelected || isUserHere 
                              ? '#FEE2E2' 
                              : (isDark ? '#A8A29E' : '#57534E')
                          }
                          fontSize="7.5"
                          fontWeight="500"
                          fontFamily="sans-serif"
                          className="select-none"
                        >
                          {station.bengaliName}
                        </text>
                      )}
                    </g>
                  </g>
                );
              })}

              {/* USER LOCATION "YOU ARE HERE" PIN OVERLAY ON SVG */}
              {userHereStation && (
                <g
                  transform={`translate(${userHereStation.x}, ${userHereStation.y})`}
                  className="pointer-events-none"
                >
                  {/* Pulsing beacon circles */}
                  <circle
                    cx="0"
                    cy="0"
                    r="22"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="3"
                    className="animate-ping"
                    opacity="0.85"
                  />
                  <circle
                    cx="0"
                    cy="0"
                    r="14"
                    fill="#D8261C"
                    stroke="#FFFFFF"
                    strokeWidth="2.5"
                  />
                  {/* Floating YOU ARE HERE Badge with smooth jiggle animation */}
                  <g transform="translate(0, -32)" className="animate-smooth-jiggle">
                    <rect
                      x="-60"
                      y="-14"
                      width="120"
                      height="24"
                      rx="12"
                      fill="#D8261C"
                      stroke="#FDE047"
                      strokeWidth="2"
                      filter="drop-shadow(0px 3px 8px rgba(0,0,0,0.4))"
                    />
                    <text
                      x="0"
                      y="2.5"
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize="10.5"
                      fontWeight="900"
                      fontFamily="sans-serif"
                    >
                      📍 YOU ARE HERE
                    </text>
                    <polygon
                      points="-6,10 6,10 0,17"
                      fill="#D8261C"
                    />
                  </g>
                </g>
              )}
            </svg>
          </div>


          {/* Bottom Legend */}
          <div className={`absolute bottom-4 right-4 hidden lg:flex items-center gap-4 p-2.5 rounded-2xl border shadow-md backdrop-blur-md text-[11px] font-mono pointer-events-auto transition-colors z-20 ${
            isDark ? 'bg-stone-900/95 border-stone-700 text-stone-300' : 'bg-white/95 border-stone-200 text-stone-700'
          }`}>
            <span className={`font-bold flex items-center gap-1 ${isDark ? 'text-white' : 'text-stone-900'}`}>
              <Compass className="w-3.5 h-3.5 text-amber-500" />
              <span>LEGEND:</span>
            </span>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-1.5 rounded-full bg-blue-500" />
              <span>Filled: Operational</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-1.5 rounded-full border border-dashed border-amber-500" />
              <span>Non-Filled: Planned</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className={`w-3 h-3 rounded-full border-2 bg-blue-600 ${isDark ? 'border-amber-400' : 'border-stone-800'}`} />
              <span>Interchange Junction</span>
            </div>
          </div>

          {/* INTERACTIVE STATION PANDAL HOPPER DRAWER */}
          {selectedStation && (() => {
            // Find all pandals linked to this station
            const stnNameNorm = selectedStation.name.toLowerCase();
            const stnId = selectedStation.id.toLowerCase();

            // Match by nearest_metro, metro_details, or nearbyPandals
            const matchedPandals: Array<{
              id: string;
              name: string;
              slug: string;
              theme?: string;
              walking_distance?: string;
              featured_image?: string;
              google_maps_url?: string;
              area?: string;
              locality?: string;
            }> = [];
            const seenSlugs = new Set<string>();

            PANDALS_DATA.forEach((p) => {
              const nm = (p.nearest_metro || '').toLowerCase();
              const matchesNearest = nm.includes(stnNameNorm) || nm.includes(stnId.replace(/-/g, ' '));
              const matchesDetails = p.metro_details && p.metro_details.some(md => 
                md.station_id === selectedStation.id || 
                md.station_name.toLowerCase().includes(stnNameNorm)
              );
              if (matchesNearest || matchesDetails) {
                seenSlugs.add(p.slug);
                matchedPandals.push(p);
              }
            });

            // Also include any explicitly declared nearbyPandals on this station
            if (selectedStation.nearbyPandals) {
              selectedStation.nearbyPandals.forEach((np) => {
                if (!seenSlugs.has(np.slug)) {
                  seenSlugs.add(np.slug);
                  const fromData = PANDALS_DATA.find(
                    (p) => p.slug === np.slug || p.name.toLowerCase().includes(np.name.toLowerCase())
                  );
                  if (fromData) {
                    matchedPandals.push(fromData);
                  } else {
                    matchedPandals.push({
                      id: np.slug,
                      slug: np.slug,
                      name: np.name,
                      walking_distance: np.distance,
                      featured_image: '/brand/hero-poster.jpg',
                      area: selectedStation.zone || 'Kolkata',
                      theme: 'Durga Puja 2026',
                    });
                  }
                }
              });
            }

            const stationPandals = matchedPandals;

            return (
              <div className={`absolute bottom-2.5 inset-x-2.5 sm:bottom-3 sm:inset-x-4 md:max-w-2xl md:left-4 md:right-auto z-30 max-h-[44vh] sm:max-h-[42vh] flex flex-col rounded-2xl border shadow-2xl backdrop-blur-2xl pointer-events-auto transition-all animate-in slide-in-from-bottom-5 duration-300 ease-out ${
                isDark 
                  ? 'bg-[#121214]/95 border-stone-800 shadow-black/90 text-stone-100' 
                  : 'bg-white/95 border-stone-200 shadow-stone-900/15 text-stone-900'
              }`}>
                {/* Compact Drawer Header */}
                <div className="px-3.5 py-2.5 border-b border-stone-200/50 dark:border-stone-800/80 flex items-center justify-between gap-2 shrink-0">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span 
                      className="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs animate-pulse" 
                      style={{ backgroundColor: METRO_FULL_MAP_DATA[selectedStation.line]?.color || '#D8261C' }} 
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h4 className="font-bold text-xs sm:text-sm leading-tight truncate">
                          {selectedStation.name}
                        </h4>
                        <span className="text-[10px] text-stone-500 dark:text-stone-400 font-medium truncate">
                          ({selectedStation.bengaliName})
                        </span>
                        {selectedStation.isInterchange && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/15 text-amber-500 border border-amber-500/20">
                            Interchange
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded-full text-[9.5px] font-bold bg-rose-500/15 text-[#D8261C] dark:text-rose-400 border border-rose-500/25">
                          {stationPandals.length} {language === 'bn' ? 'পুজো প্যান্ডেল' : 'Pandals nearby'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Header Actions */}
                  <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedStation.name + ' Metro Station Kolkata')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-8 w-8 sm:w-auto px-0 sm:px-2.5 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 bg-blue-500/15 hover:bg-blue-500/25 dark:bg-blue-500/20 dark:hover:bg-blue-500/30 text-blue-600 dark:text-blue-400 border border-blue-500/30 hover:border-blue-500/50 shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
                      title="Open Station in Google Maps"
                    >
                      <Navigation className="w-3.5 h-3.5 fill-blue-500/30 text-blue-600 dark:text-blue-400" />
                      <span className="hidden sm:inline">Directions</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setSelectedStation(null)}
                      className="w-8 h-8 rounded-xl flex items-center justify-center bg-rose-500/15 hover:bg-rose-500/25 dark:bg-rose-500/20 dark:hover:bg-rose-500/30 text-rose-600 dark:text-rose-400 border border-rose-500/30 hover:border-rose-500/50 shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
                      title="Close"
                    >
                      <X className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>
                </div>

                {/* Compact Night Notice */}
                <div className="px-3 py-1 bg-amber-500/10 border-b border-amber-500/20 flex items-center text-[10.5px] font-medium text-amber-600 dark:text-amber-400 shrink-0">
                  <span className="flex items-center gap-1 truncate">
                    <Clock className="w-3 h-3 shrink-0" />
                    <span>🌙 All-night Puja Metro active (Trains every 12–15m)</span>
                  </span>
                </div>

                {/* Small Pandals Grid */}
                <div className="p-2 sm:p-2.5 overflow-y-auto flex-1 min-h-0">
                  {stationPandals.length === 0 ? (
                    <div className="py-6 text-center text-xs text-stone-500 dark:text-stone-400">
                      No direct registered pandals listed within 500m of this station.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {stationPandals.map((p) => {
                        const directMaps = p.google_maps_url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.name + ' Durga Puja Kolkata')}`;
                        const imgSrc = p.featured_image || '/brand/hero-poster.jpg';
                        return (
                          <div 
                            key={p.id}
                            className={`p-2 rounded-xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-amber-400/70 active:scale-[0.99] flex items-center gap-2.5 group cursor-pointer shadow-sm ${
                              isDark 
                                ? 'bg-stone-900/80 border-stone-800 hover:bg-stone-850' 
                                : 'bg-stone-50/90 border-stone-200 hover:bg-white'
                            }`}
                          >
                            {/* Small thumbnail */}
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-stone-800 border border-white/10 shadow-xs">
                              <Image
                                src={imgSrc}
                                alt={p.name}
                                fill
                                className="object-cover group-hover:scale-115 transition-transform duration-300 ease-out"
                                sizes="48px"
                              />
                            </div>

                            {/* Info */}
                            <div className="min-w-0 flex-1">
                              <Link 
                                href={`/pandal/${p.slug}`}
                                className="font-bold text-xs hover:text-[#D8261C] dark:hover:text-rose-400 transition-colors block truncate leading-tight"
                              >
                                {p.name}
                              </Link>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 shrink-0">
                                  {p.walking_distance || 'Nearby'}
                                </span>
                                {p.area && (
                                  <span className="text-[10px] text-stone-500 dark:text-stone-400 truncate">
                                    {p.area}
                                  </span>
                                )}
                              </div>
                              {p.theme && (
                                <p className="text-[10px] text-stone-500 dark:text-stone-400 font-medium truncate mt-0.5">
                                  🎨 {p.theme}
                                </p>
                              )}
                            </div>

                            {/* Quick Actions */}
                            <div className="flex flex-col items-end gap-1 shrink-0">
                              <Link 
                                href={`/pandal/${p.slug}`}
                                className="px-2.5 py-1 rounded-lg text-[10px] font-bold text-white bg-[#D8261C] hover:bg-red-600 hover:scale-105 active:scale-95 transition-all shadow-xs hover:shadow-md hover:shadow-red-950/30"
                              >
                                View
                              </Link>
                              <a
                                href={directMaps}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-lg text-blue-500 hover:text-blue-600 bg-blue-500/10 hover:bg-blue-500/20 dark:bg-blue-500/15 dark:hover:bg-blue-500/25 border border-blue-500/20 transition-all hover:scale-115 active:scale-90 shadow-2xs"
                                title="Google Maps Directions"
                              >
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })()}
          </div>
        </div>
      </div>
  );

  if (isPage) {
    return (
      <div className="w-full h-full select-none flex flex-col overflow-hidden">
        {modalContent}
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-md p-2 sm:p-4 select-none animate-in fade-in duration-200"
      onClick={onClose}
    >
      {modalContent}
    </div>
  );
}
