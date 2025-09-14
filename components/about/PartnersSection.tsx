'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Landmark,
  Building2,
  Plane,
  MapPin,
  Users,
  Award,
  Globe,
  HandshakeIcon,
  ExternalLink,
  Star,
  Calendar,
  Target
} from 'lucide-react';

interface Partner {
  id: string;
  name: string;
  description: string;
  logo: string;
  website?: string;
  category: 'unesco' | 'government' | 'tourism' | 'ngo' | 'academic' | 'commercial';
  partnership: string;
  since: string;
  contribution: string[];
  featured?: boolean;
}

const partners: Partner[] = [
  {
    id: 'unesco',
    name: 'UNESCO World Heritage Centre',
    description: 'International organization supporting the identification, protection and preservation of cultural and natural heritage around the world.',
    logo: '/images/partners/unesco-logo.svg',
    website: 'whc.unesco.org',
    category: 'unesco',
    partnership: 'Heritage Protection Partner',
    since: '2023',
    contribution: ['World Heritage Status for Gordion', 'Technical Advisory', 'International Recognition'],
    featured: true
  },
  {
    id: 'ministry-culture',
    name: 'Ministry of Culture and Tourism Turkey',
    description: 'Turkish governmental body responsible for cultural heritage preservation and tourism development.',
    logo: '/images/partners/ministry-logo.svg',
    website: 'ktb.gov.tr',
    category: 'government',
    partnership: 'Official Government Partner',
    since: '2013',
    contribution: ['Legal Framework', 'Funding Support', 'Site Protection'],
    featured: true
  },
  {
    id: 'european-union',
    name: 'European Union Cultural Routes',
    description: 'EU program supporting cultural routes that demonstrate European identity and citizenship.',
    logo: '/images/partners/eu-logo.svg',
    website: 'culture-routes.net',
    category: 'government',
    partnership: 'Cultural Routes Partner',
    since: '2018',
    contribution: ['European Excellence Award', 'Funding Programs', 'International Promotion'],
    featured: true
  },
  {
    id: 'turkish-airlines',
    name: 'Turkish Airlines',
    description: 'National flag carrier airline supporting sustainable tourism development in Turkey.',
    logo: '/images/partners/turkish-airlines.svg',
    website: 'turkishairlines.com',
    category: 'commercial',
    partnership: 'Travel Partner',
    since: '2019',
    contribution: ['Travel Packages', 'International Marketing', 'Tourist Transportation'],
    featured: false
  },
  {
    id: 'ankara-university',
    name: 'Ankara University - Archaeology Department',
    description: 'Leading academic institution in archaeological research and Phrygian civilization studies.',
    logo: '/images/partners/ankara-uni.svg',
    website: 'ankara.edu.tr',
    category: 'academic',
    partnership: 'Research Partner',
    since: '2013',
    contribution: ['Archaeological Research', 'Student Programs', 'Academic Publications'],
    featured: false
  },
  {
    id: 'anadolu-kawa',
    name: 'Anadolu KAWA (Cultural Walking Routes)',
    description: 'Turkish NGO promoting cultural walking routes and sustainable tourism in Anatolia.',
    logo: '/images/partners/kawa-logo.svg',
    website: 'anadolukawa.org',
    category: 'ngo',
    partnership: 'Local Development Partner',
    since: '2014',
    contribution: ['Trail Development', 'Local Guide Training', 'Community Programs'],
    featured: false
  },
  {
    id: 'gordion-museum',
    name: 'Gordion Museum',
    description: 'Archaeological museum showcasing Phrygian artifacts and providing educational resources.',
    logo: '/images/partners/gordion-museum.svg',
    category: 'government',
    partnership: 'Cultural Heritage Partner',
    since: '2013',
    contribution: ['Cultural Education', 'Artifact Display', 'Visitor Services'],
    featured: false
  },
  {
    id: 'booking-com',
    name: 'Booking.com',
    description: 'Global accommodation platform supporting local hospitality along the Phrygian Way.',
    logo: '/images/partners/booking-logo.svg',
    website: 'booking.com',
    category: 'commercial',
    partnership: 'Accommodation Partner',
    since: '2020',
    contribution: ['Accommodation Listings', 'Tourism Promotion', 'Local Business Support'],
    featured: false
  }
];

const partnershipTiers = [
  {
    title: 'Heritage Guardian',
    icon: Landmark,
    description: 'Support archaeological preservation and research initiatives',
    benefits: ['UNESCO Heritage Site access', 'Research collaboration', 'International recognition'],
    commitment: '€50,000+ annually'
  },
  {
    title: 'Trail Supporter',
    icon: MapPin,
    description: 'Contribute to trail maintenance and infrastructure development',
    benefits: ['Trail naming rights', 'Marketing partnership', 'Community engagement'],
    commitment: '€25,000+ annually'
  },
  {
    title: 'Community Partner',
    icon: Users,
    description: 'Support local community development and guide training programs',
    benefits: ['Local partnership', 'Cultural exchange', 'Social impact recognition'],
    commitment: '€10,000+ annually'
  },
  {
    title: 'Travel Companion',
    icon: Plane,
    description: 'Provide tourism services and promote the Phrygian Way internationally',
    benefits: ['Tourism packages', 'International marketing', 'Traveler network access'],
    commitment: 'Service partnership'
  }
];

export default function PartnersSection() {
  const t = useTranslations('about.partners');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
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

  const filteredPartners = selectedCategory === 'all'
    ? partners
    : partners.filter(partner => partner.category === selectedCategory);

  const featuredPartners = partners.filter(partner => partner.featured);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'unesco':
        return 'from-blue-500 to-blue-700';
      case 'government':
        return 'from-red-500 to-red-700';
      case 'tourism':
        return 'from-green-500 to-green-700';
      case 'ngo':
        return 'from-purple-500 to-purple-700';
      case 'academic':
        return 'from-indigo-500 to-indigo-700';
      case 'commercial':
        return 'from-orange-500 to-orange-700';
      default:
        return 'from-gray-500 to-gray-700';
    }
  };

  return (
    <section ref={ref} className="section-padding bg-gradient-to-b from-green-50 to-gray-50 relative overflow-hidden">
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

        {/* Featured Partners */}
        <motion.div
          variants={itemVariants}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <Star className="w-10 h-10 mx-auto text-yellow-500 mb-4" />
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Featured Partners
            </h3>
            <p className="text-lg text-gray-600">
              Our most valued strategic partnerships
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredPartners.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                onClick={() => setSelectedPartner(partner)}
                className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border-2 border-yellow-200 hover:border-yellow-300"
              >
                {/* Logo/Header */}
                <div className={`p-6 bg-gradient-to-r ${getCategoryColor(partner.category)} text-white text-center`}>
                  <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-bold">{partner.name}</h3>
                  <p className="text-sm opacity-90 mt-2">{partner.partnership}</p>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>Partner since {partner.since}</span>
                  </div>

                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    {partner.description}
                  </p>

                  {/* Contributions */}
                  <div className="space-y-2">
                    {partner.contribution.slice(0, 2).map((contrib, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <Target className="w-3 h-3 text-green-500 flex-shrink-0" />
                        <span className="text-gray-600">{contrib}</span>
                      </div>
                    ))}
                  </div>

                  {partner.website && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <a
                        href={`https://${partner.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Visit Website
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {['all', 'unesco', 'government', 'academic', 'commercial', 'ngo'].map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all capitalize ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {category === 'all' ? 'All Partners' : category.replace('_', ' ')}
            </motion.button>
          ))}
        </motion.div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {filteredPartners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (index % 8) * 0.05 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -5, scale: 1.02 }}
              onClick={() => setSelectedPartner(partner)}
              className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100 hover:border-blue-200 ${
                partner.featured ? 'ring-2 ring-yellow-200' : ''
              }`}
            >
              {/* Logo Placeholder */}
              <div className={`h-32 bg-gradient-to-br ${getCategoryColor(partner.category)} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/90 rounded-lg flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-gray-600" />
                  </div>
                </div>
                {partner.featured && (
                  <div className="absolute top-2 right-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-2 text-sm leading-tight">
                  {partner.name}
                </h3>

                <p className="text-xs text-blue-600 font-medium mb-2">
                  {partner.partnership}
                </p>

                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  <span>Since {partner.since}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Partnership Tiers */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <HandshakeIcon className="w-12 h-12 mx-auto text-blue-600 mb-4" />
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {t('partnership.title')}
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('partnership.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnershipTiers.map((tier, index) => (
              <motion.div
                key={tier.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <tier.icon className="w-8 h-8 text-white" />
                </div>

                <h4 className="text-lg font-bold text-gray-900 mb-3">
                  {tier.title}
                </h4>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {tier.description}
                </p>

                <div className="space-y-2 mb-4">
                  {tier.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs font-medium text-blue-600">
                    {tier.commitment}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Become a Partner CTA */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-700 text-white rounded-3xl p-8 max-w-4xl mx-auto">
            <Globe className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {t('cta.title')}
            </h3>
            <p className="text-lg md:text-xl opacity-90 leading-relaxed max-w-2xl mx-auto mb-6">
              {t('cta.description')}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary bg-white/20 hover:bg-white/30"
            >
              {t('cta.button')}
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Partner Detail Modal */}
      {selectedPartner && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedPartner(null)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className={`-m-8 p-8 mb-6 bg-gradient-to-r ${getCategoryColor(selectedPartner.category)} text-white rounded-t-3xl`}>
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-8 h-8 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-1">{selectedPartner.name}</h3>
                  <p className="opacity-90">{selectedPartner.partnership}</p>
                  <div className="flex items-center gap-2 mt-2 text-sm opacity-80">
                    <Calendar className="w-4 h-4" />
                    <span>Partner since {selectedPartner.since}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                {selectedPartner.description}
              </p>

              {/* Contributions */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  Key Contributions
                </h4>
                <div className="space-y-2">
                  {selectedPartner.contribution.map((contrib, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Target className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{contrib}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Website Link */}
              {selectedPartner.website && (
                <div>
                  <a
                    href={`https://${selectedPartner.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visit {selectedPartner.name}
                  </a>
                </div>
              )}
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setSelectedPartner(null)}
                className="btn-primary flex-1"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full opacity-20 -translate-y-32 -translate-x-32" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-100 rounded-full opacity-20 translate-y-24 translate-x-24" />
    </section>
  );
}