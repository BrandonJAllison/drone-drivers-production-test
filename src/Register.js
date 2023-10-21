
import { CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { useState } from 'react';
import UserPool from '../src/UserPool';
import './register.css'
 
function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyProcess, setVerifyProcess] = useState(false);
  const [OTP, setOTP] = useState('');
 
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
        setVerifyProcess(true);
        alert('User Added Successfully');
      }
    });
  };
 
  const verifyAccount = (e) => {
    e.preventDefault();
    const user = new CognitoUser({
      Username: username,
      Pool: UserPool,
    });
    console.log(user);
    user.confirmRegistration(OTP, true, (err, data) => {
      if (err) {
        console.log(err);
        alert("Couldn't verify account");
      } else {
        console.log(data);
        alert('Account verified successfully');
        window.location.href = '/login';
      }
    });
  };
 
  return (
    <div className="register-container">
      {verifyProcess == false ? (
        <form onSubmit={onSubmit} className="register-form">
          <div className="register-title">Register</div>
          <label>
            UserName:
            <input
              type="text"
              value={username.toLowerCase().trim()}
              onChange={(e) => setUsername(e.target.value)}
              className="register-input"
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="register-input"
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="register-input"
            />
          </label>
          <button type="submit" className="register-button">Register</button>
        </form>
      ) : (
        <form onSubmit={verifyAccount} className="register-form">
          <div className="register-title">Verify Account</div>
          <label>
            Enter the OTP:
            <input
              type="text"
              value={OTP}
              onChange={(e) => setOTP(e.target.value)}
              className="register-input"
            />
          </label>
          <button type="submit" className="register-button">Verify</button>
        </form>
      )}
    </div>
  );
}
export default Register;