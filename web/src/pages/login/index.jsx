import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { UserContext } from '../../contexts/user-context'
import api from '../../libs/api'
import './login.style.scss'

function Login() {
  const navigate = useNavigate()
  const { handleCurrentUser } = useContext(UserContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const clearFields = () => {
    setUsername('')
    setPassword('')
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data } = await api.post('/auth/login', { username, password })
      handleCurrentUser(data)
      clearFields()
      navigate('/')
    } catch (error) {
      setError(error.response.message)
    }
  }

  return (
    <section onSubmit={handleSubmit} className="login">
      <form>
        <h1>Sign in</h1>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && error}
        <button type="submit">Login</button>
      </form>
    </section>
  )
}

export default Login
