import { styled } from "styled-components"
import Link from "next/link"

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
    return (
        <StyledNav>
            <Link href={'/'}>Home</Link>
            <Link href={'/products'}>Products</Link>
            <Link href={'/categories'}>Categories</Link>
            <Link href={'/account'}>Account</Link>
            <Link href={'/cart'}>Cart (0)</Link>
        </StyledNav>
    )
}

export default Nav