import { styled } from "styled-components"

const StyledDiv = styled.div`
    display: flex;
    justify-content: center;
    padding: 0 2rem;
`

const Centered = ({children}) => {
  return (
    <StyledDiv>{children}</StyledDiv>
  )
}

export default Centered
