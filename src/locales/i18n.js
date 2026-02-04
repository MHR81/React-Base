import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import fa from './fa.json';

const resources = {
  en: { translation: en },
  fa: { translation: fa },
};

const savedLanguage = localStorage.getItem('language') || 'en';

// بروزرسانی HTML attributes بر اساس زبان ذخیره شده
document.documentElement.lang = savedLanguage;
document.documentElement.dir = savedLanguage === 'fa' ? 'rtl' : 'ltr';

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
