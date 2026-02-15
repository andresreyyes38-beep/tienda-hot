const stripe = require('stripe')('TU_CLAVE_SECRETA');
const express = require('express');
const app = express();

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: { name: 'Archivo RAR Premium' },
        unit_amount: 1999, // 19.99 USD
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: 'https://tu-sitio.com/descarga-secreta-xyz', // URL donde descarga el ZIP
    cancel_url: 'https://tu-sitio.com/error',
  });
  res.json({ id: session.id });
});