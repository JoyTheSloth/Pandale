export interface FullMetroStation {
  id: string;
  name: string;
  bengaliName: string;
  code: string;
  x: number;
  y: number;
  line: 'blue' | 'green' | 'purple' | 'yellow' | 'orange';
  isInterchange?: boolean;
  interchangeLines?: ('blue' | 'green' | 'purple' | 'yellow' | 'orange')[];
  isOperational: boolean;
  zone: string;
  nearbyPandals?: { name: string; slug: string; distance: string }[];
}

export interface MetroLineDefinition {
  id: 'blue' | 'green' | 'purple' | 'yellow' | 'orange';
  name: string;
  bengaliName: string;
  color: string;
  glowColor: string;
  textColor: string;
  route: string;
  stations: FullMetroStation[];
  isFullyOperational: boolean;
}

export const METRO_FULL_MAP_DATA: Record<'blue' | 'green' | 'purple' | 'yellow' | 'orange', MetroLineDefinition> = {
  blue: {
    id: 'blue',
    name: 'Blue Line (Line 1)',
    bengaliName: 'ব্লু লাইন (লাইন ১)',
    color: '#1D63ED',
    glowColor: 'rgba(29, 99, 237, 0.6)',
    textColor: '#3B82F6',
    route: 'Dakshineswar ↔ Kavi Subhash',
    isFullyOperational: true,
    stations: [
      { id: 'dakshineswar', name: 'Dakshineswar', bengaliName: 'দক্ষিণেশ্বর', code: 'KDSW', x: 300, y: 150, line: 'blue', isOperational: true, zone: 'North' },
      { id: 'baranagar', name: 'Baranagar', bengaliName: 'বরানগর', code: 'KBAR', x: 380, y: 150, line: 'blue', isOperational: true, zone: 'North' },
      { id: 'noapara', name: 'Noapara', bengaliName: 'নোয়াপাড়া', code: 'KNAP', x: 440, y: 190, line: 'blue', isInterchange: true, interchangeLines: ['blue', 'yellow'], isOperational: true, zone: 'North' },
      { id: 'dum-dum', name: 'Dum Dum', bengaliName: 'দমদম', code: 'KDMI', x: 440, y: 240, line: 'blue', isOperational: true, zone: 'North', nearbyPandals: [{ name: 'Dum Dum Tarun Dal', slug: 'dum-dum-tarun-dal', distance: '500m' }] },
      { id: 'belgachia', name: 'Belgachia', bengaliName: 'বেলগাছিয়া', code: 'KBEL', x: 440, y: 290, line: 'blue', isOperational: true, zone: 'North', nearbyPandals: [{ name: 'Sree Bhumi Sporting Club', slug: 'sree-bhumi', distance: '1.2km' }] },
      { id: 'shyambazar', name: 'Shyambazar', bengaliName: 'শ্যামবাজার', code: 'KSHY', x: 440, y: 340, line: 'blue', isOperational: true, zone: 'North', nearbyPandals: [{ name: 'Bagbazar Sarbojanin', slug: 'bagbazar-sarbojanin', distance: '650m' }] },
      { id: 'shobhabazar', name: 'Shobhabazar Sutanuti', bengaliName: 'শোভাবাজার সুতানুটি', code: 'KSHO', x: 440, y: 390, line: 'blue', isOperational: true, zone: 'North', nearbyPandals: [{ name: 'Kumartuli Park', slug: 'kumartuli-park', distance: '450m' }] },
      { id: 'girish-park', name: 'Girish Park', bengaliName: 'গিরিশ পার্ক', code: 'KGPK', x: 440, y: 440, line: 'blue', isOperational: true, zone: 'Central', nearbyPandals: [{ name: 'Vivekananda Sporting', slug: 'bagbazar-sarbojanin', distance: '300m' }] },
      { id: 'mg-road', name: 'Mahatma Gandhi Road', bengaliName: 'মহাত্মা গান্ধী রোড', code: 'KMHR', x: 440, y: 490, line: 'blue', isOperational: true, zone: 'Central', nearbyPandals: [{ name: 'College Square', slug: 'college-square', distance: '400m' }, { name: 'Mohammad Ali Park', slug: 'mohammad-ali-park', distance: '300m' }] },
      { id: 'central', name: 'Central', bengaliName: 'সেন্ট্রাল', code: 'KCEN', x: 440, y: 540, line: 'blue', isOperational: true, zone: 'Central', nearbyPandals: [{ name: 'College Square', slug: 'college-square', distance: '600m' }] },
      { id: 'chandni-chowk', name: 'Chandni Chowk', bengaliName: 'চাঁদনি চক', code: 'KCHC', x: 440, y: 580, line: 'blue', isOperational: true, zone: 'Central' },
      { id: 'esplanade', name: 'Esplanade', bengaliName: 'এসপ্ল্যানেড', code: 'KESP', x: 440, y: 630, line: 'blue', isInterchange: true, interchangeLines: ['blue', 'green', 'purple'], isOperational: true, zone: 'Central', nearbyPandals: [{ name: 'Janbazar Sarbojanin', slug: 'santosh-mitra-square', distance: '800m' }] },
      { id: 'park-street', name: 'Park Street', bengaliName: 'পার্ক স্ট্রিট', code: 'KPSK', x: 440, y: 680, line: 'blue', isInterchange: true, interchangeLines: ['blue', 'purple'], isOperational: true, zone: 'South' },
      { id: 'maidan', name: 'Maidan', bengaliName: 'ময়দান', code: 'KMDI', x: 440, y: 730, line: 'blue', isOperational: true, zone: 'South' },
      { id: 'rabindra-sadan', name: 'Rabindra Sadan', bengaliName: 'রবীন্দ্র সদন', code: 'KRSD', x: 440, y: 780, line: 'blue', isOperational: true, zone: 'South' },
      { id: 'netaji-bhavan', name: 'Netaji Bhavan', bengaliName: 'নেতাজি ভবন', code: 'KNBN', x: 440, y: 830, line: 'blue', isOperational: true, zone: 'South', nearbyPandals: [{ name: 'Maddox Square', slug: 'maddox-square', distance: '900m' }] },
      { id: 'jatin-das-park', name: 'Jatin Das Park', bengaliName: 'যতীন দাস পার্ক', code: 'KJPK', x: 440, y: 880, line: 'blue', isOperational: true, zone: 'South', nearbyPandals: [{ name: 'Tridhara Sammilani', slug: 'tridhara-sammilani', distance: '850m' }] },
      { id: 'kalighat', name: 'Kalighat', bengaliName: 'কালীঘাট', code: 'KKHG', x: 440, y: 930, line: 'blue', isOperational: true, zone: 'South', nearbyPandals: [{ name: 'Badamtala Ashar Sangha', slug: 'badamtala-ashar-sangha', distance: '350m' }, { name: 'Deshapriya Park', slug: 'deshapriya-park', distance: '700m' }] },
      { id: 'rabindra-sarobar', name: 'Rabindra Sarobar', bengaliName: 'রবীন্দ্র সরোবর', code: 'KRSB', x: 440, y: 980, line: 'blue', isOperational: true, zone: 'South', nearbyPandals: [{ name: 'Suruchi Sangha', slug: 'suruchi-sangha', distance: '800m' }, { name: 'Mudiali Club', slug: 'mudiali-club', distance: '550m' }] },
      { id: 'mahanayak-uttam-kumar', name: 'Mahanayak Uttam Kumar (Tollygunge)', bengaliName: 'মহানায়ক উত্তম কুমার', code: 'KMUK', x: 440, y: 1030, line: 'blue', isOperational: true, zone: 'South' },
      { id: 'netaji', name: 'Netaji (Kudghat)', bengaliName: 'নেতাজি', code: 'KNTJ', x: 460, y: 1070, line: 'blue', isOperational: true, zone: 'South' },
      { id: 'masterda-surya-sen', name: 'Masterda Surya Sen (Bansdroni)', bengaliName: 'মাস্টারদা সূর্য সেন', code: 'KMSN', x: 500, y: 1105, line: 'blue', isOperational: true, zone: 'South' },
      { id: 'gitanjali', name: 'Gitanjali (Naktala)', bengaliName: 'গীতাঞ্জলি', code: 'KGTN', x: 550, y: 1125, line: 'blue', isOperational: true, zone: 'South', nearbyPandals: [{ name: 'Naktala Udayan Sangha', slug: 'naktala-udayan-sangha', distance: '250m' }] },
      { id: 'kavi-nazrul', name: 'Kavi Nazrul (Garia Bazar)', bengaliName: 'কবি নজরুল', code: 'KKNZ', x: 600, y: 1125, line: 'blue', isOperational: true, zone: 'South' },
      { id: 'shahid-khudiram', name: 'Shahid Khudiram (Briji)', bengaliName: 'শহিদ ক্ষুদিরাম', code: 'KSKD', x: 650, y: 1110, line: 'blue', isOperational: true, zone: 'South' },
      { id: 'kavi-subhash', name: 'Kavi Subhash (New Garia)', bengaliName: 'কবি সুভাষ', code: 'KKSB', x: 700, y: 1060, line: 'blue', isInterchange: true, interchangeLines: ['blue', 'orange'], isOperational: true, zone: 'South' },
    ]
  },
  green: {
    id: 'green',
    name: 'Green Line (Line 2)',
    bengaliName: 'গ্রিন লাইন (লাইন ২)',
    color: '#059669',
    glowColor: 'rgba(5, 150, 105, 0.6)',
    textColor: '#10B981',
    route: 'Howrah Maidan ↔ Salt Lake Sector V',
    isFullyOperational: true,
    stations: [
      { id: 'howrah-maidan', name: 'Howrah Maidan', bengaliName: 'হাওড়া ময়দান', code: 'HWMW', x: 160, y: 550, line: 'green', isOperational: true, zone: 'Howrah' },
      { id: 'howrah', name: 'Howrah Railway Station', bengaliName: 'হাওড়া', code: 'HWHM', x: 230, y: 570, line: 'green', isOperational: true, zone: 'Howrah' },
      { id: 'mahakaran', name: 'Mahakaran (River Tunnel)', bengaliName: 'মহাকরণ', code: 'MKNA', x: 330, y: 550, line: 'green', isOperational: true, zone: 'Central' },
      { id: 'esplanade-green', name: 'Esplanade', bengaliName: 'এসপ্ল্যানেড', code: 'KESP', x: 440, y: 630, line: 'green', isInterchange: true, interchangeLines: ['blue', 'green', 'purple'], isOperational: true, zone: 'Central' },
      { id: 'sealdah', name: 'Sealdah Railway Station', bengaliName: 'শিয়ালদহ', code: 'SDHM', x: 550, y: 630, line: 'green', isOperational: true, zone: 'Central', nearbyPandals: [{ name: 'Santosh Mitra Square', slug: 'santosh-mitra-square', distance: '550m' }, { name: 'College Square', slug: 'college-square', distance: '750m' }] },
      { id: 'phoolbagan', name: 'Phoolbagan', bengaliName: 'ফুলবাগান', code: 'PBGB', x: 600, y: 580, line: 'green', isOperational: true, zone: 'East' },
      { id: 'salt-lake-stadium', name: 'Salt Lake Stadium', bengaliName: 'সল্টলেক স্টেডিয়াম', code: 'SSSA', x: 650, y: 520, line: 'green', isOperational: true, zone: 'East' },
      { id: 'bengal-chemical', name: 'Bengal Chemical', bengaliName: 'বেঙ্গল কেমিক্যাল', code: 'BCSD', x: 710, y: 520, line: 'green', isOperational: true, zone: 'East', nearbyPandals: [{ name: 'FD Block Salt Lake', slug: 'fd-block-salt-lake', distance: '900m' }] },
      { id: 'city-centre', name: 'City Centre (Salt Lake)', bengaliName: 'সিটি সেন্টার', code: 'CCSC', x: 750, y: 540, line: 'green', isOperational: true, zone: 'East' },
      { id: 'central-park', name: 'Central Park', bengaliName: 'সেন্ট্রাল পার্ক', code: 'CPSA', x: 750, y: 580, line: 'green', isOperational: true, zone: 'East' },
      { id: 'karunamoyee', name: 'Karunamoyee', bengaliName: 'করুণাময়ী', code: 'KESA', x: 740, y: 630, line: 'green', isOperational: true, zone: 'East' },
      { id: 'salt-lake-sector-v', name: 'Salt Lake Sector V', bengaliName: 'সল্টলেক সেক্টর ৫', code: 'SVSA', x: 760, y: 670, line: 'green', isInterchange: true, interchangeLines: ['green', 'orange'], isOperational: true, zone: 'East' },
    ]
  },
  purple: {
    id: 'purple',
    name: 'Purple Line (Line 3)',
    bengaliName: 'পার্পল লাইন (লাইন ৩)',
    color: '#9333EA',
    glowColor: 'rgba(147, 51, 234, 0.6)',
    textColor: '#A855F7',
    route: 'Joka ↔ Esplanade',
    isFullyOperational: false,
    stations: [
      { id: 'iim', name: 'IIM Calcutta', bengaliName: 'আইআইএম', code: 'KIIM', x: 120, y: 1220, line: 'purple', isOperational: false, zone: 'South West' },
      { id: 'joka', name: 'Joka', bengaliName: 'জোকা', code: 'KJKA', x: 170, y: 1180, line: 'purple', isOperational: true, zone: 'South West' },
      { id: 'thakurpukur', name: 'Thakurpukur', bengaliName: 'ঠাকুরপুকুর', code: 'KTKP', x: 210, y: 1130, line: 'purple', isOperational: true, zone: 'South West' },
      { id: 'sakher-bazar', name: 'Sakher Bazar', bengaliName: 'সখের বাজার', code: 'KSKB', x: 250, y: 1080, line: 'purple', isOperational: true, zone: 'South West' },
      { id: 'behala-chowrasta', name: 'Behala Chowrasta', bengaliName: 'বেহালা চৌরাস্তা', code: 'KBCR', x: 250, y: 1020, line: 'purple', isOperational: true, zone: 'South West', nearbyPandals: [{ name: 'Behala Club', slug: 'suruchi-sangha', distance: '600m' }] },
      { id: 'behala-bazar', name: 'Behala Bazar', bengaliName: 'বেহালা বাজার', code: 'KBBR', x: 250, y: 960, line: 'purple', isOperational: true, zone: 'South West' },
      { id: 'taratala', name: 'Taratala', bengaliName: 'তারাতলা', code: 'KTRT', x: 250, y: 900, line: 'purple', isOperational: true, zone: 'South West', nearbyPandals: [{ name: 'Suruchi Sangha', slug: 'suruchi-sangha', distance: '1.1km' }] },
      { id: 'majerhat', name: 'Majerhat', bengaliName: 'মাঝেরহাট', code: 'KMJH', x: 250, y: 840, line: 'purple', isOperational: true, zone: 'South West' },
      { id: 'mominpur', name: 'Mominpur', bengaliName: 'মোমিনপুর', code: 'KMMP', x: 240, y: 780, line: 'purple', isOperational: false, zone: 'South' },
      { id: 'khiddirpur', name: 'Khiddirpur', bengaliName: 'খিদিরপুর', code: 'KDDP', x: 240, y: 720, line: 'purple', isOperational: false, zone: 'South' },
      { id: 'victoria', name: 'Victoria', bengaliName: 'ভিক্টোরিয়া', code: 'KVCT', x: 270, y: 670, line: 'purple', isOperational: false, zone: 'South' },
      { id: 'park-street-purple', name: 'Park Street', bengaliName: 'পার্ক স্ট্রিট', code: 'KPSK', x: 330, y: 645, line: 'purple', isInterchange: true, interchangeLines: ['blue', 'purple'], isOperational: false, zone: 'South' },
      { id: 'esplanade-purple', name: 'Esplanade', bengaliName: 'এসপ্ল্যানেড', code: 'KESP', x: 440, y: 630, line: 'purple', isInterchange: true, interchangeLines: ['blue', 'green', 'purple'], isOperational: false, zone: 'Central' },
    ]
  },
  yellow: {
    id: 'yellow',
    name: 'Yellow Line (Line 4)',
    bengaliName: 'ইয়েলো লাইন (লাইন ৪)',
    color: '#EAB308',
    glowColor: 'rgba(234, 179, 8, 0.6)',
    textColor: '#FACC15',
    route: 'Noapara ↔ Michael Nagar (Airport)',
    isFullyOperational: false,
    stations: [
      { id: 'noapara-yellow', name: 'Noapara', bengaliName: 'নোয়াপাড়া', code: 'KNAP', x: 440, y: 190, line: 'yellow', isInterchange: true, interchangeLines: ['blue', 'yellow'], isOperational: true, zone: 'North' },
      { id: 'dum-dum-cantt', name: 'Dum Dum Cantonment', bengaliName: 'দমদম ক্যান্টনমেন্ট', code: 'KDCM', x: 520, y: 160, line: 'yellow', isOperational: true, zone: 'North' },
      { id: 'jessore-road', name: 'Jessore Road', bengaliName: 'যশোহর রোড', code: 'KJRD', x: 570, y: 180, line: 'yellow', isOperational: true, zone: 'North' },
      { id: 'jai-hind-yellow', name: 'Jai Hind (NSCB Airport)', bengaliName: 'জয় হিন্দ (বিমানবন্দর)', code: 'KJHD', x: 620, y: 200, line: 'yellow', isInterchange: true, interchangeLines: ['yellow', 'orange'], isOperational: true, zone: 'North' },
      { id: 'birati', name: 'Birati', bengaliName: 'বিরাটি', code: 'KBRT', x: 670, y: 140, line: 'yellow', isOperational: false, zone: 'North' },
      { id: 'michael-nagar', name: 'Michael Nagar', bengaliName: 'মাইকেল নগর', code: 'KMNG', x: 720, y: 110, line: 'yellow', isOperational: false, zone: 'North' },
    ]
  },
  orange: {
    id: 'orange',
    name: 'Orange Line (Line 6)',
    bengaliName: 'অরেঞ্জ লাইন (লাইন ৬)',
    color: '#EA580C',
    glowColor: 'rgba(234, 88, 12, 0.6)',
    textColor: '#FB923C',
    route: 'Kavi Subhash ↔ Jai Hind Airport',
    isFullyOperational: false,
    stations: [
      { id: 'kavi-subhash-orange', name: 'Kavi Subhash', bengaliName: 'কবি সুভাষ', code: 'KKSB', x: 700, y: 1060, line: 'orange', isInterchange: true, interchangeLines: ['blue', 'orange'], isOperational: true, zone: 'South' },
      { id: 'satyajit-ray', name: 'Satyajit Ray (Hiland Park)', bengaliName: 'সত্যজিৎ রায়', code: 'KSJR', x: 700, y: 990, line: 'orange', isOperational: true, zone: 'South' },
      { id: 'jyotirindra-nandi', name: 'Jyotirindra Nandi (Mukundapur)', bengaliName: 'জ্যোতিরিন্দ্র নন্দী', code: 'KJNN', x: 710, y: 940, line: 'orange', isOperational: true, zone: 'South' },
      { id: 'kavi-sukanta', name: 'Kavi Sukanta (Kalikapur)', bengaliName: 'কবি সুকান্ত', code: 'KKSK', x: 730, y: 890, line: 'orange', isOperational: true, zone: 'South' },
      { id: 'hemanta-mukhopadhyay', name: 'Hemanta Mukhopadhyay (Ruby)', bengaliName: 'হেমন্ত মুখোপাধ্যায়', code: 'KHMD', x: 760, y: 840, line: 'orange', isOperational: true, zone: 'South', nearbyPandals: [{ name: 'Ruby Crossing', slug: 'singhi-park', distance: '1.2km' }] },
      { id: 'vip-bazar', name: 'VIP Bazar', bengaliName: 'ভিআইপি বাজার', code: 'KVIB', x: 760, y: 790, line: 'orange', isOperational: false, zone: 'East' },
      { id: 'ritwik-ghatak', name: 'Ritwik Ghatak', bengaliName: 'ঋত্বিক ঘটক', code: 'KRWG', x: 760, y: 740, line: 'orange', isOperational: false, zone: 'East' },
      { id: 'barun-sengupta', name: 'Barun Sengupta (Science City)', bengaliName: 'বরুণ সেনগুপ্ত', code: 'KBST', x: 760, y: 690, line: 'orange', isOperational: false, zone: 'East' },
      { id: 'beleghata', name: 'Beleghata', bengaliName: 'বেলেঘাটা', code: 'KBGA', x: 760, y: 640, line: 'orange', isOperational: false, zone: 'East' },
      { id: 'gour-kishore-ghosh', name: 'Gour Kishore Ghosh', bengaliName: 'গৌরকিশোর ঘোষ', code: 'KGKG', x: 770, y: 590, line: 'orange', isOperational: false, zone: 'East' },
      { id: 'nalban', name: 'Nalban', bengaliName: 'নলবন', code: 'KNLN', x: 780, y: 550, line: 'orange', isOperational: false, zone: 'East' },
      { id: 'it-centre', name: 'IT Centre / Sector V', bengaliName: 'আইটি সেন্টার', code: 'KITC', x: 790, y: 530, line: 'orange', isInterchange: true, interchangeLines: ['green', 'orange'], isOperational: false, zone: 'East' },
      { id: 'nabadiganta', name: 'Nabadiganta', bengaliName: 'নবদিগন্ত', code: 'KNBG', x: 840, y: 540, line: 'orange', isOperational: false, zone: 'New Town' },
      { id: 'nazrul-tirtha', name: 'Nazrul Tirtha', bengaliName: 'নজরুল তীর্থ', code: 'KNLT', x: 910, y: 550, line: 'orange', isOperational: false, zone: 'New Town' },
      { id: 'swapnabhor', name: 'Swapnabhor', bengaliName: 'স্বপ্নভোর', code: 'KSPB', x: 910, y: 490, line: 'orange', isOperational: false, zone: 'New Town' },
      { id: 'biswa-bangla', name: 'Biswa Bangla Convention Centre', bengaliName: 'বিশ্ব বাংলা কনভেনশন সেন্টার', code: 'KBCC', x: 910, y: 430, line: 'orange', isOperational: false, zone: 'New Town' },
      { id: 'shiksha-tirtha', name: 'Shiksha Tirtha', bengaliName: 'শিক্ষা তীর্থ', code: 'KSST', x: 910, y: 370, line: 'orange', isOperational: false, zone: 'New Town' },
      { id: 'mothers-wax-museum', name: "Mother's Wax Museum", bengaliName: 'মাদার্স ওয়াক্স মিউজিয়াম', code: 'KMWM', x: 910, y: 310, line: 'orange', isOperational: false, zone: 'New Town' },
      { id: 'eco-park', name: 'Eco Park', bengaliName: 'ইকো পার্ক', code: 'KECP', x: 880, y: 260, line: 'orange', isOperational: false, zone: 'New Town' },
      { id: 'mangaldeep', name: 'Mangaldeep', bengaliName: 'মঙ্গলদীপ', code: 'KMDP', x: 820, y: 260, line: 'orange', isOperational: false, zone: 'New Town' },
      { id: 'city-centre-2', name: 'City Centre-2', bengaliName: 'সিটি সেন্টার-২', code: 'KCCT', x: 760, y: 260, line: 'orange', isOperational: false, zone: 'New Town' },
      { id: 'chinar-park', name: 'Chinar Park', bengaliName: 'চিনার পার্ক', code: 'KCNP', x: 700, y: 270, line: 'orange', isOperational: false, zone: 'Rajarhat' },
      { id: 'vip-road', name: 'VIP Road (Teghoria)', bengaliName: 'ভিআইপি রোড', code: 'KVIR', x: 670, y: 250, line: 'orange', isOperational: false, zone: 'North' },
      { id: 'jai-hind-orange', name: 'Jai Hind (NSCB Airport)', bengaliName: 'জয় হিন্দ (বিমানবন্দর)', code: 'KJHD', x: 620, y: 200, line: 'orange', isInterchange: true, interchangeLines: ['yellow', 'orange'], isOperational: false, zone: 'North' },
    ]
  }
};

// Hooghly river path coordinates running north to south through Kolkata
export const HOOGHLY_RIVER_PATH = "M 240 30 C 270 140, 255 280, 250 420 C 250 490, 280 540, 285 610 C 285 680, 240 760, 190 850 C 150 930, 130 1060, 100 1190 C 80 1270, 60 1330, 45 1370";

// Official Kolkata Metro Fare Slabs
export const OFFICIAL_FARE_SLABS = [
  { distance: '0 – 2 km', tokenFare: 5, smartCardFare: 4.5, timeEst: '2 – 5 mins', description: 'Immediate adjacent stations' },
  { distance: '2 – 5 km', tokenFare: 10, smartCardFare: 9.0, timeEst: '5 – 12 mins', description: 'Short neighborhood hop' },
  { distance: '5 – 10 km', tokenFare: 15, smartCardFare: 13.5, timeEst: '12 – 22 mins', description: 'Central to North/South hubs' },
  { distance: '10 – 20 km', tokenFare: 20, smartCardFare: 18.0, timeEst: '22 – 40 mins', description: 'Cross-city transit' },
  { distance: 'Above 20 km', tokenFare: 25, smartCardFare: 22.5, timeEst: '40 – 65 mins', description: 'Terminal-to-terminal span' }
];

export const TOURIST_CARD_INFO = [
  { type: '1-Day Tourist Smart Card', fare: 100, refundableDeposit: 80, validity: 'Unlimited rides across Kolkata Metro for 1 calendar day' },
  { type: '3-Day Tourist Smart Card', fare: 250, refundableDeposit: 80, validity: 'Unlimited rides across Kolkata Metro for 3 consecutive days' }
];

export interface MetroFareEstimate {
  fare: number;
  smartCardFare: number;
  distanceKm: number;
  durationMins: number;
  stationsCount: number;
  interchange: string | null;
  sameLine: boolean;
  lineNames: string[];
}

// Calculate station-to-station fare based on authentic distance and line transfers
export function calculateStationFare(from: FullMetroStation, to: FullMetroStation): MetroFareEstimate {
  if (from.id === to.id) {
    return {
      fare: 0,
      smartCardFare: 0,
      distanceKm: 0,
      durationMins: 0,
      stationsCount: 0,
      interchange: null,
      sameLine: true,
      lineNames: [METRO_FULL_MAP_DATA[from.line].name]
    };
  }

  const fromLine = METRO_FULL_MAP_DATA[from.line];
  const toLine = METRO_FULL_MAP_DATA[to.line];

  // If on same line
  if (from.line === to.line) {
    const idxFrom = fromLine.stations.findIndex(s => s.id === from.id);
    const idxTo = fromLine.stations.findIndex(s => s.id === to.id);
    const stops = Math.abs(idxFrom - idxTo);
    
    // Average distance per stop
    const avgKmPerStop = from.line === 'green' ? 1.4 : from.line === 'blue' ? 1.25 : 1.3;
    const distanceKm = Math.max(1.2, +(stops * avgKmPerStop).toFixed(1));
    const durationMins = Math.max(4, Math.round(stops * 2.2));

    let fare = 5;
    if (distanceKm > 20) fare = 25;
    else if (distanceKm > 10) fare = 20;
    else if (distanceKm > 5) fare = 15;
    else if (distanceKm > 2) fare = 10;

    return {
      fare,
      smartCardFare: Math.round(fare * 0.9 * 10) / 10,
      distanceKm,
      durationMins,
      stationsCount: stops,
      interchange: null,
      sameLine: true,
      lineNames: [fromLine.name]
    };
  }

  // Multi-line interchange calculation
  let interchangeName = 'Esplanade';
  if ((from.line === 'blue' && to.line === 'yellow') || (from.line === 'yellow' && to.line === 'blue')) {
    interchangeName = 'Noapara';
  } else if ((from.line === 'blue' && to.line === 'orange') || (from.line === 'orange' && to.line === 'blue')) {
    interchangeName = 'Kavi Subhash';
  } else if ((from.line === 'green' && to.line === 'orange') || (from.line === 'orange' && to.line === 'green')) {
    interchangeName = 'Salt Lake Sector V';
  } else if ((from.line === 'yellow' && to.line === 'orange') || (from.line === 'orange' && to.line === 'yellow')) {
    interchangeName = 'Jai Hind (Airport)';
  }

  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const estDistanceKm = Math.max(3.5, +(Math.hypot(dx, dy) * 0.038).toFixed(1));
  const estStops = Math.max(4, Math.round(estDistanceKm / 1.3));
  const durationMins = Math.max(14, Math.round(estStops * 2.3 + 7)); // +7 mins transfer walk

  let fare = 15;
  if (estDistanceKm > 20) fare = 25;
  else if (estDistanceKm > 10) fare = 20;
  else if (estDistanceKm > 5) fare = 15;
  else fare = 10;

  return {
    fare,
    smartCardFare: Math.round(fare * 0.9 * 10) / 10,
    distanceKm: estDistanceKm,
    durationMins,
    stationsCount: estStops,
    interchange: interchangeName,
    sameLine: false,
    lineNames: [fromLine.name, toLine.name]
  };
}
