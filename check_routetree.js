const fs = require('fs');
const indexJs = fs.readFileSync('ref_assets/index-CG1_IeQ2.js', 'utf8');

const idx = indexJs.indexOf('routes-Bu26TP8z.js');
console.log('routes-Bu26TP8z.js in indexJs at:', idx);
if (idx !== -1) {
  console.log(indexJs.slice(Math.max(0, idx - 300), Math.min(indexJs.length, idx + 300)));
} else {
  // Let's search for "createRootRoute" or "createFileRoute" or routeTree
  ['createRootRoute', 'createFileRoute', 'routeTree', 'routeManifest'].forEach(w => {
    const p = indexJs.indexOf(w);
    console.log(w, 'at', p);
    if (p !== -1) {
      console.log(indexJs.slice(p, p + 200));
    }
  });
}
