import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

// Replace with your Stripe public key
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CheckoutButton = () => {
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
        // Include any body content or parameters if needed
        body: JSON.stringify({
          // Your checkout session parameters here, if any
        }),
      });

      const session = await response.json();

      if (response.ok) {
        // Use Stripe's 'redirectToCheckout' method to redirect to Stripe's Checkout page
        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });

        if (result.error) {
          // If there's an error, display it to the customer
          console.error(result.error.message);
        }
      } else {
        // Handle errors from your backend
        console.error(session.message);
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