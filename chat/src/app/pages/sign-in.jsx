import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'

import { auth } from '../../libs/firebase'

export default function SignIn() {
  const navigate = useNavigate()
  const [error, setError] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    try {
      const email = event.target[0]?.value
      const password = event.target[1]?.value
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/')
    } catch (error) {
      setError(true)
      console.log(error)
    }
  }
  return (
    <section className="form-container">
      <div className="form-wrapper">
        <span className="logo">Chat App</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input required  type="email" placeholder="Email" />
          <input required type="password" placeholder="Senha" />
          <button>Login</button>
          {error && <p>Erro no login, revise suas informações</p>}
        </form>
        <p>Não possui uma conta? <Link to="/cadastro">Cadastre-se</Link></p>
      </div>
    </section>
  )
}
