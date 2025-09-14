'use client';

import { MapPin, Clock, Mountain, Home, Droplets, AlertTriangle, Download } from 'lucide-react';
import { Route } from './RouteSelector';

interface RouteDetailsProps {
  route: Route;
}

interface Stage {
  day: number;
  from: string;
  to: string;
  distance: number;
  elevation: number;
  description: string;
}

interface RouteDetailData {
  overview: string;
  highlights: string[];
  stages: Stage[];
  bestTime: string;
  accommodation: {
    villages: string[];
    camping: string[];
    hotels: string[];
  };
  waterSources: string[];
  warnings: string[];
  gpxDownload: string;
}

export default function RouteDetails({ route }: RouteDetailsProps) {
  const routeDetails: Record<string, RouteDetailData> = {
    eastern: {
      overview: "Beginning at the UNESCO World Heritage Site of Gordion, ancient capital of King Midas, this route follows the historic path through the heart of Phrygia. You'll traverse the Porsuk River valley, visit the sacred Temple of Cybele at Pessinus, and conclude at the magnificent Yazılıkaya monument.",
      highlights: [
        "Gordion Museum with artifacts from 3000 years ago",
        "Midas Tumulus - one of the largest ancient burial mounds",
        "Pessinus Temple ruins and Roman theater",
        "Sivrihisar's Ottoman architecture",
        "Yazılıkaya (Midas Monument) - largest Phrygian rock monument"
      ],
      stages: [
        {
          day: 1,
          from: "Gordion",
          to: "Beylikköprü",
          distance: 18,
          elevation: 150,
          description: "Starting from the ancient capital, follow the Sakarya River through agricultural lands and small villages."
        },
        {
          day: 2,
          from: "Beylikköprü",
          to: "Mülk",
          distance: 34,
          elevation: 280,
          description: "Longest stage with gradual ascent through steppes and wheat fields. Remote sections require carrying extra water."
        },
        {
          day: 3,
          from: "Mülk",
          to: "Sivrihisar",
          distance: 26,
          elevation: 200,
          description: "Pleasant walk through rural landscapes ending in the historic town of Sivrihisar with its Ottoman houses."
        },
        {
          day: 4,
          from: "Sivrihisar",
          to: "Pessinus",
          distance: 32,
          elevation: 350,
          description: "Journey to the ancient religious center of Pessinus, sacred to the goddess Cybele."
        },
        {
          day: 5,
          from: "Ballıhisar",
          to: "Yazılıkaya",
          distance: 35,
          elevation: 450,
          description: "Challenging day through valleys and over ridges to reach the iconic Midas Monument."
        }
      ],
      bestTime: "April-June, September-November",
      accommodation: {
        villages: ["Beylikköprü guesthouse", "Mülk village homes", "Ballıhisar pension"],
        camping: ["Designated areas near Gordion", "Pessinus camping ground"],
        hotels: ["Sivrihisar (multiple options)", "Han (limited options)"]
      },
      waterSources: [
        "Villages along the route",
        "Marked fountains every 8-10km",
        "Springs near Pessinus",
        "Carry 3-4L in summer"
      ],
      warnings: [
        "Limited shade on Day 2 - start early",
        "No services between Mülk and Sivrihisar (26km)",
        "Shepherd dogs in rural areas - carry stick",
        "Flash flood risk in valleys during spring"
      ],
      gpxDownload: "/gpx/eastern-route.gpx"
    },
    southern: {
      overview: "The most accessible route for beginners, featuring dramatic geological formations, Byzantine rock churches, and excellent village hospitality. The fairy chimneys of Seydiler rival those of Cappadocia, while the Ayazini complex represents one of Turkey's best-preserved rock church sites.",
      highlights: [
        "Seydiler fairy chimneys and rock formations",
        "Ayazini rock church complex (UNESCO tentative list)",
        "Göynüş Valley with Aslantaş lion monument",
        "Traditional pottery workshops in Döğer",
        "Natural thermal springs"
      ],
      stages: [
        {
          day: 1,
          from: "Seydiler",
          to: "Ayazini",
          distance: 22,
          elevation: 250,
          description: "Through fairy chimney landscapes to the impressive Ayazini rock church complex."
        },
        {
          day: 2,
          from: "Ayazini",
          to: "Döğer",
          distance: 24,
          elevation: 300,
          description: "Scenic valley walk with Byzantine remains and traditional villages."
        },
        {
          day: 3,
          from: "Döğer",
          to: "Göynüş",
          distance: 28,
          elevation: 320,
          description: "Through agricultural lands to the beautiful Göynüş Valley."
        },
        {
          day: 4,
          from: "Göynüş",
          to: "Aslantaş",
          distance: 20,
          elevation: 180,
          description: "Easy walk to see the famous Aslantaş lion monument."
        },
        {
          day: 5,
          from: "Aslantaş",
          to: "Yazılıkaya",
          distance: 26,
          elevation: 380,
          description: "Final approach to the Midas Monument through pine forests."
        }
      ],
      bestTime: "March-June, September-December",
      accommodation: {
        villages: ["Ayazini homes", "Döğer guesthouses", "Göynüş pension"],
        camping: ["Designated spots near Ayazini", "Göynüş Valley"],
        hotels: ["Seydiler (basic hotels)", "Afyonkarahisar (30km)"]
      },
      waterSources: [
        "Regular village fountains",
        "Springs in Göynüş Valley",
        "Thermal springs near Seydiler",
        "Well-marked water points"
      ],
      warnings: [
        "Rock church areas can be slippery when wet",
        "Some unmarked sections near Döğer",
        "Limited English spoken in villages",
        "Carry cash - no ATMs in small villages"
      ],
      gpxDownload: "/gpx/southern-route.gpx"
    },
    western: {
      overview: "The most scenic and remote route, offering pristine nature and authentic village experiences. The spectacular Zahran Valley is considered the most beautiful section of the entire Phrygian Way, while ancient rock-cut roads show clear wheel ruts from millennia of use.",
      highlights: [
        "Zahran Valley - most photogenic section",
        "Ancient Phrygian roads carved in rock",
        "Sökmen Plateau with panoramic views",
        "İncik cave systems and underground cities",
        "Untouched traditional village life"
      ],
      stages: [
        {
          day: 1,
          from: "Yenice Farm",
          to: "Zahran Valley",
          distance: 24,
          elevation: 380,
          description: "Gentle start through farmland before entering the spectacular Zahran Valley."
        },
        {
          day: 2,
          from: "Zahran Valley",
          to: "Sökmen",
          distance: 26,
          elevation: 420,
          description: "Through the heart of the valley with ancient road sections visible in rock."
        },
        {
          day: 3,
          from: "Sökmen",
          to: "Çukören",
          distance: 22,
          elevation: 280,
          description: "Across the plateau with stunning 360-degree views of the region."
        },
        {
          day: 4,
          from: "Çukören",
          to: "İncik",
          distance: 28,
          elevation: 350,
          description: "Descent through forests to the cave systems of İncik."
        },
        {
          day: 5,
          from: "İncik",
          to: "Kümbet",
          distance: 25,
          elevation: 320,
          description: "Through agricultural valleys with Byzantine and Seljuk remains."
        },
        {
          day: 6,
          from: "Kümbet",
          to: "Yazılıkaya",
          distance: 22,
          elevation: 400,
          description: "Final ascent to join the main route at the Midas Monument."
        }
      ],
      bestTime: "May-June, September-October",
      accommodation: {
        villages: ["Zahran village homes", "Sökmen guesthouse", "İncik pension"],
        camping: ["Zahran Valley spots", "Sökmen Plateau", "Forest areas"],
        hotels: ["Kütahya (40km from start)", "Limited village options"]
      },
      waterSources: [
        "Springs in Zahran Valley",
        "Sökmen village fountain",
        "Limited between villages",
        "Must carry 4L minimum"
      ],
      warnings: [
        "Most remote route - limited services",
        "Some sections poorly marked",
        "Weather changes quickly on plateau",
        "Wild boar active at dawn/dusk",
        "No mobile signal in valleys"
      ],
      gpxDownload: "/gpx/western-route.gpx"
    }
  };

  const details = routeDetails[route.id] || routeDetails.eastern;

  return (
    <div className="space-y-8">
      {/* Overview */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold mb-4">Route Overview</h3>
        <p className="text-gray-700 leading-relaxed">{details.overview}</p>
      </div>

      {/* Key Highlights */}
      <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4 text-primary-900">Key Highlights</h3>
        <ul className="space-y-2">
          {details.highlights.map((highlight, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0" />
              <span className="text-gray-700">{highlight}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Stage Breakdown */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold mb-4">Stage Breakdown</h3>
        <div className="space-y-4">
          {details.stages.map((stage, idx) => (
            <div key={idx} className="border-l-4 border-primary-400 pl-4 py-2">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">
                  Day {stage.day}: {stage.from} → {stage.to}
                </h4>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {stage.distance} km
                  </span>
                  <span className="flex items-center gap-1">
                    <Mountain className="w-4 h-4" />
                    +{stage.elevation} m
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600">{stage.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Practical Information */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Accommodation */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Home className="w-5 h-5 text-primary-600" />
            Accommodation
          </h3>
          <div className="space-y-3">
            <div>
              <p className="font-semibold text-sm text-gray-500 mb-1">Villages</p>
              <ul className="text-sm space-y-1">
                {details.accommodation.villages.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-500 mb-1">Camping</p>
              <ul className="text-sm space-y-1">
                {details.accommodation.camping.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-500 mb-1">Hotels</p>
              <ul className="text-sm space-y-1">
                {details.accommodation.hotels.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Water Sources */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Droplets className="w-5 h-5 text-primary-600" />
            Water Sources
          </h3>
          <ul className="space-y-2">
            {details.waterSources.map((source, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5" />
                <span className="text-sm">{source}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Warnings */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-amber-900">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          Important Warnings
        </h3>
        <ul className="space-y-2">
          {details.warnings.map((warning, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-1.5 flex-shrink-0" />
              <span className="text-sm text-gray-700">{warning}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Best Time & Download */}
      <div className="bg-gray-50 rounded-xl p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h4 className="font-semibold mb-2">Best Time to Hike</h4>
            <p className="text-gray-700">{details.bestTime}</p>
          </div>
          <button className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2">
            <Download className="w-5 h-5" />
            Download GPX File
          </button>
        </div>
      </div>
    </div>
  );
}