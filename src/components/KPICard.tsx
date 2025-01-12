import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, AlertTriangle, TrendingUp, PieChart } from 'lucide-react';

const icons = {
  claims: DollarSign,
  fraud: AlertTriangle,
  predicted: TrendingUp,
  risk: PieChart,
};

type KPICardProps = {
  title: string;
  value: string;
  change: number;
  type: keyof typeof icons;
};

export const KPICard: React.FC<KPICardProps> = ({ title, value, change, type }) => {
  const Icon = icons[type];
  
  // Format value if it's a monetary amount
  const displayValue = title === "Total Claims" ? 
    `GH₵${value.replace(/^\d+/, (n) => Number(n).toLocaleString())}` : 
    value;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200"
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <Icon className="text-[#1a237e]" size={20} />
            <p className="text-gray-500 text-sm font-medium">{title}</p>
          </div>
          <h3 className="text-2xl font-bold mt-2">{displayValue}</h3>
          <p className={`text-sm mt-2 flex items-center ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            <span className="inline-block mr-1">
              {change >= 0 ? '↑' : '↓'}
            </span>
            {Math.abs(change)}% from last month
          </p>
        </div>
      </div>
    </motion.div>
  );
};