'use client';

import { useState, useEffect } from 'react';
import { Search, X, Grid, List, Map, Upload, LayoutGrid } from 'lucide-react';
import { ViewMode } from './types';

interface FilterBarProps {
  onFilterChange: (filters: {
    categories: string[];
    routes: string[];
    seasons: string[];
    searchTerm: string;
    sortBy: string;
  }) => void;
  resultCount: number;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onUploadClick: () => void;
}

const categories = [
  'All',
  'Ancient Monuments',
  'Natural Wonders',
  'Village Life',
  'Trail Experience',
  'Seasons',
  'Wildlife',
  'People',
  'Aerial Views'
];

const routes = ['Eastern', 'Southern', 'Western'];
const seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];
const sortOptions = ['Latest', 'Popular', 'Random'];

export default function FilterBar({
  onFilterChange,
  resultCount,
  viewMode,
  onViewModeChange,
  onUploadClick
}: FilterBarProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['All']);
  const [selectedRoutes, setSelectedRoutes] = useState<string[]>([]);
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('Latest');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    onFilterChange({
      categories: selectedCategories,
      routes: selectedRoutes,
      seasons: selectedSeasons,
      searchTerm,
      sortBy
    });
  }, [selectedCategories, selectedRoutes, selectedSeasons, searchTerm, sortBy]);

  const toggleCategory = (category: string) => {
    if (category === 'All') {
      setSelectedCategories(['All']);
    } else {
      setSelectedCategories(prev => {
        const newCategories = prev.includes(category)
          ? prev.filter(c => c !== category)
          : [...prev.filter(c => c !== 'All'), category];

        return newCategories.length === 0 ? ['All'] : newCategories;
      });
    }
  };

  const toggleRoute = (route: string) => {
    setSelectedRoutes(prev =>
      prev.includes(route) ? prev.filter(r => r !== route) : [...prev, route]
    );
  };

  const toggleSeason = (season: string) => {
    setSelectedSeasons(prev =>
      prev.includes(season) ? prev.filter(s => s !== season) : [...prev, season]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories(['All']);
    setSelectedRoutes([]);
    setSelectedSeasons([]);
    setSearchTerm('');
    setSortBy('Latest');
  };

  const hasActiveFilters =
    selectedCategories.length > 1 ||
    (selectedCategories.length === 1 && selectedCategories[0] !== 'All') ||
    selectedRoutes.length > 0 ||
    selectedSeasons.length > 0 ||
    searchTerm !== '';

  return (
    <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search photos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-2"
            >
              Filters
              {hasActiveFilters && (
                <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                  Active
                </span>
              )}
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {sortOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => onViewModeChange('masonry')}
                className={`p-2 rounded ${viewMode === 'masonry' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                title="Masonry View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => onViewModeChange('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => onViewModeChange('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => onViewModeChange('map')}
                className={`p-2 rounded ${viewMode === 'map' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                title="Map View"
              >
                <Map className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onUploadClick}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Upload
            </button>

            <div className="text-sm text-gray-600 px-3">
              {resultCount} photos
            </div>
          </div>
        </div>

        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Filters</h3>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-orange-500 hover:text-orange-600 flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Clear all
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => toggleCategory(category)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        selectedCategories.includes(category)
                          ? 'bg-orange-500 text-white'
                          : 'bg-white border border-gray-300 hover:border-orange-500'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Routes</h4>
                <div className="flex flex-wrap gap-2">
                  {routes.map(route => (
                    <button
                      key={route}
                      onClick={() => toggleRoute(route)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        selectedRoutes.includes(route)
                          ? 'bg-orange-500 text-white'
                          : 'bg-white border border-gray-300 hover:border-orange-500'
                      }`}
                    >
                      {route} Route
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Seasons</h4>
                <div className="flex flex-wrap gap-2">
                  {seasons.map(season => (
                    <button
                      key={season}
                      onClick={() => toggleSeason(season)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        selectedSeasons.includes(season)
                          ? 'bg-orange-500 text-white'
                          : 'bg-white border border-gray-300 hover:border-orange-500'
                      }`}
                    >
                      {season}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}