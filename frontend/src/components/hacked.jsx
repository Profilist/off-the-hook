import React from 'react';
import { motion } from 'framer-motion';

export default function Hacked() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center text-red-600 font-bold text-4xl"
      >
        You just got hacked
      </motion.div>
      <p className="mt-6 text-lg text-gray-300">
        Learn how to prevent phishing attacks and secure your information.
      </p>
    </div>
  );
}
