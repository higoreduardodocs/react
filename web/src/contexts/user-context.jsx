/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react'

import api from '../libs/api'

export const UserContext = createContext({})

export default function UserContextProvider({ children }) {
  const [id, setId] = useState(null)
  const [username, setUsername] = useState(null)

  useEffect(() => {
    api.get('/users/profile').then((res) => {
      setId(res.data.userId)
      setUsername(res.data.username)
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <UserContext.Provider value={{ id, setId, username, setUsername }}>
      {children}
    </UserContext.Provider>
  )
}
