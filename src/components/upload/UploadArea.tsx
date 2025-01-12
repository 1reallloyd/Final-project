import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { motion } from 'framer-motion';

export const UploadArea = ({ onFileUpload, progress }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    onFileUpload(file);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <motion.div
        whileHover={{ scale: 1.01 }}
        className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors duration-200 
          ${isDragging ? 'border-primary bg-primary/5' : 'border-gray-300'}`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <Upload size={48} className="mx-auto mb-4 text-primary" />
        <h3 className="text-lg font-medium mb-2">
          Drag and drop your file here
        </h3>
        <p className="text-gray-500 mb-4">or</p>
        <label className="inline-block">
          <input
            type="file"
            accept=".csv,.xlsx,.json"
            onChange={(e) => onFileUpload(e.target.files[0])}
            className="hidden"
          />
          <span className="px-6 py-2 bg-primary text-white rounded-lg cursor-pointer hover:bg-primary-dark transition-colors duration-200">
            Browse Files
          </span>
        </label>
      </motion.div>

      {progress > 0 && progress < 100 && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Uploading... {progress}%
          </p>
        </div>
      )}
    </div>
  );
};