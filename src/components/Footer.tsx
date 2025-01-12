import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-white shadow-lg py-4 px-6">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} Claims Analytics. All rights reserved.
        </p>
        <div className="flex space-x-6">
          <a href="#" className="text-sm text-gray-600 hover:text-[#1a237e] transition-colors duration-200">Privacy Policy</a>
          <a href="#" className="text-sm text-gray-600 hover:text-[#1a237e] transition-colors duration-200">Terms of Service</a>
          <a href="#" className="text-sm text-gray-600 hover:text-[#1a237e] transition-colors duration-200">Contact</a>
        </div>
      </div>
    </footer>
  );
};