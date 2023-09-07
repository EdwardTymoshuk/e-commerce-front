import { device } from "@/utils/devices"
import { styled } from "styled-components"

// Define a styled div with certain styles
const StyledDiv = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  padding-top: 73.5px;
  @media ${device.tablet} {
    padding-top: 0;
  }
`

// Create a Centered component that wraps its children with the StyledDiv
const Centered = ({ children }) => {
  return (
    <StyledDiv>{children}</StyledDiv>
  )
}

export default Centered