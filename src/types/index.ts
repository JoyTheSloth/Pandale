export type ZoneArea = 
  | 'North Kolkata'
  | 'South Kolkata'
  | 'Central Kolkata'
  | 'East Kolkata'
  | 'West Kolkata'
  | 'Airport Corridor';


export type MetroLineName = 
  | 'Blue Line (North-South)'
  | 'Green Line (East-West)'
  | 'Purple Line (Joka-Majherhat)'
  | 'Purple Line (Joka-Esplanade)'
  | 'Orange Line (Kavi Subhash-Beleghata)'
  | 'Orange Line (Kavi Subhash-Airport)'
  | 'Yellow Line (Noapara-Jaihind)'
  | 'Yellow Line (Airport-Noapara)';


export type CrowdLevel = 'low' | 'moderate' | 'heavy';
export type CrowdSource = 'Estimated' | 'Community reported';

export interface CrowdInfo {
  level: CrowdLevel;
  source: CrowdSource;
  last_updated: string;
  notes?: string;
}

export type MediaSourceType = 'official' | 'instagram' | 'community' | 'latest';

export interface InstagramPost {
  id: string;
  pandal_id: string;
  instagram_media_id?: string;
  username: string;
  user_avatar?: string;
  caption: string;
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  source_type: MediaSourceType;
  verified_for_2026: boolean;
  likes_count?: number;
}

export interface PandalImage {
  id: string;
  url: string;
  caption?: string;
  category: MediaSourceType;
  author?: string;
  author_url?: string;
}

export interface NearbyMetroDetail {
  station_id: string;
  station_name: string;
  line: MetroLineName;
  line_code: 'blue' | 'green' | 'purple' | 'orange' | 'yellow';

  walking_distance: string; // e.g. "450m"
  walking_time_mins: number; // e.g. 6
  directions_url: string;
}

export interface Pandal {
  id: string;
  name: string;
  slug: string;
  description: string;
  heritage_note?: string;
  theme: string;
  area: ZoneArea;
  locality: string;
  latitude: number;
  longitude: number;
  google_place_id?: string;
  google_maps_url: string;
  nearest_metro: string;
  walking_distance: string;
  walking_time_mins: number;
  metro_details: NearbyMetroDetail[];
  tags: string[];
  puja_committee: string;
  best_time: string;
  crowd_status: CrowdInfo;
  recommended_days: ('Shashti' | 'Saptami' | 'Ashtami' | 'Nabami' | 'Dashami' | 'Tonight')[];
  featured_image: string;
  images: PandalImage[];
  latest_images: InstagramPost[];
  trending_score: number;
  saves_count: number;
  is_must_visit?: boolean;
  entry_fee?: string;
  created_at: string;
  updated_at: string;
}

export interface MetroStation {
  id: string;
  name: string;
  bengali_name?: string;
  line: MetroLineName;
  line_code: 'blue' | 'green' | 'purple' | 'orange' | 'yellow';

  latitude: number;
  longitude: number;
  nearby_pandals: {
    pandal_id: string;
    pandal_name: string;
    pandal_slug: string;
    walking_distance: string;
    walking_time_mins: number;
    directions_url: string;
  }[];
}

export interface WishlistItem {
  pandal_id: string;
  added_at: string;
}

export interface RoutePlanStep {
  pandal_id: string;
  order: number;
  transit_note?: string;
}
