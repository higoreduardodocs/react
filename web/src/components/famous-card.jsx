/* eslint-disable react/prop-types */

import { Link } from 'react-router-dom'

const FamousCard = ({ image, title, details, price }) => {
  return (
    <div className="famous-card position-relative">
      <img src={image} className="img-fluid" alt={title} />
      <div className="famous-content position-absolute">
        <h5>{title}</h5>
        <h6>{details}</h6>
        <p>{price}</p>
        <Link className="button">Comprar agora</Link>
      </div>
    </div>
  )
}

export default FamousCard
