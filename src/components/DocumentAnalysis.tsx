import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Info, Star, Download, Volume2, VolumeX, Scale, Shield } from 'lucide-react';
import { getRiskColor } from '../utils/riskUtils';

interface DocumentAnalysisProps {
  document: any;
  language: string;
}

export const DocumentAnalysis: React.FC<DocumentAnalysisProps> = ({ document, language }) => {
  const [isSimpleMode, setIsSimpleMode] = useState(false);
  const [isNarrating, setIsNarrating] = useState(false);
  const { analysis } = document;

  const handleNarration = () => {
    if (isNarrating) {
      speechSynthesis.cancel();
      setIsNarrating(false);
    } else {
      const text = isSimpleMode ? analysis.simpleSummary : analysis.summary;
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set language-specific voice
      const voices = speechSynthesis.getVoices();
      const langVoice = voices.find(voice => 
        voice.lang.startsWith(language === 'hi' ? 'hi' : 
                              language === 'ta' ? 'ta' : 
                              language === 'te' ? 'te' : 'en')
      );
      
      if (langVoice) utterance.voice = langVoice;
      utterance.rate = 0.8;
      utterance.onend = () => setIsNarrating(false);
      speechSynthesis.speak(utterance);
      setIsNarrating(true);
    }
  };

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Reading Level:</span>
              <button
                onClick={() => setIsSimpleMode(!isSimpleMode)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isSimpleMode 
                    ? 'bg-green-100 text-green-700 border border-green-300' 
                    : 'bg-blue-100 text-blue-700 border border-blue-300'
                }`}
              >
                {isSimpleMode ? '🎓 Simple (Age 15)' : '👔 Professional'}
              </button>
            </div>
            
            <button
              onClick={handleNarration}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                isNarrating 
                  ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {isNarrating ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span className="text-sm">{isNarrating ? 'Stop' : 'Listen'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Info className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {isSimpleMode ? 'What This Document Means' : 'Executive Summary'}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {isSimpleMode ? analysis.simpleSummary : analysis.summary}
            </p>
            
            {/* Risk Level */}
            <div className={`inline-flex items-center px-4 py-2 rounded-lg border-2 ${getRiskColor(analysis.riskLevel)}`}>
              <AlertTriangle className="w-5 h-5 mr-2" />
              <span className="font-semibold capitalize">
                {analysis.riskLevel} Risk Level
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Clause Analysis */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Scale className="w-6 h-6 text-purple-600 mr-3" />
          {isSimpleMode ? 'Important Parts Explained' : 'Detailed Clause Analysis'}
        </h2>
        
        <div className="space-y-6">
          {analysis.detailedClauses.map((clause: any, index: number) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-semibold text-gray-900 text-lg">
                  {isSimpleMode ? `Part ${index + 1}: ${clause.simpleTitle}` : clause.title}
                </h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  clause.importance === 'critical' ? 'bg-red-100 text-red-700' :
                  clause.importance === 'important' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {clause.importance.toUpperCase()}
                </span>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded border-l-4 border-gray-400">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    {isSimpleMode ? 'What the document says:' : 'Original Text:'}
                  </p>
                  <p className="text-gray-600 italic">{clause.originalText}</p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-400">
                  <p className="text-sm font-medium text-blue-700 mb-2">
                    {isSimpleMode ? 'What this actually means:' : 'Plain English Translation:'}
                  </p>
                  <p className="text-blue-800">
                    {isSimpleMode ? clause.simpleExplanation : clause.explanation}
                  </p>
                </div>
                
                {clause.risk && (
                  <div className="bg-red-50 p-4 rounded border-l-4 border-red-400">
                    <p className="text-sm font-medium text-red-700 mb-2">
                      {isSimpleMode ? 'Why you should be careful:' : 'Potential Risk:'}
                    </p>
                    <p className="text-red-800">{clause.risk}</p>
                  </div>
                )}
                
                {clause.suggestion && (
                  <div className="bg-green-50 p-4 rounded border-l-4 border-green-400">
                    <p className="text-sm font-medium text-green-700 mb-2">
                      {isSimpleMode ? 'What you can do:' : 'Suggested Action:'}
                    </p>
                    <p className="text-green-800">{clause.suggestion}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legal Terms Dictionary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {isSimpleMode ? 'Confusing Words Explained' : 'Legal Terms Dictionary'}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {analysis.legalTerms.map((term: any, index: number) => (
            <div key={index} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">{term.term}</h4>
              <p className="text-blue-800 text-sm leading-relaxed">
                {isSimpleMode ? term.simpleDefinition : term.definition}
              </p>
              {term.example && (
                <p className="text-blue-700 text-xs mt-2 italic">
                  Example: {term.example}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Know Your Rights Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
          {isSimpleMode ? 'Your Rights & Protections' : 'Legal Rights Analysis'}
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {analysis.rights.map((right: any, index: number) => (
            <div key={index} className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2 flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                {right.title}
              </h4>
              <p className="text-green-800 text-sm leading-relaxed mb-2">
                {isSimpleMode ? right.simpleExplanation : right.explanation}
              </p>
              <p className="text-green-700 text-xs">
                <strong>Legal Basis:</strong> {right.legalBasis}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center">
          <Download className="w-5 h-5 mr-2" />
          {isSimpleMode ? 'Save This Analysis' : 'Download Full Analysis Report'}
        </button>
        <button className="px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200">
          {isSimpleMode ? 'Send to a Lawyer' : 'Share with Legal Professional'}
        </button>
        <button className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200">
          {isSimpleMode ? 'What Should I Do Next?' : 'Generate Action Checklist'}
        </button>
      </div>
    </div>
  );
};