import { useState, useEffect } from 'react';

export const useLanguage = () => {
  const [language, setLanguage] = useState<string>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (newLanguage: string) => {
    setLanguage(newLanguage);
    localStorage.setItem('preferred-language', newLanguage);
  };

  return {
    language,
    changeLanguage
  };
};