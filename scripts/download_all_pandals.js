const fs = require('fs');
const path = require('path');
const { delay, downloadImage } = require('./commons_utils');

const searchResults = JSON.parse(fs.readFileSync(path.join(__dirname, 'search_results.json'), 'utf8'));

// Fill santoshpur-lake-pally
searchResults['santoshpur-lake-pally'] = [
  {
    title: 'Durga puja Festivities 2023 Lights, Pandals, Shopping, food in south Kolkata 28.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Durga_puja_Festivities_2023_Lights%2C_Pandals%2C_Shopping%2C_food_in_south_Kolkata_28.jpg/1280px-Durga_puja_Festivities_2023_Lights%2C_Pandals%2C_Shopping%2C_food_in_south_Kolkata_28.jpg'
  },
  {
    title: 'Durga puja Festivities 2023 Lights, Pandals, Shopping, food in south Kolkata 59.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Durga_puja_Festivities_2023_Lights%2C_Pandals%2C_Shopping%2C_food_in_south_Kolkata_59.jpg/1280px-Durga_puja_Festivities_2023_Lights%2C_Pandals%2C_Shopping%2C_food_in_south_Kolkata_59.jpg'
  }
];

const targetDir = path.join(__dirname, '..', 'public', 'pandals');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

async function run() {
  const pandalIds = Object.keys(searchResults);
  console.log(`Starting download for ${pandalIds.length} pandals...`);

  for (const id of pandalIds) {
    const list = searchResults[id];
    if (!list || list.length === 0) {
      console.warn(`No images for ${id}`);
      continue;
    }

    for (let i = 0; i < list.length && i < 3; i++) {
      const item = list[i];
      const filename = i === 0 ? `${id}.jpg` : `${id}-${i + 1}.jpg`;
      const destPath = path.join(targetDir, filename);

      if (fs.existsSync(destPath) && fs.statSync(destPath).size > 10000) {
        console.log(`Already exists: ${filename} (${fs.statSync(destPath).size} bytes)`);
        continue;
      }

      console.log(`Downloading ${item.title} -> ${filename}...`);
      try {
        await downloadImage(item.url, destPath);
        console.log(`✓ Saved ${filename} (${fs.statSync(destPath).size} bytes)`);
      } catch (err) {
        console.error(`✗ Error downloading ${filename}:`, err.message);
        // Try fallback to Special:FilePath
        try {
          const directUrl = 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(item.title) + '?width=1200';
          console.log(`Retrying with Special:FilePath for ${filename}...`);
          await downloadImage(directUrl, destPath);
          console.log(`✓ Saved via Special:FilePath: ${filename} (${fs.statSync(destPath).size} bytes)`);
        } catch (e2) {
          console.error(`✗ Second attempt failed for ${filename}:`, e2.message);
        }
      }
      await delay(800);
    }
  }

  console.log('All downloads completed!');
}

run();
