// src/components/Navbar.jsx
import React from "react";
import './navbar.css'

const Navbar = ({ setPage }) => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <nav className="nav">
      
        <button className="navbutton" onClick={() => setPage("statistics")}>stats</button>
        <button className="navbutton" onClick={() => setPage("terminal")}>terminal</button>
        <button className="navbutton" onClick={() => setPage("leaderboard")}>leaderboard</button>
        <button className="navbutton" onClick={handleRefresh}> sign out </button>
        

    </nav>
  );
};

export default Navbar;
