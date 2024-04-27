/* eslint-disable react/prop-types */
import { useState, useEffect, createContext } from 'react'

export const AuthContext = createContext()
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: '',
  })

  const handleAuth = (data) => {
    setAuth({
      ...auth,
      user: data.user,
      token: data?.token,
    })
    localStorage.setItem('auth', JSON.stringify(data))
  }

  const handleUser = (data) => {
    setAuth({
      ...auth,
      user: data,
    })
    localStorage.setItem('auth', JSON.stringify({ ...auth, user: data }))
  }

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      const parseData = JSON.parse(localStorage.getItem('auth'))
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData?.token,
      })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AuthContext.Provider value={{ auth, handleAuth, handleUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
