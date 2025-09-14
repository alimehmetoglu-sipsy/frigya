'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { Step2Data, FormErrors } from './types';

interface Step2Props {
  data: Step2Data;
  errors: FormErrors;
  onUpdate: (data: Partial<Step2Data>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step2PersonalInfoIntl({ data, errors, onUpdate, onNext, onBack }: Step2Props) {
  const locale = useLocale();
  const [formData, setFormData] = useState<Step2Data>(data);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const required = formData.firstName && formData.lastName && formData.email && formData.phone;
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email || '');
    const phoneValid = (formData.phone || '').length >= 10;

    setIsValid(Boolean(required && emailValid && phoneValid));
  }, [formData]);

  const handleInputChange = (field: keyof Step2Data, value: any) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onUpdate(newData);
  };

  const countries = locale === 'tr' ? [
    'Türkiye', 'Almanya', 'Fransa', 'İngiltere', 'İtalya', 'İspanya',
    'Hollanda', 'Belçika', 'Avusturya', 'İsviçre', 'ABD', 'Kanada',
    'Avustralya', 'Diğer'
  ] : [
    'Turkey', 'Germany', 'France', 'United Kingdom', 'Italy', 'Spain',
    'Netherlands', 'Belgium', 'Austria', 'Switzerland', 'USA', 'Canada',
    'Australia', 'Other'
  ];

  const relationships = locale === 'tr' ? [
    'Eş', 'Anne/Baba', 'Kardeş', 'Çocuk', 'Arkadaş', 'İş Arkadaşı', 'Diğer'
  ] : [
    'Spouse', 'Parent', 'Sibling', 'Child', 'Friend', 'Colleague', 'Other'
  ];

  const t = (key: string) => {
    const translations: any = {
      tr: {
        title: 'Kişisel Bilgileriniz',
        subtitle: 'Güvenlik ve iletişim için temel bilgilerinizi paylaşın',
        step: 'Adım',
        firstName: 'Ad',
        firstNamePlaceholder: 'Adınızı giriniz',
        lastName: 'Soyad',
        lastNamePlaceholder: 'Soyadınızı giriniz',
        email: 'E-posta Adresi',
        emailPlaceholder: 'ornek@email.com',
        emailHint: 'Yürüyüş güncellemeleri ve önemli duyurular için kullanılacak',
        phone: 'Telefon Numarası',
        phonePlaceholder: '+90 5XX XXX XX XX',
        country: 'Ülke',
        countryPlaceholder: 'Ülke seçiniz',
        age: 'Yaş',
        ageHint: '18-75 yaş arası katılım kabul edilmektedir',
        emergencyTitle: 'Acil Durum İletişim',
        emergencyOptional: '(Opsiyonel)',
        emergencyName: 'İsim Soyisim',
        emergencyNamePlaceholder: 'Acil durumda aranacak kişinin adı',
        emergencyPhone: 'Telefon',
        emergencyPhonePlaceholder: '+90 5XX XXX XX XX',
        relationship: 'Yakınlık',
        relationshipPlaceholder: 'Yakınlık derecesi',
        back: '← Geri',
        next: 'Sonraki Adım →',
        security: '🔒 Güvenlik: Tüm kişisel bilgileriniz SSL ile şifrelenir ve güvenli şekilde saklanır.'
      },
      en: {
        title: 'Your Personal Information',
        subtitle: 'Share your basic information for security and communication',
        step: 'Step',
        firstName: 'First Name',
        firstNamePlaceholder: 'Enter your first name',
        lastName: 'Last Name',
        lastNamePlaceholder: 'Enter your last name',
        email: 'Email Address',
        emailPlaceholder: 'example@email.com',
        emailHint: 'Will be used for trek updates and important announcements',
        phone: 'Phone Number',
        phonePlaceholder: '+1 XXX XXX XXXX',
        country: 'Country',
        countryPlaceholder: 'Select country',
        age: 'Age',
        ageHint: 'Participation accepted between ages 18-75',
        emergencyTitle: 'Emergency Contact',
        emergencyOptional: '(Optional)',
        emergencyName: 'Full Name',
        emergencyNamePlaceholder: 'Name of person to contact in emergency',
        emergencyPhone: 'Phone',
        emergencyPhonePlaceholder: '+1 XXX XXX XXXX',
        relationship: 'Relationship',
        relationshipPlaceholder: 'Relationship type',
        back: '← Back',
        next: 'Next Step →',
        security: '🔒 Security: All your personal information is encrypted with SSL and stored securely.'
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
          <div className="bg-blue-600 h-2 rounded-full w-2/4"></div>
        </div>
        <p className="text-sm text-gray-500 mt-2">{t('step')} 2 / 4</p>
      </div>

      {/* Personal Information */}
      <div className="space-y-6">
        {/* Name Fields */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('firstName')} *
            </label>
            <input
              type="text"
              value={formData.firstName || ''}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              placeholder={t('firstNamePlaceholder')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('lastName')} *
            </label>
            <input
              type="text"
              value={formData.lastName || ''}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              placeholder={t('lastNamePlaceholder')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('email')} *
          </label>
          <input
            type="email"
            value={formData.email || ''}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder={t('emailPlaceholder')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="mt-1 text-sm text-gray-500">{t('emailHint')}</p>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Phone and Country */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('phone')} *
            </label>
            <input
              type="tel"
              value={formData.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder={t('phonePlaceholder')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('country')}
            </label>
            <select
              value={formData.country || ''}
              onChange={(e) => handleInputChange('country', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">{t('countryPlaceholder')}</option>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('age')}
          </label>
          <input
            type="number"
            value={formData.age || ''}
            onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
            min="18"
            max="75"
            className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="mt-1 text-sm text-gray-500">{t('ageHint')}</p>
          {errors.age && (
            <p className="mt-1 text-sm text-red-600">{errors.age}</p>
          )}
        </div>

        {/* Emergency Contact */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {t('emergencyTitle')}
            <span className="text-sm font-normal text-gray-500 ml-2">{t('emergencyOptional')}</span>
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('emergencyName')}
              </label>
              <input
                type="text"
                value={formData.emergencyContact?.name || ''}
                onChange={(e) => handleInputChange('emergencyContact', {
                  ...formData.emergencyContact,
                  name: e.target.value
                })}
                placeholder={t('emergencyNamePlaceholder')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('emergencyPhone')}
                </label>
                <input
                  type="tel"
                  value={formData.emergencyContact?.phone || ''}
                  onChange={(e) => handleInputChange('emergencyContact', {
                    ...formData.emergencyContact,
                    phone: e.target.value
                  })}
                  placeholder={t('emergencyPhonePlaceholder')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('relationship')}
                </label>
                <select
                  value={formData.emergencyContact?.relationship || ''}
                  onChange={(e) => handleInputChange('emergencyContact', {
                    ...formData.emergencyContact,
                    relationship: e.target.value
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">{t('relationshipPlaceholder')}</option>
                  {relationships.map(rel => (
                    <option key={rel} value={rel}>{rel}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
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

      {/* Security Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
        <p className="text-sm text-blue-800">
          {t('security')}
        </p>
      </div>
    </div>
  );
}