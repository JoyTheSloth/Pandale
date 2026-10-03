import React from 'react';

export default function PandalCardSkeleton() {
  return (
    <div className="relative bg-[#FAF7F2] dark:bg-[#1A1215] rounded-[1.75rem] border border-[#EFE8DD] dark:border-white/10 p-2.5 sm:p-3 shadow-xs flex flex-row md:flex-col items-stretch gap-2.5 sm:gap-3.5 md:gap-0 overflow-hidden select-none">
      {/* 1. Media container skeleton */}
      <div className="relative w-32 sm:w-40 md:w-full shrink-0 rounded-2xl min-h-[145px] sm:min-h-[160px] md:min-h-[180px] md:mb-3 bg-stone-200/80 dark:bg-stone-800/60 animate-shimmer overflow-hidden">
        {/* Floating pill placeholder */}
        <div className="absolute top-2 left-2 w-14 h-4 rounded-full bg-white/60 dark:bg-stone-700/60" />
      </div>

      {/* 2. Content container */}
      <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
        <div>
          {/* Title line */}
          <div className="h-5 sm:h-5.5 w-4/5 rounded-md bg-stone-200/90 dark:bg-stone-800/80 animate-shimmer mb-1.5" />
          {/* Subtitle line */}
          <div className="h-3.5 w-3/5 rounded-md bg-stone-200/60 dark:bg-stone-800/50 animate-shimmer" />
        </div>

        {/* Metro transit pill skeleton */}
        <div className="my-2.5 p-1.5 sm:p-2 rounded-xl bg-stone-100 dark:bg-stone-900/50 border border-stone-200/60 dark:border-white/5 flex items-center gap-2">
          <div className="w-5.5 h-5.5 rounded-md bg-blue-500/20 dark:bg-blue-400/10 shrink-0" />
          <div className="h-3.5 w-3/5 rounded bg-stone-200/70 dark:bg-stone-800/60 animate-shimmer" />
          <div className="ml-auto h-3 w-10 rounded bg-stone-200/50 dark:bg-stone-800/40" />
        </div>

        {/* Bottom row: crowd badge + button */}
        <div className="pt-1 flex items-center justify-between border-t border-stone-200/50 dark:border-white/5">
          <div className="h-5 w-16 rounded-md bg-stone-200/60 dark:bg-stone-800/60" />
          <div className="h-7 w-20 rounded-lg bg-[#D8261C]/15 dark:bg-[#D8261C]/25" />
        </div>
      </div>
    </div>
  );
}
