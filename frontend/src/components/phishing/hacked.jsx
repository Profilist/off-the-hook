import React, { useState, useEffect, useCallback } from "react";
import { motion, useScroll, useAnimationControls } from "framer-motion";
import MatrixRain from "../graphics/matrix-rain";
import Book from "../graphics/book";
import Statistics from "../hacker-side/statistics";
import HackerPerspective from "../hacker-side/hackerperspective";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function Hacked() {
  const { scrollY } = useScroll();
  const controls = useAnimationControls();
  const [text, setText] = useState("YOU GOT HACKED");
  const [isHacker, setIsHacker] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [subText, setSubText] = useState(
    "Learn how to prevent phishing attacks and secure your information."
  );
  const [showTransition, setShowTransition] = useState(false);
  const [showHackerPerspective, setShowHackerPerspective] = useState(false);

  const scrambleText = useCallback(() => {
    let iteration = 0;
    const originalText = isHacker ? "WELCOME HACKER" : "YOU GOT HACKED";

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

  const smoothScrollToTop = () => {
    const duration = 1000; // Duration in milliseconds
    const start = window.pageYOffset;
    const startTime = performance.now();

    const easeOutCubic = t => 1 - Math.pow(1 - t, 3); // Cubic easing function

    const animateScroll = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const eased = easeOutCubic(progress);
      const currentPosition = start * (1 - eased);
      
      window.scrollTo(0, currentPosition);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  const handleSwitchSides = async () => {
    if (isHacker) {
      // Start transition animation
      setShowTransition(true);
      
      // Animate scroll to bottom
      window.scrollTo({ 
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });
      
      // Wait for scroll and fade animations
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show HackerPerspective
      setShowHackerPerspective(true);
      
      // Wait a bit before removing the overlay
      await new Promise(resolve => setTimeout(resolve, 800));
      setShowTransition(false);
    } else {
      smoothScrollToTop();
      
      // Wait for scroll animation to complete before changing state
      setTimeout(() => {
        setIsHacker(true);
        setSubText("Time to teach others the same lesson - for educational purposes only.");
      }, 1000);
    }
  };

  return (
    <div className={`relative min-h-screen ${showHackerPerspective ? 'bg-black' : 'bg-transparent'} text-white overflow-hidden flex flex-col`}>
      {!showHackerPerspective && <MatrixRain color={isHacker ? "#00cc33" : "#cc0000"} />}

      {showHackerPerspective ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-30 min-h-screen bg-black"
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
      
      {/* Transition overlay */}
      {showTransition && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 bg-black z-20"
        />
      )}
    </div>
  );
}
