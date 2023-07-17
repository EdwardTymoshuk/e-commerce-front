import React, { useContext } from "react"
import Centered from "./Centered"
import { styled } from "styled-components"
import Button from "./Button"
import { FaCartPlus } from 'react-icons/fa'
import ButtonLink from "./ButtonLink"
import { CartContext } from "./CartContext"

const StyledDiv = styled.div`
    display: flex;
    background-color: var(--header-color);
    div {
        flex-direction: column;
    }
`
const Title = styled.h1`
    margin: 0;
    font-weight: normal;
    color: white;
`
const Desc = styled.p`
    color: var(--text-color);
    font-size: .8rem;
    `

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: .9fr 1.1fr;
    gap: 2rem;
    img {
        max-width: 100%;
    }
    div {
        display: flex;
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
