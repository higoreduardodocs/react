/* eslint-disable react/prop-types */

import { useFormik } from 'formik'
import * as yup from 'yup'

const couponSchema = yup.object().shape({
  title: yup.string().required('Nome é obrigatório'),
  expiry: yup.date().required('Data de expiração é obrigatório'),
  discount: yup.number().required('Porcentagem de desconto é obrigatório'),
})

const FormCoupon = ({ setIsForm }) => {
  const couponInitialValues = {
    title: '',
    expiry: '',
    discount: '',
  }
  const formik = useFormik({
    initialValues: couponInitialValues,
    validationSchema: couponSchema,
    onSubmit: (values) => console.log(values),
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <h3 className="mb-4 title">Adicionar cupom</h3>

      <label htmlFor="title">Nome</label>
      <input
        type="text"
        id="title"
        name="title"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.title}
        placeholder="Nome do cupom"
        className="d-block w-100"
      />
      <div className="error mb-3">
        {formik.touched.title && formik.errors.title}
      </div>

      <label htmlFor="expiry">Data expiração</label>
      <input
        type="date"
        id="expiry"
        name="expiry"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.expiry}
        placeholder="Data expiração"
        className="d-block w-100"
      />
      <div className="error mb-3">
        {formik.touched.expiry && formik.errors.expiry}
      </div>

      <label htmlFor="discount">Desconto</label>
      <input
        type="number"
        id="discount"
        name="discount"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.discount}
        placeholder="Porcentagem desconto"
        className="d-block w-100"
      />
      <div className="error mb-3">
        {formik.touched.discount && formik.errors.discount}
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

export default FormCoupon
