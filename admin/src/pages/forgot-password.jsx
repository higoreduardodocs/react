import { useFormik } from 'formik'
import * as yup from 'yup'

const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .email('Informe um email válido')
    .required('Email é obrigatório'),
})
const forgotPasswordInitialValues = {
  email: '',
}

const ForgotPassword = () => {
  const formik = useFormik({
    initialValues: forgotPasswordInitialValues,
    validationSchema: forgotPasswordSchema,
    onSubmit: (values) => console.log(values),
  })

  return (
    <div
      className="py-5 d-flex align-items-center"
      style={{ background: '#ffd333', minHeight: '100vh' }}
    >
      <div className="my-5 w-50 bg-white mx-auto p-4">
        <h3 className="text-center title">Esqueceu a senha?</h3>
        <p className="text-center">
          Informe seu email e enviaremos instruções para recuperar sua senha
        </p>
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

          <button
            type="submit"
            className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
            style={{ background: '#ffd333' }}
          >
            Recuperar senha
          </button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
