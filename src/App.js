import {useState} from 'react'
import './App.css';
import { Routes ,Route, BrowserRouter } from 'react-router-dom'; 
import Register from './Register';
import Login from './Login';
import Home from "./Home";
import Header from './Components/Header';
import Footer from './Components/Footer';
import Course from './Components/Course'
import Dashboard from './Components/Dashboard'
import Profile from './Components/Profile'
import Test from '../src/Testing'
import Privacy from '../src/PrivacyPolicy'
import UserProvider from "./Usercontext";

const App = () => {

  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
    <UserProvider value={{ user, setUser }}>
        <Header/>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login user={user}/>} />
          <Route path="/course" element={<Course />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/practice-test" element={<Test />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          </Routes>
        <Footer/>
        </UserProvider>
    </BrowserRouter>
  );
};

export default App;
