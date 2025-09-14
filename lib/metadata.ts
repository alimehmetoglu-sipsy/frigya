import { Metadata } from 'next';

export const siteConfig = {
  name: 'Peaks of the Balkans',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://balkanlarinzirveleri.com',
  description: {
    tr: 'Balkanların Zirveleri: Arnavutluk, Karadağ ve Kosova\'yı kapsayan 192 km\'lik efsanevi dağ patikasını keşfedin. Nefes kesici manzaralar, otantik köyler ve zengin kültürel miras.',
    en: 'Peaks of the Balkans: Discover the legendary 192km mountain trail spanning Albania, Montenegro and Kosovo. Breathtaking landscapes, authentic villages and rich cultural heritage.',
    sq: 'Majat e Ballkanit: Zbuloni shtegun legjendar malor 192km që përfshin Shqipërinë, Malin e Zi dhe Kosovën. Peizazhe mahnitëse, fshatra autentike dhe trashëgimi të pasur kulturore.'
  },
  keywords: {
    tr: ['balkanların zirveleri', 'peaks of the balkans', 'dağ yürüyüşü', 'arnavutluk', 'karadağ', 'kosova', 'prokletije', 'bjeshkët e namuna', 'alp yürüyüşü', 'doğa turizmi', 'trekking rotaları'],
    en: ['peaks of the balkans', 'mountain trail', 'hiking', 'albania', 'montenegro', 'kosovo', 'prokletije', 'accursed mountains', 'alpine hiking', 'nature tourism', 'trekking routes'],
    sq: ['majat e ballkanit', 'shteg malor', 'ecje', 'shqipëri', 'mal i zi', 'kosovë', 'prokletije', 'bjeshkët e namuna', 'ecje alpine', 'turizëm natyror', 'rrugë trekingu']
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
  const baseTitle = 'Peaks of the Balkans | Balkanların Zirveleri';
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
      creator: '@balkanpeaks',
      site: '@balkanpeaks',
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
          'https://www.facebook.com/peaksofthebalkans',
          'https://www.instagram.com/peaksofthebalkans',
          'https://twitter.com/balkanpeaks'
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
        name: 'Peaks of the Balkans Trail',
        description: siteConfig.description[locale],
        url: `${siteConfig.url}/${locale}`,
        image: `${siteConfig.url}${siteConfig.images.og}`,
        address: {
          '@type': 'Place',
          name: 'Peaks of the Balkans',
          containedInPlace: {
            '@type': 'Place',
            name: 'Albania, Montenegro, Kosovo'
          }
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 42.4506,
          longitude: 19.8269
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
        name: 'Peaks of the Balkans Hiking Trail',
        description: siteConfig.description[locale],
        provider: {
          '@type': 'Organization',
          name: siteConfig.name,
          url: siteConfig.url
        },
        hasCourseInstance: [
          {
            '@type': 'CourseInstance',
            name: 'Theth to Valbonë',
            description: 'Classic alpine route through dramatic mountain passes',
            courseMode: 'Hiking Trail',
            duration: 'P1D'
          },
          {
            '@type': 'CourseInstance',
            name: 'Valbonë to Çerem',
            description: 'Scenic valley route with traditional villages',
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
        headline: data?.title || 'Peaks of the Balkans',
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