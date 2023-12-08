import { Link } from 'react-router-dom';
import './Header.css';
import Logo from './logo-txt-sm.png';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
// import { UserContext } from '../Usercontext';
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);

const Header = ( { signOut, user }) => {
  
  
  
  const navigate = useNavigate();
  // const { user, dispatch } = useContext(UserContext);

  // const [showPurchaseButton, setShowPurchaseButton] = useState(true);

  // const handleLogout = () => {
  //   window.localStorage.removeItem('user');
  //   dispatch({ type: 'LOGOUT' }); // Dispatch "LOGOUT" action
  //   navigate('/login');
  // };

  return (
    <header className="header">
      <input type="checkbox" id="toggle" style={{display: "none"}} />
      <p>Welcome back, {user.attributes.name}!</p>
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
              <Link to="/dashboard" className="header__dropdown__item">
                Dashboard
              </Link>
              <Link to="/profile" className="header__dropdown__item">
                Profile
              </Link>
              <Link to="/course" className="header__dropdown__item">
                Course
              </Link>
              <Link to="/test-landing" className="header__dropdown__item">
                Testing
              </Link>
              <Link to="/resources" className="header__dropdown__item">
                Resources
              </Link>
              <button className="header__dropdown__button" onClick={signOut}>Logout</button> 
              
            </div>
          </div>
      
        {/* {showPurchaseButton && (
          <Link to="/checkout" className="header__link header__link--purchase" style={{ backgroundColor: '#006193' }}>
            Purchase Course
          </Link>
        )} */}
      </div>
    </header>
  );
};

export default Header;