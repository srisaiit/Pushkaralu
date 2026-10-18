const fs = require('fs');
const routesJs = fs.readFileSync('ref_assets/routes-Bu26TP8z.js', 'utf8');

['X', 'de', 'fe'].forEach(s => {
  const fn = `function ${s}(`;
  const idx = routesJs.indexOf(fn);
  if (idx !== -1) {
    console.log(`\n================ FUNCTION ${s} ================`);
    console.log(routesJs.slice(idx, idx + 1500));
  }
});

// find image imports or definitions like L = ..., F = ...
const top = routesJs.slice(0, 2000);
console.log('\n--- Top of routesJs (first 2000 chars) ---');
console.log(top);
