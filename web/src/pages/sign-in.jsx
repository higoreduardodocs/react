import { Link } from 'react-router-dom'

import Breadcrumb from '../components/breadcrumb'
import Container from '../components/container'

const SignIn = () => {
  return (
    <>
      <Breadcrumb title="Login" />

      <Container className="py-5">
        <div className="auth-card">
          <h3 className="text-center mb-3">Login</h3>
          <form className="d-flex flex-column gap-2 w-md-50 w-75 mx-auto">
            <input type="email" name="email" placeholder="Email" />
            <input type="password" name="password" placeholder="Senha" />
            <Link to="/recuperar-senha">Esqueceu a senha?</Link>
            <div className="mt-3 d-flex justify-content-center gap-2 align-items-center">
              <button className="button border-0" type="submit">
                Login
              </button>
              <Link to="/criar-conta" className="text-white button">
                Criar conta
              </Link>
            </div>
          </form>
        </div>
      </Container>
    </>
  )
}

export default SignIn
