import { Metadata } from 'next';

export const siteConfig = {
  name: 'Phrygian Way',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://phrygianway.com',
  description: {
    tr: 'Frig Yolu: Türkiye\'nin antik Frigya bölgesini kapsayan 506 km\'lik tarih ve doğa rotasını keşfedin. Antik kalıntılar, eşsiz kayalar ve zengin kültürel miras.',
    en: 'Phrygian Way: Discover the legendary 506km ancient trail through Turkey\'s historic Phrygia region. Ancient ruins, unique rock formations and rich cultural heritage.',
    sq: 'Rruga Frige: Zbuloni shtegun legjendar 506km të rajonit të lashtë Frigji të Turqisë. Rrënoja antike, formacione shkëmbore unike dhe trashëgimi të pasur kulturore.'
  },
  keywords: {
    tr: ['frig yolu', 'phrygian way', 'frigya yolu', 'türkiye trekking', 'antik frigya', 'midas anıtı', 'gordion', 'eskişehir', 'afyon', 'kaya kiliseleri', 'doğa yürüyüşü', 'kültür rotası'],
    en: ['phrygian way', 'turkey hiking', 'ancient phrygia', 'midas monument', 'gordion', 'eskisehir', 'afyon', 'rock churches', 'cultural trail', 'nature hiking', 'ancient civilizations', 'turkey trekking'],
    sq: ['rruga frige', 'ecje turqi', 'frigji e lashtë', 'monumenti midas', 'gordion', 'eskisehir', 'afyon', 'kisha shkëmbore', 'shteg kulturor', 'ecje natyre', 'qytetërime antike']
  },
  images: {
    og: '/images/og-image.jpg',
    twitter: '/images/twitter-card.jpg',
    logo: '/images/logo.png'
  }
};

export function generateSEOMetadata({
  locale = 'tr',
  title,
  description,
  path = '',
  image,
  type = 'website'
}: {
  locale?: 'tr' | 'en' | 'sq';
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
}): Metadata {
  const baseTitle = 'Phrygian Way | Frig Yolu';
  const fullTitle = title ? `${title} | ${baseTitle}` : baseTitle;
  const metaDescription = description || siteConfig.description[locale];
  const canonicalUrl = `${siteConfig.url}/${locale}${path}`;
  const metaImage = image || siteConfig.images.og;

  return {
    title: fullTitle,
    description: metaDescription,
    keywords: siteConfig.keywords[locale],
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'tr': `/tr${path}`,
        'en': `/en${path}`,
        'sq': `/sq${path}`,
      },
    },
    openGraph: {
      title: fullTitle,
      description: metaDescription,
      url: canonicalUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: locale,
      type: type,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: metaDescription,
      images: [metaImage],
      creator: '@phrygianway',
      site: '@phrygianway',
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
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
}

export function generateStructuredData({
  type,
  locale = 'tr',
  data
}: {
  type: 'Organization' | 'TouristAttraction' | 'Trail' | 'Article' | 'BreadcrumbList';
  locale?: 'tr' | 'en' | 'sq';
  data?: any;
}) {
  const baseData = {
    '@context': 'https://schema.org',
  };

  switch (type) {
    case 'Organization':
      return {
        ...baseData,
        '@type': 'Organization',
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}${siteConfig.images.logo}`,
        description: siteConfig.description[locale],
        sameAs: [
          'https://www.facebook.com/phrygianway',
          'https://www.instagram.com/phrygianway',
          'https://twitter.com/phrygianway'
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+90-555-123-4567',
          contactType: 'customer service',
          availableLanguage: ['Turkish', 'English', 'Albanian']
        }
      };

    case 'TouristAttraction':
      return {
        ...baseData,
        '@type': 'TouristAttraction',
        name: 'Phrygian Way Trail',
        description: siteConfig.description[locale],
        url: `${siteConfig.url}/${locale}`,
        image: `${siteConfig.url}${siteConfig.images.og}`,
        address: {
          '@type': 'Place',
          name: 'Phrygian Way',
          containedInPlace: {
            '@type': 'Place',
            name: 'Turkey, Central Anatolia'
          }
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 39.0334,
          longitude: 30.5231
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          reviewCount: '2847'
        },
        isAccessibleForFree: true,
        publicAccess: true,
        tourBookingPage: `${siteConfig.url}/${locale}/register`,
        ...data
      };

    case 'Trail':
      return {
        ...baseData,
        '@type': 'Course',
        '@id': `${siteConfig.url}#trail`,
        name: 'Phrygian Way Hiking Trail',
        description: siteConfig.description[locale],
        provider: {
          '@type': 'Organization',
          name: siteConfig.name,
          url: siteConfig.url
        },
        hasCourseInstance: [
          {
            '@type': 'CourseInstance',
            name: 'Gordion to Beylikköprü',
            description: 'Historical route through ancient Phrygian capital',
            courseMode: 'Hiking Trail',
            duration: 'P1D'
          },
          {
            '@type': 'CourseInstance',
            name: 'Beylikköprü to Mülk',
            description: 'Valley route with traditional Anatolian villages',
            courseMode: 'Hiking Trail',
            duration: 'P1D'
          }
        ],
        ...data
      };

    case 'Article':
      return {
        ...baseData,
        '@type': 'Article',
        headline: data?.title || 'Phrygian Way',
        description: data?.description || siteConfig.description[locale],
        image: data?.image || `${siteConfig.url}${siteConfig.images.og}`,
        datePublished: data?.datePublished || new Date().toISOString(),
        dateModified: data?.dateModified || new Date().toISOString(),
        author: {
          '@type': 'Organization',
          name: siteConfig.name,
          url: siteConfig.url
        },
        publisher: {
          '@type': 'Organization',
          name: siteConfig.name,
          logo: {
            '@type': 'ImageObject',
            url: `${siteConfig.url}${siteConfig.images.logo}`
          }
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${siteConfig.url}/${locale}${data?.path || ''}`
        },
        ...data
      };

    case 'BreadcrumbList':
      return {
        ...baseData,
        '@type': 'BreadcrumbList',
        itemListElement: data?.items || []
      };

    default:
      return baseData;
  }
}