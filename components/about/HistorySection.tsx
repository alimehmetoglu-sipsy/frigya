'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Clock, MapPin, Crown, Award, Landmark } from 'lucide-react';

interface TimelineEvent {
  year: string;
  event: string;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
  period: 'ancient' | 'classical' | 'modern';
}

const timelineData: TimelineEvent[] = [
  {
    year: "1200 BCE",
    event: "Phrygians settle in Anatolia",
    description: "The Phrygian people migrate from the Balkans and establish their civilization in central Anatolia",
    icon: MapPin,
    period: 'ancient'
  },
  {
    year: "700 BCE",
    event: "King Midas rules from Gordion",
    description: "The legendary King Midas establishes Gordion as the capital of the Phrygian Empire",
    icon: Crown,
    period: 'ancient'
  },
  {
    year: "2013",
    event: "Trail established by volunteers",
    description: "Local volunteers and hiking enthusiasts establish the Phrygian Way as a cultural hiking route",
    icon: MapPin,
    period: 'modern'
  },
  {
    year: "2018",
    event: "European Excellence Award",
    description: "The trail receives international recognition for its cultural and historical significance",
    icon: Award,
    period: 'modern'
  },
  {
    year: "2023",
    event: "Gordion UNESCO World Heritage",
    description: "Gordion Archaeological Site achieves UNESCO World Heritage status",
    icon: Landmark,
    period: 'modern'
  }
];

export default function HistorySection() {
  const t = useTranslations('about.history');
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { scrollYProgress } = useScroll();
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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

  const getPeriodColor = (period: string) => {
    switch (period) {
      case 'ancient':
        return 'from-orange-500 to-red-600';
      case 'classical':
        return 'from-purple-500 to-indigo-600';
      case 'modern':
        return 'from-green-500 to-blue-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <section ref={ref} className="section-padding bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient"
          >
            {t('title')}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            {t('subtitle')}
          </motion.p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <motion.div
            style={{ scaleY: scaleProgress }}
            className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-orange-500 via-purple-500 to-green-500 h-full origin-top"
          />

          {/* Timeline Events */}
          <div className="space-y-16">
            {timelineData.map((event, index) => (
              <motion.div
                key={event.year}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                } group`}
              >
                {/* Event Card */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <motion.div
                    onClick={() => setSelectedEvent(event)}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 cursor-pointer border border-gray-100 hover:border-orange-200"
                  >
                    <div className={`flex items-center gap-3 mb-4 ${
                      index % 2 === 0 ? 'justify-end' : 'justify-start'
                    }`}>
                      <div className={`p-3 rounded-full bg-gradient-to-r ${getPeriodColor(event.period)} text-white`}>
                        <event.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-2xl font-bold text-gray-900">{event.year}</span>
                        <span className="block text-sm text-gray-500 capitalize">{event.period} Period</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {event.event}
                    </h3>
                    {event.description && (
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {event.description}
                      </p>
                    )}
                  </motion.div>
                </div>

                {/* Timeline Dot */}
                <motion.div
                  whileInView={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="absolute left-1/2 transform -translate-x-1/2 z-10"
                >
                  <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${getPeriodColor(event.period)} border-4 border-white shadow-lg`} />
                  <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </motion.div>

                {/* Empty Space */}
                <div className="w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Archaeological Findings Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-3xl p-8 max-w-4xl mx-auto">
            <Clock className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {t('archaeological.title')}
            </h3>
            <p className="text-lg md:text-xl opacity-90 leading-relaxed max-w-2xl mx-auto">
              {t('archaeological.description')}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedEvent(null)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className={`p-4 rounded-full bg-gradient-to-r ${getPeriodColor(selectedEvent.period)} text-white`}>
                <selectedEvent.icon className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900">{selectedEvent.year}</h3>
                <p className="text-gray-500 capitalize">{selectedEvent.period} Period</p>
              </div>
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-4">
              {selectedEvent.event}
            </h4>
            {selectedEvent.description && (
              <p className="text-gray-700 leading-relaxed mb-6">
                {selectedEvent.description}
              </p>
            )}
            <button
              onClick={() => setSelectedEvent(null)}
              className="btn-primary w-full"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100 rounded-full opacity-20 -translate-y-32 translate-x-32" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-100 rounded-full opacity-20 translate-y-24 -translate-x-24" />
    </section>
  );
}