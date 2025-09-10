'use client';

import { motion } from 'framer-motion';
import { Check, Map, Calendar, Mountain, Compass } from 'lucide-react';

export default function TrailSection() {
  const highlights = [
    'Kristal berraklığında dağ gölleri',
    'Muhteşem şelaleler ve nehirler',
    'Geleneksel dağ köyleri',
    'Zengin flora ve fauna',
    'Otantik kültürel deneyimler',
    'İşaretlenmiş ve güvenli rotalar'
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Rota Detayları
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Çoban yolları ve patikalar kullanılarak oluşturulan rota, deniz seviyesinden 2300 metre yüksekliğe kadar çıkan yüksek alpin dağlardan geçiyor.
            </p>

            <div className="space-y-4 mb-8">
              <h3 className="font-semibold text-xl text-gray-900 mb-4">
                Öne Çıkanlar
              </h3>
              <ul className="space-y-3">
                {highlights.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-3"
                  >
                    <Check className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="bg-primary-50 rounded-xl p-6">
              <h3 className="font-semibold text-xl text-gray-900 mb-3">
                En İyi Zaman
              </h3>
              <p className="text-gray-600">
                Haziran - Eylül arası en ideal dönemdir. Karın erimesi ve hava koşulları bu dönemde trekking için en uygun şartları sunar.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Trail Map"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <Map className="w-8 h-8 mx-auto mb-2" />
                    <div className="text-2xl font-bold">192 km</div>
                    <div className="text-sm opacity-90">Toplam Mesafe</div>
                  </div>
                  <div className="text-center">
                    <Mountain className="w-8 h-8 mx-auto mb-2" />
                    <div className="text-2xl font-bold">2300 m</div>
                    <div className="text-sm opacity-90">Maksimum Yükseklik</div>
                  </div>
                  <div className="text-center">
                    <Calendar className="w-8 h-8 mx-auto mb-2" />
                    <div className="text-2xl font-bold">10-13</div>
                    <div className="text-sm opacity-90">Gün</div>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="absolute -top-6 -right-6 w-32 h-32 bg-primary-500 rounded-full flex items-center justify-center text-white shadow-xl"
            >
              <div className="text-center">
                <Compass className="w-8 h-8 mx-auto mb-1" />
                <div className="text-xs font-medium">GPS İşaretli</div>
                <div className="text-xs">Güvenli Rota</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}