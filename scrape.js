const fs = require('fs');
const path = require('path');
const https = require('https');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = [];
      res.on('data', chunk => data.push(chunk));
      res.on('end', () => resolve({ status: res.statusCode, data: Buffer.concat(data), headers: res.headers }));
      res.on('error', reject);
    });
  });
}

async function run() {
  const base = 'https://godavaripushkaralu2027.lovable.app';
  const htmlRes = await fetchUrl(base + '/');
  console.log('HTML status:', htmlRes.status, 'size:', htmlRes.data.length);
  fs.writeFileSync('ref_index.html', htmlRes.data);

  const htmlStr = htmlRes.data.toString('utf-8');
  const assetRegex = /["'](\/assets\/[^"']+)["']/g;
  const assets = new Set();
  let match;
  while ((match = assetRegex.exec(htmlStr)) !== null) {
    assets.add(match[1]);
  }

  console.log('Found assets in HTML:', Array.from(assets));

  if (!fs.existsSync('ref_assets')) {
    fs.mkdirSync('ref_assets', { recursive: true });
  }

  for (const assetPath of assets) {
    const filename = path.basename(assetPath);
    console.log('Downloading:', assetPath);
    const res = await fetchUrl(base + assetPath);
    if (res.status === 200) {
      fs.writeFileSync(path.join('ref_assets', filename), res.data);
      console.log('Saved', filename, res.data.length, 'bytes');

      // If it's a JS file, let's search for more referenced chunks
      if (filename.endsWith('.js')) {
        const jsText = res.data.toString('utf-8');
        let jsMatch;
        const jsRegex = /["'](\/assets\/[^"']+\.js)["']/g;
        while ((jsMatch = jsRegex.exec(jsText)) !== null) {
          if (!assets.has(jsMatch[1])) {
            assets.add(jsMatch[1]);
            console.log('Discovered new JS chunk:', jsMatch[1]);
          }
        }
      }
    } else {
      console.log('Failed to fetch:', assetPath, res.status);
    }
  }

  console.log('Initial asset download done.');
}

run().catch(console.error);