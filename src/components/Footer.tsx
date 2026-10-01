import React from 'react';
import Link from 'next/link';
import { Sparkles, Train, MapPin, Heart, Shield, PhoneCall } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#450A0A] text-[#FFFDF9] pt-16 pb-24 md:pb-12 border-t-2 border-[#F59E0B]/40 mt-20 relative overflow-hidden">
      {/* Top subtle golden light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-1 bg-gradient-to-r from-transparent via-[#FDE047] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#7F1D1D]">
          
          {/* Brand info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D8261C] to-[#B91C1C] flex items-center justify-center text-white font-bold border border-[#FDE047]/40 shadow-md">
                <Sparkles className="w-4 h-4 text-[#FDE047]" />
              </div>
              <span className="text-2xl font-bold font-editorial text-white tracking-wide">
                Pandal<span className="text-[#FDE047]">é</span> 2026
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#FEF3C7]/90 leading-relaxed">
              Kolkata’s premier digital companion for Durga Puja 2026. Discover iconic pandals, navigate via Metro stations, open exact Google Maps coordinates, and save your wishlist.
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-[#7F1D1D]/70 text-[#FDE047] border border-[#F87171]/30">
                <Shield className="w-3 h-3 text-emerald-400" /> Authorized Instagram & Geolocation Ready
              </span>
            </div>
          </div>

          {/* Quick Explore */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-widest text-[#FDE68A] font-bold mb-4">
              Explore Kolkata Pujo
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FEF3C7]/80">
              <li>
                <Link href="/pandals?zone=North+Kolkata" className="hover:text-[#FDE047] transition-colors">
                  North Kolkata Heritage & Sabeki
                </Link>
              </li>
              <li>
                <Link href="/pandals?zone=South+Kolkata" className="hover:text-[#FDE047] transition-colors">
                  South Kolkata Theme Powerhouses
                </Link>
              </li>
              <li>
                <Link href="/pandals?zone=Central+Kolkata" className="hover:text-[#FDE047] transition-colors">
                  Central Kolkata Illumination & Squares
                </Link>
              </li>
              <li>
                <Link href="/pandals?zone=East+Kolkata" className="hover:text-[#FDE047] transition-colors">
                  East Kolkata & Salt Lake Circuit
                </Link>
              </li>
              <li>
                <Link href="/pandals?nearMetro=true" className="hover:text-[#FDE047] transition-colors">
                  Near Metro Station (&lt; 10 min walk)
                </Link>
              </li>
            </ul>
          </div>

          {/* Metro & Navigation */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-widest text-[#FDE68A] font-bold mb-4">
              Metro & Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FEF3C7]/80">
              <li>
                <Link href="/metro?line=blue" className="hover:text-[#FDE047] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  Blue Line (Dakshineswar – Kavi Subhash)
                </Link>
              </li>
              <li>
                <Link href="/metro?line=green" className="hover:text-[#FDE047] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Green Line (Howrah – Sector V)
                </Link>
              </li>
              <li>
                <Link href="/metro?line=purple" className="hover:text-[#FDE047] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  Purple Line (Behala Chowrasta – Esplanade)
                </Link>
              </li>
              <li>
                <Link href="/planner" className="hover:text-[#FDE047] transition-colors">
                  Plan My Pujo Itinerary
                </Link>
              </li>
              <li>
                <Link href="/map" className="hover:text-[#FDE047] transition-colors">
                  Interactive Live Map
                </Link>
              </li>
            </ul>
          </div>

          {/* Emergency & Helpline Info */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-widest text-[#FDE68A] font-bold mb-4">
              Puja Help & Emergency
            </h4>
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#7F1D1D]/70 border border-[#F87171]/30">
                <div className="font-bold text-white flex items-center gap-1.5 mb-1">
                  <PhoneCall className="w-3.5 h-3.5 text-[#FDE047]" />
                  Kolkata Police Puja Helpline
                </div>
                <div className="text-[#FDE047] font-mono text-sm font-bold">100 / 1090 / 033-2214-3230</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#7F1D1D]/70 border border-[#F87171]/30">
                <div className="font-bold text-white flex items-center gap-1.5 mb-1">
                  <Train className="w-3.5 h-3.5 text-blue-300" />
                  Kolkata Metro Rail Helpline
                </div>
                <div className="text-blue-200 font-mono text-sm font-bold">139 (Night Special Service)</div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright and notes */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FEF3C7]/70 gap-4">
          <p>© 2026 Pandalé Kolkata. Built for festival explorers and pilgrims.</p>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="hover:text-[#FDE047] transition-colors font-medium">
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
