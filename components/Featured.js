import React, { useContext } from "react"
import Centered from "./Centered"
import { styled } from "styled-components"
import Button from "./Button"
import { FaCartPlus } from 'react-icons/fa'
import ButtonLink from "./ButtonLink"
import { CartContext } from "./CartContext"
import { device } from "@/utils/devices"

// Define a styled div with certain styles
const StyledDiv = styled.div`
    display: flex;
    background-color: var(--header-color);
    @media ${device.tablet} {
        padding: 0;
    }
`

// Define a styled title element
const Title = styled.h1`
    margin: 0;
    font-weight: normal;
    color: white;
    @media ${device.laptopL} {
        font-size: 2.2rem;
    }
`

// Define a styled paragraph element for description
const Desc = styled.p`
    color: var(--text-color);
    font-size: .8rem;
    @media ${device.laptopL} {
        font-size: 1.1rem;
    }
`

// Define a styled div for wrapping content
const Wrapper = styled.div`
    display: flex;
    flex-direction: column-reverse;
    gap: 2rem;
    padding: 2rem 0;
    @media ${device.mobileXL} {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
    }
    img {
        width: 100%;
        max-width: 350px;
    }
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    div:last-child {
        flex-direction: row;
        gap: .2rem;
    }
`

// Define the Featured component
const Featured = ({ product }) => {
    // Access cart-related functions from CartContext
    const { addProduct } = useContext(CartContext)

    // Function to add the product to the cart
    const addToCart = () => {
        addProduct(product._id, true)
    }

    // Destructure product data
    const { title, _id, images, description } = product

    // Extract short description from HTML
    const shortDescription = description
        .split('<h2><strong>Description:</strong></h2>')[1]
        .split('</span>')[0]
        .replace(/<p><span style="color: rgb\(4, 12, 19\);">/g, '')

    return (
        <StyledDiv>
            <Centered>
                <Wrapper>
                    <div>
                        <Title>{title}</Title>
                        <Desc>{shortDescription}</Desc>
                        <div>
                            <ButtonLink href={'/product/' + _id} $outliner={1} size="l">Read more</ButtonLink>
                            <Button onClick={addToCart} size="l" $bgColor="success"><FaCartPlus style={{ height: "1rem" }} /> Add to cart</Button>
                        </div>
                    </div>
                    <div>
                        <img src={images[0]} alt="Featured product" />
                    </div>
                </Wrapper>
            </Centered>
        </StyledDiv>
    )
}

export default Featured
