import React, { useState, useEffect } from 'react';
import './terminal.css';
import Navbar from '../nav/navbar';

const Terminal = () => {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState([]);
  const [emailStage, setEmailStage] = useState(0)

  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [chatting, setChatting] = useState(false);
  const [gpt, setGpt] = useState('chatgpt response');

    
    const sendEmail = async (e) => {
      try {
        console.log(email)
        console.log(subject)
        console.log(content)
        console.log('sending email')
        const response = await fetch('http://localhost:5000/email/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to_email: email,
            subject: subject,
            html_content: content,
          }),
        });

    
        const data = await response.json();
    
        if (!response.ok) {
          throw new Error(data.error || 'Failed to send email');
        }
    
      } catch (error) {
        console.log('Error:', error);
      }
    };

    const getGpt = (e, command) => {
      setGpt(command)
      /*
      fetch('http://localhost:5000/gpt-endpoint', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ input: command })
      })
      .then(response => response.json())
      .then(data => {
          if (data.generated_text) {
              setGpt(data.generated_text);
          } else {
              setError('Error generating text.');
          }
      })
      .catch(err => {
          setError('Error communicating with the backend.');
      });
      */
  }
  
    
    const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (command === '/help') {
        setOutput((prev) => [...prev, `/ $> ${command}`, 
          'Available Commands:\n/help - Show this help message\n/email - Send out a phishing email\n/learn - Learn more about phishing']);
          setCommand('');
      }
      else if (command === '/email') {
        setOutput((prev) => [...prev, `/ $> ${command}`, 
          'Who is your target?']);
          setCommand('');
          setEmailStage(1)          
      }
      else if (emailStage === 1) {
        setOutput((prev) => [...prev, `/ $> ${command}`, 
          'What is the subject?']);      
          setEmail(command);
          setCommand('');
          setEmailStage(2)
      }

      else if (emailStage === 2) {
        setOutput((prev) => [...prev, `/ $> ${command}`, 
          'What is the body?']);
          setSubject(command);
          setCommand('');
          setEmailStage(3)
      }

      else if (emailStage === 3) {
        setOutput((prev) => [...prev, `/ $> ${command}`, 
          'Enter to Send Email']);
          setContent(command);
          setCommand('');
          setEmailStage(4)
      }

      else if (emailStage === 4) {
        setOutput((prev) => [...prev, `/ $> ${command}`, 'Email Sent!']);
        sendEmail();
        setEmailStage(0);
        setEmail('');  
        setSubject('');
        setContent('');
      }
      

      else if (command === '/learn') {
        setOutput((prev) => [...prev, `/ $> ${command}`, 
          'Hello, I am the Scam Bot. I am here to teach you how to scam people. Do you have any questions?']);
          setCommand('');
          setChatting(true);
      }

      else if (command === 'quit' && chatting) {
          setOutput((prev) => [...prev, `/ $> ${command}`, 
          'See you soon!']);
          setCommand('');
          setChatting(false)
      }

      else if (chatting) {
        getGpt((prev) => [...prev, `/ $> ${command}`, 
          'See you soon!'])
        setOutput((prev) => [...prev, `/ $> ${command}`, 
        gpt]);
        setCommand('');
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
