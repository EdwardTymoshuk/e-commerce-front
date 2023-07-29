import Link from "next/link"
import styled from "styled-components"
import Button from "./Button"
import { useContext } from "react"
import { CartContext } from "./CartContext"
import { device } from "@/utils/devices"

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
    max-height: 160px;
  }
`

const ProductInfoBox = styled.div`
  margin-top: 5px;
  text-align: center ;
`

const PriceRow = styled.div`
  display: grid;
  align-items: center;
  padding-top: 5px;
  @media ${device.mobileL} {
    display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2px;
  }
`

const Price = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: var(--dark-text-color);
  @media ${device.mobileL}  {
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
