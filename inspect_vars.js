const fs = require('fs');
const routesJs = fs.readFileSync('ref_assets/routes-Bu26TP8z.js', 'utf8');

// find where B, V, H, F, L, I are declared
['B', 'V', 'H', 'F', 'L', 'I'].forEach(v => {
  const match = routesJs.match(new RegExp(`(?:var|let|const)\\s+${v}\\s*=\\s*([^;]+);`));
  if (match) {
    console.log(`\n=== Variable ${v} ===`);
    console.log(match[0]);
  } else {
    // try to find where it's assigned
    const idx = routesJs.indexOf(`${v}=`);
    if (idx !== -1) {
      console.log(`\n=== ${v}= at index ${idx} ===`);
      console.log(routesJs.slice(Math.max(0, idx - 50), Math.min(routesJs.length, idx + 300)));
    }
  }
});
