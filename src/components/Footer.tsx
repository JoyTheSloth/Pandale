import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Train, MapPin, Heart, Shield, PhoneCall } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#FFFDF9] text-[#1C1917] pt-16 pb-24 md:pb-12 border-t-2 border-[#F59E0B]/30 mt-20 relative overflow-hidden">
      {/* Top subtle golden & sindoor ribbon */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-1 bg-gradient-to-r from-transparent via-[#D8261C] to-transparent opacity-70" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#E7E5E4]">
          
          {/* Brand info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/brand/pandale-icon.png"
                alt="Pandalé Official Icon"
                width={40}
                height={40}
                className="w-10 h-10 object-contain shrink-0 drop-shadow-xs"
              />
              <span className="text-2xl font-bold font-editorial text-[#1C1917] tracking-wide">
                Pandal<span className="text-[#D8261C]">é</span> 2026
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
              Kolkata’s premier digital companion for Durga Puja 2026. Discover iconic pandals, navigate via Metro stations, open exact Google Maps coordinates, and save your wishlist.
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-[#FEF3C7] text-[#92400E] border border-[#FDE047]/60">
                <Shield className="w-3 h-3 text-emerald-600" /> Authorized Instagram & Geolocation Ready
              </span>
            </div>
          </div>

          {/* Quick Explore */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-widest text-[#D8261C] font-bold mb-4 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#F59E0B]" />
              Explore Kolkata Pujo
            </h4>
            <ul className="space-y-2.5 text-xs text-[#57534E] font-medium">
              <li>
                <Link href="/pandals?zone=North+Kolkata" className="hover:text-[#D8261C] transition-colors">
                  North Kolkata Heritage & Sabeki
                </Link>
              </li>
              <li>
                <Link href="/pandals?zone=South+Kolkata" className="hover:text-[#D8261C] transition-colors">
                  South Kolkata Theme Powerhouses
                </Link>
              </li>
              <li>
                <Link href="/pandals?zone=Central+Kolkata" className="hover:text-[#D8261C] transition-colors">
                  Central Kolkata Illumination & Squares
                </Link>
              </li>
              <li>
                <Link href="/pandals?zone=East+Kolkata" className="hover:text-[#D8261C] transition-colors">
                  East Kolkata & Salt Lake Circuit
                </Link>
              </li>
              <li>
                <Link href="/pandals?nearMetro=true" className="hover:text-[#D8261C] transition-colors">
                  Near Metro Station (&lt; 10 min walk)
                </Link>
              </li>
            </ul>
          </div>

          {/* Metro & Navigation */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-widest text-[#D8261C] font-bold mb-4 flex items-center gap-1.5">
              <Train className="w-3.5 h-3.5 text-[#F59E0B]" />
              Metro & Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-[#57534E] font-medium">
              <li>
                <Link href="/metro?line=blue" className="hover:text-[#D8261C] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  Blue Line (Dakshineswar – Kavi Subhash)
                </Link>
              </li>
              <li>
                <Link href="/metro?line=green" className="hover:text-[#D8261C] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Green Line (Howrah – Sector V)
                </Link>
              </li>
              <li>
                <Link href="/metro?line=purple" className="hover:text-[#D8261C] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-500" />
                  Purple Line (Behala Chowrasta – Esplanade)
                </Link>
              </li>
              <li>
                <Link href="/planner" className="hover:text-[#D8261C] transition-colors">
                  Plan My Pujo Itinerary
                </Link>
              </li>
              <li>
                <Link href="/map" className="hover:text-[#D8261C] transition-colors">
                  Interactive Live Map
                </Link>
              </li>
            </ul>
          </div>

          {/* Emergency & Helpline Info */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-widest text-[#D8261C] font-bold mb-4 flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-[#D8261C]" />
              Puja Help & Emergency
            </h4>
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#FFFBEB] border border-[#FDE047] shadow-xs">
                <div className="font-bold text-[#1C1917] flex items-center gap-1.5 mb-1">
                  <PhoneCall className="w-3.5 h-3.5 text-[#D8261C]" />
                  Kolkata Police Puja Helpline
                </div>
                <div className="text-[#B45309] font-mono text-sm font-bold">100 / 1090 / 033-2214-3230</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200 shadow-xs">
                <div className="font-bold text-[#1C1917] flex items-center gap-1.5 mb-1">
                  <Train className="w-3.5 h-3.5 text-blue-600" />
                  Kolkata Metro Rail Helpline
                </div>
                <div className="text-blue-800 font-mono text-sm font-bold">139 (Night Special Service)</div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright and notes */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#78716C] gap-4">
          <p>© 2026 Pandalé Kolkata. Built with love for festival explorers and pilgrims.</p>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="hover:text-[#D8261C] transition-colors font-medium">
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
