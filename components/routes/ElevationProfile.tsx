'use client';

import { useState } from 'react';
import { Mountain, TrendingUp, TrendingDown } from 'lucide-react';

interface ElevationProfileProps {
  routeId: string;
}

export default function ElevationProfile({ routeId }: ElevationProfileProps) {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  // Mock elevation data - in production, this would come from real GPS data
  const elevationData = {
    eastern: {
      labels: ['0km', '20km', '40km', '60km', '80km', '100km', '120km', '140km', '160km', '180km', '200km', '219km'],
      elevations: [800, 850, 920, 880, 950, 1020, 1150, 1080, 1200, 1350, 1420, 1500],
      totalAscent: 4500,
      totalDescent: 4300,
      maxElevation: 1500,
      minElevation: 800
    },
    southern: {
      labels: ['0km', '20km', '40km', '60km', '80km', '100km', '120km', '140km'],
      elevations: [900, 950, 1020, 980, 1050, 1120, 1250, 1400],
      totalAscent: 2800,
      totalDescent: 2600,
      maxElevation: 1400,
      minElevation: 900
    },
    western: {
      labels: ['0km', '20km', '40km', '60km', '80km', '100km', '120km', '147km'],
      elevations: [850, 920, 1050, 1180, 1250, 1320, 1380, 1450],
      totalAscent: 3200,
      totalDescent: 3000,
      maxElevation: 1450,
      minElevation: 850
    }
  };

  const data = elevationData[routeId as keyof typeof elevationData] || elevationData.eastern;

  const getPathData = () => {
    const width = 800;
    const height = 200;
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    const maxElev = Math.max(...data.elevations);
    const minElev = Math.min(...data.elevations);
    const elevRange = maxElev - minElev;

    const points = data.elevations.map((elev, i) => {
      const x = padding + (i / (data.elevations.length - 1)) * chartWidth;
      const y = padding + (1 - (elev - minElev) / elevRange) * chartHeight;
      return `${x},${y}`;
    });

    const pathLine = `M ${points.join(' L ')}`;
    const pathArea = `${pathLine} L ${width - padding},${height - padding} L ${padding},${height - padding} Z`;

    return { pathLine, pathArea, points: points.map(p => p.split(',').map(Number)) };
  };

  const { pathLine, pathArea, points } = getPathData();

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-bold mb-2">Elevation Profile</h3>
          <p className="text-sm text-gray-600">Interactive elevation chart - hover for details</p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="flex items-center gap-2 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span className="font-semibold">Total Ascent</span>
            </div>
            <p className="text-lg font-bold">{data.totalAscent}m</p>
          </div>
          <div>
            <div className="flex items-center gap-2 text-red-600">
              <TrendingDown className="w-4 h-4" />
              <span className="font-semibold">Total Descent</span>
            </div>
            <p className="text-lg font-bold">{data.totalDescent}m</p>
          </div>
        </div>
      </div>

      <div className="relative">
        <svg 
          viewBox="0 0 800 240" 
          className="w-full"
          onMouseLeave={() => setHoveredPoint(null)}
        >
          <defs>
            <linearGradient id={`gradient-${routeId}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <g className="text-gray-300">
            {[0, 1, 2, 3, 4].map(i => {
              const y = 40 + (i * 160) / 4;
              return (
                <line
                  key={`h-${i}`}
                  x1="40"
                  y1={y}
                  x2="760"
                  y2={y}
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeDasharray="4,4"
                />
              );
            })}
            {data.labels.map((_, i) => {
              const x = 40 + (i / (data.labels.length - 1)) * 720;
              return (
                <line
                  key={`v-${i}`}
                  x1={x}
                  y1="40"
                  x2={x}
                  y2="200"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeDasharray="4,4"
                />
              );
            })}
          </g>

          {/* Area under curve */}
          <path
            d={pathArea}
            fill={`url(#gradient-${routeId})`}
          />

          {/* Elevation line */}
          <path
            d={pathLine}
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2"
          />

          {/* Interactive points */}
          {points.map((point, i) => (
            <g key={i}>
              <circle
                cx={point[0]}
                cy={point[1]}
                r={hoveredPoint === i ? "6" : "4"}
                fill="white"
                stroke="#3B82F6"
                strokeWidth="2"
                className="cursor-pointer transition-all"
                onMouseEnter={() => setHoveredPoint(i)}
              />
              {hoveredPoint === i && (
                <g>
                  <rect
                    x={point[0] - 40}
                    y={point[1] - 35}
                    width="80"
                    height="25"
                    fill="white"
                    stroke="#3B82F6"
                    strokeWidth="1"
                    rx="4"
                  />
                  <text
                    x={point[0]}
                    y={point[1] - 20}
                    textAnchor="middle"
                    className="text-xs font-semibold fill-gray-700"
                  >
                    {data.labels[i]}
                  </text>
                  <text
                    x={point[0]}
                    y={point[1] - 8}
                    textAnchor="middle"
                    className="text-xs fill-gray-600"
                  >
                    {data.elevations[i]}m
                  </text>
                </g>
              )}
            </g>
          ))}

          {/* X-axis labels */}
          {data.labels.map((label, i) => {
            const x = 40 + (i / (data.labels.length - 1)) * 720;
            return (
              <text
                key={`label-${i}`}
                x={x}
                y="220"
                textAnchor="middle"
                className="text-xs fill-gray-600"
              >
                {label}
              </text>
            );
          })}

          {/* Y-axis labels */}
          {[0, 1, 2, 3, 4].map(i => {
            const elev = data.minElevation + (i * (data.maxElevation - data.minElevation)) / 4;
            const y = 200 - (i * 160) / 4;
            return (
              <text
                key={`elev-${i}`}
                x="30"
                y={y + 4}
                textAnchor="end"
                className="text-xs fill-gray-600"
              >
                {Math.round(elev)}m
              </text>
            );
          })}
        </svg>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-4 text-center">
        <div className="bg-gray-50 rounded-lg p-3">
          <Mountain className="w-5 h-5 mx-auto mb-1 text-gray-600" />
          <p className="text-xs text-gray-500">Min Elevation</p>
          <p className="font-semibold">{data.minElevation}m</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <Mountain className="w-5 h-5 mx-auto mb-1 text-gray-600" />
          <p className="text-xs text-gray-500">Max Elevation</p>
          <p className="font-semibold">{data.maxElevation}m</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <TrendingUp className="w-5 h-5 mx-auto mb-1 text-green-600" />
          <p className="text-xs text-gray-500">Avg Gradient Up</p>
          <p className="font-semibold">5.2%</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <TrendingDown className="w-5 h-5 mx-auto mb-1 text-red-600" />
          <p className="text-xs text-gray-500">Avg Gradient Down</p>
          <p className="font-semibold">4.8%</p>
        </div>
      </div>
    </div>
  );
}