'use client';

import { Home, Droplets, AlertTriangle, Phone, Navigation, Cloud, ShoppingBag, MapPin } from 'lucide-react';
import { StageData } from '@/data/stageData';

interface StagePracticalInfoProps {
  stage: StageData;
}

export default function StagePracticalInfo({ stage }: StagePracticalInfoProps) {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-blue-50 rounded-lg p-6">
          <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Home className="w-5 h-5 text-blue-600" />
            Accommodation
          </h4>
          {stage.accommodation.map((acc, index) => (
            <div key={index} className="mb-4 pb-4 border-b border-blue-100 last:border-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h5 className="font-semibold">{acc.name}</h5>
                  <span className="text-sm text-gray-600 capitalize">{acc.type}</span>
                </div>
                <span className="text-sm font-medium text-blue-600">{acc.price}</span>
              </div>
              <p className="text-sm text-gray-700 mb-2">{acc.contact}</p>
              <div className="flex flex-wrap gap-2">
                {acc.amenities.map((amenity, i) => (
                  <span key={i} className="text-xs bg-white px-2 py-1 rounded">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-cyan-50 rounded-lg p-6">
          <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Droplets className="w-5 h-5 text-cyan-600" />
            Water Sources
          </h4>
          <ul className="space-y-2">
            {stage.description.waterSources.map((source, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-cyan-600 mt-1">•</span>
                <span className="text-sm text-gray-700">{source}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 p-3 bg-white rounded">
            <p className="text-xs text-gray-600">
              <strong>Tip:</strong> Always carry water purification tablets as backup.
              Minimum 3L recommended in summer.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
        <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          Warnings & Considerations
        </h4>
        <ul className="space-y-2">
          {stage.description.warnings.map((warning, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-amber-600 mt-1">!</span>
              <span className="text-sm text-gray-700">{warning}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-green-50 rounded-lg p-4">
          <h5 className="font-semibold mb-3 flex items-center gap-2">
            <Phone className="w-4 h-4 text-green-600" />
            Emergency Contacts
          </h5>
          <ul className="space-y-1 text-sm">
            <li>Emergency: <strong>112</strong></li>
            <li>Forest Fire: <strong>177</strong></li>
            <li>Gendarmerie: <strong>156</strong></li>
            <li>Health: <strong>184</strong></li>
          </ul>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <h5 className="font-semibold mb-3 flex items-center gap-2">
            <Navigation className="w-4 h-4 text-purple-600" />
            Navigation
          </h5>
          <p className="text-sm text-gray-700 mb-2">
            {stage.description.navigation}
          </p>
          <p className="text-xs text-gray-600">
            GPS recommended for backup
          </p>
        </div>

        <div className="bg-orange-50 rounded-lg p-4">
          <h5 className="font-semibold mb-3 flex items-center gap-2">
            <Cloud className="w-4 h-4 text-orange-600" />
            Weather Considerations
          </h5>
          <ul className="space-y-1 text-sm text-gray-700">
            <li>• Check forecast daily</li>
            <li>• Avoid in thunderstorms</li>
            <li>• Extra water in summer</li>
            <li>• Layer clothing</li>
          </ul>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-gray-600" />
          Key Waypoints & Distances
        </h4>
        <div className="space-y-3">
          {stage.waypoints.map((waypoint, index) => (
            <div key={index} className="flex items-center justify-between pb-3 border-b border-gray-200 last:border-0">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                  ${waypoint.type === 'village' ? 'bg-green-100 text-green-700' :
                    waypoint.type === 'monument' ? 'bg-blue-100 text-blue-700' :
                    waypoint.type === 'viewpoint' ? 'bg-purple-100 text-purple-700' :
                    'bg-cyan-100 text-cyan-700'}`}>
                  {waypoint.km}
                </div>
                <div>
                  <p className="font-medium">{waypoint.name}</p>
                  <p className="text-sm text-gray-600 capitalize">{waypoint.type}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{waypoint.elevation}m</p>
                <p className="text-xs text-gray-500">elevation</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-indigo-50 rounded-lg p-6">
        <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-indigo-600" />
          Supplies & Services
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h5 className="font-semibold mb-2">Available at Start ({stage.from})</h5>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Basic shops/markets</li>
              <li>• Restaurants/cafes</li>
              <li>• ATM (if in town)</li>
              <li>• Accommodation</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-2">Available at End ({stage.to})</h5>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Village shop (limited)</li>
              <li>• Local guesthouse</li>
              <li>• Basic meals</li>
              <li>• Water refill</li>
            </ul>
          </div>
        </div>
        <p className="text-xs text-gray-600 mt-4">
          <strong>Note:</strong> Stock up on supplies in larger towns. Village shops have limited selection.
        </p>
      </div>
    </div>
  );
}