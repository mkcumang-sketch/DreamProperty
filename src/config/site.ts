import { PortfolioItem } from '@/types';

export const siteConfig = {
  name: '[MY BUSINESS NAME]',
  tradeName: 'Dream Properties × Interior Studio',
  description:
    "Kanpur's premier bespoke interior design studio in exclusive partnership with Dream Properties. Turnkey residential interiors, modular kitchens, home staging, and commercial fit-outs in Swaroop Nagar.",
  tagline: 'Spaces that sell. Homes that last.',
  subline: "Trusted by Kanpur's property professionals",
  phone: '082990 58827',
  email: 'contact@dreamproperties.in',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '918299058827',
  
  partner: {
    name: 'Dream Properties',
    businessType: 'Real Estate Agency & Property Advisory',
    experienceYears: 11,
    phone: '082990 58827',
    phoneFormatted: '+91 82990 58827',
    location: '113/182 Swaroop Nagar, Kanpur',
    address: '113/182, near KVM Inter College, Khalasi Line, Swaroop Nagar, Kanpur, UP 208002',
    hours: 'Open until 7:00 PM (Mon-Sat)',
    justdialRating: 4.9,
    justdialVotes: 81,
    googleRating: 5.0,
    googleReviews: 70,
    googleMapsUrl: 'https://maps.google.com/?q=Dream+Properties+113/182+near+KVM+Inter+College+Khalasi+Line+Swaroop+Nagar+Kanpur+UP+208002',
    services: [
      'Residential and commercial rentals and sales',
      'Hotel leases and hospitality spaces',
      'Industrial and retail commercial properties',
    ],
    strengths: [
      'Fast, reliable, and transparent site visits',
      'Trustworthy, verified property documentation',
      'Well-behaved, highly knowledgeable staff',
      'Properties matched precisely to buyer conditions and choice',
    ],
  },

  stats: [
    { value: 180, suffix: '+', label: 'Projects Delivered', labelHi: 'सफल प्रोजेक्ट्स', isPlaceholder: true },
    { value: 11, suffix: '+', label: 'Years Agency Legacy', labelHi: 'वर्षों का अनुभव', isPlaceholder: false },
    { value: 240, suffix: '+', label: 'Happy Families', labelHi: 'संतुष्ट परिवार', isPlaceholder: true },
    { value: 45, suffix: ' Days', label: 'Avg Handover Timeline', labelHi: 'औसत हैंडओवर समय', isPlaceholder: true },
  ],

  portfolioCategories: ['All', 'Residential', 'Commercial', 'Staging'] as const,

  portfolioItems: [
    {
      id: 'swaroop-nagar-penthouse',
      title: 'Swaroop Nagar 4-BHK Penthouse',
      titleHi: 'स्वरूप नगर 4-BHK पेंटहाउस',
      category: 'Residential',
      location: 'Swaroop Nagar, Kanpur',
      image: '/landing-pages/secret-pathways-assets/generated/kage-sanmon-preview.webp',
      description: 'Turnkey luxury interior with acoustic wall panelling, custom brass joinery, and warm ambient lighting.',
      tag: 'Turnkey Living',
    },
    {
      id: 'civil-lines-villa',
      title: 'Civil Lines Heritage Bungalow Staging',
      titleHi: 'सिविल लाइंस हेरिटेज बंगला स्टेजिंग',
      category: 'Staging',
      location: 'Civil Lines, Kanpur',
      image: '/landing-pages/secret-pathways-assets/generated/kage-approach.webp',
      description: 'High-value staging for Dream Properties buyer walkthrough; sold within 18 days of staging.',
      tag: 'Fast Resale',
    },
    {
      id: 'khalasi-line-kitchen',
      title: 'Modular Kitchen & Walk-In Suites',
      titleHi: 'मॉड्यूलर किचन एवं वॉक-इन सुइट्स',
      category: 'Residential',
      location: 'Khalasi Line, Swaroop Nagar',
      image: '/landing-pages/secret-pathways-assets/generated/kage-lantern-court.webp',
      description: 'Anti-scratch acrylic finish, Blum servo-drive fittings, and quartz countertop with breakfast counter.',
      tag: 'Modular Excellence',
    },
    {
      id: 'mall-road-boutique',
      title: 'Mall Road Corporate Executive Lounge',
      titleHi: 'माल रोड कॉर्पोरेट एग्जीक्यूटिव लाउंज',
      category: 'Commercial',
      location: 'Mall Road, Kanpur',
      image: '/landing-pages/secret-pathways-assets/generated/kage-moonwater.webp',
      description: 'Sound-dampened conference rooms, ergonomic workstations, and bespoke reception desk.',
      tag: 'Corporate Fit-out',
    },
  ] as PortfolioItem[],

  brands: [
    'Hafele',
    'Blum',
    'Saint-Gobain',
    'Asian Paints Royale',
    'Greenlam',
    'CenturyPly',
    'Kohler',
    'Jaquar',
    'Hettich',
  ],

  social: {
    instagram: 'https://instagram.com/[EDIT_HANDLE]',
    facebook: 'https://facebook.com/[EDIT_HANDLE]',
    linkedin: 'https://linkedin.com/company/[EDIT_HANDLE]',
  },
};
