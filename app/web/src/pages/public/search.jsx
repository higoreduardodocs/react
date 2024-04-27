import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'

import { api } from 'src/libs/api'
import { Public as Layout } from 'src/layouts'
import { Common } from 'src/components'

function Search() {
  const { search } = useParams()
  const [products, setProducts] = useState([])

  const getSearchProducts = async () => {
    try {
      const { data } = await api.get(`/products/search/${search}`)
      setProducts(data)
    } catch (error) {
      console.log(error)
      const message = error.response.data.error
      toast.error(`${message} 😔`)
    }
  }

  useEffect(() => {
    getSearchProducts()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Layout title={`Products - ${search}`}>
      <section className="container">
        <h1>Search Resuts</h1>
        <h4>
          {!products?.length > 0
            ? 'No Products Found'
            : `Found ${products.length} products`}
        </h4>
        <Common.ProductsGrid products={products} />
      </section>
    </Layout>
  )
}

export default Search
