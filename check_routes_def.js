const fs = require('fs');
const indexJs = fs.readFileSync('ref_assets/index-CG1_IeQ2.js', 'utf8');

let idx = 0;
while ((idx = indexJs.indexOf('Route(', idx)) !== -1) {
  console.log(`\n--- Match at ${idx} ---`);
  console.log(indexJs.slice(Math.max(0, idx - 100), Math.min(indexJs.length, idx + 200)));
  idx += 6;
}
