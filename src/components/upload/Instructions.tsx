import React from 'react';
import { FileType, CheckCircle, AlertTriangle } from 'lucide-react';

export const Instructions = () => (
  <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
    <h2 className="text-xl font-semibold mb-4">Guidelines</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <FileType className="text-blue-600 mb-2" size={24} />
        <h3 className="font-medium text-blue-900 mb-2">Supported Formats</h3>
        <ul className="text-blue-800 text-sm space-y-1">
          <li>• CSV files</li>
          <li>• Excel files (.xlsx)</li>
          <li>• JSON files</li>
          <li>• Maximum size: 50MB</li>
        </ul>
      </div>
      
      <div className="bg-green-50 p-4 rounded-lg">
        <CheckCircle className="text-green-600 mb-2" size={24} />
        <h3 className="font-medium text-green-900 mb-2">Required Fields</h3>
        <ul className="text-green-800 text-sm space-y-1">
          <li>• Policy Number</li>
          <li>• Claim Date</li>
          <li>• Claim Amount</li>
          <li>• Policy Type</li>
        </ul>
      </div>
      
      <div className="bg-yellow-50 p-4 rounded-lg">
        <AlertTriangle className="text-yellow-600 mb-2" size={24} />
        <h3 className="font-medium text-yellow-900 mb-2">Data Format</h3>
        <ul className="text-yellow-800 text-sm space-y-1">
          <li>• Dates: YYYY-MM-DD</li>
          <li>• Numbers: No special chars</li>
          <li>• Text: UTF-8 encoded</li>
          <li>• No empty required fields</li>
        </ul>
      </div>
    </div>
  </div>
);