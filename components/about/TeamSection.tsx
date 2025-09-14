'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { MapPin, Camera, Compass, Users, Instagram, Linkedin, Mail, Globe } from 'lucide-react';
import Image from 'next/image';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
  location?: string;
  speciality: string;
  social?: {
    instagram?: string;
    linkedin?: string;
    email?: string;
    website?: string;
  };
  expertise: string[];
}

const teamMembers: TeamMember[] = [
  {
    id: 'founder',
    name: 'Dr. Mehmet Yıldız',
    role: 'Trail Founder & Archaeologist',
    bio: 'A passionate archaeologist who dedicated his life to preserving Phrygian heritage. Dr. Yıldız led the initial research and trail mapping that established the Phrygian Way as a world-class cultural hiking experience.',
    photo: '/images/team/founder.jpg',
    location: 'Ankara, Turkey',
    speciality: 'Ancient Civilizations',
    expertise: ['Phrygian History', 'Archaeological Research', 'Cultural Heritage'],
    social: {
      email: 'mehmet@phrygianway.com',
      linkedin: 'mehmetyildiz-archaeologist'
    }
  },
  {
    id: 'guide-lead',
    name: 'Ayşe Kara',
    role: 'Head Trail Guide',
    bio: 'Born and raised in the villages along the Phrygian Way, Ayşe brings deep local knowledge and 15+ years of hiking experience. She ensures every walker experiences the authentic spirit of Anatolia.',
    photo: '/images/team/guide.jpg',
    location: 'Gordion, Turkey',
    speciality: 'Local Culture & Navigation',
    expertise: ['Trail Navigation', 'Local History', 'Community Relations'],
    social: {
      instagram: 'ayse_phrygian_guide',
      email: 'ayse@phrygianway.com'
    }
  },
  {
    id: 'photographer',
    name: 'Can Özdemir',
    role: 'Documentary Photographer',
    bio: 'Award-winning photographer specializing in cultural landscapes. Can documents the trail\'s beauty and helps showcase the Phrygian Way to the world through stunning visual storytelling.',
    photo: '/images/team/photographer.jpg',
    location: 'Istanbul, Turkey',
    speciality: 'Visual Storytelling',
    expertise: ['Landscape Photography', 'Cultural Documentation', 'Digital Media'],
    social: {
      instagram: 'canozdemir_photo',
      website: 'canozdemir.com'
    }
  },
  {
    id: 'conservation',
    name: 'Prof. Elena Popović',
    role: 'Conservation Specialist',
    bio: 'International expert in sustainable tourism and archaeological site preservation. Prof. Popović ensures the trail maintains its delicate balance between accessibility and conservation.',
    photo: '/images/team/conservation.jpg',
    location: 'Belgrade, Serbia',
    speciality: 'Sustainable Tourism',
    expertise: ['Site Preservation', 'Sustainable Tourism', 'Environmental Impact'],
    social: {
      linkedin: 'elena-popovic-conservation',
      email: 'elena@phrygianway.com'
    }
  }
];

export default function TeamSection() {
  const t = useTranslations('about.team');
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  };

  const getRoleIcon = (role: string) => {
    if (role.includes('Archaeologist') || role.includes('Founder')) return Compass;
    if (role.includes('Guide')) return MapPin;
    if (role.includes('Photographer')) return Camera;
    if (role.includes('Conservation')) return Globe;
    return Users;
  };

  return (
    <section ref={ref} className="section-padding bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
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

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => {
            const IconComponent = getRoleIcon(member.role);
            return (
              <motion.div
                key={member.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                onClick={() => setSelectedMember(member)}
                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group border border-gray-100 hover:border-orange-200"
              >
                {/* Photo */}
                <div className="relative h-64 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10" />
                  <div className="absolute bottom-4 left-4 z-20">
                    <div className="flex items-center gap-2 text-white">
                      <IconComponent className="w-5 h-5" />
                      <span className="text-sm font-medium">{member.speciality}</span>
                    </div>
                  </div>
                  {/* Placeholder for photo */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-400 to-red-500">
                    <div className="text-6xl font-bold text-white opacity-50">
                      {member.name.charAt(0)}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">{member.location}</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {member.name}
                  </h3>

                  <p className="text-orange-600 font-medium mb-3">
                    {member.role}
                  </p>

                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {member.bio}
                  </p>

                  {/* Social Links */}
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                    {member.social?.email && (
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        href={`mailto:${member.social.email}`}
                        className="p-2 rounded-full bg-gray-100 hover:bg-orange-100 text-gray-600 hover:text-orange-600 transition-all"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Mail className="w-4 h-4" />
                      </motion.a>
                    )}
                    {member.social?.instagram && (
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        href={`https://instagram.com/${member.social.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-gray-100 hover:bg-orange-100 text-gray-600 hover:text-orange-600 transition-all"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Instagram className="w-4 h-4" />
                      </motion.a>
                    )}
                    {member.social?.linkedin && (
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        href={`https://linkedin.com/in/${member.social.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-gray-100 hover:bg-orange-100 text-gray-600 hover:text-orange-600 transition-all"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Linkedin className="w-4 h-4" />
                      </motion.a>
                    )}
                    {member.social?.website && (
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        href={`https://${member.social.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-gray-100 hover:bg-orange-100 text-gray-600 hover:text-orange-600 transition-all"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Globe className="w-4 h-4" />
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-3xl p-8 max-w-4xl mx-auto">
            <Users className="w-12 h-12 mx-auto mb-4 opacity-80" />
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

      {/* Team Member Modal */}
      {selectedMember && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedMember(null)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              {/* Photo */}
              <div className="w-full md:w-48 h-48 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center text-6xl font-bold text-white opacity-90 flex-shrink-0">
                {selectedMember.name.charAt(0)}
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">{selectedMember.location}</span>
                </div>

                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {selectedMember.name}
                </h3>

                <p className="text-orange-600 font-medium text-lg mb-4">
                  {selectedMember.role}
                </p>

                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedMember.expertise.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">
              {selectedMember.bio}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4 mb-6">
              {selectedMember.social?.email && (
                <a
                  href={`mailto:${selectedMember.social.email}`}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-orange-100 text-gray-600 hover:text-orange-600 rounded-lg transition-all"
                >
                  <Mail className="w-4 h-4" />
                  Email
                </a>
              )}
              {selectedMember.social?.instagram && (
                <a
                  href={`https://instagram.com/${selectedMember.social.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-orange-100 text-gray-600 hover:text-orange-600 rounded-lg transition-all"
                >
                  <Instagram className="w-4 h-4" />
                  Instagram
                </a>
              )}
              {selectedMember.social?.linkedin && (
                <a
                  href={`https://linkedin.com/in/${selectedMember.social.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-orange-100 text-gray-600 hover:text-orange-600 rounded-lg transition-all"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              )}
            </div>

            <button
              onClick={() => setSelectedMember(null)}
              className="btn-primary w-full"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-green-100 rounded-full opacity-20 -translate-y-32 -translate-x-32" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-orange-100 rounded-full opacity-20 translate-y-24 translate-x-24" />
    </section>
  );
}