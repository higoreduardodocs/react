import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { api } from 'src/libs/api'
import { Admin as Layout } from 'src/layouts'
import { Admin as Components } from 'src/components'

function Categories() {
  const [categories, setCategories] = useState([])
  const [isForm, setIsForm] = useState(false)
  const [category, setCategory] = useState(null)

  const getCategories = async () => {
    try {
      const { data } = await api.get('/categories')
      setCategories(data)
    } catch (error) {
      console.log(error)
      const message = error.response.data.error
      toast.error(`${message} 😔`)
    }
  }

  const deleteCategory = async (id) => {
    try {
      await api.delete(`/categories/${id}`)
      toast.success('Delete successfully 🤗')
      getCategories()
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
    <Layout title="Categories">
      <section>
        {isForm && (
          <Components.CategoryForm
            setIsForm={setIsForm}
            getCategories={getCategories}
            setCategory={setCategory}
            {...category}
          />
        )}
        <div className="wrapper-page">
          {!categories?.length > 0 ? (
            <h1>Categoty List Is Empty</h1>
          ) : (
            <h1>Founded {categories.length} categories</h1>
          )}
        </div>
        <div className="wrapper-page">
          <button type="button" onClick={() => setIsForm(true)}>
            Create
          </button>
          {categories?.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((item, i) => (
                  <tr key={item._id}>
                    <td>{i + 1}</td>
                    <td>{item.name}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => {
                          setIsForm(true)
                          setCategory(item)
                        }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteCategory(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </Layout>
  )
}

export default Categories
