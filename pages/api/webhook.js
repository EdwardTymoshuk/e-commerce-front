import { mongooseConnect } from "@/lib/mongoose"
const stripe = require("stripe")(process.env.STRIPE_SK)
import { buffer } from "micro"
import { Order } from "@/models/Order"

export default async function handler(req, res) {
    console.log("Console: Webhook handler is called") 
    await mongooseConnect()
    const sig = req.headers["stripe-signature"]
    let event
    try {
        // Construct the event from the request payload and your Stripe endpoint secret
        event = stripe.webhooks.constructEvent(await buffer(req), sig, process.env.STRIPE_EP_SECRET)
    } catch (err) {
        // Handle webhook construction errors
        res.status(400).send(`Webhook Error: ${err.message}`)
        return
    }

    // Handle different types of Stripe events
    switch (event.type) {
        case "checkout.session.completed":
            const sessionId = event.data.object.id
            const session = await stripe.checkout.sessions.retrieve(sessionId)
            if (session.payment_status === "paid") {
                const orderId = session.metadata.orderId
                if (orderId) {
                    // Update the order status to "paid" in your database
                    const updatedOrder = await Order.findByIdAndUpdate(orderId, {
                        paid: true,
                    }, { new: true })

                    if (updatedOrder) {
                        console.log("Order successfully updated:", updatedOrder)
                    } else {
                        console.error("Error updating order")
                    }
                }
            }
            break
        default:
            console.log(`Unhandled event type ${event.type}`)
    }

    // Respond with a 200 OK to acknowledge receipt of the event
    res.status(200).send("ok")
}

export const config = {
    api: { bodyParser: false }
}
