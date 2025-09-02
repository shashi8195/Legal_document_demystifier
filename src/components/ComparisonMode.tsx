import React, { useState } from 'react';
import { Upload, ArrowRight, AlertTriangle, CheckCircle, Minus, Plus, FileText } from 'lucide-react';
import { getRiskColor } from '../utils/riskUtils';

interface ComparisonModeProps {
  primaryDocument: any;
  comparisonDocument: any;
  onComparisonUpload: (document: any) => void;
  language: string;
}

export const ComparisonMode: React.FC<ComparisonModeProps> = ({ 
  primaryDocument, 
  comparisonDocument, 
  onComparisonUpload,
  language
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    
    // Simulate upload and processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockComparisonDoc = {
      id: Date.now().toString(),
      name: file.name,
      type: file.type,
      size: file.size,
      uploadDate: new Date().toISOString(),
      analysis: {
        summary: 'This is a more tenant-friendly rental agreement with better terms.',
        keyPoints: [
          'Security deposit of 1 month rent required',
          'Automatic renewal with 90-day notice period',
          'Rent increases require 60-day notice',
          'Landlord responsible for maintenance costs over $50'
        ],
        riskLevel: 'low',
        concerns: ['Minor concern about pet policy restrictions']
      }
    };
    
    setIsUploading(false);
    onComparisonUpload(mockComparisonDoc);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const differences = comparisonDocument ? [
    {
      category: 'Security Deposit',
      primary: '2 months rent',
      comparison: '1 month rent',
      impact: 'Better',
      explanation: 'Lower upfront cost for you'
    },
    {
      category: 'Notice Period for Renewal',
      primary: '60 days',
      comparison: '90 days',
      impact: 'Better',
      explanation: 'More time to plan your next move'
    },
    {
      category: 'Rent Increase Notice',
      primary: '30 days',
      comparison: '60 days',
      impact: 'Better',
      explanation: 'More time to prepare for rent changes'
    },
    {
      category: 'Maintenance Responsibility',
      primary: 'Tenant pays over $100',
      comparison: 'Landlord pays over $50',
      impact: 'Better',
      explanation: 'Less financial burden on you'
    }
  ] : [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Compare Documents Side-by-Side
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Upload a second document to see how terms compare. Perfect for evaluating multiple rental agreements, 
          job offers, or contract options.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Primary Document */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Document A (Current)</h3>
              <p className="text-sm text-gray-500">{primaryDocument.name}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className={`p-3 rounded-lg border ${getRiskColor(primaryDocument.analysis.riskLevel)}`}>
              <span className="font-medium">Risk Level: {primaryDocument.analysis.riskLevel.toUpperCase()}</span>
            </div>
            
            <div className="space-y-2">
              {primaryDocument.analysis.keyPoints.slice(0, 4).map((point: string, index: number) => (
                <div key={index} className="flex items-start space-x-2 text-sm">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-gray-700">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Comparison Document Upload/Display */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          {!comparisonDocument ? (
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
                isDragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
              }`}
              onDrop={handleDrop}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
            >
              {isUploading ? (
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  </div>
                  <p className="text-gray-600">Processing document...</p>
                </div>
              ) : (
                <>
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Upload Document B</h3>
                  <p className="text-gray-600 mb-4">
                    Add a second document to compare terms and conditions
                  </p>
                  <label className="inline-block">
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleFileSelect}
                    />
                    <span className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 cursor-pointer">
                      Choose File
                    </span>
                  </label>
                </>
              )}
            </div>
          ) : (
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Document B (Comparison)</h3>
                  <p className="text-sm text-gray-500">{comparisonDocument.name}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className={`p-3 rounded-lg border ${getRiskColor(comparisonDocument.analysis.riskLevel)}`}>
                  <span className="font-medium">Risk Level: {comparisonDocument.analysis.riskLevel.toUpperCase()}</span>
                </div>
                
                <div className="space-y-2">
                  {comparisonDocument.analysis.keyPoints.slice(0, 4).map((point: string, index: number) => (
                    <div key={index} className="flex items-start space-x-2 text-sm">
                      <span className="text-green-600 mt-1">•</span>
                      <span className="text-gray-700">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Comparison Results */}
      {comparisonDocument && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <ArrowRight className="w-6 h-6 text-blue-600 mr-3" />
            Key Differences Analysis
          </h2>
          
          <div className="space-y-4">
            {differences.map((diff, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">{diff.category}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    diff.impact === 'Better' ? 'bg-green-100 text-green-700' :
                    diff.impact === 'Worse' ? 'bg-red-100 text-red-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {diff.impact === 'Better' ? '✅ Better' : 
                     diff.impact === 'Worse' ? '❌ Worse' : '➖ Same'}
                  </span>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 mb-3">
                  <div className="p-3 bg-blue-50 rounded border border-blue-200">
                    <p className="text-sm font-medium text-blue-900 mb-1">Document A</p>
                    <p className="text-blue-800">{diff.primary}</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded border border-green-200">
                    <p className="text-sm font-medium text-green-900 mb-1">Document B</p>
                    <p className="text-green-800">{diff.comparison}</p>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                  <strong>Impact:</strong> {diff.explanation}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">📋 Recommendation</h4>
            <p className="text-green-800">
              Document B is clearly better for you! It saves you money upfront, gives you more time to make decisions, 
              and protects you from unexpected repair costs. If you like the location and apartment equally, 
              definitely go with Document B.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};