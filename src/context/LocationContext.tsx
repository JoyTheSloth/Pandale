'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { calculateDistanceKm } from '@/lib/geo';
import { PANDALS_DATA } from '@/data/pandals';

export interface UserCoordinates {
  lat: number;
  lng: number;
}

export interface UserLocationState {
  coords: UserCoordinates | null;
  areaName: string;
  suburb: string;
  fullAddress: string;
  isLiveGps: boolean;
  status: 'idle' | 'loading' | 'success' | 'error';
  errorMessage: string | null;
}

interface LocationContextType {
  location: UserLocationState;
  fetchCurrentLocation: () => Promise<void>;
  resetLocation: () => void;
  setManualLocation: (area: string, suburb?: string, coords?: UserCoordinates) => void;
}

const DEFAULT_LOCATION: UserLocationState = {
  coords: null,
  areaName: 'Kolkata',
  suburb: 'West Bengal, India · Pandal Guide',
  fullAddress: 'Kolkata, West Bengal, India',
  isLiveGps: false,
  status: 'idle',
  errorMessage: null,
};

const LocationContext = createContext<LocationContextType | undefined>(undefined);

const STORAGE_KEY = 'pandale_user_gps_location_v1';

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useState<UserLocationState>(DEFAULT_LOCATION);

  // Restore saved location from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.areaName) {
          setLocation({
            ...parsed,
            status: 'success',
          });
        }
      }
    } catch {
      // ignore localStorage errors
    }
  }, []);

  // Determine closest known Kolkata area if Nominatim is slow or fails
  const findClosestKolkataArea = (lat: number, lng: number) => {
    let closestPandal = PANDALS_DATA[0];
    let minDistance = calculateDistanceKm(lat, lng, closestPandal.latitude, closestPandal.longitude);

    for (const p of PANDALS_DATA) {
      const dist = calculateDistanceKm(lat, lng, p.latitude, p.longitude);
      if (dist < minDistance) {
        minDistance = dist;
        closestPandal = p;
      }
    }

    return {
      areaName: closestPandal.locality || closestPandal.area,
      suburb: `Near ${closestPandal.name.split(' ')[0]} · Kolkata GPS`,
    };
  };

  const fetchCurrentLocation = useCallback(async () => {
    if (typeof window === 'undefined') return;

    if (!('geolocation' in navigator)) {
      setLocation((prev) => ({
        ...prev,
        status: 'error',
        errorMessage: 'Geolocation is not supported by your browser.',
      }));
      return;
    }

    setLocation((prev) => ({
      ...prev,
      status: 'loading',
      errorMessage: null,
    }));

    try {
      const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        });
      });

      const { latitude: lat, longitude: lng } = pos.coords;
      let area = 'Kolkata';
      let sub = 'Live GPS Location · Kolkata';
      let fullAddr = `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`;

      // Try reverse geocoding via OpenStreetMap Nominatim with a 3s timeout
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);

        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`,
          {
            signal: controller.signal,
            headers: {
              'Accept-Language': 'en',
            },
          }
        );
        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          const addr = data.address || {};

          // Extract best area identifier
          const detectedArea =
            addr.suburb ||
            addr.neighbourhood ||
            addr.residential ||
            addr.subdistrict ||
            addr.city_district ||
            addr.quarter ||
            addr.town ||
            addr.village ||
            addr.city;

          if (detectedArea) {
            area = detectedArea;
          }

          const city = addr.city || addr.town || addr.county || 'Kolkata';
          const state = addr.state || 'West Bengal';
          sub = `${city}, ${state} · Live GPS`;
          fullAddr = data.display_name || `${area}, ${city}`;
        } else {
          const fallback = findClosestKolkataArea(lat, lng);
          area = fallback.areaName;
          sub = fallback.suburb;
        }
      } catch {
        // Fallback to closest known pandal locality
        const fallback = findClosestKolkataArea(lat, lng);
        area = fallback.areaName;
        sub = fallback.suburb;
      }

      const updatedState: UserLocationState = {
        coords: { lat, lng },
        areaName: area,
        suburb: sub,
        fullAddress: fullAddr,
        isLiveGps: true,
        status: 'success',
        errorMessage: null,
      };

      setLocation(updatedState);

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedState));
      } catch {
        // ignore
      }
    } catch (err: any) {
      let message = 'Unable to retrieve location';
      if (err.code === 1) {
        message = 'Location permission denied. Enable GPS in browser settings.';
      } else if (err.code === 2) {
        message = 'Position unavailable.';
      } else if (err.code === 3) {
        message = 'Location request timed out.';
      }

      setLocation((prev) => ({
        ...prev,
        status: 'error',
        errorMessage: message,
      }));
    }
  }, []);

  const resetLocation = useCallback(() => {
    setLocation(DEFAULT_LOCATION);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  const setManualLocation = useCallback((area: string, suburb?: string, coords?: UserCoordinates) => {
    const updated: UserLocationState = {
      coords: coords || null,
      areaName: area,
      suburb: suburb || 'Kolkata, West Bengal',
      fullAddress: `${area}, Kolkata, West Bengal`,
      isLiveGps: false,
      status: 'success',
      errorMessage: null,
    };
    setLocation(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  }, []);

  return (
    <LocationContext.Provider
      value={{
        location,
        fetchCurrentLocation,
        resetLocation,
        setManualLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
}
