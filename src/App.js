import { useState } from 'react';
import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Home from './Home';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Course from './Components/Course';
import Dashboard from './Components/Dashboard';
import Profile from './Components/Profile';
import Test from './Testing';
import Privacy from './PrivacyPolicy';
import CheckoutPage from './CheckoutPage';
import SuccessPage from './SuccessPage';
import TestLanding from './TestLanding'
import Landing from './Landing'
import ResourcesPage from './Resources'
import UserProvider from './Usercontext';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import awsExports from "./aws-exports";
import { Amplify, API, graphqlOperation } from 'aws-amplify'
import '@aws-amplify/ui-react/styles.css';
Amplify.configure(awsExports);


const stripePromise = loadStripe('pk_test_51MfvqQDhepDNpjvlblpLJD3CDsz8alCnx1RIMlh0ZKh7eh0F2clKaGZmz5cOd6IFahiD8XZCObKUQy1qZWRf2pbA00ur8VklUb');

const App = ({ signOut, user }) => {
 
  console.log(user.username);


  return (
    <BrowserRouter>
      <UserProvider value={{user}}>
        <Header user={user} signOut={signOut}/>
        <Elements stripe={stripePromise}>
          <Routes>
            <Route path="/" element={<Home/>} />
            {/* <Route path="/register" element={<Register />} /> */}
            {/* <Route path="/login" element={<Login user={user} />} /> */}
            <Route path="/course" element={<Course />} />
            <Route path="/dashboard" element={<Dashboard  />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/practice-test" element={<Test />} />
            <Route path="/privacy-policy" element={<Privacy />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/test-landing" element={<TestLanding />} />
            <Route path="/resources" element={<ResourcesPage />} />
          </Routes>
        </Elements>
        <Footer />
      </UserProvider>
    </BrowserRouter>
  );
};

export default withAuthenticator(App);
