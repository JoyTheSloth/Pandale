export interface CircuitPandal {
  id: string;
  name: string;
  bengaliName: string;
  nearestStation: string;
  nearestStationLine: string;
  distanceToStation: string;
  walkTimeToStationMins: number;
  distanceToNextPandal?: string;
  walkTimeToNextMins?: number;
  nextPandalName?: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  highlight: string;
  googleMapsDirectionsUrl: string;
}

export interface PujoZoneCircuit {
  id: 'north' | 'central' | 'south';
  name: string;
  shortName: string;
  bengaliName: string;
  tagline: string;
  captionText: string;
  primaryStations: string[];
  totalPandals: number;
  approxCircuitWalkKm: string;
  image: string;
  pandals: CircuitPandal[];
}

export const FAMOUS_PUJO_CIRCUITS: Record<'north' | 'central' | 'south', PujoZoneCircuit> = {
  north: {
    id: 'north',
    name: 'North Zone Circuit',
    shortName: 'North',
    bengaliName: 'উত্তর সার্কিট',
    tagline: 'Sabeki Heritage, Traditional Ekchala Idols & Iconic Ganga Ghats',
    captionText: 'The wait is almost over... ❤️✨ Kolkata Durga Puja is knocking at the door! 🥁🌺',
    primaryStations: ['Shyambazar', 'Shovabazar Sutanuti', 'Girish Park', 'Belgachia', 'Dum Dum'],
    totalPandals: 12,
    approxCircuitWalkKm: '4.8 km total circuit',
    image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=800&q=80',
    pandals: [
      {
        id: 'bagbazar-sarbojanin',
        name: 'Bagbazar Sarbojanin',
        bengaliName: 'বাগবাজার সর্বজনীন',
        nearestStation: 'Shyambazar Metro (Gate 1)',
        nearestStationLine: 'Blue Line',
        distanceToStation: '450m',
        walkTimeToStationMins: 5,
        distanceToNextPandal: '650m (7 mins)',
        nextPandalName: 'Kumartuli Park',
        address: 'Bagbazar Ghat Road, North Kolkata',
        coordinates: { lat: 22.6025, lng: 88.3688 },
        highlight: 'Century-old authentic traditional Ekchala Pratima and grand carnival mela by the Ganges.',
        googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Shyambazar+Metro+Station&destination=Bagbazar+Sarbojanin+Durgotsav&travelmode=walking'
      },
      {
        id: 'kumartuli-park',
        name: 'Kumartuli Park',
        bengaliName: 'কুমারটুলি পার্ক',
        nearestStation: 'Shovabazar Sutanuti Metro',
        nearestStationLine: 'Blue Line',
        distanceToStation: '500m',
        walkTimeToStationMins: 6,
        distanceToNextPandal: '250m (3 mins)',
        nextPandalName: 'Kumartuli Sarbojanin',
        address: 'Near Kumartuli Clay Idol Colony',
        coordinates: { lat: 22.5982, lng: 88.3654 },
        highlight: 'Magnificent architectural theme right in the heart of Kolkata artisan district.',
        googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Shovabazar+Sutanuti+Metro+Station&destination=Kumartuli+Park+Sarbojanin&travelmode=walking'
      },
      {
        id: 'kumartuli-sarbojanin',
        name: 'Kumartuli Sarbojanin',
        bengaliName: 'কুমারটুলি সর্বজনীন',
        nearestStation: 'Shovabazar Sutanuti Metro',
        nearestStationLine: 'Blue Line',
        distanceToStation: '600m',
        walkTimeToStationMins: 7,
        distanceToNextPandal: '450m (5 mins)',
        nextPandalName: 'Ahiritola Sarbojanin',
        address: 'Banamali Sarkar Street, Kumartuli',
        coordinates: { lat: 22.5971, lng: 88.3642 },
        highlight: 'Historic clay artisans club featuring immaculate sculpting aesthetics.',
        googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Shovabazar+Sutanuti+Metro+Station&destination=Kumartuli+Sarbojanin+Durgotsav&travelmode=walking'
      },
      {
        id: 'ahiritola-sarbojanin',
        name: 'Ahiritola Sarbojanin',
        bengaliName: 'আহিরীটোলা সর্বজনীন',
        nearestStation: 'Shovabazar Sutanuti Metro',
        nearestStationLine: 'Blue Line',
        distanceToStation: '700m',
        walkTimeToStationMins: 8,
        distanceToNextPandal: '800m (9 mins)',
        nextPandalName: 'Hatibagan Sarbojanin',
        address: 'Ahiritola Ghat, Strand Road',
        coordinates: { lat: 22.5925, lng: 88.3618 },
        highlight: 'Thought-provoking environmental and social themes with massive installations.',
        googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Shovabazar+Sutanuti+Metro+Station&destination=Ahiritola+Sarbojanin+Durgotsav&travelmode=walking'
      },
      {
        id: 'hatibagan-sarbojanin',
        name: 'Hatibagan Sarbojanin',
        bengaliName: 'হাতিবাগান সর্বজনীন',
        nearestStation: 'Shyambazar Metro (Gate 3)',
        nearestStationLine: 'Blue Line',
        distanceToStation: '350m',
        walkTimeToStationMins: 4,
        distanceToNextPandal: '500m (6 mins)',
        nextPandalName: 'Kashi Bose Lane',
        address: 'Hatibagan Crossing, Bidhan Sarani',
        coordinates: { lat: 22.5985, lng: 88.3712 },
        highlight: 'One of Bengal oldest public pujas set amidst the nostalgic street markets of Hatibagan.',
        googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Shyambazar+Metro+Station&destination=Hatibagan+Sarbojanin&travelmode=walking'
      },
      {
        id: 'kashi-bose-lane',
        name: 'Kashi Bose Lane',
        bengaliName: 'কাশী বোস লেন',
        nearestStation: 'Girish Park / Shyambazar Metro',
        nearestStationLine: 'Blue Line',
        distanceToStation: '650m',
        walkTimeToStationMins: 8,
        distanceToNextPandal: '450m (5 mins)',
        nextPandalName: 'Chaltabagan Lohapatty',
        address: 'Kashi Bose Lane, Manicktala',
        coordinates: { lat: 22.5901, lng: 88.3735 },
        highlight: 'Renowned for emotional, humanitarian artistic concept installations with delicate lighting.',
        googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Girish+Park+Metro+Station&destination=Kashi+Bose+Lane+Durga+Puja&travelmode=walking'
      },
      {
        id: 'chaltabagan-lohapatty',
        name: 'Chaltabagan Lohapatty',
        bengaliName: 'চালতাবাগান লোহাপট্টি',
        nearestStation: 'Girish Park / MG Road Metro',
        nearestStationLine: 'Blue Line',
        distanceToStation: '750m',
        walkTimeToStationMins: 9,
        distanceToNextPandal: '200m (2 mins)',
        nextPandalName: 'Maniktala Chaltabagan',
        address: 'Lohapatty, Raja Rammohan Sarani',
        coordinates: { lat: 22.5878, lng: 88.3742 },
        highlight: 'High energy dhak competitions, famous Sindur Khela, and grand brass bells decor.',
        googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Girish+Park+Metro+Station&destination=Chaltabagan+Lohapatty+Durga+Puja&travelmode=walking'
      },
      {
        id: 'maniktala-chaltabagan',
        name: 'Maniktala Chaltabagan',
        bengaliName: 'মানিকতলা চালতাবাগান',
        nearestStation: 'Girish Park Metro',
        nearestStationLine: 'Blue Line',
        distanceToStation: '800m',
        walkTimeToStationMins: 10,
        distanceToNextPandal: '1.2 km (14 mins)',
        nextPandalName: 'Tala Prattay',
        address: 'Maniktala Main Road',
        coordinates: { lat: 22.5869, lng: 88.3755 },
        highlight: 'Spectacular glass and crystal chandelier installations attracting dignitaries.',
        googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Girish+Park+Metro+Station&destination=Maniktala+Chaltabagan+Durga+Puja&travelmode=walking'
      },
      {
        id: 'tala-prattay',
        name: 'Tala Prattay',
        bengaliName: 'টালা প্রত্যয়',
        nearestStation: 'Belgachia / Shyambazar Metro',
        nearestStationLine: 'Blue Line',
        distanceToStation: '700m',
        walkTimeToStationMins: 8,
        distanceToNextPandal: '1.5 km (Auto 5 mins)',
        nextPandalName: 'Lalabagan Nabankur',
        address: 'Tala Park, North Kolkata',
        coordinates: { lat: 22.6072, lng: 88.3758 },
        highlight: 'Modern avant-garde fine art installations transforming the entire park into an open museum.',
        googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Belgachia+Metro+Station&destination=Tala+Prattay+Durga+Puja&travelmode=walking'
      },
      {
        id: 'lalabagan-nabankur',
        name: 'Lalabagan Nabankur',
        bengaliName: 'লালাবাগান নবাঙ্কুর',
        nearestStation: 'Belgachia Metro',
        nearestStationLine: 'Blue Line',
        distanceToStation: '850m',
        walkTimeToStationMins: 10,
        distanceToNextPandal: '2.1 km (Auto 7 mins)',
        nextPandalName: 'Dum Dum Park',
        address: 'Raja Manindra Road, Lalabagan',
        coordinates: { lat: 22.6095, lng: 88.3842 },
        highlight: 'Ecological and living greenery pandal themes with organic indigenous materials.',
        googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Belgachia+Metro+Station&destination=Lalabagan+Nabankur+Durga+Puja&travelmode=walking'
      },
      {
        id: 'dum-dum-park',
        name: 'Dum Dum Park',
        bengaliName: 'দমদম পার্ক',
        nearestStation: 'Dum Dum Metro',
        nearestStationLine: 'Blue Line',
        distanceToStation: '1.6 km (Auto 5 mins)',
        walkTimeToStationMins: 18,
        distanceToNextPandal: '1.4 km (Auto 5 mins)',
        nextPandalName: 'Sreebhumi Sporting Club',
        address: 'Dum Dum Park, VIP Road Connector',
        coordinates: { lat: 22.6062, lng: 88.4078 },
        highlight: 'Famous for Bharat Chakra & Tarun Sangha artistically sculpted pandals.',
        googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Dum+Dum+Metro+Station&destination=Dum+Dum+Park+Tarun+Sangha&travelmode=walking'
      },
      {
        id: 'sreebhumi-sporting-club',
        name: 'Sreebhumi Sporting Club',
        bengaliName: 'শ্রীভূমি স্পোর্টিং ক্লাব',
        nearestStation: 'Belgachia / Dum Dum Metro',
        nearestStationLine: 'Blue Line',
        distanceToStation: '1.4 km (Auto 4 mins)',
        walkTimeToStationMins: 15,
        address: 'Lake Town, VIP Road',
        coordinates: { lat: 22.5976, lng: 88.3978 },
        highlight: 'Towering monumental palace architecture with dazzling chandeliers and pure gold jewelry.',
        googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Belgachia+Metro+Station&destination=Sree+Bhumi+Sporting+Club&travelmode=walking'
      }
    ]
  },
  central: {
    id: 'central',
    name: 'Central Zone Circuit',
    shortName: 'Central',
    bengaliName: 'মধ্য সার্কিট',
    tagline: 'Lakeside Light Recreations, Collegiate Heritage & Historic Squares',
    captionText: 'The wait is almost over... ❤️✨ Kolkata Durga Puja is knocking at the door! 🥁🌺',
    primaryStations: ['Central', 'MG Road', 'Chandni Chowk', 'Sealdah'],
    totalPandals: 7,
    approxCircuitWalkKm: '3.2 km total circuit',
    image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80',
    pandals: [
      {
        id: 'santosh-mitra-square',
        name: 'Santosh Mitra Square',
        bengaliName: 'সন্তোষ মিত্র স্কোয়ার',
        nearestStation: 'Central Metro (Gate 4) / Sealdah',
        nearestStationLine: 'Blue & Green Line',
        distanceToStation: '550m',
        walkTimeToStationMins: 7,
        distanceToNextPandal: '650m (8 mins)',
        nextPandalName: 'College Square',
        address: 'Lebutala, Bowbazar, Central Kolkata',
        coordinates: { lat: 22.5695, lng: 88.3688 },
        highlight: 'Breathtaking monumental illumination displays and worldwide architectural wonders.',
        googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Central+Metro+Station&destination=Santosh+Mitra+Square+Durga+Puja&travelmode=walking'
      },
      {
        id: 'college-square',
        name: 'College Square',
        bengaliName: 'কলেজ স্কোয়ার',
        nearestStation: 'Central / Mahatma Gandhi Road Metro',
        nearestStationLine: 'Blue Line',
        distanceToStation: '450m',
        walkTimeToStationMins: 5,
        distanceToNextPandal: '400m (5 mins)',
        nextPandalName: 'Mohammad Ali Park',
        address: 'College Street (Boipara), Central Kolkata',
        coordinates: { lat: 22.5746, lng: 88.3639 },
        highlight: 'Shimmering Chandannagar lighting reflected across the heritage swimming pool lake.',
        googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Central+Metro+Station&destination=College+Square+Durga+Puja&travelmode=walking'
      },
      {
        id: 'mohammad-ali-park',
        name: 'Mohammad Ali Park',
        bengaliName: 'মহম্মদ আলী পার্ক',
        nearestStation: 'Mahatma Gandhi Road Metro',
        nearestStationLine: 'Blue Line',
        distanceToStation: '300m',
        walkTimeToStationMins: 4,
        distanceToNextPandal: '200m (2 mins)',
        nextPandalName: 'Md. Ali Park (Water Tank)',
        address: 'Central Avenue, Near MG Road Crossing',
        coordinates: { lat: 22.5802, lng: 88.3621 },
        highlight: 'Elaborate replicas of ancient Indian fortresses and monumental heritage monuments.',
        googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Mahatma+Gandhi+Road+Metro+Station&destination=Mohammad+Ali+Park+Durga+Puja&travelmode=walking'
      },
      {
        id: 'md-ali-park',
        name: 'Md. Ali Park (Heritage Square)',
        bengaliName: 'এমডি আলী পার্ক',
        nearestStation: 'Mahatma Gandhi Road Metro',
        nearestStationLine: 'Blue Line',
        distanceToStation: '350m',
        walkTimeToStationMins: 4,
        distanceToNextPandal: '600m (7 mins)',
        nextPandalName: 'Chorebagan Sarbojanin',
        address: 'Chittaranjan Avenue, College Street area',
        coordinates: { lat: 22.5795, lng: 88.3615 },
        highlight: 'Grand illuminated arches spanning Central Avenue attracting millions of visitors.',
        googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Mahatma+Gandhi+Road+Metro+Station&destination=Mohammad+Ali+Park+Kolkata&travelmode=walking'
      },
      {
        id: 'chorebagan-sarbojanin',
        name: 'Chorebagan Sarbojanin',
        bengaliName: 'চোরবাগান সর্বজনীন',
        nearestStation: 'Girish Park / MG Road Metro',
        nearestStationLine: 'Blue Line',
        distanceToStation: '500m',
        walkTimeToStationMins: 6,
        distanceToNextPandal: '850m (10 mins)',
        nextPandalName: 'Taltala Sarbojanin',
        address: 'Muktaram Babu Street, Central Kolkata',
        coordinates: { lat: 22.5838, lng: 88.3648 },
        highlight: 'Intimate artisanal handicraft pandal blending rural Bengal folklore and contemporary craft.',
        googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Girish+Park+Metro+Station&destination=Chorebagan+Sarbojanin+Durgotsav&travelmode=walking'
      },
      {
        id: 'taltala-sarbojanin',
        name: 'Taltala Sarbojanin',
        bengaliName: 'তালতলা সর্বজনীন',
        nearestStation: 'Chandni Chowk / Central Metro',
        nearestStationLine: 'Blue Line',
        distanceToStation: '650m',
        walkTimeToStationMins: 8,
        distanceToNextPandal: '700m (8 mins)',
        nextPandalName: 'Sealdah / Baithakkhana Area Pujas',
        address: 'Taltala, Surendranath Banerjee Road',
        coordinates: { lat: 22.5632, lng: 88.3592 },
        highlight: 'Rich cultural legacy with deep community involvement and classic craftsmanship.',
        googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Chandni+Chowk+Metro+Station&destination=Taltala+Sarbojanin+Durga+Puja&travelmode=walking'
      },
      {
        id: 'sealdah-baithakkhana',
        name: 'Sealdah / Baithakkhana Area Pujas',
        bengaliName: 'শিয়ালদহ / বৈঠকখানা পুজো',
        nearestStation: 'Sealdah Metro (Green Line)',
        nearestStationLine: 'Green Line',
        distanceToStation: '250m',
        walkTimeToStationMins: 3,
        address: 'Near Sealdah Railway Station, BB Ganguly St',
        coordinates: { lat: 22.5684, lng: 88.3712 },
        highlight: 'Directly at the East-West metro terminus, convenient access to Baithakkhana heritage.',
        googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Sealdah+Metro+Station&destination=Sealdah+Athletic+Club+Durga+Puja&travelmode=walking'
      }
    ]
  },
  south: {
    id: 'south',
    name: 'South Zone Circuit',
    shortName: 'South',
    bengaliName: 'দক্ষিণ সার্কিট',
    tagline: 'Global Theme Powerhouses, Master Sculptors & Vibrant All-Night Adda',
    captionText: 'The wait is almost over... ❤️✨ Kolkata Durga Puja is knocking at the door! 🥁🌺',
    primaryStations: ['Kalighat', 'Jatin Das Park', 'Netaji Bhavan', 'Rabindra Sarobar', 'Gitanjali'],
    totalPandals: 15,
    approxCircuitWalkKm: '6.2 km total circuit',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80',
    pandals: [
      {
        id: 'badamtala-ashar-sangha',
        name: 'Badamtala Ashar Sangha',
        bengaliName: 'বাদামতলা আষাঢ় সংঘ',
        nearestStation: 'Kalighat Metro (Rashbehari Gate)',
        nearestStationLine: 'Blue Line',
        distanceToStation: '250m',
        walkTimeToStationMins: 3,
        distanceToNextPandal: '100m (1 min)',
        nextPandalName: '66 Pally',
        address: 'Nepal Bhattacharjee Street, Kalighat',
        coordinates: { lat: 22.5228, lng: 88.3475 },
        highlight: 'Award-winning conceptual designs that revolutionized modern theme pujas in Kolkata.',
        googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Kalighat+Metro+Station&destination=Badamtala+Ashar+Sangha&travelmode=walking'
      },
      {
        id: '66-pally',
        name: '66 Pally',
        bengaliName: '৬৬ পল্লী',
        nearestStation: 'Kalighat Metro',
        nearestStationLine: 'Blue Line',
        distanceToStation: '280m',
        walkTimeToStationMins: 3,
        distanceToNextPandal: '150m (2 mins)',
        nextPandalName: '68 Pally',
        address: 'Near Rashbehari Crossing, Kalighat',
        coordinates: { lat: 22.5232, lng: 88.3468 },
        highlight: 'Famed for appointing Bengal first women priestesses and progressive artistic installations.',
        googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Kalighat+Metro+Station&destination=66+Pally+Durga+Puja&travelmode=walking'
      },
      {
        id: '68-pally',
        name: '68 Pally',
        bengaliName: '৬৮ পল্লী',
        nearestStation: 'Kalighat Metro',
        nearestStationLine: 'Blue Line',
        distanceToStation: '320m',
        walkTimeToStationMins: 4,
        distanceToNextPandal: '350m (4 mins)',
        nextPandalName: 'Mudiali Club',
        address: 'Near Southern Avenue & Kalighat',
        coordinates: { lat: 22.5218, lng: 88.3482 },
        highlight: 'Intricately handcrafted pandal with traditional rural folk art and brass bells.',
        googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Kalighat+Metro+Station&destination=68+Pally+Durga+Puja&travelmode=walking'
      },
      {
        id: 'mudiali-club',
        name: 'Mudiali Club',
        bengaliName: 'মুদিয়ালী ক্লাব',
        nearestStation: 'Rabindra Sarobar / Kalighat Metro',
        nearestStationLine: 'Blue Line',
        distanceToStation: '450m',
        walkTimeToStationMins: 5,
        distanceToNextPandal: '400m (5 mins)',
        nextPandalName: 'Chetla Agrani',
        address: 'Mudiali, Rajani Sen Road',
        coordinates: { lat: 22.5186, lng: 88.3498 },
        highlight: 'Mastery of classical symmetry, stunning color gradients, and sublime Devi idol.',
        googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Rabindra+Sarobar+Metro+Station&destination=Mudiali+Club&travelmode=walking'
      },
      {
        id: 'chetla-agrani',
        name: 'Chetla Agrani',
        bengaliName: 'চেতলা অগ্রণী',
        nearestStation: 'Kalighat / Jatin Das Park Metro',
        nearestStationLine: 'Blue Line',
        distanceToStation: '650m',
        walkTimeToStationMins: 8,
        distanceToNextPandal: '650m (8 mins)',
        nextPandalName: 'Alipore Sarbojanin',
        address: 'Chetla, South Kolkata',
        coordinates: { lat: 22.5235, lng: 88.3378 },
        highlight: 'Curated by eminent contemporary artists with monumental sculpted installations.',
        googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Kalighat+Metro+Station&destination=Chetla+Agrani+Club&travelmode=walking'
      },
      {
        id: 'alipore-sarbojanin',
        name: 'Alipore Sarbojanin',
        bengaliName: 'আলিপুর সর্বজনীন',
        nearestStation: 'Netaji Bhavan Metro',
        nearestStationLine: 'Blue Line',
        distanceToStation: '950m',
        walkTimeToStationMins: 11,
        distanceToNextPandal: '850m (10 mins)',
        nextPandalName: 'Suruchi Sangha',
        address: 'Alipore Road, Near National Library',
        coordinates: { lat: 22.5295, lng: 88.3342 },
        highlight: 'Elegant green garden surroundings with refined aristocratic artistic installations.',
        googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Netaji+Bhavan+Metro+Station&destination=Alipore+Sarbojanin+Durga+Puja&travelmode=walking'
      },
      {
        id: 'suruchi-sangha',
        name: 'Suruchi Sangha',
        bengaliName: 'সুরুচি সংঘ',
        nearestStation: 'Majerhat / Taratala / Kalighat Metro',
        nearestStationLine: 'Purple & Blue Line',
        distanceToStation: '1.1 km',
        walkTimeToStationMins: 13,
        distanceToNextPandal: '1.2 km (14 mins)',
        nextPandalName: 'Tridhara Sammilani',
        address: 'New Alipore, South Kolkata',
        coordinates: { lat: 22.5152, lng: 88.3325 },
        highlight: 'State-themed cultural pavilions celebrating the diverse folklore and crafts of India.',
        googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Kalighat+Metro+Station&destination=Suruchi+Sangha&travelmode=walking'
      },
      {
        id: 'tridhara-sammilani',
        name: 'Tridhara Sammilani',
        bengaliName: 'ত্রিধারা সম্মিলনী',
        nearestStation: 'Kalighat / Jatin Das Park Metro',
        nearestStationLine: 'Blue Line',
        distanceToStation: '450m',
        walkTimeToStationMins: 5,
        distanceToNextPandal: '300m (4 mins)',
        nextPandalName: 'Deshapriya Park',
        address: 'Manojit Dutta Sarani, Dover Terrace',
        coordinates: { lat: 22.5195, lng: 88.3572 },
        highlight: 'Striking conceptual art installations that blend folk materials with modern social themes.',
        googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Kalighat+Metro+Station&destination=Tridhara+Sammilani&travelmode=walking'
      },
      {
        id: 'deshapriya-park',
        name: 'Deshapriya Park',
        bengaliName: 'দেশপ্রিয় পার্ক',
        nearestStation: 'Kalighat Metro',
        nearestStationLine: 'Blue Line',
        distanceToStation: '550m',
        walkTimeToStationMins: 6,
        distanceToNextPandal: '450m (5 mins)',
        nextPandalName: 'Singhi Park',
        address: 'Rashbehari Avenue, South Kolkata',
        coordinates: { lat: 22.5182, lng: 88.3588 },
        highlight: 'Massive open park ground featuring record-breaking large scale installations.',
        googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Kalighat+Metro+Station&destination=Deshapriya+Park&travelmode=walking'
      },
      {
        id: 'singhi-park',
        name: 'Singhi Park',
        bengaliName: 'সিংঘী পার্ক',
        nearestStation: 'Kalighat / Gariahat',
        nearestStationLine: 'Blue Line',
        distanceToStation: '850m',
        walkTimeToStationMins: 10,
        distanceToNextPandal: '250m (3 mins)',
        nextPandalName: 'Ekdalia Evergreen',
        address: 'Dover Lane, Gariahat',
        coordinates: { lat: 22.5188, lng: 88.3645 },
        highlight: 'Recreation of historic Indian temples with magnificent Chandannagar lighting gates.',
        googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Kalighat+Metro+Station&destination=Singhi+Park+Durga+Puja&travelmode=walking'
      },
      {
        id: 'ekdalia-evergreen',
        name: 'Ekdalia Evergreen',
        bengaliName: 'একডালিয়া এভারগ্রীন',
        nearestStation: 'Kalighat Metro / Gariahat',
        nearestStationLine: 'Blue Line',
        distanceToStation: '950m',
        walkTimeToStationMins: 11,
        distanceToNextPandal: '350m (4 mins)',
        nextPandalName: 'Ballygunge Cultural',
        address: 'Gariahat, South Kolkata',
        coordinates: { lat: 22.5175, lng: 88.3662 },
        highlight: 'Grand classical Indian temple replicas with colossal imported German chandeliers.',
        googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Kalighat+Metro+Station&destination=Ekdalia+Evergreen+Club&travelmode=walking'
      },
      {
        id: 'ballygunge-cultural',
        name: 'Ballygunge Cultural',
        bengaliName: 'বালিগঞ্জ কালচারাল',
        nearestStation: 'Jatin Das Park / Kalighat Metro',
        nearestStationLine: 'Blue Line',
        distanceToStation: '800m',
        walkTimeToStationMins: 9,
        distanceToNextPandal: '700m (8 mins)',
        nextPandalName: 'Maddox Square',
        address: 'Lake Temple Road, Ballygunge',
        coordinates: { lat: 22.5158, lng: 88.3548 },
        highlight: 'Rich aristocratic cultural programs, intellectual aesthetic, and traditional Pratima.',
        googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Jatin+Das+Park+Metro+Station&destination=Ballygunge+Cultural+Association&travelmode=walking'
      },
      {
        id: 'maddox-square',
        name: 'Maddox Square',
        bengaliName: 'ম্যাডক্স স্কোয়ার',
        nearestStation: 'Netaji Bhavan / Jatin Das Park Metro',
        nearestStationLine: 'Blue Line',
        distanceToStation: '650m',
        walkTimeToStationMins: 8,
        distanceToNextPandal: '1.4 km (Auto 5 mins)',
        nextPandalName: 'Bosepukur Sitala Mandir',
        address: 'Ritchie Road, Ballygunge',
        coordinates: { lat: 22.5312, lng: 88.3582 },
        highlight: 'The ultimate Kolkata open park adda hub with classical Rajbari style Pratima.',
        googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Netaji+Bhavan+Metro+Station&destination=Maddox+Square&travelmode=walking'
      },
      {
        id: 'bosepukur-sitala-mandir',
        name: 'Bosepukur Sitala Mandir',
        bengaliName: 'বোসপুকুর শীতলা মন্দির',
        nearestStation: 'Kalighat / Rabindra Sarobar Metro',
        nearestStationLine: 'Blue Line',
        distanceToStation: '1.7 km (Auto 6 mins)',
        walkTimeToStationMins: 20,
        distanceToNextPandal: '3.5 km (Metro to Gitanjali)',
        nextPandalName: 'Naktala Udayan Sangha',
        address: 'Bosepukur, Kasba',
        coordinates: { lat: 22.5168, lng: 88.3885 },
        highlight: 'Pioneers of indigenous material themes using clay pots, tea cups, and copper coins.',
        googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Kalighat+Metro+Station&destination=Bosepukur+Sitala+Mandir&travelmode=walking'
      },
      {
        id: 'naktala-udayan-sangha',
        name: 'Naktala Udayan Sangha',
        bengaliName: 'নাকতলা উদয়ন সংঘ',
        nearestStation: 'Gitanjali (Naktala) Metro',
        nearestStationLine: 'Blue Line',
        distanceToStation: '400m',
        walkTimeToStationMins: 5,
        address: 'Naktala, Near NSC Bose Road',
        coordinates: { lat: 22.4722, lng: 88.3638 },
        highlight: 'Massive experimental conceptual theme installations that define South Kolkata festive circuit.',
        googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Gitanjali+Metro+Station&destination=Naktala+Udayan+Sangha&travelmode=walking'
      }
    ]
  }
};
