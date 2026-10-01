'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Pandal, MetroStation } from '@/types';
import { buildGoogleMapsUrl } from '@/lib/geo';
import { MapPin, Train, ExternalLink, Heart, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface InteractiveMapProps {
  pandals: Pandal[];
  metroStations?: MetroStation[];
  selectedPandalId?: string | null;
  onSelectPandal?: (pandal: Pandal) => void;
  heightClass?: string;
  initialCenter?: [number, number];
  initialZoom?: number;
}

export default function InteractiveMap({
  pandals,
  metroStations = [],
  selectedPandalId,
  onSelectPandal,
  heightClass = 'h-[550px]',
  initialCenter = [22.5600, 88.3639], // Central Kolkata default
  initialZoom = 12
}: InteractiveMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [activePandal, setActivePandal] = useState<Pandal | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Sync selected pandal prop
  useEffect(() => {
    if (selectedPandalId) {
      const match = pandals.find((p) => p.id === selectedPandalId);
      if (match) {
        setActivePandal(match);
        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo([match.latitude, match.longitude], 15, {
            duration: 1.2
          });
        }
      }
    }
  }, [selectedPandalId, pandals]);

  useEffect(() => {
    if (!isClient || !mapContainerRef.current) return;

    let isMounted = true;

    // Dynamically import Leaflet to avoid SSR window errors
    import('leaflet').then((L) => {
      if (!isMounted || !mapContainerRef.current) return;

      // Import Leaflet CSS dynamically if not present
      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link');
        link.id = 'leaflet-css';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }

      // Initialize map instance if not already initialized
      if (!mapInstanceRef.current) {
        const map = L.map(mapContainerRef.current, {
          center: initialCenter,
          zoom: initialZoom,
          zoomControl: false
        });

        // Add sleek muted CartoDB Positron / OSM tiles for an editorial look
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap',
          maxZoom: 19
        }).addTo(map);

        L.control.zoom({ position: 'bottomright' }).addTo(map);
        mapInstanceRef.current = map;
      }

      const map = mapInstanceRef.current;

      // Clear existing markers
      markersRef.current.forEach((m) => map.removeLayer(m));
      markersRef.current = [];

      // Add Metro Station Markers
      metroStations.forEach((station) => {
        const isBlue = station.line_code === 'blue';
        const metroIcon = L.divIcon({
          className: 'metro-pin',
          html: `
            <div style="background-color: ${isBlue ? '#2563EB' : '#059669'}; color: white; width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: bold; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.25);">
              M
            </div>
          `,
          iconSize: [26, 26],
          iconAnchor: [13, 13]
        });

        const metroMarker = L.marker([station.latitude, station.longitude], { icon: metroIcon })
          .addTo(map)
          .bindTooltip(`<b>${station.name} Metro</b><br/><span style="font-size: 10px; color: #666;">${station.line}</span>`, {
            direction: 'top',
            offset: [0, -10]
          });

        markersRef.current.push(metroMarker);
      });

      // Add Pandal Markers
      pandals.forEach((pandal) => {
        const isSelected = pandal.id === selectedPandalId;
        const pandalIcon = L.divIcon({
          className: 'pandal-pin',
          html: `
            <div style="position: relative;">
              <div style="background: ${isSelected ? '#181513' : '#D43827'}; color: white; width: ${isSelected ? '36px' : '30px'}; height: ${isSelected ? '36px' : '30px'}; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 4px 10px rgba(212,56,39,0.4); cursor: pointer; transition: transform 0.2s;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              ${isSelected ? '<span style="position: absolute; top: -4px; left: -4px; right: -4px; bottom: -4px; border-radius: 50%; border: 2px solid #D43827; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>' : ''}
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });

        const marker = L.marker([pandal.latitude, pandal.longitude], { icon: pandalIcon }).addTo(map);

        marker.on('click', () => {
          setActivePandal(pandal);
          if (onSelectPandal) {
            onSelectPandal(pandal);
          }
          map.flyTo([pandal.latitude, pandal.longitude], 15, { duration: 0.8 });
        });

        markersRef.current.push(marker);
      });
    });

    return () => {
      isMounted = false;
    };
  }, [isClient, pandals, metroStations, selectedPandalId, onSelectPandal]);

  return (
    <div className={`relative w-full ${heightClass} rounded-2xl overflow-hidden border border-[#E2DAD0] dark:border-white/10 shadow-sm bg-[#FAF8F5] dark:bg-[#12090F]`}>
      
      {/* Map container DOM element */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Map Legend Overlay */}
      <div className="absolute top-3 left-3 z-[400] glass-card px-3 py-2 rounded-xl border border-[#E2DAD0] dark:border-white/10 dark:bg-[#1A1218]/90 text-[11px] shadow-sm flex items-center gap-3 backdrop-blur-md">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#D43827] border-2 border-white dark:border-[#2C1F2A] shadow-xs inline-block" />
          <span className="font-medium text-[#181513] dark:text-stone-200">Durga Puja Pandal</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-blue-600 border-2 border-white dark:border-[#2C1F2A] shadow-xs inline-block" />
          <span className="font-medium text-[#181513] dark:text-stone-200">Metro Station</span>
        </div>
      </div>

      {/* Floating Selected Pandal Quick Card (Popup Preview) */}
      {activePandal && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-[400] bg-white dark:bg-[#1C141B] rounded-2xl p-4 shadow-xl border border-[#E2DAD0] dark:border-white/10 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <span className="text-[10px] uppercase font-mono font-semibold text-[#D43827] dark:text-rose-400">
                {activePandal.area}
              </span>
              <h4 className="text-sm font-bold font-editorial text-[#181513] dark:text-white line-clamp-1">
                {activePandal.name}
              </h4>
            </div>
            <button
              onClick={() => setActivePandal(null)}
              className="text-[#8E857B] hover:text-[#181513] dark:text-stone-400 dark:hover:text-stone-200 text-xs p-1"
            >
              ✕
            </button>
          </div>

          <p className="text-xs text-[#5C554E] dark:text-stone-300 line-clamp-2 mb-2.5">
            {activePandal.theme}
          </p>

          <div className="flex items-center justify-between text-[11px] text-[#5C554E] dark:text-stone-300 mb-3 py-1.5 px-2 bg-[#FAF8F5] dark:bg-white/[0.04] border border-transparent dark:border-white/5 rounded-lg">
            <span className="flex items-center gap-1">
              <Train className="w-3 h-3 text-blue-600 dark:text-blue-400" />
              {activePandal.nearest_metro}
            </span>
            <span className="font-semibold text-[#D43827] dark:text-rose-400">
              {activePandal.walking_time_mins} min walk
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/pandal/${activePandal.slug}`}
              className="flex-1 py-2 px-3 rounded-xl bg-[#D8261C] hover:bg-[#B91C1C] text-white text-xs font-semibold text-center flex items-center justify-center gap-1 shadow-xs transition-colors"
            >
              <span>Details</span>
              <ArrowUpRight className="w-3 h-3 text-amber-200" />
            </Link>

            <a
              href={buildGoogleMapsUrl(
                activePandal.latitude,
                activePandal.longitude,
                activePandal.google_place_id,
                activePandal.name
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3 rounded-xl border border-[#D8CEBF] dark:border-white/10 bg-[#FAF8F5] dark:bg-white/[0.04] text-[#181513] dark:text-stone-200 text-xs font-semibold flex items-center justify-center gap-1 hover:border-[#D43827] dark:hover:border-rose-400 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-[#D43827] dark:text-rose-400" />
              <span>Maps</span>
            </a>
          </div>
        </div>
      )}

    </div>
  );
}
