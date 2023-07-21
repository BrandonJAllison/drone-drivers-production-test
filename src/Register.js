import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './register.css';

const Register = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Added this line
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {  // Added this check
      alert("Passwords don't match");
      return;
    }

    try {
      await axios.post('https://sea-turtle-app-l7rbe.ondigitalocean.app/api/signup', { email, password, firstName, lastName, username });
      console.log('User signed up successfully.');
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-title">REGISTER</h1>

      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control mb-4 p-4"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter Email"
          required
        />

        <input
          type="password"
          className="form-control mb-4 p-4"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter Password"
          required
        />

        <input  // This is the new password confirmation field
          type="password"
          className="form-control mb-4 p-4"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          placeholder="Confirm Password"
          required
        />

        {/* <input
          type="text"
          className="form-control mb-4 p-4"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          placeholder="Enter First Name"
          required
        />

        <input
          type="text"
          className="form-control mb-4 p-4"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          placeholder="Enter Last Name"
          required
        /> */}

        <input
          type="text"
          className="form-control mb-4 p-4"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Enter Username"
          required
        />

<label style={{ display: 'inline-block', marginRight: '10px' }}>
    <input
      type="checkbox"
      required
    />
  </label>
  <span style={{ display: 'inline-block' }}>
    I have read and agree to the <a href="https://drone-drivers.nyc3.digitaloceanspaces.com/Legaleze_for_website.docx.pdf" target="_blank">Terms of Use</a>.
  </span>
  
  

        <button type="submit" className="btn btn-block btn-primary">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Register;