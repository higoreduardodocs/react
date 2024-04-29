/* eslint-disable react/prop-types */

import { Link } from 'react-router-dom'

const Breadcrumb = ({ title }) => {
  return (
    <div className="breadcrumb mb-0 py-4">
      <div className="container-xxl">
        <p className="text-center mb-0">
          <Link to="/" className="text-dark">
            Início &nbsp;
          </Link>
          / {title}
        </p>
      </div>
    </div>
  )
}

export default Breadcrumb
