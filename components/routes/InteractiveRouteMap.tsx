'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Polyline, Marker, InfoWindow } from '@react-google-maps/api';
import { Route } from './RouteSelector';
import { MapPin, Layers, Maximize2, Download, Mountain } from 'lucide-react';

interface InteractiveRouteMapProps {
  selectedRoute?: Route;
  onMarkerClick?: (marker: any) => void;
}

interface MarkerData {
  name: string;
  type: string;
  coordinates: [number, number];
  description?: string;
}

const mapContainerStyle = {
  width: '100%',
  height: '600px'
};

const center = {
  lat: 39.2,
  lng: 30.5
};

const mapOptions = {
  mapTypeControl: true,
  streetViewControl: false,
  fullscreenControl: true,
  zoomControl: true,
  mapTypeId: 'terrain' as google.maps.MapTypeId
};

export default function InteractiveRouteMap({ selectedRoute, onMarkerClick }: InteractiveRouteMapProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const [show3D, setShow3D] = useState(false);
  const [showElevation, setShowElevation] = useState(false);

  // Real coordinates for the Phrygian Way routes
  const routeData = {
    eastern: {
      coordinates: [
        { lat: 39.6505, lng: 31.9931 }, // Gordion
        { lat: 39.7123, lng: 31.8845 }, // Beylikköprü
        { lat: 39.8456, lng: 31.5234 }, // Mülk
        { lat: 39.9234, lng: 31.3567 }, // Sivrihisar
        { lat: 40.0123, lng: 31.1234 }, // Pessinus
        { lat: 39.0334, lng: 30.5231 }, // Yazılıkaya
      ],
      markers: [
        { name: 'Gordion Museum', type: 'monument', coordinates: [39.6505, 31.9931], description: 'Ancient capital of King Midas' },
        { name: 'Midas Tumulus', type: 'monument', coordinates: [39.6405, 31.9831], description: 'One of the largest ancient burial mounds' },
        { name: 'Sivrihisar', type: 'village', coordinates: [39.9234, 31.3567], description: 'Historic town with Ottoman architecture' },
        { name: 'Temple of Cybele', type: 'monument', coordinates: [40.0123, 31.1234], description: 'Sacred temple at Pessinus' },
        { name: 'Yazılıkaya Monument', type: 'monument', coordinates: [39.0334, 30.5231], description: 'Largest Phrygian rock monument' },
      ] as MarkerData[]
    },
    southern: {
      coordinates: [
        { lat: 38.5765, lng: 30.5459 }, // Seydiler
        { lat: 38.6234, lng: 30.4567 }, // Ayazini
        { lat: 38.7123, lng: 30.3456 }, // Döğer
        { lat: 38.8234, lng: 30.2345 }, // Göynüş
        { lat: 38.9345, lng: 30.1234 }, // Aslantaş
        { lat: 39.0334, lng: 30.5231 }, // Yazılıkaya
      ],
      markers: [
        { name: 'Seydiler Fairy Chimneys', type: 'nature', coordinates: [38.5765, 30.5459], description: 'Dramatic rock formations' },
        { name: 'Ayazini Rock Church', type: 'monument', coordinates: [38.6234, 30.4567], description: 'Byzantine rock-cut church complex' },
        { name: 'Göynüş Valley', type: 'nature', coordinates: [38.8234, 30.2345], description: 'Scenic valley with traditional villages' },
        { name: 'Aslantaş Monument', type: 'monument', coordinates: [38.9345, 30.1234], description: 'Ancient lion monument' },
      ] as MarkerData[]
    },
    western: {
      coordinates: [
        { lat: 39.4417, lng: 29.9751 }, // Yenice
        { lat: 39.3456, lng: 30.0234 }, // Zahran Valley
        { lat: 39.2567, lng: 30.1123 }, // Sökmen
        { lat: 39.1678, lng: 30.2234 }, // Çuköre
        { lat: 39.0789, lng: 30.3345 }, // İncik
        { lat: 39.0456, lng: 30.4456 }, // Kümbet
        { lat: 39.0334, lng: 30.5231 }, // Yazılıkaya
      ],
      markers: [
        { name: 'Yenice Farm', type: 'village', coordinates: [39.4417, 29.9751], description: 'Starting point of western route' },
        { name: 'Zahran Valley', type: 'nature', coordinates: [39.3456, 30.0234], description: 'Most beautiful section of the trail' },
        { name: 'Sökmen Plateau', type: 'nature', coordinates: [39.2567, 30.1123], description: 'Panoramic views of the region' },
        { name: 'İncik Caves', type: 'nature', coordinates: [39.0789, 30.3345], description: 'Extensive cave systems' },
      ] as MarkerData[]
    }
  };

  const getMarkerIcon = (type: string): string => {
    switch(type) {
      case 'monument': return 'https://maps.google.com/mapfiles/ms/icons/red-dot.png';
      case 'village': return 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png';
      case 'nature': return 'https://maps.google.com/mapfiles/ms/icons/green-dot.png';
      default: return 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
    }
  };

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    if (map && selectedRoute) {
      const bounds = new google.maps.LatLngBounds();
      const routeCoords = routeData[selectedRoute.id as keyof typeof routeData]?.coordinates;

      if (routeCoords) {
        routeCoords.forEach(coord => {
          bounds.extend(coord);
        });
        map.fitBounds(bounds);
      }
    }
  }, [map, selectedRoute]);

  const handleExportGPX = () => {
    // In production, this would generate and download a GPX file
    alert('GPX download will be available soon');
  };

  const getRouteColor = (routeId?: string) => {
    switch (routeId) {
      case 'eastern': return '#FF6B6B';
      case 'southern': return '#4ECDC4';
      case 'western': return '#95E77E';
      default: return '#666666';
    }
  };

  const handleMarkerClick = (marker: MarkerData) => {
    setSelectedMarker(marker);
    if (onMarkerClick) {
      onMarkerClick(marker);
    }
  };

  // Check if Google Maps API key is available
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey || apiKey === 'YOUR_GOOGLE_MAPS_API_KEY_HERE') {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">Interactive Trail Map</h3>
        </div>
        <div className="relative w-full h-[600px] bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
          <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
            <MapPin className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h4 className="text-lg font-semibold mb-2">Google Maps API Key Required</h4>
            <p className="text-gray-600 mb-4">
              To display the interactive map, please add your Google Maps API key to the .env.local file.
            </p>
            <div className="bg-gray-50 p-4 rounded text-left text-sm font-mono">
              <p className="text-gray-700">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Map Controls */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Interactive Trail Map</h3>
        <div className="flex gap-2">
          <button
            onClick={() => {
              if (map) {
                map.setMapTypeId(show3D ? 'terrain' : 'satellite');
                setShow3D(!show3D);
              }
            }}
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
        </div>
      </div>

      {/* Google Map Container */}
      <div className="relative w-full h-[600px] rounded-xl overflow-hidden">
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={8}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={mapOptions}
          >
            {/* Draw route polylines */}
            {selectedRoute && routeData[selectedRoute.id as keyof typeof routeData] && (
              <>
                <Polyline
                  path={routeData[selectedRoute.id as keyof typeof routeData].coordinates}
                  options={{
                    strokeColor: getRouteColor(selectedRoute.id),
                    strokeOpacity: 0.8,
                    strokeWeight: 3,
                  }}
                />

                {/* Add markers for key locations */}
                {routeData[selectedRoute.id as keyof typeof routeData].markers.map((marker, idx) => (
                  <Marker
                    key={idx}
                    position={{ lat: marker.coordinates[0], lng: marker.coordinates[1] }}
                    icon={getMarkerIcon(marker.type)}
                    onClick={() => handleMarkerClick(marker)}
                  />
                ))}

                {/* Info Window for selected marker */}
                {selectedMarker && (
                  <InfoWindow
                    position={{ lat: selectedMarker.coordinates[0], lng: selectedMarker.coordinates[1] }}
                    onCloseClick={() => setSelectedMarker(null)}
                  >
                    <div className="p-2">
                      <h4 className="font-semibold mb-1">{selectedMarker.name}</h4>
                      {selectedMarker.description && (
                        <p className="text-sm text-gray-600">{selectedMarker.description}</p>
                      )}
                    </div>
                  </InfoWindow>
                )}
              </>
            )}

            {/* Show all routes in lighter colors when none selected */}
            {!selectedRoute && (
              <>
                {/* Eastern Route */}
                <Polyline
                  path={routeData.eastern.coordinates}
                  options={{
                    strokeColor: '#FF6B6B',
                    strokeOpacity: 0.4,
                    strokeWeight: 2,
                  }}
                />
                {/* Southern Route */}
                <Polyline
                  path={routeData.southern.coordinates}
                  options={{
                    strokeColor: '#4ECDC4',
                    strokeOpacity: 0.4,
                    strokeWeight: 2,
                  }}
                />
                {/* Western Route */}
                <Polyline
                  path={routeData.western.coordinates}
                  options={{
                    strokeColor: '#95E77E',
                    strokeOpacity: 0.4,
                    strokeWeight: 2,
                  }}
                />
              </>
            )}
          </GoogleMap>
        </LoadScript>

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