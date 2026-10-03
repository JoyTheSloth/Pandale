'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  X, 
  Check, 
  Copy, 
  ExternalLink,
  CheckCheck,
  Mail,
  Download,
  Coffee,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  Zap
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
  const [activeTab, setActiveTab] = useState<'chat' | 'help'>('chat');
  const [showQr, setShowQr] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  const email = 'joy.thesloth@gmail.com';
  const upiId = 'joy.thesloth@okicici';
  const gpayUpiUrl = `upi://pay?pa=${upiId}&pn=Joydeep%20Das&cu=INR&tn=${encodeURIComponent('Puja treat dedo')}&aid=uGICAgKCA0KWEbQ`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent("Hi Joydeep! I'm interested in building a website / digital product.")}`;
  const jobWhatsappUrl = `https://wa.me/?text=${encodeURIComponent("Hi Joydeep! I saw Pandalé and would love to discuss a job opportunity / freelance project.")}`;

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyUpi = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  // Close on Escape or click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
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
      {/* 1. Floating Trigger Button (Bottom Right) */}
      <div className="fixed bottom-22 right-4 sm:bottom-8 sm:right-8 z-40 select-none flex items-center gap-2.5">
        {/* Companion pill on desktop */}
        {!isOpen && (
          <div
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/95 dark:bg-[#1A1215]/95 backdrop-blur-md border border-stone-200/80 dark:border-white/10 shadow-lg text-xs font-semibold text-stone-800 dark:text-stone-200 cursor-pointer hover:border-[#25D366]/50 hover:shadow-xl hover:scale-102 transition-all duration-300 group"
          >
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            <span>Buy me a coffee ☕ · Love Pandalé? Help me out 😂</span>
          </div>
        )}

        {/* Circular Action Button with WhatsApp Icon */}
        <button
          id="whatsapp-floating-trigger"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          title="Chat on WhatsApp or Buy Me a Coffee"
          aria-label="Chat on WhatsApp or Buy Me a Coffee"
          className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] shadow-xl shadow-[#25D366]/40 hover:shadow-2xl hover:shadow-[#25D366]/60 hover:scale-108 active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center text-white shrink-0 overflow-visible"
        >
          {/* Subtle Ambient Pulse Ring */}
          {!isOpen && (
            <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-35 animate-ping pointer-events-none" />
          )}

          {isOpen ? (
            <div className="w-full h-full rounded-full bg-[#075E54] flex items-center justify-center text-white">
              <X className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
            </div>
          ) : (
            <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white drop-shadow-xs" />
          )}
        </button>
      </div>

      {/* 2. Authentic WhatsApp Dialogue Box with "Help Me Out" Support View */}
      {isOpen && (
        <div
          ref={dialogRef}
          className="fixed bottom-28 right-4 sm:bottom-24 sm:right-8 z-50 w-[350px] sm:w-[395px] max-w-[calc(100vw-2rem)] rounded-3xl overflow-hidden shadow-2xl border border-rose-900/30 dark:border-rose-500/20 bg-[#EFEAE2] dark:bg-[#0B141A] flex flex-col animate-in slide-in-from-bottom-6 zoom-in-95 duration-200"
        >
          {/* A. Header — Custom Graphic Hero Banner */}
          <div className="relative w-full aspect-[16/9] bg-[#0C0207] overflow-hidden select-none">
            <Image
              src="/creator/whatsapp-header.png"
              alt="Joydeep Das — Creator & Pandalé Builder"
              fill
              priority
              unoptimized
              className="object-cover object-center pointer-events-none"
              sizes="(max-width: 640px) 350px, 395px"
            />

            {/* Accessible Screen Reader Information */}
            <div className="sr-only">
              <h3>Joydeep Das - Creator</h3>
              <p>Online · Pandalé Builder</p>
            </div>

            {/* Interactive Close Button precisely positioned over top-right header button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-black/75 text-white/90 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-90 cursor-pointer z-20 border border-white/20 backdrop-blur-xs shadow-lg"
              aria-label="Close chat dialog"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
            </button>
          </div>

          {/* Quick Navigation Tabs: Chat vs Sponsor Cha */}
          <div className="bg-[#0B141A] border-b border-white/10 p-2 sm:p-2.5">
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-white/5 dark:bg-black/40 rounded-xl text-xs font-bold border border-white/5">
              <button
                type="button"
                onClick={() => setActiveTab('chat')}
                className={`py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'chat'
                    ? 'bg-[#E51E3E] text-white shadow-xs font-semibold'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('help');
                  setShowQr(false);
                }}
                className={`py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'help'
                    ? 'bg-amber-400 text-stone-950 shadow-xs font-semibold'
                    : 'text-amber-200/80 hover:text-amber-100 hover:bg-white/10'
                }`}
              >
                <Coffee className="w-3.5 h-3.5 text-amber-500" />
                <span>Buy Me a Coffee ☕</span>
              </button>
            </div>
          </div>

          {/* B. Tab 1: WhatsApp Chat Body */}
          {activeTab === 'chat' && (
            <>
              <div className="p-3.5 space-y-3 max-h-[340px] overflow-y-auto no-scrollbar">
                {/* Date Pill */}
                <div className="flex justify-center">
                  <span className="px-3 py-0.5 rounded-md bg-white/80 dark:bg-[#182229] text-[10px] uppercase font-semibold text-stone-600 dark:text-stone-300 shadow-2xs">
                    Today
                  </span>
                </div>

                {/* Message Bubble 1 */}
                <div className="bg-white dark:bg-[#202C33] p-3 rounded-2xl rounded-tl-xs shadow-xs text-stone-800 dark:text-stone-100 text-xs sm:text-sm leading-relaxed max-w-[94%] space-y-1 relative">
                  <p>
                    👋 Hi! I&rsquo;m <strong className="font-semibold text-[#075E54] dark:text-emerald-400">Joydeep Das</strong>.
                  </p>
                  <p className="text-xs text-stone-600 dark:text-stone-300">
                    I built <strong>Pandalé</strong> to make Durga Puja pandal hopping effortless with metro routes &amp; live transit.
                  </p>
                  <div className="flex items-center justify-end gap-1 text-[10px] text-stone-400 pt-0.5 font-mono">
                    <span>11:42 AM</span>
                    <CheckCheck className="w-3.5 h-3.5 text-[#53BDEB]" />
                  </div>
                </div>


                {/* Message Bubble 3 (Business & Web Dev) */}
                <div className="bg-white dark:bg-[#202C33] p-3 rounded-2xl rounded-tl-xs shadow-xs text-stone-800 dark:text-stone-100 text-xs sm:text-sm leading-relaxed max-w-[94%] space-y-1 relative">
                  <p className="text-xs text-stone-700 dark:text-stone-200 font-medium">
                    Website like this for your business? Let&rsquo;s connect. 🚀
                  </p>
                  <div className="flex items-center justify-end gap-1 text-[10px] text-stone-400 pt-0.5 font-mono">
                    <span>11:44 AM</span>
                    <CheckCheck className="w-3.5 h-3.5 text-[#53BDEB]" />
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="p-3 bg-[#F0F2F5] dark:bg-[#202C33] border-t border-stone-200 dark:border-white/5 space-y-2">
                <a
                  href={gpayUpiUrl}
                  onClick={() => {
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(upiId).catch(() => {});
                    }
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all duration-150 cursor-pointer text-center"
                >
                  <Coffee className="w-4 h-4 text-white shrink-0" />
                  <span>Buy me a coffee (puja treat dedo) ☕</span>
                </a>

                {/* Quick Secondary Contact Drawer (Email & Instagram) */}
                <div className="pt-1 flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="flex items-center gap-1 hover:text-stone-800 dark:hover:text-stone-200 hover:scale-105 active:scale-95 cursor-pointer transition-all duration-150"
                    title="Copy creator email"
                  >
                    <Mail className="w-3 h-3 text-amber-500" />
                    <span className="truncate max-w-[150px]">{email}</span>
                    {copiedEmail ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  </button>

                  <a
                    href="https://www.instagram.com/jethalal.das/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-stone-800 dark:hover:text-stone-200 hover:scale-105 active:scale-95 transition-all duration-150 group"
                    title="Connect on Instagram"
                  >
                    <InstagramIcon className="w-3.5 h-3.5 text-pink-500 group-hover:scale-115 transition-transform duration-150" />
                    <span className="font-medium">@jethalal.das</span>
                    <ExternalLink className="w-2.5 h-2.5 text-stone-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150" />
                  </a>
                </div>
              </div>
            </>
          )}

          {/* C. Tab 2: "Help Me Out" View (Dignified Options: Cha, Flatzy, Remote Job & Portfolio) */}
          {activeTab === 'help' && (
            <div className="p-3.5 space-y-3 max-h-[460px] overflow-y-auto no-scrollbar">
              
              {showQr ? (
                /* QR Code View (Revealed ONLY when user explicitly chooses "Sponsor a Cha") */
                <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* Back to Options button */}
                  <button
                    type="button"
                    onClick={() => setShowQr(false)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white bg-stone-100 hover:bg-stone-200 dark:bg-white/10 dark:hover:bg-white/15 transition-all cursor-pointer shadow-2xs"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>← Back to all options</span>
                  </button>

                  <div className="bg-white dark:bg-[#111B21] p-3.5 rounded-2xl border border-amber-500/30 dark:border-amber-500/20 shadow-sm flex flex-col items-center space-y-2.5">
                    <div className="text-center">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-bold block">
                        ☕ Joydeep&rsquo;s Coffee &amp; Creator Fund
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-white">
                        Scan with any UPI App
                      </h4>
                      <p className="text-[10.5px] text-stone-500 dark:text-stone-400">
                        GPay · PhonePe · Paytm · CRED · BHIM
                      </p>
                    </div>

                    {/* The QR Image */}
                    <div className="relative w-40 h-40 sm:w-44 sm:h-44 rounded-xl overflow-hidden border-2 border-stone-200 dark:border-white/20 bg-white p-2 shadow-inner">
                      <Image
                        src="/creator/qr.jpg"
                        alt="Google Pay QR Code - Joydeep Das"
                        width={176}
                        height={176}
                        className="w-full h-full object-contain rounded-lg"
                        priority
                      />
                    </div>

                    {/* Copy UPI ID Pill */}
                    <button
                      type="button"
                      onClick={handleCopyUpi}
                      className="px-3 py-1 rounded-lg bg-stone-100 dark:bg-white/10 hover:bg-stone-200 dark:hover:bg-white/15 text-[11px] font-mono font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Click to copy UPI ID"
                    >
                      <span>UPI: {upiId}</span>
                      {copiedUpi ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 text-stone-400" />}
                    </button>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 w-full pt-1">
                      <a
                        href="/creator/qr.jpg"
                        download="Joydeep-Das-GPay-QR.jpg"
                        className="flex-1 py-2 px-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-white/10 dark:hover:bg-white/15 text-stone-800 dark:text-stone-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download QR</span>
                      </a>

                      <a
                        href="upi://pay?pa=joy.thesloth@okicici&pn=Joydeep%20Das&cu=INR&tn=Pandale%20Support&aid=uGICAgKCA0KWEbQ"
                        onClick={() => {
                          if (navigator.clipboard) {
                            navigator.clipboard.writeText(upiId).catch(() => {});
                          }
                        }}
                        title="Open UPI App (GPay, PhonePe, Paytm, CRED)"
                        className="flex-1 py-2 px-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                      >
                        <Zap className="w-3.5 h-3.5 fill-white" />
                        <span>Direct UPI</span>
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                /* Dignified Default View (No QR Code shoving — witty, entrepreneurial, clean) */
                <div className="space-y-2.5 animate-in fade-in duration-200">
                  {/* Creator Hub Header */}
                  <div className="bg-white dark:bg-[#202C33] p-3 rounded-2xl shadow-xs text-center space-y-1 border border-stone-200/80 dark:border-white/10">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-[10px] font-mono font-bold">
                      ☕ Creator Hub
                    </span>
                    <h4 className="font-editorial text-sm sm:text-base font-bold text-stone-900 dark:text-white leading-tight">
                      Love Pandalé? Support the creator ☕
                    </h4>
                  </div>

                  {/* 4 Sleek Option Cards */}
                  <div className="space-y-2">
                    {/* Option 1: Buy Me a Coffee */}
                    <button
                      type="button"
                      onClick={() => setShowQr(true)}
                      className="w-full p-2.5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-stone-900 dark:text-white flex items-center justify-between shadow-2xs hover:scale-[1.01] active:scale-98 transition-all cursor-pointer group text-left"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center text-sm shadow-xs shrink-0 group-hover:rotate-12 transition-transform">
                          ☕
                        </div>
                        <div className="leading-tight">
                          <div className="text-xs font-bold text-amber-950 dark:text-amber-200">
                            Buy Me a Coffee
                          </div>
                          <div className="text-[10px] text-stone-500 dark:text-stone-400 font-normal">
                            UPI, GPay &amp; QR
                          </div>
                        </div>
                      </div>
                      <div className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-stone-950 text-[11px] font-bold shrink-0 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform shadow-2xs">
                        <span>Donate</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </button>

                    {/* Option 2: Visit Flatzy */}
                    <a
                      href="https://flatzy.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full p-2.5 rounded-2xl bg-blue-600/10 hover:bg-blue-600/15 border border-blue-500/30 text-stone-900 dark:text-white flex items-center justify-between shadow-2xs hover:scale-[1.01] active:scale-98 transition-all cursor-pointer group text-left"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center text-sm shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                          🏠
                        </div>
                        <div className="leading-tight">
                          <div className="text-xs font-bold text-blue-950 dark:text-blue-200">
                            Flatzy
                          </div>
                          <div className="text-[10px] text-stone-500 dark:text-stone-400 font-normal">
                            Find verified flats in Kolkata
                          </div>
                        </div>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-blue-500 group-hover:translate-x-0.5 transition-transform shrink-0 mr-1" />
                    </a>

                    {/* Option 3: Remote Job / Hire Me (Redirects to WhatsApp) */}
                    <a
                      href={jobWhatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full p-2.5 rounded-2xl bg-emerald-600/10 hover:bg-emerald-600/15 border border-emerald-500/30 text-stone-900 dark:text-white flex items-center justify-between shadow-2xs hover:scale-[1.01] active:scale-98 transition-all cursor-pointer group text-left"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-[#25D366] text-white flex items-center justify-center text-sm shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                          <WhatsAppIcon className="w-4.5 h-4.5 text-white" />
                        </div>
                        <div className="leading-tight">
                          <div className="text-xs font-bold text-emerald-950 dark:text-emerald-200">
                            Hire Me / Remote Roles
                          </div>
                          <div className="text-[10px] text-stone-500 dark:text-stone-400 font-normal">
                            Full-Stack &amp; Next.js developer
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-600 group-hover:translate-x-0.5 transition-transform shrink-0 mr-1" />
                    </a>

                    {/* Option 4: Portfolio */}
                    <a
                      href="https://joydeepdas-portfolio.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full p-2.5 rounded-2xl bg-stone-100 hover:bg-stone-200/80 dark:bg-white/5 dark:hover:bg-white/10 border border-stone-200 dark:border-white/10 text-stone-900 dark:text-white flex items-center justify-between shadow-2xs hover:scale-[1.01] active:scale-98 transition-all cursor-pointer group text-left"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center text-sm shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                          👨‍💻
                        </div>
                        <div className="leading-tight">
                          <div className="text-xs font-bold text-stone-900 dark:text-white">
                            Portfolio
                          </div>
                          <div className="text-[10px] text-stone-500 dark:text-stone-400 font-normal">
                            joydeepdas-portfolio.vercel.app
                          </div>
                        </div>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-0.5 transition-transform shrink-0 mr-1" />
                    </a>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>
      )}
    </>
  );
}
