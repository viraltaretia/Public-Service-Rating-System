
import React, { createContext, useState, useEffect } from 'react';
import { translations, getLanguage, setLanguage as saveLanguage } from '../utils/translations.ts';

// Fix: Corrected the type signature for the context to match the provider value.
export const LanguageContext = createContext({
  language: 'en',
  setLanguage: (language: string) => {},
  t: (key: string, replacements?: Record<string, string | number>): string => key,
});

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(getLanguage());

  useEffect(() => {
    saveLanguage(language);
  }, [language]);

  const t = (key, replacements = {}) => {
    const langTranslations = translations[language] || translations['en'];
    const textValue = key.split('.').reduce((obj, k) => obj && obj[k], langTranslations);

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
    React.createElement(LanguageContext.Provider, { value: { language, setLanguage, t } },
      children
    )
  );
};