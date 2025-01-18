import React, { useState, useEffect } from 'react';
import './Terminal.css';

const Terminal = () => {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState([]);

  const handleKeyPress = (e) => {
    
    if (e.key === 'Enter') {
    
      setOutput((prev) => [...prev, `$ ${command}`]);
      setCommand('');
    } else if (e.key === 'Backspace') {
      setCommand((prev) => prev.slice(0, -1));
    } else if (e.key.length === 1) { 
    
      setCommand((prev) => prev + e.key);
    }
  };

  return (
    <div className='terminalWrap'>

    
    <div className="terminal">
        <h1 style={{fontWeight: "bold"}}>Scam Some People</h1>
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
