'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, MapPin, Clock, Check, Star, ChevronRight } from 'lucide-react';

const tourPackages = [
  {
    id: 'full-trail',
    name: 'Full Trail Adventure',
    duration: '25 days',
    price: '€1,625',
    pricePerDay: '€65',
    includes: [
      'Professional guide',
      'All accommodation',
      'Luggage transfer',
      'Meals (breakfast & dinner)',
      'Airport transfer',
      'Certificate'
    ],
    availability: 'April - November',
    groupSize: '4-12 people',
    nextDeparture: 'April 15, 2025',
    featured: true,
    difficulty: 'Moderate to Challenging'
  },
  {
    id: 'eastern-route',
    name: 'Eastern Route Explorer',
    duration: '10 days',
    price: '€750',
    pricePerDay: '€75',
    includes: [
      'Professional guide',
      'Selected accommodation',
      'Daily breakfast',
      'Trail maps & GPS',
      'Certificate'
    ],
    availability: 'March - November',
    groupSize: '6-15 people',
    nextDeparture: 'March 20, 2025',
    featured: false,
    difficulty: 'Moderate'
  },
  {
    id: 'weekend-taster',
    name: 'Weekend Taster',
    duration: '3 days',
    price: '€295',
    pricePerDay: '€98',
    includes: [
      'Local guide',
      'Accommodation',
      'All meals',
      'Transportation',
      'Equipment rental'
    ],
    availability: 'Year-round',
    groupSize: '4-20 people',
    nextDeparture: 'Every weekend',
    featured: false,
    difficulty: 'Easy'
  },
  {
    id: 'custom-private',
    name: 'Custom Private Tour',
    duration: 'Flexible',
    price: 'From €120/day',
    pricePerDay: '€120+',
    includes: [
      'Private guide',
      'Customized itinerary',
      'Premium accommodation options',
      'All transfers',
      'Flexible meal plans',
      '24/7 support'
    ],
    availability: 'Year-round',
    groupSize: '1-8 people',
    nextDeparture: 'On request',
    featured: false,
    difficulty: 'Customizable'
  }
];

export default function BookingOptions() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [showCalculator, setShowCalculator] = useState(false);
  const [groupSize, setGroupSize] = useState(1);

  const calculateGroupDiscount = (size: number) => {
    if (size >= 10) return 0.15;
    if (size >= 6) return 0.10;
    if (size >= 4) return 0.05;
    return 0;
  };

  return (
    <section className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Tour Packages & Booking Options</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Choose from our carefully crafted tour packages or create your own adventure.
          All packages include experienced guides and authentic local experiences.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {tourPackages.map((pkg, index) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={`relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${
              pkg.featured ? 'ring-2 ring-primary-600' : ''
            }`}
          >
            {pkg.featured && (
              <div className="absolute top-0 right-0 bg-primary-600 text-white px-3 py-1 text-sm font-semibold">
                Most Popular
              </div>
            )}

            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>

              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{pkg.duration}</span>
                {pkg.difficulty && (
                  <>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm">{pkg.difficulty}</span>
                  </>
                )}
              </div>

              <div className="mb-4">
                <p className="text-3xl font-bold text-primary-600">{pkg.price}</p>
                <p className="text-sm text-gray-600">{pkg.pricePerDay} per day</p>
              </div>

              <div className="space-y-2 mb-6">
                {pkg.includes.slice(0, 4).map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
                {pkg.includes.length > 4 && (
                  <p className="text-sm text-gray-500 ml-6">+{pkg.includes.length - 4} more benefits</p>
                )}
              </div>

              <div className="space-y-2 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{pkg.availability}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{pkg.groupSize}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Next: {pkg.nextDeparture}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedPackage(pkg.id)}
                className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
                  pkg.featured
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                Select Package
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Group Discount Calculator */}
      <div className="bg-primary-50 rounded-xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold">Group Discount Calculator</h3>
          <button
            onClick={() => setShowCalculator(!showCalculator)}
            className="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-2"
          >
            {showCalculator ? 'Hide' : 'Show'} Calculator
            <ChevronRight className={`w-5 h-5 transition-transform ${showCalculator ? 'rotate-90' : ''}`} />
          </button>
        </div>

        {showCalculator && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Group Size</label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={groupSize}
                  onChange={(e) => setGroupSize(parseInt(e.target.value))}
                  onInput={(e) => setGroupSize(parseInt((e.target as HTMLInputElement).value))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>1 person</span>
                  <span className="font-bold text-lg text-primary-600">{groupSize} {groupSize === 1 ? 'person' : 'people'}</span>
                  <span>20 people</span>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-2">Your Discount</p>
                <p className="text-3xl font-bold text-green-600">
                  {(calculateGroupDiscount(groupSize) * 100).toFixed(0)}% OFF
                </p>
                {groupSize >= 4 && (
                  <p className="text-sm text-gray-600 mt-2">
                    Save €{(1625 * calculateGroupDiscount(groupSize) * groupSize).toFixed(0)} total
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 p-4 bg-white rounded-lg">
              <h4 className="font-semibold mb-2">Group Benefits:</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className={`text-sm ${groupSize >= 4 ? 'text-green-600 font-semibold' : 'text-gray-500'}`}>
                  ✓ 4+ people: 5% discount
                </div>
                <div className={`text-sm ${groupSize >= 6 ? 'text-green-600 font-semibold' : 'text-gray-500'}`}>
                  ✓ 6+ people: 10% discount
                </div>
                <div className={`text-sm ${groupSize >= 10 ? 'text-green-600 font-semibold' : 'text-gray-500'}`}>
                  ✓ 10+ people: 15% discount
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Selected Package Details */}
      {selectedPackage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-8 p-6 bg-green-50 border-2 border-green-500 rounded-xl"
        >
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-6 h-6 text-green-600" />
            <h4 className="text-xl font-bold text-green-800">
              Selected: {tourPackages.find(p => p.id === selectedPackage)?.name}
            </h4>
          </div>
          <p className="text-green-700">
            Great choice! Click the "Contact Us" button below to proceed with booking or scroll down to fill out the contact form with your preferences.
          </p>
        </motion.div>
      )}
    </section>
  );
}