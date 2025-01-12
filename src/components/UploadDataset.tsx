import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { motion } from 'framer-motion';
import { Instructions } from './upload/Instructions';
import { DataPreview } from './upload/DataPreview';
import { ValidationResults } from './upload/ValidationResults';
import { TransformationPanel } from './upload/TransformationPanel';
import { FinalValidation } from './upload/FinalValidation';

export const UploadDataset = () => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [validationResults, setValidationResults] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [validationIssues] = useState([
    'Some rows have missing policy numbers',
    'Duplicate claim IDs detected',
    'Invalid date format in 3 rows'
  ]);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const handleFileUpload = (file) => {
    setFile(file);
    simulateUpload();
  };

  const simulateUpload = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setValidationResults({
          totalRows: 100,
          validRows: 85,
          missingValues: 8,
          duplicates: 7,
          invalidFormats: 5
        });
      }
    }, 200);
  };

  return (
    <div className="flex-1 p-8 bg-gray-50 overflow-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Upload Dataset</h2>
      
      <Instructions />

      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors duration-200
            ${isDragging ? 'border-primary bg-primary/5' : 'border-gray-300'}`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <Upload size={48} className="mx-auto mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2">
            Drag and drop your dataset here
          </h3>
          <p className="text-gray-500 mb-4">or</p>
          <label className="inline-block">
            <input
              type="file"
              accept=".csv,.xlsx,.json"
              onChange={(e) => handleFileUpload(e.target.files[0])}
              className="hidden"
            />
            <span className="px-6 py-3 bg-primary text-white rounded-lg cursor-pointer hover:bg-primary-dark transition-colors duration-200">
              Browse Files
            </span>
          </label>
        </motion.div>

        {uploadProgress > 0 && (
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Uploading...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${uploadProgress}%` }}
                className="bg-primary h-2 rounded-full"
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        )}
      </div>

      {uploadProgress === 100 && (
        <>
          <ValidationResults results={validationResults} />
          <DataPreview />
          <TransformationPanel />
          <FinalValidation isValid={isValid} issues={validationIssues} />
        </>
      )}
    </div>
  );
};