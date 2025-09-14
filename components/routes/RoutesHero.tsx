'use client';

import { MapPin, Mountain, Clock, Users } from 'lucide-react';

interface HeroStats {
  totalDistance: number;
  villages: number;
  duration: string;
  elevation: string;
}

export default function RoutesHero() {
  const heroContent = {
    title: "The Complete Phrygian Way Guide",
    subtitle: "Three Starting Points, One Epic Adventure",
    description: "506 kilometers across western-central Turkey connecting ancient Phrygian settlements, UNESCO World Heritage sites, and dramatic landscapes through three distinctive routes.",
    stats: {
      totalDistance: 506,
      villages: 44,
      duration: "20-30 days",
      elevation: "800-1,500m"
    }
  };

  return (
    <section className="relative h-[60vh] min-h-[500px] bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {heroContent.title}
          </h1>
          <p className="text-xl md:text-2xl text-primary-100 mb-6">
            {heroContent.subtitle}
          </p>
          <p className="text-lg text-primary-50 mb-8 max-w-3xl">
            {heroContent.description}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <MapPin className="w-6 h-6 text-primary-100 mb-2" />
              <div className="text-2xl font-bold text-white">{heroContent.stats.totalDistance} km</div>
              <div className="text-sm text-primary-100">Total Distance</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <Users className="w-6 h-6 text-primary-100 mb-2" />
              <div className="text-2xl font-bold text-white">{heroContent.stats.villages}</div>
              <div className="text-sm text-primary-100">Villages</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <Clock className="w-6 h-6 text-primary-100 mb-2" />
              <div className="text-2xl font-bold text-white">{heroContent.stats.duration}</div>
              <div className="text-sm text-primary-100">Duration</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <Mountain className="w-6 h-6 text-primary-100 mb-2" />
              <div className="text-2xl font-bold text-white">{heroContent.stats.elevation}</div>
              <div className="text-sm text-primary-100">Elevation</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}