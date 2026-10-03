const fs = require('fs');
const path = require('path');
const https = require('https');
const { searchCommons, downloadImage, delay } = require('./commons_utils');

const targetDir = path.join(__dirname, '..', 'public', 'pandals');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Custom aliases / queries for pandals
const CUSTOM_QUERIES = {
  'bhawanipur-75-pally': '75 Palli Bhawanipur Durga utsav',
  'haridebpur-41-pally': 'Haridevpur 41 Pally Durga Puja',
  'ajay-sanghati': 'Ajeya Sanghati Club Haridevpur',
  'shib-mandir': 'Mudiali Shiv Mandir Durga Puja',
  'ballygunge-cultural': 'Ballygunge Cultural Durga Puja',
  'hindustan-park': 'Durga puja at Hindustan Park Kolkata',
  'hindustan-club': 'Hindustan Park Durga puja',
  'dumdum-park-bharat-chakra': 'Dum Dum Park Bharat Chakra',
  'dumdum-park-sarbojanin': 'Dum Dum Park Durga Puja',
  'dumdum-park-yubak-brindra': 'Dum Dum Park Durga',
  'dumdum-tarun-dal': 'Dum Dum Durga Puja',
  'dumdum-tarun-sangha': 'Dum Dum Durga Puja',
  'kashibose-lane': 'Kashi Bose Lane Durga Utsav committee',
  'jagat-mukherjee-park': 'Jagat Mukherjee Park Durga Puja',
  'chaltabagan-durga-puja-committee': 'Chaltabagan Durga puja',
  'chaltabagan-lohapatty': 'Chalta Bagan Durga',
  'chaltabagan-sarbojanin': 'Chaltabagan Durga puja',
  'halitbagan-sarbojanin': 'Hatibagan Sarbojanin',
  'halitbagan-nabin-pally': 'Hatibagan Nabinpally',
  'tala-baroari': 'Tala Baroari Durga',
  'nalin-sarkar-street': 'Nalin Sarkar Street Durga puja',
  'telanga-bagan': 'Telanga bagan',
  'sikdar-bagan': 'Sikdar Bagan Durga Puja',
  'bakul-bagan': 'Bakul Bagan Sarbojanin',
  'pathurighata-5-pally': 'Pathuriaghata Durga',
  'kabitog-bagan': 'Kabiraj Bagan Durga',
  'gouribari-sarbojanin': 'Gouribari Durga Puja Kolkata',
  'beleghata-33-pally': 'Beleghata Durga Puja',
  'beleghata-sandhani': 'Beleghata Durga Puja',
  'alipore-78-pally': '78 Pally Durga Puja Kolkata',
  'kalighat-forward-club': 'Kalighat Durga Puja',
  'sangha-sree-kalighat': 'Sangha Sree Kalighat Durga',
  'kalighat-natun-sangha': 'Kalighat Durga Puja',
  'kalighat-milan-sangha': 'Kalighat Milan Sangha Durga',
  'nepal-bhattacharya-street': 'Nepal Bhattacharjee Street Durga',
  'hazra-park': 'Hazra Durga Puja Kolkata',
  'muktadal': 'Durga Puja Kolkata South',
  'abasar': 'Bhowanipore Durga Puja',
  'sadhin-sangha': 'Kalighat Durga Puja',
  'dakshin-kolkata-sarbojanin': 'South Kolkata Durga Puja pandal',
  '22-pally-bhawanipur': 'Bhowanipore Durga Puja',
  '76-pally-bhawanipur': 'Bhowanipore Durga Puja',
  'harish-park': 'Harish Park Kolkata Durga',
  'rupchand-mukherjee-lane': 'Bhowanipore Durga Puja',
  'roy-street-park': 'Bhowanipore Durga Puja',
  'bhawanipur-durgautsav': 'Bhowanipore Durga Puja',
  'naba-pally-sangha': 'Kolkata Durga Puja',
  'tarun-sangha-sarobar': 'Rabindra Sarobar Durga Puja',
  'santoshpur-trikon-park': 'Santoshpur Durga Puja',
  'sanghashree-kalighat': 'Kalighat Durga Puja',
  'pratap-aditya-road-trikon-park': 'South Kolkata Durga Puja',
  '21-pally': 'South Kolkata Durga Puja',
  'vivekananda-park-athletic-club': 'South Kolkata Durga Puja',
  'vivekananda-sporting-club': 'South Kolkata Durga Puja',
  'pally-unnayan': 'South Kolkata Durga Puja',
  'chakraberia-sarbojanin': 'Chakraberia Durga Puja',
  'nabo-durga-pancha-durga': 'Durga Puja Kolkata',
  'nabin-sangha-shyambazar': 'Shyambazar Durga Puja',
  'bidhan-sarani-alitas': 'Bidhan Sarani Durga Puja',
  'north-tridhara': 'North Kolkata Durga Puja',
  'friends-union': 'North Kolkata Durga Puja',
  'belgachia-sadharan-durgautsav': 'Belgachia Durga Puja',
  'dakshindari-youth': 'Dum Dum Durga Puja',
  'dumdripra-durgautsav': 'Dum Dum Durga Puja',
  'laketown-netaji-sporting': 'Lake Town Durga Puja',
  'laketown-adhibasi-brindra': 'Lake Town Durga Puja',
  'shitala-byam-samity': 'Simla Byayam Samity Durga Puja',
  'ghorbagan-sarbojanin': 'North Kolkata Durga Puja',
  'tarun-sporting-club-gp': 'Tarun Sporting Durga Puja',
  'lalabagan-nababankur': 'Lalabagan Durga Puja',
  'rabindra-kanan': 'North Kolkata Durga Puja',
  'ahiritola-jubak-brindra': 'Ahiritola Durga Puja',
  'nowpara-dadabhai-sangha': 'Noapara Durga Puja',
  'netaji-colony-lawland': 'North Kolkata Durga Puja',
  'forward-colony-noapara': 'Noapara Durga Puja',
  'subodh-mullick-square': 'Central Kolkata Durga Puja'
};

const unsplashList = JSON.parse(fs.readFileSync(path.join(__dirname, 'unsplash_pandals.json'), 'utf8'));

async function processPandals() {
  console.log(`Starting automated search & fetch for ${unsplashList.length} pandals...`);
  const results = {};
  
  for (let i = 0; i < unsplashList.length; i++) {
    const item = unsplashList[i];
    const { id, name } = item;
    const dest1 = path.join(targetDir, `${id}.jpg`);
    
    // Check if already downloaded
    if (fs.existsSync(dest1) && fs.statSync(dest1).size > 15000) {
      console.log(`[${i + 1}/${unsplashList.length}] ${id}: Already exists (${fs.statSync(dest1).size} bytes)`);
      results[id] = true;
      continue;
    }

    const query = CUSTOM_QUERIES[id] || `${name} Durga Puja`;
    console.log(`[${i + 1}/${unsplashList.length}] Searching Commons for ${id} with query: "${query}"...`);
    
    let items = await searchCommons(query, 3);
    
    // Fallback search if 0 results
    if (items.length === 0) {
      const fallbackQuery = `${name} Kolkata`;
      console.log(`  -> Fallback search: "${fallbackQuery}"`);
      items = await searchCommons(fallbackQuery, 3);
    }
    
    if (items.length === 0) {
      console.log(`  -> Generic Kolkata Durga Puja fallback for: ${id}`);
      items = await searchCommons('Kolkata Durga Puja pandal 2024 OR 2023', 3);
    }

    if (items.length > 0) {
      console.log(`  Found ${items.length} items. Downloading for ${id}...`);
      for (let j = 0; j < Math.min(items.length, 2); j++) {
        const fileItem = items[j];
        const outName = j === 0 ? `${id}.jpg` : `${id}-2.jpg`;
        const outPath = path.join(targetDir, outName);
        try {
          await downloadImage(fileItem.url, outPath);
          console.log(`  ✓ Saved ${outName} (${fs.statSync(outPath).size} bytes)`);
          results[id] = true;
        } catch (e) {
          console.warn(`  Failed primary download for ${outName}: ${e.message}`);
          try {
            const directUrl = 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(fileItem.title) + '?width=1200';
            await downloadImage(directUrl, outPath);
            console.log(`  ✓ Saved via Special:FilePath: ${outName}`);
            results[id] = true;
          } catch (e2) {
            console.error(`  ✗ Second attempt failed for ${outName}: ${e2.message}`);
          }
        }
        await delay(500);
      }
    } else {
      console.warn(`  No items found for ${id}`);
    }

    await delay(600);
  }

  console.log('Search & Download finished! Now updating src/data/pandals.ts...');
  
  // Read and update pandals.ts
  const filePath = path.join(__dirname, '..', 'src', 'data', 'pandals.ts');
  let content = fs.readFileSync(filePath, 'utf8');

  for (const item of unsplashList) {
    const { id } = item;
    const dest1 = path.join(targetDir, `${id}.jpg`);
    const hasLocal = fs.existsSync(dest1) && fs.statSync(dest1).size > 5000;
    const hasLocal2 = fs.existsSync(path.join(targetDir, `${id}-2.jpg`));

    if (hasLocal) {
      // 1. Update featured_image
      const featPattern = new RegExp(`(id:\\s*'${id}'[\\s\\S]*?featured_image:\\s*')(https:[^']+)(')`, 'g');
      content = content.replace(featPattern, `$1/pandals/${id}.jpg$3`);

      // 2. Update images array
      const pandalRegex = new RegExp(`(id:\\s*'${id}'[\\s\\S]*?images:\\s*\\[)([\\s\\S]*?)(\\][\\s\\S]*?latest_images:)`);
      const match = content.match(pandalRegex);
      if (match) {
        let imagesBlock = match[2];
        const urls = imagesBlock.match(/url:\s*'[^']+'/g) || [];
        if (urls.length >= 1) imagesBlock = imagesBlock.replace(urls[0], `url: '/pandals/${id}.jpg'`);
        if (urls.length >= 2) imagesBlock = imagesBlock.replace(urls[1], hasLocal2 ? `url: '/pandals/${id}-2.jpg'` : `url: '/pandals/${id}.jpg'`);
        if (urls.length >= 3) imagesBlock = imagesBlock.replace(urls[2], `url: '/pandals/${id}.jpg'`);
        content = content.replace(match[0], match[1] + imagesBlock + match[3]);
      }

      // 3. Update latest_images media_url
      const latestRegex = new RegExp(`(id:\\s*'${id}'[\\s\\S]*?latest_images:\\s*\\[)([\\s\\S]*?)(\\][\\s\\S]*?trending_score:)`);
      const latestMatch = content.match(latestRegex);
      if (latestMatch) {
        let latestBlock = latestMatch[2];
        const mediaUrls = latestBlock.match(/media_url:\s*'[^']+'/g) || [];
        if (mediaUrls.length >= 1) latestBlock = latestBlock.replace(mediaUrls[0], `media_url: '/pandals/${id}.jpg'`);
        if (mediaUrls.length >= 2) latestBlock = latestBlock.replace(mediaUrls[1], hasLocal2 ? `media_url: '/pandals/${id}-2.jpg'` : `media_url: '/pandals/${id}.jpg'`);
        content = content.replace(latestMatch[0], latestMatch[1] + latestBlock + latestMatch[3]);
      }
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('src/data/pandals.ts updated successfully!');
}

processPandals();
