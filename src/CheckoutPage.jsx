import React, { useState } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import './CheckoutPage.css'; // Import the CSS file

const CheckoutPage = () => {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const amount = 25 * 100; // $25.00 in cents

    try {
      // Call your server to create the Checkout Session
      const response = await fetch('https://sea-turtle-app-l7rbe.ondigitalocean.app/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });
      const session = await response.json();

      // Redirect the user to the Stripe Checkout page
      if (session.id) {
        const result = await stripe.redirectToCheckout({ sessionId: session.id });

        if (result.error) {
          console.error(result.error.message);
        }
      } else {
        console.error('Failed to create Checkout Session');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-box">
        <h3>Get the Drone Drivers Course Today!</h3>
        <p>You will be redirected to a Stripe page to process payment. Once successfully checked out you will be brough back to the drone driver app and your course material and practice tests will be unlocked.</p>
        <form onSubmit={handleSubmit}>
          <p>Amount: $25.00</p>
          <button type="submit" disabled={!stripe || loading}>
            {loading ? 'Processing...' : 'Buy The Course'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
