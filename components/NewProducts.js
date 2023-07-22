import styled from "styled-components"
import Centered from "./Centered"
import ProductsGrid from "./ProductsGrid";

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
        <ProductsGrid products={products} />
      </Centered>
    </div>
  )
}

export default NewProducts
