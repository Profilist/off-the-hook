import React from 'react'
import Navbar from '../nav/navbar';
import { useState, useEffect } from 'react';
import Statistics from './statistics';
import Terminal from './terminal';
import Leaderboard from './leaderboard';

const HackerPerspective = () => {
  const [page, setPage] = useState("statistics"); // Default page

  const renderPage = () => {
    switch (page) {
      case "statistics":
        return <Statistics />;
      case "terminal":
        return <Terminal />;
      case "leaderboard":
        return <Leaderboard />;
    }
  };

  return (
    <div>
      <Navbar setPage={setPage} />
      <div className="page-content">{renderPage()}</div>
    </div>
  );
  
}

export default HackerPerspective