'use client';

import { motion } from 'framer-motion';
import { Home, Utensils, Map, AlertTriangle, Trash2, Flag } from 'lucide-react';

interface Service {
  icon: string;
  title: string;
  description: string;
}

interface Marking {
  country: string;
  colors: string;
}

interface RotadaContentProps {
  services: Service[];
  markings: Marking[];
  warnings: string[];
}

export default function RotadaContent({ services, markings, warnings }: RotadaContentProps) {
  const iconMap: { [key: string]: any } = {
    'Home': Home,
    'Utensils': Utensils,
    'Map': Map
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[400px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3')",
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center text-white"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Rotada</h1>
              <p className="text-xl md:text-2xl">Balkanların Zirveleri rotasındaki hizmetler ve bilgiler</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Rota Üzerindeki Hizmetler</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Yürüyüş rotası boyunca size sunulan hizmetler ve dikkat etmeniz gerekenler
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon] || Home;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Marking System */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <Flag className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">İşaretleme Sistemleri</h2>
              <p className="text-gray-600">
                Her ülkenin kendine özgü işaretleme sistemi bulunmaktadır
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {markings.map((marking, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 rounded-lg p-6 text-center"
                >
                  <h3 className="font-bold text-lg mb-2">{marking.country}</h3>
                  <p className="text-gray-600">{marking.colors}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-8">
              <div className="flex items-start space-x-4">
                <AlertTriangle className="w-8 h-8 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-3">Önemli Uyarılar</h3>
                  <ul className="space-y-3 text-gray-700">
                    {warnings.map((warning, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-yellow-600 mr-2">•</span>
                        <span>{warning}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Leave No Trace */}
      <section className="py-16 bg-primary-500 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <Trash2 className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl font-bold mb-4">Doğaya Saygı</h2>
            <p className="text-xl leading-relaxed">
              "Sadece fotoğraf çekin, sadece ayak izlerinizi bırakın ve çöplerinizi en yakın çöp kutusuna götürün!"
            </p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white/10 rounded-lg p-4">
                <p>Doğal yaşamı koruyun</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <p>İz bırakmayın</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <p>Çöplerinizi toplayın</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}