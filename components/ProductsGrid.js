import React from "react"
import { styled } from "styled-components"
import ProductBox from "./ProductBox"
import { device } from "@/utils/devices"
import { useState } from "react"
import Button from "./Button"

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

const Pagination = styled.div`
  display: flex;
  align-self: center;
  gap: 0.5rem;
  padding: 20px;

`

const ProductsGrid = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 4
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(products.length / productsPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const generatePaginationButtons = () => {
    const buttons = []

    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <Button $active={currentPage === i ? "true" : "false"} key={i} onClick={() => handlePageChange(i)}>
            {i}
          </Button>
        )
      }
    } else {
      if (currentPage <= 2) {
        for (let i = 1; i <= 3; i++) {
          buttons.push(
            <Button $active={currentPage === i ? "true" : "false"} key={i} onClick={() => handlePageChange(i)}>
              {i}
            </Button>
          )
        }
      } else if (currentPage >= totalPages - 1) {
        for (let i = totalPages - 2; i <= totalPages; i++) {
          buttons.push(
            <Button $active={currentPage === i ? "true" : "false"} key={i} onClick={() => handlePageChange(i)}>
              {i}
            </Button>
          )
        }
      } else {
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          buttons.push(
            <Button $active={currentPage === i ? "true" : "false"}  key={i} onClick={() => handlePageChange(i)}>
              {i}
            </Button>
          )
        }
      }
    }
    return buttons
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
      <Pagination>
        {currentPage !== 1 && (
          <Button $active='false' onClick={() => handlePageChange(1)}>{"<<"}</Button>
        )}
        {currentPage !== 1 && (
          <Button $active='false' onClick={() => handlePageChange(currentPage - 1)}>{"<"}</Button>
        )}

        {generatePaginationButtons()}

        {currentPage !== totalPages && totalPages !== 0 && (
          <Button $active='false' onClick={() => handlePageChange(currentPage + 1)}>{">"}</Button>
        )}
        {currentPage !== totalPages && totalPages !== 0 && (
          <Button $active='false' onClick={() => handlePageChange(totalPages)}>{">>"}</Button>
        )}
      </Pagination>}
    </ProductsGridWrapper>
  )
}

export default ProductsGrid