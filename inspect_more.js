const fs = require('fs');

const html = fs.readFileSync('ref_index.html', 'utf8');

// Find all elements after section 8
const endOfLastSection = html.lastIndexOf('</section>');
const afterSections = html.slice(endOfLastSection + 10);
console.log('After sections snippet (first 3000 chars):');
console.log(afterSections.slice(0, 3000));

// Find footer
const footerMatch = html.match(/<footer[^>]*>.*?<\/footer>/s);
if (footerMatch) {
  console.log('\n--- FOOTER ---');
  console.log(footerMatch[0]);
}

// Find any dialogs, modals, or templates
const dialogs = html.match(/<dialog[^>]*>.*?<\/dialog>/gs);
console.log('\nDialogs count:', dialogs ? dialogs.length : 0);

// Check all button labels or IDs
const buttons = html.match(/<button[^>]*>.*?<\/button>/gs);
console.log('\nButtons count:', buttons ? buttons.length : 0);
if (buttons) {
  buttons.forEach((b, i) => {
    const text = b.replace(/<[^>]+>/g, '').trim();
    const id = b.match(/id="([^"]+)"/);
    console.log(`Button ${i}: [id=${id ? id[1] : 'none'}] text="${text}"`);
  });
}
