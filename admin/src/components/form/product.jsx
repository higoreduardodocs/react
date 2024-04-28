/* eslint-disable react/prop-types */

import { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Dropzone from 'react-dropzone'

const productSchema = yup.object({
  cover: yup.string().required('Capa é obrigatório'),
  images: yup
    .array()
    .min(1, 'Selecione no mínimo 1 imagem')
    .required('Iamgens é obrigatório'),
  brand: yup.string().required('Marca é obrigatório'),
  title: yup.string().required('Nome é obrigatório'),
  description: yup.string().required('Descrição é obrigatório'),
  price: yup.number().required('Preço é obrigatório'),
  offer: yup.number().optional(),
  stock: yup.number().required('Estoque é obrigatório'),
  stockOffer: yup.number().optional(),
  offerDeadlineAt: yup.date(),
  category: yup.string().required('Categoria é obrigatório'),
  sizes: yup
    .array()
    .min(1, 'Selecione no mínimo 1 tamanho')
    .required('Tamanho é obrigatório'),
  colors: yup
    .array()
    .min(1, 'Selecione no mínimo 1 cor')
    .required('Cor é obrigatório'),
})
const productInitialValues = {
  cover: '',
  images: [],
  brand: '',
  title: '',
  description: '',
  price: '',
  offer: '',
  stock: '',
  stockOffer: '',
  offerDeadlineAt: '',
  category: '',
  sizes: [],
  colors: [],
}

const FormProduct = ({ setIsForm }) => {
  const [coverFile, setCoverFile] = useState('')
  const [imagesFile, setImagesFile] = useState([])
  const formik = useFormik({
    initialValues: productInitialValues,
    validationSchema: productSchema,
    onSubmit: (values) => console.log(values),
  })

  const removeCoverFile = () => setCoverFile('')
  const removeImageFile = (index) =>
    setImagesFile((prevState) => prevState.filter((_, i) => i !== index))

  return (
    <form onSubmit={formik.handleSubmit}>
      <h3 className="mb-4 title">Adicionar produto</h3>

      <label htmlFor="title">Nome</label>
      <input
        type="text"
        id="title"
        name="title"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.title}
        placeholder="Nome do produto"
        className="d-block w-100"
      />
      <div className="error mb-3">
        {formik.touched.title && formik.errors.title}
      </div>

      <label htmlFor="brand">Marca</label>
      <input
        type="text"
        id="brand"
        name="brand"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.brand}
        placeholder="Nome da marca"
        className="d-block w-100"
      />
      <div className="error mb-3">
        {formik.touched.brand && formik.errors.brand}
      </div>

      <label htmlFor="category">Categoria</label>
      <input
        type="text"
        id="category"
        name="category"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.category}
        placeholder="Nome da categoria"
        className="d-block w-100"
      />
      <div className="error mb-3">
        {formik.touched.category && formik.errors.category}
      </div>

      <label htmlFor="description">Descrição</label>
      <input
        type="text"
        id="description"
        name="description"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.description}
        placeholder="Descrição do produto"
        className="d-block w-100"
      />
      <div className="error mb-3">
        {formik.touched.description && formik.errors.description}
      </div>

      <label htmlFor="price">Preço</label>
      <input
        type="number"
        id="price"
        name="price"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.price}
        placeholder="Preço do produto"
        className="d-block w-100"
      />
      <div className="error mb-3">
        {formik.touched.price && formik.errors.price}
      </div>

      <label htmlFor="offer">Oferta</label>
      <input
        type="number"
        id="offer"
        name="offer"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.offer}
        placeholder="Oferta do produto"
        className="d-block w-100"
      />
      <div className="error mb-3">
        {formik.touched.offer && formik.errors.offer}
      </div>

      <label htmlFor="stock">Estoque</label>
      <input
        type="number"
        id="stock"
        name="stock"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.stock}
        placeholder="Estoque do produto"
        className="d-block w-100"
      />
      <div className="error mb-3">
        {formik.touched.stock && formik.errors.stock}
      </div>

      <label htmlFor="stockOffer">Estoque Promocional</label>
      <input
        type="number"
        id="stockOffer"
        name="stockOffer"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.stockOffer}
        placeholder="Estoque promocional do produto"
        className="d-block w-100"
      />
      <div className="error mb-3">
        {formik.touched.stockOffer && formik.errors.stockOffer}
      </div>

      <label htmlFor="offerDeadlineAt">Término da oferta</label>
      <input
        type="date"
        id="offerDeadlineAt"
        name="offerDeadlineAt"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.offerDeadlineAt}
        className="d-block w-100"
      />
      <div className="error mb-3">
        {formik.touched.offerDeadlineAt && formik.errors.offerDeadlineAt}
      </div>

      <label htmlFor="sizes">Tamanhos</label>
      <input
        type="number"
        id="sizes"
        name="sizes"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.sizes}
        placeholder="Tamanhos do produto"
        className="d-block w-100"
      />
      <div className="error mb-3">
        {formik.touched.sizes && formik.errors.sizes}
      </div>

      <label htmlFor="colors">Cores</label>
      <input
        type="number"
        id="colors"
        name="colors"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.colors}
        placeholder="Cores do produto"
        className="d-block w-100"
      />
      <div className="error mb-3">
        {formik.touched.colors && formik.errors.colors}
      </div>

      <label htmlFor="cover">Capa</label>
      <div
        className="bg-white border-1 p-5 text-center mt-3"
        style={{ width: '200px', height: '100px' }}
        role="button"
      >
        <Dropzone onDrop={(acceptedFiles) => setCoverFile(acceptedFiles[0])}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <span>Capa</span>
            </div>
          )}
        </Dropzone>
      </div>
      <div className="showimages d-flex flex-wrap mt-3 gap-3">
        {coverFile && (
          <div className="position-relative">
            <button
              type="button"
              onClick={() => removeCoverFile()}
              className="btn-close position-absolute"
              style={{ top: '10px', right: '10px' }}
            ></button>
            <img
              src={window.URL.createObjectURL(coverFile)}
              alt=""
              width={100}
              height={100}
            />
          </div>
        )}
      </div>

      <label htmlFor="images">Galeria</label>
      <div
        className="bg-white border-1 p-5 text-center mt-3"
        style={{ width: '200px', height: '100px' }}
        role="button"
      >
        <Dropzone onDrop={(acceptedFiles) => setImagesFile(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <span>Galeria</span>
            </div>
          )}
        </Dropzone>
      </div>
      <div className="showimages d-flex flex-wrap mt-3 gap-3">
        {imagesFile?.map((item, i) => {
          return (
            <div className="position-relative" key={i}>
              <button
                type="button"
                onClick={() => removeImageFile(i)}
                className="btn-close position-absolute"
                style={{ top: '10px', right: '10px' }}
              ></button>
              <img
                src={window.URL.createObjectURL(item)}
                alt=""
                width={100}
                height={100}
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

export default FormProduct
