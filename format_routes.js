const fs = require('fs');

const routesJs = fs.readFileSync('ref_assets/routes-Bu26TP8z.js', 'utf8');

// Let's format routesJs with some indentation or split by function
console.log('Total routesJs size:', routesJs.length);

// Let's find all function names or component definitions
const funcMatches = routesJs.match(/function\s+([a-zA-Z0-9_$]+)\s*\(/g);
console.log('Functions:', funcMatches);

// Write a formatted version of routesJs to inspect
let formatted = routesJs
  .replace(/;/g, ';\n')
  .replace(/\{/g, '{\n')
  .replace(/\}/g, '\n}\n');

fs.writeFileSync('ref_routes_formatted.js', formatted);
console.log('Wrote ref_routes_formatted.js');

