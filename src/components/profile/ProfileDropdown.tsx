import React from 'react';
import { motion } from 'framer-motion';
import { Settings, HelpCircle, LogOut } from 'lucide-react';

interface ProfileDropdownProps {
  user: {
    name: string;
    email: string;
    role: string;
  };
  onSignOut: () => void;
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ user, onSignOut }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 10 }}
    className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg overflow-hidden"
  >
    <div className="p-4 bg-primary text-white">
      <p className="font-medium">{user.name}</p>
      <p className="text-sm opacity-90">{user.email}</p>
      <p className="text-xs mt-1 opacity-75">{user.role}</p>
    </div>

    <div className="py-2">
      <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2">
        <Settings size={16} className="text-gray-500" />
        <span>Account Settings</span>
      </button>
      <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2">
        <HelpCircle size={16} className="text-gray-500" />
        <span>Help & Support</span>
      </button>
      <button 
        onClick={onSignOut}
        className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-50 flex items-center space-x-2"
      >
        <LogOut size={16} />
        <span>Sign out</span>
      </button>
    </div>
  </motion.div>
);