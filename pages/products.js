import Centered from "@/components/Centered"
import Header from "@/components/Header"
import ProductsGrid from "@/components/ProductsGrid"
import { mongooseConnect } from "@/lib/mongoose"
import { Product } from "@/models/Product"
import { styled } from "styled-components"

const Title = styled.h1`
    /* color: var(--dark-text-color); */
` 

const productsPage = ({products}) => {
  return (
    <div>
      <>
        <Header />
        <Centered  >
        <Title>All products</Title>
        <ProductsGrid products={products} />
        </Centered>
        
      </>
    </div>
  )
}

export default productsPage

export const getServerSideProps = async () => {
    await mongooseConnect()
    const products = await Product.find({}, null, {sort: {'_id': -1}})
    return {
        props: {
            products: JSON.parse(JSON.stringify(products)),
        }
    }
}
