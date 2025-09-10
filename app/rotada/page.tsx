import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Home, Utensils, MapPin, AlertTriangle, ChevronRight } from 'lucide-react';

export default function RotadaPage() {
  const routeStages = [
    { href: '/rotada/theth-valbone', title: 'Theth - Valbonë', subtitle: 'Etap 1', country: 'Arnavutluk' },
    { href: '/rotada/valbone-cerem', title: 'Valbonë - Çerem', subtitle: 'Etap 2', country: 'Arnavutluk' },
    { href: '/rotada/cerem-doberdol', title: 'Çerem - Dobërdol', subtitle: 'Etap 3', country: 'Arnavutluk' },
    { href: '/rotada/doberdol-milishevc', title: 'Dobërdol - Milishevc', subtitle: 'Etap 4', country: 'Arnavutluk - Kosova' },
    { href: '/rotada/milishevc-reka-allages', title: 'Milishevc - Reka e Allagës', subtitle: 'Etap 5', country: 'Kosova' },
    { href: '/rotada/reka-allages-kucishte', title: 'Reka e Allagës - Kuçishtë', subtitle: 'Etap 6', country: 'Kosova' },
    { href: '/rotada/kucishte-babino-polje', title: 'Kuçishtë - Babino Polje', subtitle: 'Etap 7', country: 'Kosova - Karadağ' },
    { href: '/rotada/babino-polje-plav', title: 'Babino Polje - Plav (Hrid Gölü)', subtitle: 'Etap 8', country: 'Karadağ' },
    { href: '/rotada/plav-vusanje', title: 'Plav - Vusanje (Gri Ada)', subtitle: 'Etap 9', country: 'Karadağ' },
    { href: '/rotada/vusanje-theth', title: 'Vusanje - Theth', subtitle: 'Etap 10', country: 'Karadağ - Arnavutluk' },
  ];

  const services = [
    {
      icon: Home,
      title: 'Konaklama',
      description: 'Bölge, sakinlerinin misafirperverliği ile tanınır. Ziyaretçiler, her üç ülkede de rota boyunca bulunan geleneksel evlerde konaklayabilirler. Konaklama çeşitliliği, "Kula" adı verilen geleneksel taş evlerden dağ kulübelerine ve yerel ev sahiplerinin yerel ve ev yapımı yemekleri servis ettiği küçük dağ lojlarına kadar uzanır. Mümkün olduğunda, kalacak yer garanti etmek için önceden rezervasyon yapmanız kesinlikle tavsiye edilir.'
    },
    {
      icon: Utensils,
      title: 'Yiyecek ve İçecek',
      description: 'Rota kısmen ıssız dağlık bölgelerden geçtiği ve yürüyüşler bazen bir konaklamadan diğerine oldukça uzun olduğu için, her zaman yanınızda yeterli su ve yiyecek bulundurmanız kesinlikle tavsiye edilir. Bakkallar çok nadir olup sadece Pejë veya Shkodër gibi büyük köyler veya küçük kasabalarda bulunabilir.'
    }
  ];

  const markings = [
    { country: 'Arnavutluk', colors: 'Beyaz/Kırmızı/Beyaz' },
    { country: 'Kosova', colors: 'Kırmızı/Beyaz/Kırmızı' },
    { country: 'Karadağ', colors: 'Kırmızı daire/Beyaz dolgu' },
  ];

  return (
    <>
      <Navigation />
      
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-center mb-6">
            Rotada
          </h1>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-8">
            Balkanların Zirveleri Rotası üzerindeki hizmetler ve bilmeniz gerekenler
          </p>
          
          <div 
            className="relative h-96 rounded-2xl overflow-hidden mb-12"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1464822759844-d150baec93d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black/30" />
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="font-display text-3xl font-bold text-center mb-12">
            Rota Etapları
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {routeStages.map((stage, index) => (
              <Link
                key={stage.href}
                href={stage.href}
                className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                    {stage.subtitle}
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
                </div>
                <h3 className="font-display text-xl font-bold mb-2 group-hover:text-primary-600 transition-colors">
                  {stage.title}
                </h3>
                <p className="text-gray-600">{stage.country}</p>
              </Link>
            ))}
          </div>

          <div className="space-y-12">
            <div>
              <h2 className="font-display text-2xl font-bold mb-8">Rotadaki Hizmetler</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {services.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <div key={index} className="bg-gray-50 rounded-xl p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-primary-600" />
                        </div>
                        <div>
                          <h3 className="font-display text-xl font-bold mb-3">{service.title}</h3>
                          <p className="text-gray-600 leading-relaxed">{service.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold mb-8">İşaretleme ve Yönlendirme</h2>
              <div className="bg-blue-50 rounded-xl p-8 mb-8">
                <p className="text-lg text-blue-900 mb-6">
                  Balkanların Zirveleri rotasının tamamı, aşağıdaki işaretleme sistemleri ve 
                  rota boyunca kurulmuş Balkanların Zirveleri yönlendirme levhaları ile işaretlenmiştir.
                </p>
                
                <h3 className="font-semibold text-lg mb-4 text-blue-900">Balkanların Zirveleri İşaretlemeleri</h3>
                
                <div className="space-y-3">
                  {markings.map((marking, index) => (
                    <div key={index} className="flex items-center justify-between bg-white rounded-lg p-4">
                      <span className="font-semibold text-gray-900">{marking.country}:</span>
                      <span className="text-gray-700">{marking.colors}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-8">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-4 text-amber-900">Önemli Uyarılar</h3>
                  <div className="space-y-3 text-amber-800">
                    <p>
                      Rota boyunca çok az çöp bertaraf tesisi bulunduğu için lütfen şunu unutmayın:
                    </p>
                    <p className="font-semibold">
                      Sadece fotoğraf çekin, sadece ayak izi bırakın ve çöpünüzü en yakın çöp kutusuna götürün!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}