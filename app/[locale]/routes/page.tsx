'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import RoutesHero from '@/components/routes/RoutesHero';
import RouteSelector, { Route } from '@/components/routes/RouteSelector';
import InteractiveRouteMap from '@/components/routes/InteractiveRouteMap';
import RouteDetails from '@/components/routes/RouteDetails';
import ElevationProfile from '@/components/routes/ElevationProfile';
import SampleItineraries from '@/components/routes/SampleItineraries';
import Link from 'next/link';
import { MapPin, Mountain, Clock, AlertTriangle, ChevronRight, Home, Utensils, Compass, Droplets, Download } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function RoutesPage() {
  const t = useTranslations();
  const [selectedRoute, setSelectedRoute] = useState<Route | undefined>();

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

      {/* Hero Section */}
      <RoutesHero />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Route Selector */}
          <RouteSelector
            onRouteSelect={setSelectedRoute}
            selectedRoute={selectedRoute}
          />

          {/* Interactive Map */}
          <InteractiveRouteMap
            selectedRoute={selectedRoute}
            onMarkerClick={(marker) => console.log('Marker clicked:', marker)}
          />

          {/* Route Details */}
          {selectedRoute && (
            <div className="mt-12">
              <RouteDetails route={selectedRoute} />
            </div>
          )}

          {/* Elevation Profile */}
          {selectedRoute && (
            <div className="mt-12">
              <ElevationProfile routeId={selectedRoute.id} />
            </div>
          )}

          {/* Sample Itineraries */}
          <div className="mt-12">
            <SampleItineraries />
          </div>
          {/* GPS Downloads Section */}
          <div className="mt-12 bg-primary-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-6">GPS Navigation & Downloads</h3>
            <p className="text-gray-700 mb-6">
              Download complete GPS tracks for offline navigation. Compatible with all major GPS devices and smartphone apps.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <button className="bg-white border-2 border-primary-600 text-primary-600 px-6 py-3 rounded-lg hover:bg-primary-50 transition-colors flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                Eastern Route GPX
              </button>
              <button className="bg-white border-2 border-primary-600 text-primary-600 px-6 py-3 rounded-lg hover:bg-primary-50 transition-colors flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                Southern Route GPX
              </button>
              <button className="bg-white border-2 border-primary-600 text-primary-600 px-6 py-3 rounded-lg hover:bg-primary-50 transition-colors flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                Western Route GPX
              </button>
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