import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { api } from 'src/libs/api'
import { Admin as Layout } from 'src/layouts'
import { Admin as Components } from 'src/components'

function Products() {
  const [products, setProducts] = useState([])
  const [isForm, setIsForm] = useState(false)
  const [product, setProduct] = useState(null)
  const [photo, setPhoto] = useState('')

  const getProducts = async () => {
    try {
      const { data } = await api.get('/products')
      setProducts(data)
    } catch (error) {
      console.log(error)
      const message = error.response.data.error
      toast.error(`${message} 😔`)
    }
  }

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`)
      toast.success('Delete successfully 🤗')
      getProducts()
    } catch (error) {
      console.log(error)
      const message = error.response.data.error
      toast.error(`${message} 😔`)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <Layout title="Products">
      <section>
        {isForm && (
          <Components.ProductForm
            setIsForm={setIsForm}
            getProducts={getProducts}
            setProduct={setProduct}
            photo={photo}
            setPhoto={setPhoto}
            {...product}
          />
        )}
        <div className="wrapper-page">
          {!products?.length > 0 ? (
            <h1>Product List Is Empty</h1>
          ) : (
            <h1>Founded {products.length} products</h1>
          )}
        </div>
        <div className="wrapper-page">
          <button type="button" onClick={() => setIsForm(true)}>
            Create
          </button>
          {products?.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item, i) => (
                  <tr key={item._id}>
                    <td>{i + 1}</td>
                    <td>
                      <img
                        src={`${import.meta.env.VITE_API_URL}/products/${
                          item._id
                        }/photo`}
                        alt={item.name}
                        height="60px"
                        width="60px"
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => {
                          setProduct(item)
                          setPhoto(
                            `${import.meta.env.VITE_API_URL}/products/${
                              item._id
                            }/photo`
                          )
                          setIsForm(true)
                        }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteProduct(item._id)}
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

export default Products
