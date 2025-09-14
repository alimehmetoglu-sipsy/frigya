import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import IntroSection from '@/components/IntroSection';
import AwardSection from '@/components/AwardSection';
import CountriesSection from '@/components/CountriesSection';
import TrailSection from '@/components/TrailSection';
import GallerySection from '@/components/GallerySection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import fs from 'fs/promises';
import path from 'path';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { generateSEOMetadata, generateStructuredData } from '@/lib/metadata';
import Script from 'next/script';

async function getSiteData() {
  try {
    const dataFilePath = path.join(process.cwd(), 'data', 'site-data.json');
    const data = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading site data:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return generateSEOMetadata({
    locale: locale as 'tr' | 'en' | 'sq',
    title: t('title'),
    description: t('description'),
    path: '',
    type: 'website'
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const siteData = await getSiteData();

  const organizationData = generateStructuredData({
    type: 'Organization',
    locale: locale as 'tr' | 'en' | 'sq'
  });

  const touristAttractionData = generateStructuredData({
    type: 'TouristAttraction',
    locale: locale as 'tr' | 'en' | 'sq'
  });

  const trailData = generateStructuredData({
    type: 'Trail',
    locale: locale as 'tr' | 'en' | 'sq'
  });

  return (
    <>
      <Script
        id="structured-data-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData)
        }}
      />
      <Script
        id="structured-data-tourist"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(touristAttractionData)
        }}
      />
      <Script
        id="structured-data-trail"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(trailData)
        }}
      />
      <Navigation />
      <HeroSection data={siteData?.hero} />
      <IntroSection data={siteData?.introduction} />
      <AwardSection data={siteData?.award} />
      <CountriesSection data={siteData} />
      <TrailSection data={siteData?.route} />
      <GallerySection data={siteData?.gallery} />
      <CTASection />
      <Footer />
    </>
  );
}
