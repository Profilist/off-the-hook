import React from 'react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Navbar from '../nav/navbar';

const Statistics = () => {
    const [data, setData] = useState([]);
  
    useEffect(() => {
        fetch('https://rbc-security.onrender.com/users/most_loot')
          .then((response) => response.json())
          .then((data) => setData(data));
    }, []);
      
     
  // Hardcoded statistics for now
  const stats = {
    totalMoney: data.reduce((acc, row) => acc + row.loot, 0),
    totalVictims: data.length,
    averagePerVictim: data.reduce((acc, row) => acc + row.loot, 0) / data.length,
    lastHack: '2 minutes ago'
  };
  

  return (
    <div className="min-h-screen bg-black text-green-500 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-2 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <StatCard
            title="Total Money Stolen"
            value={stats.totalMoney.toLocaleString()}
          />
          <StatCard
            title="Total Victims"
            value={stats.totalVictims.toLocaleString()}
          />
          <StatCard
            title="Average per Victim"
            value={`$${stats.averagePerVictim.toLocaleString()}`}
          />
          <StatCard
            title="Last Hack"
            value={stats.lastHack}
          />
        </motion.div>

        {/* Money Vacuum Animation Container */}
        <motion.div 
          className="w-full h-96 border-2 border-green-500 rounded-lg p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-center text-gray-500">
            Money Vacuum Animation Placeholder
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value }) => (
  <motion.div 
    className="bg-black border border-green-500 rounded-lg p-6 shadow-lg"
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <h3 className="text-sm uppercase tracking-wider mb-2 opacity-80">{title}</h3>
    <p className="text-3xl font-bold">{value}</p>
  </motion.div>
);

export default Statistics;
