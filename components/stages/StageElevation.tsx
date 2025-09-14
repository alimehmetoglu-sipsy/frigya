'use client';

import { useEffect, useState } from 'react';
import { StageData } from '@/data/stageData';

interface StageElevationProps {
  stage: StageData;
}

export default function StageElevation({ stage }: StageElevationProps) {
  const [Chart, setChart] = useState<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    Promise.all([
      import('react-chartjs-2'),
      import('chart.js')
    ]).then(([reactChartModule, chartModule]) => {
      const { Line } = reactChartModule;
      const {
        Chart: ChartJS,
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend,
        Filler
      } = chartModule;

      ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend,
        Filler
      );

      setChart(() => Line);
    });
  }, []);
  const data = {
    labels: stage.waypoints.map(w => `${w.km} km`),
    datasets: [
      {
        label: 'Elevation (m)',
        data: stage.waypoints.map(w => w.elevation),
        borderColor: 'rgb(220, 38, 38)',
        backgroundColor: 'rgba(220, 38, 38, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: 'rgb(220, 38, 38)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const waypoint = stage.waypoints[context.dataIndex];
            return [
              `${waypoint.name}`,
              `Elevation: ${waypoint.elevation}m`,
              `Distance: ${waypoint.km}km`
            ];
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Elevation (m)',
        },
      },
    },
  };

  const getGradientColor = (elevation: number, maxElevation: number) => {
    const ratio = elevation / maxElevation;
    if (ratio < 0.33) return 'text-green-600';
    if (ratio < 0.66) return 'text-yellow-600';
    return 'text-red-600';
  };

  const maxElevation = Math.max(...stage.waypoints.map(w => w.elevation));

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-4">
        <h3 className="font-display text-xl font-bold mb-2">Elevation Profile</h3>
        <div className="flex gap-6 text-sm text-gray-600">
          <div>
            <span className="font-semibold">Total Ascent:</span> +{stage.elevationGain}m
          </div>
          <div>
            <span className="font-semibold">Total Descent:</span> -{stage.elevationLoss}m
          </div>
          <div>
            <span className="font-semibold">Max Elevation:</span> {maxElevation}m
          </div>
        </div>
      </div>

      <div className="h-[300px]">
        {Chart ? (
          <Chart data={data} options={options} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Loading chart...
          </div>
        )}
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {stage.waypoints.map((waypoint, index) => (
          <div key={index} className="text-sm">
            <div className="flex items-center gap-2 mb-1">
              <div className={`w-2 h-2 rounded-full ${getGradientColor(waypoint.elevation, maxElevation).replace('text-', 'bg-')}`} />
              <span className="font-semibold">{waypoint.name}</span>
            </div>
            <div className="text-gray-600 ml-4">
              {waypoint.km}km • {waypoint.elevation}m
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-700">
          <strong>Difficulty Analysis:</strong> {stage.difficulty} stage with {stage.elevationGain}m total ascent.
          {stage.difficulty === 'Challenging' && ' Requires good fitness level and mountain experience.'}
          {stage.difficulty === 'Moderate' && ' Suitable for hikers with moderate fitness and some hiking experience.'}
          {stage.difficulty === 'Easy' && ' Suitable for beginners with basic fitness level.'}
        </p>
      </div>
    </div>
  );
}