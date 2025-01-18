import React from 'react';
import './navbar.css';

const Navbar = ({ setActivePage }) => {
  return (
    <>
    <div className='nav'>
        <button className='navbutton' onClick={() => setActivePage('stats')}>stats</button>
        <button className='navbutton'onClick={() => setActivePage('terminal')}>terminal</button>
        <button className='navbutton' onClick={() => setActivePage('learn')}>learn</button>
    </div>
    
    </>

  );
};

export default Navbar;
