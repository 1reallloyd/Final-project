import React, { useState } from 'react';
import { Download, Filter } from 'lucide-react';

export const Reports = () => {
  const [exportSettings, setExportSettings] = useState({
    includeCharts: true,
    rawData: false,
    predictionMetrics: true
  });

  const reports = [
    {
      title: 'Monthly Claims Summary',
      date: '2024-02-28',
      type: 'PDF',
      size: '2.4 MB'
    },
    {
      title: 'Fraud Detection Report',
      date: '2024-02-27',
      type: 'XLSX',
      size: '1.8 MB'
    },
    {
      title: 'Prediction Accuracy Analysis',
      date: '2024-02-26',
      type: 'PDF',
      size: '3.1 MB'
    },
    {
      title: 'Risk Assessment Report',
      date: '2024-02-25',
      type: 'PDF',
      size: '2.9 MB'
    }
  ];

  const handleSettingChange = (setting: keyof typeof exportSettings) => {
    setExportSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <div className="flex-1 p-8 bg-gray-50 overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Reports & Insights</h2>
        <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-200">
          <Filter size={16} />
          <span>Filter</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="grid grid-cols-1 gap-4">
            {reports.map((report, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">{report.title}</h3>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-gray-500">
                      Generated on {report.date}
                    </span>
                    <span className="text-sm text-gray-500">{report.type}</span>
                    <span className="text-sm text-gray-500">{report.size}</span>
                  </div>
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 text-primary hover:bg-primary hover:text-white rounded-lg border border-primary transition-all duration-200">
                  <Download size={16} />
                  <span>Download</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Schedule Reports</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Report Type
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                <option>Monthly Summary</option>
                <option>Fraud Analysis</option>
                <option>Prediction Report</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Frequency
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
            <button className="w-full bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors duration-200">
              Schedule Report
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Export Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Include Charts</span>
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-primary"
                checked={exportSettings.includeCharts}
                onChange={() => handleSettingChange('includeCharts')}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Raw Data Export</span>
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-primary"
                checked={exportSettings.rawData}
                onChange={() => handleSettingChange('rawData')}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Prediction Metrics</span>
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-primary"
                checked={exportSettings.predictionMetrics}
                onChange={() => handleSettingChange('predictionMetrics')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};