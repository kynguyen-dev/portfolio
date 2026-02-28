import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { en } from './locales/en';
import { vi } from './locales/vi';
import { ja } from './locales/ja';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      vi: { translation: vi },
      ja: { translation: ja },
    },
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;

export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'vi', label: 'VI', flag: '🇻🇳' },
  { code: 'ja', label: 'JA', flag: '🇯🇵' },
] as const;
