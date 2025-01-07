'use client'

import { createContext, useContext, useReducer, useEffect, useState } from 'react'

const CartContext = createContext()

const initialState = {
  items: [],
  total: 0,
  isOpen: false
}
// 從 localStorage 獲取初始狀態
const getInitialState = () => {
  if (typeof window === 'undefined') {
    return initialState
  }
  
  try {
    const savedCart = localStorage.getItem('cart')
    return savedCart ? JSON.parse(savedCart) : initialState
  } catch (error) {
    console.error('Error reading from localStorage:', error)
    return initialState
  }
}
function cartReducer(state, action) {

  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.payload.id
      )

      if (existingItemIndex > -1) {
        const newItems = [...state.items]
        newItems[existingItemIndex].quantity += 1
        return {
          ...state,
          items: newItems,
          total: calculateTotal(newItems)
        }
      }

      const newItems = [...state.items, { ...action.payload, quantity: 1 }]
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems)
      }
    }
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload)
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems)
      }
    }
    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item => {
        if (item.id === action.payload.id) {
          return { ...item, quantity: action.payload.quantity }
        }
        return item
      })
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems)
      }
    }
    case 'TOGGLE_CART': {
      return {
        ...state,
        isOpen: !state.isOpen
      }
    }
    default:
      return state
  }
}

function calculateTotal(items) {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0)
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, getInitialState())
  const [isInitialized, setIsInitialized] = useState(false)
  useEffect(() => {
    if (!isInitialized) {
      const savedState = getInitialState()
      if (savedState !== initialState) {
        dispatch({ type: 'INITIALIZE', payload: savedState })
      }
      setIsInitialized(true)
    }
  }, [isInitialized])

  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      try {
        localStorage.setItem('cart', JSON.stringify(state))
      } catch (error) {
        console.error('Error saving to localStorage:', error)
      }
    }
  }, [state, isInitialized])
  // 當 state 改變時，更新 localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(state))
    }
  }, [])
  const addItem = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item })
  }

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }

  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  }

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' })
  }

  const value = {
    items: state.items,
    total: state.total,
    isOpen: state.isOpen,
    addItem,
    removeItem,
    updateQuantity,
    toggleCart
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}