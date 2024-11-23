import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language.substring(0, 2);

  const toggleLanguage = () => {
    const newLang = currentLanguage === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('i18nextLng', newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-purple-600 transition-colors"
      aria-label="Toggle language"
    >
      <Globe className="w-4 h-4" />
      <span>{currentLanguage === 'en' ? 'FR' : 'EN'}</span>
    </button>
  );
}