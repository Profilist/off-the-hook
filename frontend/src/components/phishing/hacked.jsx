import React, { useState, useEffect, useCallback } from "react";
import { motion, } from "framer-motion";
import MatrixRain from "../graphics/matrix-rain";
import Book from "../graphics/book";
import HackerPerspective from "../hacker-side/hackerperspective";
import styles from './hacked.module.css'

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function Hacked() {
  const [text, setText] = useState("YOU GOT HACKED");
  const [isHacker, setIsHacker] = useState(false);
  const [subText, setSubText] = useState(
    "Learn how to prevent phishing attacks and secure your information."
  );
  const [showTransition, setShowTransition] = useState(false);
  const [showHackerPerspective, setShowHackerPerspective] = useState(false);

  useEffect(() => {
    document.title = "Off The Hook";
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.rel = 'icon';
    link.href = '/OffTheHook.png';
    document.head.appendChild(link);
  }, []);

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
    const start = window.pageYOffset;
    const duration = 1000;
    const startTime = performance.now();

    const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

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
      setShowTransition(true);
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowHackerPerspective(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setShowTransition(false);
    } else {
      smoothScrollToTop();
      setIsHacker(true);
      setSubText("Now it's time to teach others to not make the same mistake.");
    }
  };

  return (
    <div className="relative min-h-screen bg-transparent text-white overflow-hidden flex flex-col">
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
        <div className="flex flex-col justify-center items-center h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header Section */}
          <div className="relative z-10 w-full text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className={`${
                isHacker ? "text-[#00FF00]" : "text-red-600"
              } font-mono text-[clamp(2.5rem,8vw,8rem)] leading-tight mb-8`}
            >
              {text}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-gray-300 text-xl max-w-3xl mx-auto"
            >
              {subText}
            </motion.p>
          </div>

          {/* Book Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="relative z-10 w-full mb-16"
          >
            <Book isHacker={isHacker} />
          </motion.div>

          {/* Button Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="relative z-10"
          >
            {!isHacker ? (
              <button
                onClick={handleSwitchSides}
                className={styles.button}
              >
                <span>SWITCH SIDES</span>
              </button>
            ) : (
              <button
                onClick={handleSwitchSides}
                className={styles.glitchButton}
                data-text="GET STARTED"
              >
                GET STARTED
              </button>
            )}
          </motion.div>
        </div>
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
