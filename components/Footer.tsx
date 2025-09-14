'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-display font-bold text-xl mb-4">Phrygian Way</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Walk through 3000 years of history on Turkey's most spectacular 506km trail through ancient Phrygia.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              A cultural heritage project supported by the Turkish Ministry of Culture and Tourism to preserve and promote the region's historical legacy.
            </p>
          </div>

          <div>
            <h3 className="font-display font-bold text-xl mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/en/routes"
                  className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                >
                  Route Details
                </Link>
              </li>
              <li>
                <Link 
                  href="/en/travel-tips"
                  className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                >
                  Travel Tips
                </Link>
              </li>
              <li>
                <Link 
                  href="/en/gallery"
                  className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                >
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link 
                  href="/en/contact"
                  className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-xl mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-primary-400 mt-0.5" />
                <a
                  href="mailto:info@frigyolu.com"
                  className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                >
                  info@phrygianway.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-primary-400 mt-0.5" />
                <span className="text-gray-400 text-sm">+90 555 123 45 67</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-400 mt-0.5" />
                <span className="text-gray-400 text-sm">Afyonkarahisar, Turkey</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-xl mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/phrygianway"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/phrygianway"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/phrygianway"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com/@phrygianway"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
            
            <div className="mt-6">
              <h4 className="font-semibold text-sm mb-3">Trail Provinces</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-800 rounded px-3 py-2 text-center">
                  <span className="text-xs font-bold">📍</span>
                  <p className="text-xs mt-1">Afyonkarahisar</p>
                </div>
                <div className="bg-gray-800 rounded px-3 py-2 text-center">
                  <span className="text-xs font-bold">📍</span>
                  <p className="text-xs mt-1">Eskişehir</p>
                </div>
                <div className="bg-gray-800 rounded px-3 py-2 text-center">
                  <span className="text-xs font-bold">📍</span>
                  <p className="text-xs mt-1">Kütahya</p>
                </div>
                <div className="bg-gray-800 rounded px-3 py-2 text-center">
                  <span className="text-xs font-bold">📍</span>
                  <p className="text-xs mt-1">Ankara</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Phrygian Way. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}