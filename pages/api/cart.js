import { mongooseConnect } from "@/lib/mongoose"
import { Product } from "@/models/Product"

export default async function handler(req, res) {
    // Connect to MongoDB
    await mongooseConnect()

    // Extract product IDs from the request body
    const ids = req.body.ids

    // Retrieve products from the database based on the provided IDs
    const products = await Product.find({ _id: ids })

    // Send the retrieved products as a JSON response
    res.json(products)
}
