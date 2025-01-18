import React, { useState, useEffect } from 'react'
import Hacked from './hacked';

const Login = () => {
  const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const [signIn, setSignIn] = useState(true);
    const [userData, setUserData] = useState({});

    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
          fetch(`https://rbc-security.onrender.com/users/login?token=${token}`, {
            method: 'GET',
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.json();
            })
            .then((data) => {
              console.log('Response from server:', data.user);
              setUserData(data.user);
            })
            .catch((error) => {
              console.error('Error during fetch:', error);
            });
        } else {
          console.error('No token parameter found in the URL');
        }

        console.log(userData);
        console.log(userData['user_id']);
    }, []);

    const toggleSignIn = () => {
        setSignIn(!signIn);

        console.log(userData["user_id"])
        
        fetch('https://rbc-security.onrender.com/users/update-loot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({user_id : userData['user_id']}),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .catch((error) => {
            console.error("Error during fetch:", error);
        });
    };  


    return (
    <>
    {signIn && (
      <div className="login-container">
      <div className="background-image">
      </div>
      {!isVisible && (<div className="login-form">
        <form>
          <label className="username">Client Card or Username</label>
          <input type="text" id="username"/>
          <div className="checkbox-row">
            <input type="checkbox" id="save" />
            <label htmlFor="save">Save client card or username</label>
          </div>
          <button type="submit" onClick={toggleVisibility}>Next</button>
        </form>
        <div className="links">
          <a>Recover Your Username</a>
          <a>Enrol in Online Banking</a>
        </div>
        <div className="service-notices">
          <h4>Service Notices</h4>
          <a>Weekend maintenance to affect Online/Mobile Banking</a>
          <a>Other Online Services</a>
        </div>
      </div>)}

      {isVisible && ( 
        <div className="login-form">
          <form>
          <label className="password">Password</label>
          <input type="text" id="username"/>
          <div className="checkbox-row">
          </div>
          <button type="submit" onClick={toggleSignIn}>Sign In</button>
        </form>
        <div className="links">
          <a>Reset Your Password</a>
          <a>Having Trouble Signing In?</a>
        </div>
        <div className="service-notices">
          <h4>Service Notices</h4>
          <a>Weekend maintenance to affect Online/Mobile Banking</a>
          <a>Other Online Services</a>
        </div>
        </div>
      )}
    </div> )}

    {!signIn && (<Hacked />)}

    </>
  )
}

export default Login