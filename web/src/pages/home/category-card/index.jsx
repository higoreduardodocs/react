/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

import './category-card.style.scss'

function CategoryCard({ card }) {
  return (
    <Link to="/gigs?cat=design">
      <div className="card">
        <img src={card.image} alt="" />
        <span className="description">{card.description}</span>
        <span className="title">{card.title}</span>
      </div>
    </Link>
  )
}
export default CategoryCard
