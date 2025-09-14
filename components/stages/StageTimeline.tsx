'use client';

import { Clock, MapPin, Camera, Coffee, Utensils, Flag } from 'lucide-react';
import { StageData } from '@/data/stageData';

interface StageTimelineProps {
  stage: StageData;
}

interface TimelineItem {
  time: string;
  activity: string;
  icon: 'start' | 'rest' | 'photo' | 'lunch' | 'landmark' | 'finish';
}

export default function StageTimeline({ stage }: StageTimelineProps) {
  const generateTimeline = (): TimelineItem[] => {
    const timeline: TimelineItem[] = [];
    const startHour = 7;
    const durationHours = parseInt(stage.duration.split('-')[0]);

    timeline.push({
      time: '07:00',
      activity: `Start from ${stage.from}`,
      icon: 'start'
    });

    if (durationHours >= 3) {
      timeline.push({
        time: '09:00',
        activity: 'Morning break - water and snacks',
        icon: 'rest'
      });
    }

    if (stage.highlights.length > 0) {
      timeline.push({
        time: '10:30',
        activity: `Visit ${stage.highlights[0].name}`,
        icon: 'landmark'
      });
    }

    if (durationHours >= 5) {
      timeline.push({
        time: '12:00',
        activity: 'Lunch break - rest and refuel',
        icon: 'lunch'
      });
    }

    if (stage.highlights.length > 1) {
      timeline.push({
        time: '14:00',
        activity: `Photo stop at ${stage.highlights[1].name}`,
        icon: 'photo'
      });
    }

    if (durationHours >= 6) {
      timeline.push({
        time: '15:30',
        activity: 'Afternoon break - final push ahead',
        icon: 'rest'
      });
    }

    const endHour = startHour + durationHours;
    timeline.push({
      time: `${endHour.toString().padStart(2, '0')}:00`,
      activity: `Arrive at ${stage.to}`,
      icon: 'finish'
    });

    return timeline;
  };

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'start':
        return <Flag className="w-5 h-5" />;
      case 'rest':
        return <Coffee className="w-5 h-5" />;
      case 'photo':
        return <Camera className="w-5 h-5" />;
      case 'lunch':
        return <Utensils className="w-5 h-5" />;
      case 'landmark':
        return <MapPin className="w-5 h-5" />;
      case 'finish':
        return <Flag className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const getIconColor = (iconType: string) => {
    switch (iconType) {
      case 'start':
        return 'bg-green-100 text-green-600';
      case 'finish':
        return 'bg-red-100 text-red-600';
      case 'photo':
        return 'bg-purple-100 text-purple-600';
      case 'lunch':
        return 'bg-orange-100 text-orange-600';
      case 'landmark':
        return 'bg-blue-100 text-blue-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const timeline = generateTimeline();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="font-display text-xl font-bold mb-6">Suggested Daily Timeline</h3>

      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>

        <div className="space-y-6">
          {timeline.map((item, index) => (
            <div key={index} className="relative flex items-start gap-4">
              <div className={`relative z-10 rounded-full p-2 ${getIconColor(item.icon)}`}>
                {getIcon(item.icon)}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-lg">{item.time}</span>
                  {index === 0 && (
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                      Start
                    </span>
                  )}
                  {index === timeline.length - 1 && (
                    <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">
                      Finish
                    </span>
                  )}
                </div>
                <p className="text-gray-700">{item.activity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 bg-amber-50 rounded-lg">
        <p className="text-sm text-amber-800">
          <strong>Note:</strong> This is a suggested timeline based on average hiking speeds.
          Adjust according to your pace, weather conditions, and personal preferences.
          Always start early to avoid afternoon heat in summer months.
        </p>
      </div>
    </div>
  );
}