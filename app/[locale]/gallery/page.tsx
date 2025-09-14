'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import GalleryHeader from '@/components/gallery/GalleryHeader';
import FilterBar from '@/components/gallery/FilterBar';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import Lightbox from '@/components/gallery/Lightbox';
import PhotoUpload from '@/components/gallery/PhotoUpload';
import InstagramFeed from '@/components/gallery/InstagramFeed';
import { Photo } from '@/components/gallery/types';

const mockPhotos: Photo[] = [
  {
    id: '1',
    url: '/images/phrygian-monument-1.jpg',
    thumbnailUrl: '/images/phrygian-monument-1-thumb.jpg',
    title: 'Ancient Phrygian Monument',
    description: 'A remarkable ancient monument carved into the rocks',
    category: 'Ancient Monuments',
    route: 'Eastern',
    location: {
      name: 'Yazılıkaya',
      coordinates: [39.1866, 30.5509]
    },
    photographer: {
      name: 'John Doe',
      instagram: '@johndoe'
    },
    metadata: {
      camera: 'Canon EOS R5',
      lens: '24-70mm f/2.8',
      settings: 'ISO 100, f/8, 1/250s'
    },
    tags: ['monument', 'ancient', 'rock', 'carving'],
    likes: 234,
    date: new Date('2024-03-15')
  },
  {
    id: '2',
    url: '/images/valley-view.jpg',
    thumbnailUrl: '/images/valley-view-thumb.jpg',
    title: 'Phrygian Valley at Sunset',
    description: 'Breathtaking view of the valley during golden hour',
    category: 'Natural Wonders',
    route: 'Southern',
    location: {
      name: 'Döğer Valley',
      coordinates: [39.0742, 30.9133]
    },
    photographer: {
      name: 'Jane Smith',
      instagram: '@janesmith'
    },
    metadata: {
      camera: 'Sony A7R IV',
      lens: '16-35mm f/2.8',
      settings: 'ISO 200, f/11, 1/125s'
    },
    tags: ['valley', 'sunset', 'landscape', 'nature'],
    likes: 567,
    date: new Date('2024-04-22')
  },
  {
    id: '3',
    url: '/images/village-life.jpg',
    thumbnailUrl: '/images/village-life-thumb.jpg',
    title: 'Traditional Village Morning',
    description: 'Daily life in a traditional Phrygian village',
    category: 'Village Life',
    route: 'Western',
    location: {
      name: 'Ayazini Village',
      coordinates: [38.9333, 31.0167]
    },
    photographer: {
      name: 'Ali Yılmaz',
      instagram: '@aliyilmaz'
    },
    metadata: {
      camera: 'Fujifilm X-T4',
      lens: '35mm f/1.4',
      settings: 'ISO 400, f/5.6, 1/500s'
    },
    tags: ['village', 'traditional', 'culture', 'morning'],
    likes: 189,
    date: new Date('2024-05-10')
  },
  {
    id: '4',
    url: '/images/trail-hikers.jpg',
    thumbnailUrl: '/images/trail-hikers-thumb.jpg',
    title: 'Hikers on the Trail',
    description: 'Group of hikers exploring the Phrygian Way',
    category: 'Trail Experience',
    route: 'Eastern',
    location: {
      name: 'Seydiler to Üçlerkayası',
      coordinates: [39.2500, 30.6000]
    },
    photographer: {
      name: 'Mehmet Öz',
      instagram: '@mehmetoz'
    },
    metadata: {
      camera: 'Nikon Z7 II',
      lens: '24-120mm f/4',
      settings: 'ISO 320, f/7.1, 1/320s'
    },
    tags: ['hiking', 'trail', 'adventure', 'group'],
    likes: 423,
    date: new Date('2024-06-03')
  },
  {
    id: '5',
    url: '/images/spring-flowers.jpg',
    thumbnailUrl: '/images/spring-flowers-thumb.jpg',
    title: 'Spring Wildflowers',
    description: 'Colorful wildflowers blooming along the trail',
    category: 'Seasons',
    route: 'Southern',
    location: {
      name: 'Kümbet Valley',
      coordinates: [39.1200, 30.8500]
    },
    photographer: {
      name: 'Ayşe Kaya',
      instagram: '@aysekaya'
    },
    metadata: {
      camera: 'Canon EOS R6',
      lens: '100mm f/2.8 Macro',
      settings: 'ISO 100, f/4, 1/640s'
    },
    tags: ['flowers', 'spring', 'nature', 'macro'],
    likes: 892,
    date: new Date('2024-04-01')
  },
  {
    id: '6',
    url: '/images/wildlife-eagle.jpg',
    thumbnailUrl: '/images/wildlife-eagle-thumb.jpg',
    title: 'Golden Eagle in Flight',
    description: 'Majestic golden eagle soaring over the mountains',
    category: 'Wildlife',
    route: 'Western',
    location: {
      name: 'İhsaniye Forest',
      coordinates: [39.0000, 31.1000]
    },
    photographer: {
      name: 'Burak Demir',
      instagram: '@burakdemir'
    },
    metadata: {
      camera: 'Sony A1',
      lens: '600mm f/4',
      settings: 'ISO 800, f/5.6, 1/2000s'
    },
    tags: ['wildlife', 'eagle', 'bird', 'nature'],
    likes: 1203,
    date: new Date('2024-05-28')
  }
];

export default function GalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>(mockPhotos);
  const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>(mockPhotos);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [viewMode, setViewMode] = useState<'masonry' | 'grid' | 'list' | 'map'>('masonry');

  const handleFilterChange = (filters: {
    categories: string[];
    routes: string[];
    seasons: string[];
    searchTerm: string;
    sortBy: string;
  }) => {
    let filtered = [...photos];

    if (filters.categories.length > 0 && !filters.categories.includes('All')) {
      filtered = filtered.filter(photo => filters.categories.includes(photo.category));
    }

    if (filters.routes.length > 0) {
      filtered = filtered.filter(photo => filters.routes.includes(photo.route));
    }

    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(photo =>
        photo.title.toLowerCase().includes(term) ||
        photo.description.toLowerCase().includes(term) ||
        photo.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }

    switch (filters.sortBy) {
      case 'Latest':
        filtered.sort((a, b) => b.date.getTime() - a.date.getTime());
        break;
      case 'Popular':
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case 'Random':
        filtered.sort(() => Math.random() - 0.5);
        break;
    }

    setFilteredPhotos(filtered);
  };

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const handleCloseLightbox = () => {
    setSelectedPhoto(null);
  };

  const handlePhotoUpload = (newPhoto: Photo) => {
    const updatedPhotos = [newPhoto, ...photos];
    setPhotos(updatedPhotos);
    setFilteredPhotos(updatedPhotos);
    setShowUpload(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <GalleryHeader
        totalPhotos={photos.length}
        photographers={23}
        categories={8}
      />

      <FilterBar
        onFilterChange={handleFilterChange}
        resultCount={filteredPhotos.length}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onUploadClick={() => setShowUpload(true)}
      />

      <GalleryGrid
        photos={filteredPhotos}
        viewMode={viewMode}
        onPhotoClick={handlePhotoClick}
      />

      {selectedPhoto && (
        <Lightbox
          photo={selectedPhoto}
          photos={filteredPhotos}
          onClose={handleCloseLightbox}
        />
      )}

      {showUpload && (
        <PhotoUpload
          onUpload={handlePhotoUpload}
          onClose={() => setShowUpload(false)}
        />
      )}

      <InstagramFeed />
    </div>
  );
}