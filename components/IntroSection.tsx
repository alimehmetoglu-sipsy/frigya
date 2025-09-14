'use client';

import { motion } from 'framer-motion';
import { Mountain, MapPin, Calendar, TrendingUp } from 'lucide-react';

interface IntroData {
  title: string;
  paragraphs: string[];
}

interface IntroSectionProps {
  data?: IntroData;
}

export default function IntroSection({ data }: IntroSectionProps) {
  const introData = data || {
    title: 'Balkanların Kalbinde Bir Macera',
    paragraphs: [
      'Balkanların Zirveleri, Arnavutluk, Kosova ve Karadağ\'ın sınır bölgelerinden geçen 192 kilometrelik dairesel bir yürüyüş rotasıdır. Bu benzersiz deneyim, Dinarik Alpler\'in en etkileyici manzaralarını sunarken, üç farklı kültürü tek bir yolculukta birleştirir.',
      'Yürüyüşçüler, kristal berraklığında göller, yemyeşil vadiler, geleneksel dağ köyleri ve 2000 metrenin üzerindeki geçitlerle karşılaşır. Rota, hem deneyimli trekking tutkunları hem de macera arayan doğa severler için ideal bir deneyim sunar.',
      'Her adımda farklı bir kültür, her tepede yeni bir manzara sizi bekliyor. Yerel halkın sıcak misafirperverliği ve el değmemiş doğanın büyüsü, bu yolculuğu unutulmaz kılıyor.'
    ]
  };

  const features = [
    { icon: MapPin, label: 'Total Distance', value: '506 km' },
    { icon: Mountain, label: 'Provinces', value: '4' },
    { icon: Calendar, label: 'Duration', value: '20-30 days' },
    { icon: TrendingUp, label: 'Max Altitude', value: '1500m' },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            {introData.title}
          </h2>
          <div className="space-y-4">
            {introData.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-lg text-gray-600 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-primary-50 rounded-full flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                  <Icon className="w-10 h-10 text-primary-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {feature.value}
                </div>
                <div className="text-sm text-gray-600">
                  {feature.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}