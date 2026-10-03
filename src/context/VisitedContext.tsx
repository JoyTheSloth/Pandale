'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface VisitedContextType {
  visited: string[];
  isVisited: (pandalId: string) => boolean;
  toggleVisited: (pandalId: string) => void;
  count: number;
  isLoaded: boolean;
}

const COOKIE_NAME = 'visited_pandals';

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
  }
  return null;
}

function setCookie(name: string, value: string, days = 365) {
  if (typeof document === 'undefined') return;
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = '; expires=' + date.toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=/; SameSite=Lax`;
}

const VisitedContext = createContext<VisitedContextType>({
  visited: [],
  isVisited: () => false,
  toggleVisited: () => {},
  count: 0,
  isLoaded: false,
});

export function VisitedProvider({ children }: { children: React.ReactNode }) {
  const [visited, setVisited] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = getCookie(COOKIE_NAME);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setVisited(parsed);
        }
      }
    } catch (e) {
      console.error('Error parsing visited_pandals cookie:', e);
    }
    setIsLoaded(true);

    const handleSync = () => {
      try {
        const raw = getCookie(COOKIE_NAME);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            setVisited(parsed);
          }
        }
      } catch {
        // ignore
      }
    };

    window.addEventListener('visited_pandals_changed', handleSync);
    return () => window.removeEventListener('visited_pandals_changed', handleSync);
  }, []);

  const toggleVisited = (pandalId: string) => {
    setVisited((prev) => {
      const next = prev.includes(pandalId)
        ? prev.filter((id) => id !== pandalId)
        : [...prev, pandalId];

      try {
        setCookie(COOKIE_NAME, JSON.stringify(next), 365);
        window.dispatchEvent(new Event('visited_pandals_changed'));
      } catch (e) {
        console.error('Error writing visited_pandals cookie:', e);
      }
      return next;
    });
  };

  const isVisited = (pandalId: string) => visited.includes(pandalId);

  return (
    <VisitedContext.Provider
      value={{
        visited,
        isVisited,
        toggleVisited,
        count: visited.length,
        isLoaded,
      }}
    >
      {children}
    </VisitedContext.Provider>
  );
}

export function useVisited() {
  return useContext(VisitedContext);
}
