'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Pandal, MetroStation } from '@/types';
import { buildGoogleMapsUrl } from '@/lib/geo';
import { MapPin, Train, ExternalLink, Heart, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';

interface InteractiveMapProps {
  pandals: Pandal[];
  metroStations?: MetroStation[];
  selectedPandalId?: string | null;
  onSelectPandal?: (pandal: Pandal) => void;
  userStationId?: string | null;
  heightClass?: string;
  initialCenter?: [number, number];
  initialZoom?: number;
}

export default function InteractiveMap({
  pandals,
  metroStations = [],
  selectedPandalId,
  onSelectPandal,
  userStationId,
  heightClass = 'h-[550px]',
  initialCenter = [22.5600, 88.3639], // Central Kolkata default
  initialZoom = 12
}: InteractiveMapProps) {
  const { theme } = useTheme();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const tileLayerRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Update map tile layer when theme toggles
  useEffect(() => {
    if (tileLayerRef.current) {
      const tileUrl = theme === 'dark'
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
      tileLayerRef.current.setUrl(tileUrl);
    }
  }, [theme]);

  // Sync selected pandal prop
  useEffect(() => {
    if (selectedPandalId) {
      const match = pandals.find((p) => p.id === selectedPandalId);
      if (match) {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo([match.latitude, match.longitude], 15, {
            duration: 1.2
          });
        }
      }
    }
  }, [selectedPandalId, pandals]);

  // Sync userStationId prop (fly to station when user enters metro station name)
  useEffect(() => {
    if (userStationId) {
      const match = metroStations.find((s) => s.id === userStationId);
      if (match && mapInstanceRef.current) {
        mapInstanceRef.current.flyTo([match.latitude, match.longitude], 16, {
          duration: 1.2
        });
      }
    }
  }, [userStationId, metroStations]);

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
          zoomControl: false,
          touchZoom: true,
          scrollWheelZoom: true,
          doubleClickZoom: true,
          boxZoom: true,
        });

        // Add sleek CartoDB Dark Matter / Voyager tiles dynamically
        const tileUrl = theme === 'dark'
          ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
          : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

        const tiles = L.tileLayer(tileUrl, {
          attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap',
          maxZoom: 19
        }).addTo(map);

        tileLayerRef.current = tiles;

        L.control.zoom({ position: 'bottomright' }).addTo(map);
        mapInstanceRef.current = map;
      }

      const map = mapInstanceRef.current;

      // Clear existing markers
      markersRef.current.forEach((m) => map.removeLayer(m));
      markersRef.current = [];

      // Add Metro Station Markers
      metroStations.forEach((station) => {
        const isUserStation = station.id === userStationId;
        const isBlue = station.line_code === 'blue';
        const metroIcon = isUserStation
          ? L.divIcon({
              className: 'you-are-here-pin',
              html: `
                <div style="position: relative; display: flex; flex-direction: column; align-items: center; cursor: pointer; z-index: 1000;">
                  <!-- Floating Label -->
                  <div style="background: linear-gradient(135deg, #181513, #D8261C); color: #FFF; padding: 4px 10px; border-radius: 9999px; font-size: 11px; font-weight: 800; border: 2px solid #FDE047; box-shadow: 0 4px 14px rgba(216, 38, 28, 0.55); white-space: nowrap; display: flex; align-items: center; gap: 4px;">
                    <span style="font-size: 13px;">📍</span>
                    <span>YOU ARE HERE</span>
                  </div>
                  <!-- Marker Pin -->
                  <div style="position: relative; margin-top: 4px;">
                    <div style="width: 32px; height: 32px; border-radius: 50%; background: #D8261C; border: 3px solid #FFF; box-shadow: 0 2px 10px rgba(216, 38, 28, 0.6); display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; font-weight: 900;">
                      M
                    </div>
                    <div style="position: absolute; inset: -8px; border-radius: 50%; border: 3px solid #F59E0B; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite; pointer-events: none;"></div>
                  </div>
                </div>
              `,
              iconSize: [120, 62],
              iconAnchor: [60, 58]
            })
          : L.divIcon({
              className: 'metro-pin',
              html: `
                <div style="background-color: ${isBlue ? '#2563EB' : '#059669'}; color: white; width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: bold; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.25);">
                  M
                </div>
              `,
              iconSize: [26, 26],
              iconAnchor: [13, 13]
            });

        const metroMarker = L.marker([station.latitude, station.longitude], { 
          icon: metroIcon,
          zIndexOffset: isUserStation ? 1000 : 0
        })
          .addTo(map)
          .bindTooltip(`<b>${isUserStation ? '📍 You Are Here: ' : ''}${station.name} Metro</b><br/><span style="font-size: 10px; color: #666;">${station.line}</span>`, {
            direction: 'top',
            offset: [0, isUserStation ? -38 : -10],
            permanent: isUserStation
          });

        metroMarker.on('click', () => {
          map.flyTo([station.latitude, station.longitude], 16, { duration: 0.8 });
        });

        markersRef.current.push(metroMarker);
      });

      // Draw Metro Route Track Lines connecting stations
      const blueStations = metroStations
        .filter((s) => s.line_code === 'blue')
        .sort((a, b) => b.latitude - a.latitude);

      if (blueStations.length > 1) {
        const blueCoords: [number, number][] = blueStations.map((s) => [s.latitude, s.longitude]);
        const blueLine = L.polyline(blueCoords, {
          color: '#2563EB',
          weight: 4,
          opacity: 0.8,
          lineCap: 'round',
          lineJoin: 'round'
        }).addTo(map);
        markersRef.current.push(blueLine);
      }

      const greenStations = metroStations
        .filter((s) => s.line_code === 'green')
        .sort((a, b) => a.longitude - b.longitude);

      if (greenStations.length > 1) {
        const greenCoords: [number, number][] = greenStations.map((s) => [s.latitude, s.longitude]);
        const greenLine = L.polyline(greenCoords, {
          color: '#059669',
          weight: 4,
          opacity: 0.8,
          lineCap: 'round',
          lineJoin: 'round'
        }).addTo(map);
        markersRef.current.push(greenLine);
      }

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

        const cleanDist = pandal.walking_distance.includes('km')
          ? pandal.walking_distance
          : (pandal.walking_distance.endsWith('m') ? pandal.walking_distance : `${pandal.walking_distance}m`);

        const popupHtml = `
          <div style="font-family: inherit; padding: 4px 2px; min-width: 170px;">
            <div style="font-size: 13px; font-weight: 700; color: #181513; margin-bottom: 2px;">${pandal.name}</div>
            <div style="font-size: 11px; color: #666; margin-bottom: 4px;">${pandal.area} • ${pandal.locality || ''}</div>
            <div style="font-size: 11px; font-weight: 600; color: #D8261C; margin-bottom: 6px;">🚇 ${pandal.nearest_metro} • 🚶 ${cleanDist}</div>
            <a href="/pandal/${pandal.slug}" style="display: inline-block; font-size: 11px; font-weight: 700; color: #D8261C; text-decoration: underline;">View Details →</a>
          </div>
        `;
        marker.bindPopup(popupHtml, { offset: [0, -10] });

        marker.on('click', () => {
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
  }, [isClient, pandals, metroStations, selectedPandalId, onSelectPandal, userStationId]);

  return (
    <div className={`relative w-full ${heightClass} rounded-2xl border border-[#E2DAD0] dark:border-white/10 shadow-sm bg-[#FAF8F5] dark:bg-[#12090F]`}>
      
      {/* Map container DOM element — no overflow-hidden so pinch zoom touch events aren't blocked */}
      <div ref={mapContainerRef} className="w-full h-full rounded-2xl" />

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
        {userStationId && (
          <div className="flex items-center gap-1 font-bold text-[#D8261C] dark:text-amber-400 border-l border-stone-200 dark:border-white/10 pl-2">
            <span>📍</span>
            <span>You Are Here</span>
          </div>
        )}
      </div>

    </div>
  );
}
