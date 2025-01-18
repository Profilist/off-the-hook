import { useState } from 'react'
import './App.css'

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const [signIn, setSignIn] = useState(true);
  const toggleSignIn = () => {
    setSignIn(!signIn);
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
    {!signIn && (<div>Hacker stuff</div>)}
    </>
  )
}

export default App
