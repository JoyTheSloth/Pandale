const { delay, searchCommons } = require('./commons_utils');

const PANDAL_QUERIES = [
  { id: 'sree-bhumi', query: 'Sreebhumi Sporting Club Durga' },
  { id: 'bagbazar-sarbojanin', query: 'Bagbazar Sarbojanin Durga Puja' },
  { id: 'kumartuli-park', query: 'Kumartuli Park Durga Puja' },
  { id: 'maddox-square', query: 'Maddox Square Durga Puja' },
  { id: 'college-square', query: 'College Square Durga Puja' },
  { id: 'suruchi-sangha', query: 'Suruchi Sangha Durga Puja' },
  { id: 'deshapriya-park', query: 'Deshapriya Park Durga Puja' },
  { id: 'tridhara-sammilani', query: 'Tridhara Sammilani Durga Puja' },
  { id: 'mudiali-club', query: 'Mudiali Club Durga' },
  { id: 'ekdalia-evergreen', query: 'Ekdalia Evergreen Durga Puja' },
  { id: 'salt-lake-fd-block', query: 'FD Block Salt Lake Durga Puja' },
  { id: 'chetla-agrani', query: 'Chetla Agrani Club Durga Puja' },
  { id: 'santosh-mitra-square', query: 'Santosh Mitra square Durga Puja' },
  { id: 'behala-natun-dal', query: 'Behala Natun Dal Durga Puja' },
  { id: 'sealdah-athletic-club', query: 'Sealdah Durga Puja' },
  { id: '37-pally', query: '41 Pally Durga Puja OR 37 Pally' },
  { id: 'salt-lake-bj-block', query: 'BJ Block Durga Puja Salt Lake' },
  { id: 'ae-block-central-park', query: 'AE Block Salt Lake Durga puja' },
  { id: 'sreebhumi-sporting-club-new-town', query: 'New Town Durga Puja Kolkata' },
  { id: 'santoshpur-lake-pally', query: 'Santoshpur Durga Puja' },
  { id: 'bosepukur-sitala-mandir', query: 'Bosepukur Sitala Mandir Durga Puja' },
  { id: 'milan-tirtha', query: 'Durga Puja pandal Kolkata night' },
  { id: 'arjunpur-amra-sabai-club', query: 'Dum Dum Durga Puja' },
  { id: 'barisha-sarbojanin', query: 'Barisha Club Durga Puja' },
  { id: 'sabarna-roy-chowdhury-aatchala', query: 'Sabarna Roy Choudhury Durga' },
  { id: 'behala-nutan-dal', query: 'Behala Natun Dal' },
  { id: 'behala-friends', query: 'Behala Friends Durga' },
  { id: 'behala-29-pally', query: 'Behala Durga Puja' }
];

async function run() {
  const mapping = {};
  for (const item of PANDAL_QUERIES) {
    console.log(`Searching for ${item.id}...`);
    const results = await searchCommons(item.query, 3);
    console.log(item.id, results.map(r => r.title));
    mapping[item.id] = results;
    await delay(1200);
  }
  const fs = require('fs');
  fs.writeFileSync('./scripts/search_results.json', JSON.stringify(mapping, null, 2));
}

run();
