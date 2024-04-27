/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'

import { api } from 'src/libs/api'
import { prices } from 'src/utils'

function Filter({ setProducts }) {
  const [categories, setCategories] = useState([])
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])

  const getCategories = async () => {
    try {
      const { data } = await api.get('/categories')
      setCategories(data)
    } catch (error) {
      console.log(error)
    }
  }

  const filterProducts = async () => {
    try {
      const { data } = await api.post('/products/filter', {
        categories: checked,
        priceRange: radio,
      })
      setProducts(data)
    } catch (error) {
      console.log(error)
    }
  }

  const filterCategories = async (id) => {
    if (checked.includes(id))
      setChecked((prevState) => prevState.filter((item) => item !== id))
    else setChecked((prevState) => [...prevState, id])
  }

  useEffect(() => {
    if (checked.length || radio.length) filterProducts()
  }, [checked, radio]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <aside className="wrapper-page">
      <h4>Filter per category</h4>
      {categories?.length > 0 &&
        categories.map((item) => (
          <div key={item._id}>
            <input
              type="checkbox"
              value={item._id}
              onChange={() => filterCategories(item._id)}
            />
            {item.name}
          </div>
        ))}

      <h4>Filter per price</h4>
      {prices?.length > 0 &&
        prices.map((item) => (
          <div key={item._id}>
            <input
              type="radio"
              name="price"
              value={item.array}
              onChange={() => setRadio(item.array)}
            />
            {item.name}
          </div>
        ))}

      <button type="button" onClick={() => window.location.reload()}>
        Clear Filter
      </button>
    </aside>
  )
}

export default Filter
