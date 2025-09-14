import { MetadataRoute } from 'next';
import { locales } from '@/i18n';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://phrygianway.com';

// Define static pages for each locale
const staticPages = [
  '',
  '/routes',
  '/routes/gordion-beylikopru',
  '/routes/beylikopru-mulk',
  '/routes/mulk-seyitgazi',
  '/routes/seyitgazi-yazilikaya',
  '/routes/yazilikaya-sivrihisar',
  '/gallery',
  '/travel-tips',
  '/about',
  '/contact'
];

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  // Generate sitemap entries for all static pages in all locales
  const sitemapEntries: MetadataRoute.Sitemap = [];

  locales.forEach(locale => {
    staticPages.forEach(page => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: currentDate,
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 1.0 : page.includes('/routes') ? 0.8 : 0.6,
        alternates: {
          languages: Object.fromEntries(
            locales.map(l => [l, `${baseUrl}/${l}${page}`])
          )
        }
      });
    });
  });

  return sitemapEntries;
}