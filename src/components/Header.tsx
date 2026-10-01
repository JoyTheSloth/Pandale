'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useWishlist } from '@/context/WishlistContext';
import { 
  Heart, 
  Compass, 
  Train, 
  MapPin, 
  Route, 
  ShieldCheck, 
  Sparkles, 
  Menu, 
  X, 
  ArrowRight,
  PhoneCall
} from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const { count } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/pandals', label: 'Pandals', icon: Compass },
    { href: '/metro', label: 'Metro Guide', icon: Train },
    { href: '/map', label: 'Map View', icon: MapPin },
    { href: '/planner', label: 'Plan Route', icon: Route },
    { href: '/wishlist', label: 'Wishlist', icon: Heart, badge: count }
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-nav border-b border-[#FEE2E2] transition-all duration-200 shadow-xs relative">
      {/* Pattern background overlay behind navbar matching reference image */}
      <div className="absolute inset-0 bg-[url('/brand/pujo-pattern-bg.jpg')] bg-repeat bg-[length:320px_auto] opacity-15 pointer-events-none -z-10" />

      {/* Top Announcement Bar (like reference image) */}
      <div className="bg-[#FFFBEB]/90 backdrop-blur-xs text-[#92400E] border-b border-[#FED7AA]/60 text-[11px] font-medium py-1.5 px-4 text-center overflow-hidden">
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
        
        {/* DESKTOP BRAND LOGO */}
        <Link href="/" className="hidden md:flex items-center gap-3 transition-transform active:scale-95 group">
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

        {/* MOBILE BRAND PILL BADGE (MATCHING USER REFERENCE SCREENSHOT) */}
        <Link 
          href="/" 
          className="md:hidden inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#1C1917] shadow-xs active:scale-95 transition-transform"
        >
          <Image
            src="/brand/pandale-icon.png"
            alt="Pandalé"
            width={24}
            height={24}
            className="w-5 h-5 object-contain shrink-0"
            priority
          />
          <span className="text-base font-bold font-editorial tracking-tight text-[#1C1917]">
            Pandal<span className="text-[#D8261C]">é</span>
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}
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

        {/* MOBILE CIRCULAR HAMBURGER BUTTON (MATCHING USER REFERENCE SCREENSHOT) */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/wishlist"
            className="relative p-2 rounded-full bg-white border border-[#1C1917]/20 text-[#1C1917] shadow-xs active:scale-95"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5 text-[#D8261C] fill-[#D8261C]/20" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#D8261C] text-[#FEF3C7] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                {count}
              </span>
            )}
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="w-10 h-10 rounded-full bg-white border border-[#1C1917] shadow-xs flex items-center justify-center text-[#1C1917] active:scale-95 transition-transform"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-[#D8261C]" />
            ) : (
              <Menu className="w-5 h-5 text-[#1C1917]" />
            )}
          </button>
        </div>

      </div>

      {/* MOBILE FULL-SCREEN / SLIDE DRAWER MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[calc(100%+1px)] bg-white/98 backdrop-blur-xl border-b-2 border-[#FED7AA] shadow-2xl p-6 space-y-6 z-50 animate-in fade-in slide-in-from-top-4 duration-200 max-h-[85vh] overflow-y-auto">
          
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#B45309] font-bold block mb-1">
              Navigate Kolkata Pujo
            </span>
            <div className="grid grid-cols-1 gap-2">
              {navLinks.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between p-3.5 rounded-2xl transition-all ${
                      isActive
                        ? 'bg-[#D8261C] text-white shadow-md shadow-[#D8261C]/25'
                        : 'bg-[#FFFDF9] border border-[#FED7AA]/70 text-[#1C1917] hover:bg-[#FEF3C7]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${isActive ? 'text-[#FDE047]' : 'text-[#D8261C]'}`} />
                      <span className="font-bold text-sm">{item.label}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {item.badge !== undefined && item.badge > 0 && (
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                          isActive ? 'bg-[#FEF3C7] text-[#92400E]' : 'bg-[#D8261C] text-white'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                      <ArrowRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#A8A29E]'}`} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Puja Help & Emergency Helplines inside drawer */}
          <div className="p-4 rounded-2xl bg-[#FFFBEB] border border-[#FED7AA] space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1C1917]">
              <PhoneCall className="w-3.5 h-3.5 text-[#D8261C]" />
              <span>Kolkata Police Puja Helpline</span>
            </div>
            <div className="text-[#92400E] font-mono text-xs font-bold">
              100 / 1090 / 033-2214-3230
            </div>
          </div>

          <div className="pt-2 text-center text-xs text-[#78716C]">
            <Link href="/admin" className="font-semibold hover:text-[#D8261C] underline">
              Admin & Data Portal
            </Link>
          </div>

        </div>
      )}

    </header>
  );
}
