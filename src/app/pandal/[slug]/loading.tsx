import React from 'react';

export default function PandalDetailLoading() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 w-full animate-page-enter select-none">
      {/* Top back button skeleton */}
      <div className="flex items-center justify-between mb-4">
        <div className="h-9 w-24 rounded-full bg-[#FAF7F2] dark:bg-[#1A1215] border border-[#EFE8DD] dark:border-white/10 animate-shimmer" />
        <div className="flex gap-2">
          <div className="h-9 w-9 rounded-full bg-[#FAF7F2] dark:bg-[#1A1215] border border-[#EFE8DD] dark:border-white/10" />
          <div className="h-9 w-9 rounded-full bg-[#FAF7F2] dark:bg-[#1A1215] border border-[#EFE8DD] dark:border-white/10" />
        </div>
      </div>

      {/* Hero Media Container Skeleton */}
      <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-3xl bg-stone-200/80 dark:bg-stone-800/60 animate-shimmer overflow-hidden mb-6">
        <div className="absolute top-4 left-4 w-28 h-6 rounded-full bg-white/70 dark:bg-stone-700/60" />
      </div>

      {/* Title & Locality Skeleton */}
      <div className="mb-6">
        <div className="h-8 sm:h-10 w-2/3 rounded-lg bg-stone-200/90 dark:bg-stone-800/80 animate-shimmer mb-2.5" />
        <div className="h-4 sm:h-5 w-1/3 rounded-md bg-stone-200/60 dark:bg-stone-800/50 animate-shimmer mb-4" />
        
        {/* Tag pills */}
        <div className="flex gap-2">
          {[70, 90, 80].map((w, i) => (
            <div key={i} className="h-6 rounded-md bg-[#FAF7F2] dark:bg-[#1A1215] border border-[#EFE8DD] dark:border-white/10" style={{ width: `${w}px` }} />
          ))}
        </div>
      </div>

      {/* Action Buttons Row Skeleton */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        <div className="h-12 rounded-2xl bg-[#D8261C]/15 dark:bg-[#D8261C]/25 animate-shimmer" />
        <div className="h-12 rounded-2xl bg-amber-500/15 dark:bg-amber-500/25 animate-shimmer" />
      </div>

      {/* Metro Details Card Skeleton */}
      <div className="p-5 rounded-3xl bg-[#FAF7F2] dark:bg-[#1A1215] border border-[#EFE8DD] dark:border-white/10 mb-8 animate-shimmer">
        <div className="h-5 w-40 rounded bg-stone-200/90 dark:bg-stone-800/80 mb-4" />
        <div className="h-14 w-full rounded-2xl bg-stone-100 dark:bg-stone-900/60" />
      </div>
    </div>
  );
}
