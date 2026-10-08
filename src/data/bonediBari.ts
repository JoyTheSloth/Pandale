import { Pandal } from '@/types';
import { CircuitPandal } from './famousPujoCircuits';

export interface BonediBariItem {
  id: string;
  name: string;
  bengaliName: string;
  location: string;
  area: 'North Kolkata' | 'Central Kolkata' | 'South Kolkata';
  heritageSince: string;
  significance: string;
  uniqueFeature: string;
  didYouKnow: string;
  lookOutFor: string[];
  nearestStation: string;
  nearestStationLine: string;
  distanceToStation: string;
  walkTimeToStationMins: number;
  googleMapsDirectionsUrl: string;
  googleMapsSearchUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  image: string;
  slug: string;
}

export const BONEDI_BARI_PUJAS: BonediBariItem[] = [
  {
    id: 'sovabazar-rajbari',
    slug: 'sovabazar-rajbari',
    name: 'Sovabazar Rajbari',
    bengaliName: 'শোভাবাজার রাজবাড়ি',
    location: 'Sovabazar, North Kolkata',
    area: 'North Kolkata',
    heritageSince: '1757',
    significance: "One of Kolkata's most historically significant and oldest Bonedi Bari Pujas.",
    uniqueFeature: "Raja Nabakrishna Deb's 1757 Puja became one of colonial Calcutta's grandest social celebrations.",
    didYouKnow: 'Two Nilkantha (Indian roller) birds were once released during immersion to symbolically carry the news of Durga’s return to Shiva; this live-bird ritual was later discontinued.',
    lookOutFor: [
      'The majestic Rajbari courtyard and colonnades',
      'The traditional ekchala idol composition',
      'The historic Nat Mandap / Thakur Dalan'
    ],
    nearestStation: 'Sovabazar Sutanuti Metro',
    nearestStationLine: 'Blue Line',
    distanceToStation: '400m',
    walkTimeToStationMins: 5,
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Sovabazar+Sutanuti+Metro+Station&destination=Sovabazar+Rajbari+Durga+Puja+Kolkata&travelmode=walking',
    googleMapsSearchUrl: 'https://www.google.com/maps/search/?api=1&query=Sovabazar+Rajbari+Durga+Puja+Kolkata',
    coordinates: { lat: 22.5981, lng: 88.3638 },
    image: '/pandals/sovabazar-rajbari.jpg'
  },
  {
    id: 'shib-krishna-daw-bari',
    slug: 'shib-krishna-daw-bari',
    name: 'Shib Krishna Daw Bari',
    bengaliName: 'শিবকৃষ্ণ দাঁ বাড়ি',
    location: 'Jorasanko, North Kolkata',
    area: 'North Kolkata',
    heritageSince: '1840',
    significance: 'A historic family Puja known for its breathtaking grandeur and royal ornamentation.',
    uniqueFeature: 'Famed for dressing Goddess Durga in extraordinarily lavish jewellery. Shib Krishna Daw reportedly imported precious ornaments from Paris and Germany.',
    didYouKnow: 'An old Kolkata saying claims that Durga comes to this house specifically to dress and adorn herself.',
    lookOutFor: [
      "The Goddess's elaborate jewellery and ornamentation",
      'The traditional decorated Nabapatrika umbrella',
      'The distinctive white lion, associated with the family Vaishnav tradition'
    ],
    nearestStation: 'Girish Park Metro',
    nearestStationLine: 'Blue Line',
    distanceToStation: '450m',
    walkTimeToStationMins: 6,
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Girish+Park+Metro+Station&destination=Shib+Krishna+Daw+Bari+Durga+Puja+Kolkata&travelmode=walking',
    googleMapsSearchUrl: 'https://www.google.com/maps/search/?api=1&query=Shib+Krishna+Daw+Bari+Durga+Puja+Kolkata',
    coordinates: { lat: 22.5857, lng: 88.3582 },
    image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pathuriaghata-khelat-ghosh-bari',
    slug: 'pathuriaghata-khelat-ghosh-bari',
    name: 'Pathuriaghata Khelat Ghosh Bari',
    bengaliName: 'পাথুরিয়াঘাটা খেলাত ঘোষ বাড়ি',
    location: 'Pathuriaghata, North Kolkata',
    area: 'North Kolkata',
    heritageSince: '1846 (at the Pathuriaghata palace)',
    significance: 'A historic aristocratic family Puja celebrated for its regal architecture and deep cultural roots.',
    uniqueFeature: "The deity's ritual bath incorporates water representing 13 rivers and the juices of 12 fruits.",
    didYouKnow: 'On Ashtami, the family observes Mata Chini, a symbolic sacrifice using structures sculpted from sugar.',
    lookOutFor: [
      'The spectacular 85-foot marble Thakur Dalan',
      'Distinctive blue-and-white ceramic elephants',
      'Extensive silver ritual objects and ornamentation'
    ],
    nearestStation: 'Sovabazar Sutanuti / Girish Park Metro',
    nearestStationLine: 'Blue Line',
    distanceToStation: '650m',
    walkTimeToStationMins: 8,
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Girish+Park+Metro+Station&destination=Khelat+Ghosh+Bari+Pathuriaghata+Kolkata&travelmode=walking',
    googleMapsSearchUrl: 'https://www.google.com/maps/search/?api=1&query=Khelat+Ghosh+Bari+Pathuriaghata+Kolkata',
    coordinates: { lat: 22.5898, lng: 88.3562 },
    image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'darjipara-mitra-bari',
    slug: 'darjipara-mitra-bari',
    name: 'Darjipara Mitra Bari',
    bengaliName: 'দর্জিreader মিত্র বাড়ি',
    location: 'Darjipara, North Kolkata',
    area: 'North Kolkata',
    heritageSince: 'Early 19th century',
    significance: 'A historic aristocratic family Puja with centuries of unbroken unique traditions.',
    uniqueFeature: 'During Sandhi Puja, 108 Aparajita (butterfly pea) flowers are offered instead of the customary lotuses.',
    didYouKnow: 'Even today, the idol is traditionally carried for immersion on the shoulders of the men of the family, rather than using a vehicle.',
    lookOutFor: [
      'The unusual horse-faced lion (Hayagriva lion)',
      'The grand antique throne',
      "Kartik and Asura's distinctive human-like facial features"
    ],
    nearestStation: 'Sovabazar Sutanuti / Girish Park Metro',
    nearestStationLine: 'Blue Line',
    distanceToStation: '600m',
    walkTimeToStationMins: 7,
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Sovabazar+Sutanuti+Metro+Station&destination=Darjipara+Mitra+Bari+Durga+Puja+Kolkata&travelmode=walking',
    googleMapsSearchUrl: 'https://www.google.com/maps/search/?api=1&query=Darjipara+Mitra+Bari+Durga+Puja+Kolkata',
    coordinates: { lat: 22.5912, lng: 88.3661 },
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'chhatu-babu-latu-babu-bari',
    slug: 'chhatu-babu-latu-babu-bari',
    name: 'Chhatu Babu Latu Babu Bari',
    bengaliName: 'ছাতুবাবু লাটুবাবু বাড়ি',
    location: 'Beadon Street, North Kolkata',
    area: 'North Kolkata',
    heritageSince: '1770',
    significance: 'One of the pioneering family Pujas of North Kolkata with deep cultural roots founded by Ramdulal De.',
    uniqueFeature: "The family's traditional idol arrangement features companions Jaya and Vijaya, giving the tableau a distinctive identity.",
    didYouKnow: 'Puja meals here are traditionally prepared without salt, while Goddess Durga receives a simple offering of luchi and three vegetable preparations.',
    lookOutFor: [
      'Historic heirloom jewellery, including the celebrated Naulakha necklace',
      'The old Ramdulal Nibas / Thakur Dalan',
      'The intimate, family-led Aarti and household rituals'
    ],
    nearestStation: 'Girish Park Metro',
    nearestStationLine: 'Blue Line',
    distanceToStation: '400m',
    walkTimeToStationMins: 5,
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Girish+Park+Metro+Station&destination=Chhatu+Babu+Latu+Babu+Bari+Durga+Puja+Kolkata&travelmode=walking',
    googleMapsSearchUrl: 'https://www.google.com/maps/search/?api=1&query=Chhatu+Babu+Latu+Babu+Bari+Durga+Puja+Kolkata',
    coordinates: { lat: 22.5892, lng: 88.3672 },
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'thanthania-dutta-bari',
    slug: 'thanthania-dutta-bari',
    name: 'Thanthania Dutta Bari',
    bengaliName: 'ঠনঠনিয়া দত্ত বাড়ি',
    location: 'Thanthania, North Kolkata',
    area: 'North Kolkata',
    heritageSince: '1855',
    significance: 'A historic family Puja with unique iconography and deep devotional rituals.',
    uniqueFeature: 'Durga is worshipped in the serene Hara-Gouri form, seated with Shiva rather than appearing as the demon-slaying Mahishasuramardini.',
    didYouKnow: "The Puja was begun by Dwarakanath Dutta in 1855, and the family's priestly tradition has continued unbroken across generations.",
    lookOutFor: [
      'The dramatic Dhuno Porano ritual performed by married women',
      'Nandi seated beneath the central divine pair',
      'The traditional household Thakur Dalan and ritual setting'
    ],
    nearestStation: 'MG Road / Central Metro',
    nearestStationLine: 'Blue Line',
    distanceToStation: '500m',
    walkTimeToStationMins: 6,
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=MG+Road+Metro+Station&destination=Thanthania+Dutta+Bari+Durga+Puja+Kolkata&travelmode=walking',
    googleMapsSearchUrl: 'https://www.google.com/maps/search/?api=1&query=Thanthania+Dutta+Bari+Durga+Puja+Kolkata',
    coordinates: { lat: 22.5815, lng: 88.3664 },
    image: 'https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'rani-rashmoni-family-puja',
    slug: 'rani-rashmoni-family-puja',
    name: 'Rani Rashmoni Family Puja',
    bengaliName: 'রানি রাসমণির বাড়ির পুজো',
    location: 'Janbazar, Central Kolkata',
    area: 'Central Kolkata',
    heritageSince: 'Late 18th century',
    significance: 'The storied heritage Puja of Lokmata Rani Rashmoni, immortalized in Kolkata history and Ramakrishna Kathamrita.',
    uniqueFeature: "The idol preserves an old household aesthetic, including Durga's distinctive tapta-kanchan (molten gold-like) complexion.",
    didYouKnow: 'In 1864, Sri Ramakrishna is recorded as joining the Puja in sakhi-besh (attired as a handmaiden) and fanning the Goddess during evening aarti.',
    lookOutFor: [
      'The traditional ekchala composition',
      'Fine shola (pith) ornamentation',
      'The historic Janbazar Thakur Dalan'
    ],
    nearestStation: 'Esplanade / Chandni Chowk Metro',
    nearestStationLine: 'Blue & Green Line',
    distanceToStation: '450m',
    walkTimeToStationMins: 5,
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Esplanade+Metro+Station&destination=Rani+Rashmoni+Bari+Durga+Puja+Janbazar+Kolkata&travelmode=walking',
    googleMapsSearchUrl: 'https://www.google.com/maps/search/?api=1&query=Rani+Rashmoni+Bari+Durga+Puja+Janbazar+Kolkata',
    coordinates: { lat: 22.5638, lng: 88.3546 },
    image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'malapara-adi-mallick-bari',
    slug: 'malapara-adi-mallick-bari',
    name: 'Malapara Adi Mallick Bari',
    bengaliName: 'মালাপাড়া আদি মল্লিক বাড়ি',
    location: 'Malapara / Jorabagan, North Kolkata',
    area: 'North Kolkata',
    heritageSince: 'Around 260 years old (c. 1765)',
    significance: 'One of the earliest mercantile aristocratic Pujas of North Kolkata preserving unique chalchitra art.',
    uniqueFeature: 'Durga appears peacefully with Shiva, without the conventional Mahishasura battle or weapon-filled composition.',
    didYouKnow: 'Special household offerings include traditional preparations such as Chandani Kheer and Raskara.',
    lookOutFor: [
      "Kartik's distinctive 'Rammohan' headgear",
      'The family-painted chalchitra, whose imagery changes over time',
      'The unusual proportions and presentation of Lakshmi and Saraswati'
    ],
    nearestStation: 'Sovabazar Sutanuti / Girish Park Metro',
    nearestStationLine: 'Blue Line',
    distanceToStation: '700m',
    walkTimeToStationMins: 8,
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Girish+Park+Metro+Station&destination=Malapara+Adi+Mallick+Bari+Durga+Puja+Kolkata&travelmode=walking',
    googleMapsSearchUrl: 'https://www.google.com/maps/search/?api=1&query=Malapara+Adi+Mallick+Bari+Durga+Puja+Kolkata',
    coordinates: { lat: 22.5938, lng: 88.3598 },
    image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'bhowanipore-mallick-bari',
    slug: 'bhowanipore-mallick-bari',
    name: 'Bhowanipore Mallick Bari',
    bengaliName: 'ভবানীপুর মল্লিক বাড়ি',
    location: 'Bhowanipore, South Kolkata',
    area: 'South Kolkata',
    heritageSince: 'Kolkata Puja since 1925 (Ancestral lineage over 500 years)',
    significance: 'The iconic South Kolkata aristocratic household celebration and ancestral home of cinema legend Ranjit Mallick.',
    uniqueFeature: 'The family follows Vaishnav traditions, meaning no animal sacrifice takes place, and cooked rice is not offered to Durga; wheat-based preparations are used instead.',
    didYouKnow: 'The women of the family traditionally adorn the Goddess with jewellery, while the men present her weapons.',
    lookOutFor: [
      'The traditional ekchala idol',
      "The household's Durga Dalan",
      'The adjoining Annapurna Dalan and old family architecture'
    ],
    nearestStation: 'Netaji Bhavan / Jatin Das Park Metro',
    nearestStationLine: 'Blue Line',
    distanceToStation: '350m',
    walkTimeToStationMins: 4,
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Netaji+Bhavan+Metro+Station&destination=Bhowanipore+Mallick+Bari+Durga+Puja+Kolkata&travelmode=walking',
    googleMapsSearchUrl: 'https://www.google.com/maps/search/?api=1&query=Bhowanipore+Mallick+Bari+Durga+Puja+Kolkata',
    coordinates: { lat: 22.5328, lng: 88.3475 },
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80'
  }
];

// Helper to convert Bonedi Bari into Pandal data objects for full site search and detail pages
export const BONEDI_BARI_PANDALS: Pandal[] = BONEDI_BARI_PUJAS.map((b) => ({
  id: b.id,
  name: b.name,
  slug: b.slug,
  description: `${b.significance} Heritage since ${b.heritageSince}. ${b.uniqueFeature}`,
  heritage_note: `Heritage since ${b.heritageSince}. Did you know: ${b.didYouKnow}`,
  theme: 'Aristocratic Heritage (Bonedi Bari)',
  area: b.area,
  locality: b.location,
  latitude: b.coordinates.lat,
  longitude: b.coordinates.lng,
  google_maps_url: b.googleMapsSearchUrl,
  nearest_metro: b.nearestStation,
  walking_distance: b.distanceToStation,
  walking_time_mins: b.walkTimeToStationMins,
  metro_details: [
    {
      station_id: b.nearestStation.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      station_name: b.nearestStation,
      line: b.nearestStationLine === 'Blue Line' ? 'Blue Line (North-South)' : 'Blue Line (North-South)',
      line_code: 'blue',
      walking_distance: b.distanceToStation,
      walking_time_mins: b.walkTimeToStationMins,
      directions_url: b.googleMapsDirectionsUrl,
    }
  ],
  tags: ['Bonedi Bari', 'Heritage', 'Must Visit', 'Aristocratic', 'Sabeki Pratima'],
  puja_committee: `${b.name} Estate & Family`,
  best_time: 'Morning (Pushpanjali) or evening Aarti (Dhuno Porano)',
  crowd_status: {
    level: 'moderate',
    source: 'Community reported',
    last_updated: '10 mins ago',
    notes: 'Historic household courtyard atmosphere. Please be respectful of family traditions.'
  },
  recommended_days: ['Shashti', 'Saptami', 'Ashtami', 'Nabami', 'Dashami'],
  featured_image: b.image,
  images: [
    {
      id: `${b.id}-1`,
      url: b.image,
      caption: `${b.name} Traditional Bonedi Bari Durga Puja`,
      category: 'official'
    }
  ],
  latest_images: [],
  trending_score: 95,
  saves_count: 1420,
  created_at: '2026-08-01T00:00:00Z',
  updated_at: '2026-10-08T12:00:00Z'
}));

// Helper to convert Bonedi Bari items into CircuitPandal items
export const BONEDI_BARI_CIRCUIT_PANDALS: CircuitPandal[] = BONEDI_BARI_PUJAS.map((b) => ({
  id: b.id,
  slug: b.slug,
  name: b.name,
  bengaliName: b.bengaliName,
  nearestStation: b.nearestStation,
  nearestStationLine: b.nearestStationLine,
  distanceToStation: b.distanceToStation,
  walkTimeToStationMins: b.walkTimeToStationMins,
  address: b.location,
  coordinates: b.coordinates,
  highlight: `${b.heritageSince ? `Heritage since ${b.heritageSince} · ` : ''}${b.uniqueFeature}`,
  googleMapsDirectionsUrl: b.googleMapsDirectionsUrl,
  image: b.image
}));
