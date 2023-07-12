import { styled } from "styled-components"
import Logo from "./Logo"
import Nav from "./Nav"

const StyledHeader = styled.header`
    display: flex;
    flex-direction: row;
    background-color: var(--header-color);
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
`

const Header = () => {
    return (
        <StyledHeader>
            <Logo size={36} />
            <Nav />
        </StyledHeader>
    )
}

export default Header