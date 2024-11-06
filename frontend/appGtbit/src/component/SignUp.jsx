import React, { useState } from 'react';
import './SignUp.css';

const SignUp = ({ handleSignUpSubmit }) => {
  const [userinfo, setUserInfo] = useState({
    username: "",
    roll: "",
    branch: "",
    password: ""
  });

  const [error, setError] = useState(""); // Error state for validation

  function handleInput(e) {
    e.preventDefault();
    const elename = e.target.name;
    setUserInfo({
      ...userinfo, [elename]: e.target.value
    });
    setError(""); // Clear error when user starts typing
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Validate if all fields are filled
    if (!userinfo.username || !userinfo.roll || !userinfo.branch || !userinfo.password) {
      setError("All fields are required");
      return;
    }

    // Proceed with form submission if validation passes
    const promise = fetch('http://localhost:3000/signup', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userinfo)
    });

    promise.then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        setError("An error occurred during submission.");
        console.log(err);
      });

    handleSignUpSubmit(); // Call to toggle the form
  }

  return (
    <>
      <form>
        <h1>SignUp</h1>
        <input
          className='signup'
          type="text"
          name='username'
          placeholder='User name'
          onChange={handleInput}
          required
        />
        <input
          className='signup'
          type="text"
          name='roll'
          placeholder='Roll number'
          onChange={handleInput}
          required
        />
        <input
          className='signup'
          type="text"
          name='branch'
          placeholder='Branch'
          onChange={handleInput}
          required
        />
        <input
          className='signup'
          type="password"
          name='password'
          placeholder='Password'
          onChange={handleInput}
          required
        />
        {error && <p className="error">{error}</p>} {/* Display validation error */}
        <button className='btn' onClick={handleSubmit}>SignUp</button>
      </form>
    </>
  );
};

export default SignUp;
