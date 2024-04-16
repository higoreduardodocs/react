import { useState } from 'react'

import api from '../../libs/api'
import useUser from '../../hooks/use-user'

export default function Form() {
  const { setId, setUsername } = useUser()
  const [user, setUser] = useState({
    username: '',
    password: '',
  })
  const [isNonLogin, setIsNonLogin] = useState(false)

  const handleUser = (ev) =>
    setUser((prevState) => ({
      ...prevState,
      [ev.target.name]: ev.target.value,
    }))
  const handleSubmit = async (ev) => {
    ev.preventDefault()

    const endpoint = isNonLogin ? '/users/sign-up' : '/users/sign-in'
    try {
      const { data } = await api.post(endpoint, user)
      setId(data.id)
      setUsername(user.username)
    } catch (error) {
      alert(error.response.data)
    }
  }

  return (
    <section className="bg-blue-50 h-screen flex items-center">
      <form className="w-64 mx-auto mb-12" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={user.username}
          onChange={(ev) => handleUser(ev)}
          className="block w-full p-2 mb-2 rounded-sm"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={(ev) => handleUser(ev)}
          className="block w-full p-2 mb-2 rounded-sm"
        />

        <button
          type="submit"
          className="block w-full p-2 bg-blue-500 text-white rounded-sm"
        >
          {isNonLogin ? 'Register' : 'Login'}
        </button>

        <div className="text-center mt-2">
          {isNonLogin ? 'Already member?' : 'Dont have an account?'}
          <button
            type="button"
            onClick={() => setIsNonLogin((prevState) => !prevState)}
            className="ml-1"
          >
            {isNonLogin ? 'Login here' : 'Register'}
          </button>
        </div>
      </form>
    </section>
  )
}
