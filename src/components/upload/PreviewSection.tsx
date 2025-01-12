import React from 'react';
import { Filter, ArrowDownWideNarrow, Settings } from 'lucide-react';

export const PreviewSection = ({ data }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold">Preview</h2>
      <div className="flex space-x-2">
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
          <Filter size={20} />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
          <ArrowDownWideNarrow size={20} />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
          <Settings size={20} />
        </button>
      </div>
    </div>

    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {['Date', 'Policy Type', 'Amount', 'Location', 'Status'].map((header) => (
              <th
                key={header}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {/* Sample data rows */}
        </tbody>
      </table>
    </div>
  </div>
);