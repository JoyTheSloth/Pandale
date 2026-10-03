'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bookmark, ChevronLeft, ChevronRight, ArrowRight, Sparkles, Train } from 'lucide-react';
import { Pandal } from '@/types';
import { useWishlist } from '@/context/WishlistContext';
import { useLanguage } from '@/context/LanguageContext';

interface SpotlightCarouselProps {
  pandals: Pandal[];
}

export default function SpotlightCarousel({ pandals }: SpotlightCarouselProps) {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const { isSaved, toggleWishlist } = useWishlist();

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const count = pandals.length;

  const nextSlide = useCallback(() => {
    if (count <= 1) return;
    setActiveIndex((prev) => (prev + 1) % count);
  }, [count]);

  const prevSlide = useCallback(() => {
    if (count <= 1) return;
    setActiveIndex((prev) => (prev - 1 + count) % count);
  }, [count]);

  // Automatic moving interval (moves every 4.2 seconds)
  useEffect(() => {
    if (isPaused || count <= 1) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4200);

    return () => clearInterval(interval);
  }, [isPaused, count, nextSlide]);

  if (!pandals || count === 0) return null;

  const activePandal = pandals[activeIndex];

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;

    // Only trigger if horizontal swipe is stronger than vertical scroll
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
    setIsPaused(false);
  };

  return (
    <div
      className="w-full flex flex-col items-center select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Keyframe animation for text transitions */}
      <style>{`
        @keyframes spotlightFadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .spotlight-text-anim {
          animation: spotlightFadeIn 500ms cubic-bezier(0.25, 1, 0.33, 1) both;
        }
      `}</style>

      {/* 1. CAROUSEL STAGE (Cover Flow) */}
      <div 
        className="relative w-full h-[380px] sm:h-[440px] md:h-[480px] flex items-center justify-center overflow-hidden"
        style={{ perspective: '1200px' }}
      >
        
        {/* Navigation Arrow Left (Desktop) */}
        <button
          type="button"
          onClick={prevSlide}
          title="Previous Pandal"
          className="hidden md:flex absolute left-4 lg:left-8 z-30 w-11 h-11 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-md border border-stone-200 dark:border-white/15 text-stone-800 dark:text-white items-center justify-center hover:scale-110 active:scale-95 shadow-lg transition-all cursor-pointer group"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        {/* Navigation Arrow Right (Desktop) */}
        <button
          type="button"
          onClick={nextSlide}
          title="Next Pandal"
          className="hidden md:flex absolute right-4 lg:right-8 z-30 w-11 h-11 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-md border border-stone-200 dark:border-white/15 text-stone-800 dark:text-white items-center justify-center hover:scale-110 active:scale-95 shadow-lg transition-all cursor-pointer group"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* CARDS TRACK */}
        <div 
          className="relative w-full max-w-5xl h-full flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {pandals.map((pandal, index) => {
            // Circular normalized offset from activeIndex
            let offset = index - activeIndex;
            const half = count / 2;
            if (offset > half) offset -= count;
            if (offset < -half) offset += count;

            const isCenter = offset === 0;
            const isLeft = offset === -1;
            const isRight = offset === 1;

            const saved = isSaved(pandal.id);

            // Calculate precise 3D transform, scale, rotation, and opacity for 60fps hardware acceleration
            let transform = 'translate3d(0, 0, 0) scale(1) rotateY(0deg)';
            let zIndex = 30;
            let opacity = 1;
            let filter = 'brightness(1)';
            let pointerEvents: 'auto' | 'none' = 'auto';

            if (isCenter) {
              transform = 'translate3d(0, 0, 0) scale(1) rotateY(0deg)';
              zIndex = 30;
              opacity = 1;
              filter = 'brightness(1)';
              pointerEvents = 'auto';
            } else if (isLeft) {
              transform = 'translate3d(-78%, 0, -60px) scale(0.88) rotateY(7deg)';
              zIndex = 20;
              opacity = 0.65;
              filter = 'brightness(0.65)';
              pointerEvents = 'auto';
            } else if (isRight) {
              transform = 'translate3d(78%, 0, -60px) scale(0.88) rotateY(-7deg)';
              zIndex = 20;
              opacity = 0.65;
              filter = 'brightness(0.65)';
              pointerEvents = 'auto';
            } else if (offset < -1) {
              transform = 'translate3d(-145%, 0, -120px) scale(0.72) rotateY(14deg)';
              zIndex = 10;
              opacity = 0;
              filter = 'brightness(0.4)';
              pointerEvents = 'none';
            } else if (offset > 1) {
              transform = 'translate3d(145%, 0, -120px) scale(0.72) rotateY(-14deg)';
              zIndex = 10;
              opacity = 0;
              filter = 'brightness(0.4)';
              pointerEvents = 'none';
            }

            return (
              <div
                key={pandal.id}
                onClick={() => {
                  if (isLeft) prevSlide();
                  else if (isRight) nextSlide();
                }}
                style={{
                  transform,
                  opacity,
                  zIndex,
                  filter,
                  pointerEvents,
                  transition: 'transform 650ms cubic-bezier(0.25, 1, 0.33, 1), opacity 650ms cubic-bezier(0.25, 1, 0.33, 1), filter 650ms ease, box-shadow 650ms ease',
                  willChange: 'transform, opacity',
                  transformStyle: 'preserve-3d',
                }}
                className={`absolute w-[76vw] max-w-[280px] sm:max-w-[330px] md:max-w-[360px] aspect-[3/4] sm:aspect-[4/5] rounded-[28px] overflow-hidden ${
                  isCenter ? 'shadow-2xl' : 'shadow-xl cursor-pointer hover:opacity-90'
                }`}
              >
                {/* Click target wrapper */}
                <div className="relative w-full h-full bg-[#181014] rounded-[28px] overflow-hidden border border-stone-200/40 dark:border-white/15">
                  
                  {/* Pandal Image */}
                  <Image
                    src={pandal.featured_image || '/brand/hero-poster.jpg'}
                    alt={pandal.name}
                    fill
                    sizes="(max-width: 640px) 76vw, 360px"
                    priority={isCenter}
                    className="object-cover object-center select-none"
                  />

                  {/* Gradient Scrims: Dark gradient at top for badges & rich moody gradient at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40 pointer-events-none" />

                  {/* Dim overlay for peeking side cards to focus center */}
                  {!isCenter && (
                    <div className="absolute inset-0 bg-black/40 transition-opacity" />
                  )}

                  {/* Top Header Row inside the card */}
                  <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between z-10">
                    {/* Top-Left Category Pill (like District Live in screenshot) */}
                    <div className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold flex items-center gap-1.5 shadow-md">
                      <Sparkles className="w-3 h-3 text-[#F59E0B]" />
                      <span>{pandal.area || (isBn ? 'জনপ্রিয় মণ্ডপ' : 'Must Visit')}</span>
                    </div>

                    {/* Top-Right Bookmark Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(pandal.id);
                      }}
                      title={saved ? (isBn ? 'উইশলিস্ট থেকে মুছুন' : 'Saved to Wishlist') : (isBn ? 'উইশলিস্টে যোগ করুন' : 'Save to Wishlist')}
                      className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all duration-200 shadow-md backdrop-blur-md cursor-pointer hover:scale-110 active:scale-90 border ${
                        saved
                          ? 'bg-[#D8261C] text-white border-[#D8261C] shadow-[#D8261C]/50'
                          : 'bg-black/60 text-white border-white/20 hover:bg-black/80'
                      }`}
                      aria-label="Save to wishlist"
                    >
                      <Bookmark className={`w-4 h-4 transition-transform ${saved ? 'fill-current text-white scale-110' : 'text-white'}`} />
                    </button>
                  </div>

                  {/* Center Card Over-Artwork Branding / Headline (matches poster feel) */}
                  <Link
                    href={`/pandal/${pandal.slug}`}
                    className="absolute inset-0 flex flex-col justify-end p-5 z-10 cursor-pointer"
                  >
                    {/* Floating Theme Highlight Pill on card */}
                    {pandal.theme && (
                      <div className="mb-1">
                        <span className="inline-block text-[11px] font-mono uppercase tracking-wider text-[#FDE047] font-bold drop-shadow-md line-clamp-1">
                          {pandal.theme}
                        </span>
                      </div>
                    )}

                    <h4 className="text-lg sm:text-xl font-bold font-editorial text-white leading-tight drop-shadow-lg line-clamp-1">
                      {pandal.name}
                    </h4>

                    <div className="flex items-center gap-2 mt-1.5 text-white/80 text-[11px] font-medium drop-shadow-sm">
                      <Train className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span className="truncate">{pandal.nearest_metro}</span>
                      <span>•</span>
                      <span className="shrink-0">{pandal.walking_time_mins}m</span>
                    </div>
                  </Link>

                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. ACTIVE PANDAL TITLE & SUBTITLE BELOW CAROUSEL WITH SILKY CROSS-FADE */}
      <div 
        key={activePandal.id}
        className="mt-4 sm:mt-5 text-center px-4 max-w-lg mx-auto spotlight-text-anim"
      >
        <Link
          href={`/pandal/${activePandal.slug}`}
          className="group inline-block cursor-pointer"
        >
          <h3 className="text-xl sm:text-2xl font-bold font-editorial text-stone-900 dark:text-white tracking-tight group-hover:text-[#D8261C] transition-colors duration-200">
            {activePandal.name}
          </h3>
        </Link>

        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1 leading-relaxed line-clamp-2 font-medium">
          {activePandal.description || activePandal.theme}
        </p>

        {/* Action button */}
        <div className="flex items-center justify-center mt-3">
          <Link
            href={`/pandal/${activePandal.slug}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-[#D8261C] text-white hover:bg-[#B91C1C] transition-all shadow-md shadow-[#D8261C]/25 active:scale-95 cursor-pointer"
          >
            <span>{isBn ? 'মণ্ডপ বিস্তারিত দেখুন' : 'Explore Pandal'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 3. PROGRESS DOTS INDICATOR */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {pandals.map((_, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'w-7 bg-[#D8261C] shadow-xs'
                  : 'w-2 bg-stone-300 dark:bg-stone-700 hover:bg-stone-400 dark:hover:bg-stone-500'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          );
        })}
      </div>

    </div>
  );
}
