const fs = require('fs');
const path = require('path');

const kagePath = path.resolve('public/landing-pages/kage.html');
let html = fs.readFileSync(kagePath, 'utf8');

// 1. Update Title and Meta
html = html.replace(
  /<title>[\s\S]*?<\/title>/i,
  '<title>Dream Properties × Interior Studio | Luxury Interior Design & Home Staging · Kanpur</title>\n  <meta name="description" content="Kanpur\'s premier bespoke interior design and home staging partnership with Dream Properties in Swaroop Nagar. Turnkey residential interiors, modular kitchens, 3D renders, and commercial fit-outs.">'
);

// 2. Add extra CSS styles for contact form, social proof badges, whatsapp button, and language toggle
const customCss = `
/* === Dream Properties Partnership & Contact Form Additions === */
.lang-toggle-wrap {
  margin-left: 16px;
  display: inline-flex;
  align-items: center;
}
.lang-toggle-btn {
  background: rgba(223,231,224,0.06);
  border: 1px solid var(--line);
  color: var(--bone-dim);
  font-family: inherit;
  font-size: 13px;
  font-weight: 500;
  padding: 6px 14px;
  border-radius: 999px;
  cursor: pointer;
  transition: all .24s var(--ease);
}
.lang-toggle-btn:hover {
  border-color: var(--vermilion);
  color: var(--bone);
  background: rgba(224,35,28,0.08);
}
.lang-toggle-btn .active {
  color: var(--vermilion);
  font-weight: 600;
}
.hero-cta-line {
  margin-top: 28px;
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}
.hero-btn {
  margin-top: 0 !important;
}
.trust-badge {
  font-size: 13px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--bone-dim);
  border-left: 2px solid var(--vermilion);
  padding-left: 12px;
}
.services-subgrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 12px;
  margin-top: 36px;
  width: 100%;
}
.sub-service-pill {
  padding: 14px 18px;
  background: rgba(10,14,18,0.7);
  border: 1px solid var(--line);
  border-radius: 8px;
  font-size: 14px;
  color: var(--bone);
  backdrop-filter: blur(8px);
  transition: border-color .24s ease;
}
.sub-service-pill:hover {
  border-color: var(--vermilion);
}
.social-proof-badges {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin: 36px 0 24px;
  flex-wrap: wrap;
}
.proof-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 18px 28px;
  background: rgba(10,14,18,0.75);
  border: 1px solid var(--line);
  border-radius: 12px;
  backdrop-filter: blur(10px);
}
.rating-num {
  font-size: 28px;
  font-weight: 500;
  color: var(--bone);
  letter-spacing: -0.02em;
}
.rating-stars {
  font-size: 15px;
  color: #ffb830;
  margin: 4px 0 2px;
}
.rating-src {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
}
.contact-sec {
  max-width: 1240px;
  margin: 0 auto;
  padding: 80px var(--pad);
  position: relative;
  z-index: 10;
}
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  margin-top: 36px;
  align-items: start;
}
@media (max-width: 860px) {
  .contact-grid { grid-template-columns: 1fr; gap: 40px; }
}
.contact-channels {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin: 28px 0;
}
.contact-btn {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 14px 22px;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 400;
  text-decoration: none;
  transition: all .25s var(--ease);
}
.wa-btn {
  background: rgba(37, 211, 102, 0.12);
  border: 1px solid rgba(37, 211, 102, 0.4);
  color: #55ef8e;
}
.wa-btn:hover {
  background: rgba(37, 211, 102, 0.22);
  border-color: #25d366;
  color: #fff;
  transform: translateY(-2px);
}
.phone-btn {
  background: rgba(223, 231, 224, 0.06);
  border: 1px solid var(--line);
  color: var(--bone);
}
.phone-btn:hover {
  border-color: var(--vermilion);
  background: rgba(224, 35, 28, 0.1);
  transform: translateY(-2px);
}
.office-card {
  padding: 24px;
  background: rgba(10,14,18,0.7);
  border: 1px solid var(--line);
  border-radius: 12px;
  backdrop-filter: blur(10px);
}
.office-card h4 {
  margin: 0 0 8px;
  font-size: 17px;
  font-weight: 500;
  color: var(--bone);
}
.office-card .addr {
  font-size: 14px;
  color: var(--bone-dim);
  line-height: 1.5;
  margin: 0 0 10px;
}
.office-card .hours {
  font-size: 13px;
  color: #c9a24a;
  margin: 0 0 14px;
}
.maps-link {
  display: inline-flex;
  align-items: center;
  color: var(--vermilion);
  font-size: 14px;
  text-decoration: none;
  font-weight: 500;
  transition: color .2s ease;
}
.maps-link:hover {
  color: var(--ember);
  text-decoration: underline;
}
.contact-form-wrap {
  padding: 32px;
  background: rgba(10,14,18,0.8);
  border: 1px solid var(--line);
  border-radius: 16px;
  backdrop-filter: blur(14px);
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
}
.form-title {
  margin: 0 0 6px;
  font-size: 22px;
  font-weight: 400;
  color: var(--bone);
}
.form-sub {
  margin: 0 0 24px;
  font-size: 14px;
  color: var(--muted);
}
.enquiry-form .form-group {
  margin-bottom: 18px;
}
.enquiry-form label {
  display: block;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--bone-dim);
  margin-bottom: 6px;
}
.enquiry-form input,
.enquiry-form select,
.enquiry-form textarea {
  width: 100%;
  padding: 12px 14px;
  background: rgba(5,7,10,0.8);
  border: 1px solid var(--line);
  border-radius: 8px;
  color: var(--bone);
  font-family: inherit;
  font-size: 14px;
  outline: none;
  transition: border-color .2s ease;
}
.enquiry-form input:focus,
.enquiry-form select:focus,
.enquiry-form textarea:focus {
  border-color: var(--vermilion);
}
.enquiry-form select {
  cursor: pointer;
}
.enquiry-form select option {
  background: #0a0e12;
  color: #dfe7e0;
}
.submit-btn {
  width: 100%;
  margin-top: 10px;
  padding: 14px 20px;
  background: var(--vermilion);
  border: none;
  border-radius: 999px;
  color: #fff;
  font-family: inherit;
  font-size: 15px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  transition: all .24s var(--ease);
}
.submit-btn:hover {
  background: var(--ember);
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(224,35,28,0.35);
}
`;

html = html.replace('</style>', `${customCss}\n</style>`);

// 3. Update Brand in Nav
html = html.replace(
  '<span class="brand-tx"><b>KAGE</b><i>HIDDEN REALMS OF KYOTO</i></span>',
  '<span class="brand-tx"><b>DREAM PROPERTIES × ATELIER</b><i>INTERIOR ARCHITECTURE · KANPUR</i></span>'
);

// 4. Update Nav Links & Add Hindi toggle
const newNavLinks = `<nav class="nav-links" id="navlinks">
    <a class="nav-link" href="#gate" data-cursor><span>Approach</span><span class="alt">दृष्टिकोण</span></a>
    <a class="nav-link" href="#pathways" data-cursor><span>Services</span><span class="alt">सेवाएं</span></a>
    <a class="nav-link" href="#lessons" data-cursor><span>Partnership</span><span class="alt">साझेदारी</span></a>
    <a class="nav-link" href="#contact" data-cursor><span>Contact</span><span class="alt">संपर्क</span></a>
  </nav>
  <div class="lang-toggle-wrap">
    <button class="lang-toggle-btn" id="langToggle" aria-label="Toggle Hindi language" data-cursor>
      <span class="en-label active">EN</span> / <span class="hi-label">हिन्दी</span>
    </button>
  </div>`;

html = html.replace(/<nav class="nav-links" id="navlinks">[\s\S]*?<\/nav>/i, newNavLinks);

// 5. Update Section 0 (Hero)
const newHeroContent = `<section class="hero" id="hero" data-cam="0">
  <div class="hero-top">
    <div class="eyebrow" data-rv="fade"><span class="dot"></span> Partnered with Dream Properties · Kanpur</div>
    <h1 class="display h-hero">
      <span class="mask-line"><span data-en="Spaces that sell." data-hi="बिकने वाले स्थान।">Spaces that sell.</span></span>
      <span class="mask-line"><span data-en="Homes that" data-hi="हमेशा टिकने वाले">Homes that</span></span>
      <span class="mask-line"><span data-en="last." data-hi="सुंदर घर।">last.</span></span>
    </h1>
    <p class="hero-sub body" data-rv="up" data-en="Kanpur's premier interior design practice in strategic partnership with Dream Properties. Turnkey residential interiors, bespoke modular living, and high-yield property staging across Swaroop Nagar, Civil Lines, and prime Kanpur sectors." data-hi="ड्रीम प्रॉपर्टीज के साथ कानपुर की प्रमुख इंटीरियर डिजाइन साझेदारी। स्वरूप नगर और सिविल लाइंस में टर्नकी आवासीय इंटीरियर और उच्च मूल्य वाली होम स्टेजिंग।">
      Kanpur's premier interior design practice in strategic partnership with Dream Properties. Turnkey residential interiors, bespoke modular living, and high-yield property staging across Swaroop Nagar, Civil Lines, and prime Kanpur sectors.
    </p>
    <div class="hero-cta-line" data-rv="up">
      <a class="cta hero-btn" href="#contact" data-cursor>
        <i></i><span>Book a free site visit</span>
        <svg viewBox="0 0 14 14" fill="none" width="13" height="13"><path d="M3 11 11 3M5 3h6v6" stroke="#dfe7e0" stroke-width="1.3"/></svg>
      </a>
      <span class="trust-badge">Trusted by Kanpur's property professionals</span>
    </div>
  </div>

  <div class="hero-spacer"></div>

  <div class="hero-foot">
    <div class="hero-cue" data-rv="fade"><span>Scroll to explore</span><span class="track"><i></i></span></div>
    <div class="chapters" id="chips">
      <div class="chip" data-chip="0" data-rv="up" data-cursor><span class="num">01</span>
        <span class="tx"><b>Consult & Site Visit</b><p>Free spatial assessment aligned to your investment goals.</p></span></div>
      <div class="chip" data-chip="1" data-rv="up" data-cursor><span class="num">02</span>
        <span class="tx"><b>3D Visualisation</b><p>Photorealistic 3D renders before any work begins.</p></span></div>
      <div class="chip" data-chip="2" data-rv="up" data-cursor><span class="num">03</span>
        <span class="tx"><b>Turnkey Fit-Out</b><p>Civil, modular joinery, and premium interior execution.</p></span></div>
      <div class="chip" data-chip="3" data-rv="up" data-cursor><span class="num">04</span>
        <span class="tx"><b>Seamless Handover</b><p>Snag-free move-in warranty for every property buyer.</p></span></div>
    </div>
  </div>

  <a class="peek" href="#gate" data-view="3" data-rv="fade" data-cursor aria-label="Dream Properties Partner Office">
    <span class="peek-fr" data-frame></span>
    <span class="peek-play"><svg viewBox="0 0 22 22" fill="none"><path d="M8 5.6 16.4 11 8 16.4z" fill="#dfe7e0"/></svg></span>
    <span class="peek-cap"><b class="jp">कानपुर</b><i>Dream Properties · Swaroop Nagar</i></span>
  </a>

  <div class="word-fb" aria-hidden="true">DREAM</div>

  <div class="hero-side" data-rv="up">
    <span class="v jp">कानपुर इंटीरियर</span>
  </div>
</section>`;

html = html.replace(/<section class="hero" id="hero" data-cam="0">[\s\S]*?<\/section>/i, newHeroContent);

// 6. Update Section 1 (Gate -> Approach)
const newGateContent = `<section class="sec" id="gate" data-cam="1">
  <div class="fg" data-fg="gate" aria-hidden="true">
    <span class="fg-el fg-wall" data-fg-in="left">
      <img src="secret-pathways-assets/foreground/png/temple-wall.webp" alt="" width="1536" height="884" loading="lazy" decoding="async">
    </span>
    <span class="fg-el fg-pine" data-fg-in="right">
      <img src="secret-pathways-assets/foreground/png/pine-tree.webp" alt="" width="1024" height="1438" loading="lazy" decoding="async">
    </span>
    <span class="fg-el fg-grass" data-fg-in="up">
      <img src="secret-pathways-assets/foreground/png/tall-grass.webp" alt="" width="1717" height="916" loading="lazy" decoding="async">
    </span>
  </div>
  <div class="sec-head" data-rv="fade">
    <span class="k"><b>01</b> — Our 5-Step Approach</span><span class="rule"></span><span class="k jp">दृष्टिकोण</span>
  </div>
  <div class="gate-grid">
    <h2 class="display h-sec" data-rv="up">Consult. Design. 3D Render. Execute. Handover.</h2>
    <div class="gate-copy">
      <p class="lead" data-rv="up">Every space begins with a rigorous consultation: understanding buyer intent, rental yield targets, or long-term family lifestyle. In partnership with Dream Properties, we combine 11 years of Kanpur market insight with bespoke interior architecture.</p>
      <p class="body" data-rv="up">From high-resolution 3D visualizations to precision modular carpentry and on-site civil works, our turnkey methodology ensures what you approve on screen is delivered down to the millimeter—on schedule, within budget, and with complete accountability.</p>
      <a class="arrowlink" href="#pathways" data-rv="fade" data-cursor>
        <span>Explore Our Services</span>
        <span class="ar"><svg viewBox="0 0 14 14" fill="none"><path d="M3 11 11 3M5 3h6v6" stroke="#dfe7e0" stroke-width="1.3"/></svg></span>
      </a>
    </div>
  </div>
  <div class="gate-stats" data-rv="up">
    <div><b>11+</b><span>Years Real Estate Legacy</span></div>
    <div><b>4.9★</b><span>Justdial Rating (81 Votes)</span></div>
    <div><b>5.0★</b><span>Google Rating (70 Reviews)</span></div>
    <div><b>100%</b><span>Turnkey Delivery</span></div>
  </div>
</section>`;

html = html.replace(/<section class="sec" id="gate" data-cam="1">[\s\S]*?<\/section>/i, newGateContent);

// 7. Update Section 2 (Pathways -> Services)
const newPathwaysContent = `<section class="sec" id="pathways" data-cam="2">
  <div class="fg" data-fg="pathways" aria-hidden="true">
    <span class="fg-el fg-sakura fg-el--sway" data-fg-in="left">
      <img src="secret-pathways-assets/foreground/png/sakura-branch.webp" alt="" width="1536" height="1024" loading="lazy" decoding="async">
    </span>
    <span class="fg-el fg-leaves fg-el--sway" data-fg-in="right">
      <img src="secret-pathways-assets/foreground/png/maple-leaves.webp" alt="" width="1536" height="1024" loading="lazy" decoding="async">
    </span>
    <span class="fg-el fg-lantern" data-fg-in="up">
      <img src="secret-pathways-assets/foreground/png/stone-lantern.webp" alt="" width="1024" height="1499" loading="lazy" decoding="async">
    </span>
    <span class="fg-el fg-bush" data-fg-in="up">
      <img src="secret-pathways-assets/foreground/png/garden-bush.webp" alt="" width="1717" height="876" loading="lazy" decoding="async">
    </span>
  </div>
  <div class="sec-head" data-rv="fade">
    <span class="k"><b>02</b> — Comprehensive Services</span><span class="rule"></span><span class="k jp">सेवाएं</span>
  </div>
  <div class="cards" id="cards">
    <article class="card" data-rv="up" data-view="0" data-cursor>
      <div class="card-fr" data-frame>
        <span class="card-ar"><svg viewBox="0 0 14 14" fill="none"><path d="M3 11 11 3M5 3h6v6" stroke="#dfe7e0" stroke-width="1.3"/></svg></span>
        <i class="glow" style="--gx:80.2%; --gy:23.9%; --gr:22%; --gt:6.1s; --gt2:9.7s; --gc1:rgba(255,142,108,.50); --gc2:rgba(212,56,38,.24)"></i>
        <div class="card-lab"><b>Home Staging & Rental-Ready</b><span class="jp">तैयार घर</span></div>
      </div>
      <div class="card-meta"><span>Faster sales & rentals</span><span>01 / 03</span></div>
    </article>
    <article class="card" data-rv="up" data-view="1" data-cursor>
      <div class="card-fr" data-frame>
        <span class="card-ar"><svg viewBox="0 0 14 14" fill="none"><path d="M3 11 11 3M5 3h6v6" stroke="#dfe7e0" stroke-width="1.3"/></svg></span>
        <i class="glow glow--flame" style="--gx:70.5%; --gy:47.2%; --gr:14%; --gt:3.7s; --gt2:5.3s; --gc1:rgba(255,198,124,.62); --gc2:rgba(226,118,40,.30)"></i>
        <div class="card-lab"><b>Turnkey Interiors & Modular Systems</b><span class="jp">मॉड्यूलर</span></div>
      </div>
      <div class="card-meta"><span>Modular kitchens & wardrobes</span><span>02 / 03</span></div>
    </article>
    <article class="card" data-rv="up" data-view="2" data-cursor>
      <div class="card-fr" data-frame>
        <span class="card-ar"><svg viewBox="0 0 14 14" fill="none"><path d="M3 11 11 3M5 3h6v6" stroke="#dfe7e0" stroke-width="1.3"/></svg></span>
        <i class="glow" style="--gx:48.0%; --gy:16.8%; --gr:20%; --gt:7.3s; --gt2:11.2s; --gc1:rgba(255,138,104,.52); --gc2:rgba(208,54,36,.24)"></i>
        <div class="card-lab"><b>Commercial & Hotel-Lease Fit-Outs</b><span class="jp">व्यावसायिक</span></div>
      </div>
      <div class="card-meta"><span>Retail, hotels & industrial</span><span>03 / 03</span></div>
    </article>
  </div>
  <div class="services-subgrid" data-rv="up">
    <div class="sub-service-pill"><span>• Home Staging for Resale Properties</span></div>
    <div class="sub-service-pill"><span>• Rental-Ready Furnishing Packages</span></div>
    <div class="sub-service-pill"><span>• Turnkey Interiors for New Home Buyers</span></div>
    <div class="sub-service-pill"><span>• Commercial & Hotel-Lease Fit-Outs</span></div>
    <div class="sub-service-pill"><span>• Modular Kitchens & Wardrobe Suites</span></div>
    <div class="sub-service-pill"><span>• Vastu-Aware & Ergonomic Space Planning</span></div>
  </div>
</section>`;

html = html.replace(/<section class="sec" id="pathways" data-cam="2">[\s\S]*?<\/section>/i, newPathwaysContent);

// 8. Update Section 3 (Lessons -> Partnership with Dream Properties)
const newLessonsContent = `<section class="sec" id="lessons" data-cam="3">
  <div class="fg" data-fg="lessons" aria-hidden="true">
    <span class="fg-el fg-wall fg-el--flip" data-fg-in="right">
      <img src="secret-pathways-assets/foreground/png/temple-wall.webp" alt="" width="1536" height="884" loading="lazy" decoding="async">
    </span>
    <span class="fg-el fg-stones" data-fg-in="up">
      <img src="secret-pathways-assets/foreground/png/basalt-stones.webp" alt="" width="1536" height="996" loading="lazy" decoding="async">
    </span>
    <span class="fg-el fg-grass" data-fg-in="up">
      <img src="secret-pathways-assets/foreground/png/tall-grass.webp" alt="" width="1717" height="916" loading="lazy" decoding="async">
    </span>
  </div>
  <div class="sec-head" data-rv="fade">
    <span class="k"><b>03</b> — Partnership with Dream Properties</span><span class="rule"></span><span class="k jp">साझेदारी</span>
  </div>
  <div class="cur-head">
    <h2 class="display h-sec" data-rv="up">Faster sales, elevated lettings, lasting buyer value.</h2>
    <p class="body-lg" data-rv="up">A strategic alliance uniting Dream Properties' 11-year Kanpur real estate standing with high-end turnkey interior craftsmanship.</p>
  </div>
  <div class="cur" id="cur">
    <div class="les" data-les="0" data-cursor>
      <span class="k">01</span>
      <h3>Faster Sales and Lettings<em class="jp">त्वरित परिणाम</em></h3>
      <p>Staged and professionally fitted properties attract quality buyers up to 40% faster with significantly reduced holding periods.</p>
      <span class="t">Market Speed</span><i class="bar"></i>
    </div>
    <div class="les" data-les="1" data-cursor>
      <span class="k">02</span>
      <h3>Agency Referral Benefit<em class="jp">रेफरल लाभ</em></h3>
      <p>Mutual value creation with attractive referral commissions and dedicated project managers for Dream Properties clientele.</p>
      <span class="t">Partner Incentive</span><i class="bar"></i>
    </div>
    <div class="les" data-les="2" data-cursor>
      <span class="k">03</span>
      <h3>Co-Branded Catalogue<em class="jp">कैटलॉग</em></h3>
      <p>Exclusive lookbooks with pre-approved material palettes and modular layouts distributed directly to agency buyers.</p>
      <span class="t">Exclusive Access</span><i class="bar"></i>
    </div>
    <div class="les" data-les="3" data-cursor>
      <span class="k">04</span>
      <h3>Handover Package for Every Buyer<em class="jp">हैंडओवर किट</em></h3>
      <p>A comprehensive move-in kit, complete with 3D design concept, snag audit, and warranty documentation for every homeowner.</p>
      <span class="t">Turnkey Assurance</span><i class="bar"></i>
    </div>
    <div class="les" data-les="4" data-cursor>
      <span class="k">05</span>
      <h3>Vastu-Aware Layouts<em class="jp">वास्तु अनुकूल</em></h3>
      <p>Harmonizing spatial flow, natural ventilation, and Vastu principles tailored to the buyer's unique conditions and choice.</p>
      <span class="t">Vastu Harmony</span><i class="bar"></i>
    </div>
  </div>
</section>`;

html = html.replace(/<section class="sec" id="lessons" data-cam="3">[\s\S]*?<\/section>/i, newLessonsContent);

// 9. Update Section 4 (Eternity -> Social Proof)
const newEternityContent = `<section class="sec fin" id="eternity" data-cam="4">
  <div class="fg" data-fg="eternity" aria-hidden="true">
    <span class="fg-el fg-hill" data-fg-in="up">
      <img src="secret-pathways-assets/foreground/png/hill.webp" alt="" width="1774" height="887" loading="lazy" decoding="async">
    </span>
    <span class="fg-el fg-ruins" data-fg-in="left">
      <img src="secret-pathways-assets/foreground/png/shrine-ruins.webp" alt="" width="1536" height="1001" loading="lazy" decoding="async">
    </span>
    <span class="fg-el fg-grass" data-fg-in="up">
      <img src="secret-pathways-assets/foreground/png/tall-grass.webp" alt="" width="1717" height="916" loading="lazy" decoding="async">
    </span>
    <span class="fg-el fg-sakura" data-fg-in="left">
      <img src="secret-pathways-assets/foreground/png/sakura-branch.webp" alt="" width="1536" height="1024" loading="lazy" decoding="async">
    </span>
  </div>
  <div class="eyebrow" data-rv="fade">Verified Social Proof · Kanpur, UP</div>
  <h2 class="display" data-rv="up">Partnered with Dream Properties</h2>
  
  <div class="social-proof-badges" data-rv="up">
    <div class="proof-card">
      <span class="rating-num">4.9 / 5.0</span>
      <span class="rating-stars">★★★★★</span>
      <span class="rating-src">Justdial (81 votes)</span>
    </div>
    <div class="proof-card">
      <span class="rating-num">5.0 / 5.0</span>
      <span class="rating-stars">★★★★★</span>
      <span class="rating-src">Google (70 reviews)</span>
    </div>
    <div class="proof-card">
      <span class="rating-num">11 Years</span>
      <span class="rating-stars">★★★★★</span>
      <span class="rating-src">In Business (Kanpur)</span>
    </div>
  </div>

  <p class="body-lg" data-rv="up" style="max-width: 680px; margin: 0 auto 32px; text-align: center;">
    Fast, trustworthy, well-behaved staff, with sites matched to the buyer's own conditions and choice.
  </p>
  <a class="cta" href="#contact" data-rv="fade" data-cursor>
    <i></i><span>Book a free site visit</span>
    <svg viewBox="0 0 14 14" fill="none" width="13" height="13"><path d="M3 11 11 3M5 3h6v6" stroke="#dfe7e0" stroke-width="1.3"/></svg>
  </a>
</section>`;

html = html.replace(/<section class="sec fin" id="eternity" data-cam="4">[\s\S]*?<\/section>/i, newEternityContent);

// 10. Add Contact Section before Footer
const contactSection = `<section class="contact-sec" id="contact">
  <div class="sec-head" data-rv="fade">
    <span class="k"><b>04</b> — Contact & Consultation</span><span class="rule"></span><span class="k jp">संपर्क</span>
  </div>
  <div class="contact-grid">
    <div class="contact-info" data-rv="up">
      <h2 class="display h-sec">Book a free site visit.</h2>
      <p class="lead">Connect directly with our lead interior designer or speak with the Dream Properties partner office.</p>
      
      <div class="contact-channels">
        <a class="contact-btn wa-btn" href="https://wa.me/?text=Hello!%20I%20am%20interested%20in%20a%20free%20site%20visit%20via%20the%20Dream%20Properties%20interior%20design%20partnership." target="_blank" rel="noopener" data-cursor>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.18-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.762-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.062-2.148-.544-1.862-.777-3.048-2.673-3.14-2.796-.093-.123-.748-.996-.748-1.9 0-.904.47-1.348.636-1.531.166-.183.363-.23.484-.23.12 0 .241.002.348.007.113.005.263-.043.411.314.155.372.529 1.289.576 1.383.047.094.078.204.016.328-.063.125-.094.204-.187.313-.094.11-.197.245-.281.33-.094.094-.192.196-.083.383.11.188.488.806 1.047 1.303.719.64 1.325.839 1.513.932.188.094.298.079.407-.047.11-.125.469-.547.594-.734.125-.188.25-.157.422-.094.172.063 1.094.516 1.281.609.188.094.313.141.359.219.047.078.047.453-.097.858z"/></svg>
          <span>WhatsApp Designer: [ADD]</span>
        </a>
        
        <a class="contact-btn phone-btn" href="tel:08299058827" data-cursor>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          <span>Partner Office: 082990 58827</span>
        </a>
      </div>

      <div class="office-card">
        <h4>Dream Properties (Partner Office)</h4>
        <p class="addr">113/182, near KVM Inter College, Khalasi Line, Swaroop Nagar, Kanpur, UP 208002</p>
        <p class="hours">⏰ Hours: Open until 7:00 PM</p>
        <a class="maps-link" href="https://maps.google.com/?q=Dream+Properties+113/182+near+KVM+Inter+College+Khalasi+Line+Swaroop+Nagar+Kanpur+UP+208002" target="_blank" rel="noopener" data-cursor>
          <span>Open in Google Maps ↗</span>
        </a>
      </div>
    </div>

    <div class="contact-form-wrap" data-rv="up">
      <form class="enquiry-form" id="enquiryForm" onsubmit="event.preventDefault(); alert('Site visit enquiry submitted successfully. We will call you shortly!');">
        <h3 class="form-title">Enquiry & Consultation Form</h3>
        <p class="form-sub">Direct pitch to Dream Properties clients and investors.</p>
        
        <div class="form-group">
          <label for="clientName">Full Name</label>
          <input type="text" id="clientName" required placeholder="Your Name" />
        </div>
        
        <div class="form-group">
          <label for="clientPhone">Phone Number</label>
          <input type="tel" id="clientPhone" required placeholder="Mobile Number" />
        </div>
        
        <div class="form-group">
          <label for="propType">Property Requirement</label>
          <select id="propType" required>
            <option value="turnkey">Turnkey Interiors for New Buyer</option>
            <option value="staging">Home Staging for Faster Sale</option>
            <option value="rental">Rental-Ready Furnishing</option>
            <option value="commercial">Commercial or Hotel-Lease Fit-Out</option>
            <option value="modular">Modular Kitchen & Wardrobes</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="clientNotes">Location / Property Details</label>
          <textarea id="clientNotes" rows="3" placeholder="Swaroop Nagar, Civil Lines, or other area"></textarea>
        </div>
        
        <button type="submit" class="submit-btn" data-cursor>
          <span>Submit Free Site Visit Request</span>
          <svg viewBox="0 0 14 14" fill="none" width="13" height="13"><path d="M3 11 11 3M5 3h6v6" stroke="#dfe7e0" stroke-width="1.3"/></svg>
        </button>
      </form>
    </div>
  </div>
</section>`;

html = html.replace('<footer class="foot"', `${contactSection}\n<footer class="foot"`);

// 11. Update Footer
const newFootGrid = `<div class="foot-grid">
    <div class="foot-brand">
      <svg viewBox="0 0 44 44" fill="none" width="34" height="34" aria-hidden="true">
        <circle cx="22" cy="25" r="8.6" fill="#e0231c" fill-opacity=".9"/>
        <path d="M5 13h34M9 18.4h26M22 8.5v27" stroke="#dfe7e0" stroke-width="1.5"/>
      </svg>
      <p>Interior design and home staging studio in partnership with Dream Properties. 11 years of real estate trust in Swaroop Nagar, Kanpur.</p>
    </div>
    <div><h4>Navigation</h4><ul>
      <li><a href="#hero" data-cursor>Hero</a></li>
      <li><a href="#gate" data-cursor>Approach</a></li>
      <li><a href="#pathways" data-cursor>Services</a></li>
      <li><a href="#lessons" data-cursor>Partnership</a></li>
    </ul></div>
    <div><h4>Services</h4><ul>
      <li><a href="#pathways" data-cursor>Home Staging</a></li>
      <li><a href="#pathways" data-cursor>Rental Furnishing</a></li>
      <li><a href="#pathways" data-cursor>Turnkey Interiors</a></li>
      <li><a href="#pathways" data-cursor>Modular Kitchens</a></li>
    </ul></div>
    <div><h4>Office</h4><ul>
      <li><a href="#contact" data-cursor>113/182 Swaroop Nagar</a></li>
      <li><a href="tel:08299058827" data-cursor>Call 082990 58827</a></li>
      <li><a href="https://maps.google.com/?q=Dream+Properties+Swaroop+Nagar+Kanpur" target="_blank" data-cursor>Google Maps Link</a></li>
      <li><a href="#contact" data-cursor>Open until 7:00 PM</a></li>
    </ul></div>
  </div>
  <div class="foot-base">
    <span>© 2026 Dream Properties × Interior Studio</span>
    <span class="jp">स्थान जो बिकते हैं · घर जो टिकते हैं</span>
    <span>Swaroop Nagar · Kanpur · UP 208002</span>
  </div>`;

html = html.replace(/<div class="foot-grid">[\s\S]*?<\/footer>/i, `${newFootGrid}\n</footer>`);

// 12. Add Hindi Toggle Interactive Script right before </body>
const toggleScript = `
<script>
// Optional Hindi toggle script
(function() {
  const toggleBtn = document.getElementById('langToggle');
  if (!toggleBtn) return;
  
  let isHindi = false;
  const enLabel = toggleBtn.querySelector('.en-label');
  const hiLabel = toggleBtn.querySelector('.hi-label');
  
  toggleBtn.addEventListener('click', function() {
    isHindi = !isHindi;
    if (enLabel && hiLabel) {
      enLabel.classList.toggle('active', !isHindi);
      hiLabel.classList.toggle('active', isHindi);
    }
    
    document.querySelectorAll('[data-en]').forEach(el => {
      el.textContent = isHindi ? el.getAttribute('data-hi') : el.getAttribute('data-en');
    });
  });
})();
</script>
`;

html = html.replace('</body>', `${toggleScript}\n</body>`);

fs.writeFileSync(kagePath, html, 'utf8');
console.log('Successfully updated public/landing-pages/kage.html with Dream Properties partnership copy and contact features!');
