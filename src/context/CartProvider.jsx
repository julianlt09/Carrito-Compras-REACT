import { useReducer } from 'react'
import { CartContext } from './CartContext'

const cartReducer = (state = [], action = {}) => {
  switch (action.type) {
    case '[cart] ADD Product':
      return [...state, action.payload]
    case '[cart] Remove Product':
      return state.filter(product => product.id !== action.payload)
    case '[cart] Increment Quantity':
      return state.map(product =>
        product.id === action.payload
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    case '[cart] Decrement Quantity':
      return state.map(product =>
        product.id === action.payload && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    default:
      return state
  }
}

export const CartProvider = ({ children }) => {

  const [shoppingList, dispatch] = useReducer(cartReducer, [])

  const addProduct = (product) => {
    dispatch({ type: '[cart] ADD Product', payload: { ...product, quantity: 1 } })
  }

  const removeProduct = (id) => {
    dispatch({ type: '[cart] Remove Product', payload: id })
  }

  const incrementQuantity = (id) => {
    dispatch({ type: '[cart] Increment Quantity', payload: id })
  }

  const decrementQuantity = (id) => {
    dispatch({ type: '[cart] Decrement Quantity', payload: id })
  }

  return (
    <CartContext.Provider value={{ shoppingList, addProduct, removeProduct, incrementQuantity, decrementQuantity }}>
      {children}
    </CartContext.Provider>
  )
}