'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useWishlist } from '@/context/WishlistContext';
import { Compass, Train, Heart, Route, Home } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();
  const { count } = useWishlist();

  const navItems = [
    { href: '/', label: 'Home', icon: Home, exact: true },
    { href: '/pandals', label: 'Pandals', icon: Compass },
    { href: '/metro', label: 'Metro', icon: Train },
    { href: '/planner', label: 'Plan', icon: Route },
    { href: '/wishlist', label: 'Wishlist', icon: Heart, badge: count }
  ];

  return (
    <nav className="md:hidden fixed bottom-4 inset-x-4 max-w-sm mx-auto z-50 rounded-[2.2rem] bg-black/80 backdrop-blur-2xl border border-white/10 shadow-2xl p-1.5">
      <div className="flex items-center justify-between px-1">
        {navItems.map((item) => {
          const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center transition-all active:scale-95 ${
                isActive 
                  ? 'bg-[#3B1516] border border-[#D8261C]/50 text-[#D8261C] px-3.5 py-1.5 rounded-2xl shadow-inner'
                  : 'text-[#A8A29E] hover:text-white px-2.5 py-1.5'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#D8261C]' : 'text-[#A8A29E]'}`} />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#D8261C] text-white text-[9px] font-bold h-3.5 w-3.5 rounded-full flex items-center justify-center shadow-xs">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-0.5 tracking-tight ${isActive ? 'text-[#D8261C] font-bold' : 'text-[#A8A29E] font-medium'}`}>
                {item.label}
              </span>
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-[#D8261C] mt-0.5 shadow-sm shadow-[#D8261C]" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
