import { useContext } from 'react'

import { StateContext } from './state-provider'
import { fetchCartItems, fetchUser } from '../utils/fetch-localStorage'

export const initialState = {
  user: fetchUser(),
  foodItems: null,
  showCart: false,
  cartItems: fetchCartItems(),
}

export const useStateValue = () => useContext(StateContext)
