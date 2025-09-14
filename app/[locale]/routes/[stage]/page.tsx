import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StageHero from '@/components/stages/StageHero';
import StageMap from '@/components/stages/StageMap';
import StageElevation from '@/components/stages/StageElevation';
import StageTimeline from '@/components/stages/StageTimeline';
import StageGallery from '@/components/stages/StageGallery';
import StagePracticalInfo from '@/components/stages/StagePracticalInfo';
import { getStageBySlug, stagesData } from '@/data/stageData';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Lightbulb, Camera, AlertCircle } from 'lucide-react';

interface StagePageProps {
  params: Promise<{
    stage: string;
    locale: string;
  }>;
}

export async function generateStaticParams() {
  const locales = ['en', 'tr'];
  const stages = stagesData.map(stage => stage.id);

  return locales.flatMap(locale =>
    stages.map(stage => ({
      locale,
      stage,
    }))
  );
}

export async function generateMetadata({ params }: StagePageProps): Promise<Metadata> {
  const { stage: stageSlug } = await params;
  const stage = getStageBySlug(stageSlug);

  if (!stage) {
    return {
      title: 'Stage Not Found',
    };
  }

  const title = `Stage ${stage.stageNumber}: ${stage.from} to ${stage.to} - Phrygian Way`;
  const description = stage.description.overview;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: stage.photos[0]?.url ? [stage.photos[0].url] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: stage.photos[0]?.url ? [stage.photos[0].url] : [],
    },
    alternates: {
      canonical: `/routes/${stageSlug}`,
      languages: {
        'en': `/en/routes/${stageSlug}`,
        'tr': `/tr/routes/${stageSlug}`,
      },
    },
  };
}

export default async function StagePage({ params }: StagePageProps) {
  const { stage: stageSlug } = await params;
  const stage = getStageBySlug(stageSlug);

  if (!stage) {
    notFound();
  }

  return (
    <>
      <Navigation />

      <StageHero stage={stage} />

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="prose prose-lg max-w-none mb-12">
            <h2 className="font-display text-2xl font-bold mb-4">Stage Overview</h2>
            <p className="text-gray-700 mb-4">{stage.description.overview}</p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3">Terrain</h3>
                <p className="text-gray-700 text-sm">{stage.description.terrain}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3">Navigation</h3>
                <p className="text-gray-700 text-sm">{stage.description.navigation}</p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <StageMap stage={stage} />
          </div>

          <div className="mb-12">
            <h3 className="font-display text-2xl font-bold mb-6">Trail Highlights</h3>
            <div className="space-y-6">
              {stage.highlights.map((highlight, index) => (
                <div key={index} className="flex gap-4 bg-white rounded-lg border border-gray-200 p-6">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-600 font-bold">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-2">{highlight.name}</h4>
                    <p className="text-gray-700">{highlight.description}</p>
                    <div className="mt-2 text-sm text-gray-500">
                      GPS: {highlight.coordinates[0].toFixed(4)}°N, {highlight.coordinates[1].toFixed(4)}°E
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <StageElevation stage={stage} />
            <StageTimeline stage={stage} />
          </div>

          <div className="mb-12">
            <StageGallery stage={stage} />
          </div>

          <div className="mb-12">
            <h3 className="font-display text-2xl font-bold mb-6">Practical Information</h3>
            <StagePracticalInfo stage={stage} />
          </div>

          <div className="bg-green-50 rounded-lg p-6 mb-12">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-green-600" />
              Tips for This Stage
            </h3>
            <ul className="space-y-2">
              {stage.tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-700">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-purple-50 rounded-lg p-6 mb-12">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Camera className="w-5 h-5 text-purple-600" />
              Best Photo Spots
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Morning Light</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  {stage.highlights.slice(0, 2).map((highlight, index) => (
                    <li key={index}>• {highlight.name}</li>
                  ))}
                  <li>• Start point panorama</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Golden Hour</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  {stage.highlights.slice(-2).map((highlight, index) => (
                    <li key={index}>• {highlight.name}</li>
                  ))}
                  <li>• Sunset from arrival point</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-12">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              Important Safety Information
            </h3>
            <div className="space-y-4 text-gray-700">
              <p>
                <strong>Emergency Number:</strong> 112 (Works everywhere in Turkey)
              </p>
              <p>
                <strong>Before You Start:</strong> Inform someone of your hiking plans, expected arrival time, and check weather conditions.
              </p>
              <p>
                <strong>Essential Gear:</strong> Map/GPS, sufficient water (3-4L in summer), sun protection, first aid kit, headlamp, emergency shelter.
              </p>
              <p>
                <strong>Trail Conditions:</strong> {stage.description.terrain}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center pt-8 border-t">
            {stage.previousStage ? (
              <Link
                href={`/routes/${stage.previousStage}`}
                className="text-gray-600 hover:text-primary-600 transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous Stage
              </Link>
            ) : (
              <div />
            )}

            {stage.nextStage ? (
              <Link
                href={`/routes/${stage.nextStage}`}
                className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
              >
                Next Stage
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <div className="bg-green-600 text-white px-6 py-3 rounded-lg">
                🎉 Trail Complete!
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}