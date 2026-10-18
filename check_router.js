const fs = require('fs');

const indexJs = fs.readFileSync('ref_assets/index-CG1_IeQ2.js', 'utf8');

// Check router imports or route configurations (e.g. TanStack Router, React Router, etc.)
const routerMatches = indexJs.match(/createBrowserRouter|createRouter|Route\(|createRootRoute|rootRoute/g);
console.log('Router indicators in index.js:', routerMatches);

// Check all path strings in indexJs
const paths = new Set();
const pathRegex = /["'](\/[a-zA-Z0-9_\-\/]*)["']/g;
let m;
while ((m = pathRegex.exec(indexJs)) !== null) {
  if (m[1].length > 1 && !m[1].startsWith('/assets/') && !m[1].startsWith('/~') && !m[1].startsWith('/__')) {
    paths.add(m[1]);
  }
}
console.log('Paths found in indexJs:', Array.from(paths));
