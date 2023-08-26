import { styled } from "styled-components"
import Logo from "./Logo"
import Nav from "./Nav"
import Centered from "./Centered"
import Link from "next/link"
import { device } from "@/utils/devices"
import { useContext } from "react"
import { CartContext } from "./CartContext"

const StyledFooter = styled.footer`
  position: sticky;
  display: grid;
  grid-template-columns: 1fr;
    text-align: center;
  align-items: center;
  background-color: var(--header-color);
  min-height: 80px;
  top: 100vh;
  padding: 1rem 2rem;
  div:first-child {
    justify-self: start;
  }
  div:nth-child(2) {
    justify-self: center;
  }
  div:last-child {
    grid-column: span 2;
    @media ${device.mobileL} {
      grid-column: auto;
      justify-self: end;
    }
  }
  nav {
    display: flex;
    flex-direction: column;
  }
  @media ${device.mobileL} {
    grid-template-columns: repeat(3, 1fr);
  }
`
const StyledList = styled.ul`
  text-decoration: none;
  list-style: none;
  color: var(--text-color);
  padding: 0;
  li {
    padding: .2rem;
  }
  a:hover {
    color: var(--primary-color);
  }
`

const Footer = () => {
  const {cartProducts} = useContext(CartContext)
  return (
    <StyledFooter>
      <div>
        <StyledList>
            <li><Link href={'/'}>Home</Link></li>
            <li><Link href={'/products'}>Products</Link></li>
            <li><Link href={'/cart'}>Cart ({cartProducts.length})</Link></li>
        </StyledList>
      </div>
      <div>
        <Logo size={48} />
      </div>
      <div>
      <StyledList>
        <li><a href="tel:+480000000">+48 000 00 00</a></li>
        <li><a href="mailto:info@ecommerce-front.com">info@ecommerce-front.com</a></li>
        <li> <br />
        300 E St SW <br />
        Washington <br />
        DC 20546 <br />
        USA
        </li>
      </StyledList>
      </div>
    </StyledFooter>
  )
}

export default Footer
