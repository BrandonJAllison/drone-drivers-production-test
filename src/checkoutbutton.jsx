import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

// Replace with your Stripe public key
const stripePromise = loadStripe('pk_live_51MfvqQDhepDNpjvlkGXy2CHrtwAt7sox7g3KfZgod8Yix0EnUl8yr0GDCiguHNUZXSqFhdFRA2uuxq05rcJDfhKV00I8Nt9TrZ');

const CheckoutButton = () => {
  const handleClick = async () => {
    // Get Stripe.js instance
    const stripe = await stripePromise;

    try {
      // Call your endpoint directly to create the Checkout session
      const response = await fetch('https://s5q926428f.execute-api.us-east-1.amazonaws.com/master/stripecheckout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include any other headers your API requires
        },
        body: JSON.stringify({}), // any required body content
      });

      const session = await response.json();

      // Check if the request was successful
      if (!response.ok) {
        throw new Error(session.message || 'Failed to create checkout session');
      }

      // Use Stripe's 'redirectToCheckout' method to redirect to Stripe's Checkout page
      const result = await stripe.redirectToCheckout({
        sessionId: session.sessionId,
      });

      if (result.error) {
        // If there's an error, display it to the customer
        console.error(result.error.message);
      }
    } catch (error) {
      console.error("Error creating checkout session", error);
    }
  };

  return (
    <button onClick={handleClick}>Checkout</button>
  );
};

export default CheckoutButton;