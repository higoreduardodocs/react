import { Link } from 'react-router-dom'

import Breadcrumb from '../components/breadcrumb'
import Container from '../components/container'

const ForgotPassword = () => {
  return (
    <>
      <Breadcrumb title="Esqueceu a senha" />
      <Container class1="py-5">
        <div className="auth-card">
          <h3 className="text-center mb-3">Esqueceu a senha?</h3>
          <p className="text-center mt-2 mb-3">
            Informe se email e enviaremos uma mensagem para você redefinir a
            senha
          </p>
          <form className="d-flex flex-column gap-2 w-75 w-md-50 mx-auto">
            <input type="email" name="email" placeholder="Email" />
            <div className="mt-3 d-flex justify-content-center flex-column gap-2 align-items-center">
              <button className="button border-0" type="submit">
                Enviar
              </button>
              <Link to="/login">Login</Link>
            </div>
          </form>
        </div>
      </Container>
    </>
  )
}

export default ForgotPassword
