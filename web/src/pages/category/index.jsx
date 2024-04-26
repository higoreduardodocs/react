import { useParams } from 'react-router-dom'

import useFetch from 'src/hooks/use-fetch'
import Products from 'src/components/common/products'
import './category.style.scss'

function Category() {
  const { id } = useParams()
  const data = useFetch(`/api/products?populate=*&filters[category][id]=${id}`)

  return (
    <section className="category">
      <h2 className="category--title">
        {data[0]?.attributes?.category?.data?.attributes?.title}
      </h2>
      {data?.length > 0 && <Products products={data} />}
    </section>
  )
}

export default Category
