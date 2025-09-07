import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import { ToastContainer } from './NotificationToast';
import { useToast } from '../hooks/useToast';

const Layout: React.FC = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pt-16"
      >
        <Outlet />
      </motion.main>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
};

export default Layout;