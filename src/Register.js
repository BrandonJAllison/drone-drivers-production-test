import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './register.css';

import { CognitoUserAttribute } from 'amazon-cognito-identity-js';

import UserPool from '../src/UserPool';
 

const Register = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Added this line
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   if (password !== confirmPassword) {  // Added this check
  //     alert("Passwords don't match");
  //     return;
  //   }

  const onSubmit = (e) => {
    e.preventDefault();
    const attributeList = [];
    attributeList.push(
      new CognitoUserAttribute({
        Name: 'email',
        Value: email,
      })
    );
    UserPool.signUp(username, password, attributeList, null, (err, data) => {
      if (err) {
        console.log(err);
        alert("Couldn't sign up");
      } else {
        console.log(data);
        alert('Sign Up Successful');
        navigate('/');
      }
    });
  };
 

  //   try {
  //     await axios.post('https://sea-turtle-app-l7rbe.ondigitalocean.app/api/signup', { email, password, firstName, lastName, username });
  //     console.log('User signed up successfully.');
  //     navigate('/');
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  
  return (
//     <div className="register-container">
//       <h1 className="register-title">REGISTER</h1>

//       <form className="register-form" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           className="form-control mb-4 p-4"
//           value={firstName}
//           onChange={(event) => setFirstName(event.target.value)}
//           placeholder="Enter First Name"
//           required
//         />
//         <input
//           type="email"
//           className="form-control mb-4 p-4"
//           value={email}
//           onChange={(event) => setEmail(event.target.value)}
//           placeholder="Enter Email"
//           required
//         />

//         <input
//           type="text"
//           className="form-control mb-4 p-4"
//           value={username}
//           onChange={(event) => setUsername(event.target.value)}
//           placeholder="Enter Username"
//           required
//         />
        
//         <input
//           type="password"
//           className="form-control mb-4 p-4"
//           value={password}
//           onChange={(event) => setPassword(event.target.value)}
//           placeholder="Enter Password"
//           required
//         />

//         <input  // This is the new password confirmation field
//           type="password"
//           className="form-control mb-4 p-4"
//           value={confirmPassword}
//           onChange={(event) => setConfirmPassword(event.target.value)}
//           placeholder="Confirm Password"
//           required
//         />


//         <input
//           type="text"
//           className="form-control mb-4 p-4"
//           value={lastName}
//           onChange={(event) => setLastName(event.target.value)}
//           placeholder="Enter Last Name"
//           required
//         />


// <label style={{ display: 'inline-block', marginRight: '10px' }}>
//     <input
//       type="checkbox"
//       required
//     />
//   </label>
//   <span style={{ display: 'inline-block' }}>
//     I have read and agree to the <a href="https://drone-drivers.nyc3.digitaloceanspaces.com/Legaleze_for_website.docx.pdf" target="_blank">Terms of Use</a>.
//   </span>
  
  

//         <button type="submit" className="btn btn-block btn-primary">
//           Sign up
//         </button>
//       </form>
//     </div>



<div>
<form onSubmit={onSubmit}>
  UserName:
  <input
    type="text"
    value={username.toLowerCase().trim()}
    onChange={(e) => setUsername(e.target.value)}
  />
  <br />
  Email:
  <input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
  <br />
  Password:
  <input
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
  <br />
  <button type="submit">Register</button>
</form>
</div>


  );
};

export default Register;