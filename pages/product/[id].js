import Button from "@/components/Button"
import { CartContext } from "@/components/CartContext"
import Centered from "@/components/Centered"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import PageWrapper from "@/components/PageWrapper"
import ProductImages from "@/components/ProductImages"
import WhiteBox from "@/components/WhiteBox"
import { mongooseConnect } from "@/lib/mongoose"
import { Product } from "@/models/Product"
import { device } from "@/utils/devices"
import { useContext } from "react"
import { styled } from "styled-components"

const Title = styled.h1`
    text-align: center;
`

const ColWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px 0;
    @media ${device.tablet} {
        display: grid;
    grid-template-columns: .8fr 1.2fr;
    gap: 50px;
    margin: 40px 0 20px;
    }
`
const PriceRow = styled.div`
     display: flex;
    gap: 5px;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
`

const Price = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  text-align: right;
  color: var(--dark-text-color);
  @media screen and (min-width: 768px) {
    font-size: 1.6rem;
    font-weight: 500;
    text-align: left;
  }
`;

const ProductPage = ({ product }) => {
    const { _id, title, description, images, price } = product
    const {addProduct} = useContext(CartContext)

    const createMarkup = () => {
        return { __html: description };
      }

    return (
        <PageWrapper>
            <Header />
            <Centered>
                <h1>Product</h1>
                <ColWrapper>
                    <WhiteBox>
                        <ProductImages images={images} />
                    </WhiteBox>
                    <div>
                        <Title>{title}</Title>
                        <p dangerouslySetInnerHTML={createMarkup()} />
                        <PriceRow>
                    <Price>
                        ${price}
                    </Price>
                    <Button onClick={() => addProduct(_id, true)} size="s" $bgColor="success">Add to cart</Button>
                </PriceRow>
                    </div>
                </ColWrapper>
            </Centered>
            <Footer />
        </PageWrapper>
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
