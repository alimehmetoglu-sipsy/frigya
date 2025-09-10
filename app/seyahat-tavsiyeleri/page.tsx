import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Cloud, Shirt, Plane, AlertTriangle, CheckCircle, Calendar } from 'lucide-react';

export default function SeyahatTavsiyeleriPage() {
  const travelCategories = [
    {
      icon: Cloud,
      title: 'Hava Koşulları ve Gün Işığı Saatleri',
      content: 'Yürüyüş gezinizi ne zaman gerçekleştirirseniz gerçekleştirin, her gün beklenen hava koşullarının farkında olmak çok önemlidir. Yolculuğunuz geç sonbahardan ilkbahara kadar herhangi bir zamandaysa, olumsuz hava koşullarının önemli ölçüde arttığını unutmayın. Bu, şiddetli yağmur veya karla karışık yağmur içerebilir. Bunlardan herhangi biri, önemli ölçüde daha az gün ışığı saati ile birleştiğinde, son derece zorlu bir girişim için malzemeler sağlayabilir.',
      tips: [
        'Günlük yürüyüş rotanızı karanlığa yakalanma riskini almamak için yeterli gün ışığı ile planlayın',
        'Hava durumunu düzenli olarak kontrol edin',
        'Kış aylarında ekstra dikkatli olun ve deneyimli rehber eşliğinde yürüyün'
      ]
    },
    {
      icon: Shirt,
      title: 'Giyim ve Ekipman',
      content: 'Sıcak ve kuru bir yürüyüşçü mutlu bir yürüyüşçüdır! Bu nedenle rahat yürüyüş/hiking botları ve çoraplar, şapka veya kep, eldiven, polar ceket, su ve rüzgar geçirmez ceket ve pantolonlar temel dış giyim öğeleridir. Bunun altında daha hafif orta ve iç katman giysiler serisi önerilir. Rotanın güney kısmının önemli bir bölümü küçük kırsal yollar boyunca olduğu için, taşımak için daha hafif yürüyüş ayakkabıları yararlı bir ek öğedir.',
      tips: [
        'Katmanlı giyinin - hava koşullarına göre ayarlama yapabilirsiniz',
        'Su geçirmez ekipman mutlaka bulundurun',
        'Yedek çorap ve eldiven paketleyin',
        'Uzak kısmen ıssız bölgelerde yürüdüğünüz için lamba, GPS, pusula, ilk yardım kiti ve cep telefonu taşımanız kesinlikle tavsiye edilir'
      ]
    },
    {
      icon: Plane,
      title: 'Ulaşım',
      content: 'Her üç ülkeye de uçakla kolayca ulaşılabilir: Tiran havaalanı (Arnavutluk); Podgorica havaalanı (Karadağ) ve Priştine havaalanı (Kosova). Her üç destinasyonda da sizi rotanın başlangıç noktasına götürecek yerel taksi hizmetlerini kolayca bulacaksınız. Ayrıca minibüsler (Arnavutluk) veya programlı otobüs hizmetleri (Karadağ) gibi farklı türde toplu taşıma seçenekleri de bulacaksınız.',
      tips: [
        'Havaalanından transferi önceden ayarlayın',
        'Yerel toplu taşıma seçeneklerini araştırın',
        'İlgili turist bilgi hizmetlerinden daha fazla bilgi edinilebilir'
      ]
    }
  ];

  const essentialItems = [
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
      
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-center mb-6">
            Seyahat Tavsiyeleri
          </h1>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-8">
            Balkanların Zirveleri rotası için güvenli ve keyifli bir yolculuk için önemli bilgiler
          </p>
          
          <div className="bg-green-50 border border-green-200 rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-8 h-8 text-green-600" />
              <h2 className="font-display text-2xl font-bold text-green-900">En İyi Ziyaret Zamanı</h2>
            </div>
            <p className="text-lg text-green-800">
              <strong>Haziran - Ekim</strong> ayları arasında yürüyüş yapmanız önerilir. 
              Bu dönemde hava koşulları daha elverişli ve gün ışığı saatleri daha uzundur.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="font-display text-3xl font-bold text-center mb-12">
            Önemli Konular
          </h2>
          
          <div className="space-y-12">
            {travelCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div key={index} className="bg-gray-50 rounded-2xl p-8">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-8 h-8 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-2xl font-bold mb-4">{category.title}</h3>
                      <p className="text-gray-600 leading-relaxed mb-6">{category.content}</p>
                      
                      <div className="bg-white rounded-lg p-6">
                        <h4 className="font-semibold text-lg mb-4">Önemli Tavsiyeler:</h4>
                        <ul className="space-y-2">
                          {category.tips.map((tip, tipIndex) => (
                            <li key={tipIndex} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold mb-8">Temel Ekipman Listesi</h2>
            <div className="bg-blue-50 rounded-2xl p-8">
              <div className="grid md:grid-cols-2 gap-4">
                {essentialItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-blue-900">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold mb-8">Genel Tavsiyeler</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-6">
                <strong>Balkanların Zirveleri Rotası</strong> gibi uzun mesafeli bir rotada yürümeye çıkan herkes, 
                ciddi bir fiziksel dayanıklılık testine giriyor. Her etap, sık sık izole ve uzak lokasyonlarda 
                ve zaman zaman 2300 metre yüksekliğe kadar çıkan yerlerde saatlerce açık havada geçirilen bir 
                dönemi içerir. Bu nedenle yola çıkmadan önce çeşitli faktörlerin dikkate alınması gerekir.
              </p>
              
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 my-8">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-3 text-red-900">Önemli Uyarı</h3>
                    <p className="text-red-800">
                      <strong>Yürüyüşü kendi riskinizle gerçekleştirdiğinizi lütfen unutmayın!</strong>
                    </p>
                    <p className="text-red-800 mt-2">
                      Acil durumlarda yerel kurtarma ekiplerinin iletişim bilgilerini yanınızda bulundurun 
                      ve deneyimli rehber eşliğinde yürüyüş yapmanızı kesinlikle tavsiye ederiz.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 my-8">
                <h3 className="font-semibold text-lg mb-4 text-yellow-900">Ek Öneriler</h3>
                <ul className="space-y-2 text-yellow-800">
                  <li>• Seyahat sigortası yaptırın</li>
                  <li>• Emergency contact listesi hazırlayın</li>
                  <li>• Yerel rehber kiralayın</li>
                  <li>• Grup halinde yürüyün</li>
                  <li>• Düzenli molalar verin</li>
                  <li>• Su ihtiyacınızı karşılayın</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}