import { Link } from 'react-router-dom'
import { HiOutlineArrowLeft } from 'react-icons/hi'

import { blogs } from '../utils/data'
import Breadcrumb from '../components/breadcrumb'
import Container from '../components/container'

const Blog = () => {
  return (
    <>
      <Breadcrumb title={blogs[0].title} />
      <Container className="py-5">
        <div className="single-blog-card">
          <Link to="/blogs" className="d-flex align-items-center gap-10">
            <HiOutlineArrowLeft className="fs-4" />
            Retornar
          </Link>
          <h3 className="title">{blogs[0].title}</h3>
          <img
            src={blogs[0].image}
            alt={blogs[0].title}
            className="img-fluid w-100 my-4"
          />
          <p>{blogs[0].description}</p>
        </div>
      </Container>
    </>
  )
}

export default Blog
