import { styled } from "styled-components"
import Link from "next/link"
import { useContext } from "react"
import { CartContext } from "./CartContext"
import { device } from "@/utils/devices"

// Define a styled navigation element with conditional styles for mobile
const StyledNav = styled.nav`
    visibility: ${props => (props.$isMobileNavActive ? "visible" : "hidden")};
    opacity: ${props => (props.$isMobileNavActive ? 1 : 0)};
    gap: 0.5rem;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 5rem 2rem 2rem;
    font-size: 1.5rem;
    background-color: var(--header-color);
    transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
    @media ${device.tablet} {
        padding: 0;
        font-size: 1rem;
        visibility: visible;
        opacity: 1;
        display: flex;
        position: static;
    }
    a {
        display: block;
        color: white;
        transition: .2s;
        padding: .2rem 0;
        @media ${device.tablet} {
            padding: 0;
        }
    }
    a:hover {
        color: var(--primary-color);
    }
`

// Define the Nav component
const Nav = ({...props}) => {
    const {cartProducts} = useContext(CartContext)

    return (
        <StyledNav {...props}>
            <Link href={"/"}>Home</Link>
            <Link href={"/products"}>Products</Link>
            <Link href={"/cart"}>Cart ({cartProducts.length})</Link>
        </StyledNav>
    )
}

export default Nav