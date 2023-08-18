import { createContext, useEffect, useState } from "react"
import { toast } from "react-hot-toast"

export const CartContext = createContext({})

const CartContextProvider = ({ children, product }) => {
    const ls = typeof window !== 'undefined' ? localStorage : null
    const [cartProducts, setCartProducts] = useState([])
    useEffect(() => {
        if (cartProducts?.length > 0) {
            ls.setItem('cart', JSON.stringify(cartProducts))
        }
    }, [cartProducts])
    useEffect(() => {
        ls && ls.getItem('cart') && setCartProducts(JSON.parse(ls.getItem('cart')))
    }, [])
    const addProduct = (productId, isToast) => {
        setCartProducts(prev => [...prev, productId])
        isToast && toast.success(`The product has been added to the cart.`)
    }

    const removeProduct = (productId) => {
        setCartProducts(prev => {
            const pos = prev.indexOf(productId)
            if (pos !== -1) {
                return prev.filter((value, index) => index !== pos)
            }
            return prev
        })
    }
    const clearCart = () => {
        setCartProducts([])
        ls.removeItem('cart')
      }

    return (
        <CartContext.Provider value={{ cartProducts, setCartProducts, addProduct, removeProduct, clearCart }}>{children}</CartContext.Provider>
    )
}

export default CartContextProvider
