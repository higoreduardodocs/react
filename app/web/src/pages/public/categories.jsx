import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

import { api } from 'src/libs/api'
import { Public as Layout } from 'src/layouts'

function Categories() {
  const [categories, setCategories] = useState([])

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

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <Layout title="Categories">
      <section className="container">
        <div className="wrapper-page grid">
          {categories?.length > 0 &&
            categories.map((item) => (
              <Link
                key={item._id}
                to={`/category/${item.slug}`}
                className="button"
              >
                {item.name}
              </Link>
            ))}
        </div>
      </section>
    </Layout>
  )
}

export default Categories
