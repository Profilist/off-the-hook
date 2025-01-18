import { useState } from 'react'
import './App.css'
import Login from './components/phishing/login';
import Money from './components/phishing/money';
import Terminal from './components/hacker-side/terminal';
import Hacked from './components/phishing/hacked';
import HackerPerspective from './components/hacker-side/hackerperspective';
import Statistics from './components/hacker-side/statistics';
import ControlPanel from './components/control-panel';

function App() {
  return (
    <>
      <Login/>
      {/* <HackerPerspective /> */}
      
    </>
  )
}

export default App
