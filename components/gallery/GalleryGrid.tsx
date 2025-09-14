'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, MapPin, Camera, Calendar, User } from 'lucide-react';
import { Photo, ViewMode } from './types';

interface GalleryGridProps {
  photos: Photo[];
  viewMode: ViewMode;
  onPhotoClick: (photo: Photo) => void;
}

export default function GalleryGrid({
  photos,
  viewMode,
  onPhotoClick
}: GalleryGridProps) {
  const [loadedPhotos, setLoadedPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const observer = useRef<IntersectionObserver>();
  const lastPhotoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoadedPhotos(photos.slice(0, 12));
  }, [photos]);

  useEffect(() => {
    if (loading) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && loadedPhotos.length < photos.length) {
        setLoading(true);
        setTimeout(() => {
          setLoadedPhotos(prev => {
            const nextBatch = photos.slice(prev.length, prev.length + 12);
            setLoading(false);
            return [...prev, ...nextBatch];
          });
        }, 500);
      }
    });

    if (lastPhotoRef.current) {
      observer.current.observe(lastPhotoRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [loadedPhotos, photos, loading]);

  if (viewMode === 'map') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-100 rounded-lg h-[600px] flex items-center justify-center">
          <p className="text-gray-500">Map view coming soon...</p>
        </div>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-4">
          {loadedPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              ref={index === loadedPhotos.length - 1 ? lastPhotoRef : null}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onPhotoClick(photo)}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-64 h-48 md:h-auto relative">
                  <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                  <img
                    src={photo.thumbnailUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 p-6">
                  <h3 className="text-xl font-semibold mb-2">{photo.title}</h3>
                  <p className="text-gray-600 mb-4">{photo.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {photo.location.name}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {photo.photographer.name}
                    </span>
                    <span className="flex items-center gap-1">
                      <Camera className="w-4 h-4" />
                      {photo.metadata.camera}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {photo.date.toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {photo.likes}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {photo.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  const gridClassName = viewMode === 'grid'
    ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
    : 'columns-2 md:columns-3 lg:columns-4 gap-4';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className={gridClassName}>
        {loadedPhotos.map((photo, index) => (
          <motion.div
            key={photo.id}
            ref={index === loadedPhotos.length - 1 ? lastPhotoRef : null}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer ${
              viewMode === 'masonry' ? 'mb-4' : ''
            }`}
            onClick={() => onPhotoClick(photo)}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gray-200 animate-pulse" />
              <img
                src={photo.thumbnailUrl}
                alt={photo.title}
                className="w-full h-auto object-cover"
                loading="lazy"
                onLoad={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.previousElementSibling?.remove();
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-semibold text-lg mb-1">{photo.title}</h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {photo.location.name}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      {photo.likes}
                    </span>
                  </div>
                </div>
              </div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-gray-700">
                  {photo.category}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {loadedPhotos.length >= photos.length && photos.length > 0 && (
        <div className="text-center py-8 text-gray-500">
          You&apos;ve reached the end of the gallery
        </div>
      )}
    </div>
  );
}