import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { MapPin, Mountain, Clock, AlertTriangle, ChevronRight, Home, Utensils } from 'lucide-react';

// Force cache invalidation for Vercel
export default function RotadaPage() {
  const overnights = [
    '1. Seydiler, Afyonkarahisar',
    '2. Döğer, Afyonkarahisar',
    '3. İhsaniye, Afyonkarahisar',
    '4. Bayat, Afyonkarahisar',
    '5. Kümbet, Afyonkarahisar',
    '6. Ayazini, Afyonkarahisar',
    '7. Yazılıkaya (Midas Kenti), Eskişehir',
    '8. Seyitgazi, Eskişehir',
    '9. Han, Eskişehir',
    '10. İnönü, Eskişehir',
    '11. Kütahya Merkez',
    '12. Çavdarhisar (Aizanoi), Kütahya'
  ];

  const routeStages = [
    { href: '/rotada/seydiler-doger', title: 'Seydiler - Döğer', day: 'Gün 1', distance: '22 km', duration: '7-8 saat', difficulty: 'Orta' },
    { href: '/rotada/doger-ihsaniye', title: 'Döğer - İhsaniye', day: 'Gün 2', distance: '18 km', duration: '6-7 saat', difficulty: 'Kolay' },
    { href: '/rotada/ihsaniye-bayat', title: 'İhsaniye - Bayat', day: 'Gün 3', distance: '15 km', duration: '5-6 saat', difficulty: 'Kolay' },
    { href: '/rotada/bayat-kumbet', title: 'Bayat - Kümbet', day: 'Gün 4', distance: '20 km', duration: '6-7 saat', difficulty: 'Orta' },
    { href: '/rotada/kumbet-ayazini', title: 'Kümbet - Ayazini', day: 'Gün 5', distance: '17 km', duration: '5-6 saat', difficulty: 'Kolay' },
    { href: '/rotada/ayazini-yazilikaya', title: 'Ayazini - Yazılıkaya', day: 'Gün 6', distance: '24 km', duration: '8-9 saat', difficulty: 'Orta' },
    { href: '/rotada/yazilikaya-seyitgazi', title: 'Yazılıkaya - Seyitgazi', day: 'Gün 7', distance: '19 km', duration: '6-7 saat', difficulty: 'Orta' },
    { href: '/rotada/seyitgazi-han', title: 'Seyitgazi - Han', day: 'Gün 8', distance: '21 km', duration: '7-8 saat', difficulty: 'Orta' },
    { href: '/rotada/han-inonu', title: 'Han - İnönü', day: 'Gün 9', distance: '16 km', duration: '5-6 saat', difficulty: 'Kolay' },
    { href: '/rotada/inonu-kutahya', title: 'İnönü - Kütahya', day: 'Gün 10', distance: '23 km', duration: '7-8 saat', difficulty: 'Orta' },
  ];

  const difficultyLevels = [
    {
      level: 'Kolay',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'Düz veya hafif eğimli arazide, belirgin patikalarda yürüyüş. Temel kondisyon yeterlidir.'
    },
    {
      level: 'Orta',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      description: 'Orta eğimli arazide, bazen taşlık ve engebeli patikalarda yürüyüş. İyi kondisyon ve yürüyüş deneyimi gerekir.'
    },
    {
      level: 'Zor',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      description: 'Dik yamaçlar, kayalık bölgeler ve zorlu patikalar. Çok iyi kondisyon ve dağcılık deneyimi gerekir.'
    }
  ];

  return (
    <>
      <Navigation />

      <section className="pt-32 pb-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            FRİG YOLU ROTA AÇIKLAMASI
          </h1>
          <div className="border-b-2 border-primary-600 w-24 mb-8"></div>
        </div>
      </section>

      <section className="pb-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Fast Facts Section */}
          <div className="bg-primary-50 rounded-lg p-8 mb-12">
            <h2 className="font-display text-2xl font-bold mb-6 text-primary-900">HIZLI BİLGİLER:</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-lg mb-4">Ana Konaklama Noktaları</h3>
                <div className="space-y-2">
                  {overnights.map((overnight, index) => (
                    <p key={index} className="text-gray-700">{overnight}</p>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-3">Rota Özeti</h3>
                  <p className="text-gray-700 mb-4">
                    Frig Yolu, 506 kilometrelik ana güzergah ve 222 kilometrelik alternatif rotalarıyla toplam 728 km'ye ulaşan, Türkiye'nin en uzun yürüyüş rotalarından biridir.
                  </p>
                  <p className="text-gray-700">
                    Rota, M.Ö. 1200-700 yılları arasında Anadolu'da hüküm sürmüş Frig Uygarlığı'nın izlerini takip ederek, antik yerleşimler, kaya anıtları ve doğal güzelliklerden geçer.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-5 h-5 text-primary-600" />
                      <span className="font-semibold">Mesafe</span>
                    </div>
                    <p className="text-2xl font-bold text-primary-600">506 km</p>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-primary-600" />
                      <span className="font-semibold">Süre</span>
                    </div>
                    <p className="text-2xl font-bold text-primary-600">27-30 gün</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-gray-700 mb-6">
              Frig Yolu'na üç farklı noktadan başlanabilir: Gordion (Ankara), Seydiler (Afyonkarahisar) veya Yenice Çiftliği (Kütahya).
              Bu üç rota, Friglerin dini merkezi olan Yazılıkaya'da (Midas Kenti) birleşir.
            </p>

            <p className="text-gray-700 mb-6">
              Zorluk seviyesi kolaydan ortaya kadar değişir, ancak iyi bir fiziksel kondisyon ve uygun yürüyüş ekipmanı gerektirir
              (yürüyüş ayakkabısı, sırt çantası, baston, su matarası, güneş kremi vb.).
            </p>

            <p className="text-gray-700 mb-6">
              Rota tamamen işaretli olup, kırmızı-beyaz renklerle uluslararası standartlara göre işaretlenmiştir.
              109 yön levhası ve 217 yönlendirme tabelası ile 73 noktada bilgilendirme panoları bulunmaktadır.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8">
              <p className="text-blue-900">
                <strong>2018 yılında Avrupa Ramblers Birliği tarafından</strong> "Avrupa'nın En İyi Yürüyüş Rotası" seçilen
                Frig Yolu, hem bireysel yürüyüşçüler hem de gruplar için uygun bir rotadır.
              </p>
            </div>

            <h2 className="font-display text-2xl font-bold mt-12 mb-6">ÜÇ ANA GÜZERGAH</h2>

            <p className="text-gray-700 mb-6">
              Frig Yolu, üç farklı başlangıç noktasından Yazılıkaya'da birleşen üç ana güzergahtan oluşur:
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-bold text-lg mb-3">Güzergah 1</h4>
                <p className="text-sm font-semibold text-primary-600 mb-2">Afyonkarahisar - Seydiler</p>
                <ul className="space-y-2 text-gray-700">
                  <li>• 140 km uzunluk</li>
                  <li>• Aslantaş, Yılantaş önemli noktalar</li>
                  <li>• Maltaş, Aslankaya, Bürmece</li>
                  <li>• Döğer antik kenti</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-bold text-lg mb-3">Güzergah 2</h4>
                <p className="text-sm font-semibold text-primary-600 mb-2">Kütahya - Yenice Çiftliği</p>
                <ul className="space-y-2 text-gray-700">
                  <li>• 147 km uzunluk</li>
                  <li>• Zahran Vadisi</li>
                  <li>• Aizanoi antik kenti</li>
                  <li>• Fındık köyü</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-bold text-lg mb-3">Güzergah 3</h4>
                <p className="text-sm font-semibold text-primary-600 mb-2">Ankara - Gordion</p>
                <ul className="space-y-2 text-gray-700">
                  <li>• 219 km uzunluk</li>
                  <li>• Gordion (Yassıhöyük)</li>
                  <li>• Midas Tümülüsü</li>
                  <li>• Pessinus antik kenti</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Technical Details */}
          <div className="bg-gray-50 rounded-lg p-8 mb-12">
            <h3 className="font-display text-2xl font-bold mb-6">Teknik Detaylar</h3>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg p-6">
                <Mountain className="w-8 h-8 text-primary-600 mb-3" />
                <h4 className="font-semibold mb-2">Yükseklik</h4>
                <p className="text-sm text-gray-600 mb-1">Min: 750 metre</p>
                <p className="text-sm text-gray-600">Max: 1,820 metre (Akdağ)</p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <div className="w-8 h-8 text-primary-600 mb-3">↗</div>
                <h4 className="font-semibold mb-2">Toplam Tırmanış</h4>
                <p className="text-2xl font-bold text-primary-600">~12,500 m</p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <div className="w-8 h-8 text-primary-600 mb-3">↘</div>
                <h4 className="font-semibold mb-2">Toplam İniş</h4>
                <p className="text-2xl font-bold text-primary-600">~12,300 m</p>
              </div>
            </div>
          </div>

          {/* Difficulty Levels */}
          <div className="mb-12">
            <h3 className="font-display text-2xl font-bold mb-6">Zorluk Seviyeleri</h3>
            <p className="text-gray-700 mb-6">
              Frig Yolu boyunca zorluk seviyesi kolaydan ortaya kadar değişir.
            </p>

            <div className="space-y-4">
              {difficultyLevels.map((level, index) => (
                <div key={index} className={`${level.bgColor} rounded-lg p-6`}>
                  <h4 className={`font-bold text-lg mb-2 ${level.color}`}>
                    {level.level}
                  </h4>
                  <p className="text-gray-700">{level.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* GPS Data Info */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-12">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-lg mb-2">GPS ve İşaretleme</h4>
                <p className="text-gray-700 mb-2">
                  Tüm rota GPS koordinatları ile haritalandırılmıştır. Mobil uygulamalar üzerinden çevrimdışı haritalar indirilebilir.
                </p>
                <p className="text-gray-700">
                  Rota boyunca kırmızı-beyaz işaretlemeler ve yön levhaları bulunur. Kavşak noktalarda bilgilendirme panoları mevcuttur.
                </p>
              </div>
            </div>
          </div>

          {/* Route Stages - Detailed */}
          <div>
            <h3 className="font-display text-2xl font-bold mb-6">Örnek Rota Etapları</h3>
            <p className="text-gray-700 mb-6">
              Aşağıda Frig Yolu'nun Afyonkarahisar-Seydiler başlangıçlı güzergahının ilk 10 etabı listelenmiştir.
            </p>
            <div className="space-y-4">
              {routeStages.map((stage, index) => (
                <Link
                  key={stage.href}
                  href={stage.href}
                  className="block bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                          {stage.day}
                        </span>
                        <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                          stage.difficulty === 'Kolay' ? 'bg-green-50 text-green-600' :
                          stage.difficulty === 'Orta' ? 'bg-yellow-50 text-yellow-600' :
                          'bg-red-50 text-red-600'
                        }`}>
                          {stage.difficulty}
                        </span>
                      </div>
                      <h4 className="font-display text-xl font-bold mb-2 group-hover:text-primary-600 transition-colors">
                        {stage.title}
                      </h4>
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {stage.distance}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {stage.duration}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-primary-600 transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Additional Information Section */}
          <div className="mt-16 border-t pt-12">
            <h3 className="font-display text-2xl font-bold mb-6">ÖNEMLİ BİLGİLER</h3>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Home className="w-5 h-5 text-primary-600" />
                  Konaklama
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Köy evleri ve pansiyonlar</li>
                  <li>• Yerel halkın misafirperverliği</li>
                  <li>• Belediye misafirhaneleri</li>
                  <li>• Kamp alanları (bazı noktalarda)</li>
                  <li>• Önceden rezervasyon tavsiye edilir</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-primary-600" />
                  Yemek ve Su
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Köylerde yerel lezzetler</li>
                  <li>• Kahvaltı genellikle dahil</li>
                  <li>• Market ve bakkal imkanları</li>
                  <li>• Su kaynaklarına dikkat</li>
                  <li>• Atıştırmalık bulundurun</li>
                </ul>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mt-8">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg mb-2">Güvenlik Uyarıları</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Hava durumunu takip edin</li>
                    <li>• Yeterli su ve yiyecek taşıyın</li>
                    <li>• Acil durumlar için telefon şarjı</li>
                    <li>• İlk yardım malzemesi bulundurun</li>
                    <li>• Rotadan ayrılmayın</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-primary-50 rounded-lg">
              <h4 className="font-bold text-lg mb-4">İletişim ve Destek</h4>
              <p className="text-gray-700 mb-4">
                Rota hakkında daha fazla bilgi, rehber rezervasyonu veya acil durumlar için
                Frig Yolu Koordinasyon Merkezi ve yerel turizm ofisleri ile iletişime geçebilirsiniz.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/iletisim"
                  className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors inline-flex items-center gap-2"
                >
                  İletişim Bilgileri
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/tavsiyeler"
                  className="bg-white text-primary-600 border border-primary-600 px-6 py-3 rounded-lg hover:bg-primary-50 transition-colors inline-flex items-center gap-2"
                >
                  Seyahat Tavsiyeleri
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}