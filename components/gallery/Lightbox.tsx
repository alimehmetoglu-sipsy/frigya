'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  Download,
  MapPin,
  Camera,
  Calendar,
  User,
  Info,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { Photo } from './types';

interface LightboxProps {
  photo: Photo;
  photos: Photo[];
  onClose: () => void;
}

export default function Lightbox({ photo, photos, onClose }: LightboxProps) {
  const [currentPhoto, setCurrentPhoto] = useState(photo);
  const [currentIndex, setCurrentIndex] = useState(
    photos.findIndex(p => p.id === photo.id)
  );
  const [liked, setLiked] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          navigatePrevious();
          break;
        case 'ArrowRight':
          navigateNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [currentIndex]);

  const navigatePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setCurrentPhoto(photos[currentIndex - 1]);
      setZoom(1);
    }
  };

  const navigateNext = () => {
    if (currentIndex < photos.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentPhoto(photos[currentIndex + 1]);
      setZoom(1);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentPhoto.title,
          text: currentPhoto.description,
          url: window.location.href
        });
      } catch (err) {
        console.log('Share failed:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = currentPhoto.url;
    link.download = `${currentPhoto.title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.5, 1));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black flex items-center justify-center"
        onClick={onClose}
      >
        <div className="absolute top-0 left-0 right-0 p-4 z-10 flex justify-between items-center">
          <div className="text-white">
            <h2 className="text-xl font-semibold">{currentPhoto.title}</h2>
            <p className="text-sm text-gray-300">{currentPhoto.photographer.name}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowInfo(!showInfo);
              }}
              className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors text-white"
            >
              <Info className="w-5 h-5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleZoomOut();
              }}
              disabled={zoom <= 1}
              className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors text-white disabled:opacity-50"
            >
              <ZoomOut className="w-5 h-5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleZoomIn();
              }}
              disabled={zoom >= 3}
              className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors text-white disabled:opacity-50"
            >
              <ZoomIn className="w-5 h-5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setLiked(!liked);
              }}
              className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors text-white"
            >
              <Heart className={`w-5 h-5 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleShare();
              }}
              className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors text-white"
            >
              <Share2 className="w-5 h-5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDownload();
              }}
              className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors text-white"
            >
              <Download className="w-5 h-5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          className="relative w-full h-full flex items-center justify-center px-16"
          onClick={(e) => e.stopPropagation()}
        >
          {currentIndex > 0 && (
            <button
              onClick={navigatePrevious}
              className="absolute left-4 p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors text-white z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          <motion.img
            key={currentPhoto.id}
            src={currentPhoto.url}
            alt={currentPhoto.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: zoom }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="max-w-full max-h-full object-contain cursor-move"
            style={{ transform: `scale(${zoom})` }}
            draggable={false}
          />

          {currentIndex < photos.length - 1 && (
            <button
              onClick={navigateNext}
              className="absolute right-4 p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors text-white z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>

        <AnimatePresence>
          {showInfo && (
            <motion.div
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute right-0 top-0 bottom-0 w-96 bg-white/10 backdrop-blur-md p-6 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-white mb-2">{currentPhoto.title}</h3>
              <p className="text-gray-300 mb-6">{currentPhoto.description}</p>

              <div className="space-y-4 text-white">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-400">Location</div>
                    <div>{currentPhoto.location.name}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-400">Photographer</div>
                    <div>{currentPhoto.photographer.name}</div>
                    <div className="text-sm text-gray-400">{currentPhoto.photographer.instagram}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Camera className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-400">Camera Settings</div>
                    <div>{currentPhoto.metadata.camera}</div>
                    <div className="text-sm">{currentPhoto.metadata.lens}</div>
                    <div className="text-sm">{currentPhoto.metadata.settings}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-400">Date Taken</div>
                    <div>{currentPhoto.date.toLocaleDateString()}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-400">Likes</div>
                    <div>{currentPhoto.likes}</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/20">
                  <div className="text-sm text-gray-400 mb-2">Tags</div>
                  <div className="flex flex-wrap gap-2">
                    {currentPhoto.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white/10 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(index);
                setCurrentPhoto(photos[index]);
                setZoom(1);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}