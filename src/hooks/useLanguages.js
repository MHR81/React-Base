import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export const useLanguages = () => {
  const { t, i18n } = useTranslation();

  // بروزرسانی HTML attributes هنگام تغییر زبان
  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.language === 'fa' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return {
    t,
    currentLanguage: i18n.language,
    changeLanguage,
    isRTL: i18n.language === 'fa',
  };
};
