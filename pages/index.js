import Featured from "@/components/Featured"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import NewProducts from "@/components/NewProducts"
import PageWrapper from "@/components/PageWrapper"
import { mongooseConnect } from "@/lib/mongoose"
import { Product } from "@/models/Product"

// Define the HomePage component.
export default function HomePage({feturedProduct, newProducts}) {
  return (
    <PageWrapper>
    <Header />
    <Featured product={feturedProduct}/>
    <NewProducts products={newProducts}/>
    <Footer />
    </PageWrapper>
  )
}

// Define an asynchronous function to fetch data for server-side rendering.
  export async function getServerSideProps() {
    const featuredProductId = '64c64322c836036fc1370584'
    await mongooseConnect()
    const feturedProduct = await Product.findById(featuredProductId)
    const newProducts = await Product.find({}, null, {sort: {'_id': -1}, limit: 8})
    return {
      props: {
        feturedProduct: JSON.parse(JSON.stringify(feturedProduct)),
        newProducts: JSON.parse(JSON.stringify(newProducts)),
      }
    }
  }
