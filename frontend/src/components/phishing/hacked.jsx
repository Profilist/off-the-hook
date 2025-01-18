import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import MatrixRain from "../graphics/matrix-rain";
import Book from "../graphics/book";
import Statistics from "../hacker-side/statistics";
import HackerPerspective from "../hacker-side/hackerperspective";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function Hacked() {
  const [text, setText] = useState("YOU JUST GOT HACKED");
  const [isHacker, setIsHacker] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [subText, setSubText] = useState(
    "Learn how to prevent phishing attacks and secure your information."
  );

  const scrambleText = useCallback(() => {
    let iteration = 0;
    const originalText = isHacker ? "WELCOME HACKER" : "YOU JUST GOT HACKED";

    const interval = setInterval(() => {
      setText((prevText) =>
        originalText
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return originalText[index];
            }
            return letters[Math.floor(Math.random() * 26)];
          })
          .join("")
      );

      if (iteration >= originalText.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [isHacker]);

  useEffect(() => {
    scrambleText();
  }, [scrambleText, isHacker]);

  const handleSwitchSides = () => {
    if (isHacker) {
      setShowStats(true);
    } else {
      setIsHacker(true);
      setSubText(
        "Time to teach others the same lesson - for educational purposes only."
      );
    }
  };

  return (
    <div className="relative min-h-screen bg-transparent text-white overflow-hidden">
      <MatrixRain color={isHacker ? "#00cc33" : "#cc0000"} />

      {showStats ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <HackerPerspective />
        </motion.div>
      ) : (
        <>
          {/* Header Section */}
          <div className="relative z-10 pt-8 pb-12">
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className={`text-center ${
                isHacker ? "text-[#00FF00]" : "text-red-600"
              } font-mono text-[clamp(3rem,10vw,10rem)] 
                px-[clamp(1rem,2vw,3rem)] rounded-[clamp(0.4rem,0.75vw,1rem)]`}
            >
              {text}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-center mt-6 text-lg text-gray-300"
            >
              {subText}
            </motion.p>
          </div>

          {/* Book Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="relative z-10 w-full max-w-[1400px] mx-auto px-4"
          >
            <Book isHacker={isHacker} />
          </motion.div>

          {/* Switch Sides Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="relative z-10 flex justify-center mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSwitchSides}
              className={`px-8 py-4 ${
                isHacker ? "bg-[#00FF00] text-black" : "bg-red-600 text-white"
              } 
                font-bold text-xl rounded-lg shadow-lg transition-colors duration-300
                ${isHacker ? "hover:bg-[#00CC00]" : "hover:bg-red-700"}`}
            >
              {isHacker ? "GET STARTED" : "SWITCH SIDES"}
            </motion.button>
          </motion.div>

          
          {/* Footer Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
            className="relative z-10 text-center py-8 mt-8"
          ></motion.div>
        </>
      )}
    </div>
  );
}
