import { blogs } from '../utils/data'
import Breadcrumb from '../components/breadcrumb'
import Container from '../components/container'
import FilterCard from '../components/filter-card'
import BlogCard from '../components/blog-card'

const Blogs = () => {
  return (
    <>
      <Breadcrumb title="Blogs" />
      <Container className="py-5">
        <div className="row">
          <div className="col-3 d-sm-block d-none">
            <FilterCard />
          </div>

          <div className="col-sm-9 col-12 row">
            {blogs?.length > 0 &&
              blogs.map((item, i) => (
                <div key={i} className="col-md-6 col-12 mb-3">
                  <BlogCard {...item} />
                </div>
              ))}
          </div>
        </div>
      </Container>
    </>
  )
}

export default Blogs
