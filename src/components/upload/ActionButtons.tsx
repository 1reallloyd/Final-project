import React from 'react';
import { Save, Download, RefreshCw } from 'lucide-react';

export const ActionButtons = () => (
  <div className="flex justify-between items-center">
    <div className="flex space-x-4">
      <button className="flex items-center space-x-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-200">
        <Save size={16} />
        <span>Save Changes</span>
      </button>
      <button className="flex items-center space-x-2 px-6 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors duration-200">
        <Download size={16} />
        <span>Download Transformed</span>
      </button>
    </div>
    <button className="flex items-center space-x-2 px-6 py-2 text-gray-600 hover:text-gray-900 transition-colors duration-200">
      <RefreshCw size={16} />
      <span>Reset</span>
    </button>
  </div>
);