import { device } from "@/utils/devices"
import { styled } from "styled-components"

const StyledDiv = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  padding-top: 73.5px;
  @media ${device.tablet} {
    padding-top: 0;
  }
`

const Centered = ({children}) => {
  return (
    <StyledDiv>{children}</StyledDiv>
  )
}

export default Centered
