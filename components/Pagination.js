import { styled } from "styled-components"
import Button from "./Button"

const PaginationWrapper = styled.div`
  display: flex;
  align-self: center;
  gap: 0.5rem;
  padding: 20px;

`

const Pagination = ({handlePageChange, totalPages, currentPage}) => {
    
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
        <PaginationWrapper>
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
        </PaginationWrapper>
    )
}

export default Pagination