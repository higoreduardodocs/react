import { useFormik } from 'formik'
import * as yup from 'yup'

const resetPasswordSchema = yup.object({
  password: yup.string().required('Senha é obrigatório'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Senhas diferentes')
    .required('Confirma senha é obrigatório'),
})
const resetPasswordInitialValues = {
  password: '',
  confirmPassword: '',
}

const ResetPassword = () => {
  const formik = useFormik({
    initialValues: resetPasswordInitialValues,
    validationSchema: resetPasswordSchema,
    onSubmit: (values) => console.log(values),
  })

  return (
    <div
      className="py-5 d-flex align-items-center"
      style={{ background: '#ffd333', minHeight: '100vh' }}
    >
      <div className="my-5 w-50 bg-white mx-auto p-4">
        <h3 className="text-center title">Redefinir senha</h3>
        <p className="text-center">Digite sua nova senha</p>
        <form onSubmit={formik.handleSubmit}>
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

          <label htmlFor="password">Confirma senha</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            placeholder="Confirma senha"
            className="d-block w-100"
          />
          <div className="error mb-3">
            {formik.touched.confirmPassword && formik.errors.confirmPassword}
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

export default ResetPassword
