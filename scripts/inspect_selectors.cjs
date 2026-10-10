const fs = require('fs');
const html = fs.readFileSync('public/landing-pages/kage.html', 'utf8');

const scriptMatch = html.match(/<script(?![^>]*src)[^>]*>([\s\S]*?)<\/script>/i);
if (scriptMatch) {
  const code = scriptMatch[1];
  const qsMatches = [...code.matchAll(/(querySelector(?:All)?|getElementById)\s*\(\s*['"`]([^'"`]+)['"`]\s*\)/g)];
  console.log('DOM queries in script:');
  const unique = new Set(qsMatches.map(m => m[2]));
  console.log([...unique]);
}
