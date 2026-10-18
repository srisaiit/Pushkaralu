const fs = require('fs');

const indexJs = fs.readFileSync('ref_assets/index-CG1_IeQ2.js', 'utf8');
const routesJs = fs.readFileSync('ref_assets/routes-Bu26TP8z.js', 'utf8');

function search(name, text) {
  console.log(`=== Searching in ${name} ===`);
  const keywords = ['omni', 'speech', 'recognition', 'voice', 'audio', 'talk', 'ghat', 'temple', 'parking', 'missing', 'emergency', 'admin', 'telugu', 'hindi'];
  for (const kw of keywords) {
    let count = 0;
    let pos = 0;
    while ((pos = text.toLowerCase().indexOf(kw, pos)) !== -1) {
      count++;
      pos += kw.length;
    }
    console.log(`  Keyword "${kw}": ${count} occurrences`);
  }
}

search('index-CG1_IeQ2.js', indexJs);
search('routes-Bu26TP8z.js', routesJs);

// Let's print out context around "omni-open-widget-btn" in routesJs or indexJs
function printSnippet(text, pattern) {
  const idx = text.indexOf(pattern);
  if (idx !== -1) {
    console.log(`\n--- Snippet for ${pattern} ---`);
    console.log(text.slice(Math.max(0, idx - 200), Math.min(text.length, idx + 400)));
  }
}

printSnippet(indexJs, 'omni-open-widget-btn');
printSnippet(routesJs, 'omni-open-widget-btn');

