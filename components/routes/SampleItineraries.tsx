'use client';

import { useState } from 'react';
import { Calendar, Users, Mountain, ChevronDown, ChevronUp, Download, Printer } from 'lucide-react';

interface Itinerary {
  name: string;
  days: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  stages: {
    day: number;
    title: string;
    distance: number;
    highlights: string[];
  }[];
}

export default function SampleItineraries() {
  const [expandedItinerary, setExpandedItinerary] = useState<number | null>(null);

  const itineraries: Itinerary[] = [
    {
      name: "Complete Trail Experience",
      days: 25,
      level: "Advanced",
      description: "The full Phrygian Way experience covering all three routes with rest days included.",
      stages: [
        {
          day: 1,
          title: "Gordion to Beylikköprü",
          distance: 18,
          highlights: ["Visit Gordion Museum", "Midas Tumulus", "Cross Sakarya River"]
        },
        {
          day: 2,
          title: "Beylikköprü to Mülk",
          distance: 34,
          highlights: ["Longest stage", "Remote steppes", "Village hospitality"]
        },
        {
          day: 3,
          title: "Rest Day in Sivrihisar",
          distance: 0,
          highlights: ["Explore Ottoman houses", "Local markets", "Ulu Mosque"]
        },
        {
          day: 4,
          title: "Sivrihisar to Pessinus",
          distance: 32,
          highlights: ["Temple of Cybele", "Roman theater", "Ancient inscriptions"]
        },
        {
          day: 5,
          title: "Pessinus to Yazılıkaya",
          distance: 35,
          highlights: ["Midas Monument", "Rock-cut throne", "Phrygian inscriptions"]
        }
      ]
    },
    {
      name: "Eastern Highlights",
      days: 10,
      level: "Intermediate",
      description: "Cover the most significant historical sites of the Eastern Route at a comfortable pace.",
      stages: [
        {
          day: 1,
          title: "Arrival & Gordion Exploration",
          distance: 5,
          highlights: ["Museum visit", "Archaeological site", "Orientation walk"]
        },
        {
          day: 2,
          title: "Gordion to Beylikköprü",
          distance: 18,
          highlights: ["Easy start", "River valley", "Rural landscapes"]
        },
        {
          day: 3,
          title: "Beylikköprü to Karacahöyük",
          distance: 17,
          highlights: ["Split long stage", "Village life", "Agricultural lands"]
        },
        {
          day: 4,
          title: "Karacahöyük to Mülk",
          distance: 17,
          highlights: ["Complete long stage", "Sunset views", "Traditional dinner"]
        },
        {
          day: 5,
          title: "Mülk to Sivrihisar",
          distance: 26,
          highlights: ["Historic town arrival", "Ottoman architecture", "Local cuisine"]
        }
      ]
    },
    {
      name: "Weekend Taster",
      days: 3,
      level: "Beginner",
      description: "Perfect introduction to the Phrygian Way for those with limited time.",
      stages: [
        {
          day: 1,
          title: "Seydiler Fairy Chimneys",
          distance: 12,
          highlights: ["Geological wonders", "Easy walking", "Photography opportunities"]
        },
        {
          day: 2,
          title: "Ayazini Rock Churches",
          distance: 15,
          highlights: ["Byzantine art", "Rock-cut churches", "Valley views"]
        },
        {
          day: 3,
          title: "Göynüş Valley Circuit",
          distance: 10,
          highlights: ["Aslantaş monument", "River walk", "Picnic spots"]
        }
      ]
    },
    {
      name: "Family Adventure",
      days: 7,
      level: "Beginner",
      description: "Family-friendly route with shorter distances and interesting stops for children.",
      stages: [
        {
          day: 1,
          title: "Gordion Discovery",
          distance: 8,
          highlights: ["Interactive museum", "King Midas stories", "Treasure hunt"]
        },
        {
          day: 2,
          title: "River Valley Walk",
          distance: 10,
          highlights: ["Wildlife spotting", "Picnic by river", "Village playground"]
        },
        {
          day: 3,
          title: "Farm Stay Experience",
          distance: 12,
          highlights: ["Animal feeding", "Traditional crafts", "Stargazing"]
        },
        {
          day: 4,
          title: "Rest & Play Day",
          distance: 0,
          highlights: ["Swimming", "Local games", "Cooking class"]
        },
        {
          day: 5,
          title: "Fairy Chimney Adventure",
          distance: 8,
          highlights: ["Rock formations", "Cave exploration", "Geology lessons"]
        }
      ]
    },
    {
      name: "Photography Expedition",
      days: 14,
      level: "Intermediate",
      description: "Designed for photographers with extra time at scenic locations for golden hour shots.",
      stages: [
        {
          day: 1,
          title: "Gordion Sunrise",
          distance: 5,
          highlights: ["Dawn at tumulus", "Museum artifacts", "Ancient textures"]
        },
        {
          day: 2,
          title: "Rural Anatolia",
          distance: 20,
          highlights: ["Village portraits", "Agricultural scenes", "Traditional life"]
        },
        {
          day: 3,
          title: "Zahran Valley Magic",
          distance: 15,
          highlights: ["Valley vistas", "Rock formations", "Wildflowers"]
        },
        {
          day: 4,
          title: "Byzantine Heritage",
          distance: 18,
          highlights: ["Rock churches", "Frescoes", "Architectural details"]
        },
        {
          day: 5,
          title: "Yazılıkaya Monument",
          distance: 12,
          highlights: ["Sunset at Midas", "Night photography", "Star trails"]
        }
      ]
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'Advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    // In production, this would generate and download a PDF
    alert('PDF download would start here');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold mb-2">Sample Itineraries</h3>
          <p className="text-gray-600">Choose from our curated itineraries or create your own adventure</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            Print
          </button>
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {itineraries.map((itinerary, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md"
          >
            <div
              className="p-6 cursor-pointer"
              onClick={() => setExpandedItinerary(expandedItinerary === index ? null : index)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-bold">{itinerary.name}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      getLevelColor(itinerary.level)
                    }`}>
                      {itinerary.level}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{itinerary.description}</p>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{itinerary.days} days</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mountain className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">
                        {itinerary.stages.reduce((sum, stage) => sum + stage.distance, 0)} km total
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">
                        {itinerary.level === 'Beginner' ? 'All ages' : 
                         itinerary.level === 'Intermediate' ? 'Active adults' : 
                         'Experienced hikers'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="ml-4">
                  {expandedItinerary === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>
            </div>

            {/* Expanded Content */}
            {expandedItinerary === index && (
              <div className="border-t border-gray-200 bg-gray-50 p-6">
                <h5 className="font-semibold mb-4">Daily Breakdown</h5>
                <div className="space-y-3">
                  {itinerary.stages.map((stage, stageIndex) => (
                    <div
                      key={stageIndex}
                      className="bg-white rounded-lg p-4 border border-gray-200"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs font-semibold">
                              Day {stage.day}
                            </span>
                            <h6 className="font-semibold">{stage.title}</h6>
                          </div>
                          {stage.distance > 0 && (
                            <p className="text-sm text-gray-600">
                              Distance: {stage.distance} km
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-xs font-semibold text-gray-500 mb-1">HIGHLIGHTS</p>
                        <ul className="text-sm text-gray-700">
                          {stage.highlights.map((highlight, hIndex) => (
                            <li key={hIndex} className="flex items-start gap-2">
                              <span className="w-1 h-1 bg-gray-400 rounded-full mt-1.5" />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-900">
                    <strong>Booking Note:</strong> This itinerary can be customized to your preferences. 
                    Contact local guides for arranged accommodation and luggage transfer services.
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Print-specific styles */}
      <style jsx>{`
        @media print {
          .no-print {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}