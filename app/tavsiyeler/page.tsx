import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Shirt, Plane, AlertCircle, CheckCircle2 } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { promises as fs } from 'fs';
import path from 'path';

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

export default async function Tavsiyeler() {
  const siteData = await getSiteData();
  const travelAdviceData = siteData?.travelAdvice;

  const categories = travelAdviceData?.categories || [
    {
      icon: 'Cloud',
      title: 'Hava Koşulları ve Gün Işığı',
      content: 'Yürüyüş gezinizi ne zaman gerçekleştirirseniz gerçekleştirin, her gün beklenen hava koşullarının farkında olmak çok önemlidir.',
      tips: [
        'Günlük yürüyüş rotanızı yeterli gün ışığı ile planlayın',
        'Hava durumunu düzenli olarak kontrol edin',
        'Kış aylarında ekstra dikkatli olun'
      ]
    },
    {
      icon: 'Shirt',
      title: 'Giyim ve Ekipman',
      content: 'Sıcak ve kuru bir yürüyüşçü mutlu bir yürüyüşçüdür! Bu nedenle rahat yürüyüş botları ve çoraplar şart.',
      tips: [
        'Katmanlı giyinin',
        'Su geçirmez ekipman şart',
        'Yedek çorap ve eldiven bulundurun',
        'GPS, pusula, ilk yardım kiti taşıyın'
      ]
    },
    {
      icon: 'Plane',
      title: 'Ulaşım',
      content: 'Her üç ülkeye de uçakla kolayca ulaşılabilir.',
      tips: [
        'Havaalanından transferi önceden ayarlayın',
        'Minibüs ve otobüs seçeneklerini araştırın',
        'Yerel turizm ofislerinden bilgi alın'
      ]
    }
  ];

  const essentialItems = travelAdviceData?.essentialItems || [
    'Yürüyüş botları ve yedek çoraplar',
    'Su geçirmez ceket ve pantolon',
    'Polar veya yün kazak',
    'Şapka, eldiven ve güneş gözlüğü',
    'GPS cihazı veya akıllı telefon',
    'İlk yardım kiti',
    'Kafa lambası veya el feneri',
    'Yeterli su ve atıştırmalık',
    'Güneş kremi ve dudak koruyucu',
    'Harita ve pusula'
  ];


  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative h-[40vh] min-h-[400px] overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixlib=rb-4.0.3')",
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
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Seyahat Tavsiyeleri</h1>
                <p className="text-xl md:text-2xl">Güvenli ve keyifli bir yürüyüş için bilmeniz gerekenler</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Advice Categories */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Hazırlık Rehberi</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Balkanların Zirveleri rotasına çıkmadan önce dikkat etmeniz gereken önemli konular
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {categories.map((category, index) => {
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-lg shadow-lg p-6"
                  >
                    <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                      {category.icon === 'Cloud' && <Cloud className="w-7 h-7 text-primary-600" />}
                      {category.icon === 'Shirt' && <Shirt className="w-7 h-7 text-primary-600" />}
                      {category.icon === 'Plane' && <Plane className="w-7 h-7 text-primary-600" />}
                      {!['Cloud', 'Shirt', 'Plane'].includes(category.icon) && <Cloud className="w-7 h-7 text-primary-600" />}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{category.title}</h3>
                    <p className="text-gray-600 mb-4">{category.content}</p>
                    <ul className="space-y-2">
                      {category.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Essential Items Checklist */}
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
                <AlertCircle className="w-12 h-12 text-primary-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-4">Temel Ekipman Listesi</h2>
                <p className="text-gray-600">
                  Yanınızda bulundurmanız gereken temel ekipmanlar
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {essentialItems.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-3"
                    >
                      <CheckCircle2 className="w-6 h-6 text-primary-500 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Best Time to Visit */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl font-bold mb-8">En İyi Ziyaret Zamanı</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                  <h3 className="font-bold text-lg mb-2 text-green-800">Haziran - Eylül</h3>
                  <p className="text-green-700">En ideal dönem</p>
                  <p className="text-sm text-gray-600 mt-2">Hava açık, yollar erişilebilir</p>
                </div>
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
                  <h3 className="font-bold text-lg mb-2 text-yellow-800">Mayıs & Ekim</h3>
                  <p className="text-yellow-700">Dikkatli olun</p>
                  <p className="text-sm text-gray-600 mt-2">Kar riski, değişken hava</p>
                </div>
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
                  <h3 className="font-bold text-lg mb-2 text-red-800">Kasım - Nisan</h3>
                  <p className="text-red-700">Önerilmez</p>
                  <p className="text-sm text-gray-600 mt-2">Kar, buzlanma, tehlikeli</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}