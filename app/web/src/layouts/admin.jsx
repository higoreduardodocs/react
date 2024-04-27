/* eslint-disable react/prop-types */
import { Helmet } from 'react-helmet'

import { Admin as Components, Public } from 'src/components'

function Admin({ children, description, keywords, title }) {
  return (
    <main>
      <Helmet>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <title>{title}</title>
      </Helmet>
      <Public.Header />
      <div className="dashboard container">
        <Components.Sidebar />
        {children}
      </div>
    </main>
  )
}
Admin.defaultProps = {
  description: 'MERN Ecommerce application',
  keywords: 'MERN, React, Node, JavaScript, Ecommerce, Mongo',
  title: 'Ecommerce',
}

export default Admin
