'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, Play, Map, Calendar, Users } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

const MapBackground = dynamic(() => import('./MapBackground'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 animate-pulse" />
  ),
});

interface HeroData {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  stats?: {
    distance: string;
    duration: string;
    villages: string;
  };
}

interface HeroSectionProps {
  data?: HeroData;
  videoUrl?: string;
}

export default function HeroSection({ data, videoUrl }: HeroSectionProps) {
  const t = useTranslations('hero');

  const heroData = data || {
    title: t('title'),
    subtitle: t('subtitle'),
    description: t('description'),
    ctaText: t('cta.primary'),
    ctaLink: '/en/routes',
    stats: {
      distance: '506 km',
      duration: '20-30 days',
      villages: '44 villages',
    },
  };

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  };

  return (
    <section ref={ref} className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
      {/* Video Background (Optional) */}
      {videoUrl && (
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={() => setIsVideoLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              isVideoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        </div>
      )}

      {/* Mapbox Background */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <MapBackground className="w-full h-full" />
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

      {/* Main Content */}
      <motion.div
        style={{ opacity }}
        className="container mx-auto px-4 relative z-20"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center text-white max-w-5xl mx-auto"
        >
          <motion.h1
            variants={itemVariants}
            className="font-display text-6xl md:text-7xl lg:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300"
          >
            {heroData.title}
          </motion.h1>
          
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl lg:text-3xl mb-6 text-gray-100 font-light"
          >
            {heroData.subtitle}
          </motion.p>
          
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed"
          >
            {heroData.description}
          </motion.p>

          {/* Stats */}
          {heroData.stats && (
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-8 mb-10"
            >
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Map className="w-5 h-5 text-orange-400" />
                <span className="text-lg font-semibold">{heroData.stats.distance}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Calendar className="w-5 h-5 text-orange-400" />
                <span className="text-lg font-semibold">{heroData.stats.duration}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Users className="w-5 h-5 text-orange-400" />
                <span className="text-lg font-semibold">{heroData.stats.villages}</span>
              </div>
            </motion.div>
          )}

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href={heroData.ctaLink || "/en/routes"}
              className="btn-primary group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                {t('cta.primary')}
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>

            <Link
              href="/en/gallery"
              className="btn-secondary backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all"
            >
              <Play className="w-5 h-5" />
              {t('cta.secondary')}
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/60 text-sm uppercase tracking-wider">Explore</span>
          <div className="animate-bounce">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </motion.div>
    </section>
  );
}