'use client';

import React from 'react';
import Link from 'next/link';
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
    <header className="sticky top-0 z-40 w-full glass-nav border-b border-[#EBE3D8]/80 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-2.5 transition-transform active:scale-98">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#D43827] to-[#B52819] flex items-center justify-center text-white font-bold shadow-md shadow-[#D43827]/20">
            <Sparkles className="w-5 h-5 text-amber-200" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#181513] font-editorial">
                PUJO
              </span>
              <span className="text-xs px-1.5 py-0.5 rounded font-mono font-semibold bg-[#D43827]/10 text-[#D43827] border border-[#D43827]/20">
                2026
              </span>
            </div>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8E857B]">
              Kolkata Discovery & Metro Guide
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-150 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#181513] text-white shadow-sm'
                    : 'text-[#5C554E] hover:text-[#181513] hover:bg-[#EBE2D8]/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-[#8E857B]'}`} />
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`ml-1 px-1.5 py-0.2 rounded-full text-[11px] font-bold ${
                      isActive ? 'bg-[#D43827] text-white' : 'bg-[#D43827] text-white'
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
            className="ml-2 p-2 rounded-full text-[#8E857B] hover:text-[#181513] hover:bg-[#EBE2D8]/50 transition-colors"
          >
            <ShieldCheck className="w-4 h-4" />
          </Link>
        </nav>

        {/* Mobile Header Actions */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/wishlist"
            className="relative p-2.5 rounded-full bg-white border border-[#E9E2D8] text-[#181513] shadow-sm active:scale-95"
          >
            <Heart className="w-5 h-5 text-[#D43827]" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#D43827] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
        </div>

      </div>
    </header>
  );
}
