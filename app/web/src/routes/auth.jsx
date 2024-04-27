import { useContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

import { api } from 'src/libs/api'
import { AuthContext } from 'src/contexts/auth-context'
import { Common } from 'src/components'

function Auth() {
  const { auth } = useContext(AuthContext)
  const [checked, setChecked] = useState(false)

  const userValidate = async () => {
    const { data } = await api.get('/users/user-validate')
    setChecked(data)
  }

  useEffect(() => {
    userValidate()
  }, [auth?.token])

  return checked ? <Outlet /> : <Common.Spinner path="/" />
}

export default Auth
