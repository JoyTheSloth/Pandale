'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  MoreHorizontal, 
  ExternalLink,
  BadgeCheck,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface InstagramPostMockupProps {
  className?: string;
  variant?: 'compact' | 'featured';
}

const SLIDES = [
  {
    image: '/brand/instagram-preview.jpg',
    alt: 'Kolkata Durga Puja Iconic Pandals Metro Guide Cover — Flatzy',
    tag: 'Cover Guide',
    caption: 'Iconic Pandals & Metro Circuit Guide 2026'
  },
  {
    image: '/brand/circuit-north-heritage.jpg',
    alt: 'North Kolkata Heritage Circuit — Shyambazar & Sovabazar Hub',
    tag: 'North Circuit',
    caption: 'Shyambazar & Sovabazar • Bagbazar, Kumartuli, Ahiritola'
  },
  {
    image: '/brand/circuit-central-classic.jpg',
    alt: 'Central Kolkata Classic Circuit — MG Road & Central Hub',
    tag: 'Central Circuit',
    caption: 'MG Road & Central • Santosh Mitra Sq, College Square'
  },
  {
    image: '/brand/circuit-south-iconic.jpg',
    alt: 'South Kolkata Iconic Circuit — Kalighat & Netaji Bhavan Hub',
    tag: 'South Circuit',
    caption: 'Kalighat & Gariahat • Suruchi, Ekdalia, Tridhara'
  },
  {
    image: '/brand/circuit-green-line.jpg',
    alt: 'Green Line Corridor — Salt Lake & Sealdah',
    tag: 'East Corridor',
    caption: 'Salt Lake & Sealdah • Sector V, FD Block, BJ Block'
  },
  {
    image: '/brand/metro-blue-line.jpg',
    alt: 'Blue Line Lifeline — Dakshineswar to Kavi Subhash',
    tag: 'Blue Line Lifeline',
    caption: 'Dakshineswar ⇄ Kavi Subhash (Direct pandal transit)'
  },
  {
    image: '/brand/metro-green-line.jpg',
    alt: 'Green Line Underwater Metro — Howrah Maidan to Sector V',
    tag: 'Green Line Under-River',
    caption: 'Underwater Metro • Howrah Maidan to Sector V'
  }
];

export default function InstagramPostMockup({ 
  className = '',
  variant = 'featured'
}: InstagramPostMockupProps) {
  const postUrl = 'https://www.instagram.com/p/DeUaJhwj7DJ/?exln=MWYxZ2wzdjdtc283NA==';
  const [currentSlide, setCurrentSlide] = useState(0);

  // Touch gesture handling
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);

  const prevSlide = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : SLIDES.length - 1));
  }, []);

  const nextSlide = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentSlide((prev) => (prev < SLIDES.length - 1 ? prev + 1 : 0));
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
    isDraggingRef.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = touchStartXRef.current - currentX;
    const diffY = touchStartYRef.current - currentY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 10) {
      isDraggingRef.current = true;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchStartXRef.current - touchEndX;
    const diffY = touchStartYRef.current - touchEndY;

    // Minimum swipe threshold of 40px with mostly horizontal motion
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0) {
        nextSlide(e);
      } else {
        prevSlide(e);
      }
    }

    touchStartXRef.current = null;
    touchStartYRef.current = null;
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 100);
  };

  const handleMediaClick = (e: React.MouseEvent) => {
    if (isDraggingRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <aside 
      aria-label="Instagram Post Preview"
      className={`relative group block rounded-3xl overflow-hidden border border-stone-200 dark:border-white/10 bg-white dark:bg-[#121214] shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 select-none ${className}`}
    >
      {/* Top Floating Badge on Card */}
      <div className="px-4 py-2 bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-amber-500/10 border-b border-stone-200/60 dark:border-white/5 flex items-center justify-between text-[11px] font-mono">
        <div className="flex items-center gap-1.5 text-[#D8261C] dark:text-amber-400 font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>OUR INSTAGRAM METRO GUIDE</span>
        </div>
        <a
          href={postUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:white font-sans text-[10px] transition-colors"
          title="Open in Instagram"
        >
          <span>Open post</span>
          <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      {/* 1. Instagram Post Header */}
      <div className="p-3.5 flex items-center justify-between gap-3">
        <a 
          href={postUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 min-w-0 no-underline text-inherit"
        >
          {/* Profile Avatar with Instagram Story Ring Gradient */}
          <div className="relative p-[2px] rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] shadow-xs shrink-0 group-hover:scale-105 transition-transform">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-500 text-stone-950 font-black flex items-center justify-center border-2 border-white dark:border-[#121214] shadow-inner">
              <span className="text-sm font-bold tracking-tighter">🏠</span>
            </div>
          </div>

          {/* Author info */}
          <div className="min-w-0 leading-tight text-left">
            <div className="flex items-center gap-1">
              <span className="font-bold text-xs sm:text-sm text-stone-900 dark:text-white truncate">
                flatzykolkata
              </span>
              <BadgeCheck className="w-3.5 h-3.5 fill-[#0095F6] text-white shrink-0" />
              <span className="text-[11px] text-[#0095F6] font-semibold hidden sm:inline ml-0.5">
                • Follow
              </span>
            </div>
            <p className="text-[10px] text-stone-500 dark:text-stone-400 truncate">
              Kolkata, India • Durga Puja Transit Guide
            </p>
          </div>
        </a>

        {/* Instagram Logo / More */}
        <div className="flex items-center gap-1.5 text-stone-400">
          <div className="w-5 h-5 rounded-md flex items-center justify-center bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white text-[10px] shadow-xs">
            📸
          </div>
          <MoreHorizontal className="w-4 h-4 text-stone-400" />
        </div>
      </div>

      {/* 2. Post Media / Slidable Carousel Container */}
      <div 
        className="relative w-full aspect-square bg-[#FAF8F5] dark:bg-stone-950 overflow-hidden border-y border-stone-100 dark:border-white/5 touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleMediaClick}
      >
        {/* Slides Track */}
        <div 
          className="flex h-full transition-transform duration-300 ease-out will-change-transform"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {SLIDES.map((slide, idx) => (
            <div 
              key={idx}
              className="relative min-w-full w-full h-full aspect-square shrink-0 flex items-center justify-center overflow-hidden bg-stone-950"
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                sizes="(max-width: 768px) 100vw, 420px"
                className="object-contain"
                priority={idx === 0}
              />
            </div>
          ))}
        </div>

        {/* Left Arrow Navigation Button */}
        {currentSlide > 0 && (
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/90 dark:bg-stone-900/90 backdrop-blur-md text-stone-900 dark:text-stone-100 shadow-lg border border-black/10 dark:border-white/10 flex items-center justify-center hover:scale-110 active:scale-95 transition-all opacity-90 hover:opacity-100 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
        )}

        {/* Right Arrow Navigation Button */}
        {currentSlide < SLIDES.length - 1 && (
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/90 dark:bg-stone-900/90 backdrop-blur-md text-stone-900 dark:text-stone-100 shadow-lg border border-black/10 dark:border-white/10 flex items-center justify-center hover:scale-110 active:scale-95 transition-all opacity-90 hover:opacity-100 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        )}

        {/* Dynamic Carousel Slide Pill (e.g. 1/7) */}
        <div className="absolute top-3 right-3 z-10 px-2.5 py-0.5 rounded-full bg-black/65 backdrop-blur-md text-white text-[11px] font-mono font-bold border border-white/20 shadow-md">
          {currentSlide + 1}/{SLIDES.length}
        </div>

        {/* Slide Category/Tag Pill */}
        <div className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded-full bg-black/55 backdrop-blur-md text-amber-300 text-[10px] font-medium border border-white/15 shadow-sm">
          {SLIDES[currentSlide].tag}
        </div>

        {/* Slide Subtitle caption badge at bottom */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 pointer-events-none">
          <div className="px-2.5 py-1 rounded-xl bg-black/65 backdrop-blur-md border border-white/10 text-white text-[10.5px] font-medium truncate text-center shadow-md">
            {SLIDES[currentSlide].caption}
          </div>
        </div>
      </div>

      {/* 3. Instagram Action Bar */}
      <div className="p-3.5 space-y-2.5">
        <div className="flex items-center justify-between text-stone-800 dark:text-stone-200">
          <div className="flex items-center gap-3.5">
            <Heart className="w-5 h-5 text-red-500 fill-red-500 hover:scale-125 transition-transform cursor-pointer" />
            <MessageCircle className="w-5 h-5 text-stone-700 dark:text-stone-300 hover:scale-110 transition-transform cursor-pointer" />
            <Send className="w-5 h-5 text-stone-700 dark:text-stone-300 hover:scale-110 transition-transform cursor-pointer" />
          </div>

          {/* Interactive Carousel dots indicator */}
          <div 
            className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-stone-100 dark:bg-stone-900/60"
            role="tablist"
            aria-label="Slide indicators"
          >
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={idx === currentSlide}
                aria-label={`Go to slide ${idx + 1}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentSlide(idx);
                }}
                className={`transition-all duration-200 rounded-full cursor-pointer ${
                  idx === currentSlide
                    ? 'w-4 h-1.5 bg-[#0095F6]'
                    : 'w-1.5 h-1.5 bg-stone-300 dark:bg-stone-600 hover:bg-stone-400 dark:hover:bg-stone-500'
                }`}
              />
            ))}
          </div>

          <Bookmark className="w-5 h-5 text-stone-700 dark:text-stone-300 hover:scale-110 transition-transform cursor-pointer" />
        </div>

        {/* 4. Likes & Caption */}
        <div className="text-xs text-stone-900 dark:text-stone-100 space-y-1 text-left">
          <div className="font-bold text-[11px] text-stone-800 dark:text-stone-200">
            Liked by <span className="font-bold">pandale.kolkata</span> and others
          </div>

          <p className="text-[11.5px] leading-relaxed line-clamp-2">
            <strong className="font-bold mr-1.5 text-stone-950 dark:text-white">flatzykolkata</strong>
            KOLKATA PUJO JUST GOT EASIER! Planning to pandal-hop across the city? Slide through our Metro routes + Pandal hopping circuits! 🚇✨
          </p>

          {/* Hashtags */}
          <p className="text-[10.5px] text-[#00376B] dark:text-blue-400 font-medium truncate pt-0.5">
            #kolkatadurgapuja #durgapuja2026 #iconicpandals #northkolkata #southkolkata #kolkatametro
          </p>
        </div>

        {/* View on Instagram Link pill */}
        <div className="pt-1.5 border-t border-stone-100 dark:border-white/5 flex items-center justify-between text-[11px]">
          <span className="text-stone-500 dark:text-stone-400 font-mono text-[10px]">
            Slide {currentSlide + 1} of {SLIDES.length}
          </span>
          <a
            href={postUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-[#0095F6] hover:underline"
          >
            <span>View post on Instagram</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </aside>
  );
}
