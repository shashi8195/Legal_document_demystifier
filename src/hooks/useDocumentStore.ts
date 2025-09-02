import { useState } from 'react';

interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: string;
  content: string;
  analysis: {
    summary: string;
    simpleSummary: string;
    keyPoints: string[];
    riskLevel: 'low' | 'medium' | 'high';
    concerns: string[];
    riskyClausesDetailed: Array<{
      title: string;
      simpleTitle: string;
      originalText: string;
      explanation: string;
      simpleExplanation: string;
      risk: string;
      severity: 'low' | 'medium' | 'high';
    }>;
    detailedClauses: Array<{
      title: string;
      simpleTitle: string;
      originalText: string;
      explanation: string;
      simpleExplanation: string;
      risk?: string;
      suggestion?: string;
      importance: 'critical' | 'important' | 'moderate';
    }>;
    legalTerms: Array<{
      term: string;
      definition: string;
      simpleDefinition: string;
      example?: string;
    }>;
    rights: Array<{
      title: string;
      explanation: string;
      simpleExplanation: string;
      legalBasis: string;
    }>;
    checklist: Array<{
      title: string;
      description: string;
      simpleDescription: string;
      urgency: 'high' | 'medium' | 'low';
    }>;
  };
}

export const useDocumentStore = () => {
  const [currentDocument, setCurrentDocument] = useState<Document | null>(null);
  const [documentHistory, setDocumentHistory] = useState<Document[]>([]);

  const addToHistory = (document: Document) => {
    setDocumentHistory(prev => [document, ...prev.slice(0, 9)]); // Keep last 10
  };

  const selectFromHistory = (document: Document) => {
    setCurrentDocument(document);
  };

  return {
    currentDocument,
    setCurrentDocument: (doc: Document | null) => {
      if (doc) {
        addToHistory(doc);
      }
      setCurrentDocument(doc);
    },
    documentHistory,
    selectFromHistory
  };
};