import React, { useContext, useState } from "react"
import Centered from "./Centered"
import { styled } from "styled-components"
import Button from "./Button"
import { FaCartPlus } from "react-icons/fa"
import { CartContext } from "./CartContext"
import { device } from "@/utils/devices"
import Image from "next/image"
import { useRouter } from "next/router"
import CircleSpinner from "./CircleSpinner"
import { MdDone } from "react-icons/md";

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
        height: auto;
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

    const [isReadMoreClicked, isSetReadMoreClicked] = useState(false)
    const [isAddingToCart, setIsAddingToCart] = useState(false)

    const router = useRouter()

    // Access cart-related functions from CartContext
    const { addProduct } = useContext(CartContext)

    // Function to add the product to the cart
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

    const handleReadMore = async (e) => {
        e.preventDefault()
        isSetReadMoreClicked(true)
        try {
            await router.push(`/product/${_id}`)
        } catch (error) {
            console.error(error)
        } finally {
            isSetReadMoreClicked(false)
        }
    }

    // Destructure product data
    const { title, _id, images, description } = product

    // Extract short description from HTML
    const shortDescription = description
        .split("<h2><strong>Description:</strong></h2>")[1]
        .split("</span>")[0]
        .replace(/<p><span style="color: rgb\(4, 12, 19\);">/g, "")

    return (
        <StyledDiv>
            <Centered>
                <Wrapper>
                    <div>
                        <Title>{title}</Title>
                        <Desc>{shortDescription}</Desc>
                        <div>
                            {/* <ButtonLink href={"/product/" + _id} $outliner={1} size="l">Read more</ButtonLink> */}
                            <Button onClick={handleReadMore} $outliner={1} size="l" disabled={isReadMoreClicked}>{isReadMoreClicked ? <CircleSpinner size={24} color="#ec9b00" hovercolor="#fff" /> : "Read more"}</Button>
                            <Button onClick={addToCart} size="l" $bgColor="success">{isAddingToCart ?
                                <MdDone size={24} /> :
                                (<>
                                    <FaCartPlus style={{ height: "1rem" }} /> Add to cart
                                </>)}
                            </Button>
                        </div>
                    </div>
                    <div>
                        <Image src={images[0]} alt="Featured product" width={350} height={200} />
                    </div>
                </Wrapper>
            </Centered>
        </StyledDiv>
    )
}

export default Featured
