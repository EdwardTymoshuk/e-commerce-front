import styled, { css } from "styled-components"

export const ButtonStyle = css`
        background-color: var(--primary-color);
        font-family: 'Poppins', sans-serif;
        font-size: .8rem;
        border: 0;
        padding: .5rem 1rem;
        border-radius: .2rem;
        display: flex;
        align-items: center;
        gap: inherit;

        ${props => props.size === 'l' && css`
          font-size: 1rem;
        `}
        ${props => props.$bgColor === 'success' && css`
        background-color: var(--success-color);
        border: 1px solid;
        border-color: var(--success-color);
        &:hover {
          background-color: var(--light-success-color);
          border-color: var(--light-success-color);
        }
        `}
        ${props => props.$bgColor === 'danger' && css`
        background-color: var(--danger-color);
        border: 1px solid;
        border-color: var(--danger-color);
        &:hover {
          background-color: var(--light-danger-color);
          border-color: var(--light-danger-color);
        }
        `}
        ${props => props.$outliner && css`
        background-color: transparent;
        border: 1px solid;
        border-color: var(--primary-color);
        &:hover {
          background-color: var(--primary-color);
          color: var(--dark-text-color);
          transition: ease-in .5;
        }
        `}
`

const Button = ({children, backgroundColor, ...rest}) => {

    const StyledButton = styled.button`
        ${ButtonStyle}
    `
  return (
    <StyledButton {...rest}>{children}</StyledButton>
  )
}

export default Button
