import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function DoberdolMilishevcPage() {
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
              Etap 4
            </span>
            <span className="text-gray-600">Arnavutluk - Kosova</span>
          </div>
          
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Dobërdol - Milishevc
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Arnavutluk'tan Kosova'ya geçiş yapacağınız sınır ötesi etap.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <p className="text-blue-900">
              Bu etapın detaylı bilgileri yakında eklenecektir. 
              Sınır ötesi geçiş ve rotanın en yüksek noktalarından biri olan bu etap,
              unutulmaz deneyimler sunar.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-12">
            <Link
              href="/rotada/cerem-doberdol"
              className="btn-secondary text-center"
            >
              Önceki Etap: Çerem - Dobërdol
            </Link>
            <Link
              href="/rotada/milishevc-reka-allages"
              className="btn-primary text-center"
            >
              Sonraki Etap: Milishevc - Reka e Allagës
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}