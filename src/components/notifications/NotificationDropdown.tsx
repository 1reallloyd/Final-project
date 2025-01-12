import React from 'react';
import { motion } from 'framer-motion';
import { Bell, AlertTriangle, Info, CheckCircle } from 'lucide-react';

interface Notification {
  id: number;
  type: 'alert' | 'info' | 'success';
  message: string;
  time: string;
}

interface NotificationDropdownProps {
  notifications: Notification[];
  onViewAll: () => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ 
  notifications,
  onViewAll 
}) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle size={16} className="text-red-500" />;
      case 'info':
        return <Info size={16} className="text-blue-500" />;
      case 'success':
        return <CheckCircle size={16} className="text-green-500" />;
      default:
        return <Bell size={16} className="text-gray-500" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg"
    >
      <div className="px-4 py-2 border-b border-gray-100">
        <h3 className="font-semibold text-gray-800">Notifications</h3>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-start space-x-3"
          >
            <div className="mt-1">{getIcon(notification.type)}</div>
            <div>
              <p className="text-sm text-gray-800">{notification.message}</p>
              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 py-2 border-t border-gray-100">
        <button 
          onClick={onViewAll}
          className="text-sm text-primary hover:text-primary-dark"
        >
          View all notifications
        </button>
      </div>
    </motion.div>
  );
};