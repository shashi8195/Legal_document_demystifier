import React, { useState } from 'react';
import { X, Download, ZoomIn, ZoomOut, FileText, Eye } from 'lucide-react';

interface DocumentViewerProps {
  viewedDocument: any;
  onClose: () => void;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({ viewedDocument, onClose }) => {
  const [zoom, setZoom] = useState(100);

  const mockDocumentContent = `
RENTAL AGREEMENT

This Rental Agreement ("Agreement") is entered into on January 15, 2024, between:

LANDLORD: Rajesh Kumar Sharma
Address: 123 MG Road, Bandra West, Mumbai - 400050
Phone: +91 98765 43210

TENANT: [Your Name]
Address: [Your Address]

PROPERTY DETAILS:
Address: Flat 2B, Sunrise Apartments, Linking Road, Bandra West, Mumbai - 400050
Type: 2 BHK Furnished Apartment
Area: 850 sq ft

TERMS AND CONDITIONS:

1. RENT AND SECURITY DEPOSIT
   - Monthly Rent: ₹45,000 (Forty-Five Thousand Rupees)
   - Security Deposit: ₹90,000 (Two months rent)
   - Maintenance Charges: ₹3,000 per month

2. LEASE DURATION
   - Initial Term: 11 months from February 1, 2024
   - Automatic Renewal: Unless 60 days written notice given

3. RENT PAYMENT
   - Due Date: 5th of each month
   - Late Fee: ₹500 per day after 10th
   - Payment Method: Bank transfer to Account No. 1234567890

4. MAINTENANCE AND REPAIRS
   - Tenant responsible for repairs over ₹100
   - Landlord handles structural repairs
   - AC servicing: Tenant's responsibility

5. TERMINATION CLAUSE
   - Either party may terminate with 60 days notice
   - Early termination fee: One month rent
   - Property inspection required before deposit return

6. RESTRICTIONS
   - No pets allowed
   - No subletting without written consent
   - No structural modifications

7. UTILITIES
   - Electricity: Tenant's responsibility
   - Water: Included in maintenance
   - Internet: Tenant's arrangement

SIGNATURES:
Landlord: _________________ Date: _________
Tenant: __________________ Date: _________

Witness 1: ________________ Date: _________
Witness 2: ________________ Date: _________
`;

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([mockDocumentContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${viewedDocument.name}_original.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <FileText className="w-6 h-6 text-blue-600" />
            <div>
              <h2 className="text-xl font-bold text-gray-900">{viewedDocument.name}</h2>
              <p className="text-sm text-gray-500">Original Document</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setZoom(Math.max(50, zoom - 25))}
                className="p-2 hover:bg-white rounded transition-colors"
                disabled={zoom <= 50}
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-sm font-medium px-2">{zoom}%</span>
              <button
                onClick={() => setZoom(Math.min(200, zoom + 25))}
                className="p-2 hover:bg-white rounded transition-colors"
                disabled={zoom >= 200}
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
            
            <button
              onClick={handleDownload}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
            
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Document Content */}
        <div className="flex-1 overflow-auto p-6">
          <div 
            className="bg-white border border-gray-300 rounded-lg p-8 font-mono text-sm leading-relaxed"
            style={{ fontSize: `${zoom}%` }}
          >
            <pre className="whitespace-pre-wrap text-gray-800">
              {mockDocumentContent}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};