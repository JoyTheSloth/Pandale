/**
 * Geolocation utility functions for Pujo 2026
 */

/**
 * Calculates the great-circle distance between two coordinates in kilometers (Haversine formula)
 */
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radius of Earth in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Formats a distance into user-friendly text (e.g., "450 m away" or "1.8 km away")
 */
export function formatDistance(distanceKm: number): string {
  if (distanceKm < 1) {
    const meters = Math.round(distanceKm * 1000);
    return `${meters} m away`;
  }
  return `${distanceKm.toFixed(1)} km away`;
}

/**
 * Constructs an exact Google Maps URL with lat/long and place_id
 */
export function buildGoogleMapsUrl(
  lat: number,
  lng: number,
  placeId?: string,
  queryName?: string
): string {
  if (placeId) {
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${encodeURIComponent(placeId)}`;
  }
  const query = queryName ? encodeURIComponent(`${queryName} Kolkata`) : `${lat},${lng}`;
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

/**
 * Constructs a Google Maps Directions URL from origin to destination coordinates
 */
export function buildDirectionsUrl(
  destLat: number,
  destLng: number,
  originQuery?: string,
  travelMode: 'walking' | 'transit' | 'driving' = 'walking'
): string {
  const originParam = originQuery ? `&origin=${encodeURIComponent(originQuery)}` : '';
  return `https://www.google.com/maps/dir/?api=1${originParam}&destination=${destLat},${destLng}&travelmode=${travelMode}`;
}
