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
  isOpen: boolean;
  onClose: () => void;
  initialStation?: FullMetroStation | null;
}

export default function KolkataMetroExplorerModal({
  isOpen,
  onClose,
  initialStation = null
}: KolkataMetroExplorerModalProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const [selectedStation, setSelectedStation] = useState<FullMetroStation | null>(initialStation);
  const [hoveredStation, setHoveredStation] = useState<FullMetroStation | null>(null);

  // Search & "You Are Here" station pin state
  const [mapSearchQuery, setMapSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [userHereStation, setUserHereStation] = useState<FullMetroStation | null>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Zoom & Pan State for Map
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
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
    setSelectedStation(station);
    setMapSearchQuery(station.name);
    setIsSearchFocused(false);
    // Pan to focus towards the station if zoomed in
    if (zoom > 1) {
      setPan((p) => clampPan({
        x: (525 - station.x) * 0.7,
        y: (675 - station.y) * 0.7
      }, zoom));
    }
  };

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const canvasRef = useRef<HTMLDivElement>(null);

  // Lock background body scroll and hide bottom nav when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.classList.remove('modal-open');
      };
    }
  }, [isOpen]);

  // Clamp pan so map stays fixed at base zoom and cannot be panned off screen
  const clampPan = useCallback((newPan: { x: number; y: number }, currentZoom: number) => {
    // When zoomed out to base (<= 1.05), lock strictly fixed at center (0, 0)
    if (currentZoom <= 1.05) {
      return { x: 0, y: 0 };
    }
    // Clamped panning range proportional to zoom level
    const maxPanX = 380 * (currentZoom - 1);
    const maxPanY = 480 * (currentZoom - 1);
    return {
      x: Math.max(-maxPanX, Math.min(maxPanX, newPan.x)),
      y: Math.max(-maxPanY, Math.min(maxPanY, newPan.y)),
    };
  }, []);

  // Pan and drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const newPan = {
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    };
    setPan(clampPan(newPan, zoom));
  };

  const handleMouseUp = () => setIsDragging(false);

  // Non-passive wheel handler: prevents page scroll leakage and fixes min-zoom at 1.0
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isOpen) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const factor = e.deltaY < 0 ? 1.12 : 0.88;

      setZoom((prevZoom) => {
        // Fix min zoom to 1.0 so scrolling out can NEVER shrink into void or drift away
        const nextZoom = Math.min(3.0, Math.max(1.0, prevZoom * factor));

        if (nextZoom <= 1.02) {
          // Snap back to fixed centered view when fully scrolled out!
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

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-md p-2 sm:p-4 select-none animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className={`relative w-full max-w-6xl h-[92vh] max-h-[900px] ${isDark ? 'bg-stone-950 text-stone-100 border-stone-800' : 'bg-white text-stone-900 border-stone-200'} rounded-3xl border shadow-2xl flex flex-col overflow-hidden transition-colors duration-200`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* COMPREHENSIVE HEADER & FILTER SECTION WITH ARTISTIC DURGA PUJA / METRO BANNER */}
        <div className={`relative z-30 shrink-0 border-b ${isDark ? 'border-stone-800' : 'border-stone-200/80'} overflow-visible`}>
          {/* Background Illustration - strictly clipped inside rounded top header corners */}
          <div className="absolute inset-0 overflow-hidden rounded-t-3xl pointer-events-none">
            <div 
              className="absolute inset-0 bg-cover bg-no-repeat"
              style={{ 
                backgroundImage: `url('/brand/kolkata-metro-header-bg.jpg')`,
                backgroundPosition: 'center 42%'
              }}
            />
            {/* Subtle Festive Wash - Vivid & Highly Visible Artwork in Both Light & Dark Theme */}
            <div className={`absolute inset-0 transition-opacity duration-300 ${isDark ? 'bg-gradient-to-r from-black/85 via-black/70 to-black/60' : 'bg-gradient-to-r from-white/55 via-white/35 to-white/20'}`} />
            <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-t from-black/70 via-transparent to-transparent' : 'bg-gradient-to-t from-white/40 via-transparent to-transparent'}`} />
          </div>

          {/* Interactive Header & Search Content */}
          <div className="relative z-10">
            {/* TOP HEADER: MODERN TRANSIT COMMAND BAR */}
            <div className={`px-4 py-3 sm:px-6 sm:py-3.5 border-b ${isDark ? 'border-white/10' : 'border-stone-200/50'} flex items-center justify-between gap-4`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-stone-900 via-stone-800 to-stone-950 text-white flex items-center justify-center shadow-lg shadow-stone-900/25 ring-1 ring-amber-400/50 shrink-0">
                  <Train className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className={`text-base sm:text-lg font-extrabold tracking-tight ${isDark ? 'text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]' : 'text-stone-950 drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]'}`}>
                      Kolkata Metro Explorer
                    </h2>
                  </div>
                  <p className={`text-[11px] sm:text-xs font-semibold ${isDark ? 'text-stone-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]' : 'text-stone-900 drop-shadow-[0_1px_2px_rgba(255,255,255,0.85)]'}`}>
                    Official Schematic Transit Network &bull; Durga Puja Pandal Connections
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all cursor-pointer hover:rotate-90 backdrop-blur-sm shadow-md border ${
                  isDark 
                    ? 'bg-stone-900/90 hover:bg-stone-800 text-stone-300 hover:text-white border-stone-700' 
                    : 'bg-white/95 hover:bg-white text-stone-800 hover:text-stone-950 border-stone-300/90'
                }`}
                aria-label="Close Metro Map"
              >
                <X className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </button>
            </div>

            {/* SUB-HEADER: TRANSIT FILTER PILLS (TOP) & CURVED SEARCH BAR (BELOW) */}
            <div className="px-3 sm:px-5 py-2.5 flex flex-col gap-2">
              {/* Row 1: Line Filter Segmented Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 w-full">
                <button
                  type="button"
                  onClick={() => setLineFilter('all')}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold h-7.5 flex items-center shrink-0 cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200 ${
                    lineFilter === 'all'
                      ? (isDark ? 'bg-amber-400 text-stone-950 font-bold shadow-amber-400/20 shadow-sm' : 'bg-stone-900 text-white shadow-xs')
                      : (isDark 
                          ? 'bg-stone-900/90 backdrop-blur-sm text-stone-300 border border-stone-700 hover:bg-stone-800 hover:text-white shadow-xs' 
                          : 'bg-white/95 backdrop-blur-sm text-stone-800 border border-stone-300/80 hover:bg-white hover:text-stone-950 shadow-xs')
                  }`}
                >
                  All 5 Lines
                </button>

                {Object.entries(METRO_FULL_MAP_DATA).map(([id, line]) => {
                  const isSelected = lineFilter === id;
                  const shortNumber = id === 'blue' ? 'L1' : id === 'green' ? 'L2' : id === 'purple' ? 'L3' : id === 'yellow' ? 'L4' : 'L6';

                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setLineFilter(isSelected ? 'all' : id)}
                      className={`px-2.5 py-1.5 rounded-full text-xs font-semibold h-7.5 shrink-0 flex items-center gap-1.5 border cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200 ${
                        isSelected
                          ? 'text-white border-transparent shadow-xs'
                          : (isDark
                              ? 'bg-stone-900/90 backdrop-blur-sm text-stone-300 border-stone-700 hover:bg-stone-800 hover:text-white shadow-xs'
                              : 'bg-white/95 backdrop-blur-sm text-stone-800 border border-stone-300/80 hover:bg-white hover:text-stone-950 shadow-xs')
                      }`}
                      style={{
                        backgroundColor: isSelected ? line.color : undefined,
                        boxShadow: isSelected ? `0 2px 8px ${line.glowColor}` : undefined
                      }}
                    >
                      <span 
                        className="w-1.5 h-1.5 rounded-full shrink-0 group-hover:scale-125 transition-transform" 
                        style={{ backgroundColor: isSelected ? '#FFFFFF' : line.color }} 
                      />
                      <span>{line.name.split(' ')[0]}</span>
                      <span 
                        className={`text-[9px] px-1.5 py-0.5 rounded-full font-mono font-bold leading-none ${
                          isSelected ? 'bg-white/25 text-white' : (isDark ? 'bg-stone-800 text-stone-400' : 'bg-stone-100 text-stone-500')
                        }`}
                      >
                        {shortNumber}
                      </span>
                    </button>
                  );
                })}

                <div className={`w-px h-4 mx-0.5 hidden sm:block shrink-0 ${isDark ? 'bg-stone-700' : 'bg-stone-300/80'}`} />

                <button
                  type="button"
                  onClick={() => setShowOperationalOnly(!showOperationalOnly)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium h-7.5 shrink-0 border cursor-pointer flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-all duration-200 ${
                    showOperationalOnly
                      ? (isDark ? 'bg-amber-950/80 text-amber-300 border-amber-800 shadow-2xs' : 'bg-amber-100 text-amber-900 border-amber-300 shadow-2xs')
                      : (isDark 
                          ? 'bg-stone-900/90 backdrop-blur-sm text-stone-300 border-stone-700 hover:bg-stone-800' 
                          : 'bg-white/95 backdrop-blur-sm text-stone-800 border border-stone-300/80 hover:bg-white shadow-xs')
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${showOperationalOnly ? 'bg-amber-500' : (isDark ? 'bg-stone-600' : 'bg-stone-400')}`} />
                  <span>{showOperationalOnly ? 'Operational Only' : 'Include Planned'}</span>
                </button>
              </div>

              {/* Row 2: Curved Search Bar with Generous Padding & Non-Clipped Dropdown */}
              <div ref={searchContainerRef} className="relative z-50 w-full">
                <Search className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${isDark ? 'text-stone-400' : 'text-stone-500'}`} />
                <input
                  type="text"
                  value={mapSearchQuery}
                  onFocus={() => setIsSearchFocused(true)}
                  onChange={(e) => {
                    const val = e.target.value;
                    setMapSearchQuery(val);
                    setIsSearchFocused(true);
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
                  placeholder="Search station (e.g. Esplanade, Kalighat, Salt Lake...)"
                  className={`w-full h-10 pl-10 pr-9 py-2 rounded-full text-xs sm:text-[13px] focus:outline-none focus:ring-2 shadow-xs transition-all backdrop-blur-sm border ${
                    isDark 
                      ? 'bg-stone-900/95 border-stone-700 text-stone-100 placeholder-stone-400 focus:border-amber-400 focus:ring-amber-400/25 focus:bg-stone-900' 
                      : 'bg-white/95 border-stone-300/90 text-stone-900 placeholder-stone-500 focus:border-amber-500 focus:ring-amber-500/25 focus:bg-white'
                  }`}
                />
                {mapSearchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setMapSearchQuery('');
                      setUserHereStation(null);
                      setIsSearchFocused(false);
                    }}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer p-1 transition-colors ${isDark ? 'text-stone-400 hover:text-white' : 'text-stone-400 hover:text-stone-700'}`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Dropdown Suggestions: Stations (Floats Over Map Image With High Z-Index) */}
                {(isSearchFocused || mapSearchQuery.trim().length > 0) && searchMatchedStations.length > 0 && (
                  <div className={`absolute top-full left-0 right-0 mt-2 rounded-2xl shadow-2xl overflow-hidden max-h-72 overflow-y-auto divide-y z-[100] border backdrop-blur-xl ${
                    isDark 
                      ? 'bg-stone-900 border-stone-700 divide-stone-800 text-stone-100 shadow-2xl shadow-black/80' 
                      : 'bg-white border-stone-200 divide-stone-100 text-stone-900 shadow-2xl shadow-stone-900/20'
                  }`}>
                    {/* Header inside dropdown */}
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
            </div>
          </div>
        </div>

        {/* FULL-HEIGHT IMMERSIVE MAP VIEW - CLEAN CANVAS */}
        <div className={`relative flex-1 w-full h-full overflow-hidden transition-colors duration-300 ${isDark ? 'bg-[#0e0d0b]' : 'bg-white'}`}>
          
          {/* Map Zoom & Theme Controls (Top-Right Floating Glass Capsule) */}
          <div className={`absolute top-3.5 right-3.5 sm:right-4 z-20 flex flex-col gap-1 p-1 rounded-2xl backdrop-blur-md border shadow-md pointer-events-auto transition-colors ${
            isDark ? 'bg-stone-900/90 border-stone-700 text-stone-200' : 'bg-white/90 border-stone-200/90 text-stone-700'
          }`}>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(3.0, z + 0.25))}
              className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-150 cursor-pointer active:scale-85 hover:scale-110 ${
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
                  const nextZ = Math.max(1.0, z - 0.25);
                  if (nextZ <= 1.05) setPan({ x: 0, y: 0 });
                  return nextZ;
                });
              }}
              className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-150 cursor-pointer active:scale-85 hover:scale-110 ${
                isDark ? 'hover:bg-stone-800 text-stone-200 hover:text-white' : 'hover:bg-stone-100 text-stone-700 hover:text-stone-950'
              }`}
              title="Zoom Out (Fixed at full view)"
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
            <div className={`w-full h-px ${isDark ? 'bg-stone-800' : 'bg-stone-100'}`} />
            {/* Quick Map Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-150 cursor-pointer active:scale-85 hover:scale-110 group ${
                isDark ? 'hover:bg-stone-800 text-amber-400' : 'hover:bg-stone-100 text-stone-600 hover:text-stone-950'
              }`}
              title={isDark ? "Switch to Light Map Theme" : "Switch to Dark Map Theme"}
            >
              {isDark ? (
                <Sun className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90 group-hover:scale-115 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 transition-transform duration-300 group-hover:-rotate-20 group-hover:scale-115 text-stone-700" />
              )}
            </button>
          </div>

          {/* SVG Interactive Canvas */}
          <div 
            ref={canvasRef}
            className="w-full h-full cursor-grab active:cursor-grabbing overflow-hidden relative flex items-center justify-center touch-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 1050 1350"
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

              {/* Clean Base Plate (White in light mode, Dark Charcoal in dark mode) */}
              <rect width="1050" height="1350" fill={isDark ? '#0c0a09' : '#FFFFFF'} />

              {/* 1. ARTWORK BACKGROUND: Illustrated Kolkata Map - Rich Nocturnal Scene in Dark Mode */}
              <image
                href="/brand/kolkata-art-map.jpg"
                x="0"
                y="0"
                width="1050"
                height="1350"
                preserveAspectRatio="none"
                opacity={isDark ? 0.35 : 0.42}
                style={{
                  filter: isDark ? 'brightness(0.52) contrast(1.12) saturate(0.88)' : undefined
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
                      setSelectedStation(station);
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

          {/* Station Inspector Floating Drawer */}
          {selectedStation && (
            <div className={`absolute bottom-20 sm:bottom-8 left-3 sm:left-6 z-40 w-[calc(100%-1.5rem)] sm:w-[360px] max-w-[360px] max-h-[calc(100%-120px)] sm:max-h-[calc(100%-60px)] overflow-y-auto p-4 sm:p-5 rounded-3xl backdrop-blur-xl border shadow-2xl transition-all animate-in fade-in slide-in-from-bottom-4 duration-200 ${
              isDark ? 'bg-stone-900/98 border-stone-700 text-stone-100 shadow-2xl shadow-black/80' : 'bg-white/98 border-stone-200 text-stone-900 shadow-2xl shadow-stone-950/20'
            }`}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span 
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: METRO_FULL_MAP_DATA[selectedStation.line].color }}
                    />
                    <span 
                      className="text-[10px] font-mono font-bold uppercase tracking-wider text-white px-2 py-0.5 rounded-md"
                      style={{ backgroundColor: METRO_FULL_MAP_DATA[selectedStation.line].color }}
                    >
                      {METRO_FULL_MAP_DATA[selectedStation.line].name.split(' ')[0]} Line
                    </span>
                    {selectedStation.isInterchange && (
                      <span className={`text-[9.5px] font-mono font-bold uppercase px-1.5 py-0.5 rounded-md border ${
                        isDark ? 'bg-amber-950/80 text-amber-300 border-amber-800' : 'bg-amber-100 text-amber-800 border-amber-300'
                      }`}>
                        Interchange
                      </span>
                    )}
                  </div>
                  <h3 className={`text-base sm:text-lg font-bold leading-tight font-editorial ${isDark ? 'text-white' : 'text-stone-900'}`}>
                    {selectedStation.name}
                  </h3>
                  <p className={`text-xs font-medium ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
                    {selectedStation.bengaliName}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedStation(null)}
                  className={`p-1 rounded-full cursor-pointer transition-colors ${
                    isDark ? 'hover:bg-stone-800 text-stone-400 hover:text-white' : 'hover:bg-stone-100 text-stone-400 hover:text-stone-700'
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Connected Pandals List */}
              <div className={`mt-3 pt-3 border-t space-y-2 ${isDark ? 'border-stone-800' : 'border-stone-100'}`}>
                <div className={`text-[10.5px] font-mono uppercase tracking-wider flex items-center gap-1 font-bold ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>Iconic Pandals Connected:</span>
                </div>

                {selectedStation.nearbyPandals && selectedStation.nearbyPandals.length > 0 ? (
                  <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                    {selectedStation.nearbyPandals.map((pandal, idx) => (
                      <Link
                        key={idx}
                        href={`/pandal/${pandal.slug}`}
                        className={`flex items-center justify-between p-2 rounded-xl text-xs transition-colors group/item border ${
                          isDark 
                            ? 'bg-stone-800/60 hover:bg-stone-800 border-stone-700/80 text-stone-200' 
                            : 'bg-stone-50 hover:bg-stone-100 border-stone-200/60 text-stone-800'
                        }`}
                      >
                        <span className={`font-bold truncate ${isDark ? 'group-hover/item:text-amber-400' : 'group-hover/item:text-[#D8261C]'}`}>
                          {pandal.name}
                        </span>
                        <span className={`text-[10px] font-mono font-semibold shrink-0 ml-2 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                          {pandal.distance}
                        </span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className={`text-xs italic ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                    Transit corridor connecting North, Central, and South Kolkata pujo circuits.
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className={`flex items-center gap-2 mt-3 pt-3 border-t ${isDark ? 'border-stone-800' : 'border-stone-100'}`}>
                <button
                  type="button"
                  onClick={() => handleSelectHereStation(selectedStation)}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#D8261C] hover:bg-[#B91C1C] text-white text-xs font-bold font-mono text-center flex items-center justify-center gap-1 shadow-xs transition-colors cursor-pointer"
                >
                  <span>📍 Set &quot;You Are Here&quot;</span>
                </button>
                <Link
                  href={`/map`}
                  className={`py-2 px-3 rounded-xl text-xs font-bold font-mono text-center transition-colors ${
                    isDark 
                      ? 'bg-stone-800 hover:bg-stone-700 text-stone-200' 
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
                  }`}
                >
                  <span>Live Map →</span>
                </Link>
              </div>
            </div>
          )}

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
}
