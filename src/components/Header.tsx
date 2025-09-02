import React from 'react';
import { Scale, Shield } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../hooks/useLanguage';
import { getLocalizedText } from './LanguageSelector';

export const Header: React.FC = () => {
  const { language, changeLanguage } = useLanguage();

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">LegalClarify</h1>
              <p className="text-sm text-gray-500">
                {getLocalizedText('app_subtitle', language)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <LanguageSelector 
              selectedLanguage={language}
              onLanguageChange={changeLanguage}
            />
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Shield className="w-4 h-4 text-green-600" />
              <span className="hidden sm:inline">
                {getLocalizedText('secure_private', language)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};