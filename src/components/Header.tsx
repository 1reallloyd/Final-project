import React, { useState } from 'react';
import { Bell, User, Search, Settings, LogOut, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthContext } from '../context/AuthContext';

export const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { user, signOut } = useAuthContext();

  const notifications = [
    {
      id: 1,
      type: 'alert',
      message: 'High risk claim detected',
      time: '5 minutes ago'
    },
    {
      id: 2,
      type: 'info',
      message: 'New dataset uploaded successfully',
      time: '1 hour ago'
    },
    {
      id: 3,
      type: 'warning',
      message: 'System update scheduled for maintenance',
      time: '2 hours ago'
    }
  ];

  return (
    <header className="bg-white shadow-lg px-6 py-4 relative">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-[#1a237e]">Claims Analytics</h1>
          <div className="hidden md:flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none outline-none text-sm w-64"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button 
              className="p-2 hover:bg-gray-100 rounded-full relative transition-colors duration-200"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-50"
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-800">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
                      >
                        <p className="text-sm text-gray-800">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-gray-100">
                    <button className="text-sm text-primary hover:text-primary-dark">
                      View all notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors duration-200"
              onClick={() => setShowProfile(!showProfile)}
            >
              <div className="w-8 h-8 bg-[#1a237e] rounded-full flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">Admin</span>
            </button>

            <AnimatePresence>
              {showProfile && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-50"
                >
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="font-medium text-gray-800">John Doe</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                  
                  <div className="py-2">
                    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                      <Settings size={16} />
                      <span>Settings</span>
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                      <HelpCircle size={16} />
                      <span>Help & Support</span>
                    </button>
                    <button 
                      onClick={signOut}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 flex items-center space-x-2"
                    >
                      <LogOut size={16} />
                      <span>Sign out</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};