import { Suspense } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';

interface Props {
  searchParams: { id?: string };
}

export default function ThankYouPage({ searchParams }: Props) {
  const registrationId = searchParams.id;

  return (
    <>
      <Navigation />

      <main className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
            {/* Success Icon */}
            <div className="mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                🎉 Kaydınız Tamamlandı!
              </h1>
              <p className="text-gray-600 text-lg">
                Frigya Yolu yürüyüş ailesine hoş geldiniz
              </p>
            </div>

            {/* Registration Details */}
            {registrationId && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">Kayıt Numaranız:</span> {registrationId}
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Bu numarayı not alın, ileride ihtiyaç duyabilirsiniz.
                </p>
              </div>
            )}

            {/* What's Next */}
            <div className="text-left space-y-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-800 text-center">
                Sırada Ne Var?
              </h2>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">E-posta Onayı (5 dk içinde)</h3>
                    <p className="text-gray-600 text-sm">
                      Size bir onay e-postası gönderdik. Spam klasörünüzü de kontrol edin.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Değerlendirme (2-3 gün)</h3>
                    <p className="text-gray-600 text-sm">
                      Uzman ekibimiz başvurunuzu inceyip size en uygun rotayı belirleyecek.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Detaylı Bilgilendirme</h3>
                    <p className="text-gray-600 text-sm">
                      Size özel hazırlanacak rehber ile ekipman listesi, rota detayları ve toplantı bilgileri paylaşılacak.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-semibold">🎒</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Macera Başlasın!</h3>
                    <p className="text-gray-600 text-sm">
                      Tarihi Frigya Yolu'nda unutulmaz anılar biriktirmeye hazır olun.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4 border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Şimdi Ne Yapabilirsiniz?
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <Link
                  href="/seyahat-tavsiyeleri"
                  className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <span>📖 Hazırlık Rehberi</span>
                </Link>

                <Link
                  href="/album"
                  className="flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <span>📸 Fotoğraf Galerisi</span>
                </Link>
              </div>

              <div className="grid md:grid-cols-3 gap-3 mt-4">
                <a
                  href="https://www.instagram.com/frigyayolu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  📱 Instagram
                </a>

                <a
                  href="https://wa.me/+905XX123456"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  💬 WhatsApp
                </a>

                <Link
                  href="/"
                  className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  🏠 Ana Sayfa
                </Link>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-gray-50 rounded-lg p-4 mt-8 text-center">
              <h4 className="font-semibold text-gray-800 mb-2">
                Sorularınız mı var?
              </h4>
              <p className="text-sm text-gray-600">
                E-posta: <a href="mailto:info@frigyayolu.com" className="text-blue-600 hover:underline">info@frigyayolu.com</a>
              </p>
              <p className="text-sm text-gray-600">
                Telefon: <a href="tel:+905XX123456" className="text-blue-600 hover:underline">+90 5XX 123 456</a>
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Mesai saatleri: Pazartesi-Cuma 09:00-18:00
              </p>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center space-x-4 bg-white rounded-full px-6 py-3 shadow-md">
            <div className="flex text-yellow-400">
              ★★★★★
            </div>
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-blue-600">4.9/5</span> - 2,847 mutlu katılımcı
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}