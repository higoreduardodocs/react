export const fetchUser = () => {
  const user =
    localStorage.getItem('user') !== 'undefined'
      ? JSON.parse(localStorage.getItem('user'))
      : null

  return user
}

export const fetchCartItems = () => {
  const cartItems =
    localStorage.getItem('cartItems') !== 'undefined'
      ? JSON.parse(localStorage.getItem('cartItems'))
      : null

  return cartItems
}
