import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { motion } from 'framer-motion';

export const ValidationResults = ({ results }) => {
  const {
    totalRows = 100,
    validRows = 85,
    missingValues = 8,
    duplicates = 7,
    invalidFormats = 5
  } = results || {};

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Validation Results</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 p-4 rounded-lg"
        >
          <div className="flex items-center space-x-2">
            <Info className="text-blue-600" size={20} />
            <span className="font-medium text-blue-900">Total Rows</span>
          </div>
          <p className="text-2xl font-bold text-blue-800 mt-2">{totalRows}</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-green-50 p-4 rounded-lg"
        >
          <div className="flex items-center space-x-2">
            <CheckCircle className="text-green-600" size={20} />
            <span className="font-medium text-green-900">Valid Rows</span>
          </div>
          <p className="text-2xl font-bold text-green-800 mt-2">{validRows}</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-yellow-50 p-4 rounded-lg"
        >
          <div className="flex items-center space-x-2">
            <AlertTriangle className="text-yellow-600" size={20} />
            <span className="font-medium text-yellow-900">Missing Values</span>
          </div>
          <p className="text-2xl font-bold text-yellow-800 mt-2">{missingValues}</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-red-50 p-4 rounded-lg"
        >
          <div className="flex items-center space-x-2">
            <AlertCircle className="text-red-600" size={20} />
            <span className="font-medium text-red-900">Issues Found</span>
          </div>
          <p className="text-2xl font-bold text-red-800 mt-2">
            {duplicates + invalidFormats}
          </p>
        </motion.div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-700 mb-3">Detailed Analysis</h4>
        <ul className="space-y-2">
          <li className="flex items-center text-sm text-gray-600">
            <span className="w-4 h-4 bg-yellow-100 rounded-full mr-2"></span>
            {missingValues} rows with missing values
          </li>
          <li className="flex items-center text-sm text-gray-600">
            <span className="w-4 h-4 bg-orange-100 rounded-full mr-2"></span>
            {duplicates} duplicate entries found
          </li>
          <li className="flex items-center text-sm text-gray-600">
            <span className="w-4 h-4 bg-red-100 rounded-full mr-2"></span>
            {invalidFormats} rows with invalid format
          </li>
        </ul>
      </div>
    </div>
  );
};