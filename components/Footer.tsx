'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-display font-bold text-xl mb-4">Balkanların Zirveleri</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              192 km'lik efsanevi yürüyüş rotası ile Arnavutluk, Kosova ve Karadağ'ın en güzel dağ manzaralarını keşfedin.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Yerel halkın ekonomisine katkı sağlamak ve bölgenin dağ turizmini geliştirmek amacıyla oluşturulmuş bir projedir.
            </p>
          </div>

          <div>
            <h3 className="font-display font-bold text-xl mb-4">Hızlı Bağlantılar</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/rotada"
                  className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                >
                  Rota Açıklaması
                </Link>
              </li>
              <li>
                <Link 
                  href="/tavsiyeler"
                  className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                >
                  Seyahat Tavsiyeleri
                </Link>
              </li>
              <li>
                <Link 
                  href="/album"
                  className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                >
                  Fotoğraf Galerisi
                </Link>
              </li>
              <li>
                <Link 
                  href="/iletisim"
                  className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                >
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-xl mb-4">İletişim</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-primary-400 mt-0.5" />
                <a 
                  href="mailto:info@balkanlarinzirveleri.com"
                  className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                >
                  info@balkanlarinzirveleri.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-primary-400 mt-0.5" />
                <span className="text-gray-400 text-sm">+90 555 123 45 67</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-400 mt-0.5" />
                <span className="text-gray-400 text-sm">İstanbul, Türkiye</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-xl mb-4">Takip Edin</h3>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com/balkanlarinzirveleri"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com/balkanlarinzirveleri"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com/balkanzirveler"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://youtube.com/@balkanlarinzirveleri"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
            
            <div className="mt-6">
              <h4 className="font-semibold text-sm mb-3">İşbirliği</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-800 rounded px-3 py-2 text-center">
                  <span className="text-xs font-bold">🇦🇱</span>
                  <p className="text-xs mt-1">Arnavutluk</p>
                </div>
                <div className="bg-gray-800 rounded px-3 py-2 text-center">
                  <span className="text-xs font-bold">🇽🇰</span>
                  <p className="text-xs mt-1">Kosova</p>
                </div>
                <div className="bg-gray-800 rounded px-3 py-2 text-center">
                  <span className="text-xs font-bold">🇲🇪</span>
                  <p className="text-xs mt-1">Karadağ</p>
                </div>
                <div className="bg-gray-800 rounded px-3 py-2 text-center">
                  <span className="text-xs font-bold">🇹🇷</span>
                  <p className="text-xs mt-1">Türkiye</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Balkanların Zirveleri. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}