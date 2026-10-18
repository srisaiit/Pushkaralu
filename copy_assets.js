import fs from 'fs';
import path from 'path';

const publicAssetsDir = path.join('public', 'assets');
fs.mkdirSync(publicAssetsDir, { recursive: true });

const filesToCopy = [
  'hero-godavari-_kRxrQ2z.jpg',
  'ghat-aVaQmyHF.jpg',
  'temple-CUD5i3oH.jpg',
  'styles-CSpuwj4Y.css'
];

for (const file of filesToCopy) {
  const src = path.join('ref_assets', file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(publicAssetsDir, file));
    console.log('Copied to public/assets:', file);
  } else {
    console.warn('File not found in ref_assets:', file);
  }
}

const faviconSrc = path.join('ref_assets', 'favicon.ico');
if (fs.existsSync(faviconSrc)) {
  fs.copyFileSync(faviconSrc, path.join('public', 'favicon.ico'));
  console.log('Copied favicon.ico to public/');
}
