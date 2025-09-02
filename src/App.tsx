import React, { useState } from 'react';
import { Header } from './components/Header';
import { DocumentUpload } from './components/DocumentUpload';
import { DocumentAnalysis } from './components/DocumentAnalysis';
import { DocumentViewer } from './components/DocumentViewer';
import { ChatInterface } from './components/ChatInterface';
import { ComparisonMode } from './components/ComparisonMode';
import { Dashboard } from './components/Dashboard';
import { useDocumentStore } from './hooks/useDocumentStore';
import { useLanguage } from './hooks/useLanguage';

function App() {
  const { currentDocument, setCurrentDocument, documentHistory } = useDocumentStore();
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'upload' | 'dashboard' | 'analysis' | 'chat' | 'compare'>('upload');
  const [comparisonDocument, setComparisonDocument] = useState<any>(null);
  const [showDocumentViewer, setShowDocumentViewer] = useState(false);

  const handleDocumentUpload = (document: any) => {
    setCurrentDocument(document);
    setActiveTab('dashboard');
  };

  const handleComparisonUpload = (document: any) => {
    setComparisonDocument(document);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {!currentDocument ? (
          <DocumentUpload onUpload={handleDocumentUpload} language={language} />
        ) : (
          <div className="space-y-6">
            {/* Navigation Tabs */}
            <div className="border-b border-gray-200 bg-white rounded-t-lg">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: '📊', description: 'Overview & Quick Actions' },
                  { id: 'analysis', label: 'Full Analysis', icon: '📄', description: 'Every Detail Explained' },
                  { id: 'chat', label: 'Ask Questions', icon: '💬', description: 'Get Instant Answers' },
                  { id: 'compare', label: 'Compare Docs', icon: '⚖️', description: 'Which One is Better?' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`py-4 px-2 border-b-2 font-medium text-sm transition-all duration-200 group ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{tab.icon}</span>
                        <span className="hidden sm:inline">{tab.label}</span>
                      </div>
                      <span className="text-xs text-gray-400 hidden lg:block group-hover:text-gray-600">
                        {tab.description}
                      </span>
                    </div>
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="min-h-[600px]">
              {activeTab === 'dashboard' && (
                <Dashboard 
                  document={currentDocument} 
                  onViewDocument={() => setShowDocumentViewer(true)}
                  language={language}
                />
              )}
              {activeTab === 'analysis' && (
                <DocumentAnalysis document={currentDocument} language={language} />
              )}
              {activeTab === 'chat' && (
                <ChatInterface document={currentDocument} language={language} />
              )}
              {activeTab === 'compare' && (
                <ComparisonMode 
                  primaryDocument={currentDocument}
                  comparisonDocument={comparisonDocument}
                  onComparisonUpload={handleComparisonUpload}
                  language={language}
                />
              )}
            </div>

            {/* Document Info Bar */}
            <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">📄</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{currentDocument.name}</h3>
                    <p className="text-sm text-gray-500">
                      Uploaded {new Date(currentDocument.uploadDate).toLocaleDateString()} • 
                      Risk Level: <span className={`font-medium ${
                        currentDocument.analysis.riskLevel === 'high' ? 'text-red-600' :
                        currentDocument.analysis.riskLevel === 'medium' ? 'text-yellow-600' :
                        'text-green-600'
                      }`}>
                        {currentDocument.analysis.riskLevel === 'high' ? '🚨 High (Be Careful!)' :
                         currentDocument.analysis.riskLevel === 'medium' ? '⚠️ Medium (Some Concerns)' :
                         '✅ Low (Looks Good)'}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {documentHistory.length > 1 && (
                    <select 
                      className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      onChange={(e) => {
                        const doc = documentHistory.find(d => d.id === e.target.value);
                        if (doc) setCurrentDocument(doc);
                      }}
                      value={currentDocument.id}
                    >
                      {documentHistory.map(doc => (
                        <option key={doc.id} value={doc.id}>{doc.name}</option>
                      ))}
                    </select>
                  )}
                  <button
                    onClick={() => setCurrentDocument(null)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
                  >
                    Upload New Document
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      {/* Document Viewer Modal */}
      {showDocumentViewer && currentDocument && (
        <DocumentViewer 
          document={currentDocument}
          onClose={() => setShowDocumentViewer(false)}
        />
      )}
    </div>
  );
}

export default App;