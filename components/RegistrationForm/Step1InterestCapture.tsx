'use client';

import { useState } from 'react';
import { Step1Data, RouteOption, FormErrors } from './types';

interface Step1Props {
  data: Step1Data;
  errors: FormErrors;
  onUpdate: (data: Partial<Step1Data>) => void;
  onNext: () => void;
}

const routeOptions: RouteOption[] = [
  {
    id: 'full_trail',
    name: 'Tam Rota (14 Gün)',
    description: 'Eskişehir\'den Afyon\'a kadar tüm Frigya Yolu deneyimi',
    image: '/images/routes/full-trail.svg',
    duration: '14 gün',
    difficulty: 'Zor'
  },
  {
    id: 'eastern',
    name: 'Doğu Rotası (7 Gün)',
    description: 'Eskişehir-Gordion arası tarihi bölge',
    image: '/images/routes/eastern.svg',
    duration: '7 gün',
    difficulty: 'Orta'
  },
  {
    id: 'southern',
    name: 'Güney Rotası (5 Gün)',
    description: 'Afyon çevresi antik kentler',
    image: '/images/routes/southern.svg',
    duration: '5 gün',
    difficulty: 'Kolay'
  },
  {
    id: 'western',
    name: 'Batı Rotası (4 Gün)',
    description: 'Kütahya-Tavşanlı arası doğa yürüyüşü',
    image: '/images/routes/western.svg',
    duration: '4 gün',
    difficulty: 'Kolay'
  },
  {
    id: 'undecided',
    name: 'Henüz Kararsızım',
    description: 'Size uygun rotayı birlikte belirleyelim',
    image: '/images/routes/undecided.svg',
    duration: 'Değişken',
    difficulty: 'Değişken'
  }
];

const timeframeOptions = [
  { id: 'next_month', label: 'Önümüzdeki Ay', description: 'Hemen başlamak istiyorum' },
  { id: 'next_3_months', label: 'Önümüzdeki 3 Ay', description: 'Yakın zamanda planlıyorum' },
  { id: 'next_6_months', label: 'Önümüzdeki 6 Ay', description: 'Bu yıl içinde' },
  { id: 'next_year', label: 'Önümüzdeki Yıl', description: 'Gelecek yıl için planlıyorum' },
  { id: 'just_exploring', label: 'Sadece Keşfediyorum', description: 'Henüz net bir tarihim yok' }
];

const groupTypeOptions = [
  { id: 'solo', label: 'Tek Başına', icon: '👤', description: 'Bireysel yürüyüş deneyimi' },
  { id: 'couple', label: 'Çift', icon: '👫', description: '2 kişilik romantik yolculuk' },
  { id: 'friends', label: 'Arkadaş Grubu', icon: '👥', description: '3-8 kişilik arkadaş grubu' },
  { id: 'family', label: 'Aile', icon: '👨‍👩‍👧‍👦', description: 'Aile boyu macera' },
  { id: 'organized_group', label: 'Organize Grup', icon: '🚌', description: '10+ kişilik organizeli tur' }
];

export default function Step1InterestCapture({ data, errors, onUpdate, onNext }: Step1Props) {
  const [selectedRoute, setSelectedRoute] = useState<string>(data.interestedIn || '');
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>(data.timeframe || '');
  const [selectedGroupType, setSelectedGroupType] = useState<string>(data.groupType || '');

  const handleRouteSelect = (routeId: string) => {
    setSelectedRoute(routeId);
    onUpdate({ interestedIn: routeId as Step1Data['interestedIn'] });
  };

  const handleTimeframeSelect = (timeframeId: string) => {
    setSelectedTimeframe(timeframeId);
    onUpdate({ timeframe: timeframeId as Step1Data['timeframe'] });
  };

  const handleGroupTypeSelect = (groupTypeId: string) => {
    setSelectedGroupType(groupTypeId);
    onUpdate({ groupType: groupTypeId as Step1Data['groupType'] });
  };

  const canProceed = selectedRoute && selectedTimeframe && selectedGroupType;

  return (
    <div className="space-y-8">
      {/* Progress Header */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Frigya Yolu Yolculuğunuza Başlayalım
        </h2>
        <p className="text-gray-600">
          Size en uygun deneyimi oluşturmak için birkaç soru soracağız
        </p>
        <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full w-1/4"></div>
        </div>
        <p className="text-sm text-gray-500 mt-2">Adım 1 / 4</p>
      </div>

      {/* Route Selection */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <h3 className="text-xl font-semibold text-gray-800">
            Hangi rotayla ilgileniyorsunuz?
          </h3>
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            Neden soruyoruz?
          </span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {routeOptions.map((route) => (
            <div
              key={route.id}
              className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all hover:shadow-lg ${
                selectedRoute === route.id
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500 ring-opacity-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleRouteSelect(route.id)}
            >
              <div className="aspect-w-16 aspect-h-9 mb-3">
                <img
                  src={route.image}
                  alt={route.name}
                  className="w-full h-32 object-cover rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/placeholder-route.svg';
                  }}
                />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">{route.name}</h4>
              <p className="text-sm text-gray-600 mb-2">{route.description}</p>
              <div className="flex justify-between text-sm">
                <span className="text-blue-600 font-medium">{route.duration}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  route.difficulty === 'Kolay' ? 'bg-green-100 text-green-800' :
                  route.difficulty === 'Orta' ? 'bg-yellow-100 text-yellow-800' :
                  route.difficulty === 'Zor' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {route.difficulty}
                </span>
              </div>
              {selectedRoute === route.id && (
                <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                  ✓
                </div>
              )}
            </div>
          ))}
        </div>
        {errors.interestedIn && (
          <p className="text-red-600 text-sm">{errors.interestedIn}</p>
        )}
      </div>

      {/* Timeframe Selection */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">
          Ne zaman yürüyüş yapmayı planlıyorsunuz?
        </h3>

        <div className="space-y-2">
          {timeframeOptions.map((option) => (
            <label
              key={option.id}
              className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedTimeframe === option.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="timeframe"
                value={option.id}
                checked={selectedTimeframe === option.id}
                onChange={() => handleTimeframeSelect(option.id)}
                className="sr-only"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedTimeframe === option.id
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedTimeframe === option.id && (
                      <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{option.label}</p>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </div>
                </div>
              </div>
            </label>
          ))}
        </div>
        {errors.timeframe && (
          <p className="text-red-600 text-sm">{errors.timeframe}</p>
        )}
      </div>

      {/* Group Type Selection */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">
          Kimlerle yürüyüş yapacaksınız?
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {groupTypeOptions.map((option) => (
            <div
              key={option.id}
              className={`cursor-pointer rounded-lg border-2 p-4 text-center transition-all hover:shadow-md ${
                selectedGroupType === option.id
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500 ring-opacity-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleGroupTypeSelect(option.id)}
            >
              <div className="text-3xl mb-2">{option.icon}</div>
              <h4 className="font-medium text-gray-900 mb-1">{option.label}</h4>
              <p className="text-xs text-gray-600">{option.description}</p>
            </div>
          ))}
        </div>
        {errors.groupType && (
          <p className="text-red-600 text-sm">{errors.groupType}</p>
        )}
      </div>

      {/* Next Button */}
      <div className="flex justify-end pt-6">
        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`px-8 py-3 rounded-lg font-semibold transition-all ${
            canProceed
              ? 'bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Sonraki Adım →
        </button>
      </div>

      {/* Social Proof */}
      <div className="bg-gray-50 rounded-lg p-4 text-center">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-blue-600">2,847</span> yürüyüşçü bu adımdan başladı
        </p>
      </div>
    </div>
  );
}