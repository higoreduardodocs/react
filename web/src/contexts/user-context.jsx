/* eslint-disable react/prop-types */

import { createContext, useState } from 'react'

export const UserContext = createContext()

export default function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(
    localStorage?.getItem('currentUser')
      ? JSON.parse(localStorage.getItem('currentUser'))
      : null
  )

  const handleCurrentUser = (user) => {
    setCurrentUser(user)
    localStorage.setItem('currentUser', JSON.stringify(user))
  }

  return (
    <UserContext.Provider value={{ currentUser, handleCurrentUser }}>
      {children}
    </UserContext.Provider>
  )
}
