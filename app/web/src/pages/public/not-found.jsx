import { Link } from 'react-router-dom'

import { Public as Layout } from 'src/layouts'

function NotFound() {
  return (
    <Layout title="Not Found">
      <section className="container">
        <h1>Página não encontrada</h1>
        <Link to="/">Retornar para Home</Link>
      </section>
    </Layout>
  )
}

export default NotFound
