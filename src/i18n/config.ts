import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';

declare global {
  interface Window {
    i18n: typeof i18n;
  }
}

i18n
  .use(resourcesToBackend((language: string, namespace: string) =>
    import(`../locales/${language}/${namespace}.json`)
  ))
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'es'],
    fallbackLng: (code) => {
      // Spanish-first detection: English browsers get English, all others get Spanish
      if (code && code.toLowerCase().startsWith('en')) {
        return ['en'];
      }
      return ['es'];
    },
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false, // React already escapes
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
  });

// Expose i18n to window for console testing (development only)
if (typeof window !== 'undefined') {
  window.i18n = i18n;
}

export default i18n;
