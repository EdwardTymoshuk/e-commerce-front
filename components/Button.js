import { device } from "@/utils/devices"
import styled, { css } from "styled-components"

// CSS mixin for button styles
export const ButtonStyle = css`
  /* Basic button styles */
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
    border-color: var(--light-primary-color);
    color: white;
  }

  /* Button styles based on props */
  ${props => props.size === 'sm' && css`
    font-size: .6rem;
    padding: .2rem .6rem !important;
  `}
  ${props => props.size === 'md' && css`
    font-size: .8rem !important;
    padding: .25rem .7rem !important;
  `}

  ${props => props.size === 'l' && css`
    font-size: 1rem !important;
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
      border-color: var(--primary-color);
      color: var(--dark-text-color);
    }
  `}

  ${props => props.$active === 'false' && css`
    background-color: transparent;
    border: none;
    border-color: transparent;
    color: black;

    &:hover {
      background-color: var(--light-primary-color);
      color: var(--dark-text-color);
    }
  `}
  ${props => props.$deleteIco && css`
    background-color: transparent;
    border: none;
    border-color: transparent;
    color: var(--danger-color);
    font-size: .8rem;

    &:hover {
      background-color: transparent;
      border: none;
      border-color: transparent;
      color: red;
      transform: scale(1.1);
      transition: all ease-in .1s;
    }
  `}
`

export const StyledButton = styled.button`
${ButtonStyle}
`

const Button = ({ children, backgroundColor, ...rest }) => {
  return (
    <StyledButton {...rest}>{children}</StyledButton>
  )
}

export default Button