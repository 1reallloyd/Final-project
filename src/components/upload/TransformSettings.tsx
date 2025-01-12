import React from 'react';

interface TransformSettingsProps {
  settings: {
    autoFillMissing: boolean;
    removeDuplicates: boolean;
    normalizeData: boolean;
    customMapping: Record<string, string>;
  };
  onSettingsChange: (settings: any) => void;
}

export const TransformSettings: React.FC<TransformSettingsProps> = ({ settings, onSettingsChange }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 mb-8">
    <h4 className="text-lg font-semibold mb-4">Transform Settings</h4>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h5 className="font-medium mb-3">Column Mapping</h5>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
            <span>Claim_Amount</span>
            <span className="text-primary">→</span>
            <span>Amount</span>
          </div>
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
            <span>Policy_Type</span>
            <span className="text-primary">→</span>
            <span>Type</span>
          </div>
        </div>
      </div>
      <div>
        <h5 className="font-medium mb-3">Data Cleaning</h5>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={settings.autoFillMissing}
              onChange={() => onSettingsChange({
                ...settings,
                autoFillMissing: !settings.autoFillMissing
              })}
              className="form-checkbox text-primary"
            />
            <span>Auto-fill missing values</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={settings.removeDuplicates}
              onChange={() => onSettingsChange({
                ...settings,
                removeDuplicates: !settings.removeDuplicates
              })}
              className="form-checkbox text-primary"
            />
            <span>Remove duplicates</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={settings.normalizeData}
              onChange={() => onSettingsChange({
                ...settings,
                normalizeData: !settings.normalizeData
              })}
              className="form-checkbox text-primary"
            />
            <span>Normalize data formats</span>
          </label>
        </div>
      </div>
    </div>
  </div>
);