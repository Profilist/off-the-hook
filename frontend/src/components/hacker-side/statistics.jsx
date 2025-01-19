import React from 'react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Money from '../graphics/falling-money'

const TypewriterEffect = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, 20); // Typing Speed
      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  return <p className="text-white text-left text-lg font-semibold mb-4">{displayedText}</p>;
};

const Statistics = ({ userId }) => {
    const [data, setData] = useState([]);
    const [victimStory, setVictimStory] = useState('');
  
    useEffect(() => {
        // console.log(userId)
        fetch(`https://rbc-security.onrender.com/users/get-user/${userId}`)
          .then((response) => response.json())
          .then((data) => setData(data.user));
        
        fetch('https://rbc-security.onrender.com/users/victim_story')
          .then((response) => response.json())
          .then((storyData) => {
              if (storyData.story) {
                  setVictimStory(storyData.story);
              }
          });
        console.log(victimStory)
    }, [userId]);
      

  const stats = {
    fname: data.fname,
    lname: data.lname,
    totalMoney: data.loot,
    totalVictims: data.victims,
    averagePerVictim: data.victims == 0 ? 0 : data.loot / data.victims,
    lastHack: data.last_hack
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
            title="First Name"
            value={stats.fname}
          />
          <StatCard
            title="Last Name"
            value={stats.lname}
          />
          <StatCard
            title="Total Money Stolen"
            value={stats.totalMoney}
          />
          <StatCard
            title="Total Victims"
            value={stats.totalVictims}
          />
          <StatCard
            title="Average per Victim"
            value={`$${stats.averagePerVictim}`}
          />
          <StatCard
            title="Last Hack"
            value={stats.lastHack}
          />
        </motion.div>

        {/* Money Animation */}
        
        <motion.div 
          className="w-full h-96 border-2 border-green-500 rounded-lg p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-center text-gray-500">
            <TypewriterEffect text={victimStory} />
            <Money />
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
