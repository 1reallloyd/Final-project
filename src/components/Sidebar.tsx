import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Upload,
  AlertTriangle,
  LineChart,
  FileBarChart,
  Settings,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Shield
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Upload, label: 'Upload Dataset', path: '/upload' },
  { icon: AlertTriangle, label: 'Fraud Detection', path: '/fraud' },
  { icon: LineChart, label: 'Claims Prediction', path: '/predictions' },
  { icon: FileBarChart, label: 'Reports & Insights', path: '/reports' },
  { icon: Settings, label: 'Settings', path: '/settings' }
];

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <motion.div
      initial={{ width: 240 }}
      animate={{ width: isCollapsed ? 80 : 240 }}
      className="h-screen bg-[#1a237e] text-white p-4 flex flex-col shadow-[4px_0_10px_rgba(0,0,0,0.2)] z-50"
    >
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-3">
          <div className="bg-white/10 p-2 rounded-lg">
            <Shield size={24} className="text-white" />
          </div>
          {!isCollapsed && (
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-bold"
            >
              Insurance Group
            </motion.h2>
          )}
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="flex-1">
        {menuItems.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center p-3 mb-2 rounded-lg cursor-pointer transition-all duration-200 ${
              location.pathname === item.path 
                ? 'bg-white/20 shadow-lg' 
                : 'hover:bg-white/10'
            }`}
            onClick={() => navigate(item.path)}
          >
            <div className={`${location.pathname === item.path ? 'bg-white/10' : ''} p-2 rounded-lg`}>
              <item.icon size={20} className="min-w-[20px]" />
            </div>
            {!isCollapsed && (
              <span className="ml-3 font-medium">
                {item.label}
              </span>
            )}
          </motion.div>
        ))}
      </nav>
    </motion.div>
  );
};