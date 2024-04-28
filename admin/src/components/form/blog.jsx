/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import ReactQuill from 'react-quill'
import Dropzone from 'react-dropzone'
import 'react-quill/dist/quill.snow.css'

const blogSchema = yup.object({
  title: yup.string().required('Nome é obrigatório'),
  description: yup.string().required('Descrição é obrigatório'),
  image: yup.string().required('Imagem é obrigatório'),
})
const blogInitialValues = {
  title: '',
  description: '',
  image: '',
}

const BlogForm = ({ setIsForm }) => {
  const [images, setImages] = useState([])
  const formik = useFormik({
    initialValues: blogInitialValues,
    validationSchema: blogSchema,
    onSubmit: (values) => console.log(values),
  })

  const removeImage = (index) =>
    setImages((prevState) => prevState.filter((_, i) => i !== index))

  return (
    <form onSubmit={formik.handleSubmit}>
      <h3 className="mb-4 title">Adicionar blog</h3>

      <label htmlFor="title">Nome</label>
      <input
        type="text"
        id="title"
        name="title"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.title}
        placeholder="Nome da categoria"
        className="d-block w-100"
      />
      <div className="error mb-3">
        {formik.touched.title && formik.errors.title}
      </div>

      <label htmlFor="title">Descrição</label>
      <ReactQuill
        theme="snow"
        name="description"
        onChange={formik.handleChange('description')}
        onBlur={formik.handleBlur}
        value={formik.values.description}
        className="d-block w-100"
      />
      <div className="error mb-3">
        {formik.touched.description && formik.errors.description}
      </div>

      <div className="bg-white border-1 p-5 text-center mt-3">
        <Dropzone onDrop={(acceptedFiles) => setImages(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Arraste e solte, ou toque para selecionar imagem</p>
              </div>
            </section>
          )}
        </Dropzone>
      </div>
      <div className="showimages d-flex flex-wrap mt-3 gap-3">
        {images?.map((item, i) => {
          return (
            <div className="position-relative" key={i}>
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="btn-close position-absolute"
                style={{ top: '10px', right: '10px' }}
              ></button>
              <img
                src={window.URL.createObjectURL(item)}
                alt=""
                width={200}
                height={200}
              />
            </div>
          )
        })}
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

export default BlogForm
