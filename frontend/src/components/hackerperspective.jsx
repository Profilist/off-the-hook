import React from 'react'
import Navbar from './navbar';
import { useState, useEffect } from 'react';
import Stats from './statistics';
import Terminal from './terminal';

const HackerPerspective = () => {
    const [activePage, setActivePage] = useState('home');  // Track active page

    const renderPage = () => {
    switch (activePage) {
      case 'stats':
        return <Stats/>;
      case 'terminal':
        return <Terminal />;
      case 'learn':
        return <div>learn</div>;
    }
    };
    return (
    <div>
      <Navbar setActivePage={setActivePage} />
      {renderPage()}
    </div>
  )
}

export default HackerPerspective