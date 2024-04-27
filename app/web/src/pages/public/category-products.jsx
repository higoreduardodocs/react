import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'

import { api } from 'src/libs/api'
import { Public as Layout } from 'src/layouts'
import { Common } from 'src/components'

function CategoryProducts() {
  const { slug } = useParams()

  const [products, setProducts] = useState([])

  const getProducts = async () => {
    try {
      const { data } = await api.get(`/categories/${slug}/products`)
      setProducts(data)
    } catch (error) {
      console.log(error)
      const message = error.response.data.error
      toast.error(`${message} 😔`)
    }
  }

  useEffect(() => {
    getProducts()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Layout title={`Products - ${slug.toUpperCase()[0] + slug.slice(1)}`}>
      <section className="container">
        <Common.ProductsGrid products={products} />
      </section>
    </Layout>
  )
}

export default CategoryProducts
