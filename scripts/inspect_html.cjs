const fs = require('fs');
const html = fs.readFileSync('public/landing-pages/kage.html', 'utf8');

let out = '';
const navMatch = html.match(/<nav[\s\S]*?<\/nav>/i);
out += '=== NAV ===\n' + (navMatch ? navMatch[0] : 'None') + '\n\n';

const headerMatch = html.match(/<header[\s\S]*?<\/header>/i);
out += '=== HEADER ===\n' + (headerMatch ? headerMatch[0] : 'None') + '\n\n';

const sections = [...html.matchAll(/<section([\s\S]*?)<\/section>/gi)];
sections.forEach((s, i) => {
  out += `\n=== SECTION ${i} ===\n` + s[0] + '\n';
});

const footerMatch = html.match(/<footer[\s\S]*?<\/footer>/i);
out += '\n=== FOOTER ===\n' + (footerMatch ? footerMatch[0] : 'None') + '\n';

fs.writeFileSync('scripts/structure.utf8.txt', out, 'utf8');
console.log('Saved structure to scripts/structure.utf8.txt');
