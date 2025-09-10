'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-display font-bold text-xl mb-4">Hakkımızda</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Balkanların Zirveleri, Arnavutluk, Kosova ve Karadağ'ın dağlık bölgelerinde sürdürülebilir turizmi geliştirmek için oluşturulmuş bir projedir.
            </p>
          </div>

          <div>
            <h3 className="font-display font-bold text-xl mb-4">Hızlı Bağlantılar</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/rota"
                  className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                >
                  Rota Bilgileri
                </Link>
              </li>
              <li>
                <Link 
                  href="/hazirlik"
                  className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                >
                  Hazırlık
                </Link>
              </li>
              <li>
                <Link 
                  href="/rehberler"
                  className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                >
                  Rehberler
                </Link>
              </li>
              <li>
                <Link 
                  href="/konaklama"
                  className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                >
                  Konaklama
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
                  href="mailto:info@peaksofthebalkans.com"
                  className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                >
                  info@peaksofthebalkans.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-primary-400 mt-0.5" />
                <span className="text-gray-400 text-sm">+383 49 123 456</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-400 mt-0.5" />
                <span className="text-gray-400 text-sm">Pejë, Kosova</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-xl mb-4">Sosyal Medya</h3>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com/peaksofthebalkan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com/peaksofthebalkans"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com/peaksofthebalka"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://youtube.com/@peaksofthebalkans"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
            
            <div className="mt-6">
              <h4 className="font-semibold text-sm mb-3">Ortaklar</h4>
              <div className="flex space-x-4">
                <div className="w-12 h-12 bg-gray-800 rounded flex items-center justify-center text-xs font-bold">
                  AL
                </div>
                <div className="w-12 h-12 bg-gray-800 rounded flex items-center justify-center text-xs font-bold">
                  XK
                </div>
                <div className="w-12 h-12 bg-gray-800 rounded flex items-center justify-center text-xs font-bold">
                  ME
                </div>
                <div className="w-12 h-12 bg-gray-800 rounded flex items-center justify-center text-xs font-bold">
                  GIZ
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