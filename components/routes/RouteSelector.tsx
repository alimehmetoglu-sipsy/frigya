'use client';

import { useState } from 'react';
import { MapPin, Clock, TrendingUp, ChevronRight } from 'lucide-react';

export interface Route {
  id: 'eastern' | 'southern' | 'western';
  name: string;
  distance: number;
  duration: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  startPoint: {
    name: string;
    coordinates: [number, number];
  };
  keyStops: string[];
  accommodation: string[];
  description: string;
  color: string;
  highlights: string[];
}

interface RouteSelectorProps {
  onRouteSelect: (route: Route) => void;
  selectedRoute?: Route;
}

export default function RouteSelector({ onRouteSelect, selectedRoute }: RouteSelectorProps) {
  const [comparisonMode, setComparisonMode] = useState(false);
  const [compareRoutes, setCompareRoutes] = useState<Route['id'][]>([]);

  const routes: Route[] = [
    {
      id: 'eastern',
      name: 'Eastern Route',
      distance: 219,
      duration: '8-10 days',
      difficulty: 'Challenging',
      startPoint: {
        name: 'Gordion (Yassıhöyük)',
        coordinates: [39.6505, 31.9931]
      },
      keyStops: ['Gordion', 'Sivrihisar', 'Pessinus', 'Yazılıkaya'],
      accommodation: ['Village guesthouses', 'Hotels in Sivrihisar', 'Camping areas'],
      description: 'Beginning at the UNESCO World Heritage Site of Gordion, this route takes you through the heart of ancient Phrygia.',
      color: '#FF6B6B',
      highlights: [
        'Gordion ancient capital & museum',
        'Midas Tumulus',
        'Temple of Cybele at Pessinus',
        'Yazılıkaya (Midas Monument)'
      ]
    },
    {
      id: 'southern',
      name: 'Southern Route',
      distance: 140,
      duration: '6-7 days',
      difficulty: 'Moderate',
      startPoint: {
        name: 'Seydiler',
        coordinates: [38.5765, 30.5459]
      },
      keyStops: ['Seydiler', 'Ayazini', 'Göynüş Valley', 'Aslantaş'],
      accommodation: ['Village homes', 'Pensions', 'Municipal guesthouses'],
      description: 'The most accessible route, perfect for beginners. Features dramatic fairy chimneys similar to Cappadocia.',
      color: '#4ECDC4',
      highlights: [
        'Seydiler fairy chimneys',
        'Ayazini rock church (UNESCO tentative)',
        'Göynüş Valley & Aslantaş monument',
        'Byzantine rock settlements'
      ]
    },
    {
      id: 'western',
      name: 'Western Route',
      distance: 147,
      duration: '6-7 days',
      difficulty: 'Moderate',
      startPoint: {
        name: 'Yenice Farm',
        coordinates: [39.4417, 29.9751]
      },
      keyStops: ['Yenice', 'Zahran Valley', 'Sökmen Plateau', 'İncik'],
      accommodation: ['Traditional village houses', 'Camping spots', 'Farm stays'],
      description: 'The most scenic route, passing through pristine valleys and ancient Phrygian roads still visible in the rock.',
      color: '#95E77E',
      highlights: [
        'Zahran Valley (most beautiful section)',
        'Ancient rock-cut Phrygian roads',
        'Sökmen Plateau panoramas',
        'İncik cave systems'
      ]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700';
      case 'Moderate': return 'bg-yellow-100 text-yellow-700';
      case 'Challenging': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const toggleCompareRoute = (routeId: Route['id']) => {
    setCompareRoutes(prev => {
      if (prev.includes(routeId)) {
        return prev.filter(id => id !== routeId);
      }
      if (prev.length < 2) {
        return [...prev, routeId];
      }
      return [prev[1], routeId];
    });
  };

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Choose Your Adventure</h2>
        <button
          onClick={() => setComparisonMode(!comparisonMode)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            comparisonMode 
              ? 'bg-primary-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {comparisonMode ? 'Exit Comparison' : 'Compare Routes'}
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {routes.map((route) => {
          const isSelected = selectedRoute?.id === route.id;
          const isComparing = compareRoutes.includes(route.id);

          return (
            <div
              key={route.id}
              className={`relative rounded-xl border-2 transition-all duration-300 cursor-pointer overflow-hidden ${
                isSelected
                  ? 'border-primary-600 shadow-xl'
                  : isComparing
                  ? 'border-primary-400 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
              onClick={() => {
                if (comparisonMode) {
                  toggleCompareRoute(route.id);
                } else {
                  onRouteSelect(route);
                }
              }}
            >
              {/* Route color indicator */}
              <div 
                className="h-2 w-full" 
                style={{ backgroundColor: route.color }}
              />

              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{route.name}</h3>
                    <p className="text-sm text-gray-600">{route.startPoint.name}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    getDifficultyColor(route.difficulty)
                  }`}>
                    {route.difficulty}
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium">{route.distance} km</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium">{route.duration}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {route.description}
                </p>

                {/* Key Stops */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-500 mb-2">KEY STOPS</p>
                  <div className="flex flex-wrap gap-1">
                    {route.keyStops.slice(0, 3).map((stop, idx) => (
                      <span 
                        key={idx}
                        className="text-xs bg-gray-100 px-2 py-1 rounded"
                      >
                        {stop}
                      </span>
                    ))}
                    {route.keyStops.length > 3 && (
                      <span className="text-xs text-gray-500">+{route.keyStops.length - 3} more</span>
                    )}
                  </div>
                </div>

                {/* Selection indicator */}
                {isSelected && (
                  <div className="absolute top-4 right-4">
                    <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Comparison indicator */}
                {comparisonMode && isComparing && (
                  <div className="absolute top-4 right-4">
                    <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                      {compareRoutes.indexOf(route.id) + 1}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparison Table */}
      {comparisonMode && compareRoutes.length === 2 && (
        <div className="mt-8 bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-bold mb-4">Route Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Feature</th>
                  {compareRoutes.map(id => {
                    const route = routes.find(r => r.id === id)!;
                    return (
                      <th key={id} className="text-left py-2">
                        <span 
                          className="inline-block w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: route.color }}
                        />
                        {route.name}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 font-medium">Distance</td>
                  {compareRoutes.map(id => {
                    const route = routes.find(r => r.id === id)!;
                    return <td key={id} className="py-2">{route.distance} km</td>;
                  })}
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-medium">Duration</td>
                  {compareRoutes.map(id => {
                    const route = routes.find(r => r.id === id)!;
                    return <td key={id} className="py-2">{route.duration}</td>;
                  })}
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-medium">Difficulty</td>
                  {compareRoutes.map(id => {
                    const route = routes.find(r => r.id === id)!;
                    return (
                      <td key={id} className="py-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          getDifficultyColor(route.difficulty)
                        }`}>
                          {route.difficulty}
                        </span>
                      </td>
                    );
                  })}
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-medium">Start Point</td>
                  {compareRoutes.map(id => {
                    const route = routes.find(r => r.id === id)!;
                    return <td key={id} className="py-2">{route.startPoint.name}</td>;
                  })}
                </tr>
                <tr>
                  <td className="py-2 font-medium align-top">Highlights</td>
                  {compareRoutes.map(id => {
                    const route = routes.find(r => r.id === id)!;
                    return (
                      <td key={id} className="py-2">
                        <ul className="text-sm space-y-1">
                          {route.highlights.slice(0, 3).map((highlight, idx) => (
                            <li key={idx}>• {highlight}</li>
                          ))}
                        </ul>
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}