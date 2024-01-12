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
import { useContext, useState } from "react"
import { MdDone } from "react-icons/md"
import { styled } from "styled-components"

// Styled component for the product title
const Title = styled.h1`
    text-align: center;
`

// Styled component for the column wrapper
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

// Styled component for the price row
const PriceRow = styled.div`
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: space-between;
    margin-top: 2px;
`

// Styled component for the price
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

    const [isAddingToCart, setIsAddingToCart] = useState(false)

    const { _id, title, description, images, price } = product
    const { addProduct } = useContext(CartContext)

    // Function to create HTML markup from product description
    const createMarkup = () => {
        return { __html: description };
    }

    const addToCart = () => {
        setIsAddingToCart(true)
        try {
            addProduct(product._id, true)
        } catch (error) {
            console.error(error)
        } finally {
            setTimeout(() => {
                setIsAddingToCart(false)
            }, 500)
        }
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
                            {/* <Button onClick={() => addProduct(_id, true)} size="s" $bgColor="success">Add to cart</Button> */}
                            <Button onClick={addToCart} size="ss" $bgColor="success">{
                                isAddingToCart ?
                                <MdDone size={24} /> :
                                "Add to cart"
                                }
                            </Button>
                        </PriceRow>
                    </div>
                </ColWrapper>
            </Centered>
            <Footer />
        </PageWrapper>
    )
}

export default ProductPage

// Server-side rendering to fetch product data based on the provided ID
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
