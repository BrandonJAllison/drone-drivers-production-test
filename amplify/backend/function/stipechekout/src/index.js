exports.handler = async (event) => {
    try {
      // Create a Checkout Session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Course Name',
              // Add other product details here
            },
            unit_amount: 2000, // Price in cents, adjust accordingly
          },
          quantity: 1,
        }],
        mode: 'payment',
        success_url: 'https://yourdomain.com/success?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: 'https://yourdomain.com/cancel',
      });
  
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*", // Adjust this to match your domain in production
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ url: session.url }),
      };
    } catch (error) {
      console.error('Error creating Stripe Checkout session:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message }),
      };
    }
  };