import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'

const signInSchema = yup.object({
  email: yup
    .string()
    .email('Informe um email válido')
    .required('Email é obrigatório'),
  password: yup.string().required('Senha é obrigatório'),
})
const signInInitialValues = {
  email: '',
  password: '',
}

const SignIn = () => {
  const formik = useFormik({
    initialValues: signInInitialValues,
    validationSchema: signInSchema,
    onSubmit: (values) => console.log(values),
  })

  return (
    <div
      className="py-5 d-flex align-items-center"
      style={{ background: '#ffd333', minHeight: '100vh' }}
    >
      <div className="my-5 w-50 bg-white mx-auto p-4">
        <h3 className="text-center title">Login</h3>
        <p className="text-center">Informe suas credenciais</p>
        {/* <div className="error text-center">Você não é administrador</div> */}
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder="Email"
            className="d-block w-100"
          />
          <div className="error mb-3">
            {formik.touched.email && formik.errors.email}
          </div>

          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            placeholder="Senha"
            className="d-block w-100"
          />
          <div className="error mb-3">
            {formik.touched.password && formik.errors.password}
          </div>

          <div className="mb-3 text-end">
            <Link
              to="/recuperar-senha"
              className="text-dark text-decoration-none"
            >
              Esqueceu a senha?
            </Link>
          </div>
          <button
            type="submit"
            className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
            style={{ background: '#ffd333' }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignIn
