const fs = require('fs');

const routesJs = fs.readFileSync('ref_assets/routes-Bu26TP8z.js', 'utf8');
const idx = routesJs.indexOf('omni-open-widget-btn');
console.log('--- Context around omni-open-widget-btn (-1000 to +2000) ---');
console.log(routesJs.slice(Math.max(0, idx - 1000), Math.min(routesJs.length, idx + 2500)));
