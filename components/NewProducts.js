import styled from "styled-components"
import Centered from "./Centered"
import ProductBox from "./ProductBox"

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: .75rem;
  padding: 1rem 0;
`

const Title = styled.h2`
  font-size: 2rem;
  margin:30px 0 20px;
  font-weight: normal;
  color: var(--dark-text-color);
  text-align: left;
`;

const NewProducts = ({products}) => {
  return (
    <div>
      <Centered> 
      <Title>New Arrivals</Title>
        <ProductsGrid>
          {products?.length > 0 && products.map(item => (
            <ProductBox {...item}/>
          ))}
        </ProductsGrid>
      </Centered>
    </div>
  )
}

export default NewProducts
