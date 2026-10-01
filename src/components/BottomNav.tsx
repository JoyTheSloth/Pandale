'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useWishlist } from '@/context/WishlistContext';
import { Compass, Train, MapPin, Heart, Route, Home } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();
  const { count } = useWishlist();

  const navItems = [
    { href: '/', label: 'Home', icon: Home, exact: true },
    { href: '/pandals', label: 'Explore', icon: Compass },
    { href: '/metro', label: 'Metro', icon: Train },
    { href: '/planner', label: 'Route', icon: Route },
    { href: '/wishlist', label: 'Wishlist', icon: Heart, badge: count }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-nav border-t border-[#EBE2D8] pb-safe">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-1 flex flex-col items-center justify-center py-1 transition-all active:scale-90 ${
                isActive ? 'text-[#D43827]' : 'text-[#8E857B] hover:text-[#181513]'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 bg-[#D43827] text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-2 border-white">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-1 font-medium ${isActive ? 'font-semibold text-[#181513]' : ''}`}>
                {item.label}
              </span>
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-[#D43827] mt-0.5" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
