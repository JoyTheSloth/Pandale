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
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=22.5976,88.3978&query_place_id=Sree+Bhumi+Sporting+Club+Kolkata',
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
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Belgachia+Metro+Station&destination=22.5976,88.3978'
      },
      {
        station_id: 'dum-dum',
        station_name: 'Dum Dum',
        line: 'Blue Line (North-South)',
        line_code: 'blue',
        walking_distance: '2.1 km',
        walking_time_mins: 22,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Dum+Dum+Metro+Station&destination=22.5976,88.3978'
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
    featured_image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
    images: [
      {
        id: 'sb-1',
        url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
        caption: 'Towering facade illuminated under the midnight Kolkata sky',
        category: 'official',
        author: 'Kolkata Pujo Archives',
        author_url: 'https://instagram.com/kolkatapujoguide'
      },
      {
        id: 'sb-2',
        url: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80',
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
        media_url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
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
        media_url: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80',
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
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=22.6025,88.3662&query_place_id=Bagbazar+Sarbojanin+Durgotsav',
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
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Shyambazar+Metro+Station&destination=22.6025,88.3662'
      },
      {
        station_id: 'shovabazar',
        station_name: 'Shovabazar Sutanuti',
        line: 'Blue Line (North-South)',
        line_code: 'blue',
        walking_distance: '950m',
        walking_time_mins: 12,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Shovabazar+Sutanuti+Metro+Station&destination=22.6025,88.3662'
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
    featured_image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=1200&q=80',
    images: [
      {
        id: 'bg-1',
        url: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=1200&q=80',
        caption: 'The divine Ekchala idol with Daaker Saaj at Bagbazar',
        category: 'official',
        author: 'Heritage Bengal Team'
      },
      {
        id: 'bg-2',
        url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
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
        media_url: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=800&q=80',
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
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=22.5991,88.3639&query_place_id=Kumartuli+Park+Durga+Puja',
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
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Shovabazar+Sutanuti+Metro+Station&destination=22.5991,88.3639'
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
    featured_image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    images: [
      {
        id: 'kp-1',
        url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
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
        media_url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
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
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=22.5312,88.3571&query_place_id=Maddox+Square+Kolkata',
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
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Netaji+Bhavan+Metro+Station&destination=22.5312,88.3571'
      },
      {
        station_id: 'jatin-das-park',
        station_name: 'Jatin Das Park',
        line: 'Blue Line (North-South)',
        line_code: 'blue',
        walking_distance: '900m',
        walking_time_mins: 11,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Jatin+Das+Park+Metro+Station&destination=22.5312,88.3571'
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
    featured_image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80',
    images: [
      {
        id: 'ms-1',
        url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80',
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
        media_url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80',
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
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=22.5744,88.3639&query_place_id=College+Square+Sarbojanin+Durgotsav',
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
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Central+Metro+Station&destination=22.5744,88.3639'
      },
      {
        station_id: 'mg-road',
        station_name: 'Mahatma Gandhi Road',
        line: 'Blue Line (North-South)',
        line_code: 'blue',
        walking_distance: '650m',
        walking_time_mins: 8,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Mahatma+Gandhi+Road+Metro+Station&destination=22.5744,88.3639'
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
    featured_image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80',
    images: [
      {
        id: 'cs-1',
        url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80',
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
        media_url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80',
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
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=22.5097,88.3283&query_place_id=Suruchi+Sangha+New+Alipore',
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
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Kalighat+Metro+Station&destination=22.5097,88.3283'
      },
      {
        station_id: 'taratala',
        station_name: 'Taratala',
        line: 'Purple Line (Joka-Esplanade)',
        line_code: 'purple',
        walking_distance: '1.2 km',
        walking_time_mins: 14,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Taratala+Metro+Station&destination=22.5097,88.3283'
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
    featured_image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    images: [
      {
        id: 'ss-1',
        url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
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
        media_url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
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
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=22.5186,88.3542&query_place_id=Deshapriya+Park+Durga+Puja',
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
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Kalighat+Metro+Station&destination=22.5186,88.3542'
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
    featured_image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
    images: [
      {
        id: 'dp-1',
        url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
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
        media_url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
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
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=22.5205,88.3582&query_place_id=Tridhara+Sammilani+Durga+Puja',
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
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Kalighat+Metro+Station&destination=22.5205,88.3582'
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
    featured_image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80',
    images: [
      {
        id: 'ts-1',
        url: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80',
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
        media_url: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80',
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
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=22.5121,88.3512&query_place_id=Mudiali+Club+Durga+Puja',
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
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Rabindra+Sarobar+Metro+Station&destination=22.5121,88.3512'
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
    featured_image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=1200&q=80',
    images: [
      {
        id: 'mc-1',
        url: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=1200&q=80',
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
        media_url: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=800&q=80',
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
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=22.5198,88.3687&query_place_id=Ekdalia+Evergreen+Club+Durga+Puja',
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
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Kalighat+Metro+Station&destination=22.5198,88.3687'
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
    featured_image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    images: [
      {
        id: 'ee-1',
        url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
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
        media_url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
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
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=22.5786,88.4112&query_place_id=FD+Block+Durga+Puja+Salt+Lake',
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
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Karunamoyee+Metro+Station&destination=22.5786,88.4112'
      },
      {
        station_id: 'central-park',
        station_name: 'Central Park',
        line: 'Green Line (East-West)',
        line_code: 'green',
        walking_distance: '900m',
        walking_time_mins: 11,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Central+Park+Metro+Station&destination=22.5786,88.4112'
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
    featured_image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
    images: [
      {
        id: 'fd-1',
        url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
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
        media_url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
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
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=22.5165,88.3375&query_place_id=Chetla+Agrani+Club+Durga+Puja',
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
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Kalighat+Metro+Station&destination=22.5165,88.3375'
      },
      {
        station_id: 'netaji-bhavan',
        station_name: 'Netaji Bhavan',
        line: 'Blue Line (North-South)',
        line_code: 'blue',
        walking_distance: '1.2 km',
        walking_time_mins: 14,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Netaji+Bhavan+Metro+Station&destination=22.5165,88.3375'
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
    featured_image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80',
    images: [
      {
        id: 'ca-1',
        url: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80',
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
        media_url: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80',
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
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=22.5691,88.3698&query_place_id=Santosh+Mitra+Square+Durga+Puja',
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
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Sealdah+Metro+Station&destination=22.5691,88.3698'
      },
      {
        station_id: 'central',
        station_name: 'Central',
        line: 'Blue Line (North-South)',
        line_code: 'blue',
        walking_distance: '850m',
        walking_time_mins: 10,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Central+Metro+Station&destination=22.5691,88.3698'
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
    featured_image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80',
    images: [
      {
        id: 'sms-1',
        url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80',
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
        media_url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80',
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
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=22.4975,88.3182&query_place_id=Behala+Natun+Dal+Durga+Puja',
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
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Behala+Chowrasta+Metro+Station&destination=22.4975,88.3182'
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
    featured_image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    images: [
      {
        id: 'bnd-1',
        url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
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
        media_url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
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
  }
];
