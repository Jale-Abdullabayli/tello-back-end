const Product = require("../model/product");
const { asyncCatch } = require("../utils/asyncCatch");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.checkout = asyncCatch(async (req, res) => {

  const products = req.body.products;
  const line_items = products.map(product => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
        },
        unit_amount: product.price * 100,
      },
      quantity: product.quantity
    }
  })


  const session = await stripe.checkout.sessions.create({
    line_items,
    payment_method_types: ["card"],
    mode: "payment",
    // client_reference_id: req.params.productId,
    customer_creation: "always",
    customer_email: req.user.email,
    success_url: `http://localhost:3000`,
    cancel_url: `http://localhost:3000/error`,
  });

  res.status(200).json({ success: true, session });
});
