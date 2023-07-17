import Link from "next/link"
import styled from "styled-components"
import Button from "./Button"
import { FaCartPlus } from "react-icons/fa"
import { useContext } from "react"
import { CartContext } from "./CartContext"

const ProductWrapper = styled.div`
  
`

const ImageBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 160px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img{
    max-width: 100%;
    max-height: 130px;
  }
`

const ProductInfoBox = styled.div`
  margin-top: 5px;
  text-align: center ;
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

const Title = styled(Link)`
  font-weight: normal;
  font-size: .9rem;
  color: var(--dark-text-color);
  text-decoration: none;
  margin: 0;
  text-align: center;
`

const ProductBox = ({ _id, title, description, price, images }) => {
    const {addProduct} = useContext(CartContext)
    const url = '/product/' + _id;
    return (
        <ProductWrapper>
            <ImageBox href={url}>
                <img src={images[0]} alt="Product image" />
            </ImageBox>
            <ProductInfoBox>
                <Title href={url}>{title}</Title>
                <PriceRow>
                    <Price>
                        ${price}
                    </Price>
                    <Button onClick={() => addProduct(_id)} size="s" $bgColor="success">Add to cart</Button>
                </PriceRow>
            </ProductInfoBox>
        </ProductWrapper>
    )
}

export default ProductBox
