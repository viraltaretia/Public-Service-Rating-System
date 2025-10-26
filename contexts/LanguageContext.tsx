import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { translations, getLanguage, setLanguage as saveLanguage } from '../utils/translations';

interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string, replacements?: { [key: string]: string }) => string;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => '',
});

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState(getLanguage());

  useEffect(() => {
    saveLanguage(language);
  }, [language]);

  const t = (key: string, replacements: { [key: string]: string } = {}) => {
    const langTranslations = translations[language] || translations['en'];
    const textValue = key.split('.').reduce((obj, k) => obj && obj[k], langTranslations as any);

    // If the lookup fails or returns a non-string value (like an object),
    // return the original key to prevent crashes.
    if (typeof textValue !== 'string') {
      return key;
    }
    
    let text = textValue;

    Object.keys(replacements).forEach(placeholder => {
        const regex = new RegExp(`{${placeholder}}`, 'g');
        text = text.replace(regex, replacements[placeholder]);
    });

    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
