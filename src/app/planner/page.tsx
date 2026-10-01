'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PANDALS_DATA } from '@/data/pandals';
import { useWishlist } from '@/context/WishlistContext';
import { 
  Route, 
  Plus, 
  Trash2, 
  ArrowDown, 
  MapPin, 
  Train, 
  Footprints, 
  Clock, 
  ExternalLink, 
  Sparkles,
  Share2,
  Check
} from 'lucide-react';
import { calculateDistanceKm, formatDistance, buildGoogleMapsUrl } from '@/lib/geo';

export default function RoutePlannerPage() {
  const { wishlist } = useWishlist();

  // Selected pandal IDs in order
  const [selectedIds, setSelectedIds] = useState<string[]>(() => {
    if (wishlist.length > 0) {
      return wishlist.slice(0, 5);
    }
    // Default starter itinerary
    return ['bagbazar-sarbojanin', 'kumartuli-park', 'college-square', 'maddox-square'];
  });

  const [addDropdownOpen, setAddDropdownOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Ordered list of selected pandals
  const selectedPandals = useMemo(() => {
    return selectedIds
      .map((id) => PANDALS_DATA.find((p) => p.id === id))
      .filter(Boolean) as typeof PANDALS_DATA;
  }, [selectedIds]);

  // Available pandals to add
  const availableToAdd = useMemo(() => {
    return PANDALS_DATA.filter((p) => !selectedIds.includes(p.id));
  }, [selectedIds]);

  // Route calculations (distances & estimated hops)
  const routeStats = useMemo(() => {
    let totalKm = 0;
    for (let i = 0; i < selectedPandals.length - 1; i++) {
      const p1 = selectedPandals[i];
      const p2 = selectedPandals[i + 1];
      totalKm += calculateDistanceKm(p1.latitude, p1.longitude, p2.latitude, p2.longitude);
    }

    const estimatedMins = Math.round(totalKm * 12 + selectedPandals.length * 35); // transit + viewing time

    return {
      totalDistance: totalKm.toFixed(1),
      estimatedHours: (estimatedMins / 60).toFixed(1),
      totalStops: selectedPandals.length
    };
  }, [selectedPandals]);

  const handleAddPandal = (id: string) => {
    setSelectedIds([...selectedIds, id]);
    setAddDropdownOpen(false);
  };

  const handleRemovePandal = (id: string) => {
    setSelectedIds(selectedIds.filter((x) => x !== id));
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const copy = [...selectedIds];
    const temp = copy[index - 1];
    copy[index - 1] = copy[index];
    copy[index] = temp;
    setSelectedIds(copy);
  };

  // Build full multi-stop Google Maps URL
  const fullGoogleMapsRouteUrl = useMemo(() => {
    if (selectedPandals.length === 0) return 'https://maps.google.com';
    const origin = `${selectedPandals[0].latitude},${selectedPandals[0].longitude}`;
    const destination = `${selectedPandals[selectedPandals.length - 1].latitude},${selectedPandals[selectedPandals.length - 1].longitude}`;
    
    if (selectedPandals.length <= 2) {
      return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=transit`;
    }

    const waypoints = selectedPandals
      .slice(1, selectedPandals.length - 1)
      .map((p) => `${p.latitude},${p.longitude}`)
      .join('|');

    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${waypoints}&travelmode=transit`;
  }, [selectedPandals]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E9E2D8]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D43827]/10 text-[#D43827] text-xs font-mono mb-2 border border-[#D43827]/20">
            <Route className="w-3.5 h-3.5" />
            <span>Interactive Pandal Hopping</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-editorial text-[#181513]">
            Plan My Pujo Itinerary
          </h1>
          <p className="text-xs sm:text-sm text-[#5C554E] mt-1">
            Build a sequential route across Kolkata with Metro hops, walking distances, and multi-stop Google Maps navigation.
          </p>
        </div>

        {selectedPandals.length > 0 && (
          <a
            href={fullGoogleMapsRouteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-2xl bg-[#D43827] hover:bg-[#B52819] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-[#D43827]/30 transition-all active:scale-95 shrink-0"
          >
            <MapPin className="w-4 h-4" />
            <span>Open Entire Route in Maps</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>
        )}
      </div>

      {/* Itinerary Summary Bar */}
      {selectedPandals.length > 0 && (
        <div className="grid grid-cols-3 gap-3 bg-white rounded-2xl border border-[#E9E2D8] p-4 shadow-xs text-center">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#8E857B] block">
              Total Pandals
            </span>
            <span className="text-lg font-bold text-[#181513]">
              {routeStats.totalStops} Stops
            </span>
          </div>
          <div className="border-x border-[#E9E2D8]">
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#8E857B] block">
              Transit Span
            </span>
            <span className="text-lg font-bold text-[#D43827]">
              {routeStats.totalDistance} km
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#8E857B] block">
              Est. Duration
            </span>
            <span className="text-lg font-bold text-[#181513]">
              ~{routeStats.estimatedHours} hrs
            </span>
          </div>
        </div>
      )}

      {/* Step by Step Route Chain */}
      <div className="space-y-4">
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

          return (
            <React.Fragment key={pandal.id}>
              {/* Pandal Stop Card */}
              <div className="bg-white rounded-3xl border border-[#E9E2D8] p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                <div className="flex items-start gap-4">
                  {/* Step Number Badge */}
                  <div className="w-10 h-10 rounded-2xl bg-[#181513] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                    {index + 1}
                  </div>

                  <div className="w-16 h-16 rounded-2xl overflow-hidden relative shrink-0">
                    <Image
                      src={pandal.featured_image}
                      alt={pandal.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FAF8F5] border border-[#E2DAD0] font-semibold text-[#181513]">
                        {pandal.area}
                      </span>
                      <span className="text-xs text-[#8E857B]">
                        {pandal.locality}
                      </span>
                    </div>

                    <Link
                      href={`/pandal/${pandal.slug}`}
                      className="text-base sm:text-lg font-bold font-editorial text-[#181513] hover:text-[#D43827] transition-colors"
                    >
                      {pandal.name}
                    </Link>

                    <div className="flex items-center gap-2 text-xs text-[#5C554E]">
                      <Train className="w-3.5 h-3.5 text-blue-600" />
                      <span>{pandal.nearest_metro} ({pandal.walking_distance.split(' ')[0]})</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between sm:justify-end gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#E9E2D8]">
                  {index > 0 && (
                    <button
                      onClick={() => handleMoveUp(index)}
                      className="px-2.5 py-1.5 rounded-xl border border-[#E2DAD0] hover:bg-[#FAF8F5] text-xs font-semibold text-[#5C554E]"
                      title="Move up in route order"
                    >
                      ↑ Move Up
                    </button>
                  )}

                  <a
                    href={buildGoogleMapsUrl(pandal.latitude, pandal.longitude, pandal.google_place_id, pandal.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl border border-[#E2DAD0] hover:border-[#D43827] text-xs text-[#181513]"
                    title="Open single spot in Google Maps"
                  >
                    <MapPin className="w-4 h-4 text-[#D43827]" />
                  </a>

                  <button
                    onClick={() => handleRemovePandal(pandal.id)}
                    className="p-2.5 rounded-xl border border-[#E2DAD0] hover:bg-rose-50 hover:border-rose-300 text-rose-600 text-xs"
                    title="Remove from itinerary"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>

              {/* Transit Connector between Stops */}
              {!isLast && nextPandal && (
                <div className="flex items-center justify-center my-1">
                  <div className="px-4 py-2 rounded-2xl bg-[#FAF8F5] border border-[#E9E2D8] flex items-center gap-2 text-xs text-[#5C554E] shadow-2xs">
                    <Train className="w-3.5 h-3.5 text-blue-600" />
                    <span>Metro / Transit hop:</span>
                    <span className="font-bold text-[#181513]">
                      {distanceToNext < 1 ? `${Math.round(distanceToNext * 1000)}m` : `${distanceToNext.toFixed(1)} km`}
                    </span>
                    <ArrowDown className="w-3.5 h-3.5 text-[#D43827]" />
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Add Pandal to Itinerary */}
      <div className="relative pt-4">
        {availableToAdd.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => setAddDropdownOpen(!addDropdownOpen)}
              className="px-5 py-3 rounded-2xl bg-white border border-[#D8CEBF] hover:border-[#181513] text-xs font-bold text-[#181513] flex items-center gap-2 shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4 text-[#D43827]" />
              <span>Add Another Pandal to Itinerary</span>
            </button>
          </div>
        )}

        {/* Dropdown list */}
        {addDropdownOpen && (
          <div className="mt-3 p-3 bg-white rounded-2xl border border-[#D8CEBF] shadow-xl max-h-72 overflow-y-auto no-scrollbar space-y-1">
            {availableToAdd.map((p) => (
              <button
                key={p.id}
                onClick={() => handleAddPandal(p.id)}
                className="w-full text-left p-2.5 rounded-xl hover:bg-[#FAF8F5] flex items-center justify-between text-xs transition-colors"
              >
                <div>
                  <span className="font-bold text-[#181513]">{p.name}</span>
                  <span className="text-[#8E857B] ml-2">({p.area} • {p.nearest_metro})</span>
                </div>
                <Plus className="w-4 h-4 text-[#D43827]" />
              </button>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
