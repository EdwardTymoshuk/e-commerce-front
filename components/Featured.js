import React, { useContext } from "react"
import Centered from "./Centered"
import { styled } from "styled-components"
import Button from "./Button"
import { FaCartPlus } from 'react-icons/fa'
import ButtonLink from "./ButtonLink"
import { CartContext } from "./CartContext"
import { device } from "@/utils/devices"

const StyledDiv = styled.div`
    display: flex;
    background-color: var(--header-color);
    @media ${device.tablet} {
        padding: 0;
    }
`
const Title = styled.h1`
    margin: 0;
    font-weight: normal;
    color: white;
    @media ${device.laptopL} {
        font-size: 2.2rem;
    }
`
const Desc = styled.p`
    color: var(--text-color);
    font-size: .8rem;
    @media ${device.laptopL} {
        font-size: 1.1rem;
    }
    `

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
        max-width: 100%;
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

const Featured = ({product}) => {
    const {addProduct} = useContext(CartContext)
    const addToCart = () => {
        addProduct (product._id)
    }
    const {title, _id, images} = product
    return (
        <StyledDiv>
            <Centered>
            <Wrapper>
                <div>
                <Title>{title}</Title>
                <Desc>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo sapiente nostrum eaque doloremque nemo dignissimos earum voluptatem dolor eveniet ex maiores non eos nobis commodi, sequi eius, enim itaque eligendi.</Desc>
                <div>
                <ButtonLink href={'/product/'+_id} $outliner={1} size="l">Read more</ButtonLink>
                <Button onClick={addToCart} size="l" $bgColor="success"><FaCartPlus style={{height: "1rem"}}/> Add to cart</Button>
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

export default Featured;
