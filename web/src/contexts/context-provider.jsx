/* eslint-disable react/prop-types */
import { createContext, useState } from 'react'

export const Context = createContext()

export const ContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState(
    localStorage?.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : []
  )

  const addToCart = (product, quantity) => {
    let items = [...cartItems]
    const index = items?.findIndex((item) => item.id == product?.id)

    if (index !== -1) items[index].attributes.quantity += quantity
    else {
      product.attributes.quantity = quantity
      items = [...items, product]
    }

    setCartItems(items)
    localStorage.setItem('cartItems', JSON.stringify(items))
  }

  const handleQuantity = (product, type) => {
    let items = [...cartItems]
    const index = items?.findIndex((item) => item.id === product?.id)

    if (type === 'add') {
      items[index].attributes.quantity += 1
    } else if (type === 'remove') {
      if (items[index].attributes.quantity === 1) return
      items[index].attributes.quantity -= 1
    }

    setCartItems(items)
    localStorage.setItem('cartItems', JSON.stringify(items))
  }

  const removeFromCart = (id) => {
    const items = cartItems.filter((item) => item.id !== id)

    setCartItems(items)
    localStorage.setItem('cartItems', JSON.stringify(items))
  }

  return (
    <Context.Provider
      value={{
        categories,
        setCategories,
        products,
        setProducts,
        cartItems,
        addToCart,
        removeFromCart,
        handleQuantity,
      }}
    >
      {children}
    </Context.Provider>
  )
}
