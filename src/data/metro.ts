import { MetroStation } from '@/types';

export const METRO_STATIONS_DATA: MetroStation[] = [
  {
    id: 'shyambazar',
    name: 'Shyambazar',
    bengali_name: 'শ্যামবাজার',
    line: 'Blue Line (North-South)',
    line_code: 'blue',
    latitude: 22.6025,
    longitude: 88.3705,
    nearby_pandals: [
      {
        pandal_id: 'bagbazar-sarbojanin',
        pandal_name: 'Bagbazar Sarbojanin',
        pandal_slug: 'bagbazar-sarbojanin',
        walking_distance: '450m',
        walking_time_mins: 5,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Shyambazar+Metro+Station&destination=Bagbazar+Sarbojanin+Durgotsav&travelmode=walking'
      },
      {
        pandal_id: 'hatibagan-sarbojanin',
        pandal_name: 'Hatibagan Sarbojanin',
        pandal_slug: 'hatibagan-sarbojanin',
        walking_distance: '350m',
        walking_time_mins: 4,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Shyambazar+Metro+Station&destination=Hatibagan+Sarbojanin&travelmode=walking'
      },
      {
        pandal_id: 'tala-prattay',
        pandal_name: 'Tala Prattay',
        pandal_slug: 'tala-prattay',
        walking_distance: '700m',
        walking_time_mins: 8,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Shyambazar+Metro+Station&destination=Tala+Prattay+Durga+Puja&travelmode=walking'
      },
      {
        pandal_id: 'kashi-bose-lane',
        pandal_name: 'Kashi Bose Lane',
        pandal_slug: 'kashi-bose-lane',
        walking_distance: '650m',
        walking_time_mins: 8,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Shyambazar+Metro+Station&destination=Kashi+Bose+Lane+Durga+Puja&travelmode=walking'
      }
    ]
  },
  {
    id: 'shovabazar',
    name: 'Shovabazar Sutanuti',
    bengali_name: 'শোভাবাজার সুতানুটি',
    line: 'Blue Line (North-South)',
    line_code: 'blue',
    latitude: 22.5975,
    longitude: 88.3668,
    nearby_pandals: [
      {
        pandal_id: 'kumartuli-park',
        pandal_name: 'Kumartuli Park',
        pandal_slug: 'kumartuli-park',
        walking_distance: '500m',
        walking_time_mins: 6,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Shovabazar+Sutanuti+Metro+Station&destination=Kumartuli+Park+Sarbojanin&travelmode=walking'
      },
      {
        pandal_id: 'kumartuli-sarbojanin',
        pandal_name: 'Kumartuli Sarbojanin',
        pandal_slug: 'kumartuli-sarbojanin',
        walking_distance: '600m',
        walking_time_mins: 7,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Shovabazar+Sutanuti+Metro+Station&destination=Kumartuli+Sarbojanin+Durgotsav&travelmode=walking'
      },
      {
        pandal_id: 'ahiritola-sarbojanin',
        pandal_name: 'Ahiritola Sarbojanin',
        pandal_slug: 'ahiritola-sarbojanin',
        walking_distance: '700m',
        walking_time_mins: 8,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Shovabazar+Sutanuti+Metro+Station&destination=Ahiritola+Sarbojanin+Durgotsav&travelmode=walking'
      },
      {
        pandal_id: 'bagbazar-sarbojanin',
        pandal_name: 'Bagbazar Sarbojanin',
        pandal_slug: 'bagbazar-sarbojanin',
        walking_distance: '950m',
        walking_time_mins: 12,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Shovabazar+Sutanuti+Metro+Station&destination=Bagbazar+Sarbojanin+Durgotsav&travelmode=walking'
      }
    ]
  },
  {
    id: 'belgachia',
    name: 'Belgachia',
    bengali_name: 'বেলগাছিয়া',
    line: 'Blue Line (North-South)',
    line_code: 'blue',
    latitude: 22.6044,
    longitude: 88.3842,
    nearby_pandals: [
      {
        pandal_id: 'sree-bhumi',
        pandal_name: 'Sree Bhumi Sporting Club',
        pandal_slug: 'sree-bhumi-sporting-club',
        walking_distance: '1.4 km (Auto 4 mins)',
        walking_time_mins: 15,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Belgachia+Metro+Station&destination=Sree%20Bhumi%20Sporting%20Club%2C%20Kolkata'
      }
    ]
  },
  {
    id: 'mg-road',
    name: 'Mahatma Gandhi Road',
    bengali_name: 'মহাত্মা গান্ধী রোড',
    line: 'Blue Line (North-South)',
    line_code: 'blue',
    latitude: 22.5818,
    longitude: 88.3621,
    nearby_pandals: [
      {
        pandal_id: 'college-square',
        pandal_name: 'College Square Sarbojanin',
        pandal_slug: 'college-square',
        walking_distance: '650m',
        walking_time_mins: 8,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Mahatma+Gandhi+Road+Metro+Station&destination=College%20Square%20Sarbojanin%2C%20Kolkata'
      }
    ]
  },
  {
    id: 'central',
    name: 'Central',
    bengali_name: 'সেন্ট্রাল',
    line: 'Blue Line (North-South)',
    line_code: 'blue',
    latitude: 22.5702,
    longitude: 88.3608,
    nearby_pandals: [
      {
        pandal_id: 'college-square',
        pandal_name: 'College Square Sarbojanin',
        pandal_slug: 'college-square',
        walking_distance: '500m',
        walking_time_mins: 6,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Central+Metro+Station&destination=College%20Square%20Sarbojanin%2C%20Kolkata'
      },
      {
        pandal_id: 'santosh-mitra-square',
        pandal_name: 'Santosh Mitra Square',
        pandal_slug: 'santosh-mitra-square',
        walking_distance: '850m',
        walking_time_mins: 10,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Central+Metro+Station&destination=Santosh%20Mitra%20Square%2C%20Kolkata'
      }
    ]
  },
  {
    id: 'chandni-chowk',
    name: 'Chandni Chowk',
    bengali_name: 'চাঁদনি চক',
    line: 'Blue Line (North-South)',
    line_code: 'blue',
    latitude: 22.5668,
    longitude: 88.3562,
    nearby_pandals: [
      {
        pandal_id: 'college-square',
        pandal_name: 'College Square Sarbojanin',
        pandal_slug: 'college-square',
        walking_distance: '600m',
        walking_time_mins: 8,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Chandni+Chowk+Metro+Station&destination=College%20Square%20Sarbojanin%2C%20Kolkata'
      },
      {
        pandal_id: 'santosh-mitra-square',
        pandal_name: 'Santosh Mitra Square',
        pandal_slug: 'santosh-mitra-square',
        walking_distance: '900m',
        walking_time_mins: 11,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Chandni+Chowk+Metro+Station&destination=Santosh%20Mitra%20Square%2C%20Kolkata'
      }
    ]
  },
  {
    id: 'sealdah',
    name: 'Sealdah',
    bengali_name: 'শিয়ালদহ',
    line: 'Green Line (East-West)',
    line_code: 'green',
    latitude: 22.5684,
    longitude: 88.3712,
    nearby_pandals: [
      {
        pandal_id: 'santosh-mitra-square',
        pandal_name: 'Santosh Mitra Square (Lebutala)',
        pandal_slug: 'santosh-mitra-square',
        walking_distance: '550m',
        walking_time_mins: 7,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Sealdah+Metro+Station&destination=Santosh%20Mitra%20Square%20(Lebutala)%2C%20Kolkata'
      },
      {
        pandal_id: 'college-square',
        pandal_name: 'College Square Sarbojanin',
        pandal_slug: 'college-square',
        walking_distance: '1.1 km (Auto 4 mins)',
        walking_time_mins: 14,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Sealdah+Metro+Station&destination=College%20Square%20Sarbojanin%2C%20Kolkata'
      },
      {
        pandal_id: 'sealdah-athletic-club',
        pandal_name: 'Sealdah Athletic Club',
        pandal_slug: 'sealdah-athletic-club',
        walking_distance: '550m',
        walking_time_mins: 7,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Sealdah+Metro+Station&destination=Sealdah%20Athletic%20Club%2C%20Kolkata'
      },
      {
        pandal_id: '37-pally',
        pandal_name: '37 Pally Sarbojanin',
        pandal_slug: '37-pally-sarbojanin',
        walking_distance: '600m (Auto available)',
        walking_time_mins: 8,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Sealdah+Metro+Station&destination=37%20Pally%20Sarbojanin%2C%20Kolkata'
      }
    ]
  },
  {
    id: 'netaji-bhavan',
    name: 'Netaji Bhavan',
    bengali_name: 'নেতাজি ভবন',
    line: 'Blue Line (North-South)',
    line_code: 'blue',
    latitude: 22.5365,
    longitude: 88.3475,
    nearby_pandals: [
      {
        pandal_id: 'maddox-square',
        pandal_name: 'Maddox Square',
        pandal_slug: 'maddox-square',
        walking_distance: '850m',
        walking_time_mins: 10,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Netaji+Bhavan+Metro+Station&destination=Maddox%20Square%2C%20Kolkata'
      }
    ]
  },
  {
    id: 'kalighat',
    name: 'Kalighat',
    bengali_name: 'কালীঘাট',
    line: 'Blue Line (North-South)',
    line_code: 'blue',
    latitude: 22.5186,
    longitude: 88.3456,
    nearby_pandals: [
      {
        pandal_id: 'badamtala-ashar-sangha',
        pandal_name: 'Badamtala Ashar Sangha',
        pandal_slug: 'badamtala-ashar-sangha',
        walking_distance: '250m',
        walking_time_mins: 3,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Kalighat+Metro+Station&destination=Badamtala+Ashar+Sangha&travelmode=walking'
      },
      {
        pandal_id: '66-pally',
        pandal_name: '66 Pally',
        pandal_slug: '66-pally',
        walking_distance: '280m',
        walking_time_mins: 3,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Kalighat+Metro+Station&destination=66+Pally+Durga+Puja&travelmode=walking'
      },
      {
        pandal_id: '68-pally',
        pandal_name: '68 Pally',
        pandal_slug: '68-pally',
        walking_distance: '320m',
        walking_time_mins: 4,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Kalighat+Metro+Station&destination=68+Pally+Durga+Puja&travelmode=walking'
      },
      {
        pandal_id: 'deshapriya-park',
        pandal_name: 'Deshapriya Park',
        pandal_slug: 'deshapriya-park',
        walking_distance: '450m',
        walking_time_mins: 5,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Kalighat+Metro+Station&destination=Deshapriya+Park&travelmode=walking'
      },
      {
        pandal_id: 'tridhara-sammilani',
        pandal_name: 'Tridhara Sammilani',
        pandal_slug: 'tridhara-sammilani',
        walking_distance: '450m',
        walking_time_mins: 5,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Kalighat+Metro+Station&destination=Tridhara+Sammilani&travelmode=walking'
      },
      {
        pandal_id: 'chetla-agrani',
        pandal_name: 'Chetla Agrani',
        pandal_slug: 'chetla-agrani',
        walking_distance: '650m',
        walking_time_mins: 8,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Kalighat+Metro+Station&destination=Chetla+Agrani+Club&travelmode=walking'
      },
      {
        pandal_id: 'singhi-park',
        pandal_name: 'Singhi Park',
        pandal_slug: 'singhi-park',
        walking_distance: '850m',
        walking_time_mins: 10,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Kalighat+Metro+Station&destination=Singhi+Park+Durga+Puja&travelmode=walking'
      },
      {
        pandal_id: 'ekdalia-evergreen',
        pandal_name: 'Ekdalia Evergreen',
        pandal_slug: 'ekdalia-evergreen',
        walking_distance: '950m',
        walking_time_mins: 11,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Kalighat+Metro+Station&destination=Ekdalia+Evergreen+Club&travelmode=walking'
      }
    ]
  },
  {
    id: 'rabindra-sarobar',
    name: 'Rabindra Sarobar',
    bengali_name: 'রবীন্দ্র সরোবর',
    line: 'Blue Line (North-South)',
    line_code: 'blue',
    latitude: 22.5085,
    longitude: 88.3458,
    nearby_pandals: [
      {
        pandal_id: 'mudiali-club',
        pandal_name: 'Mudiali Club',
        pandal_slug: 'mudiali-club',
        walking_distance: '600m',
        walking_time_mins: 7,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Rabindra+Sarobar+Metro+Station&destination=Mudiali%20Club%2C%20Kolkata'
      }
    ]
  },
  {
    id: 'behala-chowrasta',
    name: 'Behala Chowrasta',
    bengali_name: 'বেহালা চৌরাস্তা',
    line: 'Purple Line (Joka-Esplanade)',
    line_code: 'purple',
    latitude: 22.4965,
    longitude: 88.3155,
    nearby_pandals: [
      {
        pandal_id: 'barisha-sarbojanin',
        pandal_name: 'Barisha Sarbojanin Durgotsav',
        pandal_slug: 'barisha-sarbojanin',
        walking_distance: '900m',
        walking_time_mins: 11,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Behala+Chowrasta+Metro+Station&destination=Barisha%20Sarbojanin%20Durgotsav%2C%20Kolkata'
      },
      {
        pandal_id: 'behala-nutan-dal',
        pandal_name: 'Behala Nutan Dal',
        pandal_slug: 'behala-nutan-dal',
        walking_distance: '550m',
        walking_time_mins: 7,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Behala+Chowrasta+Metro+Station&destination=Behala%20Nutan%20Dal%2C%20Kolkata'
      }
    ]
  },

  // ─── GREEN LINE (EAST-WEST) ──────────────────────────────────────────────────

  {
    id: 'salt-lake-stadium',
    name: 'Salt Lake Stadium',
    bengali_name: 'সল্টলেক স্টেডিয়াম',
    line: 'Green Line (East-West)',
    line_code: 'green',
    latitude: 22.5772,
    longitude: 88.3986,
    nearby_pandals: [
      {
        pandal_id: 'salt-lake-fd-block',
        pandal_name: 'Salt Lake FD Block Sarbojanin',
        pandal_slug: 'salt-lake-fd-block',
        walking_distance: '2.2 km (Auto 7 mins)',
        walking_time_mins: 27,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Salt+Lake+Stadium+Metro+Station&destination=Salt%20Lake%20FD%20Block%20Sarbojanin%2C%20Kolkata'
      }
    ]
  },

  {
    id: 'city-centre',
    name: 'City Centre',
    bengali_name: 'সিটি সেন্টার',
    line: 'Green Line (East-West)',
    line_code: 'green',
    latitude: 22.5795,
    longitude: 88.4068,
    nearby_pandals: [
      {
        pandal_id: 'salt-lake-fd-block',
        pandal_name: 'Salt Lake FD Block Sarbojanin',
        pandal_slug: 'salt-lake-fd-block',
        walking_distance: '650m',
        walking_time_mins: 8,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=City+Centre+Metro+Station&destination=Salt%20Lake%20FD%20Block%20Sarbojanin%2C%20Kolkata'
      }
    ]
  },

  {
    id: 'central-park',
    name: 'Central Park',
    bengali_name: 'সেন্ট্রাল পার্ক',
    line: 'Green Line (East-West)',
    line_code: 'green',
    latitude: 22.5828,
    longitude: 88.4145,
    nearby_pandals: [
      {
        pandal_id: 'ae-block-central-park',
        pandal_name: 'AE Block Sarbojanin',
        pandal_slug: 'ae-block-sarbojanin',
        walking_distance: '700m',
        walking_time_mins: 9,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Central+Park+Metro+Station&destination=AE%20Block%20Sarbojanin%2C%20Kolkata'
      },
      {
        pandal_id: 'sreebhumi-sporting-club-new-town',
        pandal_name: 'New Town Sarbojanin',
        pandal_slug: 'new-town-sarbojanin',
        walking_distance: '1.2 km (Auto 4 mins)',
        walking_time_mins: 15,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Central+Park+Metro+Station&destination=New%20Town%20Sarbojanin%2C%20Kolkata'
      }
    ]
  },

  {
    id: 'karunamoyee',
    name: 'Karunamoyee',
    bengali_name: 'করুণাময়ী',
    line: 'Green Line (East-West)',
    line_code: 'green',
    latitude: 22.5855,
    longitude: 88.4215,
    nearby_pandals: [
      {
        pandal_id: 'salt-lake-bj-block',
        pandal_name: 'BJ Block Sarbojanin',
        pandal_slug: 'bj-block-sarbojanin',
        walking_distance: '650m',
        walking_time_mins: 8,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Karunamoyee+Metro+Station&destination=BJ%20Block%20Sarbojanin%2C%20Kolkata'
      },
      {
        pandal_id: 'salt-lake-fd-block',
        pandal_name: 'Salt Lake FD Block Sarbojanin',
        pandal_slug: 'salt-lake-fd-block',
        walking_distance: '750m',
        walking_time_mins: 9,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Karunamoyee+Metro+Station&destination=Salt%20Lake%20FD%20Block%20Sarbojanin%2C%20Kolkata'
      }
    ]
  },

  {
    id: 'salt-lake-sector-v',
    name: 'Salt Lake Sector V',
    bengali_name: 'সল্টলেক সেক্টর ৫',
    line: 'Green Line (East-West)',
    line_code: 'green',
    latitude: 22.5752,
    longitude: 88.4312,
    nearby_pandals: [
      {
        pandal_id: 'sreebhumi-sporting-club-new-town',
        pandal_name: 'New Town Sarbojanin',
        pandal_slug: 'new-town-sarbojanin',
        walking_distance: '2.5 km (Auto 8 mins)',
        walking_time_mins: 30,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Salt+Lake+Sector+V+Metro+Station&destination=New%20Town%20Sarbojanin%2C%20Kolkata'
      }
    ]
  },

  // ─── ORANGE LINE (KAVI SUBHASH → BELEGHATA) ─────────────────────────────────

  {
    id: 'satyajit-ray',
    name: 'Satyajit Ray',
    bengali_name: 'সত্যজিৎ রায়',
    line: 'Orange Line (Kavi Subhash-Airport)',
    line_code: 'orange',
    latitude: 22.4960,
    longitude: 88.3855,
    nearby_pandals: [
      {
        pandal_id: 'santoshpur-lake-pally',
        pandal_name: 'Santoshpur Lake Pally',
        pandal_slug: 'santoshpur-lake-pally',
        walking_distance: '1.8 km (Auto 6 mins)',
        walking_time_mins: 22,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Satyajit+Ray+Metro+Station&destination=Santoshpur%20Lake%20Pally%2C%20Kolkata'
      }
    ]
  },

  {
    id: 'kavi-sukanta',
    name: 'Kavi Sukanta',
    bengali_name: 'কবি সুকান্ত',
    line: 'Orange Line (Kavi Subhash-Airport)',
    line_code: 'orange',
    latitude: 22.5025,
    longitude: 88.3788,
    nearby_pandals: [
      {
        pandal_id: 'bosepukur-sitala-mandir',
        pandal_name: 'Bosepukur Sitala Mandir',
        pandal_slug: 'bosepukur-sitala-mandir',
        walking_distance: '1.5 km (Auto 5 mins)',
        walking_time_mins: 18,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Kavi+Sukanta+Metro+Station&destination=Bosepukur%20Sitala%20Mandir%2C%20Kolkata'
      }
    ]
  },

  {
    id: 'hemanta-mukhopadhyay',
    name: 'Hemanta Mukhopadhyay (Ruby)',
    bengali_name: 'হেমন্ত মুখোপাধ্যায় (রুবি)',
    line: 'Orange Line (Kavi Subhash-Airport)',
    line_code: 'orange',
    latitude: 22.5068,
    longitude: 88.3842,
    nearby_pandals: [
      {
        pandal_id: 'milan-tirtha',
        pandal_name: 'Milan Tirtha',
        pandal_slug: 'milan-tirtha',
        walking_distance: '1.2 km (Auto 4 mins)',
        walking_time_mins: 15,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Hemanta+Mukhopadhyay+Metro+Station&destination=Milan%20Tirtha%2C%20Kolkata'
      }
    ]
  },

  {
    id: 'vip-bazar',
    name: 'VIP Bazar',
    bengali_name: 'ভিআইপি বাজার',
    line: 'Orange Line (Kavi Subhash-Airport)',
    line_code: 'orange',
    latitude: 22.5112,
    longitude: 88.3898,
    nearby_pandals: [
      {
        pandal_id: 'milan-tirtha',
        pandal_name: 'Milan Tirtha',
        pandal_slug: 'milan-tirtha',
        walking_distance: '450m',
        walking_time_mins: 6,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=VIP+Bazar+Metro+Station&destination=Milan%20Tirtha%2C%20Kolkata'
      },
      {
        pandal_id: 'bosepukur-sitala-mandir',
        pandal_name: 'Bosepukur Sitala Mandir',
        pandal_slug: 'bosepukur-sitala-mandir',
        walking_distance: '1.2 km (Auto 4 mins)',
        walking_time_mins: 15,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=VIP+Bazar+Metro+Station&destination=Bosepukur%20Sitala%20Mandir%2C%20Kolkata'
      }
    ]
  },

  // ─── YELLOW LINE (JAI HIND AIRPORT → NOAPARA) ────────────────────────────────

  {
    id: 'jessore-road',
    name: 'Jessore Road',
    bengali_name: 'যশোর রোড',
    line: 'Yellow Line (Airport-Noapara)',
    line_code: 'yellow',
    latitude: 22.6638,
    longitude: 88.4102,
    nearby_pandals: [
      {
        pandal_id: 'arjunpur-amra-sabai-club',
        pandal_name: 'Arjunpur Amra Sabai Club',
        pandal_slug: 'arjunpur-amra-sabai-club',
        walking_distance: '1.5 km (Auto 5 mins)',
        walking_time_mins: 18,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Jessore+Road+Metro+Station&destination=Arjunpur%20Amra%20Sabai%20Club%2C%20Kolkata'
      }
    ]
  },

  // ─── PURPLE LINE ADDITIONAL STATIONS ────────────────────────────────────────

  {
    id: 'sakher-bazar',
    name: 'Sakher Bazar',
    bengali_name: 'সাখের বাজার',
    line: 'Purple Line (Joka-Esplanade)',
    line_code: 'purple',
    latitude: 22.4788,
    longitude: 88.3118,
    nearby_pandals: [
      {
        pandal_id: 'barisha-sarbojanin',
        pandal_name: 'Barisha Sarbojanin Durgotsav',
        pandal_slug: 'barisha-sarbojanin',
        walking_distance: '600m',
        walking_time_mins: 7,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Sakher+Bazar+Metro+Station&destination=Barisha%20Sarbojanin%20Durgotsav%2C%20Kolkata'
      },
      {
        pandal_id: 'sabarna-roy-chowdhury-aatchala',
        pandal_name: 'Sabarna Roy Chowdhury Aatchala Bari',
        pandal_slug: 'sabarna-roy-chowdhury-aatchala-bari',
        walking_distance: '650m',
        walking_time_mins: 8,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Sakher+Bazar+Metro+Station&destination=Sabarna%20Roy%20Chowdhury%20Aatchala%20Bari%2C%20Kolkata'
      }
    ]
  },

  {
    id: 'behala-bazar',
    name: 'Behala Bazar',
    bengali_name: 'বেহালা বাজার',
    line: 'Purple Line (Joka-Esplanade)',
    line_code: 'purple',
    latitude: 22.4972,
    longitude: 88.3168,
    nearby_pandals: [
      {
        pandal_id: 'behala-nutan-dal',
        pandal_name: 'Behala Nutan Dal',
        pandal_slug: 'behala-nutan-dal',
        walking_distance: '700m',
        walking_time_mins: 9,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Behala+Bazar+Metro+Station&destination=Behala%20Nutan%20Dal%2C%20Kolkata'
      },
      {
        pandal_id: 'behala-friends',
        pandal_name: 'Behala Friends',
        pandal_slug: 'behala-friends',
        walking_distance: '500m',
        walking_time_mins: 6,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Behala+Bazar+Metro+Station&destination=Behala%20Friends%2C%20Kolkata'
      }
    ]
  },

  {
    id: 'taratala',
    name: 'Taratala',
    bengali_name: 'তারাতলা',
    line: 'Purple Line (Joka-Esplanade)',
    line_code: 'purple',
    latitude: 22.5018,
    longitude: 88.3098,
    nearby_pandals: [
      {
        pandal_id: 'behala-29-pally',
        pandal_name: 'Behala 29 Pally',
        pandal_slug: 'behala-29-pally',
        walking_distance: '550m',
        walking_time_mins: 7,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Taratala+Metro+Station&destination=Behala%2029%20Pally%2C%20Kolkata'
      }
    ]
  }
];

