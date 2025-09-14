import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, Clock, TrendingUp, MapPin, AlertCircle, Car } from 'lucide-react';

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
              <div className="text-lg font-bold">19.8 km</div>
              <div className="text-sm text-gray-600">Mesafe</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <Clock className="w-6 h-6 text-primary-600 mx-auto mb-2" />
              <div className="text-lg font-bold">7 saat</div>
              <div className="text-sm text-gray-600">Süre</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <TrendingUp className="w-6 h-6 text-primary-600 mx-auto mb-2" />
              <div className="text-lg font-bold">541m</div>
              <div className="text-sm text-gray-600">Tırmanış</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <TrendingUp className="w-6 h-6 text-orange-600 mx-auto mb-2 rotate-180" />
              <div className="text-lg font-bold">382m</div>
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
              backgroundImage: `url('https://images.unsplash.com/photo-1536431311719-398b6704d4cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black/20 rounded-2xl" />
          </div>

          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <h2 className="font-display text-xl font-bold mb-4">Hızlı Bilgiler</h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div><strong>Minimum Yükseklik:</strong> 670 metre</div>
              <div><strong>Maksimum Yükseklik:</strong> 1,156 metre</div>
              <div><strong>Zorluk Seviyesi:</strong> Kolay</div>
              <div><strong>İşaretleme:</strong> Beyaz/Kırmızı/Beyaz</div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8">
              <h2 className="font-display text-3xl font-bold mb-6 text-gray-900">Rota Açıklaması</h2>
              
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 border border-green-100">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2 text-gray-900">Genel Güzergah</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Bu etap <strong>Valbonë'den Çerem köyüne</strong> transferi içerir. Çerem'e ulaşmak için 
                        Fusha e Gjes Otel'den (WP 12) 20 kilometrelik çakıl yol boyunca taksi tutabilir veya 
                        yürüyebilirsiniz. İki köyü bağlayan en kısa yol olan katır patikası erozyon nedeniyle 
                        tahrip olmuştur.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-blue-100">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2 text-gray-900">Çerem Köyü Hakkında</h3>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        Çerem, Valbonë'nin yaklaşık 17 kilometre kuzeydoğusunda bulunan, büyük ölçüde terk edilmiş 
                        küçük bir köydür. Şu anda sadece yaz aylarında çobanlar tarafından iskan edilmektedir. 
                        Kötü hava koşulları nedeniyle kış aylarında köy boştur.
                      </p>
                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="text-blue-800 text-sm">
                          <strong>Not:</strong> Köyü Valbonë ve Bajram Curri şehri ile bağlayan yol kışın kar nedeniyle kapalıdır.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-yellow-100">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Car className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2 text-gray-900">Ulaşım Seçenekleri</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Bu etap için iki seçeneğiniz var: <strong>taksi</strong> veya <strong>yürüyüş</strong>. 
                        Fusha e Gjes Otel'deki personel taksi bulmanızda yardımcı olabilir. Yürüyüş rotası 
                        boyunca konaklama imkanı bulunmamaktadır.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="font-display text-2xl font-bold mb-6 text-gray-900">Detaylı Güzergah</h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xs">A</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Başlangıç - Fusha e Gjes Otel</h4>
                    <p className="text-gray-700">
                      Yürüyüş/sürüş, Valbonë merkezinin yaklaşık 3.5 kilometre güneybatısında bulunan 
                      Hotel Fusha e Gjes'ten (WP 12) başlar. Rragam ile Valbonë'yi bağlayan ana 
                      (asfaltlanmamış) yol boyunca kuzeybatıya doğru ilerliyoruz.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xs">B</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Valbonë Merkezi</h4>
                    <p className="text-gray-700">
                      Otelden yaklaşık 1 kilometre sonra bir köprüyü geçiyoruz (WP 1a). Birkaç kilometre 
                      ileride, köy merkezine yakın ana yolun yanında bulunan Valbonë Turist Bilgi Merkezi'ni 
                      (WP 2a) buluyoruz. Misafirhanelerin ve diğer tesislerin çoğu burada bulunur.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xs">C</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Çerem Yol Ayrımı</h4>
                    <p className="text-gray-700">
                      Ana yolu takip edin ve yaklaşık 7 kilometre sonra kavşakta (WP 4a) Çerem köyüne 
                      doğru sola dönün. Bu kavşakta sağa dönerseniz, rota sizi Dragobi köyüne ve ardından 
                      Bajram Curri şehrine götürür.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xs">D</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Dere Geçişi</h4>
                    <p className="text-gray-700">
                      Bir sonraki kavşakta (WP 5a) sola dönün ve çakıl yolu takip edin. Birkaç kilometre 
                      sonra, yolun üzerinden akan bir dereyi geçiyoruz (WP 6a).
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xs">E</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Çerem Köyüne Varış</h4>
                    <p className="text-gray-700">
                      Çakıl yolu 2 kilometre daha takip ediyoruz, sonra nehri geçip Çerem merkezine 
                      yaklaşıyoruz (WP 7a). Çerem, gecelemek veya misafirperver alpin kulübelerinden 
                      birinde mola vermek için iyi bir seçenektir.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-gradient-to-r from-blue-100 to-green-100 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary-600" />
                  Konaklama Önerisi
                </h4>
                <p className="text-gray-700">
                  <strong>Hysen Sula Misafirhanesi</strong> (WP 8a) - Çerem köyünde konforlu konaklama imkanı sunar.
                </p>
              </div>
            </div>

            <div className="bg-orange-50 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <TrendingUp className="w-8 h-8 text-orange-600 flex-shrink-0" />
                <div>
                  <h3 className="font-display text-xl font-bold mb-3 text-orange-900">Zorluk Seviyesi</h3>
                  <p className="text-orange-800 mb-4">
                    Bu etap <strong>kolay</strong> zorluk seviyesindedir. Çoğunlukla çakıl yol üzerinde 
                    yürüyüş veya araç transferi içerir.
                  </p>
                  
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-orange-900 mb-2">Dikkat Edilecek Hususlar:</h4>
                    <ul className="space-y-1 text-sm text-orange-800">
                      <li>• Uzun mesafe nedeniyle taksi tercih edilebilir</li>
                      <li>• Yürüyüş yapacaksanız su ve yiyecek bulundurun</li>
                      <li>• Rota boyunca konaklama yok</li>
                      <li>• Çerem'de sınırlı imkanlar var</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-8">
              <h3 className="text-blue-900 mt-0">Pratik Bilgiler</h3>
              <ul className="text-blue-800 mb-0">
                <li>En iyi ziyaret zamanı: Haziran - Ekim</li>
                <li>Su kaynağı: Valbonë merkezi ve Çerem'de mevcut</li>
                <li>Konaklama: Çerem'de Hysen Sula misafirhanesi</li>
                <li>Taksi: Fusha e Gjes Otel'den ayarlanabilir</li>
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 my-8">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-amber-900 mt-0">Uyarılar ve Tavsiyeler</h3>
                  <ul className="text-amber-800 mb-0">
                    <li>Çerem köyü yaz ayları dışında boş olabilir</li>
                    <li>Kış aylarında yol kar nedeniyle kapalı</li>
                    <li>Taksi rezervasyonunu önceden yapın</li>
                    <li>Yürüyecekseniz erken başlayın (20 km uzunluğunda)</li>
                  </ul>
                </div>
              </div>
            </div>

            <h3>UTM Waypoint'leri</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-4">
                Koordinatlara tıklayarak Google Maps'te açabilirsiniz
              </p>
              <div className="grid md:grid-cols-2 gap-2 font-mono text-xs">
                <p>WP 12: <a href="https://www.google.com/maps/search/?api=1&query=42.35066,19.87497" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">34T407097 4697679</a>, 995m - Fusha e Gjes Otel</p>
                <p>WP 1a: <a href="https://www.google.com/maps/search/?api=1&query=42.35565,19.87974" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">34T407468 4698259</a>, 986m - Köprü</p>
                <p>WP 2a: <a href="https://www.google.com/maps/search/?api=1&query=42.36789,19.88986" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">34T408260 4699582</a>, 956m - Valbonë Turist Merkezi</p>
                <p>WP 3a: <a href="https://www.google.com/maps/search/?api=1&query=42.37777,19.89658" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">34T408772 4700569</a>, 935m - Valbonë merkezi</p>
                <p>WP 4a: <a href="https://www.google.com/maps/search/?api=1&query=42.36652,19.95894" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">34T414397 4699325</a>, 672m - Çerem yol ayrımı (sola)</p>
                <p>WP 5a: <a href="https://www.google.com/maps/search/?api=1&query=42.37637,19.95066" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">34T413686 4700449</a>, 798m - Kavşak (sola)</p>
                <p>WP 6a: <a href="https://www.google.com/maps/search/?api=1&query=42.40201,19.96421" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">34T414761 4703230</a>, 1058m - Dere geçişi</p>
                <p>WP 7a: <a href="https://www.google.com/maps/search/?api=1&query=42.41834,19.96231" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">34T414611 4705051</a>, 1139m - Çerem merkezi</p>
                <p>WP 8a: <a href="https://www.google.com/maps/search/?api=1&query=42.41945,19.96401" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">34T414751 4705175</a>, 1155m - Hysen Sula misafirhanesi</p>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 my-8">
              <h3 className="text-green-900 mt-0">Alternatif Rota</h3>
              <p className="text-green-800 mb-0">
                Katır patikası (en kısa yol) eskiden iki köyü bağlardı ancak erozyon nedeniyle tahrip olmuştur. 
                Bu nedenle şu anda ana yol tek güvenli seçenektir. Yürüyüş yapmak isteyenler için 20 kilometrelik 
                çakıl yol boyunca manzara eşliğinde keyifli bir yürüyüş olabilir, ancak taksi daha pratik bir seçimdir.
              </p>
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