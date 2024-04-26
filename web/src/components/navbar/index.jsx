import { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { UserContext } from '../../contexts/user-context'
import api from '../../libs/api'
import './navbar.style.scss'

function Navbar() {
  const navigate = useNavigate()
  const { currentUser, handleCurrentUser } = useContext(UserContext)
  const { pathname } = useLocation()
  const [active, setActive] = useState(false)
  const [open, setOpen] = useState(false)

  // const currentUser = {
  //   id: 1,
  //   username: "first",
  //   image:
  //     "https://lh3.googleusercontent.com/a/AAcHTtcRLD0NaIOz4aNsYR811qJxXWMFExFwo3_zqL3cDg=s360-c-no",
  //   isSeller: true,
  // };

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout')
      handleCurrentUser(null)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
  const handleScroll = () =>
    window.scrollY > 0 ? setActive(true) : setActive(false)
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`navbar ${(active || pathname !== '/') && 'active'}`}>
      <div className="container">
        <div className="logo">
          <Link to="/" className="link">
            <span>Fiverr</span>
          </Link>
          <span className="dot">.</span>
        </div>

        <div className="links">
          <span>Fiverr Business</span>
          <span>Explore</span>
          <span>English</span>
          {!currentUser?.isSeller && <span>Become a Seller</span>}

          {currentUser ? (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser.image} alt={currentUser.username} />
              <span>{currentUser?.username}</span>
              {open && (
                <div className="options">
                  {currentUser.isSeller && (
                    <>
                      <Link className="link" to="/create-gig">
                        Add New Gig
                      </Link>
                      <Link className="link" to="/my-gigs">
                        Porfolio
                      </Link>
                    </>
                  )}
                  <Link className="link" to="/gigs">
                    Gigs
                  </Link>
                  <Link className="link" to="/orders">
                    Orders
                  </Link>
                  <Link className="link" to="/messages">
                    Messages
                  </Link>
                  <Link className="link" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="link">
                Sign in
              </Link>
              <Link className="link" to="/register">
                <button>Join</button>
              </Link>
            </>
          )}
        </div>
      </div>

      <hr />
      <div className="menu">
        <Link className="link menuLink" to="/">
          Graphics & Design
        </Link>
        <Link className="link menuLink" to="/">
          Video & Animation
        </Link>
        <Link className="link menuLink" to="/">
          Writing & Translation
        </Link>
        <Link className="link menuLink" to="/">
          AI Services
        </Link>
        <Link className="link menuLink" to="/">
          Digital Marketing
        </Link>
        <Link className="link menuLink" to="/">
          Music & Audio
        </Link>
        <Link className="link menuLink" to="/">
          Programming & Tech
        </Link>
        <Link className="link menuLink" to="/">
          Business
        </Link>
        <Link className="link menuLink" to="/">
          Lifestyle
        </Link>
      </div>
    </header>
  )
}

export default Navbar
