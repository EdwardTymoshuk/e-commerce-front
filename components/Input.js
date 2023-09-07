import styled, { css } from "styled-components"

// Define a styled input element with conditional styles
const StyledInput = styled.input`
    max-width: 100%;
    padding: 2px;
    margin-top: 5px;
    line-height: 2rem;
    ${props => props.inputError && css`
        border: 1px solid var(--danger-color);
    `}
`

// Define the Input component
const Input = (props) => {
  return (
    <StyledInput {...props} />
  )
}

export default Input