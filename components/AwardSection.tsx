'use client';

import { motion } from 'framer-motion';
import { Award, Star, Trophy, Globe } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface AwardData {
  title?: string;
  year?: string;
  description?: string;
  details?: string[];
}

interface AwardSectionProps {
  data?: AwardData;
}

export default function AwardSection({ data }: AwardSectionProps) {
  const t = useTranslations('award');

  const awardData = data || {
    title: t('title'),
    year: '2018',
    description: t('description'),
    details: [
      t('details.0'),
      t('details.1'),
      t('details.2'),
      t('details.3')
    ]
  };

  const certificateCards = [
    {
      icon: Trophy,
      title: t('certificates.excellence.title'),
      subtitle: t('certificates.excellence.subtitle'),
      year: '2018'
    },
    {
      icon: Star,
      title: t('certificates.heritage.title'),
      subtitle: t('certificates.heritage.subtitle'),
      year: '2023'
    },
    {
      icon: Globe,
      title: t('certificates.sustainable.title'),
      subtitle: t('certificates.sustainable.subtitle'),
      year: '2018'
    }
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-amber-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full mb-6 relative"
            whileInView={{
              scale: [1, 1.1, 1],
              boxShadow: [
                "0 0 0 0 rgba(245, 158, 11, 0.4)",
                "0 0 0 20px rgba(245, 158, 11, 0)",
                "0 0 0 0 rgba(245, 158, 11, 0)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            viewport={{ once: true }}
          >
            <Award className="w-12 h-12 text-white" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-block bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 uppercase tracking-wider"
          >
            {t('badge')} {awardData.year}
          </motion.div>

          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 text-gray-900">
            {awardData.title}
          </h2>

          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {awardData.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {certificateCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>

                <h3 className="font-display text-xl font-bold text-gray-900 mb-2">
                  {card.title}
                </h3>

                <p className="text-gray-600 mb-4">
                  {card.subtitle}
                </p>

                <div className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {card.year}
                </div>
              </motion.div>
            );
          })}
        </div>

        {awardData.details && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100"
          >
            <div className="max-w-4xl mx-auto">
              <h3 className="font-display text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">
                {t('comparison.title')}
              </h3>

              <div className="grid md:grid-cols-2 gap-8">
                {awardData.details.map((detail, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {detail}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-200 rounded-full opacity-50 blur-xl" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-amber-200 rounded-full opacity-30 blur-2xl" />
    </section>
  );
}