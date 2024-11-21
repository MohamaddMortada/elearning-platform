import React, { useState } from "react";
import LogIn from "../LogIn";
import SignUp from "../SignUp";

const MainAuth = () => {
  const [showLogin, setShowLogin] = useState(true); 

  const handleToggle = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div>
      <h1>Welcome to E-Learning Platform</h1>
      <p>{showLogin ? "Don't have an account?" : "Already have an account?"}</p>
      <button onClick={handleToggle}>
        {showLogin ? "Sign Up" : "Log In"}
      </button>

      {showLogin ? <LogIn /> : <SignUp />}
    </div>
  );
};

export default MainAuth;
