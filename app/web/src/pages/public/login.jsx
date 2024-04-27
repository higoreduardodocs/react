import { useContext, useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import toast from 'react-hot-toast'

import { api } from 'src/libs/api'
import { AuthContext } from 'src/contexts/auth-context'
import { Public as Layout } from 'src/layouts'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { handleAuth } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [role, setRole] = useState('user')

  const [isLogin, setIsLogin] = useState(true)

  const clearFields = () => {
    setEmail('')
    setPassword('')
    setName('')
    setPhone('')
    setAddress('')
    setRole('user')
  }

  const handleLogin = async () => {
    try {
      const { data } = await api.post('/users/login', {
        email,
        password,
      })
      clearFields()
      handleAuth(data)
      toast.success('Login successfully 🤗')
      navigate(location.state || '/')
    } catch (error) {
      console.log(error)
      const message = error.response.data.error
      toast.error(`${message} 😔`)
    }
  }

  const handleRegister = async () => {
    try {
      await api.post('/users/register', {
        name,
        email,
        password,
        phone,
        address,
        role,
      })
      toast.success('Register successfully 🤗')
      clearFields()
      setIsLogin(true)
    } catch (error) {
      console.log(error)
      const message = error.response.data.error
      toast.error(`${message} 😔`)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (isLogin) handleLogin()
    else handleRegister()
  }

  return (
    <Layout title="Login">
      <section className="container">
        <form onSubmit={handleSubmit} className="login-container">
          <h1>{isLogin ? 'Login' : 'Register'}</h1>
          <input
            type="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email "
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Your Password"
            required
          />

          {!isLogin && (
            <>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Your Name"
                required
              />

              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter Your Phone"
                required
              />

              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter Your Address"
                required
              />

              <label>
                <input
                  type="radio"
                  name="role"
                  value="user"
                  onChange={(e) => setRole(e.target.value)}
                />
                User
              </label>

              <label>
                <input
                  type="radio"
                  name="role"
                  value="administrator"
                  onChange={(e) => setRole(e.target.value)}
                />
                Administrator
              </label>
            </>
          )}

          <button type="submit">{isLogin ? 'Login' : 'Register'}</button>

          <div className="change-login">
            <span>{isLogin ? 'Dont have account?' : 'Have account'}</span>
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin)
                clearFields()
              }}
            >
              {isLogin ? 'Register' : 'Login'}
            </button>
          </div>
          <p className="change-login">
            Forgot your password?&nbsp;
            <Link to="/forgot-password">Reset password</Link>
          </p>
        </form>
      </section>
    </Layout>
  )
}

export default Login
