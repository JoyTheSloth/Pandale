'use client';

import React, { useEffect, useState, useRef, useTransition } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function TopProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startProgress = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setVisible(true);
    setLoading(true);
    setProgress(28);

    // Incrementally increase progress to simulate smooth activity
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 88) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return 88;
        }
        // Decelerate as it approaches 88%
        const inc = Math.max(1.5, (88 - prev) * 0.18);
        return Math.min(prev + inc, 88);
      });
    }, 120);
  };

  const finishProgress = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setProgress(100);

    timeoutRef.current = setTimeout(() => {
      setVisible(false);
      timeoutRef.current = setTimeout(() => {
        setProgress(0);
        setLoading(false);
      }, 200);
    }, 250);
  };

  // Route change completion listener
  useEffect(() => {
    finishProgress();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [pathname, searchParams]);

  // Click interceptor for all internal anchor navigation
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      // Find closest anchor tag
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a') as HTMLAnchorElement | null;

      if (!anchor) return;

      const href = anchor.getAttribute('href');
      const targetAttr = anchor.getAttribute('target');

      // Ignore external links, downloads, new tabs, tel/mailto, or same-page anchors
      if (
        !href ||
        targetAttr === '_blank' ||
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('#') ||
        anchor.hasAttribute('download')
      ) {
        return;
      }

      // Check if clicking current path without changes
      const currentFullUrl = window.location.pathname + window.location.search;
      if (href === currentFullUrl || href === window.location.pathname) {
        return;
      }

      // Start the progress immediately on click
      startProgress();
    };

    document.addEventListener('click', handleDocumentClick, { capture: true });
    return () => {
      document.removeEventListener('click', handleDocumentClick, { capture: true });
    };
  }, []);

  if (!visible && progress === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none h-[3px] overflow-hidden"
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.25s ease-out',
      }}
    >
      {/* Background track shimmer */}
      <div className="absolute inset-0 bg-red-950/20 dark:bg-black/40" />

      {/* Glowing progress line */}
      <div
        className="h-full bg-gradient-to-r from-[#D8261C] via-[#F59E0B] to-[#FBBF24] relative transition-all duration-300 ease-out shadow-[0_0_12px_#F59E0B,0_0_5px_#D8261C]"
        style={{
          width: `${progress}%`,
        }}
      >
        {/* Leading edge laser head glow */}
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-r from-transparent to-white/90 blur-[1px]" />
      </div>
    </div>
  );
}
