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
        pandal_name: 'Bagbazar Sarbojanin Durgotsav',
        pandal_slug: 'bagbazar-sarbojanin',
        walking_distance: '650m',
        walking_time_mins: 8,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Shyambazar+Metro+Station&destination=22.6025,88.3662'
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
        pandal_name: 'Kumartuli Park Sarbojanin',
        pandal_slug: 'kumartuli-park',
        walking_distance: '450m',
        walking_time_mins: 5,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Shovabazar+Sutanuti+Metro+Station&destination=22.5991,88.3639'
      },
      {
        pandal_id: 'bagbazar-sarbojanin',
        pandal_name: 'Bagbazar Sarbojanin Durgotsav',
        pandal_slug: 'bagbazar-sarbojanin',
        walking_distance: '950m',
        walking_time_mins: 12,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Shovabazar+Sutanuti+Metro+Station&destination=22.6025,88.3662'
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
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Belgachia+Metro+Station&destination=22.5976,88.3978'
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
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Mahatma+Gandhi+Road+Metro+Station&destination=22.5744,88.3639'
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
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Central+Metro+Station&destination=22.5744,88.3639'
      },
      {
        pandal_id: 'santosh-mitra-square',
        pandal_name: 'Santosh Mitra Square',
        pandal_slug: 'santosh-mitra-square',
        walking_distance: '850m',
        walking_time_mins: 10,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Central+Metro+Station&destination=22.5691,88.3698'
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
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Sealdah+Metro+Station&destination=22.5691,88.3698'
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
        pandal_id: 'salt-lake-fd-block',
        pandal_name: 'Salt Lake FD Block Sarbojanin',
        pandal_slug: 'salt-lake-fd-block',
        walking_distance: '750m',
        walking_time_mins: 9,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Karunamoyee+Metro+Station&destination=22.5786,88.4112'
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
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Netaji+Bhavan+Metro+Station&destination=22.5312,88.3571'
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
        pandal_id: 'deshapriya-park',
        pandal_name: 'Deshapriya Park',
        pandal_slug: 'deshapriya-park',
        walking_distance: '450m',
        walking_time_mins: 5,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Kalighat+Metro+Station&destination=22.5186,88.3542'
      },
      {
        pandal_id: 'tridhara-sammilani',
        pandal_name: 'Tridhara Sammilani',
        pandal_slug: 'tridhara-sammilani',
        walking_distance: '650m',
        walking_time_mins: 8,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Kalighat+Metro+Station&destination=22.5205,88.3582'
      },
      {
        pandal_id: 'chetla-agrani',
        pandal_name: 'Chetla Agrani Club',
        pandal_slug: 'chetla-agrani',
        walking_distance: '950m',
        walking_time_mins: 11,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Kalighat+Metro+Station&destination=22.5165,88.3375'
      },
      {
        pandal_id: 'ekdalia-evergreen',
        pandal_name: 'Ekdalia Evergreen Club',
        pandal_slug: 'ekdalia-evergreen',
        walking_distance: '1.5 km (Auto 5 mins)',
        walking_time_mins: 17,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Kalighat+Metro+Station&destination=22.5198,88.3687'
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
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Rabindra+Sarobar+Metro+Station&destination=22.5121,88.3512'
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
        pandal_id: 'behala-natun-dal',
        pandal_name: 'Behala Natun Dal',
        pandal_slug: 'behala-natun-dal',
        walking_distance: '500m',
        walking_time_mins: 6,
        directions_url: 'https://www.google.com/maps/dir/?api=1&origin=Behala+Chowrasta+Metro+Station&destination=22.4975,88.3182'
      }
    ]
  }
];
