'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Map, Route, Info } from 'lucide-react';

const InteractiveMap = dynamic(
  () => import('@/components/InteractiveMap'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[600px] bg-gray-100 animate-pulse flex items-center justify-center">
        <div className="text-center">
          <Map className="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500">Harita yükleniyor...</p>
        </div>
      </div>
    )
  }
);

export default function MapSection() {
  const [selectedRoute, setSelectedRoute] = useState<string>('');

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            İnteraktif Rota Haritası
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Frig Yolu\'nun tüm rotalarını interaktif haritamızda keşfedin.
            Her rotanın detaylarını inceleyin, yükseklik profillerini görüntüleyin ve
            yolculuğunuzu planlayın.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-3">
              <Map className="w-8 h-8 text-primary mr-3" />
              <h3 className="text-lg font-semibold">3 Ana Rota</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Gordion, Seydiler-Ayazini ve Yenice Ormanları rotalarını keşfedin
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-3">
              <Route className="w-8 h-8 text-primary mr-3" />
              <h3 className="text-lg font-semibold">500+ km Yol</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Tarihi Frig Yolu boyunca işaretlenmiş patikalar ve rotalar
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-3">
              <Info className="w-8 h-8 text-primary mr-3" />
              <h3 className="text-lg font-semibold">Detaylı Bilgi</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Her durak noktası için yükseklik, mesafe ve zorluk bilgileri
            </p>
          </div>
        </div>

        {/* Interactive Map Container */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="h-[600px] lg:h-[700px]">
            <InteractiveMap
              selectedRoute={selectedRoute || undefined}
              onRouteSelect={setSelectedRoute}
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Map Instructions */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            Harita Kullanım İpuçları
          </h3>
          <ul className="grid md:grid-cols-2 gap-3 text-sm text-blue-800">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Sol üstteki menüden rotaları seçerek detayları görüntüleyin
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Harita üzerinde zoom yaparak detaylı görünüm elde edin
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              İşaretçilere tıklayarak nokta bilgilerini görüntüleyin
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Uydu ve arazi görünümü arasında geçiş yapabilirsiniz
            </li>
          </ul>
        </div>

        {/* Route Statistics */}
        {selectedRoute && (
          <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Seçili Rota Detayları</h3>
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-500">Rota Adı</p>
                <p className="font-semibold capitalize">{selectedRoute}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Toplam Mesafe</p>
                <p className="font-semibold">Haritadan hesaplanıyor...</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Zorluk Seviyesi</p>
                <p className="font-semibold">Orta-Zor</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Tahmini Süre</p>
                <p className="font-semibold">3-7 gün</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}