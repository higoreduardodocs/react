import Breadcrumb from '../components/breadcrumb'
import Container from '../components/container'

const SignUp = () => {
  return (
    <>
      <Breadcrumb title="Cadastro" />
      <Container className="py-5">
        <div className="auth-card">
          <h3 className="text-center mb-3">Cadastro</h3>
          <form className="d-flex flex-column gap-2 w-md-50 w-75 mx-auto">
            <input type="text" name="name" placeholder="Nome" />
            <input type="email" name="email" placeholder="Email" />
            <input type="tel" name="mobile" placeholder="WhatsApp" />
            <input type="password" name="password" placeholder="Senha" />
            <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
              <button className="button border-0">Cadastrar</button>
            </div>
          </form>
        </div>
      </Container>
    </>
  )
}

export default SignUp
