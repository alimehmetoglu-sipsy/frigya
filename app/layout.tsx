import { Inter, Montserrat } from 'next/font/google';
import { Metadata, Viewport } from 'next';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' }
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://phrygianway.com'),
  title: {
    default: 'Phrygian Way - 506km Ancient Trail Through Turkey',
    template: '%s | Phrygian Way'
  },
  description: 'Discover the Phrygian Way - 506km ancient trail through Turkey\'s historic Phrygia region. Ancient ruins, unique rock formations and rich cultural heritage.',
  keywords: ['phrygian way', 'turkey hiking', 'ancient phrygia', 'midas monument', 'gordion', 'eskisehir', 'afyon', 'rock churches', 'cultural trail', 'nature hiking', 'ancient civilizations'],
  authors: [{ name: 'Phrygian Way Team' }],
  creator: 'Phrygian Way',
  publisher: 'Phrygian Way',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png' }
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'tr_TR',
    url: 'https://phrygianway.com',
    siteName: 'Phrygian Way',
    title: 'Phrygian Way - 506km Ancient Trail Through Turkey',
    description: 'Discover the Phrygian Way - 506km ancient trail through Turkey\'s historic Phrygia region. Ancient ruins, unique rock formations and rich cultural heritage.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Phrygian Way Trail'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@phrygianway',
    creator: '@phrygianway',
    title: 'Phrygian Way - 506km Ancient Trail Through Turkey',
    description: 'Discover the Phrygian Way - 506km ancient trail through Turkey\'s historic Phrygia region. Ancient ruins, unique rock formations and rich cultural heritage.',
    images: ['/twitter-card.jpg']
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
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}