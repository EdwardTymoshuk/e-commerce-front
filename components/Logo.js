import Link from "next/link"
import { GiPlanetConquest } from "react-icons/gi"
import { styled } from "styled-components"

const StyledLink = styled(Link)`
    color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.25rem;
` 

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