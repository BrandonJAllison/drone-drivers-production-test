import { Link } from 'react-router-dom';
import './Header.css';
import Logo from './logo-txt-sm.png';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../Usercontext';

const Header = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  const { user } = state;

  const handleLogout = () => {
    window.localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' }); // Dispatch "LOGOUT" action
    navigate('/login');
  };

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
      </div>
    </header>
  );
};

export default Header;
