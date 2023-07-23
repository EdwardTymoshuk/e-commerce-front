import styled from "styled-components"

const StyledInput = styled.input`
    max-width: 100%;
    padding: 2px;
    margin-bottom: 5px;
    line-height: 2rem
`

const Input = (props) => {
  return (
    <StyledInput {...props} />
  )
}

export default Input
