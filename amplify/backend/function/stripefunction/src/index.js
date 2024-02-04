app.post('/create-checkout-session', async (req, res) => {
    const stripe = require('stripe')('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');
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          // your product details
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Drone Drivers Course',
            },
            unit_amount: 139000, // price in cents
          },
          quantity: 1,
        }],
        mode: 'payment',
        success_url: 'https://yourdomain.com/success',
        cancel_url: 'https://yourdomain.com/cancel',
      });
      res.json({ sessionId: session.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });