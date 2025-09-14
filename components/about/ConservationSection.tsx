'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Leaf,
  Recycle,
  Users,
  Heart,
  TreePine,
  Droplets,
  Mountain,
  Shield,
  Target,
  Award,
  HandHeart,
  Calendar
} from 'lucide-react';

interface ConservationInitiative {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  impact: string;
  category: 'environmental' | 'community' | 'heritage';
  status: 'active' | 'planned' | 'completed';
}

const initiatives: ConservationInitiative[] = [
  {
    id: 'trail-maintenance',
    title: 'Trail Maintenance Program',
    description: 'Regular maintenance and restoration of hiking paths to prevent erosion and protect the natural landscape while ensuring safe passage for hikers.',
    icon: Mountain,
    impact: '506km trail network maintained',
    category: 'environmental',
    status: 'active'
  },
  {
    id: 'water-conservation',
    title: 'Water Resource Protection',
    description: 'Protecting natural water sources along the trail and implementing sustainable water management practices in partnership with local communities.',
    icon: Droplets,
    impact: '15 water sources protected',
    category: 'environmental',
    status: 'active'
  },
  {
    id: 'reforestation',
    title: 'Reforestation Initiative',
    description: 'Planting native tree species in degraded areas along the trail to restore the natural ecosystem and prevent soil erosion.',
    icon: TreePine,
    impact: '5,000 trees planted annually',
    category: 'environmental',
    status: 'active'
  },
  {
    id: 'heritage-protection',
    title: 'Archaeological Site Protection',
    description: 'Working with local authorities and UNESCO to ensure proper protection and conservation of ancient Phrygian archaeological sites.',
    icon: Shield,
    impact: '12 sites under protection',
    category: 'heritage',
    status: 'active'
  },
  {
    id: 'community-involvement',
    title: 'Community Engagement',
    description: 'Training local residents as guides and conservation ambassadors, creating sustainable livelihoods while protecting cultural heritage.',
    icon: Users,
    impact: '200+ local guides trained',
    category: 'community',
    status: 'active'
  },
  {
    id: 'waste-management',
    title: 'Zero Waste Initiative',
    description: 'Implementing comprehensive waste management systems and educating hikers about Leave No Trace principles.',
    icon: Recycle,
    impact: '95% waste reduction achieved',
    category: 'environmental',
    status: 'active'
  }
];

const volunteerOpportunities = [
  {
    title: 'Trail Maintenance Volunteer',
    duration: 'Weekend programs',
    description: 'Help maintain trail markers, clear vegetation, and repair trail infrastructure.',
    skills: 'Physical fitness, outdoor enthusiasm'
  },
  {
    title: 'Archaeological Documentation',
    duration: '1-2 week programs',
    description: 'Assist in documenting and cataloging archaeological findings along the trail.',
    skills: 'Photography, attention to detail, cultural interest'
  },
  {
    title: 'Community Education',
    duration: 'Flexible schedule',
    description: 'Help educate visitors and locals about conservation practices and cultural heritage.',
    skills: 'Communication, language skills, teaching ability'
  },
  {
    title: 'Research Support',
    duration: '1-6 month programs',
    description: 'Support ongoing research projects related to Phrygian culture and environmental conservation.',
    skills: 'Research experience, academic background preferred'
  }
];

export default function ConservationSection() {
  const t = useTranslations('about.conservation');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

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

  const filteredInitiatives = activeCategory === 'all'
    ? initiatives
    : initiatives.filter(initiative => initiative.category === activeCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'environmental':
        return 'from-green-500 to-emerald-600';
      case 'community':
        return 'from-blue-500 to-indigo-600';
      case 'heritage':
        return 'from-orange-500 to-red-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'planned':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <section ref={ref} className="section-padding bg-gradient-to-b from-white to-green-50 relative overflow-hidden">
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

        {/* Category Filter */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {['all', 'environmental', 'community', 'heritage'].map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all capitalize ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {category === 'all' ? 'All Initiatives' : category}
            </motion.button>
          ))}
        </motion.div>

        {/* Initiatives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredInitiatives.map((initiative, index) => (
            <motion.div
              key={initiative.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Header */}
              <div className={`p-6 bg-gradient-to-r ${getCategoryColor(initiative.category)} text-white`}>
                <div className="flex items-center justify-between mb-4">
                  <initiative.icon className="w-8 h-8" />
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(initiative.status)}`}>
                    {initiative.status}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{initiative.title}</h3>
                <div className="flex items-center gap-2 text-sm opacity-90">
                  <Target className="w-4 h-4" />
                  <span>{initiative.impact}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-700 leading-relaxed">
                  {initiative.description}
                </p>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium capitalize">
                    {initiative.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Impact Statistics */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-3xl p-8 mb-20"
        >
          <div className="text-center mb-8">
            <Award className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {t('impact.title')}
            </h3>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              {t('impact.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">506km</div>
              <div className="text-sm opacity-80">Trail Network</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">5,000+</div>
              <div className="text-sm opacity-80">Trees Planted</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">200+</div>
              <div className="text-sm opacity-80">Local Guides</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">95%</div>
              <div className="text-sm opacity-80">Waste Reduction</div>
            </div>
          </div>
        </motion.div>

        {/* Volunteer Opportunities */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <HandHeart className="w-12 h-12 mx-auto text-green-600 mb-4" />
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('volunteer.title')}
          </h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('volunteer.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {volunteerOpportunities.map((opportunity, index) => (
            <motion.div
              key={opportunity.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-6 h-6 text-green-600" />
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{opportunity.title}</h4>
                  <p className="text-sm text-gray-500">{opportunity.duration}</p>
                </div>
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">
                {opportunity.description}
              </p>

              <div className="border-t border-gray-100 pt-4">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Skills needed:</span> {opportunity.skills}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Donation CTA */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-3xl p-8 max-w-4xl mx-auto">
            <Heart className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {t('donation.title')}
            </h3>
            <p className="text-lg md:text-xl opacity-90 leading-relaxed max-w-2xl mx-auto mb-6">
              {t('donation.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary bg-white/20 hover:bg-white/30"
              >
                {t('donation.donate')}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary bg-white/10 hover:bg-white/20"
              >
                {t('donation.volunteer')}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-100 rounded-full opacity-30 -translate-y-32 translate-x-32" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-100 rounded-full opacity-20 translate-y-24 -translate-x-24" />

      {/* Leaf Pattern */}
      <div className="absolute inset-0 opacity-5">
        <Leaf className="absolute top-1/4 left-1/4 w-16 h-16 text-green-600 transform -rotate-45" />
        <TreePine className="absolute top-3/4 right-1/4 w-12 h-12 text-green-600 transform rotate-12" />
        <Droplets className="absolute top-1/2 right-1/3 w-14 h-14 text-blue-600 transform rotate-45" />
      </div>
    </section>
  );
}