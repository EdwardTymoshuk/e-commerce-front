import Button from "@/components/Button"
import { CartContext } from "@/components/CartContext"
import Centered from "@/components/Centered"
import Header from "@/components/Header"
import Input from "@/components/Input"
import Table from "@/components/Table"
import WhiteBox from "@/components/WhiteBox"
import { device } from "@/utils/devices"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { styled } from "styled-components"
import { BsFillHeartFill } from "react-icons/bs"
import Footer from "@/components/Footer"
import PageWrapper from "@/components/PageWrapper"
import Link from "next/link"
import Image from "next/image"

// Styled-components for styling elements
const ColumnsWraper = styled.div`
  display: flex;
  flex-direction: column;
  &>div {
    padding: 20px 0;
  }
    @media ${device.tablet} {
    display: grid;
    grid-template-columns: 1.3fr .7fr;
    gap: 50px;
    }
`
const ProductInfoCell = styled.td`
  padding: 10px 0;
`
const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display:flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img{
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img{
      max-width: 80px;
      max-height: 80px;
    }
  }
`
const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`
const CityHolder = styled.div`
  display:flex;
  flex-direction: column;
  gap: 5px;
  @media ${device.mobileM} {
    display: grid;
    grid-template-columns: 2fr 1fr;
    div {
      min-width: 100%;
      max-width: 100%;
      
    }
  }
`
const CityHolderInputWrapper = styled.div`
  display:flex;
  flex-direction: column;
`

const ErrorMessage = styled.span`
  color: var(--danger-color);
  font-size: small;
  padding-bottom: 5px;
  margin: 0;
`

const ThanksWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
  &>div {
      padding: 20px;
      @media ${device.mobileM} {
      padding: 50px;
    }
    @media ${device.tablet} {
      padding: 50px 100px;
    }
  }
  &>div>h3 {
    margin: 0;
  }
  &>div>p {
    text-align: center;
    color: var(--danger-color);
    margin: 1rem;
  }
`
// CartPage component
const CartPage = () => {
  // Using CartContext to manage cart state
  const { cartProducts, addProduct, removeProduct, clearCart } = useContext(CartContext)

  // State variables for managing form data and errors
  const [products, setProducts] = useState([])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [city, setCity] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [streetAddress, setStreetAddress] = useState("")
  const [country, setCountry] = useState("")
  const [nameError, setNameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [cityError, setCityError] = useState("")
  const [postalCodeError, setPostalCodeError] = useState("")
  const [streetAddressError, setStreetAddressError] = useState("")
  const [countryError, setCountryError] = useState("")
  const [inputError, setInputError] = useState({
    name: false,
    email: false,
    city: false,
    postalCode: false,
    streetAddress: false,
    country: false,
  })

  // State variable to track the success status of the order.
  const [isSuccess, setIsSuccess] = useState(false)

  // Load products in the cart from the server when the cartProducts change.
  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts })
        .then(response => {
          setProducts(response.data)
        })
    } else {
      setProducts([])
    }
  }, [cartProducts])

  // Check for a successful order completion and clear the cart.
  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }
    if (window?.location.href.includes("success")) {
      setIsSuccess(true)
      clearCart()
    }
  }, [])

  // Increase the quantity of a product in the cart.
  const moreOfThisProduct = (id) => (
    addProduct(id, false)
  )

  // Decrease the quantity of a product in the cart.
  const lessOfThisProduct = (id) => (
    removeProduct(id)
  )

  // Validate the name input field.
  const validateName = () => {
    let isValid = true
    if (!name) {
      setNameError("Name is required")
      setInputError((prevState) => ({ ...prevState, name: true }))
      isValid = false
    } else if (name.length < 2) {
      setNameError("Name must be at least 3 characters")
      setInputError((prevState) => ({ ...prevState, name: true }))
      isValid = false
    } else if (name.length > 50) {
      setNameError("Name must be less than 50 characters")
      setInputError((prevState) => ({ ...prevState, name: true }))
      isValid = false
    } else {
      setNameError("")
      setInputError((prevState) => ({ ...prevState, name: false }))
    }
    return isValid
  }

  // Validate the email input field.
  const validateEmail = () => {
    let isValid = true
    let validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (!email) {
      setEmailError("Email is required")
      setInputError((prevState) => ({ ...prevState, email: true }))
      isValid = false
    } else if (!email.match(validEmail)) {
      setEmailError("Invalid e-mail format")
      setInputError((prevState) => ({ ...prevState, email: true }))
      isValid = false
    } else if (email.length < 5) {
      setEmailError("Email must be at least 3 characters")
      setInputError((prevState) => ({ ...prevState, email: true }))
      isValid = false
    } else if (email.length > 75) {
      setEmailError("Email must be less than 75 characters")
      setInputError((prevState) => ({ ...prevState, email: true }))
      isValid = false
    } else {
      setEmailError("")
      setInputError((prevState) => ({ ...prevState, email: false }))
    }
    return isValid
  }

  // Validate the city input field.
  const validateCity = () => {
    let isValid = true
    if (!city) {
      setCityError("City is required")
      setInputError((prevState) => ({ ...prevState, city: true }))
      isValid = false
    } else if (city.length < 3) {
      setCityError("City must be at least 3 characters")
      setInputError((prevState) => ({ ...prevState, city: true }))
      isValid = false
    } else if (city.length > 50) {
      setCityError("City must be less than 50 characters")
      setInputError((prevState) => ({ ...prevState, city: true }))
      isValid = false
    } else {
      setCityError("")
      setInputError((prevState) => ({ ...prevState, city: false }))
    }
    return isValid
  }

  // Validate the postal code input field.
  const validatePostalCode = () => {
    let isValid = true
    let validPostalCode = /(^\d{5}$)|(^\d{2}-\d{3}$|(^\d{5}-\d{4}$))/
    if (!postalCode) {
      setPostalCodeError("Postal code is required")
      setInputError((prevState) => ({ ...prevState, postalCode: true }))
      isValid = false
    } else if (!postalCode.match(validPostalCode)) {
      setPostalCodeError("Invalid postal code")
      setInputError((prevState) => ({ ...prevState, postalCode: true }))
      isValid = false
    } else {
      setPostalCodeError("")
      setInputError((prevState) => ({ ...prevState, postalCode: false }))
    }
    return isValid
  }

  // Validate the street address input field.
  const validateStreetAddress = () => {
    let isValid = true
    if (!streetAddress) {
      setStreetAddressError("StreetAddress is required")
      setInputError((prevState) => ({ ...prevState, streetAddress: true }))
      isValid = false
    } else if (streetAddress.length < 3) {
      setStreetAddressError("Street address must be at least 3 characters")
      setInputError((prevState) => ({ ...prevState, streetAddress: true }))
      isValid = false
    } else if (streetAddress.length > 50) {
      setStreetAddressError("Street address must be less than 50 characters")
      setInputError((prevState) => ({ ...prevState, streetAddress: true }))
      isValid = false
    } else {
      setStreetAddressError("")
      setInputError((prevState) => ({ ...prevState, streetAddress: false }))
    }
    return isValid
  }

  // Validate the country input field.
  const validateCountry = () => {
    let isValid = true
    if (!country) {
      setCountryError("Country is required")
      setInputError((prevState) => ({ ...prevState, country: true }))
      isValid = false
    } else if (country.length < 3) {
      setCountryError("Country must be at least 3 characters")
      setInputError((prevState) => ({ ...prevState, country: true }))
      isValid = false
    } else if (country.length > 50) {
      setCountryError("Country must be less than 50 characters")
      setInputError((prevState) => ({ ...prevState, country: true }))
      isValid = false
    } else {
      setCountryError("")
      setInputError((prevState) => ({ ...prevState, country: false }))
    }
    return isValid
  }

  // Validate the entire form.
  const validateForm = () => {
    const nameValid = validateName()
    const emailValid = validateEmail()
    const cityValid = validateCity()
    const postalCodeValid = validatePostalCode()
    const streetAddressValid = validateStreetAddress()
    const countryValid = validateCountry()
  
    return nameValid && emailValid && cityValid && postalCodeValid && streetAddressValid && countryValid
  }

  const onBlurAction = (e, action) => {
    e.relatedTarget?.tagName === "BUTTON" ? () => validateForm() : action()
  }

  // Redirect to the payment page if the form is valid.
  const goToPayment = async () => {
    const formIsValid = validateForm()

    if (formIsValid) {
      const response = await axios.post("/api/checkout", {
        name, email, city, postalCode,
        streetAddress, country, cartProducts
      })
      if (response.data.url) return window.location = response.data.url
    }
  }

  // Calculate the total price of items in the cart.
  let total = 0
  for (const productId of cartProducts) {
    const price = products.find(value => value._id === productId)?.price || 0
    total += price
  }

  // Render a thank you message if the order was successful.
  if (isSuccess) return (
    <PageWrapper>
      <Header />
      <Centered>
        <ThanksWrapper>
          <WhiteBox>
            <h3>Thanks for your order!</h3>
            <span>Have an awesome day and come back soon!</span>
            <p><BsFillHeartFill /></p>
            <span>Forgot something ? Check our <Link style={{ color: "var(--primary-color)" }} href="/products">products!</Link></span>
          </WhiteBox>
        </ThanksWrapper>
      </Centered>
      <Footer />
    </PageWrapper>
  )

  // Render the cart and order information.
  return (
    <PageWrapper>
      <Header />
      <Centered>
        <ColumnsWraper>
          <div>
            <h2>Cart</h2>
            <WhiteBox>
              {!cartProducts?.length ?
                <div>
                  <h3>Your cart is empty...</h3>
                </div>
                :
                <Table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => (
                      <tr key={product._id}>
                        <ProductInfoCell>
                          <ProductImageBox>
                          <Image src={product.images[0]} alt={product.title} width={60} height={60} />
                          </ProductImageBox>
                          {product.title}
                        </ProductInfoCell>
                        <td>
                          <Button
                            onClick={() => lessOfThisProduct(product._id)}>-</Button>
                          <QuantityLabel>
                            {cartProducts.filter(id => id === product._id).length}
                          </QuantityLabel>
                          <Button
                            onClick={() => moreOfThisProduct(product._id)}>+</Button>
                        </td>
                        <td>
                          ${cartProducts.filter(id => id === product._id).length * product.price}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td>Total:</td>
                      <td></td>
                      <td>${total}</td>
                    </tr>
                  </tbody>
                </Table>
              }
            </WhiteBox>
          </div>
          <div>
            {!!cartProducts.length &&
              <>
                <h2>Order information</h2>
                <WhiteBox>
                  <Input type="text"
                    placeholder="Name"
                    value={name}
                    name="name"
                    onChange={ev => (setName(ev.target.value))}
                    onBlur={(e) => onBlurAction(e, validateName)} 
                    $inputError={inputError.name}
                  />
                  {nameError && <ErrorMessage>{nameError}</ErrorMessage>}
                  <Input type="text"
                    placeholder="Email"
                    value={email}
                    name="email"
                    onChange={ev => setEmail(ev.target.value)}
                    onBlur={(e) => onBlurAction(e, validateEmail)} 
                    $inputError={inputError.email}
                  />
                  {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
                  <CityHolder>
                    <CityHolderInputWrapper>
                      <Input type="text"
                        placeholder="City"
                        value={city}
                        name="city"
                        onChange={ev => setCity(ev.target.value)}
                        onBlur={(e) => onBlurAction(e, validateCity)} 
                        $inputError={inputError.city}
                      />
                      {cityError && <ErrorMessage>{cityError}</ErrorMessage>}
                    </CityHolderInputWrapper>
                    <CityHolderInputWrapper>
                      <Input type="text"
                        placeholder="Postal Code"
                        value={postalCode}
                        name="postalCode"
                        onChange={ev => setPostalCode(ev.target.value)}
                        onBlur={(e) => onBlurAction(e, validatePostalCode)} 
                        $inputError={inputError.postalCode}
                      />
                      {postalCodeError && <ErrorMessage>{postalCodeError}</ErrorMessage>}
                    </CityHolderInputWrapper>
                  </CityHolder>
                  <Input type="text"
                    placeholder="Street Address"
                    value={streetAddress}
                    name="streetAddress"
                    onChange={ev => setStreetAddress(ev.target.value)}
                    onBlur={(e) => onBlurAction(e, validateStreetAddress)} 
                    $inputError={inputError.streetAddress}
                  />
                  {streetAddressError && <ErrorMessage>{streetAddressError}</ErrorMessage>}
                  <Input type="text"
                    placeholder="Country"
                    value={country}
                    name="country"
                    onChange={ev => setCountry(ev.target.value)}
                    onBlur={(e) => onBlurAction(e, validateCountry)} 
                    $inputError={inputError.country}
                  />
                  {countryError && <ErrorMessage>{countryError}</ErrorMessage>}
                  <Button $block $bgColor="black" onClick={goToPayment}>Go to payment</Button>
                </WhiteBox>
              </>

            }
          </div>
        </ColumnsWraper>
      </Centered>
      <Footer />
    </PageWrapper>
  )
}

export default CartPage