/* eslint-disable react/prop-types */

import { Link } from 'react-router-dom'

const BlogCard = ({ image, title, slug, createdAt, description }) => {
  return (
    <div className="blog-card">
      <div className="card-image">
        <img src={image} className="img-fluid w-100" alt={title} />
      </div>

      <div className="blog-content">
        <p className="date">{createdAt}</p>
        <h5 className="title">{title}</h5>
        <p className="description">{description}</p>
        <Link to={`/blogs/${slug}`} className="button">
          Leia mais
        </Link>
      </div>
    </div>
  )
}

export default BlogCard
