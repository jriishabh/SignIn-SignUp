import React, { useState } from 'react';
import './SignIn.css';

const SignIn = () => {
  const [userinfo, setUserInfo] = useState({
    username: "",
    password: ""
  });

  const [resData, setResData] = useState({
    ok: "",
    msg: ""
  });

  const [error, setError] = useState(""); // State for error handling

  function handleInput(e) {
    e.preventDefault();
    const elename = e.target.name;
    setUserInfo({ ...userinfo, [elename]: e.target.value });
    setError(""); // Clear error when user starts typing
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Validate if fields are empty
    if (!userinfo.username || !userinfo.password) {
      setError("Both fields are required");
      return;
    }

    // Proceed with form submission if validation passes
    fetch("http://localhost:3000/signin", {
      method: "POST",
      body: JSON.stringify(userinfo),
      headers: {
        "Content-type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setResData(data);
      })
      .catch((error) => {
        setError("Error signing in");
      });
  }

  return (
    <div className='formcontainer'>
      <h1>SignIn</h1>
      <input
        className='signin'
        type="text"
        name='username'
        placeholder='Enter your name'
        onChange={handleInput}
        value={userinfo.username}
        required
      />
      <input
        className='signin'
        type="password"
        name='password'
        placeholder='Password'
        onChange={handleInput}
        value={userinfo.password}
        required
      />
      {error && <p className="error">{error}</p>} {/* Display error message */}
      <button className='btx' onClick={handleSubmit}>Sign in</button>
      <h1 className='head'>{resData.msg}</h1>
    </div>
  );
}

export default SignIn;
