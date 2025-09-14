'use client';

import { useState } from 'react';
import { MapPin, Navigation, Train, Car, Phone, Mail, Clock, ExternalLink } from 'lucide-react';

export default function OfficeMap() {
  const [mapView, setMapView] = useState<'map' | 'street'>('map');

  const officeInfo = {
    address: 'Phrygian Way Coordination Center',
    street: 'Zafer Mahallesi, Atatürk Caddesi No: 42',
    city: 'Afyonkarahisar',
    postalCode: '03200',
    country: 'Turkey',
    coordinates: {
      lat: 38.7570,
      lng: 30.5406
    },
    phone: '+90 272 XXX XXXX',
    email: 'info@phrygianway.com',
    hours: {
      weekdays: '09:00 - 18:00',
      saturday: '10:00 - 16:00',
      sunday: 'Closed'
    }
  };

  const transportOptions = [
    {
      icon: Car,
      method: 'By Car',
      description: 'Free parking available. 2 hours from Eskişehir, 3 hours from Ankara',
      time: '2-3 hours from major cities'
    },
    {
      icon: Train,
      method: 'By Train',
      description: 'High-speed train to Afyonkarahisar station, then 10 min taxi ride',
      time: '10 min from station'
    },
    {
      icon: Navigation,
      method: 'By Bus',
      description: 'Regular buses from all major cities. Terminal is 15 min away',
      time: '15 min from terminal'
    }
  ];

  const nearbyTrailPoints = [
    { name: 'Gordion Start Point', distance: '78 km' },
    { name: 'Yazılıkaya Valley', distance: '12 km' },
    { name: 'Seydiler Village', distance: '45 km' },
    { name: 'Ayazini Ruins', distance: '25 km' }
  ];

  return (
    <div className="space-y-6">
      {/* Office Information Card */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <MapPin className="w-6 h-6 text-primary-600" />
          Visit Our Office
        </h3>

        <div className="space-y-3 mb-6">
          <div>
            <p className="font-semibold text-gray-800">{officeInfo.address}</p>
            <p className="text-gray-600">{officeInfo.street}</p>
            <p className="text-gray-600">{officeInfo.city}, {officeInfo.postalCode}</p>
            <p className="text-gray-600">{officeInfo.country}</p>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <Phone className="w-4 h-4" />
            <a href={`tel:${officeInfo.phone}`} className="hover:text-primary-600">
              {officeInfo.phone}
            </a>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <Mail className="w-4 h-4" />
            <a href={`mailto:${officeInfo.email}`} className="hover:text-primary-600">
              {officeInfo.email}
            </a>
          </div>
        </div>

        {/* Business Hours */}
        <div className="border-t pt-4 mb-6">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary-600" />
            Business Hours
          </h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Monday - Friday:</span>
              <span className="font-medium">{officeInfo.hours.weekdays}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Saturday:</span>
              <span className="font-medium">{officeInfo.hours.saturday}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Sunday:</span>
              <span className="font-medium text-red-600">{officeInfo.hours.sunday}</span>
            </div>
          </div>
        </div>

        {/* Map View Toggle */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setMapView('map')}
            className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
              mapView === 'map'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Map View
          </button>
          <button
            onClick={() => setMapView('street')}
            className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
              mapView === 'street'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Street View
          </button>
        </div>

        {/* Map Embed */}
        <div className="rounded-lg overflow-hidden h-64 bg-gray-100">
          {mapView === 'map' ? (
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3131.8!2d${officeInfo.coordinates.lng}!3d${officeInfo.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDQ1JzI1LjIiTiAzMMKwMzInMjYuNiJF!5e0!3m2!1sen!2str!4v1234567890`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <iframe
              src={`https://www.google.com/maps/embed?pb=!4v1234567890!6m8!1m7!1s0!2m2!1d${officeInfo.coordinates.lat}!2d${officeInfo.coordinates.lng}!3f0!4f0!5f0.7820865974627469`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          )}
        </div>

        {/* Get Directions Button */}
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${officeInfo.coordinates.lat},${officeInfo.coordinates.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 w-full bg-primary-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
        >
          <Navigation className="w-4 h-4" />
          Get Directions
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Transportation Options */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">How to Reach Us</h3>
        <div className="space-y-4">
          {transportOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <div key={index} className="flex gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-primary-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{option.method}</h4>
                  <p className="text-sm text-gray-600">{option.description}</p>
                  <p className="text-xs text-primary-600 mt-1">{option.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Nearby Trail Points */}
      <div className="bg-primary-50 rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4">Nearby Trail Starting Points</h3>
        <div className="space-y-2">
          {nearbyTrailPoints.map((point, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-primary-100 last:border-0">
              <span className="text-gray-700">{point.name}</span>
              <span className="text-sm text-primary-600 font-semibold">{point.distance}</span>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-600 mt-4">
          We can arrange transportation to any trail starting point. Ask us about shuttle services!
        </p>
      </div>
    </div>
  );
}