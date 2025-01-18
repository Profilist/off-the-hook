import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Leaderboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://rbc-security.onrender.com/users/most_loot")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const totalLoot = data.reduce((acc, row) => acc + row.loot, 0);
  const numberOfEntries = data.length;

  return (
    <div className="min-h-screen bg-black text-green-500 ">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          className={`text-center mb-8 pt-8`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-primary">Leaderboard</h1>
        </motion.div>

        {/* Table */}
        <motion.div 
          className={`border-2 border-green-500 rounded-lg shadow-lg mt-0`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <table className="table-auto w-full text-left border-collapse">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="text-center px-6 py-3 w-1/3">Rank</th>
                <th className="text-center px-6 py-3 w-1/3">Name</th>
                <th className="text-center px-6 py-3 w-1/3">Money Scammed</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "" : ""
                  } hover:bg-gray-600 transition-colors`}
                >
                  <td className="px-6 py-4 text-center text-green-400 w-1/3">{index + 1}</td>
                  <td className="px-6 py-4 text-center font-semibold w-1/3">{row.name}</td>
                  <td className="px-6 py-4 text-center text-green-300 w-1/3">${row.loot}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboard;