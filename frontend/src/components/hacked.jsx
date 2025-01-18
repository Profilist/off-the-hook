import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function Hacked() {
  const [text, setText] = useState("YOU JUST GOT HACKED");
  
  const scrambleText = useCallback(() => {
    let iteration = 0;
    const originalText = "YOU JUST GOT HACKED";
    
    const interval = setInterval(() => {
      setText(prevText => 
        prevText
          .split("")
          .map((letter, index) => {
            if(index < iteration) {
              return originalText[index];
            }
            return letters[Math.floor(Math.random() * 26)]
          })
          .join("")
      );
      
      if(iteration >= originalText.length){ 
        clearInterval(interval);
      }
      
      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    scrambleText();
  }, [scrambleText]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden">
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center w-full text-red-600 font-mono text-[clamp(3rem,10vw,10rem)] 
          px-[clamp(1rem,2vw,3rem)] rounded-[clamp(0.4rem,0.75vw,1rem)] z-10"
      >
        {text}
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-6 text-lg text-gray-300 z-10"
      >
        Learn how to prevent phishing attacks and secure your information.
      </motion.p>
    </div>
  );
}
