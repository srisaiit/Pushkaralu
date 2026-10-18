const fs = require('fs');

const routesJs = fs.readFileSync('ref_assets/routes-Bu26TP8z.js', 'utf8');

// Look for data objects or arrays
const sections = ['X', 'de', 'fe', 'pe', 'me', 'he'];

sections.forEach(s => {
  const fn = `function ${s}(`;
  const idx = routesJs.indexOf(fn);
  if (idx !== -1) {
    console.log(`\n================ FUNCTION ${s} ================`);
    console.log(routesJs.slice(idx, idx + 2500));
  }
});
