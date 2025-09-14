'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { Step4Data, FormErrors } from './types';

interface Step4Props {
  data: Step4Data;
  errors: FormErrors;
  onUpdate: (data: Partial<Step4Data>) => void;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

export default function Step4MotivationIntl({ data, errors, onUpdate, onSubmit, onBack, isSubmitting }: Step4Props) {
  const locale = useLocale();
  const [formData, setFormData] = useState<Step4Data>(data);
  const [wordCount, setWordCount] = useState(0);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const words = formData.motivation ? formData.motivation.trim().split(/\s+/).filter(w => w.length > 0).length : 0;
    setWordCount(words);

    const hasGoals = formData.goals && formData.goals.length > 0;
    const hasMotivation = words >= 50;
    const hasSource = Boolean(formData.howDidYouHear);
    const hasTerms = formData.termsAccepted;
    const hasDataProcessing = formData.dataProcessing;

    setIsValid(hasGoals && hasMotivation && hasSource && hasTerms && hasDataProcessing);
  }, [formData]);

  const handleInputChange = (field: keyof Step4Data, value: any) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onUpdate(newData);
  };

  const handleGoalToggle = (goal: string) => {
    const current = formData.goals || [];
    const updated = current.includes(goal)
      ? current.filter(g => g !== goal)
      : [...current, goal];
    handleInputChange('goals', updated);
  };

  const goals = locale === 'tr' ? [
    'Fiziksel kondisyonumu geliştirmek',
    'Doğa ile bağ kurmak',
    'Tarihi ve kültürel keşif',
    'Stres atmak ve zihinsel dinginlik',
    'Yeni insanlarla tanışmak',
    'Kendimi test etmek',
    'Fotoğraf çekmek',
    'Macera ve heyecan yaşamak'
  ] : [
    'Improve physical fitness',
    'Connect with nature',
    'Historical and cultural exploration',
    'Stress relief and mental peace',
    'Meet new people',
    'Challenge myself',
    'Photography',
    'Adventure and excitement'
  ];

  const howDidYouHearOptions = locale === 'tr' ? [
    'Google/İnternet Araması',
    'Sosyal Medya',
    'Arkadaş Tavsiyesi',
    'Turizm Acentası',
    'Blog/Makale',
    'YouTube',
    'Diğer'
  ] : [
    'Google/Internet Search',
    'Social Media',
    'Friend Recommendation',
    'Tourism Agency',
    'Blog/Article',
    'YouTube',
    'Other'
  ];

  const t = (key: string) => {
    const translations: any = {
      tr: {
        title: 'Motivasyon ve Beklentiler',
        subtitle: 'Bu yolculuğa neden çıkmak istediğinizi paylaşın',
        step: 'Adım',
        motivationTitle: 'Neden Frigya Yolu\'nu yürümek istiyorsunuz?',
        motivationRequired: '*',
        motivationPlaceholder: 'Bu yolculuğa çıkma motivasyonunuzu, beklentilerinizi ve umutlarınızı paylaşın. Sizin için bu deneyim ne anlama geliyor? (Minimum 50 kelime)',
        wordCount: 'kelime',
        minWords: 'Minimum 50 kelime',
        goalsTitle: 'Hedefleriniz nelerdir?',
        goalsRequired: '*',
        goalsSubtitle: 'En az bir hedef seçin',
        howDidYouHearTitle: 'Frigya Yolu\'nu nereden duydunuz?',
        howDidYouHearRequired: '*',
        selectOption: 'Seçiniz',
        newsletterLabel: 'Frigya Yolu güncellemeleri ve özel teklifler almak istiyorum',
        termsLabel: 'Kullanım koşullarını okudum ve kabul ediyorum',
        dataProcessingLabel: 'Kişisel verilerimin işlenmesini onaylıyorum',
        back: '← Geri',
        submit: 'Kaydı Tamamla',
        submitting: 'Gönderiliyor...',
        thankYouTitle: '🎉 Harika! Son adım...',
        thankYouText: 'Frigya Yolu\'na olan ilginiz için teşekkür ederiz. Kaydınızı tamamlamak üzereyiz!'
      },
      en: {
        title: 'Motivation and Expectations',
        subtitle: 'Share why you want to embark on this journey',
        step: 'Step',
        motivationTitle: 'Why do you want to hike the Phrygian Way?',
        motivationRequired: '*',
        motivationPlaceholder: 'Share your motivation, expectations, and hopes for this journey. What does this experience mean to you? (Minimum 50 words)',
        wordCount: 'words',
        minWords: 'Minimum 50 words',
        goalsTitle: 'What are your goals?',
        goalsRequired: '*',
        goalsSubtitle: 'Select at least one goal',
        howDidYouHearTitle: 'How did you hear about the Phrygian Way?',
        howDidYouHearRequired: '*',
        selectOption: 'Select',
        newsletterLabel: 'I want to receive Phrygian Way updates and special offers',
        termsLabel: 'I have read and accept the terms and conditions',
        dataProcessingLabel: 'I consent to the processing of my personal data',
        back: '← Back',
        submit: 'Complete Registration',
        submitting: 'Submitting...',
        thankYouTitle: '🎉 Great! Final step...',
        thankYouText: 'Thank you for your interest in the Phrygian Way. We\'re about to complete your registration!'
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
          <div className="bg-blue-600 h-2 rounded-full w-full"></div>
        </div>
        <p className="text-sm text-gray-500 mt-2">{t('step')} 4 / 4</p>
      </div>

      {/* Motivation */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">
          {t('motivationTitle')} {t('motivationRequired')}
        </h3>
        <div>
          <textarea
            value={formData.motivation || ''}
            onChange={(e) => handleInputChange('motivation', e.target.value)}
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={t('motivationPlaceholder')}
          />
          <div className="flex justify-between mt-2">
            <span className={`text-sm ${wordCount < 50 ? 'text-red-600' : 'text-green-600'}`}>
              {wordCount} {t('wordCount')}
            </span>
            <span className="text-sm text-gray-500">{t('minWords')}</span>
          </div>
        </div>
        {errors.motivation && (
          <p className="text-red-600 text-sm">{errors.motivation}</p>
        )}
      </div>

      {/* Goals */}
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            {t('goalsTitle')} {t('goalsRequired')}
          </h3>
          <p className="text-sm text-gray-600">{t('goalsSubtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          {goals.map((goal) => (
            <label
              key={goal}
              className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all ${
                formData.goals?.includes(goal)
                  ? 'border-blue-500 bg-blue-50 text-blue-900'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="checkbox"
                checked={formData.goals?.includes(goal) || false}
                onChange={() => handleGoalToggle(goal)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-3"
              />
              <span className="text-sm font-medium">{goal}</span>
            </label>
          ))}
        </div>
        {errors.goals && (
          <p className="text-red-600 text-sm">{errors.goals}</p>
        )}
      </div>

      {/* How Did You Hear */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {t('howDidYouHearTitle')} {t('howDidYouHearRequired')}
        </h3>
        <select
          value={formData.howDidYouHear || ''}
          onChange={(e) => handleInputChange('howDidYouHear', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">{t('selectOption')}</option>
          {howDidYouHearOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {errors.howDidYouHear && (
          <p className="text-red-600 text-sm">{errors.howDidYouHear}</p>
        )}
      </div>

      {/* Consent Options */}
      <div className="space-y-4 border-t pt-6">
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.newsletter || false}
            onChange={(e) => handleInputChange('newsletter', e.target.checked)}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
          />
          <span className="text-sm text-gray-700">{t('newsletterLabel')}</span>
        </label>

        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.termsAccepted || false}
            onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
          />
          <span className="text-sm text-gray-700">
            {t('termsLabel')} *
          </span>
        </label>
        {errors.termsAccepted && (
          <p className="text-red-600 text-sm ml-8">{errors.termsAccepted}</p>
        )}

        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.dataProcessing || false}
            onChange={(e) => handleInputChange('dataProcessing', e.target.checked)}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
          />
          <span className="text-sm text-gray-700">
            {t('dataProcessingLabel')} *
          </span>
        </label>
        {errors.dataProcessing && (
          <p className="text-red-600 text-sm ml-8">{errors.dataProcessing}</p>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          {t('back')}
        </button>

        <button
          type="button"
          onClick={onSubmit}
          disabled={!isValid || isSubmitting}
          className={`px-8 py-3 rounded-lg font-semibold transition-all ${
            isValid && !isSubmitting
              ? 'bg-green-600 text-white hover:bg-green-700 transform hover:scale-105'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? t('submitting') : t('submit')}
        </button>
      </div>

      {/* Thank You Note */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-6 text-center">
        <h4 className="text-lg font-semibold text-gray-800 mb-2">
          {t('thankYouTitle')}
        </h4>
        <p className="text-sm text-gray-600">
          {t('thankYouText')}
        </p>
      </div>
    </div>
  );
}