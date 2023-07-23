import Button from "@/components/Button"
import { CartContext } from "@/components/CartContext"
import Centered from "@/components/Centered"
import Header from "@/components/Header"
import ProductImages from "@/components/ProductImages"
import WhiteBox from "@/components/WhiteBox"
import { mongooseConnect } from "@/lib/mongoose"
import { Product } from "@/models/Product"
import { useContext } from "react"
import { styled } from "styled-components"

const Title = styled.h2`
    text-align: center;
`

const ColWrapper = styled.div`
    display: grid;
    grid-template-columns: .8fr 1.2fr;
    gap: 50px;
    margin-top: 40px;
`
const PriceRow = styled.div`
  display: block;
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 5px;
  }
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
`

const Price = styled.div`
  font-size: 1rem;
  font-weight: 200;
  text-align: right;
  color: var(--dark-text-color);
  @media screen and (min-width: 768px) {
    font-size: 1.1rem;
    font-weight: 500;
    text-align: left;
  }
`;

const ProductPage = ({ product }) => {
    const { _id, title, description, images, price } = product
    const {addProduct} = useContext(CartContext)
    return (
        <>
            <Header />
            <Centered>
                <h1>Product</h1>
                <ColWrapper>
                    <WhiteBox>
                        <ProductImages images={images} />
                    </WhiteBox>
                    <div>
                        <Title>{title}</Title>
                        <p>{description}</p>
                        <PriceRow>
                    <Price>
                        ${price}
                    </Price>
                    <Button onClick={() => addProduct(_id)} size="s" $bgColor="success">Add to cart</Button>
                </PriceRow>
                    </div>
                </ColWrapper>
            </Centered>
        </>
    )
}

export default ProductPage

export const getServerSideProps = async (context) => {
    await mongooseConnect()
    const { id } = context.query
    const product = await Product.findById(id)
    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
        }
    }
}
