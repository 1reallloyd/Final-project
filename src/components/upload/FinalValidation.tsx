import React from 'react';
import { CheckCircle, Download, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export const FinalValidation = ({ isValid, issues }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Final Validation</h3>

      {isValid ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-green-50 border border-green-200 rounded-lg p-4"
        >
          <div className="flex items-center space-x-3">
            <CheckCircle className="text-green-600" size={24} />
            <div>
              <h4 className="font-medium text-green-900">Validation Passed</h4>
              <p className="text-sm text-green-800">Dataset is ready for upload</p>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
        >
          <div className="flex items-center space-x-3">
            <AlertTriangle className="text-yellow-600" size={24} />
            <div>
              <h4 className="font-medium text-yellow-900">Issues Found</h4>
              <p className="text-sm text-yellow-800">Please resolve the following issues:</p>
            </div>
          </div>
          <ul className="mt-3 space-y-2">
            {issues.map((issue, index) => (
              <li key={index} className="text-sm text-yellow-800 flex items-center space-x-2">
                <span>•</span>
                <span>{issue}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      <div className="mt-6 flex justify-between items-center">
        <button className="flex items-center space-x-2 px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors duration-200">
          <Download size={16} />
          <span>Download Validated Dataset</span>
        </button>
        
        <button 
          disabled={!isValid}
          className={`px-6 py-2 rounded-lg flex items-center space-x-2 ${
            isValid 
              ? 'bg-primary text-white hover:bg-primary-dark' 
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          } transition-colors duration-200`}
        >
          <span>Proceed to Upload</span>
        </button>
      </div>
    </div>
  );
};