const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Drone Driver Course',
          },
          unit_amount: 13900, // Price in cents
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'https://app.dronedriver.com/SuccessPage',
      cancel_url: 'https://app.dronedriver.com/cancel',
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ sessionId: session.id }),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};