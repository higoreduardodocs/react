import { useContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

import { api } from 'src/libs/api'
import { AuthContext } from 'src/contexts/auth-context'
import { Common } from 'src/components'

function Admin() {
  const { auth } = useContext(AuthContext)
  const [checked, setChecked] = useState(false)

  const adminValidate = async () => {
    const { data } = await api.get('/users/admin-validate')
    setChecked(data)
  }

  useEffect(() => {
    adminValidate()
  }, [auth?.token])

  return checked ? <Outlet /> : <Common.Spinner path="/" />
}

export default Admin
