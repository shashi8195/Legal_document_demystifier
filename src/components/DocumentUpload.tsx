import React, { useState, useCallback } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle, Shield } from 'lucide-react';
import { getLocalizedText } from './LanguageSelector';

interface DocumentUploadProps {
  onUpload: (document: any) => void;
  language: string;
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({ onUpload, language }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    setUploadStatus('idle');

    // Simulate upload and AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockDocument = {
      id: Date.now().toString(),
      name: file.name,
      type: file.type,
      size: file.size,
      uploadDate: new Date().toISOString(),
      content: 'Mock legal document content...',
      analysis: {
        summary: 'This rental agreement contains standard terms with some potentially concerning clauses that favor the landlord. The security deposit requirement is higher than typical, and the maintenance cost responsibility shifts significant expenses to the tenant.',
        simpleSummary: 'This rental contract has some rules that might not be great for you. You have to pay a lot of money upfront, and you might have to pay for fixing things that break.',
        keyPoints: [
          'Security deposit of 2 months rent required',
          'Automatic renewal clause unless 60-day notice given',
          'Landlord can increase rent with 30-day notice',
          'Tenant responsible for all maintenance costs over $100'
        ],
        riskLevel: 'medium',
        concerns: [
          'Short notice period for rent increases',
          'High tenant responsibility for maintenance'
        ],
        riskyClausesDetailed: [
          {
            title: 'Excessive Security Deposit Requirement',
            simpleTitle: 'Too Much Money Upfront',
            originalText: 'Tenant shall provide a security deposit equal to two (2) months\' rent prior to occupancy.',
            explanation: 'This clause requires you to pay double the monthly rent as a security deposit, which is significantly higher than the typical one month\'s rent standard.',
            simpleExplanation: 'You have to pay 2 months of rent before you can move in. Most places only ask for 1 month.',
            risk: 'This ties up a large amount of your money and may indicate the landlord expects problems or wants to discourage tenant turnover.',
            severity: 'medium'
          },
          {
            title: 'Short Notice for Rent Increases',
            simpleTitle: 'Rent Can Go Up Quickly',
            originalText: 'Landlord may increase rent with thirty (30) days written notice to tenant.',
            explanation: 'The landlord can raise your rent with only 30 days notice, which is less time than many jurisdictions require.',
            simpleExplanation: 'Your landlord can make your rent more expensive with only 1 month warning.',
            risk: 'This gives you very little time to budget for increased housing costs or find alternative housing if the increase is unaffordable.',
            severity: 'high'
          },
          {
            title: 'Tenant Maintenance Cost Burden',
            simpleTitle: 'You Pay When Things Break',
            originalText: 'Tenant is responsible for all maintenance and repair costs exceeding one hundred dollars ($100).',
            explanation: 'You are financially responsible for any maintenance or repairs that cost more than $100, which could include major appliances, plumbing, or electrical issues.',
            simpleExplanation: 'If something expensive breaks (like the AC or toilet), you have to pay to fix it if it costs more than $100.',
            risk: 'This could result in unexpected large expenses that are typically the landlord\'s responsibility.',
            severity: 'high'
          }
        ],
        detailedClauses: [
          {
            title: 'Security Deposit Terms',
            simpleTitle: 'Getting Your Money Back',
            originalText: 'Security deposit shall be returned within thirty (30) days of lease termination, less any deductions for damages beyond normal wear and tear.',
            explanation: 'Your security deposit will be returned within 30 days after you move out, minus any costs for damage you caused beyond normal use.',
            simpleExplanation: 'You\'ll get your deposit back in a month after moving out, unless you damaged something.',
            suggestion: 'Document the apartment\'s condition with photos when you move in to protect your deposit.',
            importance: 'critical'
          },
          {
            title: 'Lease Renewal Process',
            simpleTitle: 'Staying Another Year',
            originalText: 'This lease shall automatically renew for successive one-year terms unless either party provides sixty (60) days written notice of intent not to renew.',
            explanation: 'Your lease will automatically continue for another year unless you or the landlord give 60 days written notice that you want to end it.',
            simpleExplanation: 'If you don\'t tell your landlord 2 months before your lease ends that you\'re leaving, you\'re stuck for another whole year.',
            risk: 'Forgetting to give notice could lock you into another year-long commitment.',
            suggestion: 'Set a calendar reminder 70 days before your lease ends to decide about renewal.',
            importance: 'critical'
          }
        ],
        legalTerms: [
          {
            term: 'Normal Wear and Tear',
            definition: 'The expected deterioration of a property due to ordinary use, for which a tenant cannot be charged.',
            simpleDefinition: 'Normal damage that happens when you live somewhere, like small nail holes or carpet getting a bit worn.',
            example: 'Faded paint, small nail holes, or carpet wear in high-traffic areas'
          },
          {
            term: 'Automatic Renewal Clause',
            definition: 'A provision that extends a lease for another term unless proper notice is given by either party.',
            simpleDefinition: 'A rule that makes your lease continue automatically unless you say you want to leave.',
            example: 'Your one-year lease becomes another one-year lease if you don\'t give notice'
          }
        ],
        rights: [
          {
            title: 'Right to Habitable Living Conditions',
            explanation: 'You have the legal right to live in a property that meets basic health and safety standards.',
            simpleExplanation: 'Your home must be safe and livable - working plumbing, electricity, and no dangerous conditions.',
            legalBasis: 'Consumer Protection Act, 2019 & Model Tenancy Act, 2021'
          },
          {
            title: 'Right to Privacy',
            explanation: 'Landlords must provide reasonable notice (typically 24-48 hours) before entering your rental unit.',
            simpleExplanation: 'Your landlord can\'t just walk into your home whenever they want - they need to tell you first.',
            legalBasis: 'Right to Privacy under Article 21 of Indian Constitution'
          }
        ],
        checklist: [
          {
            title: 'Verify the security deposit amount is reasonable',
            description: 'Ensure the security deposit doesn\'t exceed local legal limits and is refundable.',
            simpleDescription: 'Make sure you\'re not paying too much money upfront and that you can get it back.',
            urgency: 'high'
          },
          {
            title: 'Understand maintenance responsibilities',
            description: 'Clarify which repairs you\'ll be responsible for and ensure major systems remain landlord\'s responsibility.',
            simpleDescription: 'Know what you have to fix yourself and what the landlord should fix.',
            urgency: 'high'
          },
          {
            title: 'Check rent increase notice period',
            description: 'Verify the notice period for rent increases complies with local tenant protection laws.',
            simpleDescription: 'Make sure your landlord can\'t surprise you with higher rent without enough warning.',
            urgency: 'medium'
          },
          {
            title: 'Document current property condition',
            description: 'Take photos and create a written record of the property\'s condition before moving in.',
            simpleDescription: 'Take pictures of everything when you move in so you can prove what was already broken.',
            urgency: 'high'
          }
        ]
      }
    };

    setIsUploading(false);
    setUploadStatus('success');
    
    setTimeout(() => {
      onUpload(mockDocument);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Understand Your Legal Documents
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Upload any legal document and get instant, clear explanations in plain English. 
          Identify risks, understand your rights, and make informed decisions.
        </p>
        
        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Smart Document Reading</h3>
            <p className="text-sm text-gray-600">
              Our AI reads your document like a lawyer would, then explains it in simple words you can understand
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Spot the Traps</h3>
            <p className="text-sm text-gray-600">
              We highlight sneaky clauses that might cost you money or limit your rights
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">No More Legal Jargon</h3>
            <p className="text-sm text-gray-600">
              We translate lawyer-speak into everyday language that actually makes sense
            </p>
          </div>
        </div>
      </div>

      {/* Upload Area */}
      <div className="bg-white rounded-xl shadow-lg border-2 border-dashed border-gray-300 transition-colors duration-200 hover:border-blue-400">
        <div
          className={`p-12 text-center transition-colors duration-200 rounded-xl ${
            isDragOver ? 'bg-blue-50 border-blue-400' : ''
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
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Analyzing Document...
                </h3>
                <p className="text-gray-600">
                  Our AI is reading and understanding your document
                </p>
              </div>
            </div>
          ) : uploadStatus === 'success' ? (
            <div className="space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Analysis Complete!
                </h3>
                <p className="text-gray-600">
                  Redirecting to your document analysis...
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload className="w-8 h-8 text-blue-600" />
              </div>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                {getLocalizedText('upload_document', language)}
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                {getLocalizedText('redirecting', language)}
              </p>
              
              <div className="space-y-4">
                <label className="inline-block">
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileSelect}
                  />
                  <span className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 cursor-pointer inline-block">
                    {getLocalizedText('choose_file', language)}
                  </span>
                </label>
                
                <div className="text-xs text-gray-500">
                  Supported formats: PDF, DOC, DOCX, TXT (Max 10MB)
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Example Documents */}
      <div className="mt-12">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">
          {getLocalizedText('try_sample_docs', language)}
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { 
              name: getLocalizedText('mumbai_rental', language), 
              type: getLocalizedText('housing_contract', language), 
              risk: 'Medium', 
              description: getLocalizedText('typical_2bhk', language) 
            },
            { 
              name: getLocalizedText('it_job_contract', language), 
              type: getLocalizedText('employment_agreement', language), 
              risk: 'Low', 
              description: getLocalizedText('standard_tech', language) 
            },
            { 
              name: getLocalizedText('personal_loan', language), 
              type: getLocalizedText('financial_contract', language), 
              risk: 'High', 
              description: getLocalizedText('high_interest_loan', language) 
            }
          ].map((doc) => (
            <button
              key={doc.name}
              onClick={() => handleFileUpload(new File([''], doc.name + '.pdf', { type: 'application/pdf' }))}
              className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 text-left"
            >
              <div className="flex items-center space-x-3">
                <FileText className="w-8 h-8 text-blue-600" />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{doc.name}</h4>
                  <p className="text-sm text-gray-500 mb-1">{doc.type}</p>
                  <p className="text-xs text-gray-400">{doc.description}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  doc.risk === 'High' ? 'bg-red-100 text-red-700' :
                  doc.risk === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {doc.risk} Risk
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DocumentUpload;