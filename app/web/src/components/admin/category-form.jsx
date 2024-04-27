/* eslint-disable react/prop-types */

import { useState } from 'react'
import toast from 'react-hot-toast'

import { api } from 'src/libs/api'

function CategoryForm({
  setIsForm,
  getCategories,
  setCategory,
  name: existedName,
  _id,
}) {
  const [name, setName] = useState(existedName || '')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (_id) {
        await api.put(`/categories/${_id}`, {
          name,
        })
        toast.success('Update successfully 🤗')
      } else {
        await api.post('/categories/register', {
          name,
        })
        toast.success('Register successfully 🤗')
      }
      getCategories()
      setCategory(null)
      setIsForm(false)
    } catch (error) {
      console.log(error)
      const message = error.response.data.error
      toast.error(`${message} 😔`)
    }
  }

  return (
    <form className="wrapper-page" onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Name"
        required
      />

      <button type="submit">Save</button>
      <button
        type="button"
        onClick={() => {
          setIsForm(false)
          setCategory(null)
        }}
      >
        Cancel
      </button>
    </form>
  )
}

export default CategoryForm
