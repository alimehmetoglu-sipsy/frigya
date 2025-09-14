'use client';

import { useEffect, useRef, useState } from 'react';

// Declare mapboxgl types to avoid TypeScript errors
declare global {
  interface Window {
    mapboxgl: typeof import('mapbox-gl');
  }
}

type MapboxMap = {
  remove(): void;
  on(event: string, callback: () => void): void;
  addSource(id: string, source: any): void;
  addLayer(layer: any): void;
  getSource(id: string): any;
};

interface MapBackgroundProps {
  className?: string;
  interactive?: boolean;
}

export default function MapBackground({ className = '', interactive = false }: MapBackgroundProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapboxMap | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapboxLoaded, setMapboxLoaded] = useState(false);

  useEffect(() => {
    // Check if Mapbox GL JS is already loaded
    if (typeof window !== 'undefined' && window.mapboxgl) {
      setMapboxLoaded(true);
      return;
    }

    // Load Mapbox GL JS and CSS dynamically
    const loadMapbox = async () => {
      try {
        // Load CSS
        const cssLink = document.createElement('link');
        cssLink.href = 'https://api.mapbox.com/mapbox-gl-js/v3.1.2/mapbox-gl.css';
        cssLink.rel = 'stylesheet';
        document.head.appendChild(cssLink);

        // Load JS
        const script = document.createElement('script');
        script.src = 'https://api.mapbox.com/mapbox-gl-js/v3.1.2/mapbox-gl.js';
        script.onload = () => setMapboxLoaded(true);
        document.head.appendChild(script);
      } catch (error) {
        console.error('Failed to load Mapbox GL JS:', error);
      }
    };

    loadMapbox();
  }, []);

  useEffect(() => {
    if (!mapboxLoaded || !mapContainerRef.current || mapRef.current) return;

    try {
      const mapboxgl = window.mapboxgl;

      // Use a public token or disable if no token available
      const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

      if (accessToken) {
        mapboxgl.accessToken = accessToken;
      } else {
        // Fallback to static background if no token
        setMapLoaded(true);
        return;
      }

      // Phrygian Way route coordinates (approximate center of the trail)
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: [30.5, 39.5], // Center on Phrygian Valley region
        zoom: 8.5,
        interactive: interactive,
        attributionControl: false,
        logoPosition: 'bottom-right',
        preserveDrawingBuffer: true,
      });

      map.on('load', () => {
        setMapLoaded(true);

        // Add Phrygian Way trail route (simplified for demo)
        if (map.getSource('phrygian-route')) return;

        map.addSource('phrygian-route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: [
                [32.6, 39.7], // Gordion start
                [31.2, 39.4], // Yazılıkaya center
                [30.8, 38.9], // Seydiler
                [29.9, 39.2], // Yenice
              ],
            },
          },
        });

        map.addLayer({
          id: 'phrygian-route-line',
          type: 'line',
          source: 'phrygian-route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#f97316',
            'line-width': 4,
            'line-opacity': 0.8,
          },
        });

        // Add key points
        const points = [
          { name: 'Gordion', coords: [32.6, 39.7] },
          { name: 'Yazılıkaya', coords: [31.2, 39.4] },
          { name: 'Seydiler', coords: [30.8, 38.9] },
          { name: 'Yenice', coords: [29.9, 39.2] },
        ];

        points.forEach((point) => {
          new mapboxgl.Marker({
            color: '#f97316',
            scale: 0.8,
          })
            .setLngLat(point.coords)
            .addTo(map);
        });
      });

      mapRef.current = map;

      return () => {
        if (mapRef.current) {
          mapRef.current.remove();
          mapRef.current = null;
        }
      };
    } catch (error) {
      console.error('Map initialization error:', error);
      setMapLoaded(true); // Show fallback
    }
  }, [mapboxLoaded, interactive]);

  return (
    <div className={`relative ${className}`}>
      {/* Primary background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/yazlikaya-hero-background.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      </div>

      {/* Mapbox container (optional overlay) - disabled for now */}
      {false && (
        <div
          ref={mapContainerRef}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            mapLoaded ? 'opacity-50' : 'opacity-0'
          }`}
        />
      )}

      {/* Overlay for hero text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/10 pointer-events-none" />
    </div>
  );
}