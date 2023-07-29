import { styled } from "styled-components"
import ProductBox from "./ProductBox"
import { device } from "@/utils/devices"


const StyledProductsGrid = styled.div`
     display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: .75rem;
  padding: 1rem 0;
  @media ${device.mobileL} {
    grid-template-columns: repeat(2, 1fr);
  }
  @media ${device.tablet} {
    grid-template-columns: repeat(4, 1fr);
  }
`

const ProductsGrid = ({products}) => { 
    
  return (
    <StyledProductsGrid>
       {products?.length > 0 && products.map(item => (
            <ProductBox key={item._id} {...item}/>
          ))}
    </StyledProductsGrid>
  )
}

export default ProductsGrid
