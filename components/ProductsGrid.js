import { styled } from "styled-components"
import ProductBox from "./ProductBox"
import { device } from "@/utils/devices"
import { useState } from "react"
import Pagination from "./Pagination"

const ProductsGridWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 0.75rem;
  padding: 1rem 0;
  width: 100%;
  @media ${device.mobileL} {
    grid-template-columns: repeat(2, 1fr);
  }
  @media ${device.tablet} {
    grid-template-columns: repeat(3, 1fr);
  }
  @media ${device.laptop} {
    grid-template-columns: repeat(4, 1fr);
  }
`


const ProductsGrid = ({ products, pagination, currentPage, setCurrentPage}) => {
  const productsPerPage = 8
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(products.length / productsPerPage)



  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  
  return (
    <ProductsGridWrapper>
      <StyledProductsGrid>
        {currentProducts?.length > 0 &&
          currentProducts.map((item) => (
            <ProductBox key={item._id} {...item} />
          ))}
      </StyledProductsGrid>
{      totalPages > 1 &&
    pagination && <Pagination handlePageChange={handlePageChange} totalPages={totalPages} currentPage={currentPage}/>
}
    </ProductsGridWrapper>
  )
}

export default ProductsGrid