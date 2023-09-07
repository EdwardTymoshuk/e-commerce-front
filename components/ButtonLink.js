import styled from "styled-components"
import { ButtonStyle } from "./Button"
import Link from "next/link"

// Styled component that extends ButtonStyle
const StyledLink = styled(Link)`
  ${ButtonStyle}
`

// ButtonLink component that renders a styled link
const ButtonLink = (props) => {
  return (
    <StyledLink {...props} />
  )
}

export default ButtonLink
