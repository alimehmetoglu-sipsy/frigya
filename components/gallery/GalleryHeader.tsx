'use client';

import { motion } from 'framer-motion';
import { Camera, Users, Grid3X3 } from 'lucide-react';

interface GalleryHeaderProps {
  totalPhotos: number;
  photographers: number;
  categories: number;
}

export default function GalleryHeader({
  totalPhotos,
  photographers,
  categories
}: GalleryHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative bg-gradient-to-b from-slate-900 to-slate-800 text-white py-24"
    >
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Visual Journey Through Time
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 mb-12"
          >
            Explore the Phrygian Way through our lens
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-3 gap-8 max-w-md mx-auto"
          >
            <div className="flex flex-col items-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 mb-3">
                <Camera className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold">{totalPhotos}+</div>
              <div className="text-sm text-gray-400">Photos</div>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 mb-3">
                <Users className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold">{photographers}</div>
              <div className="text-sm text-gray-400">Photographers</div>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 mb-3">
                <Grid3X3 className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold">{categories}</div>
              <div className="text-sm text-gray-400">Categories</div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}