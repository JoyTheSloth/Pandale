'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { X, Download, Smartphone } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
  prompt(): Promise<void>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }
    if (sessionStorage.getItem('pandale-install-dismissed')) {
      setIsDismissed(true);
      return;
    }
    const ua = navigator.userAgent;
    const iosDevice = /iphone|ipad|ipod/i.test(ua) && !(window as any).MSStream;
    const isSafari = /safari/i.test(ua) && !/chrome/i.test(ua);
    if (iosDevice && isSafari) {
      setIsIos(true);
      setTimeout(() => setIsVisible(true), 3500);
      return;
    }
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setTimeout(() => setIsVisible(true), 3500);
    };
    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setIsVisible(false);
    });
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') setIsInstalled(true);
    setDeferredPrompt(null);
    dismiss();
  };

  const dismiss = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsDismissed(true);
      sessionStorage.setItem('pandale-install-dismissed', '1');
    }, 350);
  };

  if (!isVisible || isDismissed || isInstalled) return null;

  return (
    <div
      className={`fixed bottom-20 md:bottom-6 inset-x-4 max-w-sm md:max-w-md mx-auto z-50 transition-all duration-350 ${
        isAnimatingOut ? 'opacity-0 translate-y-4 scale-95' : 'opacity-100 translate-y-0 scale-100'
      }`}
      style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
    >
      <div className="relative bg-white dark:bg-[#1C0F12] rounded-3xl border border-stone-200 dark:border-white/10 shadow-2xl shadow-black/20 dark:shadow-black/60 overflow-hidden">
        <div className="h-1 w-full bg-gradient-to-r from-[#D8261C] via-amber-500 to-[#D8261C]" />
        <div className="p-4 flex items-start gap-3.5">
          <div className="shrink-0 w-14 h-14 rounded-2xl overflow-hidden border-2 border-[#D8261C]/20 shadow-md shadow-[#D8261C]/10">
            <Image src="/brand/pandale-icon.png" alt="Pandale" width={56} height={56} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-bold text-stone-900 dark:text-white text-sm leading-tight">Add Pandale to Home Screen</p>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 leading-snug">
                  {isIos ? 'Tap Share then "Add to Home Screen" in Safari' : 'Install for offline access & a faster experience'}
                </p>
              </div>
              <button onClick={dismiss} aria-label="Dismiss" className="shrink-0 w-6 h-6 rounded-full bg-stone-100 dark:bg-white/10 flex items-center justify-center hover:bg-stone-200 dark:hover:bg-white/20 transition-colors mt-0.5">
                <X className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400" />
              </button>
            </div>
            <div className="mt-3 flex items-center gap-2">
              {isIos ? (
                <div className="flex items-center gap-1.5 text-[11px] text-stone-600 dark:text-stone-300 font-medium bg-stone-50 dark:bg-white/5 rounded-xl px-3 py-1.5 border border-stone-200 dark:border-white/10">
                  <Smartphone className="w-3.5 h-3.5 text-[#D8261C]" />
                  <span>Tap Share then Add to Home Screen</span>
                </div>
              ) : (
                <>
                  <button onClick={handleInstall} className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#D8261C] hover:bg-[#B91C1C] text-white text-xs font-bold shadow-md shadow-[#D8261C]/30 hover:scale-105 active:scale-95 transition-all duration-150">
                    <Download className="w-3.5 h-3.5" />
                    <span>Install App</span>
                  </button>
                  <button onClick={dismiss} className="px-3 py-1.5 rounded-xl text-xs font-medium text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors">Not now</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
