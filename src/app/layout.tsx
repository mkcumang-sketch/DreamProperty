import type { Metadata, Viewport } from 'next';
import { Onest } from 'next/font/google';
import './globals.css';
import { I18nProvider } from '@/lib/i18n/provider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { PageLoader } from '@/components/motion/PageLoader';
import { ScrollProgress } from '@/components/motion/ScrollProgress';
import { CursorGlow } from '@/components/motion/CursorGlow';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { siteConfig } from '@/config/site';

const onest = Onest({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-onest',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#05070a',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Interior Design & Turnkey Architecture Kanpur`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'Interior Designer Kanpur',
    'Turnkey Interior Swaroop Nagar',
    'Dream Properties Kanpur',
    'Modular Kitchens Kanpur',
    'Home Staging Kanpur',
    'Civil Lines Interior Architect',
    'Vastu Architecture Kanpur',
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteConfig.url,
    title: `${siteConfig.name} × ${siteConfig.partner.name} | Interior Studio`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Luxury Interior Design Kanpur`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} × Dream Properties Kanpur`,
    description: siteConfig.description,
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: `${siteConfig.name} in partnership with ${siteConfig.partner.name}`,
    image: `${siteConfig.url}/og-image.jpg`,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '113/182, near KVM Inter College, Khalasi Line, Swaroop Nagar',
      addressLocality: 'Kanpur',
      addressRegion: 'Uttar Pradesh',
      postalCode: '208002',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '26.4789885',
      longitude: '80.3155705',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '10:00',
        closes: '19:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.95',
      reviewCount: '151',
      bestRating: '5.0',
    },
    priceRange: '₹₹₹',
  };

  return (
    <html lang="en" className={onest.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#05070a] text-[#dfe7e0] font-sans antialiased selection:bg-[#e0231c] selection:text-white">
        <I18nProvider>
          <SmoothScroll>
            <PageLoader />
            <ScrollProgress />
            <CursorGlow />
            <Navbar />
            <div className="relative min-h-screen flex flex-col">
              {children}
            </div>
            <Footer />
            <FloatingWhatsApp />
          </SmoothScroll>
        </I18nProvider>
      </body>
    </html>
  );
}
