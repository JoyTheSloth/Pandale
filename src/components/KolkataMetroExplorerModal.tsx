'use client';

import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { 
  METRO_FULL_MAP_DATA, 
  FullMetroStation 
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
  Sun,
  Moon
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

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

  // Matched stations for search in modal map (or iconic hubs when clicked without query)
  const searchMatchedStations = useMemo(() => {
    if (!mapSearchQuery.trim()) {
      const popularIds = [
        'esplanade',
        'kalighat',
        'sovabazar-sutanuti',
        'shyambazar',
        'howrah-maidan',
        'sector-v',
        'dum-dum',
        'park-street'
      ];
      return allStations.filter((s) => popularIds.includes(s.id));
    }
    const q = mapSearchQuery.trim().toLowerCase();
    return allStations
      .filter((s) => s.name.toLowerCase().includes(q) || s.bengaliName.includes(q))
      .slice(0, 8);
  }, [mapSearchQuery, allStations]);

  const handleSelectHereStation = (station: FullMetroStation) => {
    setUserHereStation(station);
    setMapSearchQuery(station.name);
    setIsSearchFocused(false);
    setShowDropdown(false);
    // Pan to focus towards the station if zoomed in
    if (zoom > 1) {
      setPan((p) => clampPan({
        x: (525 - station.x) * 0.7,
        y: (675 - station.y) * 0.7
      }, zoom));
    }
  };

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
          ? `relative w-full h-full ${isDark ? 'bg-stone-950 text-stone-100' : 'bg-white text-stone-900'} flex flex-col overflow-hidden transition-colors duration-200`
          : `relative w-full max-w-6xl h-[92vh] max-h-[900px] ${isDark ? 'bg-stone-950 text-stone-100 border-stone-800' : 'bg-white text-stone-900 border-stone-200'} rounded-3xl border shadow-2xl flex flex-col overflow-hidden transition-colors duration-200`
      }
      onClick={(e) => e.stopPropagation()}
    >
        {/* EXACT DESIGN HEADER: ARTWORK BACKGROUND, BRAND, SEARCH & 3D LINE CHIPS */}
        <div className="relative z-40 shrink-0 border-b border-rose-950/40">
          {/* Background Illustration & Festive Deep Crimson Vignette */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-t-3xl">
            <div 
              className="absolute inset-0 bg-cover bg-no-repeat"
              style={{ 
                backgroundImage: `url('/brand/kolkata-metro-header-bg.jpg')`,
                backgroundPosition: 'right 30%'
              }}
            />
            {/* Dark Festive Crimson & Charcoal Vignette */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#120306]/95 via-[#180509]/85 to-[#120306]/65" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />
          </div>

          {/* Interactive Content */}
          <div className="relative z-10">
            {/* Row 1: Brand Squircle Badge & "Metro Map" Serif Title */}
            <div className="px-4 sm:px-6 pt-3.5 pb-2 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Crimson Gradient Squircle Badge */}
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-[#E11D48] via-[#C0153D] to-[#881337] border border-rose-400/35 flex items-center justify-center shadow-[0_4px_16px_rgba(225,29,72,0.45)] shrink-0">
                  <Train className="w-6 h-6 text-white" />
                </div>
                {/* Editorial Title with Pink Accent Underline */}
                <div className="flex flex-col">
                  <div className="flex items-baseline text-2xl sm:text-3xl font-serif font-bold tracking-tight leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                    <span className="text-white">Metro</span>
                    <span className="text-[#FB7185] ml-1.5 font-serif">Map</span>
                  </div>
                  <div className="w-10 h-0.5 sm:h-1 rounded-full bg-gradient-to-r from-[#FB7185] to-rose-600 mt-1.5" />
                </div>
              </div>

              {/* Close Button if opened in modal mode */}
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer border border-stone-700/60 bg-stone-950/75 backdrop-blur-md text-stone-300 hover:text-white hover:bg-stone-900 shadow-lg active:scale-95"
                  aria-label="Close Metro Map"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              )}
            </div>

            {/* Row 2: Translucent Pill Search Bar & Glowing Sun Theme Toggle */}
            <div className="px-4 sm:px-6 pt-1 pb-2 flex items-center gap-3">
              <div ref={searchContainerRef} className="relative z-50 flex-1">
                <Search className="w-5 h-5 text-[#F43F5E] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-20 shrink-0" strokeWidth={2.5} />
                <input
                  type="text"
                  value={mapSearchQuery}
                  onFocus={() => { setIsSearchFocused(true); setShowDropdown(true); }}
                  onChange={(e) => {
                    const val = e.target.value;
                    setMapSearchQuery(val);
                    setIsSearchFocused(true);
                    setShowDropdown(true);
                    if (val.trim().length >= 3) {
                      const matchStation = allStations.find(
                        (s) => s.name.toLowerCase().includes(val.trim().toLowerCase())
                      );
                      if (matchStation) {
                        setUserHereStation(matchStation);
                        setSelectedStation(matchStation);
                        if (zoom > 1) {
                          setPan({
                            x: (525 - matchStation.x) * 0.7,
                            y: (675 - matchStation.y) * 0.7
                          });
                        }
                      }
                    }
                  }}
                  placeholder="Esplanade (or search any station...)"
                  className="w-full h-11 sm:h-12 pl-12 pr-11 py-2 rounded-full text-sm font-medium focus:outline-none focus:ring-1 focus:ring-rose-500/50 transition-all border border-stone-700/50 bg-stone-950/60 backdrop-blur-md text-stone-100 placeholder:text-stone-400 shadow-inner"
                />
                {mapSearchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setMapSearchQuery('');
                      setUserHereStation(null);
                      setIsSearchFocused(false);
                    }}
                    className="w-6 h-6 rounded-full bg-stone-800/80 hover:bg-stone-700 text-stone-400 hover:text-white flex items-center justify-center absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Station Recommendation Dropdown */}
                {showDropdown && searchMatchedStations.length > 0 && (
                  <div className={`absolute top-full left-0 right-0 mt-2 rounded-2xl shadow-2xl overflow-hidden max-h-72 overflow-y-auto divide-y z-[100] border backdrop-blur-xl ${
                    isDark 
                      ? 'bg-stone-900 border-stone-700 divide-stone-800 text-stone-100 shadow-2xl shadow-black/80' 
                      : 'bg-white border-stone-200 divide-stone-100 text-stone-900 shadow-2xl shadow-stone-900/20'
                  }`}>
                    <div className={`px-3.5 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                      isDark ? 'bg-stone-800/80 text-amber-400' : 'bg-stone-100 text-[#D8261C]'
                    }`}>
                      {mapSearchQuery.trim() ? (
                        <>
                          <Search className="w-3 h-3 text-[#D8261C]" />
                          <span>Stations Matching &quot;{mapSearchQuery}&quot;:</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3 h-3 text-amber-500" />
                          <span>Iconic Puja Stations (Tap to Locate):</span>
                        </>
                      )}
                    </div>

                    {searchMatchedStations.map((st) => (
                      <button
                        key={st.id}
                        type="button"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleSelectHereStation(st);
                        }}
                        onTouchEnd={(e) => {
                          e.preventDefault();
                          handleSelectHereStation(st);
                        }}
                        className={`w-full px-3.5 py-2.5 text-left flex items-center justify-between text-xs transition-colors cursor-pointer group ${
                          isDark ? 'hover:bg-stone-800/90' : 'hover:bg-red-50/60'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span 
                            className="w-3 h-3 rounded-full shrink-0 shadow-2xs" 
                            style={{ backgroundColor: METRO_FULL_MAP_DATA[st.line].color }} 
                          />
                          <div>
                            <p className={`font-bold transition-colors ${
                              isDark ? 'text-stone-100 group-hover:text-amber-400' : 'text-stone-900 group-hover:text-[#D8261C]'
                            }`}>
                              {st.name}
                            </p>
                            <p className={`text-[10px] ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                              {st.bengaliName}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[9.5px] font-mono uppercase px-2 py-0.5 rounded-full ${
                            isDark ? 'bg-stone-800 text-stone-300' : 'bg-stone-100 text-stone-600'
                          }`}>
                            {st.zone}
                          </span>
                          <span className="text-[10px] font-bold text-[#D8261C] dark:text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            Locate →
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Glowing Sun Theme Toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all cursor-pointer border border-stone-700/60 bg-stone-950/75 backdrop-blur-md text-amber-400 hover:bg-stone-900 shadow-lg active:scale-95 shrink-0"
                title={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
                aria-label="Toggle Theme"
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)] transition-transform hover:rotate-90 duration-300" />
                ) : (
                  <Moon className="w-5 h-5 text-stone-300 transition-transform hover:-rotate-12 duration-300" />
                )}
              </button>
            </div>

            {/* Row 3: Crimson "All 5 Lines" & 3D Spherical Dot Capsules ("L1", "L2", "L3", "L4", "L6") */}
            <div className="px-4 sm:px-6 pt-1.5 pb-3.5 sm:pb-4 flex items-center gap-2.5 overflow-x-auto no-scrollbar">
              {/* All 5 Lines Button with 3-line filter icon */}
              <button
                type="button"
                onClick={() => setLineFilter('all')}
                className={`h-9 px-4 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 shrink-0 cursor-pointer active:scale-95 transition-all ${
                  lineFilter === 'all'
                    ? 'bg-gradient-to-r from-[#E11D48] via-[#D11A43] to-[#9F1239] text-white shadow-[0_4px_16px_rgba(225,29,72,0.45)] border border-rose-400/40'
                    : 'bg-stone-950/70 border border-stone-800 text-stone-300 hover:border-stone-700'
                }`}
              >
                <svg className="w-3.5 h-3.5 text-white shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <line x1="2" y1="4" x2="14" y2="4" />
                  <line x1="2" y1="8" x2="11" y2="8" />
                  <line x1="2" y1="12" x2="8" y2="12" />
                </svg>
                <span>All 5 Lines</span>
              </button>

              {/* 3D Dot Line Capsules */}
              {[
                { id: 'blue', code: 'L1', name: 'Blue Line', bgDot: 'radial-gradient(circle at 35% 35%, #93C5FD 0%, #3B82F6 50%, #1D4ED8 100%)', glow: 'rgba(59,130,246,0.5)' },
                { id: 'green', code: 'L2', name: 'Green Line', bgDot: 'radial-gradient(circle at 35% 35%, #6EE7B7 0%, #10B981 50%, #047857 100%)', glow: 'rgba(16,185,129,0.5)' },
                { id: 'purple', code: 'L3', name: 'Purple Line', bgDot: 'radial-gradient(circle at 35% 35%, #D8B4FE 0%, #8B5CF6 50%, #6D28D9 100%)', glow: 'rgba(139,92,246,0.5)' },
                { id: 'yellow', code: 'L4', name: 'Yellow Line', bgDot: 'radial-gradient(circle at 35% 35%, #FEF08A 0%, #F59E0B 50%, #B45309 100%)', glow: 'rgba(245,158,11,0.5)' },
                { id: 'orange', code: 'L6', name: 'Orange Line', bgDot: 'radial-gradient(circle at 35% 35%, #FED7AA 0%, #F97316 50%, #C2410C 100%)', glow: 'rgba(249,115,22,0.5)' }
              ].map((item) => {
                const isSelected = lineFilter === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setLineFilter(isSelected ? 'all' : item.id)}
                    title={item.name}
                    className={`h-9 px-3.5 rounded-full text-xs sm:text-sm font-bold shrink-0 flex items-center gap-2 border cursor-pointer active:scale-95 transition-all ${
                      isSelected
                        ? 'bg-stone-900 text-white border-white/40 shadow-lg ring-1 ring-white/30'
                        : 'bg-stone-950/75 border-stone-800/80 text-white backdrop-blur-md hover:border-stone-700'
                    }`}
                    style={isSelected ? { boxShadow: `0 0 14px ${item.glow}` } : undefined}
                  >
                    <span 
                      className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm"
                      style={{
                        background: item.bgDot,
                        boxShadow: '0 1px 3px rgba(0,0,0,0.6), inset -1px -1px 2px rgba(0,0,0,0.4), inset 1px 1px 2px rgba(255,255,255,0.7)'
                      }}
                    />
                    <span className="tracking-wide">{item.code}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* MAP CANVAS CONTAINER WITH CURVED BORDERS ON ALL SIDES */}
        <div className={`relative flex-1 w-full min-h-0 p-2.5 sm:p-4 overflow-hidden flex flex-col ${isDark ? 'bg-black' : 'bg-stone-100'} transition-colors duration-300`}>
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
              className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-150 cursor-pointer active:scale-85 hover:scale-110 disabled:opacity-40 disabled:cursor-not-allowed ${
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
              className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-150 cursor-pointer active:scale-85 hover:scale-110 disabled:opacity-40 disabled:cursor-not-allowed ${
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
              className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-150 cursor-pointer active:scale-85 hover:scale-110 group ${
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
                <filter id="labelShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#000000" floodOpacity={isDark ? 0.6 : 0.3} />
                </filter>
              </defs>

              {/* Extended Base Plate matching the theme background */}
              <rect x="-2000" y="-2000" width="5050" height="5350" fill={isDark ? '#0c0a09' : '#FFFFFF'} />

              {/* 1. ARTWORK BACKGROUND: Illustrated Kolkata Map - Rich Nocturnal Scene in Dark Mode */}
              <image
                href="/brand/kolkata-art-map.jpg"
                x="-100"
                y="-50"
                width="1250"
                height="1450"
                preserveAspectRatio="none"
                opacity={isDark ? 0.38 : 0.45}
                style={{
                  filter: isDark ? 'brightness(0.55) contrast(1.12) saturate(0.9)' : undefined
                }}
              />

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
                      
                      // Skip under-construction segments if "Operational Only" is toggled
                      if (showOperationalOnly && !isSegmentOperational) return null;

                      const segD = `M ${curr.x} ${curr.y} L ${next.x} ${next.y}`;

                      return (
                        <g key={`seg-${id}-${curr.id}-${next.id}`}>
                          {/* Ambient Glow */}
                          <path
                            d={segD}
                            fill="none"
                            stroke={line.color}
                            strokeWidth={isLineActive ? 22 : 14}
                            strokeOpacity={isDark ? (isSegmentOperational ? 0.45 : 0.25) : (isSegmentOperational ? 0.35 : 0.2)}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          {/* High-contrast separation casing border */}
                          <path
                            d={segD}
                            fill="none"
                            stroke={isDark ? '#0C0A09' : '#FFFFFF'}
                            strokeWidth={isLineActive ? 10 : 8}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeOpacity={0.95}
                          />
                          {/* Core Vibrant Line (solid for operational, dashed for under construction) */}
                          <path
                            d={segD}
                            fill="none"
                            stroke={line.color}
                            strokeWidth={isLineActive ? 6.5 : 5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeDasharray={isSegmentOperational ? undefined : '8 6'}
                            strokeOpacity={isSegmentOperational ? 1 : 0.85}
                          />
                        </g>
                      );
                    })}

                    {/* Line Route Badge Tag at Starting Terminal */}
                    {line.stations.length > 0 && (
                      <g
                        transform={`translate(${line.stations[0].x}, ${line.stations[0].y - 22})`}
                        className="pointer-events-none"
                      >
                        <rect
                          x="-35"
                          y="-10"
                          width="70"
                          height="16"
                          rx="8"
                          fill={line.color}
                          stroke={isDark ? '#0C0A09' : '#FFFFFF'}
                          strokeWidth="1.2"
                          filter="url(#labelShadow)"
                          opacity="0.95"
                        />
                        <text
                          x="0"
                          y="2"
                          textAnchor="middle"
                          fill="#FFFFFF"
                          fontSize="8.5"
                          fontFamily="monospace"
                          fontWeight="bold"
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
                const labelOnRight = station.x > 600;

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
                    {/* Station Halo for selected or "You Are Here" station */}
                    {(isSelected || isUserHere) && (
                      <circle
                        cx="0"
                        cy="0"
                        r={isUserHere ? 18 : 14}
                        fill="none"
                        stroke={isUserHere ? '#F59E0B' : '#D8261C'}
                        strokeWidth="2.5"
                        className={isUserHere ? 'animate-ping' : ''}
                      />
                    )}

                    {/* Solid White Station Node Disc (Glows distinctly on dark background) */}
                    <circle
                      cx="0"
                      cy="0"
                      r={station.isInterchange ? 7.5 : 5}
                      fill={station.isOperational ? '#FFFFFF' : (isDark ? '#2D2824' : '#F1F5F9')}
                      stroke={station.isInterchange ? (isDark ? '#FBBF24' : '#0F172A') : lineInfo.color}
                      strokeWidth={station.isInterchange ? 3.5 : 2.5}
                      filter="url(#labelShadow)"
                      className="transition-transform group-hover:scale-125"
                    />

                    {/* Concentric inner jewel dot for interchange junctions */}
                    {station.isInterchange && (
                      <circle
                        cx="0"
                        cy="0"
                        r={3.5}
                        fill={lineInfo.color}
                        className="pointer-events-none"
                      />
                    )}

                    {/* Station Label with Halo (paintOrder) for Crisp Readability over the Artwork */}
                    <g 
                      transform={labelOnRight ? 'translate(10, 3)' : 'translate(-10, 3)'}
                      className="pointer-events-none"
                    >
                      <text
                        x="0"
                        y="0"
                        textAnchor={labelOnRight ? 'start' : 'end'}
                        fill={isUserHere ? '#F59E0B' : isSelected ? '#EF4444' : (isDark ? '#FFFFFF' : '#0F172A')}
                        stroke={isDark ? '#000000' : '#FFFFFF'}
                        strokeWidth={isDark ? 4 : 3.2}
                        strokeLinejoin="round"
                        paintOrder="stroke fill"
                        fontSize={station.isInterchange ? "12" : "10"}
                        fontWeight={station.isInterchange ? "800" : "700"}
                        fontFamily="sans-serif"
                        className="select-none tracking-tight"
                      >
                        {station.name}
                      </text>
                      <text
                        x="0"
                        y="10.5"
                        textAnchor={labelOnRight ? 'start' : 'end'}
                        fill={isUserHere ? '#F59E0B' : isSelected ? '#EF4444' : (isDark ? '#E2E8F0' : '#475569')}
                        stroke={isDark ? '#000000' : '#FFFFFF'}
                        strokeWidth={isDark ? 3 : 2.5}
                        strokeLinejoin="round"
                        paintOrder="stroke fill"
                        fontSize="8.5"
                        fontFamily="sans-serif"
                        className="select-none font-medium"
                      >
                        {station.bengaliName}
                      </text>
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
                  {/* Floating YOU ARE HERE Badge */}
                  <g transform="translate(0, -32)">
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
          <div className={`absolute bottom-4 right-4 hidden lg:flex items-center gap-4 p-2.5 rounded-2xl border shadow-md backdrop-blur-md text-[11px] font-mono pointer-events-auto transition-colors ${
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
