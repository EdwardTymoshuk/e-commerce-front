import styled from "styled-components"
import Centered from "./Centered"
import ProductsGrid from "./ProductsGrid"
import { device } from "@/utils/devices"

// Define a styled title element
const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0 20px;
  font-weight: normal;
  color: var(--dark-text-color);
  text-align: center;
  @media ${device.tablet} {
    text-align: left;
  }
`

// Define the NewProducts component
const NewProducts = ({products}) => {
  return (
    <div>
      <Centered> 
        <Title>New Arrivals</Title>
        <ProductsGrid products={products} pagination={false} currentPage={1}/>
      </Centered>
    </div>
  )
}

export default NewProducts