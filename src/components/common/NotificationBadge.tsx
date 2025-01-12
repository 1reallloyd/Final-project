import React from 'react';
import { motion } from 'framer-motion';

interface NotificationBadgeProps {
  count: number;
}

export const NotificationBadge: React.FC<NotificationBadgeProps> = ({ count }) => (
  <motion.span
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
  >
    {count}
  </motion.span>
);