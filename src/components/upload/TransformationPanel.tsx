import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, RefreshCw, Save } from 'lucide-react';

export const TransformationPanel = () => {
  const [settings, setSettings] = useState({
    autoFillMissing: true,
    removeDuplicates: true,
    normalizeData: true,
    dateFormat: 'YYYY-MM-DD',
    currencyFormat: 'GHS'
  });

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Data Transformation</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="font-medium text-gray-700 mb-4">Basic Transformations</h4>
          <div className="space-y-4">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={settings.autoFillMissing}
                onChange={() => setSettings(prev => ({ ...prev, autoFillMissing: !prev.autoFillMissing }))}
                className="form-checkbox h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary"
              />
              <span className="text-sm text-gray-700">Auto-fill missing values</span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={settings.removeDuplicates}
                onChange={() => setSettings(prev => ({ ...prev, removeDuplicates: !prev.removeDuplicates }))}
                className="form-checkbox h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary"
              />
              <span className="text-sm text-gray-700">Remove duplicate entries</span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={settings.normalizeData}
                onChange={() => setSettings(prev => ({ ...prev, normalizeData: !prev.normalizeData }))}
                className="form-checkbox h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary"
              />
              <span className="text-sm text-gray-700">Normalize data formats</span>
            </label>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-700 mb-4">Format Settings</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Date Format</label>
              <select
                value={settings.dateFormat}
                onChange={(e) => setSettings(prev => ({ ...prev, dateFormat: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Currency Format</label>
              <select
                value={settings.currencyFormat}
                onChange={(e) => setSettings(prev => ({ ...prev, currencyFormat: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="GHS">Ghana Cedi (GH₵)</option>
                <option value="USD">US Dollar ($)</option>
                <option value="EUR">Euro (€)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4 mt-8">
        <button className="px-4 py-2 text-gray-600 hover:text-gray-900 flex items-center space-x-2">
          <RefreshCw size={16} />
          <span>Reset</span>
        </button>
        <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-200 flex items-center space-x-2">
          <Save size={16} />
          <span>Apply Transformations</span>
        </button>
      </div>
    </div>
  );
};