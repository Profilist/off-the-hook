import React, { useEffect, useRef } from "react";
import "./falling-money.css";

const FallingMoney = () => {
  const containerRef = useRef(null);

  const createDollar = () => {
    const dollar = document.createElement("div");
    const size = Math.random() * 12;
    const duration = Math.random() * 3;

    dollar.className = "dollar";
    dollar.style.position = "absolute";
    dollar.style.left = Math.random() * containerRef.current.offsetWidth + "px"; // Adjust left position relative to the container
    dollar.style.fontSize = 40 + size + "px";
    dollar.style.animationDuration = 4 + duration + "s";
    dollar.textContent = "$";

    if (containerRef.current) {
      containerRef.current.appendChild(dollar);
    }

    setTimeout(() => {
      if (containerRef.current && dollar.parentNode === containerRef.current) {
        containerRef.current.removeChild(dollar);
      }
    }, 5000);
  };

  useEffect(() => {
    const interval = setInterval(createDollar, 300);
    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return <div ref={containerRef} className="dollars-container" />;
};

export default FallingMoney;
