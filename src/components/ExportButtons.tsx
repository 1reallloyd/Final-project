import React from 'react';
import { FileDown, FileText } from 'lucide-react';

export const ExportButtons = () => {
  return (
    <div className="flex space-x-3">
      <button className="flex items-center space-x-2 px-4 py-2 bg-[#1a237e] text-white rounded-lg hover:bg-[#283593] transition-colors duration-200">
        <FileDown size={16} />
        <span>Export Excel</span>
      </button>
      <button className="flex items-center space-x-2 px-4 py-2 border border-[#1a237e] text-[#1a237e] rounded-lg hover:bg-[#1a237e] hover:text-white transition-colors duration-200">
        <FileText size={16} />
        <span>Export PDF</span>
      </button>
    </div>
  );
};