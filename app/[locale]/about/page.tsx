import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HistorySection from '@/components/about/HistorySection';
import TeamSection from '@/components/about/TeamSection';
import ConservationSection from '@/components/about/ConservationSection';
import PartnersSection from '@/components/about/PartnersSection';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { generateSEOMetadata, generateStructuredData } from '@/lib/metadata';
import Script from 'next/script';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return generateSEOMetadata({
    locale: locale as 'tr' | 'en' | 'sq',
    title: t('meta.title'),
    description: t('meta.description'),
    path: '/about',
    type: 'website'
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  const organizationData = generateStructuredData({
    type: 'Organization',
    locale: locale as 'tr' | 'en' | 'sq'
  });

  return (
    <>
      <Script
        id="structured-data-about"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData)
        }}
      />
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white max-w-4xl mx-auto">
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </p>
          </div>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/images/ancient-pattern.svg')] bg-repeat bg-center bg-[length:400px_400px]" />
        </div>
      </section>

      <HistorySection />
      <TeamSection />
      <ConservationSection />
      <PartnersSection />
      <Footer />
    </>
  );
}