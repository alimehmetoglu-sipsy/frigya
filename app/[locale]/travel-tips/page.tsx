import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import {
  Cloud,
  Backpack,
  Shield,
  Home,
  Heart,
  Users,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Thermometer,
  Phone,
  MapPin
} from 'lucide-react';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'travelTips.meta' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: `/travel-tips`,
      languages: {
        'en': '/en/travel-tips',
        'tr': '/tr/travel-tips',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      images: ['/images/phrygian-way-hero.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}

export default function TravelTipsPage() {
  const t = useTranslations('travelTips');

  const categoryData = [
    { key: 'weather', icon: Cloud },
    { key: 'gear', icon: Backpack },
    { key: 'safety', icon: Shield },
    { key: 'accommodation', icon: Home },
    { key: 'health', icon: Heart },
    { key: 'culture', icon: Users }
  ] as const;

  const seasonalInfo = [
    {
      key: 'spring',
      colorClasses: 'bg-green-50 border-green-200 text-green-600',
      bgClass: 'bg-green-100'
    },
    {
      key: 'autumn',
      colorClasses: 'bg-orange-50 border-orange-200 text-orange-600',
      bgClass: 'bg-orange-100'
    },
    {
      key: 'summer',
      colorClasses: 'bg-red-50 border-red-200 text-red-600',
      bgClass: 'bg-red-100'
    },
    {
      key: 'winter',
      colorClasses: 'bg-blue-50 border-blue-200 text-blue-600',
      bgClass: 'bg-blue-100'
    }
  ] as const;

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelGuide",
            "name": t('hero.title'),
            "description": t('hero.description'),
            "about": {
              "@type": "Place",
              "name": "Phrygian Way",
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 39.6526,
                "longitude": 32.3250
              }
            },
            "author": {
              "@type": "Organization",
              "name": "Phrygian Way Official"
            }
          })
        }}
      />

      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary-50 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-display text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-primary-600 font-semibold mb-4">
              {t('hero.subtitle')}
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('hero.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Best Time to Visit Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('bestTime.title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('bestTime.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {seasonalInfo.map(({ key, colorClasses, bgClass }) => (
              <div key={key} className={`${colorClasses} rounded-2xl p-6 hover:shadow-lg transition-all duration-300`}>
                <div className="text-center">
                  <Thermometer className={`w-10 h-10 mx-auto mb-4`} />
                  <h3 className="font-display text-xl font-bold mb-3">
                    {t(`bestTime.${key}.title`)}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {t(`bestTime.${key}.description`)}
                  </p>
                  <div className={`${bgClass} rounded-lg p-3`}>
                    <div className="text-sm font-semibold text-gray-700 mb-1">
                      {t(`bestTime.${key}.temperature`)}
                    </div>
                    <div className="text-xs text-gray-600">
                      {t(`bestTime.${key}.conditions`)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Categories Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Essential Information
            </h2>
            <p className="text-lg text-gray-600">
              Complete guide for a safe and successful journey
            </p>
          </div>

          <div className="space-y-12 max-w-5xl mx-auto">
            {categoryData.map(({ key, icon: Icon }) => (
              <div key={key} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-8 h-8 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-2xl font-bold text-gray-900 mb-4">
                        {t(`categories.${key}.title`)}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-6">
                        {t(`categories.${key}.content`)}
                      </p>

                      <div className="bg-blue-50 rounded-xl p-6">
                        <h4 className="font-semibold text-lg text-blue-900 mb-4">
                          Key Tips:
                        </h4>
                        <div className="grid gap-3">
                          {Array.from({ length: 8 }, (_, tipIndex) => {
                            try {
                              const tip = t(`categories.${key}.tips.${tipIndex}`);
                              return (
                                <div key={tipIndex} className="flex items-start gap-3">
                                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                  <span className="text-blue-800 text-sm">{tip}</span>
                                </div>
                              );
                            } catch {
                              return null;
                            }
                          }).filter(Boolean)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Essential Items Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">
                {t('essentialItems.title')}
              </h2>
              <p className="text-lg text-gray-600">
                {t('essentialItems.subtitle')}
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8">
              <div className="grid md:grid-cols-2 gap-4">
                {Array.from({ length: 12 }, (_, index) => {
                  try {
                    const item = t(`essentialItems.items.${index}`);
                    return (
                      <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-gray-800 font-medium">{item}</span>
                      </div>
                    );
                  } catch {
                    return null;
                  }
                }).filter(Boolean)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Information Section */}
      <section className="section-padding bg-red-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-red-100 border-2 border-red-200 rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-6">
                <Phone className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="font-display text-2xl font-bold text-red-900 mb-2">
                    {t('emergencyInfo.title')}
                  </h2>
                  <p className="text-red-700 font-medium">
                    {t('emergencyInfo.subtitle')}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                    <Phone className="w-5 h-5 text-red-600" />
                    <span className="font-semibold text-red-900">{t('emergencyInfo.police')}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                    <Phone className="w-5 h-5 text-red-600" />
                    <span className="font-semibold text-red-900">{t('emergencyInfo.ambulance')}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                    <Phone className="w-5 h-5 text-red-600" />
                    <span className="font-semibold text-red-900">{t('emergencyInfo.fire')}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                    <Phone className="w-5 h-5 text-red-600" />
                    <span className="font-semibold text-red-900">{t('emergencyInfo.tourism')}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6">
                <p className="text-red-800 leading-relaxed">
                  {t('emergencyInfo.content')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Tips Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-center text-gray-900 mb-12">
              {t('additionalTips.title')}
            </h2>

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="grid gap-4">
                {Array.from({ length: 8 }, (_, index) => {
                  try {
                    const tip = t(`additionalTips.content.${index}`);
                    return (
                      <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{tip}</span>
                      </div>
                    );
                  } catch {
                    return null;
                  }
                }).filter(Boolean)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="section-padding bg-yellow-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-yellow-100 border-2 border-yellow-300 rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-8 h-8 text-yellow-700 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="font-display text-2xl font-bold text-yellow-900 mb-4">
                    {t('disclaimer.title')}
                  </h2>
                  <p className="text-yellow-800 leading-relaxed">
                    {t('disclaimer.content')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}