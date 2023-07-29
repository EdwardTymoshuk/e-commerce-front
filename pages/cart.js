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

const ColumnsWraper = styled.div`
  display: flex;
  flex-direction: column;
  &>div {
    padding: 20px 0;
    @media ${device.mobileXL} {
      padding: inherit;
    }
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
  @media ${device.mobileXL} {
    flex-direction: row;
    input:first-child {
    flex: 3;
  }
  input:last-child {
    flex: 1;
  }
  }
`

const CartPage = () => {
  const { cartProducts, addProduct, removeProduct, clearCart } = useContext(CartContext)
  const [products, setProducts] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [streetAddress, setStreetAddress] = useState('')
  const [country, setCountry] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post('/api/cart', { ids: cartProducts })
        .then(response => {
          setProducts(response.data)
        })
    } else {
      setProducts([])
    }
  }, [cartProducts])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    if (window?.location.href.includes('success')) {
      setIsSuccess(true)
      clearCart()
    }
  }, []);

  const moreOfThisProduct = (id) => (
    addProduct(id)
  )
  const lessOfThisProduct = (id) => (
    removeProduct(id)
  )
  const goToPayment = async () => {
    const response = await axios.post('/api/checkout', {
      name, email, city, postalCode,
      streetAddress, country, cartProducts
    })
    if (response.data.url) return window.location = response.data.url
  }
  let total = 0
  for (const productId of cartProducts) {
    const price = products.find(value => value._id === productId)?.price || 0
    total += price
  }
  if (isSuccess) return (
    <>
      <Header />
      <Centered>
        <ColumnsWraper>
          <WhiteBox>
            <h3>Thanks for your order!</h3>
            <p>We will contact you.</p>
          </WhiteBox>
        </ColumnsWraper>
      </Centered>
    </>
  )

  return (
    <>
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
                            <img src={product.images[0]} alt="" />
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
                    onChange={ev => setName(ev.target.value)} />
                  <Input type="text"
                    placeholder="Email"
                    value={email}
                    name="email"
                    onChange={ev => setEmail(ev.target.value)} />
                  <CityHolder>
                    <Input type="text"
                      placeholder="City"
                      value={city}
                      name="city"
                      onChange={ev => setCity(ev.target.value)} />
                    <Input type="text"
                      placeholder="Postal Code"
                      value={postalCode}
                      name="postalCode"
                      onChange={ev => setPostalCode(ev.target.value)} />
                  </CityHolder>
                  <Input type="text"
                    placeholder="Street Address"
                    value={streetAddress}
                    name="streetAddress"
                    onChange={ev => setStreetAddress(ev.target.value)} />
                  <Input type="text"
                    placeholder="Country"
                    value={country}
                    name="country"
                    onChange={ev => setCountry(ev.target.value)} />
                  <Button block $bgColor="black" onClick={goToPayment}>Go to payment</Button>
                </WhiteBox>
              </>

            }
          </div>
        </ColumnsWraper>
      </Centered>
    </>
  )
}

export default CartPage
