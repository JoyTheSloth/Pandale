import React from 'react';
import PandalCardSkeleton from './PandalCardSkeleton';

export default function PandalsPageSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full animate-page-enter select-none">
      {/* Top Search Bar Skeleton */}
      <div className="max-w-2xl mx-auto mb-6">
        <div className="h-12 w-full rounded-2xl bg-[#FAF7F2] dark:bg-[#1A1215] border border-[#EFE8DD] dark:border-white/10 p-2 flex items-center gap-3">
          <div className="w-5 h-5 rounded-full bg-stone-300/60 dark:bg-stone-700/60 ml-2" />
          <div className="h-4 w-48 rounded bg-stone-200/80 dark:bg-stone-800/80 animate-shimmer" />
        </div>

        {/* Filter Pills Skeleton */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-3 mt-1">
          {[80, 110, 95, 120, 90, 105].map((width, i) => (
            <div
              key={i}
              className="h-8 rounded-full bg-[#FAF7F2] dark:bg-[#1A1215] border border-[#EFE8DD] dark:border-white/10 shrink-0 animate-shimmer"
              style={{ width: `${width}px` }}
            />
          ))}
        </div>
      </div>

      {/* Grid of Skeleton Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
        {Array.from({ length: 6 }).map((_, idx) => (
          <PandalCardSkeleton key={idx} />
        ))}
      </div>
    </div>
  );
}
