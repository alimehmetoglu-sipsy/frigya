'use client';

import { motion } from 'framer-motion';
import { Award, Play } from 'lucide-react';
import Link from 'next/link';

export default function AwardSection() {
  return (
    <section className="section-padding bg-gradient-to-b from-primary-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-400 rounded-full mb-6">
              <Award className="w-10 h-10 text-white" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              TOURISM FOR TOMORROW ÖDÜLÜ SAHİBİ
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Dünyanın en yeni sınır ötesi yürüyüş deneyimi olan Balkanların Zirveleri Rotası, 
              prestijli küresel ödüllerde kazanan oldu.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                192 kilometrelik işaretli rota, Güney Doğu Avrupa'daki Güney Dinarik Alpler'in 
                Arnavutluk, Kosova ve Karadağ'ın uzak ve bozulmamış dağlık bölgelerinden geçiyor.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Rota, bu toplulukların kültürel, doğal ve manevi mirasını koruma tutkusundan doğdu 
                ve hem yerel halk hem de ziyaretçiler için nadir bir yolculuk yaratmak üzere onları 
                birbirine bağladı.
              </p>
              <Link
                href="https://www.youtube.com/watch?v=xAl7B-vrodc"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium group"
              >
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Videoyu İzle
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative aspect-video rounded-lg overflow-hidden shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
              <img
                src="https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Tourism for Tomorrow Award"
                className="w-full h-full object-cover"
              />
              <Link
                href="https://www.youtube.com/watch?v=xAl7B-vrodc"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-20 flex items-center justify-center group"
              >
                <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                  <Play className="w-8 h-8 text-primary-600 ml-1" />
                </div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}