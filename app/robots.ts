import { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://phrygianway.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/_next/',
          '/static/',
          '/*.json$',
          '/*?*',
          '/*#*'
        ]
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        crawlDelay: 0
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        crawlDelay: 1
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl
  };
}