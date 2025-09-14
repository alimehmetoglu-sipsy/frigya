import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, Clock, TrendingUp, MapPin, AlertCircle, Mountain, Droplets, Home, Camera } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function GordionBeylikopruPage() {
  const t = useTranslations();

  return (
    <>
      <Navigation />

      <section className="pt-32 pb-8 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link href="/routes" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6">
            <ArrowLeft className="w-5 h-5" />
            Back to Routes
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Stage 1
            </span>
            <span className="text-gray-600">Eastern Route</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Gordion → Beylikköprü
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <MapPin className="w-6 h-6 text-primary-600 mx-auto mb-2" />
              <div className="text-lg font-bold">18 km</div>
              <div className="text-sm text-gray-600">Distance</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <Clock className="w-6 h-6 text-primary-600 mx-auto mb-2" />
              <div className="text-lg font-bold">5-6 hours</div>
              <div className="text-sm text-gray-600">Duration</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <TrendingUp className="w-6 h-6 text-primary-600 mx-auto mb-2" />
              <div className="text-lg font-bold">150m</div>
              <div className="text-sm text-gray-600">Elevation Gain</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <Mountain className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <div className="text-lg font-bold">Easy</div>
              <div className="text-sm text-gray-600">Difficulty</div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Route Description */}
          <div className="prose prose-lg max-w-none mb-12">
            <h2 className="font-display text-2xl font-bold mb-4">Stage Overview</h2>
            <p className="text-gray-700 mb-4">
              Begin your Phrygian Way journey at the ancient capital of Gordion, one of the most important archaeological sites in Turkey and a UNESCO World Heritage Site as of 2023. This opening stage offers a gentle introduction to the trail, following the Sakarya River valley through agricultural lands with well-marked, mostly flat paths.
            </p>
            <p className="text-gray-700 mb-4">
              Before setting off, take time to explore the Gordion Museum and the famous Tumulus MM, traditionally associated with King Midas's father. The museum houses exceptional Phrygian artifacts, including the world's oldest standing wooden furniture (8th century BCE).
            </p>
          </div>

          {/* Key Points */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-lg mb-4">Route Details</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Starting Point</h4>
                <p className="text-gray-700 text-sm mb-1">Yassıhöyük Village, Polatlı</p>
                <p className="text-gray-600 text-sm">GPS: 39.6505°N, 31.9931°E</p>
                <p className="text-gray-600 text-sm">Elevation: 695m</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Ending Point</h4>
                <p className="text-gray-700 text-sm mb-1">Beylikköprü Village</p>
                <p className="text-gray-600 text-sm">GPS: 39.5832°N, 31.8456°E</p>
                <p className="text-gray-600 text-sm">Elevation: 845m</p>
              </div>
            </div>
          </div>

          {/* Trail Highlights */}
          <div className="mb-12">
            <h3 className="font-display text-xl font-bold mb-4">Trail Highlights</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-600 font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Gordion Archaeological Site (0 km)</h4>
                  <p className="text-gray-700 text-sm">
                    Start at the ancient capital of Phrygia. Visit the museum (entry fee required) to see incredible artifacts including wooden furniture from the 8th century BCE. The large tumulus (burial mound) nearby is traditionally associated with King Midas's father.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-600 font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Sakarya River Valley (2-10 km)</h4>
                  <p className="text-gray-700 text-sm">
                    Follow the peaceful river valley through farmland. The path is well-defined and mostly flat, perfect for warming up your hiking legs. You'll pass through fields of wheat, sunflowers (in season), and grazing areas.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-600 font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Ancient Road Sections (12-15 km)</h4>
                  <p className="text-gray-700 text-sm">
                    Look for sections of ancient Phrygian roads carved into the bedrock. These remarkable engineering feats have survived for nearly 3,000 years and show deep wheel ruts from centuries of use.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-600 font-bold">4</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Beylik Bridge & Village (18 km)</h4>
                  <p className="text-gray-700 text-sm">
                    Arrive at the Ottoman-era Beylik Bridge and the welcoming village of Beylikköprü. The village offers basic accommodation and represents authentic rural Turkish life.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Practical Information */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-blue-600" />
              Practical Information
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Home className="w-4 h-4 text-blue-600" />
                  Accommodation
                </h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Beylikköprü village guesthouse</li>
                  <li>• Basic rooms with shared bathroom</li>
                  <li>• Breakfast usually included</li>
                  <li>• Book ahead: +90 XXX XXX XXXX</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-blue-600" />
                  Water & Supplies
                </h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Fill water at Gordion before starting</li>
                  <li>• Limited water sources on trail</li>
                  <li>• Small shop in Beylikköprü</li>
                  <li>• Carry 2-3 liters minimum</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 p-4 bg-white rounded">
              <h4 className="font-semibold mb-2">Trail Conditions</h4>
              <p className="text-sm text-gray-700">
                Well-marked with red and white blazes. Mostly dirt tracks and farm roads. Can be muddy after rain.
                No technical sections. Suitable for beginners with basic fitness.
              </p>
            </div>
          </div>

          {/* Tips Section */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-lg mb-4">Tips for This Stage</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-1">•</span>
                <span>Start early to avoid afternoon heat, especially in summer</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-1">•</span>
                <span>Visit Gordion Museum before starting (opens at 8:30 AM)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-1">•</span>
                <span>Pack lunch as there are no shops along the route</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-1">•</span>
                <span>Consider arranging transport back to Gordion if not continuing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-1">•</span>
                <span>Village dogs are usually friendly but carry a walking stick</span>
              </li>
            </ul>
          </div>

          {/* Photo Opportunities */}
          <div className="bg-green-50 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Camera className="w-5 h-5 text-green-600" />
              Photo Opportunities
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <p className="font-semibold mb-1">Morning (Best Light)</p>
                <ul className="space-y-1">
                  <li>• Gordion Tumulus at sunrise</li>
                  <li>• Sakarya River reflections</li>
                  <li>• Traditional village houses</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-1">Afternoon</p>
                <ul className="space-y-1">
                  <li>• Ancient road wheel ruts</li>
                  <li>• Ottoman Beylik Bridge</li>
                  <li>• Rural landscape vistas</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-8 border-t">
            <Link
              href="/routes"
              className="text-gray-600 hover:text-primary-600 transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Routes
            </Link>
            <Link
              href="/routes/beylikopru-mulk"
              className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
            >
              Next Stage: Beylikköprü → Mülk
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}