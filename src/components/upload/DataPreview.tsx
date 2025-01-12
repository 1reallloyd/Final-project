import React from 'react';
import { Filter, ArrowDownWideNarrow, Settings } from 'lucide-react';

const sampleData = [
  {
    id: 1,
    date: '2024-03-01',
    policyType: 'Auto Insurance',
    claimAmount: 5000,
    location: 'Accra',
    status: 'Pending'
  },
  {
    id: 2,
    date: '2024-03-02',
    policyType: 'Property Insurance',
    claimAmount: 12000,
    location: 'Kumasi',
    status: 'Approved'
  },
  {
    id: 3,
    date: '2024-03-03',
    policyType: 'Health Insurance',
    claimAmount: 3500,
    location: 'Tamale',
    status: 'Under Review'
  }
];

export const DataPreview = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Dataset Preview</h3>
        <div className="flex space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <Filter size={18} className="text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <ArrowDownWideNarrow size={18} className="text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <Settings size={18} className="text-gray-600" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Policy Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Claim Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sampleData.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.policyType}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">GH₵{row.claimAmount.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.location}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    row.status === 'Approved' ? 'bg-green-100 text-green-800' :
                    row.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};