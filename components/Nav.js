import { styled } from "styled-components"
import Link from "next/link"
import { useContext } from "react"
import { CartContext } from "./CartContext"

const StyledNav = styled.nav`
    display: flex;
    gap: 0.5rem;
        a {
            color: white;
            transition: .2s
        }
        a:hover {
                color: var(--primary-color);
            }
`

const Nav = () => {
    const {cartProducts} = useContext(CartContext)
    return (
        <StyledNav>
            <Link href={'/'}>Home</Link>
            <Link href={'/products'}>Products</Link>
            <Link href={'/categories'}>Categories</Link>
            <Link href={'/account'}>Account</Link>
            <Link href={'/cart'}>Cart ({cartProducts.length})</Link>
        </StyledNav>
    )
}

export default Nav