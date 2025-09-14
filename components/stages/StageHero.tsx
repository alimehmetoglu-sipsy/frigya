'use client';

import { MapPin, Clock, TrendingUp, Mountain, Download, Share2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { StageData } from '@/data/stageData';

interface StageHeroProps {
  stage: StageData;
}

export default function StageHero({ stage }: StageHeroProps) {
  const difficultyColor = {
    Easy: 'text-green-600 bg-green-50',
    Moderate: 'text-yellow-600 bg-yellow-50',
    Challenging: 'text-red-600 bg-red-50'
  };

  const handleDownloadGPX = () => {
    window.open(stage.gpxFile, '_blank');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Stage ${stage.stageNumber}: ${stage.from} to ${stage.to}`,
          text: `Check out Stage ${stage.stageNumber} of the Phrygian Way: ${stage.from} to ${stage.to} (${stage.distance}km)`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  return (
    <section className="pt-32 pb-8 bg-gradient-to-b from-primary-50 to-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <Link
          href="/routes"
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Routes
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            Stage {stage.stageNumber}
          </span>
          <span className="text-gray-600">Eastern Route</span>
        </div>

        <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
          {stage.from} → {stage.to}
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 text-center border border-gray-200 shadow-sm">
            <MapPin className="w-6 h-6 text-primary-600 mx-auto mb-2" />
            <div className="text-lg font-bold">{stage.distance} km</div>
            <div className="text-sm text-gray-600">Distance</div>
          </div>

          <div className="bg-white rounded-lg p-4 text-center border border-gray-200 shadow-sm">
            <Clock className="w-6 h-6 text-primary-600 mx-auto mb-2" />
            <div className="text-lg font-bold">{stage.duration}</div>
            <div className="text-sm text-gray-600">Duration</div>
          </div>

          <div className="bg-white rounded-lg p-4 text-center border border-gray-200 shadow-sm">
            <TrendingUp className="w-6 h-6 text-primary-600 mx-auto mb-2" />
            <div className="text-lg font-bold">+{stage.elevationGain}m / -{stage.elevationLoss}m</div>
            <div className="text-sm text-gray-600">Elevation</div>
          </div>

          <div className="bg-white rounded-lg p-4 text-center border border-gray-200 shadow-sm">
            <Mountain className={`w-6 h-6 mx-auto mb-2 ${difficultyColor[stage.difficulty].split(' ')[0]}`} />
            <div className="text-lg font-bold">{stage.difficulty}</div>
            <div className="text-sm text-gray-600">Difficulty</div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleDownloadGPX}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download GPX
          </button>

          <button
            onClick={handleShare}
            className="bg-white text-primary-600 border-2 border-primary-600 px-6 py-3 rounded-lg hover:bg-primary-50 transition-colors flex items-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            Share
          </button>
        </div>
      </div>
    </section>
  );
}