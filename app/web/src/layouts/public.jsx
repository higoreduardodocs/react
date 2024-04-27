/* eslint-disable react/prop-types */
import { Helmet } from 'react-helmet'

import { Public as Components } from 'src/components'

function Public({ children, description, keywords, title }) {
  return (
    <main>
      <Helmet>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <title>{title}</title>
      </Helmet>
      <Components.Header />
      {children}
      <Components.Footer />
    </main>
  )
}
Public.defaultProps = {
  description: 'MERN Ecommerce application',
  keywords: 'MERN, React, Node, JavaScript, Ecommerce, Mongo',
  title: 'Ecommerce',
}

export default Public
