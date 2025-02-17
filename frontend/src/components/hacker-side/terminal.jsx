import React, { useState, useEffect } from 'react';
import './terminal.css';
import Navbar from '../nav/navbar';

const Terminal = ( {userId} ) => {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState([]);
  const [emailStage, setEmailStage] = useState(0);
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [chatting, setChatting] = useState(false);
  const [gpt, setGpt] = useState('');
  const [practice, setPractice] = useState(false);
  
  const getGpt = async (q) => {
    try {
      const response = await fetch(
        'https://rbc-security.onrender.com/users/respond',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            question: q,
          }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'fail');
      }

      const data = await response.json();
      console.log(data.response)
      setOutput((prev) => [...prev, data.response])

    }catch (error){
        console.log(error)
    }
  }

  const makeUrl = async () => {
    try {
      const response = await fetch(
        'https://rbc-security.onrender.com/users/generate_login_url/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            ref_id: userId,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate login URL');
      }

      const data = await response.json();
      return {
        name: data.name,
        url: data.login_url,
      };
    } catch (error) {
      return { name: '', url: '' }; // Return default values in case of error
    }
  };

  const sendEmail = async () => {
    try {
      const { name, url } = await makeUrl(); // Await the result of makeUrl
      if (!url) {
        console.error('Failed to generate login URL, email will not be sent.');
        return; // Exit if URL generation failed
      }
      const response = await fetch('https://rbc-security.onrender.com/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to_email: email,
          subject: subject,
          url: url,
          name: name,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send email');
      }

      console.log('Email sent successfully:', data);
    } catch (error) {
      console.error('Error sending email:', error.message);
    }
  };

  
    
    const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (command === '/help') {
        setOutput((prev) => [...prev, `/ $> ${command}`, 
          'Available Commands:\n/help - Show this help message\n/email - Send out a phishing email\n/learn - Learn more about phishing\n/practice - Write a practice phishing email']);
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
          'Enter to Send Email']);
          setSubject(command);
          setCommand('');
          setEmailStage(3)
      }

      else if (emailStage === 3) {
        setOutput((prev) => [...prev, `/ $> ${command}`, 'Email Sent!']);
        sendEmail();
        setEmailStage(0);
        setEmail('');  
        setSubject('');
      }

      else if (command === '/practice') {
        setOutput((prev) => [...prev, `/ $> ${command}`, 'Write a phishing email']);
        setCommand('');
        setPractice(true);
      }

      else if (practice) {
        getGpt('Rate the effectiveness of this phishing email from 1-10: ', command);
        setOutput((prev) => [...prev, `/ $> ${command}`, gpt]);
        setPractice(false);
        setCommand('');
      }
      

      else if (command === '/learn') {
        setOutput((prev) => [...prev, `/ $> ${command}`, 
          'Hello, I am the Cyber Smart Bot. Do you have any questions on avoiding phishing and cybersecurity? Type quit to exit chat.']);
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
        getGpt(command);
        setOutput((prev) => [...prev, `/ $> ${command}`, 
        gpt]);
        setCommand('');
    }

      else {
        setOutput((prev) => [...prev,`/ $> ${command}`, 'Command not found. Type /help for a list.']);
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
            <h1>Now it's your turn to enlighten others.</h1>
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
