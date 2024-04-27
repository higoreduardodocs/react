import { useContext, useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

import { AuthContext } from 'src/contexts/auth-context'
import { CartContext } from 'src/contexts/cart-context'

function Header() {
  const navigate = useNavigate()
  const { auth, handleAuth } = useContext(AuthContext)
  const { cart } = useContext(CartContext)
  const [quantity, setQuantity] = useState(0)
  const [search, setSearch] = useState('')

  const handleLogout = () => {
    localStorage.removeItem('auth')
    handleAuth({ user: null, token: '' })
  }

  const countCartQuantity = () => {
    setQuantity(
      !cart?.length > 0
        ? 0
        : cart.reduce((acc, cur) => acc + cur.cartQuantity, 0)
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`/search/${search}`)
    setSearch('')
  }

  useEffect(() => {
    countCartQuantity()
  }, [cart]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <header className="container header">
      <Link to="/" className="brand">
        Ecommerce.
      </Link>

      <form onSubmit={handleSubmit} className="flex-between">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <nav className="nav">
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
        <NavLink to="/categories" className="nav-link">
          Categories
        </NavLink>
        <NavLink to="/cart" className="nav-link">
          Cart
          <span className="badge">{quantity}</span>
        </NavLink>
        {auth?.user ? (
          <>
            <NavLink
              to={`/dashboard/${
                auth?.user?.role === 'user' ? 'auth' : 'admin'
              }`}
              className="nav-link"
            >
              Dashboard
            </NavLink>
            <NavLink to="/login" className="nav-link" onClick={handleLogout}>
              Logout
            </NavLink>
          </>
        ) : (
          <NavLink to="/login" className="nav-link">
            Login
          </NavLink>
        )}
      </nav>
    </header>
  )
}

export default Header
