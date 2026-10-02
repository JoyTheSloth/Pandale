const fs = require('fs');
const path = require('path');

const newItems = [
  {
    id: 'hatibagan-sarbojanin',
    name: 'Hatibagan Sarbojanin Durgotsav',
    slug: 'hatibagan-sarbojanin',
    description: "One of North Kolkata's most historic community Durga Pujas, located in the bustling Hatibagan market hub, celebrated for vibrant cultural themes and traditional clay artistry.",
    heritage_note: 'Established in 1935, Hatibagan Sarbojanin is a cultural anchor of the historic Shyambazar-Hatibagan neighborhood.',
    theme: 'Bengal Heritage & Living Folk Traditions (2026)',
    area: 'North Kolkata',
    locality: 'Hatibagan, Shyambazar',
    latitude: 22.5998,
    longitude: 88.3712,
    google_place_id: 'hatibagan-sarbojanin-kolkata',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=Hatibagan+Sarbojanin+Durgotsav+Kolkata',
    nearest_metro: 'Shyambazar Metro Station',
    walking_distance: '350m',
    walking_time_mins: 4,
    metro_details: [
      {
        station_id: 'shyambazar',
        station_name: 'Shyambazar',
        line: 'Blue Line (North-South)',
        line_code: 'blue',
        walking_distance: '350m',
        walking_time_mins: 4,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Shyambazar+Metro+Station&destination=Hatibagan+Sarbojanin&travelmode=walking'
      }
    ],
    tags: ['Popular', 'Must Visit', 'Heritage', 'Near Metro', 'Night Friendly'],
    puja_committee: 'Hatibagan Sarbojanin Durgotsav Samiti',
    best_time: 'Evening 6:00 PM – 11:30 PM',
    crowd_status: { level: 'heavy', source: 'Community reported', last_updated: '15 mins ago' },
    recommended_days: ['Saptami', 'Ashtami', 'Navami', 'Tonight'],
    featured_image: '/pandals/hatibagan-sarbojanin.jpg',
    images: [
      { id: 'hs-1', url: '/pandals/hatibagan-sarbojanin.jpg', caption: 'Illuminated pandal facade at Hatibagan crossing', category: 'official' }
    ],
    latest_images: [],
    trending_score: 93,
    saves_count: 1140,
    is_must_visit: true,
    created_at: '2026-08-01T00:00:00Z',
    updated_at: '2026-09-30T10:00:00Z'
  },
  {
    id: 'tala-prattay',
    name: 'Tala Prattay',
    slug: 'tala-prattay',
    description: "Renowned for cutting-edge installation art and monumental conceptual themes that push the architectural boundaries of contemporary Kolkata Durga Puja.",
    heritage_note: "Celebrated for transformative artistic concepts designed by Bengal's foremost contemporary installation artists.",
    theme: 'Avant-Garde Architectural Canvas & Immersive Soundscapes',
    area: 'North Kolkata',
    locality: 'Tala, Shyambazar',
    latitude: 22.6056,
    longitude: 88.3745,
    google_place_id: 'tala-prattay-durga-puja-kolkata',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=Tala+Prattay+Durga+Puja+Kolkata',
    nearest_metro: 'Shyambazar Metro Station',
    walking_distance: '700m',
    walking_time_mins: 8,
    metro_details: [
      {
        station_id: 'shyambazar',
        station_name: 'Shyambazar',
        line: 'Blue Line (North-South)',
        line_code: 'blue',
        walking_distance: '700m',
        walking_time_mins: 8,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Shyambazar+Metro+Station&destination=Tala+Prattay+Durga+Puja&travelmode=walking'
      }
    ],
    tags: ['Must Visit', 'Trending', 'Theme Powerhouse', 'Artistic Masterpiece'],
    puja_committee: 'Tala Prattay Pujo Committee',
    best_time: 'Late afternoon 4 PM or midnight 1 AM',
    crowd_status: { level: 'heavy', source: 'Community reported', last_updated: '20 mins ago' },
    recommended_days: ['Shashti', 'Saptami', 'Ashtami', 'Tonight'],
    featured_image: '/pandals/tala-prattay.jpg',
    images: [
      { id: 'tp-1', url: '/pandals/tala-prattay.jpg', caption: 'Monumental conceptual pavilion installation', category: 'official' }
    ],
    latest_images: [],
    trending_score: 97,
    saves_count: 1520,
    is_must_visit: true,
    created_at: '2026-08-01T00:00:00Z',
    updated_at: '2026-09-30T10:00:00Z'
  },
  {
    id: 'kashi-bose-lane',
    name: 'Kashi Bose Lane Durga Puja',
    slug: 'kashi-bose-lane',
    description: 'A premier North Kolkata artistic powerhouse famous for its breathtaking visual storytelling, thoughtful social themes, and intricate handcrafted details.',
    heritage_note: 'Held continuously since 1937, famous for pioneering socially conscious visual narratives.',
    theme: 'Symphony of Clay, Bell Metal & Ancient Bengal Craftsmanship',
    area: 'North Kolkata',
    locality: 'Kashi Bose Lane, Hatibagan',
    latitude: 22.5935,
    longitude: 88.3705,
    google_place_id: 'kashi-bose-lane-durga-puja-kolkata',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=Kashi+Bose+Lane+Durga+Puja+Kolkata',
    nearest_metro: 'Shyambazar Metro Station',
    walking_distance: '650m',
    walking_time_mins: 8,
    metro_details: [
      {
        station_id: 'shyambazar',
        station_name: 'Shyambazar',
        line: 'Blue Line (North-South)',
        line_code: 'blue',
        walking_distance: '650m',
        walking_time_mins: 8,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Shyambazar+Metro+Station&destination=Kashi+Bose+Lane+Durga+Puja&travelmode=walking'
      }
    ],
    tags: ['Popular', 'Must Visit', 'Trending', 'Theme Pandal'],
    puja_committee: 'Kashi Bose Lane Sarbojanin Durgotsav Samiti',
    best_time: 'Late evening 8 PM – 2 AM',
    crowd_status: { level: 'heavy', source: 'Community reported', last_updated: '18 mins ago' },
    recommended_days: ['Saptami', 'Ashtami', 'Tonight'],
    featured_image: '/pandals/kashi-bose-lane.jpg',
    images: [
      { id: 'kbl-1', url: '/pandals/kashi-bose-lane.jpg', caption: 'Dramatic illuminated entrance and sanctum', category: 'official' }
    ],
    latest_images: [],
    trending_score: 95,
    saves_count: 1380,
    is_must_visit: true,
    created_at: '2026-08-01T00:00:00Z',
    updated_at: '2026-09-30T10:00:00Z'
  },
  {
    id: 'kumartuli-sarbojanin',
    name: 'Kumartuli Sarbojanin Durgotsav',
    slug: 'kumartuli-sarbojanin',
    description: "Located at the heart of the world-famous idol-makers' colony of Kumartuli, celebrated for unmatched classical idol craftsmanship and heritage rituals.",
    heritage_note: 'Celebrated by the master artisans of Kumartuli who sculpt the goddess for the world.',
    theme: 'Pure Sabeki Traditional Sculptural Heritage',
    area: 'North Kolkata',
    locality: 'Kumartuli, Shovabazar',
    latitude: 22.5992,
    longitude: 88.3655,
    google_place_id: 'kumartuli-sarbojanin-kolkata',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=Kumartuli+Sarbojanin+Durgotsav+Kolkata',
    nearest_metro: 'Shovabazar Sutanuti Metro Station',
    walking_distance: '600m',
    walking_time_mins: 7,
    metro_details: [
      {
        station_id: 'shovabazar',
        station_name: 'Shovabazar Sutanuti',
        line: 'Blue Line (North-South)',
        line_code: 'blue',
        walking_distance: '600m',
        walking_time_mins: 7,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Shovabazar+Sutanuti+Metro+Station&destination=Kumartuli+Sarbojanin+Durgotsav&travelmode=walking'
      }
    ],
    tags: ['Heritage', 'Must Visit', 'Traditional', 'Idol Makers Hub'],
    puja_committee: 'Kumartuli Sarbojanin Durgotsav Committee',
    best_time: 'Morning 10 AM or Evening 7 PM',
    crowd_status: { level: 'heavy', source: 'Community reported', last_updated: '25 mins ago' },
    recommended_days: ['Shashti', 'Saptami', 'Ashtami', 'Navami'],
    featured_image: '/pandals/kumartuli-sarbojanin.jpg',
    images: [
      { id: 'ks-1', url: '/pandals/kumartuli-sarbojanin.jpg', caption: 'Mastercrafted traditional clay Pratima', category: 'official' }
    ],
    latest_images: [],
    trending_score: 92,
    saves_count: 1090,
    is_must_visit: true,
    created_at: '2026-08-01T00:00:00Z',
    updated_at: '2026-09-30T10:00:00Z'
  },
  {
    id: 'ahiritola-sarbojanin',
    name: 'Ahiritola Sarbojanin Durgotsav',
    slug: 'ahiritola-sarbojanin',
    description: "Steeped in riverside folklore by the Ganges, Ahiritola Sarbojanin creates awe-inspiring artistic installations celebrating Bengal's cultural soul.",
    heritage_note: 'One of the oldest community pujas in North Kolkata, renowned for colossal street installations.',
    theme: 'Ganges Riverside Lore & Folk Tapestries',
    area: 'North Kolkata',
    locality: 'Ahiritola, Shovabazar',
    latitude: 22.5955,
    longitude: 88.3618,
    google_place_id: 'ahiritola-sarbojanin-kolkata',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=Ahiritola+Sarbojanin+Durgotsav+Kolkata',
    nearest_metro: 'Shovabazar Sutanuti Metro Station',
    walking_distance: '700m',
    walking_time_mins: 8,
    metro_details: [
      {
        station_id: 'shovabazar',
        station_name: 'Shovabazar Sutanuti',
        line: 'Blue Line (North-South)',
        line_code: 'blue',
        walking_distance: '700m',
        walking_time_mins: 8,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Shovabazar+Sutanuti+Metro+Station&destination=Ahiritola+Sarbojanin+Durgotsav&travelmode=walking'
      }
    ],
    tags: ['Must Visit', 'Heritage', 'Popular', 'River Ghat Corridor'],
    puja_committee: 'Ahiritola Sarbojanin Durgotsav Samiti',
    best_time: 'Evening 6:30 PM – midnight',
    crowd_status: { level: 'heavy', source: 'Community reported', last_updated: '30 mins ago' },
    recommended_days: ['Saptami', 'Ashtami', 'Tonight'],
    featured_image: '/pandals/ahiritola-sarbojanin.jpg',
    images: [
      { id: 'as-1', url: '/pandals/ahiritola-sarbojanin.jpg', caption: 'Elaborate artistic riverside facade', category: 'official' }
    ],
    latest_images: [],
    trending_score: 91,
    saves_count: 980,
    is_must_visit: true,
    created_at: '2026-08-01T00:00:00Z',
    updated_at: '2026-09-30T10:00:00Z'
  },
  {
    id: 'badamtala-ashar-sangha',
    name: 'Badamtala Ashar Sangha',
    slug: 'badamtala-ashar-sangha',
    description: "One of South Kolkata's most decorated theme pujas, known for winning prestigious awards with innovative environmental and social concepts.",
    heritage_note: 'Celebrated for over 85 years, consistently recognized with top Asian Paints Sharad Shamman awards.',
    theme: 'Living Organic Architecture & Earth Tones',
    area: 'South Kolkata',
    locality: 'Kalighat, Rashbehari',
    latitude: 22.5205,
    longitude: 88.3475,
    google_place_id: 'badamtala-ashar-sangha-kolkata',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=Badamtala+Ashar+Sangha+Kolkata',
    nearest_metro: 'Kalighat Metro Station',
    walking_distance: '450m',
    walking_time_mins: 5,
    metro_details: [
      {
        station_id: 'kalighat',
        station_name: 'Kalighat',
        line: 'Blue Line (North-South)',
        line_code: 'blue',
        walking_distance: '450m',
        walking_time_mins: 5,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Kalighat+Metro+Station&destination=Badamtala+Ashar+Sangha&travelmode=walking'
      }
    ],
    tags: ['Must Visit', 'Trending', 'Theme Pandal', 'Award Winner'],
    puja_committee: 'Badamtala Ashar Sangha Club Committee',
    best_time: 'Midnight 12:00 AM – 3:30 AM',
    crowd_status: { level: 'heavy', source: 'Community reported', last_updated: '12 mins ago' },
    recommended_days: ['Shashti', 'Saptami', 'Ashtami', 'Tonight'],
    featured_image: '/pandals/badamtala-ashar-sangha.jpg',
    images: [
      { id: 'bas-1', url: '/pandals/badamtala-ashar-sangha.jpg', caption: 'Award-winning conceptual architecture', category: 'official' }
    ],
    latest_images: [],
    trending_score: 96,
    saves_count: 1410,
    is_must_visit: true,
    created_at: '2026-08-01T00:00:00Z',
    updated_at: '2026-09-30T10:00:00Z'
  },
  {
    id: '66-pally',
    name: '66 Pally Durgotsav',
    slug: '66-pally',
    description: 'Distinguished for historic breakthroughs including women priest led rituals and soul-stirring cultural motifs in the Kalighat heritage precinct.',
    heritage_note: 'A cultural pioneer celebrated for progressive community rituals and traditional Bengali artwork.',
    theme: 'Divine Feminine & Inclusive Heritage Celebrations',
    area: 'South Kolkata',
    locality: 'Kalighat, South Kolkata',
    latitude: 22.5218,
    longitude: 88.3490,
    google_place_id: '66-pally-durga-puja-kolkata',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=66+Pally+Durga+Puja+Kolkata',
    nearest_metro: 'Kalighat Metro Station',
    walking_distance: '400m',
    walking_time_mins: 5,
    metro_details: [
      {
        station_id: 'kalighat',
        station_name: 'Kalighat',
        line: 'Blue Line (North-South)',
        line_code: 'blue',
        walking_distance: '400m',
        walking_time_mins: 5,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Kalighat+Metro+Station&destination=66+Pally+Durga+Puja&travelmode=walking'
      }
    ],
    tags: ['Must Visit', 'Popular', 'Cultural Landmark', 'Near Metro'],
    puja_committee: '66 Pally Durgotsav Club',
    best_time: 'Evening 6 PM – 11 PM',
    crowd_status: { level: 'heavy', source: 'Community reported', last_updated: '14 mins ago' },
    recommended_days: ['Saptami', 'Ashtami', 'Navami', 'Tonight'],
    featured_image: '/pandals/66-pally.jpg',
    images: [
      { id: 'p66-1', url: '/pandals/66-pally.jpg', caption: 'Vibrant cultural gate and sanctum', category: 'official' }
    ],
    latest_images: [],
    trending_score: 93,
    saves_count: 1190,
    is_must_visit: true,
    created_at: '2026-08-01T00:00:00Z',
    updated_at: '2026-09-30T10:00:00Z'
  },
  {
    id: '68-pally',
    name: '68 Pally Sarbojanin',
    slug: '68-pally',
    description: 'A cherished neighbourhood puja renowned for tranquil traditional decor and warm South Kolkata hospitality right by Rashbehari Avenue.',
    heritage_note: 'A community cornerstone celebrating family, tradition, and joyous adda for decades.',
    theme: 'Classic Sabeki Idol in Architectural Canopy',
    area: 'South Kolkata',
    locality: 'Rashbehari Avenue, Kalighat',
    latitude: 22.5192,
    longitude: 88.3512,
    google_place_id: '68-pally-durga-puja-kolkata',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=68+Pally+Durga+Puja+Kolkata',
    nearest_metro: 'Kalighat Metro Station',
    walking_distance: '500m',
    walking_time_mins: 6,
    metro_details: [
      {
        station_id: 'kalighat',
        station_name: 'Kalighat',
        line: 'Blue Line (North-South)',
        line_code: 'blue',
        walking_distance: '500m',
        walking_time_mins: 6,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Kalighat+Metro+Station&destination=68+Pally+Durga+Puja&travelmode=walking'
      }
    ],
    tags: ['Popular', 'Heritage', 'Near Metro'],
    puja_committee: '68 Pally Sarbojanin Committee',
    best_time: 'Afternoon 2 PM or Evening 8 PM',
    crowd_status: { level: 'moderate', source: 'Community reported', last_updated: '22 mins ago' },
    recommended_days: ['Saptami', 'Ashtami', 'Navami'],
    featured_image: '/pandals/68-pally.jpg',
    images: [
      { id: 'p68-1', url: '/pandals/68-pally.jpg', caption: 'Intricate sabeki idol and sanctum details', category: 'official' }
    ],
    latest_images: [],
    trending_score: 87,
    saves_count: 760,
    is_must_visit: false,
    created_at: '2026-08-01T00:00:00Z',
    updated_at: '2026-09-30T10:00:00Z'
  },
  {
    id: 'singhi-park',
    name: 'Singhi Park Sarbojanin',
    slug: 'singhi-park',
    description: 'Celebrated continuously since 1941, Singhi Park is universally loved for royal temple architectural replicas and grand Chandannagar lighting spectacles.',
    heritage_note: 'Founded in 1941, Singhi Park is famous for illuminating Gariahat with legendary lighting gates.',
    theme: 'Imperial Temple Replicas & Chandannagar Illumination (2026)',
    area: 'South Kolkata',
    locality: 'Dover Lane, Gariahat',
    latitude: 22.5222,
    longitude: 88.3645,
    google_place_id: 'singhi-park-durga-puja-kolkata',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=Singhi+Park+Durga+Puja+Kolkata',
    nearest_metro: 'Kalighat Metro Station',
    walking_distance: '600m',
    walking_time_mins: 7,
    metro_details: [
      {
        station_id: 'kalighat',
        station_name: 'Kalighat',
        line: 'Blue Line (North-South)',
        line_code: 'blue',
        walking_distance: '600m',
        walking_time_mins: 7,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Kalighat+Metro+Station&destination=Singhi+Park+Durga+Puja&travelmode=walking'
      }
    ],
    tags: ['Popular', 'Must Visit', 'Monumental', 'Lighting Spectacle'],
    puja_committee: 'Singhi Park Sarbojanin Durgotsav Samiti',
    best_time: 'Night 9:00 PM – 2:00 AM (for best lighting effects)',
    crowd_status: { level: 'heavy', source: 'Community reported', last_updated: '10 mins ago' },
    recommended_days: ['Shashti', 'Saptami', 'Ashtami', 'Navami', 'Tonight'],
    featured_image: '/pandals/singhi-park.jpg',
    images: [
      { id: 'sp-1', url: '/pandals/singhi-park.jpg', caption: 'Towering temple replica glowing at Dover Lane', category: 'official' }
    ],
    latest_images: [],
    trending_score: 96,
    saves_count: 1470,
    is_must_visit: true,
    created_at: '2026-08-01T00:00:00Z',
    updated_at: '2026-09-30T10:00:00Z'
  }
];

const filePath = path.join(__dirname, '..', 'src', 'data', 'pandals.ts');
let content = fs.readFileSync(filePath, 'utf8');

const closingIndex = content.lastIndexOf('];');
if (closingIndex !== -1) {
  const formattedItems = newItems.map(item => {
    return '  ' + JSON.stringify(item, null, 2)
      .replace(/"([^"]+)":/g, '$1:')
      .replace(/"/g, "'");
  }).join(',\n');

  content = content.substring(0, closingIndex).trimEnd();
  if (!content.endsWith(',')) content += ',';
  content += '\n' + formattedItems + '\n];\n';
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Appended 9 pandals successfully!');
} else {
  console.error('Closing bracket not found');
}
