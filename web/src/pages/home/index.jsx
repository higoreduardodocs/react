import { useContext, useEffect } from 'react'

import { Context } from 'src/contexts/context-provider'
import { fetchDataFromApi } from 'src/libs/api'
import Banner from 'src/components/home/banner'
import Categories from 'src/components/home/categories'
import Products from 'src/components/common/products'
import './home.style.scss'

function Home() {
  const { categories, setCategories, products, setProducts } =
    useContext(Context)

  const getCategories = async () => {
    fetchDataFromApi('/api/categories?populate=image').then((res) =>
      setCategories(res?.data)
    )
  }
  const getProducts = async () => {
    fetchDataFromApi('/api/products?populate=image').then((res) =>
      setProducts(res?.data)
    )
  }
  useEffect(() => {
    getCategories()
    getProducts()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="home">
      <Banner />
      <Categories categories={categories} />
      <Products title="Popular Products" products={products} />
    </section>
  )
}

export default Home
