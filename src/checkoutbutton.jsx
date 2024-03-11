import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

// Replace with your Stripe public key
const stripePromise = loadStripe(process.env.REACT_APP_TEST_VARIABLE);

// Accept userID as a prop
const CheckoutButton = ({ userID }) => {
  const handleClick = async (event) => {
    event.preventDefault();
    
    // Get Stripe.js instance
    const stripe = await stripePromise;

    try {
      // Call your backend to create the Checkout session
      const response = await fetch('https://plankton-app-3pnzq.ondigitalocean.app/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Include userID in the request body
          userID: userID,
        }),
      });

      const session = await response.json();

      if (response.ok) {
        // Redirect to Checkout
        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });

        if (result.error) {
          console.error(result.error.message);
        }
      } else {
        console.error(session.message);
      }
    } catch (error) {
      console.error("Error creating checkout session", error);
    }
  };

  return (
    <button onClick={handleClick}>Purchase Course</button>
  );
};

export default CheckoutButton;