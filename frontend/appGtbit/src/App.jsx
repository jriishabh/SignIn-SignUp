import React, { useState } from "react";
import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";
import "./App.css";

const App = () => {
  const [isSignUp, setIsSignUp] = useState(true);

  const toggleForm = () => {
    setIsSignUp(!isSignUp); // Toggle between SignUp and SignIn
  };

  const handleSignUpSubmit = () => {  
    toggleForm(); 
  };
     
  return (
    <> 
      <div className="container">
                <h1>My Dashboard</h1>
                <p>this is a sample signinsignup</p>

        <div className="component">
          {isSignUp ? (
            <SignUp handleSignUpSubmit={handleSignUpSubmit} />
          ) : (
            <SignIn />
          )}
          
          {/* Button now inside the same component container */}
          <div className="button-container">
            <button className="toggle-button" onClick={toggleForm}>
              {isSignUp
                ? 'Already have an account? Sign In'
                : 'Don’t have an account? Sign Up'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
