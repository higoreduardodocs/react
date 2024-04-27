import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { api } from 'src/libs/api'
import { Public as Layout } from 'src/layouts'
import { Public as Components, Common } from 'src/components'

function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  const getProducts = async () => {
    try {
      setLoading(true)
      const { data } = await api.get('/products')
      setProducts(data)
      setLoading(false)
    } catch (error) {
      const message = error.response.data.error
      toast.error(`${message} 😔`)
      setLoading(false)
    }
  }
  const getTotal = async () => {
    try {
      setLoading(true)
      const { data } = await api.get('/products/count')
      setTotal(data)
      setLoading(false)
    } catch (error) {
      const message = error.response.data.error
      toast.error(`${message} 😔`)
      setLoading(false)
    }
  }
  const getProductsPerPage = async () => {
    try {
      setLoading(true)
      const { data } = await api.get(`/products/paginate/${page}`)
      setProducts([...products, ...data])
      setLoading(false)
    } catch (error) {
      const message = error.response.data.error
      toast.error(`${message} 😔`)
      setLoading(false)
    }
  }
  useEffect(() => {
    if (page === 1) return
    getProductsPerPage()
  }, [page]) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    getProducts()
    getTotal()
  }, [])

  return (
    <Layout title="Home">
      <section className="container">
        <div className="home-container">
          <Components.Filter setProducts={setProducts} />
          <div>
            {loading ? (
              <h1>Loading...</h1>
            ) : (
              <>
                <h4>Found: {total} products</h4>
                <Common.ProductsGrid products={products} />
              </>
            )}
            {products?.length < total && !loading && (
              <button
                type="button"
                className="center"
                onClick={(e) => {
                  e.preventDefault()
                  setPage((prevState) => ++prevState)
                }}
              >
                Load More
              </button>
            )}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Home
