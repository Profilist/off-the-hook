import React, { useState, useEffect } from 'react';
import './terminal.css';
import Navbar from '../nav/navbar';

const Terminal = () => {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState([]);
  const [email, setEmail] = useState(false)

  const handleKeyPress = (e) => {
    
    if (e.key === 'Enter') {
    
      if (command === '/help') {
        setOutput((prev) => [...prev, `/ $> ${command}`, 
          'Available Commands:\n/help - Show this help message\n/email - Send out a phishing email\n/learn Learn more about phishing']);
          setCommand('');
      }
      else if (command === '/email') {
        setOutput((prev) => [...prev, `/ $> ${command}`, 
          'Who is your target?']);
          setCommand('');
          setEmail(true)          
      }
      else if (email) {
        setOutput((prev) => [...prev, `/ $> ${command}`, 
          'Target locked.']);
          setCommand('');
          console.log("send email to", command)
          //DO SOMETHING TO CONNECT WITH BACKEND AND SEND THE EMAIL
          setEmail(false)
      }

      else {
        setOutput((prev) => [...prev,`/ $> ${command}`]);
        setCommand('');
      }
        
    } else if (e.key === 'Backspace') {
      setCommand((prev) => prev.slice(0, -1));
    } else if (e.key.length === 1) { 
    
      setCommand((prev) => prev + e.key);
    }
  };

  return (
    <div className='terminalWrap'>
    <div className="terminal">
        <div className="typewriter">
            <h1>Now it's your turn to scam some people.</h1>
        </div>
    <div className="output">
        {output.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
      <div className="input">
        <span className="prompt">/ $&gt;</span>
        <input
          type="text"
          value={command}
          onChange={() => {}}
          onKeyDown={handleKeyPress}
          autoFocus
          className="command-line"
        />
      </div>
    </div>
    </div>
  );
};

export default Terminal;
