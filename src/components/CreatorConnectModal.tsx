'use client';

import React, { useState, useEffect } from 'react';
import { 
  MessageCircleQuestion, 
  Mail, 
  X, 
  Check, 
  Copy, 
  Sparkles, 
  ExternalLink,
  Code2
} from 'lucide-react';

function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.05 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function CreatorConnectModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const email = 'joy.thesloth@gmail.com';

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const whatsappMessage = encodeURIComponent(
    'Hi Joydeep! I came across Pandalé (pandale.in) and would love to connect about building a website or digital experience.'
  );
  const whatsappUrl = `https://wa.me/?text=${whatsappMessage}`;

  return (
    <>
      {/* Floating Trigger Button (Bottom Right above Navigation) */}
      <div className="fixed bottom-24 right-4 sm:bottom-8 sm:right-8 z-40 select-none">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          title="Who is behind this? Connect with Creator"
          className="relative group flex items-center gap-2 p-3 sm:p-3.5 rounded-full bg-gradient-to-tr from-[#25D366] to-[#128C7E] text-white shadow-xl shadow-emerald-950/60 border-2 border-white/20 hover:scale-110 active:scale-90 transition-all duration-300 cursor-pointer animate-periodic-jiggle btn-jiggle"
        >
          {/* Subtle Ambient Pulse Ring */}
          <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-40 animate-ping pointer-events-none" />

          {/* Combined WhatsApp / Question Message Icon */}
          <div className="relative flex items-center justify-center">
            <WhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="absolute -top-1.5 -right-2 px-1 py-0.2 rounded-full bg-amber-400 text-stone-900 font-extrabold text-[9px] font-mono shadow-xs border border-stone-900/20">
              ?
            </span>
          </div>

          {/* Expanded text on hover for desktop */}
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold tracking-wide pl-0 group-hover:pl-1">
            Connect
          </span>
        </button>
      </div>

      {/* Popover / Modal Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-md rounded-3xl bg-[#140810] border border-amber-500/35 shadow-2xl p-6 sm:p-7 text-stone-200 space-y-5 animate-in zoom-in-95 duration-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top decorative gradient sheen */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-[#25D366] to-[#D8261C]" />

            {/* Header with Title and Close Button */}
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-mono font-bold">
                  <Sparkles className="w-3 h-3" />
                  <span>Creator Spotlight</span>
                </span>
                <h3 className="text-2xl font-bold font-editorial text-white tracking-tight pt-1">
                  Who is behind this?
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Creator Bio Card */}
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-[#D8261C] p-0.5 shadow-md shrink-0 flex items-center justify-center text-white font-black font-editorial text-lg">
                  JD
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Joydeep Das</h4>
                  <p className="text-xs text-amber-300 font-mono">Full-Stack & Product Designer</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                I designed and built <strong>Pandalé</strong> to help thousands celebrate Kolkata Durga Puja with seamless transit guides, curated circuits, and real-time routes.
              </p>

              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2">
                <Code2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>Want a website or bespoke digital product like this? Let’s build together!</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-1">
              
              {/* WhatsApp Direct Connect */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 btn-jiggle"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>Connect on WhatsApp</span>
              </a>

              {/* Email Button */}
              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${email}?subject=Project%20Inquiry%20from%20Pandalé`}
                  className="flex-1 py-2.5 px-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 border border-white/15 btn-jiggle truncate"
                >
                  <Mail className="w-4 h-4 text-amber-300 shrink-0" />
                  <span className="truncate">{email}</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  title="Copy email to clipboard"
                  className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/15 text-stone-300 hover:text-white border border-white/15 btn-jiggle shrink-0 cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* GitHub Link */}
              <a
                href="https://github.com/JoyTheSloth"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 text-center text-xs text-stone-400 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>View GitHub Portfolio (@JoyTheSloth)</span>
                <ExternalLink className="w-3 h-3 text-stone-500" />
              </a>

            </div>

          </div>
        </div>
      )}
    </>
  );
}
