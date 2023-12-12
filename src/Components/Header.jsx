import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import Logo from './logo-txt-sm.png';
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);

const Header = ({ signOut, user }) => {
  const navigate = useNavigate();
  const [showLockMessage, setShowLockMessage] = useState(false);
  const hasPaid = user?.hasPaidForFAAPart107;

  const handleMenuClick = (path, locked) => {
    if (locked) {
      setShowLockMessage(true);
    } else {
      setShowLockMessage(false);
      navigate(path);
    }
  };

  return (
    <header className="header">
      <input type="checkbox" id="toggle" style={{ display: "none" }} />
      <div className="header__left">
        <img src={Logo} alt="logo" className="logo1" />
      </div>
      <label htmlFor="toggle" className="header__toggle">
        <span></span>
        <span></span>
        <span></span>
      </label>
      <div className="header__right">
        <div className="header__dropdown">
          <Link to="#" className="header__link header__dropdown__toggle">
            My Drone Driver
          </Link>
          <div className="header__dropdown__menu">
            <Link to="/" className="header__dropdown__item">
              Profile
            </Link>
            <Link 
              to="#" 
              className="header__dropdown__item" 
              onClick={() => handleMenuClick('/course', !hasPaid)}
            >
              Course { !hasPaid && <span className="lock-icon">🔒</span> }
            </Link>
            <Link 
              to="#" 
              className="header__dropdown__item" 
              onClick={() => handleMenuClick('/test-landing', !hasPaid)}
            >
              Testing { !hasPaid && <span className="lock-icon">🔒</span> }
            </Link>
            <Link to="/resources" className="header__dropdown__item">
              Resources
            </Link>
            <button className="header__dropdown__button" onClick={signOut}>Logout</button>
          </div>
        </div>
      </div>

      {showLockMessage && (
        <div className="lock-message">
          Locked: Please purchase course to unlock
        </div>
      )}
    </header>
  );
};

export default Header;