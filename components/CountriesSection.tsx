'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Building, Mountain, Droplets, TreePine } from 'lucide-react';
import Link from 'next/link';

interface Province {
  icon: string;
  name: string;
  title: string;
  highlights: string[];
}

interface CountriesSectionProps {
  data?: {
    provinces?: Province[];
  };
}

export default function CountriesSection({ data }: CountriesSectionProps) {
  const defaultProvinces = [
    {
      key: 'ankara',
      name: 'Ankara Province',
      icon: Building,
      image: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: 'from-red-500 to-red-600',
      title: 'Starting Point: Gordion',
      description: 'UNESCO World Heritage Site (2023). Ancient capital of Phrygia with King Midas\'s father\'s tomb.',
      route: '219km Eastern Route'
    },
    {
      key: 'eskisehir',
      name: 'Eskişehir Province',
      icon: Mountain,
      image: 'https://images.unsplash.com/photo-1609001816098-8d5409fb3e58?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: 'from-blue-500 to-blue-600',
      title: 'Central Hub: Yazılıkaya',
      description: 'Religious center of ancient Phrygia with 17-meter tall Midas Monument and rock-cut temples.',
      route: 'Convergence Point'
    },
    {
      key: 'afyonkarahisar',
      name: 'Afyonkarahisar Province',
      icon: Droplets,
      image: 'https://images.unsplash.com/photo-1566232147697-8b79aea897c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: 'from-cyan-500 to-cyan-600',
      title: 'Starting Point: Seydiler',
      description: 'Turkey\'s thermal spa capital with fairy chimneys and Byzantine rock churches in Ayazini.',
      route: '140km Southern Route'
    },
    {
      key: 'kutahya',
      name: 'Kütahya Province',
      icon: TreePine,
      image: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: 'from-green-500 to-green-600',
      title: 'Starting Point: Yenice',
      description: 'Ancient Phrygian roads through spectacular Zahran Valley and traditional ceramic arts.',
      route: '147km Western Route'
    },
  ];

  const provinces = defaultProvinces;

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
            Four Provinces, One Epic Journey
          </h2>
          <p className="text-lg text-gray-600">
            The Phrygian Way passes through four Turkish provinces, each offering unique historical sites and natural beauty
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {provinces.map((province, index) => {
            const Icon = province.icon;
            return (
            <motion.div
              key={province.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={province.image}
                  alt={province.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 right-4">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-white text-xl font-display font-bold">
                    {province.name}
                  </h3>
                </div>
              </div>

              <div className="p-6">
                <h4 className="font-semibold text-gray-900 mb-2">{province.title}</h4>
                <p className="text-gray-600 mb-3 text-sm line-clamp-2">
                  {province.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded">
                    {province.route}
                  </span>
                  <Link
                    href={`/en/routes`}
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${province.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}