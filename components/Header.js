import { styled } from "styled-components"
import Logo from "./Logo"
import Nav from "./Nav"
import { BiMenu } from "react-icons/bi"
import { device } from "@/utils/devices"
import { useState } from "react"

const StyledHeader = styled.header`
    top:0;
    display: flex;
    flex-direction: row;
    position: fixed;
    background-color: var(--header-color);
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
    color: var(--text-color);
    width: 100%;
    box-sizing: border-box;
    z-index: 1;
    @media ${device.tablet} {
        position: relative;
    }
`
const NavButton = styled.button`
    background-color: transparent;
    border: 0;
    position: relative;
    @media ${device.tablet} {
        display: none;
    }
`

const Header = () => {
    const [ mobileNavActive, setMobileNavActive ] = useState(false)
    return (
        <StyledHeader>
            <Logo size={36} />
            <Nav mobileNavActive={mobileNavActive}/>
            <NavButton onClick={() => setMobileNavActive(prev => !prev)}><BiMenu size={36}/></NavButton>
        </StyledHeader>
    )
}

export default Header