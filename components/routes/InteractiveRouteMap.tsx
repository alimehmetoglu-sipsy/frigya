'use client';

import { useEffect, useRef, useState } from 'react';
import { Route } from './RouteSelector';
import { MapPin, Layers, Maximize2, Download, Mountain } from 'lucide-react';

interface InteractiveRouteMapProps {
  selectedRoute?: Route;
  onMarkerClick?: (marker: any) => void;
}

export default function InteractiveRouteMap({ selectedRoute, onMarkerClick }: InteractiveRouteMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [show3D, setShow3D] = useState(false);
  const [showElevation, setShowElevation] = useState(false);

  // Mock route data - in production, this would come from a real data source
  const routeData = {
    eastern: {
      coordinates: [
        [31.9931, 39.6505], // Gordion
        [31.8845, 39.7123], // Beylikköprü
        [31.5234, 39.8456], // Mülk  
        [31.3567, 39.9234], // Sivrihisar
        [31.1234, 40.0123], // Pessinus
        [30.5231, 39.0334], // Yazılıkaya
      ],
      markers: [
        { name: 'Gordion Museum', type: 'monument', coordinates: [31.9931, 39.6505] },
        { name: 'Midas Tumulus', type: 'monument', coordinates: [31.9831, 39.6405] },
        { name: 'Sivrihisar Center', type: 'village', coordinates: [31.3567, 39.9234] },
        { name: 'Temple of Cybele', type: 'monument', coordinates: [31.1234, 40.0123] },
        { name: 'Yazılıkaya Monument', type: 'monument', coordinates: [30.5231, 39.0334] },
      ]
    },
    southern: {
      coordinates: [
        [30.5459, 38.5765], // Seydiler
        [30.4567, 38.6234], // Ayazini
        [30.3456, 38.7123], // Döğer
        [30.2345, 38.8234], // Göynüş
        [30.1234, 38.9345], // Aslantaş
        [30.5231, 39.0334], // Yazılıkaya
      ],
      markers: [
        { name: 'Seydiler Fairy Chimneys', type: 'nature', coordinates: [30.5459, 38.5765] },
        { name: 'Ayazini Rock Church', type: 'monument', coordinates: [30.4567, 38.6234] },
        { name: 'Göynüş Valley', type: 'nature', coordinates: [30.2345, 38.8234] },
        { name: 'Aslantaş Monument', type: 'monument', coordinates: [30.1234, 38.9345] },
      ]
    },
    western: {
      coordinates: [
        [29.9751, 39.4417], // Yenice
        [30.0234, 39.3456], // Zahran Valley
        [30.1123, 39.2567], // Sökmen
        [30.2234, 39.1678], // Çuköre
        [30.3345, 39.0789], // İncik
        [30.4456, 39.0456], // Kümbet
        [30.5231, 39.0334], // Yazılıkaya
      ],
      markers: [
        { name: 'Yenice Farm', type: 'village', coordinates: [29.9751, 39.4417] },
        { name: 'Zahran Valley', type: 'nature', coordinates: [30.0234, 39.3456] },
        { name: 'Sökmen Plateau', type: 'nature', coordinates: [30.1123, 39.2567] },
        { name: 'İncik Caves', type: 'nature', coordinates: [30.3345, 39.0789] },
      ]
    }
  };

  const markerIcons = {
    monument: '🏛️',
    village: '🏘️',
    nature: '🌲',
    water: '💧',
    accommodation: '🏨'
  };

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleExportGPX = () => {
    // In production, this would generate and download a GPX file
    alert('GPX download would start here');
  };

  const getRouteColor = (routeId?: string) => {
    switch (routeId) {
      case 'eastern': return '#FF6B6B';
      case 'southern': return '#4ECDC4';
      case 'western': return '#95E77E';
      default: return '#666666';
    }
  };

  return (
    <div className="space-y-4">
      {/* Map Controls */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Interactive Trail Map</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setShow3D(!show3D)}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
              show3D 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Mountain className="w-4 h-4" />
            3D Terrain
          </button>
          <button
            onClick={() => setShowElevation(!showElevation)}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
              showElevation 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            Elevation
          </button>
          <button
            onClick={handleExportGPX}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            GPX
          </button>
          <button className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div 
        ref={mapContainerRef}
        className="relative w-full h-[600px] bg-gray-100 rounded-xl overflow-hidden"
      >
        {!mapLoaded ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading map...</p>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full">
            {/* Placeholder Map */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-green-100 to-green-50">
              {/* Simple SVG representation of routes */}
              <svg className="w-full h-full" viewBox="0 0 800 600">
                {/* Grid pattern */}
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="800" height="600" fill="url(#grid)" />

                {/* Route paths */}
                {selectedRoute && (
                  <g>
                    <path
                      d={`M ${routeData[selectedRoute.id]?.coordinates.map((coord, i) => 
                        `${200 + i * 80} ${300 - i * 20}`
                      ).join(' L ')}`}
                      fill="none"
                      stroke={getRouteColor(selectedRoute.id)}
                      strokeWidth="3"
                      strokeDasharray={show3D ? "10,5" : "0"}
                      className="transition-all duration-300"
                    />
                    
                    {/* Route markers */}
                    {routeData[selectedRoute.id]?.markers.map((marker, idx) => (
                      <g key={idx}>
                        <circle
                          cx={200 + idx * 100}
                          cy={280 - idx * 15}
                          r="8"
                          fill="white"
                          stroke={getRouteColor(selectedRoute.id)}
                          strokeWidth="2"
                          className="cursor-pointer hover:r-10 transition-all"
                          onClick={() => onMarkerClick?.(marker)}
                        />
                        <text
                          x={200 + idx * 100}
                          y={285 - idx * 15}
                          textAnchor="middle"
                          className="text-xs pointer-events-none"
                        >
                          {markerIcons[marker.type as keyof typeof markerIcons]}
                        </text>
                      </g>
                    ))}
                  </g>
                )}

                {/* Legend */}
                <g transform="translate(20, 20)">
                  <rect x="0" y="0" width="150" height="100" fill="white" fillOpacity="0.9" rx="8" />
                  <text x="10" y="20" className="text-sm font-semibold">Legend</text>
                  <g transform="translate(10, 35)">
                    <line x1="0" y1="0" x2="20" y2="0" stroke={getRouteColor('eastern')} strokeWidth="2" />
                    <text x="25" y="4" className="text-xs">Eastern Route</text>
                  </g>
                  <g transform="translate(10, 55)">
                    <line x1="0" y1="0" x2="20" y2="0" stroke={getRouteColor('southern')} strokeWidth="2" />
                    <text x="25" y="4" className="text-xs">Southern Route</text>
                  </g>
                  <g transform="translate(10, 75)">
                    <line x1="0" y1="0" x2="20" y2="0" stroke={getRouteColor('western')} strokeWidth="2" />
                    <text x="25" y="4" className="text-xs">Western Route</text>
                  </g>
                </g>

                {/* Scale */}
                <g transform="translate(650, 550)">
                  <line x1="0" y1="0" x2="100" y2="0" stroke="#333" strokeWidth="2" />
                  <line x1="0" y1="-5" x2="0" y2="5" stroke="#333" strokeWidth="2" />
                  <line x1="100" y1="-5" x2="100" y2="5" stroke="#333" strokeWidth="2" />
                  <text x="50" y="20" textAnchor="middle" className="text-xs">10 km</text>
                </g>

                {/* North arrow */}
                <g transform="translate(750, 50)">
                  <circle cx="0" cy="0" r="20" fill="white" fillOpacity="0.9" />
                  <path d="M 0 -15 L -5 -5 L 0 -8 L 5 -5 Z" fill="#333" />
                  <text x="0" y="5" textAnchor="middle" className="text-xs font-bold">N</text>
                </g>
              </svg>
            </div>

            {/* Elevation Profile Overlay */}
            {showElevation && selectedRoute && (
              <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-4 border-t">
                <div className="h-32">
                  <h4 className="text-sm font-semibold mb-2">Elevation Profile</h4>
                  <svg className="w-full h-24" viewBox="0 0 800 100">
                    <defs>
                      <linearGradient id="elevGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={getRouteColor(selectedRoute.id)} stopOpacity="0.3" />
                        <stop offset="100%" stopColor={getRouteColor(selectedRoute.id)} stopOpacity="0.1" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0 80 L 100 70 L 200 60 L 300 65 L 400 50 L 500 55 L 600 60 L 700 45 L 800 50 L 800 100 L 0 100 Z"
                      fill="url(#elevGradient)"
                      stroke={getRouteColor(selectedRoute.id)}
                      strokeWidth="2"
                    />
                    <text x="10" y="20" className="text-xs">1,500m</text>
                    <text x="10" y="95" className="text-xs">800m</text>
                  </svg>
                </div>
              </div>
            )}

            {/* Distance Measurement Tool */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-semibold">Distance Tool</span>
              </div>
              <p className="text-xs text-gray-600">Click points on map to measure</p>
            </div>
          </div>
        )}
      </div>

      {/* Map Info */}
      {selectedRoute && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            <strong>Selected Route:</strong> {selectedRoute.name} • 
            <strong> Distance:</strong> {selectedRoute.distance} km • 
            <strong> Start:</strong> {selectedRoute.startPoint.name} 
            ({selectedRoute.startPoint.coordinates[0].toFixed(4)}°N, {selectedRoute.startPoint.coordinates[1].toFixed(4)}°E)
          </p>
        </div>
      )}
    </div>
  );
}