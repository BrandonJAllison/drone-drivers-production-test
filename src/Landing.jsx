import ReactPlayer from 'react-player';
import './Landing.css';
import CookieConsent from "react-cookie-consent";
import { useCookies } from "react-cookie";
// import Instructor from '../src/Jim_Jones.png'

const Landing = () => {

  return (
   
    <div style={{display:"flex", alignItems:"center", flexDirection:"column", justifyContent:"center", height:"100vh", marginTop:"100px"}}>

<div class="logo">
            <img className="logo_header" src='https://dronedriver-development-codebase.s3.amazonaws.com/images/logo-sm.png' alt="drone driver "  />
        </div>
        <div class="content">
            <h1>We are finalizing our pre-flight checklist and preparing for launch</h1>
            <p>Please check back soon.</p>
        </div>

    </div>
  );
};

export default Landing;
