'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Check, 
  Copy, 
  ExternalLink,
  CheckCheck,
  Mail
} from 'lucide-react';

function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.05 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function InstagramIcon({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function CreatorConnectModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const email = 'joy.thesloth@gmail.com';
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent("Hi Joydeep! I'm interested in building a website / digital product.")}`;

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Close on Escape or click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        // Only close if not clicking the toggle button
        const target = e.target as HTMLElement;
        if (!target.closest('#whatsapp-floating-trigger')) {
          setIsOpen(false);
        }
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* 1. Floating WhatsApp Trigger Button (Bottom Right) */}
      <div className="fixed bottom-24 right-4 sm:bottom-8 sm:right-8 z-40 select-none">
        <button
          id="whatsapp-floating-trigger"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          title="Who is behind this? Connect on WhatsApp"
          aria-label="Connect with Creator on WhatsApp"
          className="relative group flex items-center gap-2 p-3 sm:p-3.5 rounded-full bg-gradient-to-tr from-[#25D366] to-[#128C7E] text-white shadow-xl shadow-emerald-950/60 border-2 border-white/20 hover:scale-110 active:scale-90 transition-all duration-300 cursor-pointer animate-periodic-jiggle btn-jiggle"
        >
          {/* Subtle Ambient Pulse Ring */}
          {!isOpen && (
            <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-40 animate-ping pointer-events-none" />
          )}

          {/* WhatsApp / Question Message Icon */}
          <div className="relative flex items-center justify-center">
            {isOpen ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <>
                <WhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="absolute -top-1.5 -right-2 px-1 py-0.2 rounded-full bg-amber-400 text-stone-900 font-extrabold text-[9px] font-mono shadow-xs border border-stone-900/20">
                  ?
                </span>
              </>
            )}
          </div>

          {/* Expand text on hover for desktop */}
          {!isOpen && (
            <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold tracking-wide pl-0 group-hover:pl-1">
              Connect
            </span>
          )}
        </button>
      </div>

      {/* 2. Authentic WhatsApp Dialogue Box */}
      {isOpen && (
        <div
          ref={dialogRef}
          className="fixed bottom-28 right-4 sm:bottom-24 sm:right-8 z-50 w-[350px] sm:w-[380px] max-w-[calc(100vw-2rem)] rounded-3xl overflow-hidden shadow-2xl border border-emerald-900/20 dark:border-white/10 bg-[#EFEAE2] dark:bg-[#0B141A] flex flex-col animate-in slide-in-from-bottom-6 zoom-in-95 duration-200"
        >
          
          {/* A. WhatsApp Header */}
          <div className="bg-[#075E54] dark:bg-[#1F2C34] text-white p-3.5 sm:p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              {/* Profile Avatar with Online Dot */}
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-[#D8261C] flex items-center justify-center text-white font-bold font-editorial text-sm shadow-xs border border-white/20">
                  JD
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#25D366] border-2 border-[#075E54] dark:border-[#1F2C34] animate-pulse" />
              </div>

              {/* Creator Info */}
              <div className="leading-tight">
                <h3 className="font-bold text-sm sm:text-base text-white flex items-center gap-1.5">
                  <span>Joydeep Das</span>
                  <span className="text-[10px] font-mono bg-emerald-700/80 px-1.5 py-0.2 rounded text-emerald-100 font-normal">Creator</span>
                </h3>
                <p className="text-[11px] text-emerald-100/90 font-medium">
                  Online · Typically replies fast
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer btn-jiggle"
              aria-label="Close chat dialog"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* B. WhatsApp Chat Body */}
          <div className="p-3.5 space-y-3 max-h-[320px] overflow-y-auto no-scrollbar">
            {/* Date Pill */}
            <div className="flex justify-center">
              <span className="px-3 py-0.5 rounded-md bg-white/80 dark:bg-[#182229] text-[10px] uppercase font-semibold text-stone-600 dark:text-stone-300 shadow-2xs">
                Today
              </span>
            </div>

            {/* Message Bubble 1 */}
            <div className="bg-white dark:bg-[#202C33] p-3 rounded-2xl rounded-tl-xs shadow-xs text-stone-800 dark:text-stone-100 text-xs sm:text-sm leading-relaxed max-w-[92%] space-y-1 relative">
              <p>
                👋 Hi there! I&rsquo;m <strong className="font-semibold text-[#075E54] dark:text-emerald-400">Joydeep Das</strong>.
              </p>
              <p className="text-xs text-stone-600 dark:text-stone-300">
                I designed and built <strong>Pandalé</strong> to help thousands celebrate Kolkata Durga Puja 2026 with seamless metro transit, routes, and crowd insights.
              </p>
              <div className="flex items-center justify-end gap-1 text-[10px] text-stone-400 pt-0.5 font-mono">
                <span>11:42 AM</span>
                <CheckCheck className="w-3.5 h-3.5 text-[#53BDEB]" />
              </div>
            </div>

            {/* Message Bubble 2 (Business & Contact) */}
            <div className="bg-white dark:bg-[#202C33] p-3 rounded-2xl rounded-tl-xs shadow-xs text-stone-800 dark:text-stone-100 text-xs sm:text-sm leading-relaxed max-w-[92%] space-y-1 relative">
              <p className="font-medium">
                Want a custom website, Next.js web application, or digital product built like this?
              </p>
              <p className="text-xs text-stone-600 dark:text-stone-300">
                Let&rsquo;s connect! Tap below to chat directly on WhatsApp or drop an email. 🚀
              </p>
              <div className="flex items-center justify-end gap-1 text-[10px] text-stone-400 pt-0.5 font-mono">
                <span>11:42 AM</span>
                <CheckCheck className="w-3.5 h-3.5 text-[#53BDEB]" />
              </div>
            </div>
          </div>

          {/* C. WhatsApp Action & Contact Bar */}
          <div className="p-3 bg-[#F0F2F5] dark:bg-[#202C33] border-t border-stone-200 dark:border-white/5 space-y-2">
            {/* Direct 1-Click WhatsApp CTA */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm btn-jiggle transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>Chat on WhatsApp</span>
            </a>

            {/* Quick Secondary Contact Drawer (Email & Instagram) */}
            <div className="pt-1 flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="flex items-center gap-1 hover:text-stone-800 dark:hover:text-stone-200 cursor-pointer transition-colors btn-jiggle"
                title="Copy creator email"
              >
                <Mail className="w-3 h-3 text-amber-500" />
                <span className="truncate max-w-[150px]">{email}</span>
                {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
              </button>

              <a
                href="https://www.instagram.com/jethalal.das/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-stone-800 dark:hover:text-stone-200 transition-colors btn-jiggle group"
                title="Connect on Instagram"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-pink-500 group-hover:scale-110 transition-transform" />
                <span className="font-medium">@jethalal.das</span>
                <ExternalLink className="w-2.5 h-2.5 text-stone-400" />
              </a>
            </div>
          </div>

        </div>
      )}
    </>
  );
}
