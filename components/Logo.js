import Link from "next/link"
import { GiPlanetConquest } from "react-icons/gi"
import { styled } from "styled-components"

// Define a styled link element
const StyledLink = styled(Link)`
    color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.25rem;
    position: relative;
    z-index: 3;
` 

// Define the Logo component
const Logo = ({size}) => {
    return (
        <StyledLink href="/">
            <GiPlanetConquest size={size} color="var(--primary-color)"/>
            <div>
                E-commerce front
            </div>
        </StyledLink>
    )
}

export default Logo