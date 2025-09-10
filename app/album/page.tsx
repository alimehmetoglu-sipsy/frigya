import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Camera, MapPin, ExternalLink } from 'lucide-react';

export default function AlbumPage() {
  const photoCategories = [
    {
      country: 'Arnavutluk',
      title: 'ARNAVUTLUK',
      description: 'Theth, Valbonë ve Arnavutluk Alpleri\'nin muhteşem manzaraları',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      link: '/album/arnavutluk'
    },
    {
      country: 'Kosova',
      title: 'KOSOVA',
      description: 'Pejë bölgesi ve Kosova\'nın dağlık kesimlerinden kareler',
      image: 'https://images.unsplash.com/photo-1464822759844-d150baec93d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      link: '/album/kosova'
    },
    {
      country: 'Karadağ',
      title: 'KARADAĞ',
      description: 'Plav, Vusanje ve Karadağ\'ın büyüleyici doğası',
      image: 'https://images.unsplash.com/photo-1551524164-6cf2ac531a87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      link: '/album/karadag'
    },
    {
      country: 'Diğerleri',
      title: 'DİĞERLERİ',
      description: 'Rota boyunca yakalanan özel anlar ve detaylar',
      image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      link: '/album/digerleri'
    }
  ];

  const highlightPhotos = [
    {
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Theth Şelalesi',
      location: 'Arnavutluk'
    },
    {
      src: 'https://images.unsplash.com/photo-1464822759844-d150baec93d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Dağ Zirvelerinden Manzara',
      location: 'Kosova'
    },
    {
      src: 'https://images.unsplash.com/photo-1551524164-6cf2ac531a87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Plav Gölü',
      location: 'Karadağ'
    },
    {
      src: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Geleneksel Köy Yaşamı',
      location: 'Balkanlar'
    }
  ];

  return (
    <>
      <Navigation />
      
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-600 rounded-full mb-6">
              <Camera className="w-10 h-10 text-white" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              FOTOĞRAF ALBÜMÜ
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Balkanların Zirveleri rotasından en güzel anları ve manzaraları keşfedin
            </p>
          </div>
          
          <div 
            className="relative h-96 rounded-2xl overflow-hidden"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <h2 className="font-display text-2xl font-bold mb-2">Rotanın En Güzel Manzaraları</h2>
              <p className="text-gray-200">192 kilometrelik yolculuğun her anından kareler</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="font-display text-3xl font-bold text-center mb-12">
            Ülkelere Göre Fotoğraflar
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {photoCategories.map((category, index) => (
              <Link
                key={category.country}
                href={category.link}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-gray-200"
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="font-display text-2xl font-bold mb-2">{category.title}</h3>
                  <p className="text-gray-200 mb-3">{category.description}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-300 group-hover:text-white transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    Fotoğrafları Görüntüle
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold mb-8">Öne Çıkan Fotoğraflar</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {highlightPhotos.map((photo, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="aspect-square overflow-hidden rounded-lg mb-3">
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">{photo.title}</h3>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <MapPin className="w-3 h-3" />
                    {photo.location}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-8 text-center">
            <Camera className="w-16 h-16 text-primary-600 mx-auto mb-6" />
            <h2 className="font-display text-2xl font-bold mb-4">Fotoğraflarınızı Paylaşın</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Balkanların Zirveleri rotasında çektiğiniz fotoğrafları bizimle paylaşın. 
              En güzel kareler web sitemizde yer alabilir!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:info@peaksofthebalkans.com"
                className="btn-primary"
              >
                Fotoğraf Gönder
              </a>
              <a
                href="#"
                className="btn-secondary"
              >
                Sosyal Medyada Paylaş
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}