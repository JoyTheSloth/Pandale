import { Pandal, MetroStation, InstagramPost, ZoneArea } from '@/types';
import { PANDALS_DATA } from '@/data/pandals';
import { METRO_STATIONS_DATA } from '@/data/metro';
import { calculateDistanceKm } from './geo';

// In-memory working copies (supports dynamic updates from Admin/API without resetting until server restarts)
let workingPandals: Pandal[] = [...PANDALS_DATA];
let workingMetroStations: MetroStation[] = [...METRO_STATIONS_DATA];

export interface PandalFilterOptions {
  query?: string;
  zone?: ZoneArea | 'All';
  nearMetro?: boolean;
  popular?: boolean;
  trending?: boolean;
  lessCrowded?: boolean;
  mustVisit?: boolean;
  day?: 'Shashti' | 'Saptami' | 'Ashtami' | 'Nabami' | 'Dashami' | 'Tonight' | 'All';
  wishlistIds?: string[];
  onlyWishlist?: boolean;
  sortBy?: 'trending' | 'popular' | 'nearest-metro' | 'name' | 'distance';
  userLat?: number;
  userLng?: number;
}

export function getAllPandals(): Pandal[] {
  return workingPandals;
}

export function getPandalBySlug(slug: string): Pandal | undefined {
  return workingPandals.find(
    (p) => p.slug.toLowerCase() === slug.toLowerCase() || p.id === slug
  );
}

export function getPandalById(id: string): Pandal | undefined {
  return workingPandals.find((p) => p.id === id);
}

export function getAllMetroStations(): MetroStation[] {
  return workingMetroStations;
}

export function getMetroStationById(id: string): MetroStation | undefined {
  return workingMetroStations.find((m) => m.id === id);
}

export function getPandalsNearMetroStation(stationId: string): {
  pandal: Pandal;
  walking_distance: string;
  walking_time_mins: number;
  directions_url: string;
}[] {
  const station = getMetroStationById(stationId);
  if (!station) return [];

  const results: {
    pandal: Pandal;
    walking_distance: string;
    walking_time_mins: number;
    directions_url: string;
  }[] = [];

  for (const item of station.nearby_pandals) {
    const pandal = getPandalById(item.pandal_id);
    if (pandal) {
      results.push({
        pandal,
        walking_distance: item.walking_distance,
        walking_time_mins: item.walking_time_mins,
        directions_url: item.directions_url
      });
    }
  }

  // Sort by shortest walking time
  return results.sort((a, b) => a.walking_time_mins - b.walking_time_mins);
}

export function filterPandals(options: PandalFilterOptions): Pandal[] {
  let list = [...workingPandals];

  // Search query filter
  if (options.query && options.query.trim()) {
    const q = options.query.toLowerCase().trim();
    list = list.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.locality.toLowerCase().includes(q) ||
        p.area.toLowerCase().includes(q) ||
        p.nearest_metro.toLowerCase().includes(q) ||
        p.theme.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.puja_committee.toLowerCase().includes(q)
      );
    });
  }

  // Zone filter
  if (options.zone && options.zone !== 'All') {
    list = list.filter((p) => p.area === options.zone);
  }

  // Near metro filter (walking distance under 800m or under 10 mins)
  if (options.nearMetro) {
    list = list.filter((p) => p.walking_time_mins <= 10);
  }

  // Popular
  if (options.popular) {
    list = list.filter((p) => p.tags.includes('Popular'));
  }

  // Trending
  if (options.trending) {
    list = list.filter((p) => p.tags.includes('Trending') || p.trending_score >= 90);
  }

  // Less crowded
  if (options.lessCrowded) {
    list = list.filter(
      (p) => p.crowd_status.level === 'low' || p.tags.includes('Less Crowded')
    );
  }

  // Must visit
  if (options.mustVisit) {
    list = list.filter((p) => p.tags.includes('Must Visit'));
  }

  // Puja Day filter
  if (options.day && options.day !== 'All') {
    list = list.filter((p) => p.recommended_days.includes(options.day as any));
  }

  // Wishlist only
  if (options.onlyWishlist && options.wishlistIds) {
    list = list.filter((p) => options.wishlistIds?.includes(p.id));
  }

  // Sorting
  if (options.sortBy === 'trending') {
    list.sort((a, b) => b.trending_score - a.trending_score);
  } else if (options.sortBy === 'popular') {
    list.sort((a, b) => b.saves_count - a.saves_count);
  } else if (options.sortBy === 'nearest-metro') {
    list.sort((a, b) => a.walking_time_mins - b.walking_time_mins);
  } else if (options.sortBy === 'name') {
    list.sort((a, b) => a.name.localeCompare(b.name));
  } else if (
    options.sortBy === 'distance' &&
    options.userLat !== undefined &&
    options.userLng !== undefined
  ) {
    list.sort((a, b) => {
      const distA = calculateDistanceKm(options.userLat!, options.userLng!, a.latitude, a.longitude);
      const distB = calculateDistanceKm(options.userLat!, options.userLng!, b.latitude, b.longitude);
      return distA - distB;
    });
  }

  return list;
}

export function upsertPandal(pandal: Pandal): Pandal {
  const index = workingPandals.findIndex((p) => p.id === pandal.id);
  const now = new Date().toISOString();
  if (index >= 0) {
    workingPandals[index] = {
      ...workingPandals[index],
      ...pandal,
      updated_at: now
    };
    return workingPandals[index];
  } else {
    const newPandal = {
      ...pandal,
      created_at: now,
      updated_at: now
    };
    workingPandals.push(newPandal);
    return newPandal;
  }
}

export function attachInstagramPostToPandal(
  pandalId: string,
  post: InstagramPost
): boolean {
  const pandal = getPandalById(pandalId);
  if (!pandal) return false;
  if (!pandal.latest_images) {
    pandal.latest_images = [];
  }
  // Check if already exists
  const existingIdx = pandal.latest_images.findIndex((p) => p.id === post.id);
  if (existingIdx >= 0) {
    pandal.latest_images[existingIdx] = post;
  } else {
    pandal.latest_images.unshift(post);
  }
  pandal.updated_at = new Date().toISOString();
  return true;
}
