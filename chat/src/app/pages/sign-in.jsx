import { Link } from 'react-router-dom'

export default function SignIn() {
  return (
    <section className="form-container">
      <div className="form-wrapper">
        <span className="logo">Chat App</span>
        <span className="title">Login</span>
        <form>
          <input required  type="email" placeholder="Email" />
          <input required type="password" placeholder="Senha" />
          <button>Login</button>
        </form>
        <p>Não possui uma conta? <Link to="/cadastro">Cadastre-se</Link></p>
      </div>
    </section>
  )
}
