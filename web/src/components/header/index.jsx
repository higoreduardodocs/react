import { useContext, useEffect, useState } from 'react'
import { MdMenu, MdSearch, MdFavorite, MdShoppingCart } from 'react-icons/md'
import { Link } from 'react-router-dom'

import { Context } from 'src/contexts/context-provider'
import Search from './search'
import Cart from './cart'
import './header.style.scss'

function Header() {
  const { cartItems } = useContext(Context)
  const [scrolled, setScrolled] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showCart, setShowCart] = useState(false)

  const handleScroll = () => {
    const offset = window.scrollY
    if (offset > 200) setScrolled(true)
    else setScrolled(false)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  }, [])
  return (
    <header className={`header ${scrolled && 'fixed'}`}>
      <div className="header--content">
        <nav className="header--content-navbar">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/">About</Link>
            </li>
            <li>
              <Link to="/">Categories</Link>
            </li>
          </ul>
        </nav>

        <Link to="/" className="header--content-logo">
          DevStore.
        </Link>

        <div className="header--content-icons">
          <MdMenu className="header--content-icons-menu" />
          <MdSearch onClick={() => setShowSearch(true)} />
          <MdFavorite />
          <span
            className="header--content-icons-cart"
            onClick={() => setShowCart(true)}
          >
            <MdShoppingCart />
            {cartItems?.length > 0 && (
              <small>
                {cartItems?.reduce(
                  (acc, cur) => acc + cur.attributes.quantity,
                  0
                )}
              </small>
            )}
          </span>
        </div>
      </div>

      {showSearch && <Search setShowSearch={setShowSearch} />}
      {showCart && <Cart setShowCart={setShowCart} />}
    </header>
  )
}

export default Header
