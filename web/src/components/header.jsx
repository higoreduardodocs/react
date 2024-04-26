import {
  MdFastfood,
  MdShoppingBasket,
  MdAdd,
  MdLogout,
  MdMenuOpen,
  MdMenu,
} from 'react-icons/md'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

import { actionType } from '../contexts/reducer'
import { useStateValue } from '../contexts/initial-state'
import { app } from '../config/firebase'

const Header = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ])
  const [isMenu, setIsMenu] = useState(false)

  const firebaseAuth = getAuth(app)
  const provider = new GoogleAuthProvider()
  const [{ user, showCart, cartItems }, dispatch] = useStateValue()

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight])
    }

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  })

  const login = async () => {
    // const { user: { refreshToken, providerData } } = await signInWithPopup(firebaseAuth, provider)
    if (!user) {
      const {
        user: { providerData },
      } = await signInWithPopup(firebaseAuth, provider)
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      })
      localStorage.setItem('user', JSON.stringify(providerData[0]))
    } else {
      setIsMenu(!isMenu)
    }
  }

  const logout = () => {
    setIsMenu(!isMenu)
    localStorage.clear()
    dispatch({
      type: actionType.SET_USER,
      user: null,
    })
  }

  const toggleCart = () => {
    dispatch({
      type: actionType.SET_SHOW_CART,
      showCart: !showCart,
    })
  }

  return (
    <header className="fixed z-10 w-full py-3 px-4 md:py-6 md:px-16 bg-primary flex item-center justify-between">
      <Link to="/" className="flex items-center gap-2">
        <MdFastfood className="w-8 text-headingColor" />
        <span className="font-bold text-xl text-headingColor">Food</span>
      </Link>

      {((isOpenMenu && windowSize[0] <= 768) || windowSize[0] > 768) && (
        <motion.nav
          initial={{ opacity: 0.6, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0.6, scale: 0 }}
          className="flex md:flex-row md:relative md:w-auto md:py-0 md:shadow-none absolute top-full left-0 right-0 w-screen items-center gap-8 py-3 bg-primary shadow-xl
        flex-col"
        >
          <Link
            to="/"
            className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
          >
            Home
          </Link>
          <Link
            to="/menu"
            className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
          >
            Menu
          </Link>
          <Link
            to="/about-us"
            className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
          >
            About Us
          </Link>
          <Link
            to="/service"
            className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
          >
            Service
          </Link>
        </motion.nav>
      )}

      <div className="relative flex items-center gap-8">
        <span className="md:hidden">
          {isOpenMenu ? (
            <MdMenuOpen
              className="text-2xl text-textColor cursor-pointer"
              onClick={() => setIsOpenMenu(!isOpenMenu)}
            />
          ) : (
            <MdMenu
              className="text-2xl text-textColor cursor-pointer"
              onClick={() => setIsOpenMenu(!isOpenMenu)}
            />
          )}
        </span>

        {cartItems && (
          <motion.button
            whileTap={{ scale: 0.75 }}
            className="relative flex items-center justify-center"
            onClick={toggleCart}
          >
            <MdShoppingBasket className="text-2xl text-textColor cursor-pointer" />
            <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <small className="font-semibold text-xs text-white">
                {cartItems?.length}
              </small>
            </span>
          </motion.button>
        )}

        <motion.img
          whileTap={{ scale: 0.75 }}
          src={user ? user.photoURL : '/images/avatar-male.png'}
          alt="Profile"
          onClick={login}
          className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full drop-shadow-xl cursor-pointer"
        />

        {isMenu && (
          <motion.div
            initial={{ opacity: 0.6, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.6, scale: 0 }}
            className="absolute right-0 top-full w-40 rounded-lg bg-gray-50 shadow-xl"
          >
            <Link
              to="/create"
              className="flex items-center justify-between py-2 px-4 text-base text-textColor hover:bg-slate-100 transition-all ease-in-out duration-100 cursor-pointer"
            >
              Create item <MdAdd />
            </Link>
            <span
              onClick={logout}
              className="flex items-center justify-between py-2 px-4 m-2 rounded-md shadow-md bg-gray-200 text-base text-textColor hover:bg-gray-300 transition-all ease-in-out duration-100 cursor-pointer"
            >
              Logout <MdLogout />
            </span>
          </motion.div>
        )}
      </div>
    </header>
  )
}
export default Header
