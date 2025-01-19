import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Login from './components/phishing/login';
import Terminal from './components/hacker-side/terminal';
import Hacked from './components/phishing/hacked';
import HackerPerspective from './components/hacker-side/hackerperspective';
import Statistics from './components/hacker-side/statistics';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App
