const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'pandals.ts');
let content = fs.readFileSync(filePath, 'utf8');

// List of all 28 pandal IDs
const pandalIds = [
  'sree-bhumi',
  'bagbazar-sarbojanin',
  'kumartuli-park',
  'maddox-square',
  'college-square',
  'suruchi-sangha',
  'deshapriya-park',
  'tridhara-sammilani',
  'mudiali-club',
  'ekdalia-evergreen',
  'salt-lake-fd-block',
  'chetla-agrani',
  'santosh-mitra-square',
  'behala-natun-dal',
  'sealdah-athletic-club',
  '37-pally',
  'salt-lake-bj-block',
  'ae-block-central-park',
  'sreebhumi-sporting-club-new-town',
  'santoshpur-lake-pally',
  'bosepukur-sitala-mandir',
  'milan-tirtha',
  'arjunpur-amra-sabai-club',
  'barisha-sarbojanin',
  'sabarna-roy-chowdhury-aatchala',
  'behala-nutan-dal',
  'behala-friends',
  'behala-29-pally'
];

console.log('Total pandals to update:', pandalIds.length);

// We need to parse each pandal block or use regex replacement per pandal.
// Notice that each pandal in pandals.ts begins with id: '...'
// Let's create an updater that finds the section for each pandal.

// Split by each pandal: { \n    id: '
// Let's check how the objects are structured.
for (const id of pandalIds) {
  // Regex to find featured_image for this pandal
  // Specifically: from id: '${id}' up to the next pandal id or end
  const idPattern = new RegExp(`(id:\\s*'${id}'[\\s\\S]*?)(featured_image:\\s*')(https:[^']+)(')`, 'g');
  
  if (idPattern.test(content)) {
    content = content.replace(idPattern, `$1featured_image: '/pandals/${id}.jpg'`);
    console.log(`Updated featured_image for ${id}`);
  } else {
    console.warn(`Could not find featured_image for ${id}`);
  }
}

// Now update images array urls:
// For each pandal id:
for (const id of pandalIds) {
  // Find the block for this pandal
  const pandalRegex = new RegExp(`(id:\\s*'${id}'[\\s\\S]*?images:\\s*\\[)([\\s\\S]*?)(\\][\\s\\S]*?latest_images:)`);
  const match = content.match(pandalRegex);
  if (match) {
    let imagesBlock = match[2];
    // Replace all urls inside this images block with /pandals/${id}.jpg, /pandals/${id}-2.jpg, /pandals/${id}-3.jpg
    const urls = imagesBlock.match(/url:\s*'[^']+'/g) || [];
    if (urls.length >= 1) imagesBlock = imagesBlock.replace(urls[0], `url: '/pandals/${id}.jpg'`);
    if (urls.length >= 2) imagesBlock = imagesBlock.replace(urls[1], `url: '/pandals/${id}-2.jpg'`);
    if (urls.length >= 3) imagesBlock = imagesBlock.replace(urls[2], `url: '/pandals/${id}-3.jpg'`);
    
    content = content.replace(match[0], match[1] + imagesBlock + match[3]);
    console.log(`Updated images array for ${id}`);
  }
}

// Now update latest_images media_url for each pandal
for (const id of pandalIds) {
  const pandalRegex = new RegExp(`(id:\\s*'${id}'[\\s\\S]*?latest_images:\\s*\\[)([\\s\\S]*?)(\\][\\s\\S]*?trending_score:)`);
  const match = content.match(pandalRegex);
  if (match) {
    let latestBlock = match[2];
    const mediaUrls = latestBlock.match(/media_url:\s*'[^']+'/g) || [];
    if (mediaUrls.length >= 1) latestBlock = latestBlock.replace(mediaUrls[0], `media_url: '/pandals/${id}.jpg'`);
    if (mediaUrls.length >= 2) latestBlock = latestBlock.replace(mediaUrls[1], `media_url: '/pandals/${id}-2.jpg'`);
    
    content = content.replace(match[0], match[1] + latestBlock + match[3]);
    console.log(`Updated latest_images for ${id}`);
  }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated src/data/pandals.ts!');
