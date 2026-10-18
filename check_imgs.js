const fs = require('fs');

const html = fs.readFileSync('ref_index.html', 'utf8');
const imgs = html.match(/<img[^>]+>/g);
console.log('Images in HTML:');
if (imgs) {
  imgs.forEach(img => console.log(img));
}
