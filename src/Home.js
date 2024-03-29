import ReactPlayer from 'react-player';
import './Home.css';
import CookieConsent from "react-cookie-consent";
import { useCookies } from "react-cookie";
// import Instructor from '../src/Jim_Jones.png'
import { useState, useContext } from "react";
import axios from "axios";
import { Spin } from 'antd';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../src/Usercontext';
import { useNavigate, Link } from "react-router-dom"; 
import './login.css'; // or the path to the styles you need for this section

const Home = () => {

  //   // List all items
  //   async function getUserByEmail(email) {
  //     try {
  //         const users = await DataStore.query(Users, user => user.email.eq(email));
          
  //         if (users.length > 0) {
  //             console.log(users[0]);
  //         } else {
  //             console.log('User not found.');
  //         }
  //     } catch (error) {
  //         console.error('Error querying user:', error);
  //     }
  // }
  
  // // Call the function with the desired user's email
  // getUserByEmail('cupocode@gmail.com');

//   async function fetchUsers() {
//     try {
//         const models = await DataStore.query(Users);
//         console.log(models);
//     } catch (error) {
//         console.error("Error querying Users:", error);
//     }
// }

// fetchUsers();

//   async function saveUser() {
//     try {
//         await DataStore.save(
//             new Users({
//                 "email": "Lorem ipsum dolor sit amet",
//                 "firstName": "Lorem ipsum dolor sit amet",
//                 "lastName": "Lorem ipsum dolor sit amet",
//                 "registrationDate": "1970-01-01Z",
//                 "purchased": "Lorem ipsum dolor sit amet",
//                 "untitledfield": "Lorem ipsum dolor sit amet"
//             })
//         );
//         console.log('User saved successfully.');
//     } catch (error) {
//         console.error('Error saving user:', error);
//     }
// }

// saveUser();
    
   

    const [cookies, setCookie] = useCookies(["myWebsiteCookieConsent"]);

    function handleAccept() {
        setCookie("myWebsiteCookieConsent", true, { maxAge: 86400 * 30 });
      }

      const navigate = useNavigate();
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [loading, setLoading] = useState(false);
      const { dispatch } = useContext(UserContext);

      const handleSubmit = async (e) => {
        e.preventDefault();
        console.table({ email, password });
        try {
          setLoading(true);
          const { data } = await axios.post(`https://sea-turtle-app-l7rbe.ondigitalocean.app/api/login`, {
            email,
            password,
          });
          console.log("LOGIN RESPONSE", data);
          window.localStorage.setItem("user", JSON.stringify(data));
          dispatch({ type: "LOGIN", payload: data });
          navigate("/dashboard");
        } catch (err) {
          toast.error(err.response.data);
          setLoading(false);
        }
      };


  return (
    <div className="home-wrapper">
      {/* Header Image */}
      <div className="home-header">
    <div className="login-container">
    {/* <form className="login-form" onSubmit={handleSubmit}>
    <input
    type="email"
    className="form-control mb-4 p-4"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="Enter email"
    required
    />
    <input
    type="password"
    className="form-control mb-4 p-4"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Enter password"
    required
    />
    <button
    type="submit"
    className="btn btn-block btn-primary"
    disabled={!email || !password || loading}
    >
    {loading ? <Spin /> : "Login"}
    </button>
    <div className="login-links">
    <p className="text-center" style={{color:'black'}}>
    Not yet registered? <Link to="/register">Register</Link>
    </p>
    <p className="text-center">
    <Link to="/forgot-password">Forgot password</Link>
    </p>
    </div>
    </form> */}
</div>
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
      <img className="whatis-img" src="https://dronedriver-development-codebase.s3.amazonaws.com/images/Jim_Jones.png" alt="Jim Jones" width={350}/>
    </div>
    <div className="whatis-text">
    <p>I’ve spent my life flying in the FAA national airspace system.  First in the Marines as tactical jet pilot, later as both a commercial & air-transport pilot, and more recently as an FAA Part 107 licensed drone pilot. Flying everything from a 250g drone to a 400,000lb Boeing 767. I hold an MBA in International Relations from Marine Corps University and a BS in Mechanical Engineering from the University of Portland Multnomah School of Engineering.  My hobbies include hiking, 3D printing, and motorcycles.  I live with my family in the Pacific Northwest.</p>

    {/* <p>Jim has spent his life flying in the FAA national airspace system.  First in the Marines as tactical jet pilot, later as both a commercial & air-transport pilot, and more recently as an FAA Part 107 licensed drone pilot. Jim has flown everything from a 250g drone to a 400,000lb Boeing 767. He holds both an MBA in International Relations from Marine Corps University and a BS in Mechanical Engineering from the University of Portland Multnomah School of Engineering.  His hobbies include hiking, 3D printing, and motorcycles.  Jim lives with his family in the Pacific Northwest.</p> */}
          </div>
  </div>
</div>

      {/* The Courses Section */}
      <div className="section-container">
        <h1 className="section-header">
          <img className="logo_header" src='https://dronedriver-development-codebase.s3.amazonaws.com/images/logo-sm.png' height={50} width={50} alt="logo" /> WHAT'S INCLUDED
        </h1>
        <div className="whatis-section">
          <div className="whatis-img">
            <img className="whatis-img" src={'https://dronedriver-development-codebase.s3.amazonaws.com/images/istockphoto-1094620200-612x612.jpg'} />
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
