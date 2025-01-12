import React from 'react';
import { motion } from 'framer-motion';

type ChartCardProps = {
  title: string;
  children: React.ReactNode;
};

export const ChartCard: React.FC<ChartCardProps> = ({ title, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200"
    >
      <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>
      <div className="h-[300px] flex items-center justify-center">
        {children}
      </div>
    </motion.div>
  );
};