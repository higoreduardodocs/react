/* eslint-disable react/prop-types */
import { onAuthStateChanged } from 'firebase/auth'
import { createContext, useEffect, useState } from 'react'

import { auth } from '../../libs/firebase'

export const UserContext = createContext({
  user: null,
})

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

    // clear memory
    return () => {
      unsub()
    }
  }, [])

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  )
}
