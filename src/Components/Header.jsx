import { Link } from 'react-router-dom';
import './Header.css';
import Logo from './logo-txt-sm.png';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../Usercontext';

const Header = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  const { user } = state;
  const [showPurchaseButton, setShowPurchaseButton] = useState(true);

  const handleLogout = () => {
    window.localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' }); // Dispatch "LOGOUT" action
    navigate('/login');
  };

  // useEffect(() => {
  //   // Check if the user has purchased the course
  //   const hasPurchasedCourse = // Logic to check if the user has purchased the course
  //   setShowPurchaseButton(!hasPurchasedCourse); // Hide the Purchase Course button if the user has purchased the course
  // }, [user]);

  return (
    <header className="header">
      <div className="header__left">
        <img src={Logo} alt="logo" className="logo1" />
      </div>
      <div className="header__right">
        <Link to="/" className="header__link">
          Home
        </Link>
        {!user && (
          <>
            <Link to="/register" className="header__link">
              Register
            </Link>
            <Link to="/login" className="header__link">
              Log in
            </Link>
          </>
        )}
        {user &&  (
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
              <button className="header__dropdown__button" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        )}
        {showPurchaseButton && (
          <Link to="/checkout" className="header__link header__link--purchase" style={{ backgroundColor: '#006193' }}>
            Purchase Course
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;