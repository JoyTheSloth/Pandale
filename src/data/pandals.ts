import { Pandal } from '@/types';

export const PANDALS_DATA: Pandal[] = [
  {
    id: 'sree-bhumi',
    name: 'Sree Bhumi Sporting Club',
    slug: 'sree-bhumi-sporting-club',
    description: 'Famed for its awe-inspiring palatial architecture, diamond and gold jewellery embellishing the goddess, and grand illuminated chandeliers that draw pilgrims from across India.',
    heritage_note: 'Established in 1969, Sree Bhumi is universally known for grand royal palace architectural recreations with staggering lighting installations.',
    theme: 'Royal Heritage & Monumental Architecture (2026 Concept Preview: Grand Imperial Glass Pavilion)',
    area: 'North Kolkata',
    locality: 'Lake Town, VIP Road',
    latitude: 22.5976,
    longitude: 88.3978,
    google_place_id: 'ChIJX9XqO9V4AjoRz7971Z6P5fI',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=Sree%20Bhumi%20Sporting%20Club%2C%20Kolkata',
    nearest_metro: 'Belgachia Metro Station',
    walking_distance: '1.4 km (Auto/E-Rickshaw available 4 mins)',
    walking_time_mins: 15,
    metro_details: [
      {
        station_id: 'belgachia',
        station_name: 'Belgachia',
        line: 'Blue Line (North-South)',
        line_code: 'blue',
        walking_distance: '1.4 km',
        walking_time_mins: 15,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Belgachia+Metro+Station&destination=Sree%20Bhumi%20Sporting%20Club%2C%20Kolkata'
      },
      {
        station_id: 'dum-dum',
        station_name: 'Dum Dum',
        line: 'Blue Line (North-South)',
        line_code: 'blue',
        walking_distance: '2.1 km',
        walking_time_mins: 22,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Dum+Dum+Metro+Station&destination=Sree%20Bhumi%20Sporting%20Club%2C%20Kolkata'
      }
    ],
    tags: ['Popular', 'Must Visit', 'Trending', 'Monumental', 'Night Friendly'],
    puja_committee: 'Sree Bhumi Sporting Club Puja Committee',
    best_time: 'Late night (2:00 AM – 5:00 AM) or early afternoon (1:00 PM)',
    crowd_status: {
      level: 'heavy',
      source: 'Community reported',
      last_updated: '25 mins ago',
      notes: 'Queue moves steadily along VIP Road service lane.'
    },
    recommended_days: ['Shashti', 'Saptami', 'Ashtami', 'Tonight'],
    featured_image: '/pandals/sree-bhumi.jpg',
    images: [
      {
        id: 'sb-1',
        url: '/pandals/sree-bhumi.jpg',
        caption: 'Towering facade illuminated under the midnight Kolkata sky',
        category: 'official',
        author: 'Kolkata Pujo Archives',
        author_url: '/pandals/sree-bhumi-2.jpg'
      },
      {
        id: 'sb-2',
        url: '/pandals/sree-bhumi-3.jpg',
        caption: 'Sanctum sanctorum adorned with gold ornaments',
        category: 'latest',
        author: 'Pujo Explorer',
        author_url: 'https://instagram.com/calcutta_diaries'
      },
      {
        id: 'sb-3',
        url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
        caption: 'Intricate idol carving and traditional dhak performance',
        category: 'community',
        author: 'Saptarshi Roy',
        author_url: 'https://instagram.com/saptarshi_visuals'
      }
    ],
    latest_images: [
      {
        id: 'sb-insta-1',
        pandal_id: 'sree-bhumi',
        username: 'calcutta_stories',
        user_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        caption: 'The golden reflections at Sree Bhumi never fail to take our breath away. Ready for 2026 Puja preparations! #Pujo2026 #SreeBhumi #KolkataDurgaPuja',
        media_url: '/pandals/sree-bhumi.jpg',
        permalink: 'https://instagram.com/p/C-sreebhumi1',
        timestamp: '2026-09-28T18:40:00Z',
        media_type: 'IMAGE',
        source_type: 'instagram',
        verified_for_2026: true,
        likes_count: 3420
      },
      {
        id: 'sb-insta-2',
        pandal_id: 'sree-bhumi',
        username: 'kolkata_frames',
        user_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        caption: 'Chandeliers arrive at Lake Town. The grandeur is already shaping up! 🪔✨ #Durgotsav2026 #Kolkata #NorthKolkataPujo',
        media_url: '/pandals/sree-bhumi-2.jpg',
        permalink: 'https://instagram.com/p/C-sreebhumi2',
        timestamp: '2026-09-29T11:15:00Z',
        media_type: 'IMAGE',
        source_type: 'instagram',
        verified_for_2026: true,
        likes_count: 2190
      }
    ],
    trending_score: 98,
    saves_count: 1420,
    created_at: '2026-08-01T00:00:00Z',
    updated_at: '2026-09-30T10:00:00Z'
  },
  {
    id: 'bagbazar-sarbojanin',
    name: 'Bagbazar Sarbojanin Durgotsav',
    slug: 'bagbazar-sarbojanin',
    description: 'The epitome of classical heritage Bengali Durga Puja. Revered for its quintessential pristine "Ekchala" Sabeki Pratima, serene rituals by the Ganges, and historic carnival grounds.',
    heritage_note: 'Celebrated continuously since 1919, Bagbazar stands as a cornerstone of Kolkata’s cultural pride with untouched Sabeki traditions.',
    theme: 'Pure Sabeki Traditional Ekchala (Heritage Bengali Culture)',
    area: 'North Kolkata',
    locality: 'Bagbazar, Circular Canal Bank',
    latitude: 22.6025,
    longitude: 88.3662,
    google_place_id: 'ChIJG7hP6_t3AjoRj6V7v1u85fA',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=Bagbazar%20Sarbojanin%20Durgotsav%2C%20Kolkata',
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
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Shyambazar+Metro+Station&destination=Bagbazar%20Sarbojanin%20Durgotsav%2C%20Kolkata'
      },
      {
        station_id: 'shovabazar',
        station_name: 'Shovabazar Sutanuti',
        line: 'Blue Line (North-South)',
        line_code: 'blue',
        walking_distance: '950m',
        walking_time_mins: 12,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Shovabazar+Sutanuti+Metro+Station&destination=Bagbazar%20Sarbojanin%20Durgotsav%2C%20Kolkata'
      }
    ],
    tags: ['Must Visit', 'Heritage', 'Traditional', 'Near Metro', 'Popular'],
    puja_committee: 'Bagbazar Sarbojanin Durgotsav & Exhibition',
    best_time: 'Morning during Pushpanjali (9:00 AM – 11:30 AM) or peaceful dusk',
    crowd_status: {
      level: 'moderate',
      source: 'Estimated',
      last_updated: '15 mins ago',
      notes: 'Steady queue near Bagbazar Ghat road, wide pedestrian boulevard.'
    },
    recommended_days: ['Saptami', 'Ashtami', 'Nabami', 'Dashami', 'Tonight'],
    featured_image: '/pandals/sree-bhumi.jpg',
    images: [
      {
        id: 'bg-1',
        url: '/pandals/bagbazar-sarbojanin.jpg',
        caption: 'The divine Ekchala idol with Daaker Saaj at Bagbazar',
        category: 'official',
        author: 'Heritage Bengal Team'
      },
      {
        id: 'bg-2',
        url: '/pandals/bagbazar-sarbojanin-2.jpg',
        caption: 'Evening Sandhi Puja rituals and lamps',
        category: 'latest',
        author: 'Bong Heritage Lens'
      }
    ],
    latest_images: [
      {
        id: 'bg-insta-1',
        pandal_id: 'bagbazar-sarbojanin',
        username: 'kolkata_heritage_walks',
        user_avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        caption: 'Bagbazar is where the soul of classical Kolkata comes alive every autumn. The Daaker Saaj idol is unparalleled. #Bagbazar #Pujo2026',
        media_url: '/pandals/bagbazar-sarbojanin.jpg',
        permalink: 'https://instagram.com/p/C-bagbazar1',
        timestamp: '2026-09-29T14:30:00Z',
        media_type: 'IMAGE',
        source_type: 'instagram',
        verified_for_2026: true,
        likes_count: 4890
      }
    ],
    trending_score: 95,
    saves_count: 1890,
    created_at: '2026-08-01T00:00:00Z',
    updated_at: '2026-09-30T10:00:00Z'
  },
  {
    id: 'kumartuli-park',
    name: 'Kumartuli Park Sarbojanin',
    slug: 'kumartuli-park',
    description: 'Situated in the artisanal heartland where idols take birth. Known for stunning innovative themes juxtaposed directly against Kolkata’s centuries-old pottery studios.',
    heritage_note: 'Located adjacent to the world-famous Kumartuli potters’ settlement, celebrated for breathtaking artistic craftsmanship.',
    theme: 'Clay, Earth & Revival of Indigenous Terracotta Sculpture',
    area: 'North Kolkata',
    locality: 'Kumartuli, Sovabazar',
    latitude: 22.5991,
    longitude: 88.3639,
    google_place_id: 'ChIJ5Zl4pON3AjoR18R3Zq-6hW8',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=Kumartuli%20Park%20Sarbojanin%2C%20Kolkata',
    nearest_metro: 'Shovabazar Sutanuti Metro Station',
    walking_distance: '450m',
    walking_time_mins: 5,
    metro_details: [
      {
        station_id: 'shovabazar',
        station_name: 'Shovabazar Sutanuti',
        line: 'Blue Line (North-South)',
        line_code: 'blue',
        walking_distance: '450m',
        walking_time_mins: 5,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Shovabazar+Sutanuti+Metro+Station&destination=Kumartuli%20Park%20Sarbojanin%2C%20Kolkata'
      }
    ],
    tags: ['Near Metro', 'Must Visit', 'Art & Theme', 'Heritage', 'Trending'],
    puja_committee: 'Kumartuli Park Sarbojanin Durgotsab Committee',
    best_time: 'Afternoon (3:00 PM – 5:30 PM) combined with a walk through the potters’ alley',
    crowd_status: {
      level: 'moderate',
      source: 'Estimated',
      last_updated: '40 mins ago',
      notes: 'Entry lanes through Kumartuli ghat are well barricaded.'
    },
    recommended_days: ['Shashti', 'Saptami', 'Ashtami', 'Nabami', 'Tonight'],
    featured_image: '/pandals/bagbazar-sarbojanin.jpg',
    images: [
      {
        id: 'kp-1',
        url: '/pandals/kumartuli-park.jpg',
        caption: 'Earthy sculptural motifs honoring the clay artisans',
        category: 'official',
        author: 'Kumartuli Artisans Guild'
      }
    ],
    latest_images: [
      {
        id: 'kp-insta-1',
        pandal_id: 'kumartuli-park',
        username: 'streetsofkকলকাতা',
        user_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        caption: 'Walking from Shovabazar metro straight into the realm of artists. Kumartuli Park 2026 setup is magical. #Kumartuli #KolkataPujo2026',
        media_url: '/pandals/kumartuli-park.jpg',
        permalink: 'https://instagram.com/p/C-kumartuli1',
        timestamp: '2026-09-30T09:20:00Z',
        media_type: 'IMAGE',
        source_type: 'instagram',
        verified_for_2026: true,
        likes_count: 3120
      }
    ],
    trending_score: 91,
    saves_count: 1140,
    created_at: '2026-08-01T00:00:00Z',
    updated_at: '2026-09-30T10:00:00Z'
  },
  {
    id: 'maddox-square',
    name: 'Maddox Square',
    slug: 'maddox-square',
    description: 'The quintessential open-air social hub of South Kolkata. Renowned for its relaxed festival park atmosphere, iconic sabeki pratima, and legendary evening adda with old friends.',
    heritage_note: 'One of the city’s favorite social gathering grounds since 1935, celebrating warmth, music, and community spirit.',
    theme: 'Traditional Sabeki Idol under Grand Open Park Pavilion',
    area: 'South Kolkata',
    locality: 'Ritchie Road, Ballygunge',
    latitude: 22.5312,
    longitude: 88.3571,
    google_place_id: 'ChIJh8t-1x13AjoR1M8Tq14b0P8',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=Maddox%20Square%2C%20Kolkata',
    nearest_metro: 'Netaji Bhavan Metro Station',
    walking_distance: '850m',
    walking_time_mins: 10,
    metro_details: [
      {
        station_id: 'netaji-bhavan',
        station_name: 'Netaji Bhavan',
        line: 'Blue Line (North-South)',
        line_code: 'blue',
        walking_distance: '850m',
        walking_time_mins: 10,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Netaji+Bhavan+Metro+Station&destination=Maddox%20Square%2C%20Kolkata'
      },
      {
        station_id: 'jatin-das-park',
        station_name: 'Jatin Das Park',
        line: 'Blue Line (North-South)',
        line_code: 'blue',
        walking_distance: '900m',
        walking_time_mins: 11,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Jatin+Das+Park+Metro+Station&destination=Maddox%20Square%2C%20Kolkata'
      }
    ],
    tags: ['Must Visit', 'Popular', 'Trending', 'Night Friendly', 'Near Metro'],
    puja_committee: 'Maddox Square Puja Samiti',
    best_time: 'Evening till midnight (7:00 PM – 1:00 AM) for food stalls and adda',
    crowd_status: {
      level: 'moderate',
      source: 'Community reported',
      last_updated: '10 mins ago',
      notes: 'Open lawn with comfortable seating and food kiosks all around.'
    },
    recommended_days: ['Saptami', 'Ashtami', 'Nabami', 'Tonight'],
    featured_image: '/pandals/kumartuli-park.jpg',
    images: [
      {
        id: 'ms-1',
        url: '/pandals/maddox-square.jpg',
        caption: 'Atmospheric evening gatherings on the grassy lawns of Maddox',
        category: 'official',
        author: 'Maddox Samiti'
      }
    ],
    latest_images: [
      {
        id: 'ms-insta-1',
        pandal_id: 'maddox-square',
        username: 'kolkatagram',
        user_avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        caption: 'Maddox Square lights are on! The best adda of the season has officially begun. #MaddoxSquare #Pujo2026 #SouthKolkata',
        media_url: '/pandals/maddox-square.jpg',
        permalink: 'https://instagram.com/p/C-maddox1',
        timestamp: '2026-09-30T17:50:00Z',
        media_type: 'IMAGE',
        source_type: 'instagram',
        verified_for_2026: true,
        likes_count: 5320
      }
    ],
    trending_score: 99,
    saves_count: 2410,
    created_at: '2026-08-01T00:00:00Z',
    updated_at: '2026-09-30T11:00:00Z'
  },
  {
    id: 'college-square',
    name: 'College Square Sarbojanin',
    slug: 'college-square',
    description: 'World-famous for its shimmering illumination reflecting upon the sprawling heritage lake. The magnificent lights from Chandannagar create a dreamlike mirrored spectacle.',
    heritage_note: 'Deeply entwined with Kolkata’s intellectual boi-para (book street) culture, captivating night crowds since 1948.',
    theme: 'Chandannagar Light Engineering & Floating Sacred Shrine',
    area: 'Central Kolkata',
    locality: 'College Street, Bowbazar',
    latitude: 22.5744,
    longitude: 88.3639,
    google_place_id: 'ChIJQ-H7eXp3AjoRR7eS28dZ0jI',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=College%20Square%20Sarbojanin%2C%20Kolkata',
    nearest_metro: 'Central Metro Station',
    walking_distance: '500m',
    walking_time_mins: 6,
    metro_details: [
      {
        station_id: 'central',
        station_name: 'Central',
        line: 'Blue Line (North-South)',
        line_code: 'blue',
        walking_distance: '500m',
        walking_time_mins: 6,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Central+Metro+Station&destination=College%20Square%20Sarbojanin%2C%20Kolkata'
      },
      {
        station_id: 'mg-road',
        station_name: 'Mahatma Gandhi Road',
        line: 'Blue Line (North-South)',
        line_code: 'blue',
        walking_distance: '650m',
        walking_time_mins: 8,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Mahatma+Gandhi+Road+Metro+Station&destination=College%20Square%20Sarbojanin%2C%20Kolkata'
      }
    ],
    tags: ['Popular', 'Must Visit', 'Near Metro', 'Night Friendly', 'Trending'],
    puja_committee: 'College Square Sarbojanin Durgotsav Committee',
    best_time: 'After dusk (7:30 PM – 11:30 PM) when lake lights reflect vividly',
    crowd_status: {
      level: 'heavy',
      source: 'Estimated',
      last_updated: '30 mins ago',
      notes: 'Entry managed via College Street gate; exit through Surya Sen Street.'
    },
    recommended_days: ['Shashti', 'Saptami', 'Ashtami', 'Nabami', 'Tonight'],
    featured_image: '/pandals/maddox-square.jpg',
    images: [
      {
        id: 'cs-1',
        url: '/pandals/college-square.jpg',
        caption: 'The golden reflections on College Square lake water',
        category: 'official',
        author: 'Kolkata Light Arts'
      }
    ],
    latest_images: [
      {
        id: 'cs-insta-1',
        pandal_id: 'college-square',
        username: 'calcutta_shutterbug',
        user_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        caption: 'First look at College Square 2026 illuminated arches over the lake! #CollegeSquare #CentralKolkata #Pujo2026',
        media_url: '/pandals/college-square.jpg',
        permalink: 'https://instagram.com/p/C-collegesq1',
        timestamp: '2026-09-29T20:10:00Z',
        media_type: 'IMAGE',
        source_type: 'instagram',
        verified_for_2026: true,
        likes_count: 3840
      }
    ],
    trending_score: 96,
    saves_count: 1750,
    created_at: '2026-08-01T00:00:00Z',
    updated_at: '2026-09-30T10:00:00Z'
  },
  {
    id: 'suruchi-sangha',
    name: 'Suruchi Sangha',
    slug: 'suruchi-sangha',
    description: 'Each year representing a distinct Indian state with deeply researched traditional architectural motifs, crafts, folk dances, and thematic musical anthems.',
    heritage_note: 'A leading pioneer of theme-based Puja in Kolkata, celebrating India’s diverse cultural mosaic.',
    theme: 'Pan-Indian Tribal Crafts & Sacred Himalayan Folk Traditions',
    area: 'South Kolkata',
    locality: 'New Alipore',
    latitude: 22.5097,
    longitude: 88.3283,
    google_place_id: 'ChIJG6V1m8h3AjoRbzQy2mX3XfE',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=Suruchi%20Sangha%2C%20Kolkata',
    nearest_metro: 'Kalighat Metro Station',
    walking_distance: '1.6 km (E-Rickshaw/Auto 5 mins)',
    walking_time_mins: 18,
    metro_details: [
      {
        station_id: 'kalighat',
        station_name: 'Kalighat',
        line: 'Blue Line (North-South)',
        line_code: 'blue',
        walking_distance: '1.6 km',
        walking_time_mins: 18,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Kalighat+Metro+Station&destination=Suruchi%20Sangha%2C%20Kolkata'
      },
      {
        station_id: 'taratala',
        station_name: 'Taratala',
        line: 'Purple Line (Joka-Esplanade)',
        line_code: 'purple',
        walking_distance: '1.2 km',
        walking_time_mins: 14,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Taratala+Metro+Station&destination=Suruchi%20Sangha%2C%20Kolkata'
      }
    ],
    tags: ['Must Visit', 'Art & Theme', 'Popular', 'Trending'],
    puja_committee: 'Suruchi Sangha Cultural Association',
    best_time: 'Early evening (4:30 PM – 7:00 PM) to catch folk artist performances',
    crowd_status: {
      level: 'heavy',
      source: 'Community reported',
      last_updated: '20 mins ago',
      notes: 'Spacious entry corridor along Nalini Ranjan Avenue.'
    },
    recommended_days: ['Shashti', 'Saptami', 'Ashtami', 'Nabami', 'Tonight'],
    featured_image: '/pandals/college-square.jpg',
    images: [
      {
        id: 'ss-1',
        url: '/pandals/suruchi-sangha.jpg',
        caption: 'Authentic handcrafted tribal facade and deity installation',
        category: 'official',
        author: 'Suruchi Cultural Archives'
      }
    ],
    latest_images: [
      {
        id: 'ss-insta-1',
        pandal_id: 'suruchi-sangha',
        username: 'the_bengali_lens',
        user_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        caption: 'Suruchi Sangha never disappoints with its thematic depth. 2026 is turning out to be one of their finest works yet. #SuruchiSangha #NewAlipore',
        media_url: '/pandals/suruchi-sangha.jpg',
        permalink: 'https://instagram.com/p/C-suruchi1',
        timestamp: '2026-09-30T15:20:00Z',
        media_type: 'IMAGE',
        source_type: 'instagram',
        verified_for_2026: true,
        likes_count: 4100
      }
    ],
    trending_score: 94,
    saves_count: 1530,
    created_at: '2026-08-01T00:00:00Z',
    updated_at: '2026-09-30T10:00:00Z'
  },
  {
    id: 'deshapriya-park',
    name: 'Deshapriya Park',
    slug: 'deshapriya-park',
    description: 'Iconic South Kolkata mega-pandal known for daring large-scale artistic installations, panoramic park grounds, and effortless proximity to Kalighat Metro.',
    heritage_note: 'A landmark cultural grounds of South Kolkata holding decades of celebratory fanfare.',
    theme: 'Sacred Temple of Sound & Sonic Bells (2026 Art Preview)',
    area: 'South Kolkata',
    locality: 'Rashbehari Avenue, Kalighat',
    latitude: 22.5186,
    longitude: 88.3542,
    google_place_id: 'ChIJz2x4bL93AjoROf-9R2o3r1g',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=Deshapriya%20Park%2C%20Kolkata',
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
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Kalighat+Metro+Station&destination=Deshapriya%20Park%2C%20Kolkata'
      }
    ],
    tags: ['Near Metro', 'Must Visit', 'Popular', 'Trending'],
    puja_committee: 'Deshapriya Park Durgotsav Committee',
    best_time: 'Afternoon (2:00 PM – 4:30 PM) or after 1:00 AM',
    crowd_status: {
      level: 'moderate',
      source: 'Community reported',
      last_updated: '18 mins ago',
      notes: 'Direct straight boulevard walk from Kalighat metro Gate 3.'
    },
    recommended_days: ['Shashti', 'Saptami', 'Ashtami', 'Tonight'],
    featured_image: '/pandals/suruchi-sangha.jpg',
    images: [
      {
        id: 'dp-1',
        url: '/pandals/deshapriya-park.jpg',
        caption: 'Front facade taking shape under modern architectural geometry',
        category: 'official',
        author: 'Deshapriya Media'
      }
    ],
    latest_images: [
      {
        id: 'dp-insta-1',
        pandal_id: 'deshapriya-park',
        username: 'rashbehari_diaries',
        user_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        caption: 'Just 5 mins walk from Kalighat metro! The scale of Deshapriya Park 2026 is truly monumental. #DeshapriyaPark #Pujo2026',
        media_url: '/pandals/deshapriya-park.jpg',
        permalink: 'https://instagram.com/p/C-deshapriya1',
        timestamp: '2026-09-30T12:00:00Z',
        media_type: 'IMAGE',
        source_type: 'instagram',
        verified_for_2026: true,
        likes_count: 2790
      }
    ],
    trending_score: 93,
    saves_count: 1390,
    created_at: '2026-08-01T00:00:00Z',
    updated_at: '2026-09-30T10:00:00Z'
  },
  {
    id: 'tridhara-sammilani',
    name: 'Tridhara Sammilani',
    slug: 'tridhara-sammilani',
    description: 'Renowned for cutting-edge contemporary thematic installations blending environmental ecology, indigenous craftsmanship, and poignant social narratives.',
    heritage_note: 'A cultural powerhouse nestled in Manoharpukur, attracting award-winning conceptual designers.',
    theme: 'Symbiosis: The Forest, Seed & Eternal Motherhood',
    area: 'South Kolkata',
    locality: 'Manoharpukur Road, Ballygunge',
    latitude: 22.5205,
    longitude: 88.3582,
    google_place_id: 'ChIJz2x4bL93AjoROf-9R2o3r1h',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=Tridhara%20Sammilani%2C%20Kolkata',
    nearest_metro: 'Kalighat Metro Station',
    walking_distance: '650m',
    walking_time_mins: 8,
    metro_details: [
      {
        station_id: 'kalighat',
        station_name: 'Kalighat',
        line: 'Blue Line (North-South)',
        line_code: 'blue',
        walking_distance: '650m',
        walking_time_mins: 8,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Kalighat+Metro+Station&destination=Tridhara%20Sammilani%2C%20Kolkata'
      }
    ],
    tags: ['Must Visit', 'Art & Theme', 'Near Metro', 'Trending'],
    puja_committee: 'Tridhara Sammilani Durgotsav',
    best_time: 'Late night (12:30 AM – 3:30 AM) when lighting subtleties shine',
    crowd_status: {
      level: 'moderate',
      source: 'Estimated',
      last_updated: '35 mins ago',
      notes: 'Smooth one-way pedestrian routing through Manoharpukur Road.'
    },
    recommended_days: ['Shashti', 'Saptami', 'Ashtami', 'Nabami', 'Tonight'],
    featured_image: '/pandals/deshapriya-park.jpg',
    images: [
      {
        id: 'ts-1',
        url: '/pandals/tridhara-sammilani.jpg',
        caption: 'Intricate ecological art pieces created from natural fiber',
        category: 'official',
        author: 'Tridhara Creative Lab'
      }
    ],
    latest_images: [
      {
        id: 'ts-insta-1',
        pandal_id: 'tridhara-sammilani',
        username: 'monsoon_kolkata',
        user_avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        caption: 'Tridhara 2026 theme is pure poetry in wood and bamboo. Do not miss this if you love thoughtful art. #Tridhara #Pujo2026',
        media_url: '/pandals/tridhara-sammilani.jpg',
        permalink: 'https://instagram.com/p/C-tridhara1',
        timestamp: '2026-09-30T16:10:00Z',
        media_type: 'IMAGE',
        source_type: 'instagram',
        verified_for_2026: true,
        likes_count: 3670
      }
    ],
    trending_score: 92,
    saves_count: 1220,
    created_at: '2026-08-01T00:00:00Z',
    updated_at: '2026-09-30T10:00:00Z'
  },
  {
    id: 'mudiali-club',
    name: 'Mudiali Club',
    slug: 'mudiali-club',
    description: 'A benchmark of understated elegance, refined environmental artistry, and mesmerizing soft lighting designed to evoke meditative reverence.',
    heritage_note: 'Celebrated for over 85 years, known for gentle aesthetic palettes and peaceful ambience.',
    theme: 'Traditional Filigree & Hand-beaten Metalwork Temple',
    area: 'South Kolkata',
    locality: 'Southern Avenue / Kalighat',
    latitude: 22.5121,
    longitude: 88.3512,
    google_place_id: 'ChIJj7x4bL93AjoROf-9R2o3r1k',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=Mudiali%20Club%2C%20Kolkata',
    nearest_metro: 'Rabindra Sarobar Metro Station',
    walking_distance: '600m',
    walking_time_mins: 7,
    metro_details: [
      {
        station_id: 'rabindra-sarobar',
        station_name: 'Rabindra Sarobar',
        line: 'Blue Line (North-South)',
        line_code: 'blue',
        walking_distance: '600m',
        walking_time_mins: 7,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Rabindra+Sarobar+Metro+Station&destination=Mudiali%20Club%2C%20Kolkata'
      }
    ],
    tags: ['Near Metro', 'Heritage', 'Less Crowded', 'Traditional', 'Must Visit'],
    puja_committee: 'Mudiali Club Durgotsav',
    best_time: 'Morning or early evening (5:00 PM – 7:30 PM)',
    crowd_status: {
      level: 'low',
      source: 'Estimated',
      last_updated: '22 mins ago',
      notes: 'Pleasant and serene walking environment along lake vicinity.'
    },
    recommended_days: ['Saptami', 'Ashtami', 'Nabami', 'Tonight'],
    featured_image: '/pandals/tridhara-sammilani.jpg',
    images: [
      {
        id: 'mc-1',
        url: '/pandals/mudiali-club.jpg',
        caption: 'Classical idol illuminated with warm, serene amber lighting',
        category: 'official',
        author: 'Mudiali Archive'
      }
    ],
    latest_images: [
      {
        id: 'mc-insta-1',
        pandal_id: 'mudiali-club',
        username: 'calcutta_lensman',
        user_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        caption: 'If you want serenity and pure artistic devotion, get down at Rabindra Sarobar and walk to Mudiali. #MudialiClub #KolkataPuja2026',
        media_url: '/pandals/mudiali-club.jpg',
        permalink: 'https://instagram.com/p/C-mudiali1',
        timestamp: '2026-09-30T14:40:00Z',
        media_type: 'IMAGE',
        source_type: 'instagram',
        verified_for_2026: true,
        likes_count: 2890
      }
    ],
    trending_score: 88,
    saves_count: 980,
    created_at: '2026-08-01T00:00:00Z',
    updated_at: '2026-09-30T10:00:00Z'
  },
  {
    id: 'ekdalia-evergreen',
    name: 'Ekdalia Evergreen Club',
    slug: 'ekdalia-evergreen',
    description: 'Legendary for recreating historic Indian ancient temple sanctorums in authentic stone textures, accompanied by royal classical brass chandeliers from Germany and pure sabeki idol.',
    heritage_note: 'A cultural anchor of Gariahat since 1943, celebrated for timeless Indian temple grandeur.',
    theme: 'Ancient Thanjavur Brihadisvara Temple Stone Recreation',
    area: 'South Kolkata',
    locality: 'Gariahat, Ballygunge',
    latitude: 22.5198,
    longitude: 88.3687,
    google_place_id: 'ChIJz2x4bL93AjoROf-9R2o3r1m',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=Ekdalia%20Evergreen%20Club%2C%20Kolkata',
    nearest_metro: 'Kalighat Metro Station',
    walking_distance: '1.5 km (Auto available right outside metro)',
    walking_time_mins: 17,
    metro_details: [
      {
        station_id: 'kalighat',
        station_name: 'Kalighat',
        line: 'Blue Line (North-South)',
        line_code: 'blue',
        walking_distance: '1.5 km',
        walking_time_mins: 17,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Kalighat+Metro+Station&destination=Ekdalia%20Evergreen%20Club%2C%20Kolkata'
      }
    ],
    tags: ['Popular', 'Heritage', 'Must Visit', 'Traditional'],
    puja_committee: 'Ekdalia Evergreen Club Committee',
    best_time: 'Evening (6:00 PM – 9:00 PM)',
    crowd_status: {
      level: 'heavy',
      source: 'Estimated',
      last_updated: '12 mins ago',
      notes: 'Bustling shopping district in Gariahat adds to the festive vibrancy.'
    },
    recommended_days: ['Shashti', 'Saptami', 'Ashtami', 'Nabami', 'Tonight'],
    featured_image: '/pandals/mudiali-club.jpg',
    images: [
      {
        id: 'ee-1',
        url: '/pandals/ekdalia-evergreen.jpg',
        caption: 'Stone carved temple arches and traditional idol',
        category: 'official',
        author: 'Ekdalia Media'
      }
    ],
    latest_images: [
      {
        id: 'ee-insta-1',
        pandal_id: 'ekdalia-evergreen',
        username: 'gariahatchronicles',
        user_avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        caption: 'The majestic chandelier at Ekdalia Evergreen is being hung! Always a grand spectacle. #EkdaliaEvergreen #Gariahat #Pujo2026',
        media_url: '/pandals/ekdalia-evergreen.jpg',
        permalink: 'https://instagram.com/p/C-ekdalia1',
        timestamp: '2026-09-30T11:45:00Z',
        media_type: 'IMAGE',
        source_type: 'instagram',
        verified_for_2026: true,
        likes_count: 3100
      }
    ],
    trending_score: 90,
    saves_count: 1240,
    created_at: '2026-08-01T00:00:00Z',
    updated_at: '2026-09-30T10:00:00Z'
  },
  {
    id: 'salt-lake-fd-block',
    name: 'Salt Lake FD Block Sarbojanin',
    slug: 'salt-lake-fd-block',
    description: 'East Kolkata’s flagship puja famous for breathtaking architectural scale, expansive park promenade, children’s carnival fair, and seamless access via the Green Line Metro.',
    heritage_note: 'A cultural beacon of Bidhannagar (Salt Lake City) attracting thousands with grand thematic spectacles.',
    theme: 'Revival of Ancient Nalanda University & Lost Whispers of Knowledge',
    area: 'East Kolkata',
    locality: 'FD Block Park, Sector III, Salt Lake',
    latitude: 22.5786,
    longitude: 88.4112,
    google_place_id: 'ChIJz2x4bL93AjoROf-9R2o3r1n',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=Salt%20Lake%20FD%20Block%20Sarbojanin%2C%20Kolkata',
    nearest_metro: 'Karunamoyee Metro Station',
    walking_distance: '750m',
    walking_time_mins: 9,
    metro_details: [
      {
        station_id: 'karunamoyee',
        station_name: 'Karunamoyee',
        line: 'Green Line (East-West)',
        line_code: 'green',
        walking_distance: '750m',
        walking_time_mins: 9,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Karunamoyee+Metro+Station&destination=Salt%20Lake%20FD%20Block%20Sarbojanin%2C%20Kolkata'
      },
      {
        station_id: 'central-park',
        station_name: 'Central Park',
        line: 'Green Line (East-West)',
        line_code: 'green',
        walking_distance: '900m',
        walking_time_mins: 11,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Central+Park+Metro+Station&destination=Salt%20Lake%20FD%20Block%20Sarbojanin%2C%20Kolkata'
      }
    ],
    tags: ['Near Metro', 'Popular', 'Art & Theme', 'Night Friendly', 'Trending'],
    puja_committee: 'FD Block Residents Association',
    best_time: 'Evening (6:30 PM – 10:30 PM) for the surrounding fair and food stalls',
    crowd_status: {
      level: 'moderate',
      source: 'Community reported',
      last_updated: '45 mins ago',
      notes: 'Expansive open park grounds with very comfortable walking paths.'
    },
    recommended_days: ['Shashti', 'Saptami', 'Ashtami', 'Nabami', 'Tonight'],
    featured_image: '/pandals/ekdalia-evergreen.jpg',
    images: [
      {
        id: 'fd-1',
        url: '/pandals/salt-lake-fd-block.jpg',
        caption: 'Grand architectural setup across the wide FD block park grounds',
        category: 'official',
        author: 'FD Block Media'
      }
    ],
    latest_images: [
      {
        id: 'fd-insta-1',
        pandal_id: 'salt-lake-fd-block',
        username: 'saltlake_vibes',
        user_avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        caption: 'Taking the Green Line metro straight to Karunamoyee made visiting FD Block puja effortless! #GreenLineMetro #SaltLake #Pujo2026',
        media_url: '/pandals/salt-lake-fd-block.jpg',
        permalink: 'https://instagram.com/p/C-fdblock1',
        timestamp: '2026-09-30T18:15:00Z',
        media_type: 'IMAGE',
        source_type: 'instagram',
        verified_for_2026: true,
        likes_count: 2450
      }
    ],
    trending_score: 89,
    saves_count: 1080,
    created_at: '2026-08-01T00:00:00Z',
    updated_at: '2026-09-30T10:00:00Z'
  },
  {
    id: 'chetla-agrani',
    name: 'Chetla Agrani Club',
    slug: 'chetla-agrani',
    description: 'Renowned for immersive, thought-provoking artistic themes with exquisite handmade materials, earthy lighting, and soul-stirring background scores.',
    heritage_note: 'A multiple award-winning puja that transforms the Chetla neighborhood into an open-air art gallery.',
    theme: 'Echoes of the River: Life Along the Adi Ganga',
    area: 'South Kolkata',
    locality: 'Chetla, Alipore',
    latitude: 22.5165,
    longitude: 88.3375,
    google_place_id: 'ChIJz2x4bL93AjoROf-9R2o3r1p',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=Chetla%20Agrani%20Club%2C%20Kolkata',
    nearest_metro: 'Kalighat Metro Station',
    walking_distance: '950m',
    walking_time_mins: 11,
    metro_details: [
      {
        station_id: 'kalighat',
        station_name: 'Kalighat',
        line: 'Blue Line (North-South)',
        line_code: 'blue',
        walking_distance: '950m',
        walking_time_mins: 11,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Kalighat+Metro+Station&destination=Chetla%20Agrani%20Club%2C%20Kolkata'
      },
      {
        station_id: 'netaji-bhavan',
        station_name: 'Netaji Bhavan',
        line: 'Blue Line (North-South)',
        line_code: 'blue',
        walking_distance: '1.2 km',
        walking_time_mins: 14,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Netaji+Bhavan+Metro+Station&destination=Chetla%20Agrani%20Club%2C%20Kolkata'
      }
    ],
    tags: ['Must Visit', 'Art & Theme', 'Popular', 'Trending'],
    puja_committee: 'Chetla Agrani Club Committee',
    best_time: 'Late night (1:00 AM – 4:00 AM) or early morning',
    crowd_status: {
      level: 'moderate',
      source: 'Estimated',
      last_updated: '30 mins ago',
      notes: 'Organized queue with shaded waiting enclosures.'
    },
    recommended_days: ['Shashti', 'Saptami', 'Ashtami', 'Nabami', 'Tonight'],
    featured_image: '/pandals/salt-lake-fd-block.jpg',
    images: [
      {
        id: 'ca-1',
        url: '/pandals/chetla-agrani.jpg',
        caption: 'Handcrafted installations utilizing clay and river reeds',
        category: 'official',
        author: 'Chetla Arts Guild'
      }
    ],
    latest_images: [
      {
        id: 'ca-insta-1',
        pandal_id: 'chetla-agrani',
        username: 'arty_kolkata',
        user_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        caption: 'Chetla Agrani 2026 once again proves that Durga Puja is the world’s greatest public art festival. #ChetlaAgrani #PublicArt #Pujo2026',
        media_url: '/pandals/chetla-agrani.jpg',
        permalink: 'https://instagram.com/p/C-chetla1',
        timestamp: '2026-09-30T13:30:00Z',
        media_type: 'IMAGE',
        source_type: 'instagram',
        verified_for_2026: true,
        likes_count: 3820
      }
    ],
    trending_score: 93,
    saves_count: 1310,
    created_at: '2026-08-01T00:00:00Z',
    updated_at: '2026-09-30T10:00:00Z'
  },
  {
    id: 'santosh-mitra-square',
    name: 'Santosh Mitra Square (Lebutala)',
    slug: 'santosh-mitra-square',
    description: 'Renowned across Bengal for jaw-dropping multimedia laser shows, monumental architectural replicas, and high-tech illuminated installations.',
    heritage_note: 'A legendary Central Kolkata crowd-magnet drawing millions with engineering marvels.',
    theme: 'Spheres of the Cosmos: Lasers, Glass & Celestial Divinity',
    area: 'Central Kolkata',
    locality: 'Bowbazar / Sealdah',
    latitude: 22.5691,
    longitude: 88.3698,
    google_place_id: 'ChIJz2x4bL93AjoROf-9R2o3r1q',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=Santosh%20Mitra%20Square%20(Lebutala)%2C%20Kolkata',
    nearest_metro: 'Sealdah Metro Station',
    walking_distance: '550m',
    walking_time_mins: 7,
    metro_details: [
      {
        station_id: 'sealdah',
        station_name: 'Sealdah',
        line: 'Green Line (East-West)',
        line_code: 'green',
        walking_distance: '550m',
        walking_time_mins: 7,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Sealdah+Metro+Station&destination=Santosh%20Mitra%20Square%20(Lebutala)%2C%20Kolkata'
      },
      {
        station_id: 'central',
        station_name: 'Central',
        line: 'Blue Line (North-South)',
        line_code: 'blue',
        walking_distance: '850m',
        walking_time_mins: 10,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Central+Metro+Station&destination=Santosh%20Mitra%20Square%20(Lebutala)%2C%20Kolkata'
      }
    ],
    tags: ['Must Visit', 'Near Metro', 'Popular', 'Trending', 'Night Friendly'],
    puja_committee: 'Santosh Mitra Square Durgotsav Samiti',
    best_time: 'Night (8:00 PM – 2:00 AM) to experience the full laser lighting effects',
    crowd_status: {
      level: 'heavy',
      source: 'Community reported',
      last_updated: '14 mins ago',
      notes: 'Entry lines managed from BB Ganguly Street.'
    },
    recommended_days: ['Shashti', 'Saptami', 'Ashtami', 'Nabami', 'Tonight'],
    featured_image: '/pandals/chetla-agrani.jpg',
    images: [
      {
        id: 'sms-1',
        url: '/pandals/santosh-mitra-square.jpg',
        caption: 'High-tech laser lights mapping across the sanctum structure',
        category: 'official',
        author: 'SMS Media Cell'
      }
    ],
    latest_images: [
      {
        id: 'sms-insta-1',
        pandal_id: 'santosh-mitra-square',
        username: 'calcutta_buzz',
        user_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        caption: 'Sealdah metro has made Santosh Mitra Square so fast to reach! The laser synchronization this year is next level. #SantoshMitraSquare #Pujo2026',
        media_url: '/pandals/santosh-mitra-square.jpg',
        permalink: 'https://instagram.com/p/C-santoshmitra1',
        timestamp: '2026-09-30T19:30:00Z',
        media_type: 'IMAGE',
        source_type: 'instagram',
        verified_for_2026: true,
        likes_count: 4920
      }
    ],
    trending_score: 97,
    saves_count: 1980,
    created_at: '2026-08-01T00:00:00Z',
    updated_at: '2026-09-30T10:00:00Z'
  },
  {
    id: 'behala-natun-dal',
    name: 'Behala Natun Dal',
    slug: 'behala-natun-dal',
    description: 'South-West Kolkata’s foremost conceptual powerhouse. Renowned for turning entire street canopies into deeply evocative spatial artworks with original soundscapes.',
    heritage_note: 'A cultural anchor of Behala renowned for visionary environmental and socio-philosophical themes.',
    theme: 'The Woven Fabric of Peace & Universal Harmony',
    area: 'South Kolkata',
    locality: 'Behala Chowrasta / Taratala',
    latitude: 22.4975,
    longitude: 88.3182,
    google_place_id: 'ChIJz2x4bL93AjoROf-9R2o3r1r',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=Behala%20Natun%20Dal%2C%20Kolkata',
    nearest_metro: 'Behala Chowrasta Metro Station',
    walking_distance: '500m',
    walking_time_mins: 6,
    metro_details: [
      {
        station_id: 'behala-chowrasta',
        station_name: 'Behala Chowrasta',
        line: 'Purple Line (Joka-Esplanade)',
        line_code: 'purple',
        walking_distance: '500m',
        walking_time_mins: 6,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Behala+Chowrasta+Metro+Station&destination=Behala%20Natun%20Dal%2C%20Kolkata'
      }
    ],
    tags: ['Art & Theme', 'Near Metro', 'Must Visit', 'Trending'],
    puja_committee: 'Behala Natun Dal Association',
    best_time: 'Afternoon (3:30 PM – 6:00 PM) to absorb the detailed handlooms',
    crowd_status: {
      level: 'low',
      source: 'Estimated',
      last_updated: '50 mins ago',
      notes: 'Smooth flow along Diamond Harbour Road feeder lane.'
    },
    recommended_days: ['Shashti', 'Saptami', 'Ashtami', 'Nabami', 'Tonight'],
    featured_image: '/pandals/santosh-mitra-square.jpg',
    images: [
      {
        id: 'bnd-1',
        url: '/pandals/behala-natun-dal.jpg',
        caption: 'Hand-spun textile textures wrapping the central santum',
        category: 'official',
        author: 'Natun Dal Media'
      }
    ],
    latest_images: [
      {
        id: 'bnd-insta-1',
        pandal_id: 'behala-natun-dal',
        username: 'kolkata_tales',
        user_avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        caption: 'Behala Natun Dal 2026 installation is sheer brilliance. Take the Purple Line metro to Behala Chowrasta! #BehalaNatunDal #PurpleLine #Pujo2026',
        media_url: '/pandals/behala-natun-dal.jpg',
        permalink: 'https://instagram.com/p/C-natundal1',
        timestamp: '2026-09-30T17:00:00Z',
        media_type: 'IMAGE',
        source_type: 'instagram',
        verified_for_2026: true,
        likes_count: 2210
      }
    ],
    trending_score: 87,
    saves_count: 890,
    created_at: '2026-08-01T00:00:00Z',
    updated_at: '2026-09-30T10:00:00Z'
  },

  // ─── GREEN LINE PANDALS ─────────────────────────────────────────────────────

  {
    id: 'sealdah-athletic-club',
    name: 'Sealdah Athletic Club',
    slug: 'sealdah-athletic-club',
    description: 'One of the oldest clubs in central Kolkata, Sealdah Athletic Club presents a deeply traditional Durga Puja rooted in Sabeki style with handcrafted idols and intimate neighbourhood warmth.',
    heritage_note: 'Established for over 60 years, this club represents the soul of old Sealdah community celebrations.',
    theme: 'Sabeki Traditional Worship — Grassroots Heritage (2026)',
    area: 'Central Kolkata',
    locality: 'Sealdah, Central Kolkata',
    latitude: 22.5681,
    longitude: 88.3695,
    google_place_id: 'sealdah-athletic-club-kolkata',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=Sealdah%20Athletic%20Club%2C%20Kolkata',
    nearest_metro: 'Sealdah Metro Station',
    walking_distance: '550m',
    walking_time_mins: 7,
    metro_details: [{ station_id: 'sealdah', station_name: 'Sealdah', line: 'Green Line (East-West)', line_code: 'green', walking_distance: '550m', walking_time_mins: 7, directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Sealdah+Metro+Station&destination=Sealdah%20Athletic%20Club%2C%20Kolkata' }],
    tags: ['Traditional', 'Heritage', 'Walk-Friendly'],
    puja_committee: 'Sealdah Athletic Club Puja Committee',
    best_time: 'Ashtami morning or Navami evening',
    crowd_status: { level: 'moderate', source: 'Estimated', last_updated: '1 hour ago' },
    recommended_days: ['Ashtami', 'Nabami'],
    featured_image: '/pandals/behala-natun-dal.jpg',
    images: [{ id: 'sac-1', url: '/pandals/sealdah-athletic-club.jpg', caption: 'Traditional idol adorned with flowers', category: 'official' }],
    latest_images: [],
    trending_score: 55,
    saves_count: 210,
    is_must_visit: false,
    created_at: '2026-08-01T00:00:00Z',
    updated_at: '2026-09-30T10:00:00Z'
  },

  {
    id: '37-pally',
    name: '37 Pally Sarbojanin',
    slug: '37-pally-sarbojanin',
    description: 'A beloved neighbourhood club near Sealdah station known for artistic themed pandals that blend contemporary art with festive tradition, consistently drawing large crowds from the rail corridor.',
    theme: 'Contemporary Art Installation (2026)',
    area: 'Central Kolkata',
    locality: 'Sealdah, Central Kolkata',
    latitude: 22.5673,
    longitude: 88.3702,
    google_place_id: '37-pally-sealdah-kolkata',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=37%20Pally%20Sarbojanin%2C%20Kolkata',
    nearest_metro: 'Sealdah Metro Station',
    walking_distance: '600m (Auto available)',
    walking_time_mins: 8,
    metro_details: [{ station_id: 'sealdah', station_name: 'Sealdah', line: 'Green Line (East-West)', line_code: 'green', walking_distance: '600m', walking_time_mins: 8, directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Sealdah+Metro+Station&destination=37%20Pally%20Sarbojanin%2C%20Kolkata' }],
    tags: ['Artistic', 'Popular'],
    puja_committee: '37 Pally Sarbojanin Durgotsav Committee',
    best_time: 'Evening after 7 PM',
    crowd_status: { level: 'moderate', source: 'Estimated', last_updated: '2 hours ago' },
    recommended_days: ['Saptami', 'Ashtami'],
    featured_image: '/pandals/sealdah-athletic-club.jpg',
    images: [{ id: '37p-1', url: '/pandals/37-pally.jpg', caption: 'Pandal illumination at dusk', category: 'official' }],
    latest_images: [],
    trending_score: 52,
    saves_count: 180,
    created_at: '2026-08-01T00:00:00Z',
    updated_at: '2026-09-30T10:00:00Z'
  },

  {
    id: 'salt-lake-bj-block',
    name: 'BJ Block Sarbojanin',
    slug: 'bj-block-sarbojanin',
    description: 'The crown of Karunamoyee corridor, BJ Block is celebrated for world-class thematic pandals and elaborately decorated idols. A must-visit on the Salt Lake circuit with smooth metro access.',
    theme: 'Global Architectural Marvel (2026)',
    area: 'East Kolkata',
    locality: 'BJ Block, Salt Lake',
    latitude: 22.5810,
    longitude: 88.4138,
    google_place_id: 'bj-block-salt-lake-kolkata',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=BJ%20Block%20Sarbojanin%2C%20Kolkata',
    nearest_metro: 'Karunamoyee Metro Station',
    walking_distance: '650m',
    walking_time_mins: 8,
    metro_details: [{ station_id: 'karunamoyee', station_name: 'Karunamoyee', line: 'Green Line (East-West)', line_code: 'green', walking_distance: '650m', walking_time_mins: 8, directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Karunamoyee+Metro+Station&destination=BJ%20Block%20Sarbojanin%2C%20Kolkata' }],
    tags: ['Must Visit', 'Popular', 'Trending', 'Night Friendly'],
    puja_committee: 'BJ Block Sarbojanin Durgotsav',
    best_time: 'Late evening (9 PM – midnight)',
    crowd_status: { level: 'heavy', source: 'Community reported', last_updated: '30 mins ago', notes: 'Weekend crowds very high — plan weekday visit.' },
    recommended_days: ['Shashti', 'Saptami', 'Ashtami'],
    featured_image: '/pandals/37-pally.jpg',
    images: [{ id: 'bj-1', url: '/pandals/salt-lake-bj-block.jpg', caption: 'Grand pandal illuminated at night', category: 'official' }],
    latest_images: [],
    trending_score: 82,
    saves_count: 720,
    is_must_visit: true,
    created_at: '2026-08-01T00:00:00Z',
    updated_at: '2026-09-30T10:00:00Z'
  },

  {
    id: 'ae-block-central-park',
    name: 'AE Block Sarbojanin',
    slug: 'ae-block-sarbojanin',
    description: 'Situated near the iconic Central Park of Salt Lake, AE Block is celebrated for panoramic illuminations and its signature blend of theme art with traditional Durga worship. Easily reachable from Central Park station.',
    theme: 'Nature & Ecology — Forest Pavilion (2026)',
    area: 'East Kolkata',
    locality: 'AE Block, Salt Lake Sector I',
    latitude: 22.5848,
    longitude: 88.4175,
    google_place_id: 'ae-block-salt-lake-kolkata',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=AE%20Block%20Sarbojanin%2C%20Kolkata',
    nearest_metro: 'Central Park Metro Station',
    walking_distance: '700m (Auto available)',
    walking_time_mins: 9,
    metro_details: [{ station_id: 'central-park', station_name: 'Central Park', line: 'Green Line (East-West)', line_code: 'green', walking_distance: '700m', walking_time_mins: 9, directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Central+Park+Metro+Station&destination=AE%20Block%20Sarbojanin%2C%20Kolkata' }],
    tags: ['Must Visit', 'Popular', 'Night Friendly'],
    puja_committee: 'AE Block Sarbojanin Durgotsav',
    best_time: 'Evening or midnight pandal hop',
    crowd_status: { level: 'moderate', source: 'Estimated', last_updated: '1 hour ago' },
    recommended_days: ['Saptami', 'Ashtami', 'Nabami'],
    featured_image: '/pandals/salt-lake-bj-block.jpg',
    images: [{ id: 'ae-1', url: '/pandals/ae-block-central-park.jpg', caption: 'Eco-themed pandal with lush decorations', category: 'official' }],
    latest_images: [],
    trending_score: 74,
    saves_count: 580,
    is_must_visit: true,
    created_at: '2026-08-01T00:00:00Z',
    updated_at: '2026-09-30T10:00:00Z'
  },

  {
    id: 'sreebhumi-sporting-club-new-town',
    name: 'New Town Sarbojanin',
    slug: 'new-town-sarbojanin',
    description: 'Kolkata\'s gateway to New Town\'s festive spirit, New Town Sarbojanin brings stunning theme-based decorations to the city\'s newest urban quarter, accessible from Sector V with an auto or cab.',
    theme: 'Smart City — Digital India Tribute (2026)',
    area: 'East Kolkata',
    locality: 'New Town, Rajarhat',
    latitude: 22.5771,
    longitude: 88.4641,
    google_place_id: 'new-town-sarbojanin-kolkata',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=New%20Town%20Sarbojanin%2C%20Kolkata',
    nearest_metro: 'Salt Lake Sector V Metro Station',
    walking_distance: '2.5 km (Auto 8 mins)',
    walking_time_mins: 30,
    metro_details: [{ station_id: 'salt-lake-sector-v', station_name: 'Salt Lake Sector V', line: 'Green Line (East-West)', line_code: 'green', walking_distance: '2.5 km', walking_time_mins: 30, directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Salt+Lake+Sector+V+Metro+Station&destination=New%20Town%20Sarbojanin%2C%20Kolkata' }],
    tags: ['Must Visit', 'Popular', 'Trending'],
    puja_committee: 'New Town Sarbojanin Durgotsav Committee',
    best_time: 'Ashtami or Nabami evening',
    crowd_status: { level: 'moderate', source: 'Estimated', last_updated: '2 hours ago' },
    recommended_days: ['Ashtami', 'Nabami'],
    featured_image: '/pandals/ae-block-central-park.jpg',
    images: [{ id: 'nt-1', url: '/pandals/sreebhumi-sporting-club-new-town.jpg', caption: 'Modern themed pandal in New Town', category: 'official' }],
    latest_images: [],
    trending_score: 68,
    saves_count: 440,
    is_must_visit: true,
    created_at: '2026-08-01T00:00:00Z',
    updated_at: '2026-09-30T10:00:00Z'
  },

  // ─── ORANGE LINE PANDALS ────────────────────────────────────────────────────

  {
    id: 'santoshpur-lake-pally',
    name: 'Santoshpur Lake Pally',
    slug: 'santoshpur-lake-pally',
    description: 'Set against the backdrop of Santoshpur\'s serene lake, this pandal is famed for its breathtaking lakeside illumination that reflects perfectly on the water, creating a magical atmosphere during the pujo nights.',
    theme: 'Lakeside Illumination & Nature Worship (2026)',
    area: 'South Kolkata',
    locality: 'Santoshpur, South Kolkata',
    latitude: 22.4952,
    longitude: 88.3925,
    google_place_id: 'santoshpur-lake-pally-kolkata',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=Santoshpur%20Lake%20Pally%2C%20Kolkata',
    nearest_metro: 'Satyajit Ray Metro Station',
    walking_distance: '1.8 km (Auto 6 mins)',
    walking_time_mins: 22,
    metro_details: [{ station_id: 'satyajit-ray', station_name: 'Satyajit Ray', line: 'Orange Line (Kavi Subhash-Airport)', line_code: 'orange', walking_distance: '1.8 km', walking_time_mins: 22, directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Satyajit+Ray+Metro+Station&destination=Santoshpur%20Lake%20Pally%2C%20Kolkata' }],
    tags: ['Must Visit', 'Popular', 'Night Friendly', 'Scenic'],
    puja_committee: 'Santoshpur Lake Pally Durgotsav Committee',
    best_time: 'After 9 PM when lake reflections are magical',
    crowd_status: { level: 'heavy', source: 'Community reported', last_updated: '20 mins ago' },
    recommended_days: ['Saptami', 'Ashtami', 'Tonight'],
    featured_image: '/pandals/sreebhumi-sporting-club-new-town.jpg',
    images: [{ id: 'slp-1', url: '/pandals/santoshpur-lake-pally.jpg', caption: 'Pandal lights reflecting on lake waters at midnight', category: 'official' }],
    latest_images: [],
    trending_score: 84,
    saves_count: 790,
    is_must_visit: true,
    created_at: '2026-08-01T00:00:00Z',
    updated_at: '2026-09-30T10:00:00Z'
  },

  {
    id: 'bosepukur-sitala-mandir',
    name: 'Bosepukur Sitala Mandir',
    slug: 'bosepukur-sitala-mandir',
    description: 'One of South Kolkata\'s most artistically celebrated pandals, Bosepukur Sitala Mandir is renowned for avant-garde conceptual installations and boundary-pushing themes that challenge and inspire visitors every year.',
    heritage_note: 'Celebrating its 77th year in 2026 with the theme "Dhongsho" (Destruction) — a philosophical exploration of cyclical creation.',
    theme: 'Dhongsho (Destruction) — Philosophical Art Installation (2026)',
    area: 'South Kolkata',
    locality: 'Bosepukur, Kasba',
    latitude: 22.5098,
    longitude: 88.3842,
    google_place_id: 'bosepukur-sitala-mandir-kolkata',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=Bosepukur%20Sitala%20Mandir%2C%20Kolkata',
    nearest_metro: 'VIP Bazar Metro Station',
    walking_distance: '1.2 km (Auto 4 mins)',
    walking_time_mins: 15,
    metro_details: [{ station_id: 'vip-bazar', station_name: 'VIP Bazar', line: 'Orange Line (Kavi Subhash-Airport)', line_code: 'orange', walking_distance: '1.2 km', walking_time_mins: 15, directions_url: 'https://www.google.com/maps/dir/?api=1&origin=VIP+Bazar+Metro+Station&destination=Bosepukur%20Sitala%20Mandir%2C%20Kolkata' }],
    tags: ['Must Visit', 'Artistic', 'Popular', 'Heritage'],
    puja_committee: 'Bosepukur Sitala Mandir Durgotsav Committee',
    best_time: 'Evening 8 PM onwards',
    crowd_status: { level: 'heavy', source: 'Community reported', last_updated: '25 mins ago' },
    recommended_days: ['Saptami', 'Ashtami', 'Nabami'],
    featured_image: '/pandals/santoshpur-lake-pally.jpg',
    images: [{ id: 'bsm-1', url: '/pandals/bosepukur-sitala-mandir.jpg', caption: 'Conceptual art installation forming the pandal structure', category: 'official' }],
    latest_images: [],
    trending_score: 86,
    saves_count: 840,
    is_must_visit: true,
    created_at: '2026-08-01T00:00:00Z',
    updated_at: '2026-09-30T10:00:00Z'
  },

  {
    id: 'milan-tirtha',
    name: 'Milan Tirtha',
    slug: 'milan-tirtha',
    description: 'A well-established South Kolkata pandal known for warm community spirit and traditional worship. Located close to the VIP Bazar metro station, Milan Tirtha offers an accessible and authentic pujo experience.',
    theme: 'Traditional Sabeki with Modern Illumination (2026)',
    area: 'South Kolkata',
    locality: 'VIP Nagar, South Kolkata',
    latitude: 22.5112,
    longitude: 88.3858,
    google_place_id: 'milan-tirtha-kolkata',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=Milan%20Tirtha%2C%20Kolkata',
    nearest_metro: 'VIP Bazar Metro Station',
    walking_distance: '450m',
    walking_time_mins: 6,
    metro_details: [{ station_id: 'vip-bazar', station_name: 'VIP Bazar', line: 'Orange Line (Kavi Subhash-Airport)', line_code: 'orange', walking_distance: '450m', walking_time_mins: 6, directions_url: 'https://www.google.com/maps/dir/?api=1&origin=VIP+Bazar+Metro+Station&destination=Milan%20Tirtha%2C%20Kolkata' }],
    tags: ['Traditional', 'Walk-Friendly', 'Community'],
    puja_committee: 'Milan Tirtha Durgotsav Committee',
    best_time: 'Ashtami morning Pushpanjali or evening darshan',
    crowd_status: { level: 'moderate', source: 'Estimated', last_updated: '1 hour ago' },
    recommended_days: ['Saptami', 'Ashtami'],
    featured_image: '/pandals/bosepukur-sitala-mandir.jpg',
    images: [{ id: 'mt-1', url: '/pandals/milan-tirtha.jpg', caption: 'Traditional goddess idol with golden ornaments', category: 'official' }],
    latest_images: [],
    trending_score: 58,
    saves_count: 290,
    created_at: '2026-08-01T00:00:00Z',
    updated_at: '2026-09-30T10:00:00Z'
  },

  // ─── YELLOW LINE PANDALS ────────────────────────────────────────────────────

  {
    id: 'arjunpur-amra-sabai-club',
    name: 'Arjunpur Amra Sabai Club',
    slug: 'arjunpur-amra-sabai-club',
    description: 'Serving the airport corridor community, Arjunpur Amra Sabai Club brings festive Durga Puja traditions to North Kolkata\'s outskirts. Known for colourful decorations and strong community participation near Jessore Road.',
    theme: 'Communal Harmony & Cultural Mosaic (2026)',
    area: 'Airport Corridor',
    locality: 'Arjunpur, Jessore Road',
    latitude: 22.6658,
    longitude: 88.4182,
    google_place_id: 'arjunpur-amra-sabai-kolkata',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=Arjunpur%20Amra%20Sabai%20Club%2C%20Kolkata',
    nearest_metro: 'Jessore Road Metro Station',
    walking_distance: '1.5 km (Auto 5 mins)',
    walking_time_mins: 18,
    metro_details: [{ station_id: 'jessore-road', station_name: 'Jessore Road', line: 'Yellow Line (Airport-Noapara)', line_code: 'yellow', walking_distance: '1.5 km', walking_time_mins: 18, directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Jessore+Road+Metro+Station&destination=Arjunpur%20Amra%20Sabai%20Club%2C%20Kolkata' }],
    tags: ['Must Visit', 'Community', 'Popular'],
    puja_committee: 'Arjunpur Amra Sabai Club Puja Committee',
    best_time: 'Saptami or Ashtami evening',
    crowd_status: { level: 'moderate', source: 'Estimated', last_updated: '2 hours ago' },
    recommended_days: ['Saptami', 'Ashtami'],
    featured_image: '/pandals/milan-tirtha.jpg',
    images: [{ id: 'aas-1', url: '/pandals/arjunpur-amra-sabai-club.jpg', caption: 'Colourful pandal in the airport corridor', category: 'official' }],
    latest_images: [],
    trending_score: 60,
    saves_count: 320,
    is_must_visit: true,
    created_at: '2026-08-01T00:00:00Z',
    updated_at: '2026-09-30T10:00:00Z'
  },

  // ─── PURPLE LINE PANDALS ────────────────────────────────────────────────────

  {
    id: 'barisha-sarbojanin',
    name: 'Barisha Sarbojanin Durgotsav',
    slug: 'barisha-sarbojanin',
    description: 'One of Behala\'s most prestigious and crowd-pulling pandals, Barisha Sarbojanin is celebrated for magnificent replica architecture themes. In 2024 they recreated the Mysore Palace — setting the benchmark for South Kolkata pujo grandeur.',
    heritage_note: 'A flagship of the Behala-Barisha circuit, this pandal regularly wins state-level awards for artistic excellence.',
    theme: 'Grand Palace Architecture — Majestic Replica (2026)',
    area: 'South Kolkata',
    locality: 'Barisha, Behala',
    latitude: 22.4821,
    longitude: 88.3142,
    google_place_id: 'barisha-sarbojanin-kolkata',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=Barisha%20Sarbojanin%20Durgotsav%2C%20Kolkata',
    nearest_metro: 'Sakher Bazar Metro Station',
    walking_distance: '600m',
    walking_time_mins: 7,
    metro_details: [
      { station_id: 'sakher-bazar', station_name: 'Sakher Bazar', line: 'Purple Line (Joka-Esplanade)', line_code: 'purple', walking_distance: '600m', walking_time_mins: 7, directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Sakher+Bazar+Metro+Station&destination=Barisha%20Sarbojanin%20Durgotsav%2C%20Kolkata' },
      { station_id: 'behala-chowrasta', station_name: 'Behala Chowrasta', line: 'Purple Line (Joka-Esplanade)', line_code: 'purple', walking_distance: '900m', walking_time_mins: 11, directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Behala+Chowrasta+Metro+Station&destination=Barisha%20Sarbojanin%20Durgotsav%2C%20Kolkata' }
    ],
    tags: ['Must Visit', 'Popular', 'Trending', 'Monumental', 'Night Friendly'],
    puja_committee: 'Barisha Sarbojanin Durgotsav Committee',
    best_time: 'Evening 8 PM – midnight',
    crowd_status: { level: 'heavy', source: 'Community reported', last_updated: '15 mins ago', notes: 'Peak crowd on Ashtami — arrive by 7 PM.' },
    recommended_days: ['Shashti', 'Saptami', 'Ashtami', 'Tonight'],
    featured_image: '/pandals/arjunpur-amra-sabai-club.jpg',
    images: [{ id: 'bs-1', url: '/pandals/barisha-sarbojanin.jpg', caption: 'Majestic palace replica pandal illuminated for Durga Puja', category: 'official' }],
    latest_images: [],
    trending_score: 88,
    saves_count: 950,
    is_must_visit: true,
    created_at: '2026-08-01T00:00:00Z',
    updated_at: '2026-09-30T10:00:00Z'
  },

  {
    id: 'sabarna-roy-chowdhury-aatchala',
    name: 'Sabarna Roy Chowdhury Aatchala Bari',
    slug: 'sabarna-roy-chowdhury-aatchala-bari',
    description: 'A historic ancestral mansion dating to the Mughal era, the Sabarna Roy Chowdhury Aatchala Bari in Barisha hosts one of Kolkata\'s oldest and most authentic family Durga Pujas, preserved in its original heritage compound.',
    heritage_note: 'The Sabarna Roy Chowdhury family\'s puja dates back 400+ years to 1610 AD, making it one of the oldest Durga Pujas in Bengal. The original aatchala (eight-cornered) architectural structure is a protected heritage site.',
    theme: 'Ancestral Heritage — 400-Year Living Tradition (2026)',
    area: 'South Kolkata',
    locality: 'Barisha, Behala',
    latitude: 22.4810,
    longitude: 88.3135,
    google_place_id: 'sabarna-roy-chowdhury-kolkata',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=Sabarna%20Roy%20Chowdhury%20Aatchala%20Bari%2C%20Kolkata',
    nearest_metro: 'Sakher Bazar Metro Station',
    walking_distance: '650m',
    walking_time_mins: 8,
    metro_details: [{ station_id: 'sakher-bazar', station_name: 'Sakher Bazar', line: 'Purple Line (Joka-Esplanade)', line_code: 'purple', walking_distance: '650m', walking_time_mins: 8, directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Sakher+Bazar+Metro+Station&destination=Sabarna%20Roy%20Chowdhury%20Aatchala%20Bari%2C%20Kolkata' }],
    tags: ['Must Visit', 'Heritage', 'Historic', 'Traditional'],
    puja_committee: 'Sabarna Roy Chowdhury Paribar',
    best_time: 'Shashti or Saptami morning — traditional rites most visible',
    crowd_status: { level: 'moderate', source: 'Estimated', last_updated: '1 hour ago' },
    recommended_days: ['Shashti', 'Saptami', 'Ashtami'],
    featured_image: '/pandals/barisha-sarbojanin.jpg',
    images: [{ id: 'src-1', url: '/pandals/sabarna-roy-chowdhury-aatchala.jpg', caption: 'Ancient aatchala mansion adorned for Durga Puja', category: 'official' }],
    latest_images: [],
    trending_score: 80,
    saves_count: 710,
    is_must_visit: true,
    created_at: '2026-08-01T00:00:00Z',
    updated_at: '2026-09-30T10:00:00Z'
  },

  {
    id: 'behala-nutan-dal',
    name: 'Behala Nutan Dal',
    slug: 'behala-nutan-dal',
    description: 'A consistent crowd-puller and award winner on the Behala circuit, Nutan Dal is known for globally-inspired artistic themes delivered with exceptional craftsmanship. One of the must-sees on the Purple Line route.',
    theme: 'Global Art & Cultural Fusion (2026)',
    area: 'South Kolkata',
    locality: 'Behala, South Kolkata',
    latitude: 22.4970,
    longitude: 88.3165,
    google_place_id: 'behala-nutan-dal-kolkata',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=Behala%20Nutan%20Dal%2C%20Kolkata',
    nearest_metro: 'Behala Bazar Metro Station',
    walking_distance: '700m (Auto available)',
    walking_time_mins: 9,
    metro_details: [{ station_id: 'behala-bazar', station_name: 'Behala Bazar', line: 'Purple Line (Joka-Esplanade)', line_code: 'purple', walking_distance: '700m', walking_time_mins: 9, directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Behala+Bazar+Metro+Station&destination=Behala%20Nutan%20Dal%2C%20Kolkata' }],
    tags: ['Must Visit', 'Artistic', 'Popular', 'Trending'],
    puja_committee: 'Behala Nutan Dal Durgotsav Samiti',
    best_time: 'Evening 8 PM onwards',
    crowd_status: { level: 'heavy', source: 'Community reported', last_updated: '30 mins ago' },
    recommended_days: ['Saptami', 'Ashtami', 'Tonight'],
    featured_image: '/pandals/sabarna-roy-chowdhury-aatchala.jpg',
    images: [{ id: 'bnd-1', url: '/pandals/behala-nutan-dal.jpg', caption: 'Artistic pandal interior glowing under festival lights', category: 'official' }],
    latest_images: [],
    trending_score: 83,
    saves_count: 760,
    is_must_visit: true,
    created_at: '2026-08-01T00:00:00Z',
    updated_at: '2026-09-30T10:00:00Z'
  },

  {
    id: 'behala-friends',
    name: 'Behala Friends',
    slug: 'behala-friends',
    description: 'Behala Friends has carved its identity as a socially conscious puja committee, delivering thought-provoking themed pandals year after year while maintaining deep community roots in Behala Bazar.',
    theme: 'Social Consciousness & Community Voice (2026)',
    area: 'South Kolkata',
    locality: 'Behala Bazar, South Kolkata',
    latitude: 22.4985,
    longitude: 88.3170,
    google_place_id: 'behala-friends-kolkata',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=Behala%20Friends%2C%20Kolkata',
    nearest_metro: 'Behala Bazar Metro Station',
    walking_distance: '500m',
    walking_time_mins: 6,
    metro_details: [{ station_id: 'behala-bazar', station_name: 'Behala Bazar', line: 'Purple Line (Joka-Esplanade)', line_code: 'purple', walking_distance: '500m', walking_time_mins: 6, directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Behala+Bazar+Metro+Station&destination=Behala%20Friends%2C%20Kolkata' }],
    tags: ['Must Visit', 'Artistic', 'Walk-Friendly'],
    puja_committee: 'Behala Friends Durgotsav Committee',
    best_time: 'Evening to night',
    crowd_status: { level: 'moderate', source: 'Estimated', last_updated: '1 hour ago' },
    recommended_days: ['Saptami', 'Ashtami'],
    featured_image: '/pandals/behala-nutan-dal.jpg',
    images: [{ id: 'bf-1', url: '/pandals/behala-friends.jpg', caption: 'Warm festive decorations at Behala Friends pandal', category: 'official' }],
    latest_images: [],
    trending_score: 72,
    saves_count: 530,
    is_must_visit: true,
    created_at: '2026-08-01T00:00:00Z',
    updated_at: '2026-09-30T10:00:00Z'
  },

  {
    id: 'behala-29-pally',
    name: 'Behala 29 Pally',
    slug: 'behala-29-pally',
    description: 'Taratala\'s flagship Durga Puja celebration, Behala 29 Pally consistently delivers one of the finest pandal experiences in West Kolkata with meticulously crafted thematic installations and a festive atmosphere.',
    theme: 'Indian Mythology & Folk Art (2026)',
    area: 'South Kolkata',
    locality: 'Taratala, Behala',
    latitude: 22.5020,
    longitude: 88.3102,
    google_place_id: 'behala-29-pally-kolkata',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=Behala%2029%20Pally%2C%20Kolkata',
    nearest_metro: 'Taratala Metro Station',
    walking_distance: '550m',
    walking_time_mins: 7,
    metro_details: [{ station_id: 'taratala', station_name: 'Taratala', line: 'Purple Line (Joka-Esplanade)', line_code: 'purple', walking_distance: '550m', walking_time_mins: 7, directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Taratala+Metro+Station&destination=Behala%2029%20Pally%2C%20Kolkata' }],
    tags: ['Must Visit', 'Popular', 'Night Friendly'],
    puja_committee: 'Behala 29 Pally Durgotsav Samiti',
    best_time: 'Evening 7 PM – midnight',
    crowd_status: { level: 'heavy', source: 'Community reported', last_updated: '20 mins ago' },
    recommended_days: ['Saptami', 'Ashtami', 'Tonight'],
    featured_image: '/pandals/behala-29-pally.jpg',
    images: [{ id: 'b29-1', url: '/pandals/behala-29-pally.jpg', caption: 'Folk art themed pandal interior at Taratala', category: 'official' }, { id: 'b29-2', url: '/pandals/behala-29-pally-2.jpg', caption: 'Illuminated evening decorations', category: 'latest' }, { id: 'b29-3', url: '/pandals/behala-29-pally-3.jpg', caption: 'Artistic installations and community crowds', category: 'community' }],
    latest_images: [
      {
        id: 'b29-insta-1',
        pandal_id: 'behala-29-pally',
        username: 'behala_clicks',
        caption: 'Behala 29 Pally looking majestic tonight! #DurgaPuja #Behala29Pally #Kolkata',
        media_url: '/pandals/behala-29-pally.jpg',
        permalink: 'https://instagram.com',
        timestamp: '2026-10-01T20:00:00Z',
        media_type: 'IMAGE',
        source_type: 'instagram',
        verified_for_2026: true
      }
    ],
    trending_score: 78,
    saves_count: 620,
    is_must_visit: true,
    created_at: '2026-08-01T00:00:00Z',
    updated_at: '2026-09-30T10:00:00Z'
  },
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
  tags: [
    'Popular',
    'Must Visit',
    'Heritage',
    'Near Metro',
    'Night Friendly'
  ],
  puja_committee: 'Hatibagan Sarbojanin Durgotsav Samiti',
  best_time: 'Evening 6:00 PM – 11:30 PM',
  crowd_status: {
    level: 'heavy',
    source: 'Community reported',
    last_updated: '15 mins ago'
  },
  recommended_days: [
    'Saptami',
    'Ashtami',
    'Nabami',
    'Tonight'
  ],
  featured_image: '/pandals/hatibagan-sarbojanin.jpg',
  images: [
    {
      id: 'hs-1',
      url: '/pandals/hatibagan-sarbojanin.jpg',
      caption: 'Illuminated pandal facade at Hatibagan crossing',
      category: 'official'
    }
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
  description: 'Renowned for cutting-edge installation art and monumental conceptual themes that push the architectural boundaries of contemporary Kolkata Durga Puja.',
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
  tags: [
    'Must Visit',
    'Trending',
    'Theme Powerhouse',
    'Artistic Masterpiece'
  ],
  puja_committee: 'Tala Prattay Pujo Committee',
  best_time: 'Late afternoon 4 PM or midnight 1 AM',
  crowd_status: {
    level: 'heavy',
    source: 'Community reported',
    last_updated: '20 mins ago'
  },
  recommended_days: [
    'Shashti',
    'Saptami',
    'Ashtami',
    'Tonight'
  ],
  featured_image: '/pandals/tala-prattay.jpg',
  images: [
    {
      id: 'tp-1',
      url: '/pandals/tala-prattay.jpg',
      caption: 'Monumental conceptual pavilion installation',
      category: 'official'
    }
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
  tags: [
    'Popular',
    'Must Visit',
    'Trending',
    'Theme Pandal'
  ],
  puja_committee: 'Kashi Bose Lane Sarbojanin Durgotsav Samiti',
  best_time: 'Late evening 8 PM – 2 AM',
  crowd_status: {
    level: 'heavy',
    source: 'Community reported',
    last_updated: '18 mins ago'
  },
  recommended_days: [
    'Saptami',
    'Ashtami',
    'Tonight'
  ],
  featured_image: '/pandals/kashi-bose-lane.jpg',
  images: [
    {
      id: 'kbl-1',
      url: '/pandals/kashi-bose-lane.jpg',
      caption: 'Dramatic illuminated entrance and sanctum',
      category: 'official'
    }
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
  tags: [
    'Heritage',
    'Must Visit',
    'Traditional',
    'Idol Makers Hub'
  ],
  puja_committee: 'Kumartuli Sarbojanin Durgotsav Committee',
  best_time: 'Morning 10 AM or Evening 7 PM',
  crowd_status: {
    level: 'heavy',
    source: 'Community reported',
    last_updated: '25 mins ago'
  },
  recommended_days: [
    'Shashti',
    'Saptami',
    'Ashtami',
    'Nabami'
  ],
  featured_image: '/pandals/kumartuli-sarbojanin.jpg',
  images: [
    {
      id: 'ks-1',
      url: '/pandals/kumartuli-sarbojanin.jpg',
      caption: 'Mastercrafted traditional clay Pratima',
      category: 'official'
    }
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
  tags: [
    'Must Visit',
    'Heritage',
    'Popular',
    'River Ghat Corridor'
  ],
  puja_committee: 'Ahiritola Sarbojanin Durgotsav Samiti',
  best_time: 'Evening 6:30 PM – midnight',
  crowd_status: {
    level: 'heavy',
    source: 'Community reported',
    last_updated: '30 mins ago'
  },
  recommended_days: [
    'Saptami',
    'Ashtami',
    'Tonight'
  ],
  featured_image: '/pandals/ahiritola-sarbojanin.jpg',
  images: [
    {
      id: 'as-1',
      url: '/pandals/ahiritola-sarbojanin.jpg',
      caption: 'Elaborate artistic riverside facade',
      category: 'official'
    }
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
  tags: [
    'Must Visit',
    'Trending',
    'Theme Pandal',
    'Award Winner'
  ],
  puja_committee: 'Badamtala Ashar Sangha Club Committee',
  best_time: 'Midnight 12:00 AM – 3:30 AM',
  crowd_status: {
    level: 'heavy',
    source: 'Community reported',
    last_updated: '12 mins ago'
  },
  recommended_days: [
    'Shashti',
    'Saptami',
    'Ashtami',
    'Tonight'
  ],
  featured_image: '/pandals/badamtala-ashar-sangha.jpg',
  images: [
    {
      id: 'bas-1',
      url: '/pandals/badamtala-ashar-sangha.jpg',
      caption: 'Award-winning conceptual architecture',
      category: 'official'
    }
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
  longitude: 88.349,
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
  tags: [
    'Must Visit',
    'Popular',
    'Cultural Landmark',
    'Near Metro'
  ],
  puja_committee: '66 Pally Durgotsav Club',
  best_time: 'Evening 6 PM – 11 PM',
  crowd_status: {
    level: 'heavy',
    source: 'Community reported',
    last_updated: '14 mins ago'
  },
  recommended_days: [
    'Saptami',
    'Ashtami',
    'Nabami',
    'Tonight'
  ],
  featured_image: '/pandals/66-pally.jpg',
  images: [
    {
      id: 'p66-1',
      url: '/pandals/66-pally.jpg',
      caption: 'Vibrant cultural gate and sanctum',
      category: 'official'
    }
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
  tags: [
    'Popular',
    'Heritage',
    'Near Metro'
  ],
  puja_committee: '68 Pally Sarbojanin Committee',
  best_time: 'Afternoon 2 PM or Evening 8 PM',
  crowd_status: {
    level: 'moderate',
    source: 'Community reported',
    last_updated: '22 mins ago'
  },
  recommended_days: [
    'Saptami',
    'Ashtami',
    'Nabami'
  ],
  featured_image: '/pandals/68-pally.jpg',
  images: [
    {
      id: 'p68-1',
      url: '/pandals/68-pally.jpg',
      caption: 'Intricate sabeki idol and sanctum details',
      category: 'official'
    }
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
  tags: [
    'Popular',
    'Must Visit',
    'Monumental',
    'Lighting Spectacle'
  ],
  puja_committee: 'Singhi Park Sarbojanin Durgotsav Samiti',
  best_time: 'Night 9:00 PM – 2:00 AM (for best lighting effects)',
  crowd_status: {
    level: 'heavy',
    source: 'Community reported',
    last_updated: '10 mins ago'
  },
  recommended_days: [
    'Shashti',
    'Saptami',
    'Ashtami',
    'Nabami',
    'Tonight'
  ],
  featured_image: '/pandals/singhi-park.jpg',
  images: [
    {
      id: 'sp-1',
      url: '/pandals/singhi-park.jpg',
      caption: 'Towering temple replica glowing at Dover Lane',
      category: 'official'
    }
  ],
  latest_images: [],
  trending_score: 96,
  saves_count: 1470,
  is_must_visit: true,
  created_at: '2026-08-01T00:00:00Z',
  updated_at: '2026-09-30T10:00:00Z'
}
];
