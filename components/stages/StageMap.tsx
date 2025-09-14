'use client';

import { useEffect, useRef } from 'react';
import { StageData } from '@/data/stageData';
import dynamic from 'next/dynamic';

interface StageMapProps {
  stage: StageData;
}

export default function StageMap({ stage }: StageMapProps) {
  const mapRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!containerRef.current) return;

    import('leaflet').then((L) => {
      import('leaflet/dist/leaflet.css');

      if (mapRef.current) {
        mapRef.current.remove();
      }

      const map = L.default.map(containerRef.current!).fitBounds(stage.mapBounds);

      L.default.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

        const startIcon = L.default.divIcon({
        html: '<div class="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">S</div>',
        className: 'custom-div-icon',
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const endIcon = L.default.divIcon({
        html: '<div class="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">F</div>',
        className: 'custom-div-icon',
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      L.default.marker([stage.mapBounds[1][0], stage.mapBounds[1][1]], { icon: startIcon })
        .addTo(map)
        .bindPopup(`<strong>Start:</strong> ${stage.from}`);

      L.default.marker([stage.mapBounds[0][0], stage.mapBounds[0][1]], { icon: endIcon })
        .addTo(map)
        .bindPopup(`<strong>End:</strong> ${stage.to}`);

      stage.highlights.forEach((highlight) => {
        const highlightIcon = L.default.divIcon({
        html: '<div class="bg-primary-600 text-white rounded-full w-6 h-6 flex items-center justify-center"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/></svg></div>',
        className: 'custom-div-icon',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

        L.default.marker(highlight.coordinates, { icon: highlightIcon })
        .addTo(map)
        .bindPopup(`<strong>${highlight.name}</strong><br>${highlight.description}`);
    });

    stage.waypoints.forEach((waypoint) => {
        const waypointIcon = L.default.divIcon({
        html: `<div class="bg-white border-2 border-primary-600 text-primary-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">${waypoint.km}</div>`,
        className: 'custom-div-icon',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      const lat = stage.mapBounds[0][0] + (stage.mapBounds[1][0] - stage.mapBounds[0][0]) * (waypoint.km / stage.distance);
      const lng = stage.mapBounds[0][1] + (stage.mapBounds[1][1] - stage.mapBounds[0][1]) * (waypoint.km / stage.distance);

        L.default.marker([lat, lng], { icon: waypointIcon })
        .addTo(map)
        .bindPopup(`<strong>${waypoint.name}</strong><br>Km ${waypoint.km} • ${waypoint.elevation}m`);
    });

    stage.accommodation.forEach((acc, index) => {
        const accIcon = L.default.divIcon({
        html: '<div class="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/></svg></div>',
        className: 'custom-div-icon',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      const accommodationLat = stage.mapBounds[0][0] - 0.001 * (index + 1);
      const accommodationLng = stage.mapBounds[0][1];

        L.default.marker([accommodationLat, accommodationLng], { icon: accIcon })
        .addTo(map)
        .bindPopup(`<strong>${acc.name}</strong><br>Type: ${acc.type}<br>Price: ${acc.price}`);
    });

    const routeCoords: [number, number][] = stage.waypoints.map((waypoint) => {
      const lat = stage.mapBounds[0][0] + (stage.mapBounds[1][0] - stage.mapBounds[0][0]) * (waypoint.km / stage.distance);
      const lng = stage.mapBounds[0][1] + (stage.mapBounds[1][1] - stage.mapBounds[0][1]) * (waypoint.km / stage.distance);
      return [lat, lng];
    });

      L.default.polyline(routeCoords, {
      color: '#DC2626',
      weight: 3,
      opacity: 0.7,
      dashArray: '10, 5'
    }).addTo(map);

      mapRef.current = map;
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [stage]);

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="font-display text-xl font-bold mb-4">Stage Map</h3>
      <div ref={containerRef} className="h-[500px] rounded-lg overflow-hidden" />
      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">S</div>
          <span>Start Point</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">F</div>
          <span>End Point</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-primary-600 text-white rounded-full w-6 h-6 flex items-center justify-center">•</div>
          <span>Highlights</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center">•</div>
          <span>Accommodation</span>
        </div>
      </div>
    </div>
  );
}