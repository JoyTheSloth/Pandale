'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useWishlist } from '@/context/WishlistContext';
import { Heart, Compass, Train, MapPin, Route, ShieldCheck, Sparkles } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const { count } = useWishlist();

  const navLinks = [
    { href: '/pandals', label: 'Pandals', icon: Compass },
    { href: '/metro', label: 'Metro Guide', icon: Train },
    { href: '/map', label: 'Map View', icon: MapPin },
    { href: '/planner', label: 'Plan Route', icon: Route },
    { href: '/wishlist', label: 'Wishlist', icon: Heart, badge: count }
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-nav border-b border-[#FEE2E2] transition-all duration-200 shadow-xs">
      {/* Top Announcement Bar (like reference image) */}
      <div className="bg-[#FFFBEB] text-[#92400E] border-b border-[#FED7AA]/60 text-[11px] font-medium py-1.5 px-4 text-center overflow-hidden">
        <div className="flex items-center justify-center gap-2 truncate">
          <span className="font-bold text-[#D8261C]">✨ Pujo 2026 Live:</span>
          <span className="truncate">Night Metro Special Schedules & 14+ Pandals with Exact Google Maps Coordinates</span>
          <Link href="/metro" className="underline font-bold text-[#D8261C] hover:text-[#B91C1C] shrink-0">
            View Metro Guide →
          </Link>
        </div>
      </div>

      {/* Top Festive Red & Marigold Ribbon */}
      <div className="h-1 w-full bg-gradient-to-r from-[#D8261C] via-[#F59E0B] to-[#D8261C]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Brand Logo with Official Icon used directly without any box */}
        <Link href="/" className="group flex items-center gap-3 transition-transform active:scale-95">
          <Image
            src="/brand/pandale-icon.png"
            alt="Pandalé Official Icon"
            width={44}
            height={44}
            className="w-10 h-10 sm:w-11 sm:h-11 object-contain shrink-0 group-hover:scale-108 transition-transform duration-300 drop-shadow-sm"
            priority
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1917] font-editorial leading-none">
                Pandal<span className="text-[#D8261C]">é</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-mono font-bold bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">
                2026
              </span>
            </div>
            <span className="text-[9px] uppercase tracking-wider font-bold text-[#D8261C] mt-0.5">
              Kolkata Durga Puja & Metro Guide
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
          {navLinks.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#D8261C] to-[#B91C1C] text-white shadow-crimson-glow border border-[#FDE047]/30 scale-102'
                    : 'text-[#44403C] hover:text-[#D8261C] hover:bg-[#FFFBEB] border border-transparent hover:border-[#FED7AA]/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#FDE047]' : 'text-[#D8261C]'}`} />
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-[#FEF3C7] text-[#92400E]' : 'bg-[#D8261C] text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

          {/* Quick Admin link */}
          <Link
            href="/admin"
            title="Admin & Data Portal"
            className="ml-2 p-2.5 rounded-full text-[#78716C] hover:text-[#D8261C] hover:bg-[#FEF3C7]/40 transition-colors"
          >
            <ShieldCheck className="w-4 h-4" />
          </Link>
        </nav>

        {/* Mobile Header Actions */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/wishlist"
            className="relative p-2.5 rounded-full bg-white border border-[#FED7AA] text-[#1C1917] shadow-xs active:scale-95"
          >
            <Heart className="w-5 h-5 text-[#D8261C] fill-[#D8261C]/20" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#D8261C] text-[#FEF3C7] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                {count}
              </span>
            )}
          </Link>
        </div>

      </div>
    </header>
  );
}
