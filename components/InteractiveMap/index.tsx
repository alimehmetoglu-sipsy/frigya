'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { routeData } from './routeData';
import { MapPin, Navigation, Info, Layers, Maximize2 } from 'lucide-react';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

interface InteractiveMapProps {
  className?: string;
  selectedRoute?: string;
  onRouteSelect?: (routeId: string) => void;
}

export default function InteractiveMap({ className = '', selectedRoute, onRouteSelect }: InteractiveMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(30.5);
  const [lat, setLat] = useState(39.2);
  const [zoom, setZoom] = useState(8);
  const [activeRoute, setActiveRoute] = useState<string | null>(selectedRoute || null);
  const [showElevation, setShowElevation] = useState(false);
  const [mapStyle, setMapStyle] = useState('terrain');
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: mapStyle === 'terrain'
        ? 'mapbox://styles/mapbox/outdoors-v12'
        : 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [lng, lat],
      zoom: zoom,
      pitch: 30,
      bearing: 0,
      attributionControl: false
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    map.current.addControl(new mapboxgl.ScaleControl(), 'bottom-left');
    map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');

    map.current.addControl(
      new mapboxgl.AttributionControl({
        customAttribution: 'Frig Yolu Haritası'
      }),
      'bottom-right'
    );

    map.current.on('load', () => {
      if (!map.current) return;

      // Add terrain
      map.current.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 512,
        maxzoom: 14
      });

      map.current.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });

      // Add routes
      Object.entries(routeData).forEach(([routeId, route]) => {
        if (!map.current) return;

        // Add route source
        map.current.addSource(`route-${routeId}`, {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {
              name: route.name,
              distance: route.distance,
              difficulty: route.difficulty
            },
            geometry: {
              type: 'LineString',
              coordinates: route.coordinates
            }
          }
        });

        // Add route line layer
        map.current.addLayer({
          id: `route-${routeId}`,
          type: 'line',
          source: `route-${routeId}`,
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': route.color,
            'line-width': [
              'case',
              ['boolean', ['==', routeId, activeRoute], false],
              6,
              4
            ],
            'line-opacity': [
              'case',
              ['boolean', ['==', routeId, activeRoute], false],
              1,
              0.7
            ]
          }
        });

        // Add route outline
        map.current.addLayer({
          id: `route-${routeId}-outline`,
          type: 'line',
          source: `route-${routeId}`,
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#ffffff',
            'line-width': [
              'case',
              ['boolean', ['==', routeId, activeRoute], false],
              8,
              6
            ],
            'line-opacity': 0.3
          }
        }, `route-${routeId}`);

        // Add markers
        route.markers.forEach((marker, index) => {
          const el = document.createElement('div');
          el.className = 'custom-marker';
          el.innerHTML = `
            <div class="marker-pin ${routeId === activeRoute ? 'active' : ''}">
              <svg width="30" height="40" viewBox="0 0 30 40" fill="none">
                <path d="M15 0C6.7 0 0 6.7 0 15C0 25 15 40 15 40S30 25 30 15C30 6.7 23.3 0 15 0Z" fill="${route.color}"/>
                <circle cx="15" cy="15" r="8" fill="white"/>
                <text x="15" y="19" text-anchor="middle" fill="${route.color}" font-size="10" font-weight="bold">${index + 1}</text>
              </svg>
            </div>
          `;

          const markerInstance = new mapboxgl.Marker(el)
            .setLngLat([marker.lng, marker.lat])
            .setPopup(
              new mapboxgl.Popup({ offset: 25 })
                .setHTML(`
                  <div class="popup-content">
                    <h3 class="font-bold text-sm mb-1">${marker.name}</h3>
                    ${marker.elevation ? `<p class="text-xs text-gray-600">Yükseklik: ${marker.elevation}m</p>` : ''}
                    ${marker.description ? `<p class="text-xs mt-1">${marker.description}</p>` : ''}
                  </div>
                `)
            )
            .addTo(map.current!);

          markersRef.current.push(markerInstance);
        });

        // Add click event
        map.current.on('click', `route-${routeId}`, (e) => {
          if (!map.current) return;

          const coordinates = e.lngLat;
          const description = `
            <div class="p-2">
              <h3 class="font-bold text-lg mb-2">${route.name}</h3>
              <p class="text-sm text-gray-600 mb-1">Mesafe: ${route.distance}</p>
              <p class="text-sm text-gray-600 mb-1">Zorluk: ${route.difficulty}</p>
              <p class="text-sm mt-2">${route.description}</p>
            </div>
          `;

          new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map.current);
        });

        // Change cursor on hover
        map.current.on('mouseenter', `route-${routeId}`, () => {
          if (map.current) map.current.getCanvas().style.cursor = 'pointer';
        });

        map.current.on('mouseleave', `route-${routeId}`, () => {
          if (map.current) map.current.getCanvas().style.cursor = '';
        });
      });
    });

    map.current.on('move', () => {
      if (!map.current) return;
      setLng(parseFloat(map.current.getCenter().lng.toFixed(4)));
      setLat(parseFloat(map.current.getCenter().lat.toFixed(4)));
      setZoom(parseFloat(map.current.getZoom().toFixed(2)));
    });

    return () => {
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
      map.current?.remove();
      map.current = null;
    };
  }, []);

  useEffect(() => {
    if (!map.current || !map.current.isStyleLoaded()) return;

    Object.keys(routeData).forEach((routeId) => {
      if (map.current?.getLayer(`route-${routeId}`)) {
        map.current.setPaintProperty(`route-${routeId}`, 'line-width',
          routeId === activeRoute ? 6 : 4
        );
        map.current.setPaintProperty(`route-${routeId}`, 'line-opacity',
          routeId === activeRoute ? 1 : 0.7
        );
      }
    });

    if (activeRoute && routeData[activeRoute]) {
      const bounds = new mapboxgl.LngLatBounds();
      routeData[activeRoute].coordinates.forEach(coord => {
        bounds.extend(coord as [number, number]);
      });
      map.current?.fitBounds(bounds, { padding: 50 });
    }
  }, [activeRoute]);

  const toggleMapStyle = () => {
    if (!map.current) return;
    const newStyle = mapStyle === 'terrain' ? 'satellite' : 'terrain';
    setMapStyle(newStyle);
    map.current.setStyle(
      newStyle === 'terrain'
        ? 'mapbox://styles/mapbox/outdoors-v12'
        : 'mapbox://styles/mapbox/satellite-streets-v12'
    );
  };

  const handleRouteSelect = (routeId: string) => {
    setActiveRoute(routeId === activeRoute ? null : routeId);
    if (onRouteSelect) {
      onRouteSelect(routeId);
    }
  };

  return (
    <div className={`relative w-full h-full ${className}`}>
      <div ref={mapContainer} className="w-full h-full rounded-lg shadow-2xl" />

      {/* Map Controls */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-3 max-w-xs">
        <div className="flex items-center gap-2 mb-2">
          <Navigation className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold">Frig Yolu Rotaları</span>
        </div>

        <div className="space-y-2">
          {Object.entries(routeData).map(([routeId, route]) => (
            <button
              key={routeId}
              onClick={() => handleRouteSelect(routeId)}
              className={`w-full text-left p-2 rounded-md transition-all ${
                activeRoute === routeId
                  ? 'bg-primary/10 border-l-4'
                  : 'hover:bg-gray-100'
              }`}
              style={{ borderLeftColor: activeRoute === routeId ? route.color : 'transparent' }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: route.color }}
                />
                <div className="flex-1">
                  <p className="text-xs font-medium">{route.name}</p>
                  <p className="text-xs text-gray-500">{route.distance} • {route.difficulty}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-3 pt-3 border-t border-gray-200">
          <button
            onClick={toggleMapStyle}
            className="flex items-center gap-2 text-xs text-gray-600 hover:text-primary transition-colors"
          >
            <Layers className="w-3 h-3" />
            {mapStyle === 'terrain' ? 'Uydu Görünümü' : 'Arazi Görünümü'}
          </button>
        </div>
      </div>

      {/* Coordinates Display */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded px-3 py-1 text-xs">
        <span className="text-gray-600">
          {lat.toFixed(4)}°N, {lng.toFixed(4)}°E | Zoom: {zoom}
        </span>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 text-xs">
        <div className="flex items-center gap-2 mb-2">
          <Info className="w-3 h-3 text-gray-600" />
          <span className="font-semibold">Zorluk Seviyeleri</span>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Kolay</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span>Orta</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Zor</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-marker {
          cursor: pointer;
        }
        .marker-pin {
          transform: translateY(-50%);
          transition: transform 0.2s;
        }
        .marker-pin:hover,
        .marker-pin.active {
          transform: translateY(-50%) scale(1.1);
        }
        .popup-content {
          padding: 8px;
        }
      `}</style>
    </div>
  );
}