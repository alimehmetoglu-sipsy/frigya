'use client';

import { useState, useEffect } from 'react';
import { Step2Data, FormErrors } from './types';

interface Step2Props {
  data: Step2Data;
  errors: FormErrors;
  onUpdate: (data: Partial<Step2Data>) => void;
  onNext: () => void;
  onBack: () => void;
}

const countries = [
  'Türkiye', 'Almanya', 'Fransa', 'İngiltere', 'İtalya', 'İspanya',
  'Hollanda', 'Belçika', 'Avusturya', 'İsviçre', 'ABD', 'Kanada', 'Avustralya', 'Diğer'
];

const relationships = [
  'Eş', 'Anne/Baba', 'Kardeş', 'Çocuk', 'Arkadaş', 'İş Arkadaşı', 'Diğer'
];

export default function Step2PersonalInfo({ data, errors, onUpdate, onNext, onBack }: Step2Props) {
  const [formData, setFormData] = useState<Step2Data>(data);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    // Validate required fields
    const required = formData.firstName && formData.lastName && formData.email && formData.phone;
    const emailValid = formData.email ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) : false;
    const phoneValid = formData.phone ? formData.phone.length >= 10 : false;
    const ageValid = !formData.age || (formData.age >= 18 && formData.age <= 75);

    setIsValid(Boolean(required && emailValid && phoneValid && ageValid));
  }, [formData]);

  const handleInputChange = (field: keyof Step2Data, value: any) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onUpdate(newData);
  };

  const handleEmergencyContactChange = (field: keyof Step2Data['emergencyContact'], value: string) => {
    const newEmergencyContact = {
      ...formData.emergencyContact,
      [field]: value
    };
    const newData = { ...formData, emergencyContact: newEmergencyContact };
    setFormData(newData);
    onUpdate(newData);
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-numeric characters
    const numbers = value.replace(/\D/g, '');

    // Format Turkish phone numbers
    if (numbers.startsWith('90')) {
      return numbers.replace(/(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 $2 $3 $4 $5');
    } else if (numbers.startsWith('5') && numbers.length === 10) {
      return numbers.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4');
    }

    return value;
  };

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Kişisel Bilgileriniz
        </h2>
        <p className="text-gray-600">
          Güvenlik ve iletişim için temel bilgilerinizi paylaşın
        </p>
        <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full w-2/4"></div>
        </div>
        <p className="text-sm text-gray-500 mt-2">Adım 2 / 4</p>
      </div>

      <form className="space-y-6">
        {/* Basic Information */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              Ad *
            </label>
            <input
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.firstName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Adınızı giriniz"
              required
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Soyad *
            </label>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.lastName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Soyadınızı giriniz"
              required
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            E-posta Adresi *
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="ornek@email.com"
            required
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Yürüyüş güncellemeleri ve önemli duyurular için kullanılacak
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Telefon Numarası *
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => {
                const formatted = formatPhoneNumber(e.target.value);
                handleInputChange('phone', formatted);
              }}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="+90 5XX XXX XX XX"
              required
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>

          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
              Ülke
            </label>
            <select
              id="country"
              value={formData.country || ''}
              onChange={(e) => handleInputChange('country', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              <option value="">Ülke seçiniz</option>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
              Yaş
            </label>
            <input
              type="number"
              id="age"
              value={formData.age || ''}
              onChange={(e) => handleInputChange('age', parseInt(e.target.value) || undefined)}
              min="18"
              max="75"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.age ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Yaşınızı giriniz"
            />
            {errors.age && (
              <p className="mt-1 text-sm text-red-600">{errors.age}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              18-75 yaş arası katılım kabul edilmektedir
            </p>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Acil Durum İletişim
            <span className="ml-2 text-sm font-normal text-gray-600">(Opsiyonel)</span>
          </h3>

          <div className="space-y-4">
            <div>
              <label htmlFor="emergencyName" className="block text-sm font-medium text-gray-700 mb-1">
                İsim Soyisim
              </label>
              <input
                type="text"
                id="emergencyName"
                value={formData.emergencyContact?.name || ''}
                onChange={(e) => handleEmergencyContactChange('name', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Acil durumda aranacak kişinin adı"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="emergencyPhone" className="block text-sm font-medium text-gray-700 mb-1">
                  Telefon
                </label>
                <input
                  type="tel"
                  id="emergencyPhone"
                  value={formData.emergencyContact?.phone || ''}
                  onChange={(e) => handleEmergencyContactChange('phone', formatPhoneNumber(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="+90 5XX XXX XX XX"
                />
              </div>

              <div>
                <label htmlFor="emergencyRelation" className="block text-sm font-medium text-gray-700 mb-1">
                  Yakınlık
                </label>
                <select
                  id="emergencyRelation"
                  value={formData.emergencyContact?.relationship || ''}
                  onChange={(e) => handleEmergencyContactChange('relationship', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                  <option value="">Yakınlık derecesi</option>
                  {relationships.map(relation => (
                    <option key={relation} value={relation}>{relation}</option>
                  ))}
                </select>
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
            ← Geri
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
            Sonraki Adım →
          </button>
        </div>
      </form>

      {/* Security Notice */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <span className="text-green-600">🔒</span>
          <p className="text-sm text-green-800">
            <span className="font-semibold">Güvenlik:</span> Tüm kişisel bilgileriniz SSL ile şifrelenir ve güvenli şekilde saklanır.
          </p>
        </div>
      </div>
    </div>
  );
}