import { motion } from 'framer-motion';
import { useState } from 'react';

const ControlPanel = () => {
  const [commandHistory, setCommandHistory] = useState([]);
  const [currentCommand, setCurrentCommand] = useState('');

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    if (currentCommand.trim()) {
      setCommandHistory([...commandHistory, currentCommand]);
      setCurrentCommand('');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-900 text-green-500 p-4 font-mono"
    >
      {/* Terminal Header */}
      <div className="border-b border-green-500 pb-2 mb-4">
        <h1 className="text-xl">Hacker Terminal v1.0</h1>
      </div>

      {/* Terminal Output */}
      <div className="mb-4">
        {commandHistory.map((cmd, index) => (
          <div key={index} className="mb-2">
            <span className="text-green-300">$ </span>
            <span>{cmd}</span>
          </div>
        ))}
      </div>

      {/* Command Input */}
      <form onSubmit={handleCommandSubmit} className="flex items-center">
        <span className="text-green-300 mr-2">$ </span>
        <input
          type="text"
          value={currentCommand}
          onChange={(e) => setCurrentCommand(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-green-500"
          autoFocus
        />
      </form>
    </motion.div>
  );
};

export default ControlPanel;
