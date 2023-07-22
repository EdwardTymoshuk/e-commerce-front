import { styled } from "styled-components"
import ProductBox from "./ProductBox"


const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: .75rem;
  padding: 1rem 0;
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
