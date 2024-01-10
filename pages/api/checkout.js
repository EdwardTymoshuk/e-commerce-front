import { mongooseConnect } from "@/lib/mongoose"
import { Product } from "@/models/Product"
import { Order } from "@/models/Order"
const stripe = require("stripe")(process.env.STRIPE_SK)

export default async function handler(req, res) {
  // Ensure the request method is POST
  if (req.method !== "POST") {
    res.json("should be a POST request")
    return
  }

  // Destructure relevant data from the request body
  const {
    name, email, city,
    postalCode, streetAddress, country,
    cartProducts,
  } = req.body

  // Connect to the MongoDB database
  await mongooseConnect()

  // Extract unique product IDs from the cart
  const productsIds = cartProducts
  const uniqueIds = [...new Set(productsIds)]

  // Fetch information about the products from the database
  const productsInfos = await Product.find({ _id: uniqueIds })

  // Prepare the line items for the Stripe session
  let line_items = []
  for (const productId of uniqueIds) {
    const productInfo = productsInfos.find(p => p._id.toString() === productId)
    const quantity = productsIds.filter(id => id === productId)?.length || 0
    if (quantity > 0 && productInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: "USD",
          product_data: { name: productInfo.title },
          unit_amount: productInfo.price * 100,
        },
      })
    }
  }

  // Create a new order document in the database
  const orderDoc = await Order.create({
    line_items, name, email, city, postalCode,
    streetAddress, country, paid: false,
  })

  // Get the host from the request headers or default to localhost
  const host = req.headers.origin || "http://localhost:3000"

  // Create a new Stripe checkout session
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    customer_email: email,
    success_url: `${host}/cart?success=1`,
    cancel_url: `${host}/cart?canceled=1`,
    metadata: { orderId: orderDoc._id.toString(), test: "ok" },
  })

  // Respond with the URL of the Stripe checkout session
  res.json({
    url: session.url,
  })
}
