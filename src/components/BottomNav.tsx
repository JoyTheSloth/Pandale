'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { Compass, Train, Map, Route, Home } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const [pressed, setPressed] = useState<string | null>(null);
  const [ripple, setRipple] = useState<string | null>(null);

  const navItems: Array<{ href: string; label: string; icon: React.ComponentType<{ className?: string; strokeWidth?: number }>; exact?: boolean; badge?: number }> = [
    { href: '/',         label: language === 'bn' ? 'হোম' : 'Home',       icon: Home,    exact: true },
    { href: '/pandals',  label: language === 'bn' ? 'প্যান্ডেল' : 'Pandals', icon: Compass },
    { href: '/metro',    label: language === 'bn' ? 'মেট্রো' : 'Metro',     icon: Train },
    { href: '/planner',  label: language === 'bn' ? 'প্ল্যান' : 'Plan',      icon: Route },
    { href: '/map',      label: language === 'bn' ? 'মেট্রো ম্যাপ' : 'Metro Map', icon: Map },
  ];

  const handlePress = useCallback((href: string) => {
    setPressed(href);
    setRipple(href);
    setTimeout(() => setRipple(null), 460);
    setTimeout(() => setPressed(null), 200);
  }, []);

  return (
    <>
      <style>{`
        @keyframes navBounce {
          0%   { transform: scale(1); }
          30%  { transform: scale(0.80); }
          60%  { transform: scale(1.20); }
          80%  { transform: scale(0.95); }
          100% { transform: scale(1); }
        }
        @keyframes pillIn {
          0%   { opacity: 0; transform: scaleX(0.55) scaleY(0.65); }
          65%  { transform: scaleX(1.08) scaleY(1.05); }
          100% { opacity: 1; transform: scaleX(1) scaleY(1); }
        }
        @keyframes iconPop {
          0%   { transform: scale(1)    rotate(0deg); }
          25%  { transform: scale(1.35) rotate(-10deg); }
          55%  { transform: scale(0.88) rotate(5deg); }
          100% { transform: scale(1)    rotate(0deg); }
        }
        @keyframes badgePulse {
          0%,100% { transform: scale(1);    box-shadow: 0 0 0 0   rgba(216,38,28,0.5); }
          50%     { transform: scale(1.28); box-shadow: 0 0 0 4px rgba(216,38,28,0); }
        }
        @keyframes rippleOut {
          0%   { transform: scale(0);   opacity: 0.50; }
          100% { transform: scale(3.2); opacity: 0; }
        }
        @keyframes labelIn {
          0%   { opacity: 0; transform: translateY(5px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes dotPop {
          0%   { transform: scale(0); }
          60%  { transform: scale(1.5); }
          100% { transform: scale(1); }
        }

        .nav-bounce   { animation: navBounce 0.38s cubic-bezier(.36,.07,.19,.97) both; }
        .nav-pill-in  { animation: pillIn    0.30s cubic-bezier(.34,1.56,.64,1)   both; }
        .nav-icon-pop { animation: iconPop   0.40s cubic-bezier(.36,.07,.19,.97) both; }
        .nav-badge    { animation: badgePulse 1.7s ease-in-out infinite; }
        .nav-ripple   { animation: rippleOut  0.46s ease-out forwards; }
        .nav-label-in { animation: labelIn    0.22s ease-out both; }
        .nav-dot-pop  { animation: dotPop     0.34s cubic-bezier(.34,1.56,.64,1) both; }
      `}</style>

      <nav id="mobile-bottom-nav" className="mobile-bottom-nav md:hidden fixed bottom-4 inset-x-4 max-w-sm mx-auto z-40 rounded-[2.2rem] bg-white/95 dark:bg-black/85 backdrop-blur-2xl border border-[#FED7AA] dark:border-white/10 shadow-2xl p-1.5 transition-all duration-200">
        <div className="flex items-center justify-between px-1">
          {navItems.map((item) => {
            const isActive  = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            const isPressed = pressed === item.href;
            const hasRipple = ripple === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={true}
                onMouseDown={() => handlePress(item.href)}
                onTouchStart={() => handlePress(item.href)}
                className={`
                  relative flex flex-col items-center justify-center overflow-hidden select-none
                  transition-colors duration-200
                  ${isActive
                    ? 'bg-[#FEF2F2] dark:bg-[#3B1516] border border-[#D8261C]/30 dark:border-[#D8261C]/50 text-[#D8261C] px-3.5 py-1.5 rounded-2xl shadow-inner nav-pill-in'
                    : 'text-[#78716C] dark:text-[#A8A29E] hover:text-[#D8261C] dark:hover:text-white px-2.5 py-1.5'
                  }
                  ${isPressed ? 'nav-bounce' : ''}
                `}
              >
                {/* Ripple burst */}
                {hasRipple && (
                  <span className="nav-ripple absolute inset-0 m-auto w-9 h-9 rounded-full bg-[#D8261C]/18 pointer-events-none" />
                )}

                {/* Icon */}
                <div className={`relative ${isActive ? 'nav-icon-pop' : ''}`}>
                  <Icon
                    strokeWidth={isActive ? 2.5 : 1.8}
                    className={`w-5 h-5 transition-colors duration-200 ${
                      isActive ? 'text-[#D8261C]' : 'text-[#78716C] dark:text-[#A8A29E]'
                    }`}
                  />
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="nav-badge absolute -top-1.5 -right-2 bg-[#D8261C] text-white text-[9px] font-bold h-3.5 w-3.5 rounded-full flex items-center justify-center shadow-sm">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Label */}
                <span className={`text-[10px] mt-0.5 tracking-tight transition-colors duration-200 ${
                  isActive
                    ? 'text-[#D8261C] font-bold nav-label-in'
                    : 'text-[#78716C] dark:text-[#A8A29E] font-medium'
                }`}>
                  {item.label}
                </span>

                {/* Active dot */}
                {isActive && (
                  <div className="nav-dot-pop w-1 h-1 rounded-full bg-[#D8261C] mt-0.5 shadow-sm shadow-[#D8261C]/60" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
