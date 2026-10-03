import React from 'react';

export default function Loading() {
  return (
    <div className="w-full min-h-[65vh] flex flex-col items-center justify-center p-6 select-none animate-page-enter">
      {/* Branded festive pulsing emblem */}
      <div className="relative flex items-center justify-center w-16 h-16 mb-4">
        {/* Outer glowing pulsing ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#D8261C] to-[#F59E0B] opacity-20 dark:opacity-30 animate-ping" />
        
        {/* Soft rotating gradient border */}
        <div className="w-14 h-14 rounded-full border-2 border-[#FED7AA] dark:border-white/10 border-t-[#D8261C] dark:border-t-amber-400 animate-spin" />
        
        {/* Central glowing icon */}
        <div className="absolute inset-0 flex items-center justify-center text-xl select-none">
          <span className="animate-pulse">🌺</span>
        </div>
      </div>

      {/* Subtle loader text */}
      <div className="flex flex-col items-center text-center gap-1">
        <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#1C1917] dark:text-white uppercase font-mono">
          Loading
        </span>
        <span className="text-[11px] text-[#78716C] dark:text-[#A8A29E]">
          Kolkata Durga Puja 2026
        </span>
      </div>
    </div>
  );
}
