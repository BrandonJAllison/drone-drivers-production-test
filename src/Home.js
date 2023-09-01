import ReactPlayer from 'react-player';
import './Home.css';
import CookieConsent from "react-cookie-consent";
import { useCookies } from "react-cookie";
// import Instructor from '../src/Jim_Jones.png'

const Home = () => {

    const [cookies, setCookie] = useCookies(["myWebsiteCookieConsent"]);

    function handleAccept() {
        setCookie("myWebsiteCookieConsent", true, { maxAge: 86400 * 30 });
      }


  return (
    <div className="home-wrapper">
      {/* Header Image */}
      <div className="home-header">
  <form className="login-form">
    <h2>Login</h2>
    <div>
      <label htmlFor="username">Username:</label>
      <input type="text" id="username" name="username" required />
    </div>
    <div>
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" required />
    </div>
    <div>
      <button type="submit">Login</button>
    </div>
  </form>
</div>

      {/* What Is Drone Driver Section */}
      <div className="section-container">
        <h1 className="section-header">
          <img className="logo_header" src='https://dronedriver-development-codebase.s3.amazonaws.com/images/logo-sm.png' alt="drone driver " height={50} width={50} /> WHAT IS DRONE DRIVER?
        </h1>
        <div className="whatis-section">
          <div className="whatis-img">
            <ReactPlayer url={'https://dronedriver-development-codebase.s3.amazonaws.com/video/teaser.mp4'}  controls />
          </div>
          <div className="whatis-text">
          Welcome to the most comprehensive FAA Part 107 test prep course on the market! As the demand for commercial drone pilots continues to grow, it's more important than ever to have a solid understanding of the regulations and requirements set forth by the Federal Aviation Administration (FAA). That's where we come in.

Our FAA Part 107 test prep course is designed to help aspiring drone pilots pass the Part 107 exam with confidence. We cover all the key topics and regulations outlined by the FAA, and provide in-depth explanations and examples to help you fully understand the material.

What makes our course unique is our emphasis on real-world scenarios and practical applications. We believe that the best way to prepare for the Part 107 exam is to understand how the regulations apply in real-life situations. That's why our course includes hands-on exercises and case studies to help you gain a deeper understanding of the material.

Don't just pass the Part 107 exam – excel on it. Enroll in our FAA Part 107 test prep course today and take the first step towards a successful career as a commercial drone pilot.
          </div>
        </div>
      </div>

      <div class="section-container">
  <h1 class="section-header">
    <img className="logo_header" src='https://dronedriver-development-codebase.s3.amazonaws.com/images/logo-sm.png' alt="drone driver" height={50} width={50} /> ABOUT THE INSTRUCTOR
  </h1>
  <div class="instructor-section">
    <div class="instructor-img">
      <img src="https://dronedriver-development-codebase.s3.amazonaws.com/images/Jim_Jones.png" alt="Jim Jones" width={350}/>
    </div>
    <div class="instructor-text">
      
    </div>
  </div>
</div>

      {/* The Courses Section */}
      <div className="section-container">
        <h1 className="section-header">
          <img className="logo_header" src='https://dronedriver-development-codebase.s3.amazonaws.com/images/logo-sm.png' height={50} width={50} alt="logo" /> WHAT'S INCLUDED
        </h1>
        <div className="whatis-section">
          <div className="whatis-img2">
            <img src={'https://dronedriver-development-codebase.s3.amazonaws.com/images/istockphoto-1094620200-612x612.jpg'} />
          </div>
        <div className="whatis-text">
        <p>The FAA part 107 course is designed to provide comprehensive training to individuals interested in obtaining a commercial drone pilot license. The course includes detailed video lessons that cover all aspects of drone piloting, including regulations, airspace, weather, and safety protocols.</p>
<p>Throughout the course, students will be able to test their knowledge through lesson quizzes, which are designed to reinforce the concepts covered in each lesson. Additionally, at the end of the course, students will have access to practice exams that simulate the actual FAA part 107 exam, giving them the opportunity to prepare and feel confident before taking the real exam.</p>
<p>By taking the FAA part 107 course, individuals will be equipped with the knowledge and skills necessary to safely and responsibly operate a drone for commercial purposes, while also complying with FAA regulations and ensuring public safety.</p>
        </div>
        </div>
      </div>

      {/* What You'll Learn Section */}
      <div className="section-container">
        <h1 className="section-header">
          <img className="logo_header" src='https://dronedriver-development-codebase.s3.amazonaws.com/images/logo-sm.png' height={50} width={50} alt="logo" /> WHAT YOU'LL LEARN
        </h1>
        <div className="learn-list">
        <div style={{display:'flex', justifyContent:'space-around'}}>
        <div>
          <ul style={{color:'#333', fontSize:'1.25rem'}}>
            <li>FAA Part 107 Regulations</li>
            <li>How to apply for airspace authorizations</li>
            <li>All other test topics included in the FAA P107 exam</li>
            <li>How to fly small unmanned aircraft legally  safely throughout the NAS</li>
          </ul>
        </div>
        <div>
          <ul style={{color:'#333', fontSize:'1.25rem'}}>
            <li>How the National Airspace System (NAS) works</li>
            <li>Weather</li>
            <li>How to pass the FAA Part 107 Remote Pilot Exam quickly!</li>
            <li>And more!</li>
          </ul>
        </div>
      </div>
      <div>

      </div>
        </div>
        <div className="learn-description">
          {/* Insert the existing learn-description content here */}
        </div>
        <CookieConsent
            location="bottom"
            buttonText="Accept"
            onAccept={handleAccept}
            cookieName="myWebsiteCookieConsent"
            style={{
                background: "#006193",
                position: "fixed",
                bottom: 0,
                left: 0,
                width: "100%",
                zIndex: 9999,
                padding: "10px 0",
                textAlign: "center",
            }}
            buttonStyle={{
                background: "#F47921",
                fontSize: "18px",
                color: "white",
            }}
            expires={150}
            >
            This website uses cookies to ensure you get the best experience on our website.{" "}
            <a href="/privacy-policy" style={{color:'white'}} >Learn more</a>
    </CookieConsent>
      </div>


    </div>
  );
};

export default Home;
