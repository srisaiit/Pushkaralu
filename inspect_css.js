const fs = require('fs');

const css = fs.readFileSync('ref_assets/styles-CSpuwj4Y.css', 'utf8');
console.log('CSS length:', css.length);

// Extract :root and .dark variables
const rootMatch = css.match(/:root\s*\{[^}]+\}/);
if (rootMatch) {
  console.log('--- :root variables ---');
  console.log(rootMatch[0]);
}

const darkMatch = css.match(/\.dark\s*\{[^}]+\}/);
if (darkMatch) {
  console.log('--- .dark variables ---');
  console.log(darkMatch[0]);
}

// Find keyframe animations and utility classes
const animations = css.match(/@keyframes\s+[\w-]+\s*\{[^}]+\}/g);
console.log('\nKeyframe animations:', animations ? animations.map(a => a.split('{')[0]) : []);

const classes = ['gradient-sunrise', 'gradient-river', 'shadow-glow', 'shadow-elegant', 'glass', 'animate-float-diya', 'animate-pulse-ring', 'animate-ticker', 'font-telugu', 'font-display', 'saffron'];
classes.forEach(c => {
  const m = css.match(new RegExp(`\\.${c}[^{]*\\{[^}]+\\}`, 'g'));
  console.log(`\n--- Class .${c} ---`);
  if (m) console.log(m.slice(0, 3).join('\n'));
});
