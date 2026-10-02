const https = require('https');
const fs = require('fs');
const path = require('path');

const USER_AGENT = 'PandaleApp/1.0 (contact@pandale.local; https://pandale.local)';

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function searchCommons(query, limit = 5) {
  return new Promise((resolve) => {
    const url = 'https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=' + 
      encodeURIComponent(query) + '&gsrlimit=' + limit + '&prop=imageinfo&iiprop=url|thumburl&iiurlwidth=1200&format=json';

    https.get(url, { headers: { 'User-Agent': USER_AGENT } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query ? Object.values(json.query.pages) : [];
          const results = pages
            .map(p => ({
              title: p.title.replace(/^File:/, ''),
              url: p.imageinfo?.[0]?.thumburl || p.imageinfo?.[0]?.url
            }))
            .filter(r => r.title && (r.title.toLowerCase().endsWith('.jpg') || r.title.toLowerCase().endsWith('.jpeg') || r.title.toLowerCase().endsWith('.png')));
          resolve(results);
        } catch (e) {
          resolve([]);
        }
      });
    }).on('error', () => resolve([]));
  });
}

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    function get(currentUrl, hops = 0) {
      if (hops > 8) return reject(new Error('Too many redirects'));
      https.get(currentUrl, { headers: { 'User-Agent': USER_AGENT } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return get(res.headers.location, hops + 1);
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`Failed with status ${res.statusCode}`));
        }
        const fileStream = fs.createWriteStream(destPath);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve(true);
        });
        fileStream.on('error', reject);
      }).on('error', reject);
    }
    get(url);
  });
}

module.exports = { delay, searchCommons, downloadImage };
