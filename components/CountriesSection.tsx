'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CountriesSection() {
  const countries = [
    {
      key: 'albania',
      name: 'Arnavutluk',
      flag: '🇦🇱',
      image: 'https://images.unsplash.com/photo-1609001816098-8d5409fb3e58?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: 'from-red-500 to-red-600',
      description: 'Arnavut Alpleri\'nin muhteşem manzaraları, geleneksel taş evleri ve misafirperver yerel halk ile tanışın.'
    },
    {
      key: 'kosovo',
      name: 'Kosova',
      flag: '🇽🇰',
      image: 'https://images.unsplash.com/photo-1566232147697-8b79aea897c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: 'from-blue-500 to-blue-600',
      description: 'Rugova Vadisi\'nin nefes kesici güzelliklerini ve Prokletije Milli Parkı\'nın el değmemiş doğasını keşfedin.'
    },
    {
      key: 'montenegro',
      name: 'Karadağ',
      flag: '🇲🇪',
      image: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: 'from-yellow-500 to-yellow-600',
      description: 'Plav Gölü\'nün berrak sularından Prokletije\'nin sivri zirvelerine kadar eşsiz manzaralar sizi bekliyor.'
    },
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Üç Ülke, Tek Rota
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {countries.map((country, index) => (
            <motion.div
              key={country.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={country.image}
                  alt={country.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 right-4 text-4xl">
                  {country.flag}
                </div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-white text-2xl font-display font-bold">
                    {country.name}
                  </h3>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {country.description}
                </p>
                
                <Link
                  href={`/ulkeler/${country.key}`}
                  className="inline-flex items-center space-x-2 text-primary-600 font-medium hover:text-primary-700 transition-colors"
                >
                  <span>Daha Fazla Bilgi</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              
              <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${country.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}