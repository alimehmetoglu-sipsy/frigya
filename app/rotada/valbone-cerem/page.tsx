import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, Clock, TrendingUp, MapPin, AlertCircle } from 'lucide-react';

export default function ValboneCeremPage() {
  return (
    <>
      <Navigation />
      
      <section className="pt-32 pb-8 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link href="/rotada" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6">
            <ArrowLeft className="w-5 h-5" />
            Rotaya Geri Dön
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Etap 2
            </span>
            <span className="text-gray-600">Arnavutluk</span>
          </div>
          
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Valbonë - Çerem
          </h1>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <MapPin className="w-6 h-6 text-primary-600 mx-auto mb-2" />
              <div className="text-lg font-bold">14 km</div>
              <div className="text-sm text-gray-600">Mesafe</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <Clock className="w-6 h-6 text-primary-600 mx-auto mb-2" />
              <div className="text-lg font-bold">6-7 saat</div>
              <div className="text-sm text-gray-600">Süre</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <TrendingUp className="w-6 h-6 text-primary-600 mx-auto mb-2" />
              <div className="text-lg font-bold">800m</div>
              <div className="text-sm text-gray-600">Tırmanış</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <TrendingUp className="w-6 h-6 text-orange-600 mx-auto mb-2 rotate-180" />
              <div className="text-lg font-bold">1200m</div>
              <div className="text-sm text-gray-600">İniş</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div 
            className="relative w-full h-96 rounded-2xl overflow-hidden mb-8"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1551524164-6cf2ac531a87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black/20 rounded-2xl" />
          </div>

          <div className="prose prose-lg max-w-none">
            <h2>Rota Açıklaması</h2>
            <p>
              İkinci etap, Valbonë Vadisi'nden başlayarak Çerem köyüne doğru uzanır. Bu etap, 
              rotanın en alçak noktalarından birine (670m) iner ve Arnavutluk'un kırsal yaşamına 
              daha yakın bir bakış sunar.
            </p>
            
            <p>
              Valbonë'den çıkış yaparak önce orman alanlarından geçer, ardından açık çayırlar ve 
              geleneksel tarım alanlarından geçerek Çerem'e varırsınız. Bu etap, önceki etaba 
              göre daha az zorlu olmakla birlikte, uzun iniş bölümleri diz eklemleriniz için 
              zorlayıcı olabilir.
            </p>

            <h3>Öne Çıkan Noktalar</h3>
            <ul>
              <li>Valbonë Nehri boyunca yürüyüş</li>
              <li>Geleneksel Arnavut çiftlik evleri</li>
              <li>Çeşitli kuş türleri ve yabani yaşam</li>
              <li>Rotanın en alçak noktası (670m)</li>
            </ul>

            <h3>Zorluk Seviyesi</h3>
            <p>
              Bu etap <strong>kolay-orta</strong> zorluk seviyesindedir. Uzun iniş bölümleri 
              nedeniyle diz koruyucu kullanımı tavsiye edilir. Patika çoğunlukla belirgin ve 
              kolay takip edilebilir durumdadır.
            </p>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 my-8">
              <h3 className="text-green-900 mt-0">Özel Deneyimler</h3>
              <ul className="text-green-800 mb-0">
                <li>Geleneksel Arnavut misafirperverliği</li>
                <li>Yerel üretim bal ve organik ürünler</li>
                <li>Çerem köyünde otantik köy yaşamı</li>
                <li>Temiz dağ havası ve doğal sessizlik</li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-8">
              <h3 className="text-blue-900 mt-0">Pratik Bilgiler</h3>
              <ul className="text-blue-800 mb-0">
                <li>Su kaynağı: Valbonë Nehri boyunca su mevcut (arıtma tabletiyle)</li>
                <li>Konaklama: Çerem'de yerel aile evleri</li>
                <li>Market: Temel ihtiyaçlar için küçük dükkân</li>
                <li>İletişim: Sınırlı mobil sinyal</li>
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 my-8">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-amber-900 mt-0">Uyarılar ve Tavsiyeler</h3>
                  <ul className="text-amber-800 mb-0">
                    <li>Uzun iniş bölümlerinde dikkatli olun</li>
                    <li>Diz bandı veya koruyucu kullanın</li>
                    <li>Su arıtma tableti veya filtre bulundurun</li>
                    <li>Çerem'de konaklama için önceden haber verin</li>
                  </ul>
                </div>
              </div>
            </div>

            <h3>GPS Waypoint'leri</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-4">
                Koordinatlara tıklayarak Google Maps'te açabilirsiniz
              </p>
              <div className="font-mono text-sm space-y-1">
                <p>WP 1: <a href="https://www.google.com/maps/search/?api=1&query=42.43472,19.86167" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">N 42°26'05" E 19°51'42"</a> (1200m) - Valbonë Köy Merkezi</p>
                <p>WP 2: <a href="https://www.google.com/maps/search/?api=1&query=42.455,19.8875" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">N 42°27'18" E 19°53'15"</a> (1000m) - Nehir Geçişi</p>
                <p>WP 3: <a href="https://www.google.com/maps/search/?api=1&query=42.479,19.908" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">N 42°28'45" E 19°54'32"</a> (850m) - Orman Çıkışı</p>
                <p>WP 4: <a href="https://www.google.com/maps/search/?api=1&query=42.489,19.922" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">N 42°29'22" E 19°55'18"</a> (670m) - Çerem Köyü</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-12">
            <Link
              href="/rotada/theth-valbone"
              className="btn-secondary text-center"
            >
              Önceki Etap: Theth - Valbonë
            </Link>
            <Link
              href="/rotada/cerem-doberdol"
              className="btn-primary text-center"
            >
              Sonraki Etap: Çerem - Dobërdol
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}