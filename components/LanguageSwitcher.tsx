'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { locales, type Locale } from '@/i18n';

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLocale: Locale) => {
    // Remove the current locale from the pathname
    const segments = pathname.split('/');
    const localeIndex = segments.findIndex((segment) => locales.includes(segment as Locale));

    if (localeIndex !== -1) {
      segments[localeIndex] = newLocale;
    } else {
      // If no locale in the path, add it at the beginning
      segments.splice(1, 0, newLocale);
    }

    const newPath = segments.join('/') || '/';
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleChange('tr')}
        className={`px-3 py-1 rounded-md transition-colors ${
          locale === 'tr'
            ? 'bg-orange-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        aria-label="Türkçe"
      >
        TR
      </button>
      <button
        onClick={() => handleChange('en')}
        className={`px-3 py-1 rounded-md transition-colors ${
          locale === 'en'
            ? 'bg-orange-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}