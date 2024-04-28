/* eslint-disable react/prop-types */

import { useFormik } from 'formik'
import * as yup from 'yup'

const brandSchema = yup.object({
  title: yup.string().required('Nome é obrigatório'),
})
const brandInitialValues = {
  title: '',
}

const FormBrand = ({ setIsForm }) => {
  const formik = useFormik({
    initialValues: brandInitialValues,
    validationSchema: brandSchema,
    onSubmit: (values) => console.log(values),
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <h3 className="mb-4 title">Adicionar marca</h3>

      <label htmlFor="title">Nome</label>
      <input
        type="text"
        id="title"
        name="title"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.title}
        placeholder="Nome da marca"
        className="d-block w-100"
      />
      <div className="error mb-3">
        {formik.touched.title && formik.errors.title}
      </div>

      <div className="d-flex align-items-center gap-3 justify-content-end">
        <button
          type="submit"
          className="border-0 px-3 py-1 text-white text-center text-decoration-none fs-6"
          style={{ background: '#febd69' }}
        >
          Salvar
        </button>
        <button
          type="button"
          onClick={() => setIsForm(false)}
          className="border-0 px-3 py-1 text-white text-center text-decoration-none fs-6"
          style={{ background: '#000' }}
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}

export default FormBrand
