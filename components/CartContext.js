import { createContext, useEffect, useState } from "react"
import { toast } from "react-hot-toast"

// Create a context for the cart
export const CartContext = createContext({})

const CartContextProvider = ({ children, product }) => {
  // Check if localStorage is available
  const ls = typeof window !== 'undefined' ? localStorage : null
  // Initialize cartProducts state
  const [cartProducts, setCartProducts] = useState([])

  // Save cartProducts to localStorage when it changes
  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls.setItem('cart', JSON.stringify(cartProducts))
    }
  }, [cartProducts])

  // Load cartProducts from localStorage on component mount
  useEffect(() => {
    ls && ls.getItem('cart') && setCartProducts(JSON.parse(ls.getItem('cart')))
  }, [])

  // Add a product to the cart
  const addProduct = (productId, isToast) => {
    setCartProducts(prev => [...prev, productId])
    isToast && toast.success(`The product has been added to the cart.`)
  }

  // Remove a product from the cart
  const removeProduct = (productId) => {
    setCartProducts(prev => {
      const pos = prev.indexOf(productId)
      if (pos !== -1) {
        return prev.filter((value, index) => index !== pos)
      }
      return prev
    })
  }

  // Clear the entire cart
  const clearCart = () => {
    setCartProducts([])
    ls.removeItem('cart')
  }

  return (
    // Provide cart-related functions and data to children components
    <CartContext.Provider value={{ cartProducts, setCartProducts, addProduct, removeProduct, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
