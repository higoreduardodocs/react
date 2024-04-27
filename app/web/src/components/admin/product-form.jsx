/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { api } from 'src/libs/api'
import { shipping as shippingList } from 'src/utils'

function ProductForm({
  setIsForm,
  getProducts,
  setProduct,
  name: existedName,
  description: existedDescription,
  price: existedPrice,
  category: existedCategory,
  quantity: existedQuantity,
  shipping: existedShipping,
  photo: existedPhoto,
  setPhoto: setExistedPhoto,
  _id,
}) {
  const [name, setName] = useState(existedName || '')
  const [description, setDescription] = useState(existedDescription || '')
  const [price, setPrice] = useState(existedPrice || '')
  const [category, setCategory] = useState(existedCategory?._id || '')
  const [quantity, setQuantity] = useState(existedQuantity || '')
  const [shipping, setShipping] = useState(existedShipping || false)
  const [photo, setPhoto] = useState(existedPhoto || '')
  const [categories, setCategories] = useState([])

  const getCategories = async () => {
    try {
      const { data } = await api.get('/categories')
      setCategories(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = new FormData()
    data.append('name', name)
    data.append('description', description)
    data.append('price', price)
    data.append('category', category)
    data.append('quantity', quantity)
    data.append('shipping', shipping)
    data.append('photo', photo)

    try {
      if (_id) {
        await api.put(`/products/${_id}`, data)
        toast.success('Update successfully 🤗')
      } else {
        await api.post(`/products/register`, data)
        toast.success('Register successfully 🤗')
      }

      getProducts()
      setProduct(null)
      setExistedPhoto('')
      setIsForm(false)
    } catch (error) {
      console.log(error)
      const message = error.response.data.error
      toast.error(`${message} 😔`)
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <form className="wrapper-page" onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
        required
      />

      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter description"
        required
      />

      <input
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Enter price"
        required
      />

      <select onChange={(e) => setCategory(e.target.value)} value={category}>
        <option value="">Uncategorized</option>
        {categories?.length > 0 &&
          categories.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
      </select>

      <input
        type="text"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Enter quantity"
        required
      />

      <select onChange={(e) => setShipping(e.target.value)} value={shipping}>
        <option value="">Uncategorized</option>
        {shippingList?.length > 0 &&
          shippingList.map((item, i) => (
            <option key={i} value={item.value}>
              {item.name}
            </option>
          ))}
      </select>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setPhoto(e.target.files[0])}
      />

      {photo && (
        <img
          src={existedPhoto ? photo : URL.createObjectURL(photo)}
          alt={name}
          height="200px"
          width="200px"
          style={{ alignSelf: 'center' }}
        />
      )}

      <button type="submit">Save</button>
      <button
        type="button"
        onClick={() => {
          setIsForm(false)
          setProduct(null)
          setExistedPhoto('')
        }}
      >
        Cancel
      </button>
    </form>
  )
}

export default ProductForm
