'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { updateConsent, debugAnalytics } from '@/lib/analytics';

const CONSENT_STORAGE_KEY = 'frigya-cookie-consent';

type ConsentState = {
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  timestamp: number;
};

export default function CookieConsent() {
  const t = useTranslations('cookieConsent');
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<ConsentState>({
    analytics: false,
    marketing: false,
    functional: true, // Functional cookies are necessary
    timestamp: Date.now(),
  });

  useEffect(() => {
    // Check if user has already given consent
    const storedConsent = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (storedConsent) {
      try {
        const parsedConsent = JSON.parse(storedConsent) as ConsentState;
        // Check if consent is older than 6 months (GDPR recommendation)
        const sixMonthsAgo = Date.now() - (6 * 30 * 24 * 60 * 60 * 1000);

        if (parsedConsent.timestamp > sixMonthsAgo) {
          setConsent(parsedConsent);
          // Apply stored consent
          updateConsent(parsedConsent.analytics);
          return;
        }
      } catch (error) {
        console.warn('Error parsing stored consent:', error);
      }
    }

    // Show banner if no valid consent found
    setIsVisible(true);
  }, []);

  const handleAcceptAll = () => {
    const newConsent: ConsentState = {
      analytics: true,
      marketing: true,
      functional: true,
      timestamp: Date.now(),
    };

    setConsent(newConsent);
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(newConsent));
    updateConsent(true);
    setIsVisible(false);

    if (debugAnalytics.isEnabled()) {
      debugAnalytics.log('Cookie consent: Accept All', newConsent);
    }
  };

  const handleAcceptNecessary = () => {
    const newConsent: ConsentState = {
      analytics: false,
      marketing: false,
      functional: true,
      timestamp: Date.now(),
    };

    setConsent(newConsent);
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(newConsent));
    updateConsent(false);
    setIsVisible(false);

    if (debugAnalytics.isEnabled()) {
      debugAnalytics.log('Cookie consent: Necessary Only', newConsent);
    }
  };

  const handleCustomSave = () => {
    const newConsent: ConsentState = {
      ...consent,
      timestamp: Date.now(),
    };

    setConsent(newConsent);
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(newConsent));
    updateConsent(newConsent.analytics);
    setIsVisible(false);

    if (debugAnalytics.isEnabled()) {
      debugAnalytics.log('Cookie consent: Custom Settings', newConsent);
    }
  };

  const handleConsentChange = (type: keyof Omit<ConsentState, 'timestamp'>, value: boolean) => {
    setConsent(prev => ({
      ...prev,
      [type]: value,
    }));
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-amber-500 shadow-lg">
      <div className="max-w-7xl mx-auto p-4">
        {!showDetails ? (
          // Simple banner
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t('title', { defaultValue: 'We value your privacy' })}
              </h3>
              <p className="text-gray-700 text-sm">
                {t('description', {
                  defaultValue: 'We use cookies to enhance your experience, analyze site traffic, and personalize content. By clicking "Accept All", you consent to our use of cookies.'
                })}
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row lg:ml-4">
              <button
                onClick={() => setShowDetails(true)}
                className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                {t('customize', { defaultValue: 'Customize' })}
              </button>
              <button
                onClick={handleAcceptNecessary}
                className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                {t('acceptNecessary', { defaultValue: 'Accept Necessary' })}
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-6 py-2 text-sm bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors font-medium"
              >
                {t('acceptAll', { defaultValue: 'Accept All' })}
              </button>
            </div>
          </div>
        ) : (
          // Detailed settings
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">
                {t('detailsTitle', { defaultValue: 'Cookie Settings' })}
              </h3>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label={t('close', { defaultValue: 'Close' })}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid gap-4">
              {/* Functional cookies */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={true}
                    disabled={true}
                    className="mt-1 h-4 w-4 text-amber-600 opacity-50 cursor-not-allowed"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">
                    {t('functional.title', { defaultValue: 'Necessary Cookies' })}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {t('functional.description', {
                      defaultValue: 'These cookies are essential for the website to function and cannot be disabled.'
                    })}
                  </p>
                </div>
              </div>

              {/* Analytics cookies */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={consent.analytics}
                    onChange={(e) => handleConsentChange('analytics', e.target.checked)}
                    className="mt-1 h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">
                    {t('analytics.title', { defaultValue: 'Analytics Cookies' })}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {t('analytics.description', {
                      defaultValue: 'Help us understand how you use our website to improve your experience.'
                    })}
                  </p>
                </div>
              </div>

              {/* Marketing cookies */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={consent.marketing}
                    onChange={(e) => handleConsentChange('marketing', e.target.checked)}
                    className="mt-1 h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">
                    {t('marketing.title', { defaultValue: 'Marketing Cookies' })}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {t('marketing.description', {
                      defaultValue: 'Used to show you relevant content and advertisements.'
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                onClick={handleAcceptNecessary}
                className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                {t('acceptNecessary', { defaultValue: 'Accept Necessary' })}
              </button>
              <button
                onClick={handleCustomSave}
                className="px-6 py-2 text-sm bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors font-medium"
              >
                {t('saveSettings', { defaultValue: 'Save Settings' })}
              </button>
            </div>

            <div className="text-xs text-gray-500 pt-2 border-t border-gray-200">
              {t('moreInfo', {
                defaultValue: 'For more information about how we use cookies, please see our'
              })}{' '}
              <a href="/privacy-policy" className="text-amber-600 hover:underline">
                {t('privacyPolicy', { defaultValue: 'Privacy Policy' })}
              </a>.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}