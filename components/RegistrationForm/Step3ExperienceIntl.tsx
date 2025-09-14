'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { Step3Data, FormErrors } from './types';

interface Step3Props {
  data: Step3Data;
  errors: FormErrors;
  onUpdate: (data: Partial<Step3Data>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step3ExperienceIntl({ data, errors, onUpdate, onNext, onBack }: Step3Props) {
  const locale = useLocale();
  const [formData, setFormData] = useState<Step3Data>(data);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const required = formData.fitnessLevel && formData.hikingExperience;
    setIsValid(Boolean(required));
  }, [formData]);

  const handleInputChange = (field: keyof Step3Data, value: any) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onUpdate(newData);
  };

  const handleMedicalConditionToggle = (condition: string) => {
    const current = formData.medicalConditions || [];
    const noneOption = locale === 'tr' ? 'Hiçbiri' : 'None';
    let updated;

    if (condition === noneOption) {
      updated = current.includes(noneOption) ? [] : [noneOption];
    } else {
      updated = current.includes(condition)
        ? current.filter(c => c !== condition)
        : [...current.filter(c => c !== noneOption), condition];
    }

    handleInputChange('medicalConditions', updated);
  };

  const handleDietaryRequirementToggle = (requirement: string) => {
    const current = formData.dietaryRequirements || [];
    const noneOption = locale === 'tr' ? 'Özel Diyet Yok' : 'No Special Diet';
    let updated;

    if (requirement === noneOption) {
      updated = current.includes(noneOption) ? [] : [noneOption];
    } else {
      updated = current.includes(requirement)
        ? current.filter(r => r !== requirement)
        : [...current.filter(r => r !== noneOption), requirement];
    }

    handleInputChange('dietaryRequirements', updated);
  };

  const fitnessLevels = locale === 'tr' ? [
    {
      level: 1,
      label: 'Başlangıç',
      description: 'Düzenli egzersiz yapmam, günlük aktivitelerim sınırlı',
      icon: '🚶'
    },
    {
      level: 2,
      label: 'Temel',
      description: 'Haftada 1-2 kez egzersiz yaparım, kısa yürüyüşler',
      icon: '🚶‍♂️'
    },
    {
      level: 3,
      label: 'Orta',
      description: 'Düzenli spor yaparım, günlük 5-10km yürüyebilirim',
      icon: '🏃‍♂️'
    },
    {
      level: 4,
      label: 'İyi',
      description: 'Aktif yaşam tarzım var, uzun yürüyüşlere alışığım',
      icon: '🏃'
    },
    {
      level: 5,
      label: 'Mükemmel',
      description: 'Profesyonel/yarı-profesyonel seviyede aktivite',
      icon: '💪'
    }
  ] : [
    {
      level: 1,
      label: 'Beginner',
      description: 'No regular exercise, limited daily activities',
      icon: '🚶'
    },
    {
      level: 2,
      label: 'Basic',
      description: 'Exercise 1-2 times a week, short walks',
      icon: '🚶‍♂️'
    },
    {
      level: 3,
      label: 'Moderate',
      description: 'Regular exercise, can walk 5-10km daily',
      icon: '🏃‍♂️'
    },
    {
      level: 4,
      label: 'Good',
      description: 'Active lifestyle, accustomed to long hikes',
      icon: '🏃'
    },
    {
      level: 5,
      label: 'Excellent',
      description: 'Professional/semi-professional activity level',
      icon: '💪'
    }
  ];

  const hikingExperiences = locale === 'tr' ? [
    {
      id: 'none',
      label: 'Hiç Deneyimim Yok',
      description: 'İlk kez böyle bir aktivite yapacağım',
      image: '/images/experience/none.svg'
    },
    {
      id: 'day_hikes',
      label: 'Günübirlik Yürüyüşler',
      description: '1-8 saatlik yürüyüş deneyimim var',
      image: '/images/experience/day-hikes.svg'
    },
    {
      id: 'multi_day',
      label: 'Çok Günlük Yürüyüşler',
      description: 'Kamp kurup birkaç gün yürüyüş yaptım',
      image: '/images/experience/multi-day.svg'
    },
    {
      id: 'expert',
      label: 'Uzman',
      description: 'Düzenli olarak uzun mesafe yürüyüşleri yapıyorum',
      image: '/images/experience/expert.svg'
    }
  ] : [
    {
      id: 'none',
      label: 'No Experience',
      description: 'This will be my first such activity',
      image: '/images/experience/none.svg'
    },
    {
      id: 'day_hikes',
      label: 'Day Hikes',
      description: 'I have 1-8 hour hiking experience',
      image: '/images/experience/day-hikes.svg'
    },
    {
      id: 'multi_day',
      label: 'Multi-Day Hikes',
      description: 'I\'ve camped and hiked for several days',
      image: '/images/experience/multi-day.svg'
    },
    {
      id: 'expert',
      label: 'Expert',
      description: 'I regularly do long-distance hikes',
      image: '/images/experience/expert.svg'
    }
  ];

  const commonMedicalConditions = locale === 'tr' ? [
    'Hipertansiyon (Yüksek Tansiyon)',
    'Diyabet',
    'Astım',
    'Kalp Hastalığı',
    'Diz/Ayak Bileği Problemleri',
    'Sırt Problemleri',
    'Alerji (Besin/İlaç)',
    'Migren',
    'Hiçbiri'
  ] : [
    'Hypertension (High Blood Pressure)',
    'Diabetes',
    'Asthma',
    'Heart Disease',
    'Knee/Ankle Problems',
    'Back Problems',
    'Allergies (Food/Medicine)',
    'Migraine',
    'None'
  ];

  const commonDietaryRequirements = locale === 'tr' ? [
    'Vejetaryen',
    'Vegan',
    'Helal Gıda',
    'Glutensiz',
    'Laktozsuz',
    'Şeker Hastalığı Diyeti',
    'Besin Alerjileri',
    'Özel Diyet Yok'
  ] : [
    'Vegetarian',
    'Vegan',
    'Halal',
    'Gluten-Free',
    'Lactose-Free',
    'Diabetic Diet',
    'Food Allergies',
    'No Special Diet'
  ];

  const t = (key: string) => {
    const translations: any = {
      tr: {
        title: 'Deneyim Değerlendirmesi',
        subtitle: 'Size en uygun rotayı belirlemek için deneyiminizi değerlendirelim',
        step: 'Adım',
        fitnessTitle: 'Fiziksel kondisyonunuzu değerlendirin',
        fitnessRequired: '*',
        whyImportant: 'Neden önemli?',
        hikingTitle: 'Yürüyüş deneyiminiz nedir?',
        hikingRequired: '*',
        longestHike: 'En uzun yürüyüşünüz kaç kilometre? (Opsiyonel)',
        kilometers: 'kilometre',
        medicalTitle: 'Sağlık durumunuz (Opsiyonel)',
        medicalSubtitle: 'Güvenliğiniz için bilmemiz gereken sağlık durumları var mı?',
        dietaryTitle: 'Beslenme gereksinimleri (Opsiyonel)',
        specialNeeds: 'Özel ihtiyaçlar (Opsiyonel)',
        specialNeedsPlaceholder: 'Özel ekipman, ilaç kullanımı, fiziksel kısıtlamalar vb.',
        back: '← Geri',
        next: 'Sonraki Adım →',
        whyWeAskTitle: 'Bu bilgileri neden istiyoruz?',
        whyWeAskText: 'Size en uygun rotayı ve zorluk seviyesini belirlemek, gerekli önlemleri almak ve grubunuza uygun rehberlik sağlamak için bu bilgilere ihtiyacımız var.'
      },
      en: {
        title: 'Experience Assessment',
        subtitle: 'Let\'s evaluate your experience to determine the most suitable route for you',
        step: 'Step',
        fitnessTitle: 'Evaluate your physical condition',
        fitnessRequired: '*',
        whyImportant: 'Why important?',
        hikingTitle: 'What is your hiking experience?',
        hikingRequired: '*',
        longestHike: 'What\'s your longest hike in kilometers? (Optional)',
        kilometers: 'kilometers',
        medicalTitle: 'Medical Conditions (Optional)',
        medicalSubtitle: 'Are there any health conditions we should know about for your safety?',
        dietaryTitle: 'Dietary Requirements (Optional)',
        specialNeeds: 'Special Needs (Optional)',
        specialNeedsPlaceholder: 'Special equipment, medication use, physical limitations, etc.',
        back: '← Back',
        next: 'Next Step →',
        whyWeAskTitle: 'Why do we ask for this information?',
        whyWeAskText: 'We need this information to determine the most suitable route and difficulty level for you, take necessary precautions, and provide appropriate guidance for your group.'
      }
    };
    return translations[locale]?.[key] || translations['en'][key];
  };

  return (
    <div className="space-y-8">
      {/* Progress Header */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          {t('title')}
        </h2>
        <p className="text-gray-600">
          {t('subtitle')}
        </p>
        <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full w-3/4"></div>
        </div>
        <p className="text-sm text-gray-500 mt-2">{t('step')} 3 / 4</p>
      </div>

      {/* Fitness Level */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <h3 className="text-xl font-semibold text-gray-800">
            {t('fitnessTitle')} {t('fitnessRequired')}
          </h3>
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full cursor-pointer">
            {t('whyImportant')}
          </span>
        </div>

        <div className="space-y-3">
          {fitnessLevels.map((fitness) => (
            <label
              key={fitness.level}
              className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                formData.fitnessLevel === fitness.level
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="fitnessLevel"
                value={fitness.level}
                checked={formData.fitnessLevel === fitness.level}
                onChange={() => handleInputChange('fitnessLevel', fitness.level)}
                className="sr-only"
              />
              <div className="flex items-center space-x-4 flex-1">
                <div className="text-2xl">{fitness.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      formData.fitnessLevel === fitness.level
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {formData.fitnessLevel === fitness.level && (
                        <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{fitness.label}</p>
                      <p className="text-sm text-gray-600">{fitness.description}</p>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-blue-600 font-semibold">
                  {fitness.level}/5
                </div>
              </div>
            </label>
          ))}
        </div>
        {errors.fitnessLevel && (
          <p className="text-red-600 text-sm">{errors.fitnessLevel}</p>
        )}
      </div>

      {/* Hiking Experience */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">
          {t('hikingTitle')} {t('hikingRequired')}
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          {hikingExperiences.map((experience) => (
            <div
              key={experience.id}
              className={`cursor-pointer rounded-xl border-2 p-4 transition-all hover:shadow-lg ${
                formData.hikingExperience === experience.id
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500 ring-opacity-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleInputChange('hikingExperience', experience.id)}
            >
              <div className="aspect-w-16 aspect-h-9 mb-3">
                <img
                  src={experience.image}
                  alt={experience.label}
                  className="w-full h-24 object-cover rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/experience/placeholder-experience.svg';
                  }}
                />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">{experience.label}</h4>
              <p className="text-sm text-gray-600">{experience.description}</p>
              {formData.hikingExperience === experience.id && (
                <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                  ✓
                </div>
              )}
            </div>
          ))}
        </div>
        {errors.hikingExperience && (
          <p className="text-red-600 text-sm">{errors.hikingExperience}</p>
        )}
      </div>

      {/* Longest Hike */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {t('longestHike')}
        </h3>
        <div className="flex items-center space-x-4">
          <input
            type="number"
            value={formData.longestHike || ''}
            onChange={(e) => handleInputChange('longestHike', parseInt(e.target.value) || 0)}
            min="0"
            max="1000"
            className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="0"
          />
          <span className="text-gray-600">{t('kilometers')}</span>
        </div>
      </div>

      {/* Medical Conditions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {t('medicalTitle')}
        </h3>
        <p className="text-sm text-gray-600">
          {t('medicalSubtitle')}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
          {commonMedicalConditions.map((condition) => (
            <label
              key={condition}
              className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                formData.medicalConditions?.includes(condition)
                  ? 'border-blue-500 bg-blue-50 text-blue-900'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="checkbox"
                checked={formData.medicalConditions?.includes(condition) || false}
                onChange={() => handleMedicalConditionToggle(condition)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-3"
              />
              <span className="text-sm">{condition}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Dietary Requirements */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {t('dietaryTitle')}
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
          {commonDietaryRequirements.map((requirement) => (
            <label
              key={requirement}
              className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                formData.dietaryRequirements?.includes(requirement)
                  ? 'border-green-500 bg-green-50 text-green-900'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="checkbox"
                checked={formData.dietaryRequirements?.includes(requirement) || false}
                onChange={() => handleDietaryRequirementToggle(requirement)}
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 mr-3"
              />
              <span className="text-sm">{requirement}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Special Needs */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {t('specialNeeds')}
        </h3>
        <textarea
          value={formData.specialNeeds || ''}
          onChange={(e) => handleInputChange('specialNeeds', e.target.value)}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={t('specialNeedsPlaceholder')}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          {t('back')}
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={!isValid}
          className={`px-8 py-3 rounded-lg font-semibold transition-all ${
            isValid
              ? 'bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {t('next')}
        </button>
      </div>

      {/* Why We Ask */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <span className="text-yellow-600 mt-0.5">💡</span>
          <div className="text-sm text-yellow-800">
            <p className="font-semibold mb-1">{t('whyWeAskTitle')}</p>
            <p>{t('whyWeAskText')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}