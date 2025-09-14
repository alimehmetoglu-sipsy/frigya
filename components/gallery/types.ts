export interface Photo {
  id: string;
  url: string;
  thumbnailUrl: string;
  title: string;
  description: string;
  category: string;
  route: string;
  location: {
    name: string;
    coordinates: [number, number];
  };
  photographer: {
    name: string;
    instagram: string;
  };
  metadata: {
    camera: string;
    lens: string;
    settings: string;
  };
  tags: string[];
  likes: number;
  date: Date;
}

export type ViewMode = 'masonry' | 'grid' | 'list' | 'map';

export interface FilterState {
  categories: string[];
  routes: string[];
  seasons: string[];
  searchTerm: string;
  sortBy: string;
}