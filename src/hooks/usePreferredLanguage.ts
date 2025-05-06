import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

type LanguageCode = string;
type LanguagePreference = {
  code: LanguageCode;
  name: string;
  region?: string;
};

interface UsePreferredLanguageOptions {
  defaultLanguage?: LanguageCode;
  supportedLanguages?: LanguagePreference[];
  persistPreference?: boolean;
}

export const usePreferredLanguage = ({
  defaultLanguage = 'en',
  supportedLanguages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'zh', name: '中文', region: 'CN' }
  ],
  persistPreference = true
}: UsePreferredLanguageOptions = {}) => {
  // Get browser's preferred languages
  const getBrowserLanguages = (): LanguageCode[] => {
    if (typeof window === 'undefined') return [defaultLanguage];

    const languages: LanguageCode[] = [];
    
    // Navigator languages
    if (navigator.languages) {
      languages.push(...navigator.languages);
    }
    
    // Legacy fallbacks
    if (navigator.language) {
      languages.push(navigator.language);
    }
    if ((navigator as any).userLanguage) {
      languages.push((navigator as any).userLanguage);
    }
    
    return languages.length ? languages : [defaultLanguage];
  };

  // Find best matching supported language
  const findBestMatch = (preferredLanguages: LanguageCode[]): LanguageCode => {
    for (const preferred of preferredLanguages) {
      // Try exact match
      const exactMatch = supportedLanguages.find(lang => 
        lang.code.toLowerCase() === preferred.toLowerCase()
      );
      if (exactMatch) return exactMatch.code;

      // Try base language match (e.g., 'en-US' matches 'en')
      const basePreferred = preferred.split('-')[0].toLowerCase();
      const baseMatch = supportedLanguages.find(lang =>
        lang.code.split('-')[0].toLowerCase() === basePreferred
      );
      if (baseMatch) return baseMatch.code;
    }
    return defaultLanguage;
  };

  // Persistent storage key
  const STORAGE_KEY = 'preferred-language';

  // Get initial language preference
  const [storedLanguage, setStoredLanguage, { removeItem }] = useLocalStorage<LanguageCode>(
    STORAGE_KEY,
    findBestMatch(getBrowserLanguages()),
    {
      validateOnLoad: true
    }
  );

  const [currentLanguage, setCurrentLanguage] = useState(storedLanguage);

  // Update stored preference when language changes
  useEffect(() => {
    if (persistPreference) {
      setStoredLanguage(currentLanguage);
    }
  }, [currentLanguage, persistPreference, setStoredLanguage]);

  // Reset to browser preference
  const resetToDefault = () => {
    if (persistPreference) {
      removeItem();
    }
    setCurrentLanguage(findBestMatch(getBrowserLanguages()));
  };

  return {
    language: currentLanguage,
    setLanguage: setCurrentLanguage,
    resetToDefault,
    supportedLanguages,
    isSupported: (code: LanguageCode) => 
      supportedLanguages.some(lang => lang.code === code)
  };
};