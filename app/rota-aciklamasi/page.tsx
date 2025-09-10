import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { MapPin, TrendingUp, Calendar, Users, Mountain, Navigation as NavigationIcon } from 'lucide-react';

export default function RotaAciklamasiPage() {
  return (
    <>
      <Navigation />
      
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-center mb-6">
            Rota Açıklaması
          </h1>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto">
            192 kilometrelik Balkanların Zirveleri rotası hakkında bilmeniz gereken her şey
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-primary-50 rounded-2xl p-8 mb-12">
            <h2 className="font-display text-2xl font-bold mb-6 text-gray-900">HIZLI BİLGİLER</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="font-semibold text-lg mb-4">Konaklama Noktaları:</h3>
                <ol className="space-y-2 text-gray-700">
                  <li>1. Theth, Arnavutluk</li>
                  <li>2. Valbonë, Arnavutluk</li>
                  <li>3. Çerem, Arnavutluk</li>
                  <li>4. Dobërdol, Arnavutluk</li>
                  <li>5. Milishevc, Kosova</li>
                  <li>6. Reka e Allagës, Kosova</li>
                  <li>7. Liqinat i Kuçishtës, Kosova</li>
                  <li>8. Babino Polje, Karadağ</li>
                  <li>9. Plav, Karadağ</li>
                  <li>10. Vusanje, Karadağ</li>
                </ol>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Yükseklik Bilgileri:</h3>
                  <p className="text-gray-700">
                    <strong>Minimum:</strong> 670 metre (Çerem, Arnavutluk yakınlarında)<br/>
                    <strong>Maksimum:</strong> 2.290 metre (Dobërdol-Milishevc sınır hattı)
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-2">Kümülatif Yükseklik:</h3>
                  <p className="text-gray-700">
                    <strong>Toplam Tırmanış:</strong> yaklaşık 9.800 metre<br/>
                    <strong>Toplam İniş:</strong> yaklaşık 9.900 metre
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 text-center">
                <MapPin className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">192 km</div>
                <div className="text-sm text-gray-600">Toplam Mesafe</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <Calendar className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">10-13</div>
                <div className="text-sm text-gray-600">Gün</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <Mountain className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">3</div>
                <div className="text-sm text-gray-600">Ülke</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <TrendingUp className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">2290m</div>
                <div className="text-sm text-gray-600">Max Yükseklik</div>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
              <h2 className="font-display text-3xl font-bold mb-6 text-gray-900">Rota Hakkında</h2>
              
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 border border-blue-100">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mountain className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl mb-3 text-gray-900">Rotanın Kapsamı</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Oldukça iddialı <strong>"Balkanların Zirveleri"</strong> rotası 192 km'lik bir mesafeyi kapsar ve 
                        üç ülkeyi geçerek bir döngü tamamlar. Dobërdol (Arnavutluk) ve Milishevc (Kosova) sınır 
                        bölgesinde deniz seviyesinin 2300 metre üzerine kadar çıkan yüksek alpin manzaralardan geçer.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 border border-green-100">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl mb-3 text-gray-900">Başlangıç Noktaları</h3>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        Yürüyüş her ülkede başlatılabilir:
                      </p>
                      <div className="grid md:grid-cols-3 gap-3">
                        <div className="bg-green-50 rounded-lg p-3 text-center">
                          <div className="font-semibold text-green-900">Theth</div>
                          <div className="text-sm text-green-700">Arnavutluk</div>
                        </div>
                        <div className="bg-green-50 rounded-lg p-3 text-center">
                          <div className="font-semibold text-green-900">Plav</div>
                          <div className="text-sm text-green-700">Karadağ</div>
                        </div>
                        <div className="bg-green-50 rounded-lg p-3 text-center">
                          <div className="font-semibold text-green-900">Pejë</div>
                          <div className="text-sm text-green-700">Kosova</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 border border-orange-100">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl mb-3 text-gray-900">Süre ve Zorluk</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Rotanın 10 etabı, yürüyüşçünün motivasyonu ve kondisyonuna bağlı olarak 
                        <strong> 10 ila 13 günde</strong> tamamlanabilir. Zorluk seviyesi kolaydan ortaya kadar değişir, 
                        ancak iyi bir fiziksel kondisyon ve dağ ekipmanı gerektirir.
                      </p>
                      
                      <div className="mt-4 bg-orange-50 rounded-lg p-4">
                        <h4 className="font-semibold text-orange-900 mb-2">Gerekli Ekipman:</h4>
                        <div className="grid md:grid-cols-2 gap-2 text-sm text-orange-800">
                          <div>• Yürüyüş botları</div>
                          <div>• Su geçirmez giysiler</div>
                          <div>• Kafa lambası</div>
                          <div>• GPS cihazı</div>
                          <div>• İlk yardım kiti</div>
                          <div>• Cep telefonu</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 border border-red-100">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl mb-3 text-gray-900">Güvenlik ve Rehberlik</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Rotanın tamamı işaretlenmiş ve yönlendirilmiş olsa da, kısmen ıssız dağ bölgelerinden geçer. 
                        Bu nedenle <strong>grup halinde</strong> veya bir <strong>yürüyüş rehberi eşliğinde</strong> 
                        yürüyüş yapılması önerilir.
                      </p>
                      
                      <div className="bg-red-50 rounded-lg p-4">
                        <p className="text-red-800 text-sm">
                          <strong>Profesyonel Rehberlik:</strong> DAV (Deutscher Alpen Verein) tarafından eğitilmiş 
                          ve rotaya aşina olan yerel dağ rehberleri, bireyler ve küçük gruplar için hazırdır.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="font-display text-2xl font-bold mb-6">Zorluk Seviyeleri</h2>
            <p className="text-gray-700 mb-4">
              Balkanların Zirveleri Rotası boyunca zorluk seviyesi kolaydan ortaya kadar değişir.
            </p>

            <div className="space-y-4 mb-8">
              <div className="bg-green-50 border-l-4 border-green-500 p-4">
                <h3 className="font-semibold text-green-900 mb-2">Kolay</h3>
                <p className="text-green-800">
                  Sadece hafif yokuşlar, rahat patikalar ve harita olmadan bile kolay yön bulma.
                </p>
              </div>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <h3 className="font-semibold text-yellow-900 mb-2">Orta</h3>
                <p className="text-yellow-800">
                  İşaretli bir patikayı takip eder, muhtemelen dik yokuşlar ve düşme riski vardır. 
                  Temel yön bulma becerileri ve sağlam ayakkabı gerekir.
                </p>
              </div>
              
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <h3 className="font-semibold text-red-900 mb-2">Zor</h3>
                <p className="text-red-800">
                  Genellikle tanınabilir bir patika yoktur. Arazi, araziyi doğru değerlendirmek için 
                  iyi gelişmiş bir yetenek ve mükemmel yön bulma becerileri gerektirir. Birkaç yüksek 
                  açık bölüm, zor yamaçlar. Alpin ekipman deneyimi ve aşinalığı gerekir.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <NavigationIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="font-display text-3xl font-bold mb-3 text-gray-900">GPS Verileri</h2>
                  <p className="text-gray-600">Navigasyon için detaylı konum bilgileri</p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-lg mb-4 text-gray-900">GPS Formatı</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Farklı bölümlerde sağlanan GPS (UTM) verileri <strong>üç kısımdan</strong> oluşur:
                </p>
                
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <div className="font-bold text-blue-900 text-lg">WP 1</div>
                    <div className="text-sm text-blue-700">Waypoint Numarası</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <div className="font-bold text-green-900 text-lg">34T399041 4694459</div>
                    <div className="text-sm text-green-700">UTM Koordinatları</div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4 text-center">
                    <div className="font-bold text-orange-900 text-lg">716m</div>
                    <div className="text-sm text-orange-700">Yükseklik</div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">
                    <strong>Not:</strong> Metin içinde waypoint numaraları (örn. WP 1) her açıklamanın 
                    sonunda listelenen öğelere atıfta bulunur. Tüm koordinatlar tıklanabilir ve 
                    Google Maps'te açılır.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
              <h3 className="font-semibold text-blue-900 mb-3">Önemli Notlar:</h3>
              <ul className="space-y-2 text-blue-800">
                <li>• Rotaya her ülkeden başlanabilir</li>
                <li>• Grup halinde veya rehber eşliğinde yürümeniz önerilir</li>
                <li>• Dağ ekipmanı zorunludur</li>
                <li>• Acil durum numaralarını yanınızda bulundurun</li>
                <li>• Hava durumunu düzenli kontrol edin</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}