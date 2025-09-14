'use client';

import { useState, useEffect } from 'react';
import { Step4Data, FormErrors, GoalOption } from './types';

interface Step4Props {
  data: Step4Data;
  errors: FormErrors;
  onUpdate: (data: Partial<Step4Data>) => void;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

const goalOptions: GoalOption[] = [
  { id: 'adventure', label: 'Macera Yaşamak', icon: '🎒' },
  { id: 'history', label: 'Tarihi Keşfetmek', icon: '🏛️' },
  { id: 'nature', label: 'Doğayla Bağ Kurmak', icon: '🌿' },
  { id: 'fitness', label: 'Fiziksel Kondisyon', icon: '💪' },
  { id: 'culture', label: 'Kültür Tanımak', icon: '🎭' },
  { id: 'photography', label: 'Fotoğrafçılık', icon: '📸' },
  { id: 'social', label: 'Sosyalleşmek', icon: '👥' },
  { id: 'challenge', label: 'Kendimi Sınamak', icon: '🏆' },
  { id: 'peace', label: 'Huzur Bulmak', icon: '🧘' },
  { id: 'escape', label: 'Şehirden Kaçmak', icon: '🏃‍♂️' }
];

const hearAboutOptions = [
  'Google Arama',
  'Sosyal Medya (Instagram, Facebook)',
  'Arkadaş Tavsiyesi',
  'Blog/Website',
  'Youtube',
  'Dergi/Gazete',
  'Seyahat Acentesi',
  'Outdoor/Doğa Toplulukları',
  'Diğer'
];

export default function Step4Motivation({ data, errors, onUpdate, onSubmit, onBack, isSubmitting }: Step4Props) {
  const [formData, setFormData] = useState<Step4Data>(data);
  const [wordCount, setWordCount] = useState(0);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    // Count words in motivation
    const words = formData.motivation ? formData.motivation.trim().split(/\s+/).filter(word => word.length > 0).length : 0;
    setWordCount(words);

    // Validate required fields
    const motivationValid = words >= 50;
    const goalsValid = formData.goals && formData.goals.length > 0;
    const hearAboutValid = formData.howDidYouHear && formData.howDidYouHear.trim().length > 0;
    const termsValid = formData.termsAccepted;
    const dataProcessingValid = formData.dataProcessing;

    setIsValid(Boolean(motivationValid && goalsValid && hearAboutValid && termsValid && dataProcessingValid));
  }, [formData]);

  const handleInputChange = (field: keyof Step4Data, value: any) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onUpdate(newData);
  };

  const handleGoalToggle = (goalId: string) => {
    const currentGoals = formData.goals || [];
    const updatedGoals = currentGoals.includes(goalId)
      ? currentGoals.filter(g => g !== goalId)
      : [...currentGoals, goalId];

    handleInputChange('goals', updatedGoals);
  };

  const getMotivationBorderColor = () => {
    if (errors.motivation) return 'border-red-500';
    if (wordCount >= 50) return 'border-green-500';
    if (wordCount > 0) return 'border-yellow-500';
    return 'border-gray-300';
  };

  const getMotivationHelper = () => {
    if (errors.motivation) return errors.motivation;
    if (wordCount < 50) return `${wordCount}/50 kelime minimum - ${50 - wordCount} kelime daha`;
    return `${wordCount} kelime - Mükemmel! 👏`;
  };

  const getMotivationHelperColor = () => {
    if (errors.motivation) return 'text-red-600';
    if (wordCount >= 50) return 'text-green-600';
    if (wordCount > 0) return 'text-yellow-600';
    return 'text-gray-500';
  };

  return (
    <div className="space-y-8">
      {/* Progress Header */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Son Adım: Motivasyonunuz
        </h2>
        <p className="text-gray-600">
          Neden Frigya Yolu'na katılmak istiyorsunuz? Sizi daha iyi tanıyalım.
        </p>
        <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full w-full"></div>
        </div>
        <p className="text-sm text-gray-500 mt-2">Adım 4 / 4 - Neredeyse bitti! 🎉</p>
      </div>

      <form className="space-y-8">
        {/* Motivation */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Frigya Yolu'na neden katılmak istiyorsunuz? *
          </h3>
          <p className="text-gray-600">
            Motivasyonunuzu anlamak, size en iyi deneyimi sunmamızda yardımcı olur.
            Açık ve samimi olun - minimum 50 kelime.
          </p>

          <div className="relative">
            <textarea
              value={formData.motivation || ''}
              onChange={(e) => handleInputChange('motivation', e.target.value)}
              rows={6}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none ${getMotivationBorderColor()}`}
              placeholder="Örnek: Tarihle iç içe bir doğa deneyimi yaşamak, kendimi fiziksel ve zihinsel olarak sınamak istiyorum. Frigya medeniyetini yerinde görmek ve bu toprakların hikayelerini dinlemek benim için çok değerli..."
            />
            <div className="absolute bottom-3 right-3 text-sm text-gray-400">
              {wordCount} kelime
            </div>
          </div>

          <p className={`text-sm ${getMotivationHelperColor()}`}>
            {getMotivationHelper()}
          </p>

          {wordCount >= 50 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-green-800 text-sm">
                ✨ Harika! Motivasyonunuz bizi çok heyecanlandırdı. Bu katılım için mükemmel bir başlangıç.
              </p>
            </div>
          )}
        </div>

        {/* Goals */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Bu yolculuktan beklentileriniz nelerdir? *
          </h3>
          <p className="text-gray-600">
            Birden fazla seçenek işaretleyebilirsiniz.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {goalOptions.map((goal) => (
              <label
                key={goal.id}
                className={`flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                  formData.goals?.includes(goal.id)
                    ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500 ring-opacity-30'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData.goals?.includes(goal.id) || false}
                  onChange={() => handleGoalToggle(goal.id)}
                  className="sr-only"
                />
                <div className="text-2xl mb-2">{goal.icon}</div>
                <span className="text-sm text-center font-medium">{goal.label}</span>
                {formData.goals?.includes(goal.id) && (
                  <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    ✓
                  </div>
                )}
              </label>
            ))}
          </div>
          {errors.goals && (
            <p className="text-red-600 text-sm">{errors.goals}</p>
          )}
        </div>

        {/* How Did You Hear */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Bizi nasıl keşfettiniz? *
          </h3>
          <p className="text-gray-600">
            Bu bilgi pazarlama stratejimizi geliştirmemize yardımcı olur.
          </p>

          <div className="grid md:grid-cols-2 gap-2">
            {hearAboutOptions.map((option) => (
              <label
                key={option}
                className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                  formData.howDidYouHear === option
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="howDidYouHear"
                  value={option}
                  checked={formData.howDidYouHear === option}
                  onChange={(e) => handleInputChange('howDidYouHear', e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 mr-3"
                />
                <span className="text-sm">{option}</span>
              </label>
            ))}
          </div>

          {formData.howDidYouHear === 'Diğer' && (
            <input
              type="text"
              placeholder="Lütfen belirtiniz..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-2"
              onChange={(e) => handleInputChange('howDidYouHear', `Diğer: ${e.target.value}`)}
            />
          )}
          {errors.howDidYouHear && (
            <p className="text-red-600 text-sm">{errors.howDidYouHear}</p>
          )}
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <label className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg border">
            <input
              type="checkbox"
              checked={formData.newsletter || false}
              onChange={(e) => handleInputChange('newsletter', e.target.checked)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
            />
            <div>
              <p className="font-medium text-gray-900">E-bülten ve Güncellemeler</p>
              <p className="text-sm text-gray-600">
                Frigya Yolu güncellemeleri, yeni rotalar, özel indirimler ve yürüyüş ipuçları almak istiyorum.
                (İstediğiniz zaman abonelikten çıkabilirsiniz)
              </p>
            </div>
          </label>
        </div>

        {/* Legal Agreements */}
        <div className="space-y-4 border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800">Yasal Onaylar</h3>

          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={formData.termsAccepted || false}
              onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
              className={`w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5 ${
                errors.termsAccepted ? 'border-red-500' : ''
              }`}
              required
            />
            <div>
              <p className="text-sm text-gray-900">
                <span className="font-medium">Kullanım Koşulları ve Gizlilik Politikası</span>nı okudum, anladım ve kabul ediyorum. *
              </p>
              <div className="mt-2 space-x-4 text-xs">
                <a href="/kullanim-kosullari" target="_blank" className="text-blue-600 hover:underline">
                  Kullanım Koşulları
                </a>
                <a href="/gizlilik-politikasi" target="_blank" className="text-blue-600 hover:underline">
                  Gizlilik Politikası
                </a>
              </div>
            </div>
          </label>
          {errors.termsAccepted && (
            <p className="text-red-600 text-sm ml-8">{errors.termsAccepted}</p>
          )}

          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={formData.dataProcessing || false}
              onChange={(e) => handleInputChange('dataProcessing', e.target.checked)}
              className={`w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5 ${
                errors.dataProcessing ? 'border-red-500' : ''
              }`}
              required
            />
            <p className="text-sm text-gray-900">
              Kişisel verilerimin işlenmesine, saklanmasına ve kullanılmasına
              <span className="font-medium"> KVKK kapsamında</span> onay veriyorum. *
            </p>
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
            className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Geri
          </button>

          <button
            type="button"
            onClick={onSubmit}
            disabled={!isValid || isSubmitting}
            className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all ${
              isValid && !isSubmitting
                ? 'bg-green-600 text-white hover:bg-green-700 transform hover:scale-105 shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Gönderiliyor...</span>
              </div>
            ) : (
              '🎉 Kaydı Tamamla!'
            )}
          </button>
        </div>
      </form>

      {/* Trust Badges */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="text-center space-y-3">
          <div className="flex justify-center space-x-6 text-2xl">
            <span title="SSL Güvenlik">🔒</span>
            <span title="Güvenilir İşletme">✅</span>
            <span title="7/24 Destek">💬</span>
            <span title="Para İade Garantisi">💰</span>
          </div>
          <p className="text-sm text-blue-800">
            <span className="font-semibold">%100 Güvenli:</span> Bilgileriniz SSL ile şifrelenir.
            2,847 memnun katılımcı. 7 gün para iade garantisi.
          </p>
        </div>
      </div>

      {/* Social Proof */}
      <div className="text-center">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-blue-600">89%</span> katılımcı deneyimlerini 5 yıldız olarak değerlendirdi
        </p>
        <div className="flex justify-center mt-1 text-yellow-400">
          ★★★★★
        </div>
      </div>
    </div>
  );
}