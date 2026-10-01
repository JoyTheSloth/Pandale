'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useWishlist } from '@/context/WishlistContext';
import { PANDALS_DATA } from '@/data/pandals';
import { Heart, Trash2, MapPin, Train, Route, ArrowUpRight, Compass, Sparkles, ExternalLink } from 'lucide-react';
import { buildGoogleMapsUrl } from '@/lib/geo';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();

  // Matched pandals
  const savedPandals = useMemo(() => {
    return PANDALS_DATA.filter((p) => wishlist.includes(p.id));
  }, [wishlist]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E9E2D8]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-mono mb-2 border border-rose-200">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Personal Collection</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-editorial text-[#181513]">
            My Pujo Wishlist
          </h1>
          <p className="text-xs sm:text-sm text-[#5C554E] mt-1">
            {savedPandals.length} {savedPandals.length === 1 ? 'pandal' : 'pandals'} saved for your 2026 exploration
          </p>
        </div>

        {savedPandals.length > 0 && (
          <div className="flex items-center gap-3">
            <Link
              href="/planner"
              className="px-5 py-2.5 rounded-xl bg-[#D43827] hover:bg-[#B52819] text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all active:scale-95"
            >
              <Route className="w-4 h-4" />
              <span>Turn into Route Itinerary</span>
            </Link>
          </div>
        )}
      </div>

      {/* Saved Pandals List */}
      {savedPandals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedPandals.map((pandal) => {
            const exactMapsUrl = buildGoogleMapsUrl(
              pandal.latitude,
              pandal.longitude,
              pandal.google_place_id,
              pandal.locality ? `${pandal.name}, ${pandal.locality}` : pandal.name
            );

            return (
              <div
                key={pandal.id}
                className="bg-white rounded-3xl border border-[#E9E2D8] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={pandal.featured_image}
                      alt={pandal.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                    
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 text-[#181513] backdrop-blur-sm">
                        {pandal.area}
                      </span>
                      <button
                        onClick={() => removeFromWishlist(pandal.id)}
                        title="Remove from wishlist"
                        className="p-2 rounded-full bg-black/60 hover:bg-rose-600 text-white transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="text-xs text-amber-300 font-medium">
                        {pandal.locality}
                      </div>
                      <h3 className="text-lg font-bold font-editorial text-white line-clamp-1">
                        {pandal.name}
                      </h3>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-4 space-y-3">
                    <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#EFE9DF] flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Train className="w-4 h-4 text-blue-600 shrink-0" />
                        <span className="font-semibold text-[#181513] truncate max-w-[140px]">
                          {pandal.nearest_metro}
                        </span>
                      </div>
                      <span className="text-[#D43827] font-bold">
                        {pandal.walking_time_mins} min walk ({pandal.walking_distance.split(' ')[0]})
                      </span>
                    </div>

                    <p className="text-xs text-[#5C554E] line-clamp-2">
                      {pandal.theme}
                    </p>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="p-4 pt-0 border-t border-[#FAF8F5] flex items-center gap-2">
                  <Link
                    href={`/pandal/${pandal.slug}`}
                    className="flex-1 py-2 px-3 rounded-xl bg-[#D8261C] hover:bg-[#B91C1C] text-white text-xs font-semibold text-center flex items-center justify-center gap-1 shadow-xs transition-colors"
                  >
                    <span>View Pandal</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-amber-200" />
                  </Link>

                  <a
                    href={exactMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-3 rounded-xl border border-[#D8CEBF] bg-[#FFFDF9] hover:bg-white text-[#1C1917] text-xs font-semibold flex items-center justify-center gap-1 shadow-2xs"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#D8261C]" />
                    <span>Maps</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="max-w-md mx-auto text-center py-20 px-4 space-y-4 bg-white rounded-3xl border border-[#E9E2D8] shadow-xs">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-[#D8261C] flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold font-editorial text-[#1C1917]">
            Your wishlist is empty
          </h2>
          <p className="text-xs text-[#57534E] leading-relaxed">
            Click the heart icon (♡) on any pandal card or detail page to curate your personal Kolkata Pujo 2026 tour.
          </p>
          <Link
            href="/pandals"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D8261C] text-white text-xs font-semibold hover:bg-[#B91C1C] transition-all shadow-sm"
          >
            <Compass className="w-4 h-4 text-amber-200" />
            <span>Discover Pandals</span>
          </Link>
        </div>
      )}

    </div>
  );
}
