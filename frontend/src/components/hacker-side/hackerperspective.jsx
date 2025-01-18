import React from 'react'
import { motion } from 'framer-motion';
import Navbar from '../nav/navbar';
import { useState } from 'react';
import Statistics from './statistics';
import Terminal from './terminal';
import Leaderboard from './leaderboard';

const HackerPerspective = () => {
  const [page, setPage] = useState("statistics"); // Default page

  const renderPage = () => {
    switch (page) {
      case "statistics":
        return <Statistics />;
      case "terminal":
        return <Terminal />;
      case "leaderboard":
        return <Leaderboard />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black"
    >
      <Navbar setPage={setPage} />
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="page-content"
      >
        {renderPage()}
      </motion.div>
    </motion.div>
  );
  
}

export default HackerPerspective