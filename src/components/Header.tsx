'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useWishlist } from '@/context/WishlistContext';
import { useTheme } from '@/context/ThemeContext';
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
  PhoneCall,
  Sun,
  Moon
} from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const { count } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu drawer when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when overlay menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  const navLinks = [
    { 
      href: '/pandals', 
      label: 'Pandals Catalog', 
      icon: Compass, 
      desc: '14+ iconic heritage & theme pandals with real-time walking times' 
    },
    { 
      href: '/metro', 
      label: 'Kolkata Metro Guide', 
      icon: Train, 
      desc: 'Blue, Green & Purple station-to-pandal walking exits' 
    },
    { 
      href: '/map', 
      label: 'Interactive Live Map', 
      icon: MapPin, 
      desc: 'City-wide interactive map with pandals & metro stations' 
    },
    { 
      href: '/planner', 
      label: 'Plan My Pujo Itinerary', 
      icon: Route, 
      desc: 'Multi-stop transit routing and direct Google Maps directions' 
    },
    { 
      href: '/wishlist', 
      label: 'Saved Wishlist', 
      icon: Heart, 
      badge: count, 
      desc: 'Your personal shortlisted pandals for Durga Puja 2026' 
    }
  ];

  return (
    <>
      {/* PURE FLOATING HEADER: NO SOLID NAVBAR, JUST THE PILL & CIRCULAR HAMBURGER BUTTON */}
      <header className={`z-40 w-full pt-4 sm:pt-6 pb-2 px-4 sm:px-8 pointer-events-none transition-all duration-200 ${
        pathname === '/' ? 'fixed top-0 left-0 right-0' : 'sticky top-0'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Left: Floating Brand Pill Badge (exactly matching reference image) */}
          <Link 
            href="/" 
            className={`pointer-events-auto inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-1.5 rounded-full shadow-lg active:scale-95 transition-all group ${
              pathname === '/'
                ? 'bg-black/45 backdrop-blur-md border border-white/20 hover:border-white/40'
                : 'bg-white border border-[#1C1917] hover:border-[#D8261C]'
            }`}
          >
            <Image
              src="/brand/pandale-icon.png"
              alt="Pandalé"
              width={28}
              height={28}
              className="w-7 h-7 object-contain rounded-lg shrink-0 group-hover:scale-105 transition-transform"
              priority
            />
            <div className="flex flex-col text-left">
              <span className={`text-base sm:text-lg font-bold font-editorial tracking-tight leading-tight ${
                pathname === '/' ? 'text-white' : 'text-[#1C1917]'
              }`}>
                Pandal<span className="text-[#D8261C]">é</span>
              </span>
              <span className={`text-[8px] font-mono tracking-widest uppercase leading-none mt-0.5 font-bold ${
                pathname === '/' ? 'text-[#E7E5E4]/80' : 'text-[#78716C]'
              }`}>
                Kolkata Pujo Guide
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Theme Toggle Button (Light & Dark Mode) */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              className={`pointer-events-auto w-11 h-11 sm:w-12 sm:h-12 rounded-full shadow-lg flex items-center justify-center active:scale-95 transition-all group ${
                pathname === '/'
                  ? 'bg-black/45 backdrop-blur-md border border-white/20 text-white hover:border-white/40'
                  : 'bg-white dark:bg-[#1C1917] border border-[#1C1917] dark:border-white/20 text-[#1C1917] dark:text-white hover:border-[#D8261C]'
              }`}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-300 transition-transform group-hover:rotate-45" />
              ) : (
                <Moon className="w-5 h-5 text-amber-500 transition-transform group-hover:-rotate-12" />
              )}
            </button>

            {/* Right: Floating Circular Hamburger Menu Button (exactly matching reference image) */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
              className={`pointer-events-auto w-11 h-11 sm:w-12 sm:h-12 rounded-full shadow-lg flex items-center justify-center active:scale-95 transition-all group ${
                pathname === '/'
                  ? 'bg-black/45 backdrop-blur-md border border-white/20 text-white hover:border-white/40'
                  : 'bg-white dark:bg-[#1C1917] border border-[#1C1917] dark:border-white/20 text-[#1C1917] dark:text-white hover:border-[#D8261C]'
              }`}
            >
              {menuOpen ? (
                <X className="w-5 h-5 text-[#D8261C] transition-transform duration-200" />
              ) : (
                <Menu className={`w-5 h-5 ${pathname === '/' ? 'text-white' : 'text-[#1C1917] dark:text-white'}`} />
              )}
            </button>
          </div>

        </div>
      </header>

      {/* FULL-SCREEN LUXURY OVERLAY MENU WHEN CIRCULAR BUTTON IS CLICKED */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-[#FFFDF9]/98 dark:bg-[#0C0A09]/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 overflow-y-auto animate-in fade-in duration-200 text-[#1C1917] dark:text-[#FAF8F5]">
          
          {/* Top Bar inside Overlay */}
          <div className="max-w-5xl mx-auto w-full flex items-center justify-between pb-8 border-b border-[#FED7AA]/60 dark:border-white/10">
            <Link 
              href="/" 
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white dark:bg-[#1C1917] border border-[#1C1917] dark:border-white/20 shadow-xs"
            >
              <Image
                src="/brand/pandale-icon.png"
                alt="Pandalé"
                width={24}
                height={24}
                className="w-5 h-5 object-contain"
              />
              <span className="text-base font-bold font-editorial text-[#1C1917] dark:text-white">
                Pandal<span className="text-[#D8261C]">é</span>
              </span>
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="w-11 h-11 rounded-full bg-white dark:bg-[#1C1917] border border-[#1C1917] dark:border-white/20 shadow-xs flex items-center justify-center text-[#1C1917] dark:text-white hover:text-[#D8261C] active:scale-95 transition-all"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-300" /> : <Moon className="w-5 h-5 text-amber-500" />}
              </button>

              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="w-11 h-11 rounded-full bg-white dark:bg-[#1C1917] border border-[#1C1917] dark:border-white/20 shadow-xs flex items-center justify-center text-[#1C1917] dark:text-white hover:text-[#D8261C] active:scale-95 transition-all"
              >
                <X className="w-5 h-5 text-[#D8261C]" />
              </button>
            </div>
          </div>

          {/* Menu Navigation Links */}
          <div className="max-w-5xl mx-auto w-full py-8 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#B45309] dark:text-amber-400 font-bold block mb-4">
              Explore Pandalé 2026
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {navLinks.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`group p-4 sm:p-5 rounded-3xl border transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-[#D8261C] text-white border-[#D8261C] shadow-lg shadow-[#D8261C]/25'
                        : 'bg-white dark:bg-[#1C1917] border-[#FED7AA]/80 dark:border-white/10 text-[#1C1917] dark:text-white hover:border-[#D8261C] hover:bg-[#FFFBEB] dark:hover:bg-[#291B0B] shadow-luxe'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                        isActive ? 'bg-white/20 text-[#FDE047]' : 'bg-[#FEF3C7] text-[#D8261C]'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-base sm:text-lg font-bold font-editorial flex items-center gap-2">
                          <span>{item.label}</span>
                          {item.badge !== undefined && item.badge > 0 && (
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold font-mono ${
                              isActive ? 'bg-[#FEF3C7] text-[#92400E]' : 'bg-[#D8261C] text-white'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className={`text-xs mt-1 line-clamp-1 ${
                          isActive ? 'text-white/80' : 'text-[#78716C]'
                        }`}>
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <ArrowRight className={`w-5 h-5 shrink-0 transition-transform group-hover:translate-x-1 ${
                      isActive ? 'text-white' : 'text-[#A8A29E] group-hover:text-[#D8261C]'
                    }`} />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Bottom Helpline & Admin Bar */}
          <div className="max-w-5xl mx-auto w-full pt-6 border-t border-[#FED7AA]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78716C]">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-[#D8261C]" />
              <span className="font-bold text-[#1C1917]">Police Puja Helpline: 100 / 1090</span>
              <span>•</span>
              <span className="font-bold text-blue-700">Metro Rail: 139</span>
            </div>

            <div className="flex items-center gap-4">
              <Link 
                href="/admin" 
                onClick={() => setMenuOpen(false)}
                className="font-semibold hover:text-[#D8261C] underline flex items-center gap-1"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin & Data Portal</span>
              </Link>
            </div>
          </div>

        </div>
      )}
    </>
  );
}
