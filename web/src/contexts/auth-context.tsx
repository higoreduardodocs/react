import { createContext, ReactNode, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { isAxiosError } from 'axios'

import { api } from '../libs/api'

interface IAuthProvider {
  children: ReactNode
}

interface ILogin {
  email: string
  password: string
}

interface IRegister {
  name: string
  email: string
  password: string
}

interface IUser {
  name: string
  email: string
  avatarUrl: string
}

interface IAuthContextProps {
  login: ({ email, password }: ILogin) => void
  register: ({ name, email, password }: IRegister) => void
  logout: () => void
  user: IUser
}

export const AuthContext = createContext({} as IAuthContextProps)

export default function AuthProvider({ children }: IAuthProvider) {
  const navigate = useNavigate()
  const [user, setUser] = useState(() => {
    const user = localStorage.getItem('user')
    if (user) return JSON.parse(user)
    return null
  })

  async function login({ email, password }: ILogin) {
    try {
      const { data } = await api.post('/users/auth', {
        email,
        password,
      })
      const { token, refreshToken, user } = data
      const userData = {
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
      }
      localStorage.setItem('token', token)
      localStorage.setItem('refreshToken', refreshToken)
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)

      navigate('/painel')
      toast.success('Login bem sucedido')
    } catch (error) {
      console.log(error)
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message)
      } else {
        toast.error('Falha durante o login, tente novamente.')
      }
    }
  }
  async function register({ name, email, password }: IRegister) {
    try {
      await api.post('/users', {
        name,
        email,
        password,
      })

      toast.success('Cadastro bem sucedido')
    } catch (error) {
      console.log(error)
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message)
      } else {
        toast.error('Falha durante o cadastro, tente novamente.')
      }
    }
  }
  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
    navigate('/')
  }

  return (
    <AuthContext.Provider value={{ login, register, logout, user }}>
      {children}
    </AuthContext.Provider>
  )
}
