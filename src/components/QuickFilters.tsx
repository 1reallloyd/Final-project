import React from 'react';
import { Filter, Calendar } from 'lucide-react';

type QuickFiltersProps = {
  dateRange: string;
  setDateRange: (range: string) => void;
};

export const QuickFilters: React.FC<QuickFiltersProps> = ({ dateRange, setDateRange }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md mb-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center space-x-2">
          <Calendar size={18} className="text-gray-500" />
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <Filter size={18} className="text-gray-500" />
          <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5">
            <option value="">All Claim Types</option>
            <option value="auto">Auto</option>
            <option value="property">Property</option>
            <option value="health">Health</option>
            <option value="life">Life</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5">
            <option value="">All Locations</option>
            <option value="north">North Region</option>
            <option value="south">South Region</option>
            <option value="east">East Region</option>
            <option value="west">West Region</option>
          </select>
        </div>
      </div>
    </div>
  );
};