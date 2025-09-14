import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { MapPin, Mountain, Clock, AlertTriangle, ChevronRight, Home, Utensils, Compass, Droplets } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function RoutesPage() {
  const t = useTranslations();

  const routeStages = [
    { href: '/routes/gordion-beylikopru', title: 'Gordion → Beylikköprü', day: 'Stage 1', distance: '18 km', duration: '5-6 hours', difficulty: 'Easy' },
    { href: '/routes/beylikopru-mulk', title: 'Beylikköprü → Mülk', day: 'Stage 2', distance: '34 km', duration: '8-9 hours', difficulty: 'Moderate' },
    { href: '/routes/mulk-sivrihisar', title: 'Mülk → Sivrihisar', day: 'Stage 3', distance: '26 km', duration: '6-7 hours', difficulty: 'Moderate' },
    { href: '/routes/sivrihisar-pessinus', title: 'Sivrihisar → Pessinus', day: 'Stage 4', distance: '32 km', duration: '7-8 hours', difficulty: 'Moderate' },
    { href: '/routes/ballihisar-yazilikaya', title: 'Ballıhisar → Yazılıkaya', day: 'Stage 5', distance: '35 km', duration: '8-9 hours', difficulty: 'Challenging' },
    { href: '/routes/yazilikaya-doger', title: 'Yazılıkaya → Döğer', day: 'Stage 6', distance: '35 km', duration: '7-8 hours', difficulty: 'Moderate' },
    { href: '/routes/doger-ayazini', title: 'Döğer → Ayazini', day: 'Stage 7', distance: '30 km', duration: '7 hours', difficulty: 'Moderate' },
    { href: '/routes/ayazini-seydiler', title: 'Ayazini → Seydiler', day: 'Stage 8', distance: '35 km', duration: '8 hours', difficulty: 'Moderate' }
  ];

  const difficultyLevels = [
    {
      level: 'Easy',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'Flat or gently sloping terrain on well-marked paths. Basic fitness sufficient.'
    },
    {
      level: 'Moderate',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      description: 'Medium inclines, sometimes rocky and uneven paths. Good fitness and hiking experience required.'
    },
    {
      level: 'Challenging',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      description: 'Steep slopes, rocky sections and difficult paths. Excellent fitness and mountain experience required.'
    }
  ];

  return (
    <>
      <Navigation />

      <section className="pt-32 pb-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            The Complete Phrygian Way Guide
          </h1>
          <p className="text-xl text-gray-600 mb-8">Three Starting Points, One Epic Adventure</p>
          <div className="border-b-2 border-primary-600 w-24"></div>
        </div>
      </section>

      <section className="pb-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Fast Facts Section */}
          <div className="bg-primary-50 rounded-lg p-8 mb-12">
            <h2 className="font-display text-2xl font-bold mb-6 text-primary-900">QUICK FACTS</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-lg mb-4">Main Routes</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2"></span>
                    <div>
                      <p className="font-semibold">Eastern Route (Gordion)</p>
                      <p className="text-sm text-gray-600">219 km • 8-10 days • Moderate to Challenging</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
                    <div>
                      <p className="font-semibold">Southern Route (Seydiler)</p>
                      <p className="text-sm text-gray-600">140 km • 6-7 days • Moderate</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                    <div>
                      <p className="font-semibold">Western Route (Yenice)</p>
                      <p className="text-sm text-gray-600">147 km • 6-7 days • Moderate</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-3">Route Overview</h3>
                  <p className="text-gray-700 mb-4">
                    The Phrygian Way spans 506 kilometers across western-central Turkey, following ancient paths used by the Phrygians over 3,000 years ago. This cultural trekking route is marked according to international standards with red and white blazes.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-5 h-5 text-primary-600" />
                      <span className="font-semibold">Total Distance</span>
                    </div>
                    <p className="text-2xl font-bold text-primary-600">506 km</p>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-primary-600" />
                      <span className="font-semibold">Duration</span>
                    </div>
                    <p className="text-2xl font-bold text-primary-600">20-30 days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Three Main Routes Detailed */}
          <div className="mb-12">
            <h2 className="font-display text-2xl font-bold mb-6">THE THREE MAIN ROUTES</h2>

            {/* Eastern Route */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                <div className="flex-1">
                  <h3 className="font-bold text-xl mb-2">Eastern Route: From Gordion</h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Distance:</strong> 219 km<br />
                        <strong>Duration:</strong> 8-10 days<br />
                        <strong>Difficulty:</strong> Moderate to Challenging<br />
                        <strong>Start Point:</strong> Yassıhöyük Village, Polatlı
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        <strong>Coordinates:</strong> 39.6505°N, 31.9931°E<br />
                        <strong>Elevation Range:</strong> 800-1,500m<br />
                        <strong>Total Ascent:</strong> ~4,500m
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Beginning at the UNESCO World Heritage Site of Gordion, this route takes you through the heart of ancient Phrygia. Follow the Porsuk River valley through Sivrihisar before reaching the sacred site of Pessinus. The trail then enters the dramatic Sakarya River valley before ascending into Mountainous Phrygia.
                  </p>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Key Highlights:</h4>
                    <ul className="grid md:grid-cols-2 gap-2 text-sm text-gray-700">
                      <li>• Gordion ancient capital & museum</li>
                      <li>• Midas Tumulus</li>
                      <li>• Sivrihisar historic center</li>
                      <li>• Temple of Cybele at Pessinus</li>
                      <li>• Byzantine church remains</li>
                      <li>• Yazılıkaya (Midas Monument)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Southern Route */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                <div className="flex-1">
                  <h3 className="font-bold text-xl mb-2">Southern Route: From Seydiler</h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Distance:</strong> 140 km<br />
                        <strong>Duration:</strong> 6-7 days<br />
                        <strong>Difficulty:</strong> Moderate<br />
                        <strong>Start Point:</strong> Seydiler Town, Afyonkarahisar
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        <strong>Coordinates:</strong> 38.5765°N, 30.5459°E<br />
                        <strong>Elevation Range:</strong> 900-1,400m<br />
                        <strong>Total Ascent:</strong> ~2,800m
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">
                    The most accessible route, perfect for beginners. Features dramatic fairy chimneys similar to Cappadocia, Byzantine rock churches, and passes through the scenic Göynüş Valley. This route offers the best village accommodation options.
                  </p>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Key Highlights:</h4>
                    <ul className="grid md:grid-cols-2 gap-2 text-sm text-gray-700">
                      <li>• Seydiler fairy chimneys</li>
                      <li>• Ayazini rock church (UNESCO tentative)</li>
                      <li>• Göynüş Valley & Aslantaş monument</li>
                      <li>• Byzantine rock settlements</li>
                      <li>• Traditional pottery workshops</li>
                      <li>• Natural thermal springs</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Western Route */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
                <div className="flex-1">
                  <h3 className="font-bold text-xl mb-2">Western Route: From Yenice Farm</h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Distance:</strong> 147 km<br />
                        <strong>Duration:</strong> 6-7 days<br />
                        <strong>Difficulty:</strong> Moderate<br />
                        <strong>Start Point:</strong> Yenice Çiftliği, Kütahya
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        <strong>Coordinates:</strong> 39.4417°N, 29.9751°E<br />
                        <strong>Elevation Range:</strong> 850-1,450m<br />
                        <strong>Total Ascent:</strong> ~3,200m
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">
                    The most scenic route, passing through pristine valleys and ancient Phrygian roads still visible in the rock. Features the spectacular Zahran Valley and numerous archaeological sites.
                  </p>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Key Highlights:</h4>
                    <ul className="grid md:grid-cols-2 gap-2 text-sm text-gray-700">
                      <li>• Zahran Valley (most beautiful section)</li>
                      <li>• Ancient rock-cut Phrygian roads</li>
                      <li>• Sökmen Plateau panoramas</li>
                      <li>• İncik cave systems</li>
                      <li>• Traditional village life</li>
                      <li>• Archaeological remains</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Details */}
          <div className="bg-gray-50 rounded-lg p-8 mb-12">
            <h3 className="font-display text-2xl font-bold mb-6">Technical Information</h3>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg p-6">
                <Mountain className="w-8 h-8 text-primary-600 mb-3" />
                <h4 className="font-semibold mb-2">Elevation</h4>
                <p className="text-sm text-gray-600 mb-1">Min: 800 meters</p>
                <p className="text-sm text-gray-600">Max: 1,500 meters</p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <div className="w-8 h-8 text-primary-600 mb-3">↗</div>
                <h4 className="font-semibold mb-2">Total Ascent</h4>
                <p className="text-2xl font-bold text-primary-600">~8,500 m</p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <div className="w-8 h-8 text-primary-600 mb-3">↘</div>
                <h4 className="font-semibold mb-2">Total Descent</h4>
                <p className="text-2xl font-bold text-primary-600">~8,300 m</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Trail Marking System</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li><span className="font-semibold text-red-600">Red & White Stripes:</span> Main trail markers</li>
                  <li><span className="font-semibold text-yellow-600">Yellow Arrows:</span> Alternative routes</li>
                  <li><span className="font-semibold text-blue-600">Blue Markers:</span> Water sources</li>
                  <li><span className="font-semibold text-green-600">Green Signs:</span> Points of interest</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Infrastructure</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• 109 directional poles</li>
                  <li>• 217 trail signs</li>
                  <li>• 73 information boards</li>
                  <li>• GPS waypoints marked</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Difficulty Levels */}
          <div className="mb-12">
            <h3 className="font-display text-2xl font-bold mb-6">Difficulty Levels</h3>
            <p className="text-gray-700 mb-6">
              The Phrygian Way difficulty varies from easy to challenging throughout the trail.
            </p>

            <div className="space-y-4">
              {difficultyLevels.map((level, index) => (
                <div key={index} className={`${level.bgColor} rounded-lg p-6`}>
                  <h4 className={`font-bold text-lg mb-2 ${level.color}`}>
                    {level.level}
                  </h4>
                  <p className="text-gray-700">{level.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Route Stages - Detailed */}
          <div>
            <h3 className="font-display text-2xl font-bold mb-6">Sample Itinerary: Eastern Route Stages</h3>
            <p className="text-gray-700 mb-6">
              Below are the main stages of the Eastern Route from Gordion to Yazılıkaya and continuing to Seydiler.
            </p>
            <div className="space-y-4">
              {routeStages.map((stage, index) => (
                <Link
                  key={stage.href}
                  href={stage.href}
                  className="block bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                          {stage.day}
                        </span>
                        <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                          stage.difficulty === 'Easy' ? 'bg-green-50 text-green-600' :
                          stage.difficulty === 'Moderate' ? 'bg-yellow-50 text-yellow-600' :
                          'bg-red-50 text-red-600'
                        }`}>
                          {stage.difficulty}
                        </span>
                      </div>
                      <h4 className="font-display text-xl font-bold mb-2 group-hover:text-primary-600 transition-colors">
                        {stage.title}
                      </h4>
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {stage.distance}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {stage.duration}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-primary-600 transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* GPS Navigation */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 my-12">
            <div className="flex items-start gap-4">
              <Compass className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-lg mb-2">GPS Navigation & Digital Resources</h4>
                <p className="text-gray-700 mb-2">
                  Complete GPS tracks are available for download in GPX format. Offline maps compatible with Maps.me and OsmAnd. All major waypoints and emergency contact points are marked.
                </p>
                <p className="text-gray-700">
                  <strong>Key Coordinates:</strong><br />
                  Gordion: 39.6505°N, 31.9931°E | Yazılıkaya: 39.0334°N, 30.5231°E<br />
                  Seydiler: 38.5765°N, 30.5459°E | Yenice: 39.4417°N, 29.9751°E
                </p>
              </div>
            </div>
          </div>

          {/* Additional Information Section */}
          <div className="mt-16 border-t pt-12">
            <h3 className="font-display text-2xl font-bold mb-6">ESSENTIAL INFORMATION</h3>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Home className="w-5 h-5 text-primary-600" />
                  Accommodation
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Village guesthouses and pensions</li>
                  <li>• Local hospitality in traditional homes</li>
                  <li>• Municipal guesthouses</li>
                  <li>• Camping areas (designated spots)</li>
                  <li>• Advance booking recommended</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-primary-600" />
                  Food & Water
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Local cuisine in villages</li>
                  <li>• Breakfast usually included</li>
                  <li>• Markets and shops available</li>
                  <li>• Water sources marked on trail</li>
                  <li>• Carry snacks and emergency food</li>
                </ul>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mt-8">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg mb-2">Safety Guidelines</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Check weather forecasts daily</li>
                    <li>• Carry sufficient water (3-4L in summer)</li>
                    <li>• Keep phone charged for emergencies</li>
                    <li>• Carry first aid kit</li>
                    <li>• Stay on marked trails</li>
                    <li>• Emergency Services: 112</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-primary-50 rounded-lg">
              <h4 className="font-bold text-lg mb-4">Contact & Support</h4>
              <p className="text-gray-700 mb-4">
                For more information about the route, guide reservations, or emergencies, contact the Phrygian Way Coordination Center and local tourism offices.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/contact"
                  className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors inline-flex items-center gap-2"
                >
                  Contact Information
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/travel-tips"
                  className="bg-white text-primary-600 border border-primary-600 px-6 py-3 rounded-lg hover:bg-primary-50 transition-colors inline-flex items-center gap-2"
                >
                  Travel Tips
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}