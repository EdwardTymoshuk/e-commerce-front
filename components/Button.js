import { device } from "@/utils/devices"
import styled, { css } from "styled-components"

export const ButtonStyle = css`
        background-color: var(--primary-color);
        font-family: 'Poppins', sans-serif;
        font-size: .8rem;
        color: var(--text-color);
        border: 1px solid var(--primary-color);
        padding: .3rem .8rem;
        border-radius: .2rem;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        gap: inherit;
        transition: ease-in 0.07s;
        @media ${device.tablet} {
          padding: .5rem 1rem;
        }
        &:hover {
          background-color: var(--light-primary-color);
          color: white;
        }
        ${props => props.size === 'md' && css`
          font-size: .8rem;
        `}
        ${props => props.size === 'l' && css`
          font-size: 1rem;
        `}
        ${props => props.block && css`
          display: block;
          width: 100%;
        `}
        ${props => props.$bgColor === 'success' && css`
        background-color: var(--success-color);
        border: 1px solid;
        border-color: var(--success-color);
        &:hover {
          background-color: var(--light-success-color);
          border-color: var(--light-success-color);
          color: white;
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
        ${props => props.$bgColor === 'black' && css`
        background-color: #000;
        border: 1px solid;
        border-color: #000;
        &:hover {
          background-color: #242424;
          border-color: #242424;
        }
        `}
        ${props => props.$outliner && css`
        background-color: transparent;
        border: 1px solid;
        border-color: var(--primary-color);
        color: var(--text-color);
        &:hover {
          background-color: var(--primary-color);
          color: var(--dark-text-color);
        }
        `}
        ${props => props.$active === 'false' && css`
        background-color: transparent;
        border: 1px solid;
        border-color: var(--primary-color);
        color: var(--primary-color);
        &:hover {
          background-color: var(--primary-color);
          color: var(--dark-text-color);
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
