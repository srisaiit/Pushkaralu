const fs = require('fs');

const css = fs.readFileSync('ref_assets/styles-CSpuwj4Y.css', 'utf8');
const urls = css.match(/url\([^)]+\)/g);
console.log('URLs in CSS:', urls);
