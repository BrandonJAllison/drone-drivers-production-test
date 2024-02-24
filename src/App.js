import { useState } from 'react';
import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
// import Register from './Register';
// import Login from './Login';
// import Home from './Home';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Course from './Components/Course';
import Success from './Components/Success';
import Profile from './Components/Profile';
import Test from './Testing';
import Privacy from './PrivacyPolicy';
// import CheckoutPage from './CheckoutPage';
import SuccessPage from './SuccessPage';
import TestLanding from './TestLanding'
// import Landing from './Landing'
import ResourcesPage from './Resources'
import UserProvider from './Usercontext';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import awsExports from "./aws-exports";
import { Amplify, API, graphqlOperation } from 'aws-amplify'
import '@aws-amplify/ui-react/styles.css';
import './CustomAuthStyles.css'; 
Amplify.configure(awsExports);

Amplify.configure(awsExports);

const stripePromise = loadStripe('your_stripe_public_key_here');

const App = ({ signOut, user }) => {
  return (
    <BrowserRouter>
      <UserProvider value={{ user }}>
        <div className="app-container">
          <Header user={user} signOut={signOut} />
          <div className="main-content">
            <Elements stripe={stripePromise}>
              <Routes>
                <Route path="/success" element={<Success />} />
                <Route path="/course" element={<Course />} />
                <Route path="/" element={<Profile user={user} />} />
                <Route path="/practice-test" element={<Test />} />
                <Route path="/privacy-policy" element={<Privacy />} />
                <Route path="/test-landing" element={<TestLanding />} />
                <Route path="/resources" element={<ResourcesPage />} />
                {/* Add more routes as needed */}
              </Routes>
            </Elements>
          </div>
          <Footer />
        </div>
      </UserProvider>
    </BrowserRouter>
  );
};
export default withAuthenticator(App, {
  includeGreetings: true,
 
  // other configuration...
});