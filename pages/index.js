import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default function HomePage({feturedProduct, newProducts}) {
  return (
    <>
    <Header />
    <Featured product={feturedProduct}/>
    <NewProducts products={newProducts}/>
    </>
  )
}

  export async function getServerSideProps() {
    const featuredProductId = '64c64322c836036fc1370584'
    await mongooseConnect()
    const feturedProduct = await Product.findById(featuredProductId)
    const newProducts = await Product.find({}, null, {sort: {'_id': -1}, limit: 10})
    return {
      props: {
        feturedProduct: JSON.parse(JSON.stringify(feturedProduct)),
        newProducts: JSON.parse(JSON.stringify(newProducts)),
      }
    }
  }
