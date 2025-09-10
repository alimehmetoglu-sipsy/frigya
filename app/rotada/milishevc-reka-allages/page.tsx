import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function MilishevcRekaAllagesPage() {
  return (
    <>
      <Navigation />
      
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link href="/rotada" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6">
            <ArrowLeft className="w-5 h-5" />
            Rotaya Geri Dön
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Etap 5
            </span>
            <span className="text-gray-600">Kosova</span>
          </div>
          
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Milishevc - Reka e Allagës
          </h1>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <p className="text-blue-900">
              Bu etapın detaylı bilgileri yakında eklenecektir.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-12">
            <Link href="/rotada/doberdol-milishevc" className="btn-secondary text-center">
              Önceki Etap
            </Link>
            <Link href="/rotada/reka-allages-kucishte" className="btn-primary text-center">
              Sonraki Etap
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}