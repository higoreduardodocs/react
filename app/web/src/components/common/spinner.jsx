/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Public as Layout } from 'src/layouts'

function Spinner({ path }) {
  const [count, setCount] = useState(3)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevState) => --prevState)
    }, 1000)

    count === 0 && navigate(`${path}`, { state: location.pathname })

    return () => clearInterval(interval)
  }, [count, navigate, location, path])

  return (
    <Layout title="Home">
      <section className="container">
        <div className="wrapper-page">
          <h1>Redirecting to you in {count} second </h1>
        </div>
      </section>
    </Layout>
  )
}

export default Spinner
