import Breadcrumb from '../components/breadcrumb'
import Container from '../components/container'

const ResetPassword = () => {
  return (
    <>
      <Breadcrumb title="Redefinir senha" />
      <Container class1="py-5">
        <div className="auth-card">
          <h3 className="text-center mb-3">Redefinir senha</h3>
          <form className="d-flex flex-column gap-2">
            <input type="password" name="password" placeholder="Nova senha" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Cofirmar senha"
            />
            <div className="mt-3 d-flex justify-content-center gap-2 align-items-center">
              <button className="button border-0">Enviar</button>
            </div>
          </form>
        </div>
      </Container>
    </>
  )
}

export default ResetPassword
