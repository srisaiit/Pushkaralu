const fs = require('fs');

const routesJs = fs.readFileSync('ref_assets/routes-Bu26TP8z.js', 'utf8');
console.log('--- Routes JS Analysis ---');
console.log('Routes JS length:', routesJs.length);

// Look for route patterns like path: "/..." or {path:
const paths = [];
const rMatch = routesJs.match(/path:\s*["'][^"']+["']/g);
if (rMatch) {
  console.log('Paths found:', rMatch);
}

// Let's also check for imports or dynamic imports
const dynImports = routesJs.match(/import\s*\(\s*["'][^"']+["']\s*\)/g);
if (dynImports) {
  console.log('Dynamic imports:', dynImports);
}

// Let's check string literals in routesJs
const strings = routesJs.match(/"\/[a-zA-Z0-9_\-\/]+"/g);
console.log('Slash strings in routes:', Array.from(new Set(strings || [])));

// Let's check index-CG1_IeQ2.js
const indexJs = fs.readFileSync('ref_assets/index-CG1_IeQ2.js', 'utf8');
console.log('--- Index JS Analysis ---');
console.log('Index JS length:', indexJs.length);

// Let's inspect ref_index.html full content structure
const html = fs.readFileSync('ref_index.html', 'utf8');
console.log('--- HTML Structure ---');
// print section tags and headers
const sections = html.match(/<section[^>]*>.*?<\/section>/gs);
if (sections) {
  console.log('Section count:', sections.length);
  sections.forEach((s, idx) => {
    const id = s.match(/id="([^"]+)"/);
    const h123 = s.match(/<h[1-4][^>]*>(.*?)<\/h[1-4]>/g);
    console.log(`Section ${idx} [id: ${id ? id[1] : 'none'}]:`, h123);
  });
}
