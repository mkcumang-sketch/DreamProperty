const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../public/landing-pages/kage.html');
let html = fs.readFileSync(filePath, 'utf8');

// 1. Hide internal nav via CSS
if (!html.includes('.nav{ display: none !important;')) {
  html = html.replace('.nav{', '.nav{ display: none !important; ');
}

// 2. Replace hero-top contents
const startMarker = '<div class="hero-top">';
const endMarker = '</div>\n\n  <div class="hero-spacer">';

const startIndex = html.indexOf(startMarker);
const endIndex = html.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  const newHeroTop = `<div class="hero-top">
    <div class="eyebrow" data-rv="fade"><span class="dot"></span> Partnered with Dream Properties · Kanpur</div>
    <h1 class="display h-hero">
      <span class="mask-line"><span data-en="Spaces that sell." data-hi="बिकने वाले स्थान।">Spaces that sell.</span></span>
      <span class="mask-line"><span data-en="Homes that last." data-hi="टिकाऊ और सुंदर घर।">Homes that last.</span></span>
    </h1>
    <p class="hero-sub body" data-rv="up" data-en="Interiors for Kanpur homes, with Dream Properties." data-hi="ड्रीम प्रॉपर्टीज के साथ कानपुर के सुंदर घर।">
      Interiors for Kanpur homes, with Dream Properties.
    </p>
    <div class="hero-cta-line" data-rv="up">
      <a class="cta hero-btn" href="#contact" data-cursor>
        <i></i><span data-en="Book a free site visit" data-hi="मुफ्त साइट विजिट बुक करें">Book a free site visit</span>
        <svg viewBox="0 0 14 14" fill="none" width="13" height="13"><path d="M3 11 11 3M5 3h6v6" stroke="#dfe7e0" stroke-width="1.3"/></svg>
      </a>
    </div>
  </div>`;

  html = html.substring(0, startIndex) + newHeroTop + html.substring(endIndex + 6);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log('Successfully updated kage.html hero copy and internal nav!');
} else {
  console.error('Markers not found:', { startIndex, endIndex });
}
