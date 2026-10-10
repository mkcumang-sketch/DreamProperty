# Dream Properties Atelier — Interior Design Landing & Lead CRM

A high-performance, dark-themed interior architecture landing platform and lead capture CRM built for the strategic partnership between **[MY BUSINESS NAME]** (Interior Design Studio, Kanpur) and **Dream Properties** (11-Year Real Estate Consultancy, Swaroop Nagar, Kanpur).

Integrated with the ThreeUI **Kage** 3D theme (`@designcodeio/threeui`), bilingual English/Hindi localization, smooth motion pipelines, and a complete SQLite/Postgres-ready Prisma backend.

---

## 1. Quick Setup (6 Commands)

Run these commands in your shell to get the project fully running locally:

```bash
# 1. Install dependencies
npm install

# 2. Copy environment file
cp .env.example .env

# 3. Synchronize database schema (SQLite dev.db)
npm run db:push

# 4. Seed initial admin user and sample leads
npm run db:seed

# 5. Typecheck and verify compilation
npm run typecheck

# 6. Start the development server
npm run dev
```

The application will be live at: **http://localhost:3000**
Admin Portal: **http://localhost:3000/admin**
(Default seeded credentials: `admin@dreamproperties.in` / `admin123`)

---

## 2. Generating a Secure Admin Password Hash

To change the admin password or generate a new bcrypt hash:

```bash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('YourNewPasswordHere', 10));"
```

Paste the generated string into your `.env` file:
```env
ADMIN_PASSWORD_HASH="$2b$10$..."
```

---

## 3. Editing Copy & Content (`src/config/`)

All copy, telephone numbers, addresses, and services are centralized in typed configuration files so you can edit the entire website from one place:

- **`src/config/site.ts`**: Studio name, phone (`082990 58827`), partner location, verified Google/Justdial ratings, stats, brand partners, and social handles.
- **`src/config/nav.ts`**: Navigation links with bilingual English and Hindi labels.
- **`src/config/services.ts`**: The 6 core interior services, benefits, tags, and bullet points.
- **`src/config/process.ts`**: The 5-stage project execution protocol from site audit to handover.
- **`src/config/faq.ts`**: 8 comprehensive FAQs covering pricing, Vastu, materials, and warranties.
- **`src/lib/i18n/en.ts` & `hi.ts`**: Complete bilingual dictionaries.

---

## 4. Swapping Project Images

All media assets are organized in `public/`:

- **Portfolio Images**: Place your high-resolution photos in `public/images/placeholders/` (or your preferred CDN) and update the paths in `src/config/site.ts` (`portfolioItems`).
- **Hero & OpenGraph Banner**: Replace `public/og-image.jpg` with your hero interior render (recommended dimensions: 1200×630px).
- **Brand Icons / Favicon**: Replace `public/favicon.svg` with your studio's logo mark.

---

## 5. Deployment Guide

### Deploying to Vercel (Recommended)
1. Push your repository to GitHub.
2. Import the project into Vercel.
3. Configure the environment variables:
   - `SESSION_SECRET`: A 64-character random hex string.
   - `ADMIN_PASSWORD_HASH`: Your bcrypt password hash.
   - `NEXT_PUBLIC_SITE_URL`: Your production domain (e.g. `https://atelier.dreamproperties.in`).
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`: Partner WhatsApp number in international format (e.g. `918299058827`).
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `NOTIFY_EMAIL`: For instant email alerts.
   - For PostgreSQL production storage: Update `DATABASE_URL="postgresql://user:pass@host:5432/dbname"` and set `provider = "postgresql"` in `prisma/schema.prisma`.
4. Deploy!

### Deploying to a Linux VPS (Ubuntu + Node + Nginx / PM2)
```bash
git clone <repo>
cd DreamProperties
npm install
npm run build
pm2 start npm --name "dream-properties" -- start
```

---

## 6. Client Asset & Handover Checklist

Before launching to live traffic, the client should provide and confirm:
- [ ] **Official Studio Logo**: Vector SVG or high-res transparent PNG.
- [ ] **6–10 Real Project Photos**: High-resolution photography of finished Kanpur projects to replace temple theme placeholders.
- [ ] **Pricing Tiers**: Confirmation of per-sqft pricing or minimum turnkey engagement sizes.
- [ ] **Dedicated WhatsApp Number**: The mobile number that will receive incoming client chats.
- [ ] **SMTP Credentials**: Gmail App Password or AWS SES / SendGrid credentials for `NOTIFY_EMAIL`.
- [ ] **Client-Approved Testimonials**: Signed quotes from real homeowners/commercial clients once approved.
- [ ] **Social Profiles**: Links to active Instagram, Facebook, and LinkedIn business profiles.

---

## 7. Licensing & Commercial Notice

- **ThreeUI Kage Theme**: Built with `@designcodeio/threeui`. Please verify ThreeUI license terms before public commercial distribution.
- **Visual Assets**: The initial Japanese garden/temple assets in `public/landing-pages/` serve as technical demonstrators for the Three.js spatial canvas. Replace them with custom 3D architectural renders of your studio's actual Kanpur residential work prior to commercial promotion.
