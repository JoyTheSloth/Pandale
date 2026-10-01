import React from 'react';
import Link from 'next/link';
import { Sparkles, Train, MapPin, Heart, Shield, PhoneCall } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#181513] text-[#FAF8F5] pt-16 pb-24 md:pb-12 border-t border-[#2A2623] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#2D2925]">
          
          {/* Brand info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#D43827] flex items-center justify-center text-white font-bold">
                <Sparkles className="w-4 h-4 text-amber-200" />
              </div>
              <span className="text-xl font-bold font-editorial text-white tracking-wide">
                Pandalé 2026
              </span>
            </div>
            <p className="text-sm text-[#A69E94] leading-relaxed">
              Kolkata’s premier digital companion for Durga Puja 2026. Discover iconic pandals, navigate via Metro stations, open exact Google Maps coordinates, and save your wishlist.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-[#282421] text-amber-300 border border-amber-900/40">
                <Shield className="w-3 h-3 text-emerald-400" /> Authorized Instagram & Geolocation Ready
              </span>
            </div>
          </div>

          {/* Quick Explore */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-widest text-[#8E857B] mb-4">
              Explore Kolkata Pujo
            </h4>
            <ul className="space-y-2.5 text-sm text-[#D3CBC2]">
              <li>
                <Link href="/pandals?zone=North+Kolkata" className="hover:text-white transition-colors">
                  North Kolkata Heritage & Sabeki
                </Link>
              </li>
              <li>
                <Link href="/pandals?zone=South+Kolkata" className="hover:text-white transition-colors">
                  South Kolkata Theme Powerhouses
                </Link>
              </li>
              <li>
                <Link href="/pandals?zone=Central+Kolkata" className="hover:text-white transition-colors">
                  Central Kolkata Illumination & Squares
                </Link>
              </li>
              <li>
                <Link href="/pandals?zone=East+Kolkata" className="hover:text-white transition-colors">
                  East Kolkata & Salt Lake Circuit
                </Link>
              </li>
              <li>
                <Link href="/pandals?nearMetro=true" className="hover:text-white transition-colors">
                  Near Metro Station (&lt; 10 min walk)
                </Link>
              </li>
            </ul>
          </div>

          {/* Metro & Navigation */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-widest text-[#8E857B] mb-4">
              Metro & Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-[#D3CBC2]">
              <li>
                <Link href="/metro?line=blue" className="hover:text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  Blue Line (Dakshineswar – Kavi Subhash)
                </Link>
              </li>
              <li>
                <Link href="/metro?line=green" className="hover:text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Green Line (Howrah – Sector V)
                </Link>
              </li>
              <li>
                <Link href="/metro?line=purple" className="hover:text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-500" />
                  Purple Line (Behala Chowrasta – Esplanade)
                </Link>
              </li>
              <li>
                <Link href="/planner" className="hover:text-white transition-colors">
                  Plan My Pujo Itinerary
                </Link>
              </li>
              <li>
                <Link href="/map" className="hover:text-white transition-colors">
                  Interactive Live Map
                </Link>
              </li>
            </ul>
          </div>

          {/* Emergency & Helpline Info */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-widest text-[#8E857B] mb-4">
              Puja Help & Emergency
            </h4>
            <div className="space-y-3 text-xs text-[#D3CBC2]">
              <div className="p-3 rounded-lg bg-[#25211E] border border-[#332E2A]">
                <div className="font-semibold text-white flex items-center gap-1.5 mb-1">
                  <PhoneCall className="w-3.5 h-3.5 text-[#D43827]" />
                  Kolkata Police Puja Helpline
                </div>
                <div className="text-amber-300 font-mono text-sm">100 / 1090 / 033-2214-3230</div>
              </div>
              <div className="p-3 rounded-lg bg-[#25211E] border border-[#332E2A]">
                <div className="font-semibold text-white flex items-center gap-1.5 mb-1">
                  <Train className="w-3.5 h-3.5 text-blue-400" />
                  Kolkata Metro Rail Helpline
                </div>
                <div className="text-blue-300 font-mono text-sm">139 (Night Special Service)</div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright and notes */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8E857B] gap-4">
          <p>© 2026 Pandalé Kolkata. Built for festival explorers and pilgrims.</p>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="hover:text-white transition-colors">
              Data & Admin Management
            </Link>
            <span>•</span>
            <span>All coordinates verified against official Kolkata transit feeds</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
