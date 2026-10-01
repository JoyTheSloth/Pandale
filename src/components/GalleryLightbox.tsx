'use client';

import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ExternalLink, User } from 'lucide-react';
import InstagramIcon from '@/components/icons/InstagramIcon';
import { PandalImage, InstagramPost } from '@/types';

type GalleryItem = (PandalImage | InstagramPost) & {
  type?: 'official' | 'instagram' | 'community' | 'latest';
};

interface GalleryLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  items: GalleryItem[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export default function GalleryLightbox({
  isOpen,
  onClose,
  items,
  currentIndex,
  onNavigate
}: GalleryLightboxProps) {
  const current = items[currentIndex];

  const handleNext = useCallback(() => {
    if (currentIndex < items.length - 1) {
      onNavigate(currentIndex + 1);
    } else {
      onNavigate(0); // loop around
    }
  }, [currentIndex, items.length, onNavigate]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
    } else {
      onNavigate(items.length - 1);
    }
  }, [currentIndex, items.length, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handleNext, handlePrev]);

  if (!isOpen || !current) return null;

  const imageUrl = (current as InstagramPost).media_url || (current as PandalImage).url;
  const caption = (current as InstagramPost).caption || (current as PandalImage).caption;
  const author = (current as InstagramPost).username || (current as PandalImage).author;
  const permalink = (current as InstagramPost).permalink || (current as PandalImage).author_url;
  const isInstagram = Boolean((current as InstagramPost).permalink);

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200">
      
      {/* Top Header Bar */}
      <div className="flex items-center justify-between z-10 w-full text-white/90">
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-2 py-0.5 rounded bg-white/10 text-amber-300">
            {currentIndex + 1} / {items.length}
          </span>
          {isInstagram && (
            <span className="flex items-center gap-1 text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded border border-pink-500/20">
              <InstagramIcon className="w-3 h-3" /> Authorized Instagram Post
            </span>
          )}
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Close fullscreen gallery"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
        
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-black/50 text-white/80 hover:text-white hover:bg-black/80 transition-all backdrop-blur-sm"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* The Media Display */}
        <div className="relative w-full h-full max-h-[80vh] flex items-center justify-center">
          <img
            src={imageUrl}
            alt={caption || 'Pandal photograph'}
            className="max-h-full max-w-full object-contain rounded-lg shadow-2xl select-none"
          />
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-black/50 text-white/80 hover:text-white hover:bg-black/80 transition-all backdrop-blur-sm"
          aria-label="Next photo"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

      </div>

      {/* Bottom Caption & Attribution Bar */}
      <div className="max-w-2xl mx-auto w-full z-10 glass-card bg-black/60 border border-white/10 rounded-2xl p-4 text-white text-xs">
        {author && (
          <div className="flex items-center justify-between mb-1.5 pb-1.5 border-b border-white/10">
            <div className="flex items-center gap-1.5 text-stone-300">
              {isInstagram ? (
                <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
              ) : (
                <User className="w-3.5 h-3.5 text-amber-300" />
              )}
              <span className="font-semibold text-white">@{author}</span>
            </div>

            {permalink && (
              <a
                href={permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-300 hover:text-white flex items-center gap-1 text-[11px] font-medium"
              >
                <span>View original post</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        )}

        {caption && (
          <p className="text-stone-300 line-clamp-2 leading-relaxed">
            {caption}
          </p>
        )}
      </div>

    </div>
  );
}
