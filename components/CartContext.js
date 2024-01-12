import { createContext, useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { styled } from "styled-components"
import Button from "./Button"

const ToastdDiv = styled.div`
  display: flex;
  flex-direction: column;
`
const ButtonsWraper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  width: 100%;
`

// Create a context for the cart
export const CartContext = createContext({})

const CartContextProvider = ({ children, product }) => {
  // Check if localStorage is available
  const ls = typeof window !== "undefined" ? localStorage : null
  // Initialize cartProducts state
  const [cartProducts, setCartProducts] = useState([])

  // Save cartProducts to localStorage when it changes
  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls.setItem("cart", JSON.stringify(cartProducts))
    }
  }, [cartProducts])

  // Load cartProducts from localStorage on component mount
  useEffect(() => {
    ls && ls.getItem("cart") && setCartProducts(JSON.parse(ls.getItem("cart")))
  }, [])

  // Add a product to the cart
  const addProduct = (productId, isToast) => {
    setCartProducts(prev => [...prev, productId])
    isToast && toast.success(`The product has been added to the cart.`)
  }

  // Remove a one unit of product from the cart
  const removeProduct = (productId) => {
    setCartProducts(prev => {
      const pos = prev.indexOf(productId)
      if (pos !== -1) {
        return prev.filter((value, index) => index !== pos)
      }
      return prev
    })
  }

  // Remove product from the cart
  const deleteProduct = (productId, isToast) => {
    console.log(cartProducts)
    setCartProducts(prev => {
        return prev.filter((value, index) => value !== productId )
    })
    isToast && toast.success(`The product has been removed from the cart`)
  }

  // Clear cart
  const clearCart = ({isAutoClear}) => {
    console.log(isAutoClear)
    !isAutoClear ?
    toast(() => (
      <ToastdDiv>
        <h5>
        Are you sure? All products will be removed from the cart!
        </h5>
        <ButtonsWraper>
        <Button
          onClick={() => {
            setCartProducts([])
            ls.removeItem("cart")
            toast.success("Cart cleared!")
            toast.dismiss()
          }}
          $bgColor="danger"
          size="md"
        >
          Delete
        </Button>
        <Button
          onClick={() => {
            toast.dismiss()
          }}
          size="md"
        >
          Cancel
        </Button>
        </ButtonsWraper>
      </ToastdDiv> 
    ))
    :
    setCartProducts([])
    ls.removeItem("cart")
  }
  

  return (
    // Provide cart-related functions and data to children components
    <CartContext.Provider value={{ cartProducts, setCartProducts, addProduct, removeProduct, deleteProduct, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
