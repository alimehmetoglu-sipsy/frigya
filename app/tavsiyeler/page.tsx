import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function Tavsiyeler() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-center mb-8">Seyahat Tavsiyeleri</h1>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <p className="text-lg text-gray-600 mb-6">
              Bu sayfa geliştirme aşamasındadır. Yakında detaylı seyahat tavsiyeleri burada yer alacaktır.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Hava Koşulları</h3>
                <p className="text-gray-600">Günlük hava durumunu kontrol edin ve uygun giyinim yapın.</p>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Ekipman</h3>
                <p className="text-gray-600">Rahat yürüyüş botları ve çoraplar şarttır.</p>
              </div>
              
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Ulaşım</h3>
                <p className="text-gray-600">Her üç ülkeye de uçakla kolayca ulaşılabilir.</p>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Temel Gereksinimler</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Su geçirmez yağmurluk
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Yürüyüş botları
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  İlk yardım kiti
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  GPS cihazı
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}