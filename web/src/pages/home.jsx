import { Link } from 'react-router-dom'
import Marquee from 'react-fast-marquee'

import {
  services,
  categories,
  famous,
  products,
  brands,
  blogs,
} from '../utils/data'
import Container from '../components/container'
import FamousCard from '../components/famous-card'
import ProductCard from '../components/product-card'
import SpecialCard from '../components/special-card'
import BlogCard from '../components/blog-card'

const Home = () => {
  return (
    <main>
      {/* HERO */}
      <Container className="home-hero py-5">
        <div className="d-flex flex-wrap align-items-center justify-content-between">
          <div className="col-md-6 col-12 p-2">
            <div className="main-banner position-relative">
              <img
                src="/images/banner.jpg"
                className="img-fluid"
                alt="Banner"
              />
              <div className="main-banner-content position-absolute">
                <h4>Lançamento última geração</h4>
                <h5>iPad S13+ Pro.</h5>
                <p>
                  De <s>R$999.00</s> por R$41.62/mês.
                </p>
                <Link className="button">Comprar agora</Link>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-12">
            <div className="d-flex flex-wrap justify-content-between align-items-center">
              <Link
                to="/"
                className="text-dark col-6 small-banner position-relative p-2"
              >
                <img
                  src="images/small-banner-1.jpg"
                  className="img-fluid"
                  alt="Banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>Melhor oferta</h4>
                  <h5>iPad S13+ Pro.</h5>
                  <p className="d-none d-sm-block">Apenas R$41.62/mês</p>
                </div>
              </Link>

              <Link
                to="/"
                className="text-dark col-6 small-banner position-relative p-2"
              >
                <img
                  src="images/small-banner-2.jpg"
                  className="img-fluid"
                  alt="Banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>Novos</h4>
                  <h5>Smart Pad Air</h5>
                  <p className="d-none d-sm-block">Apenas $41.62/mês</p>
                </div>
              </Link>

              <Link
                to="/"
                className="text-dark col-6 small-banner position-relative p-2"
              >
                <img
                  src="images/small-banner-3.jpg"
                  className="img-fluid"
                  alt="Banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>Ultra rápidos</h4>
                  <h5>Tablet IPad Air</h5>
                  <p className="d-none d-sm-block">Apenas $41.62/mês</p>
                </div>
              </Link>

              <Link
                to="/"
                className="text-dark col-6 small-banner position-relative p-2"
              >
                <img
                  src="images/small-banner-4.jpg"
                  className="img-fluid"
                  alt="Banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>Tecnológico</h4>
                  <h5>Headphone Air</h5>
                  <p className="d-none d-sm-block">Apenas R$41.62/mês</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </Container>

      {/* SERVICES */}
      <Container className="py-5 home-services">
        <div className="d-flex flex-wrap gap-4 align-items-center justify-content-center">
          {services?.map((item, i) => {
            return (
              <div
                key={i}
                className="d-flex align-items-center justify-content-center gap-2"
              >
                <img src={item.image} alt="Services" />
                <h6>{item.title}</h6>
              </div>
            )
          })}
        </div>
      </Container>

      {/* CATEGORIES */}
      <Container className="py-5 home-categories">
        <div className="categories d-flex flex-wrap gap-4 align-items-center justify-content-center">
          {categories?.map((item, i) => {
            return (
              <Link
                to={`/categorias/${item.url}`}
                key={i}
                className="text-dark d-flex col-lg-2 col-md-4 col-sm-6 col-12 gap-2 align-items-center"
              >
                <div>
                  <h6>{item.title}</h6>
                  <p>{item.count} Items</p>
                </div>
                <img src={item.image} alt={item.title} />
              </Link>
            )
          })}
        </div>
      </Container>

      {/* FEATUREDS */}
      <Container className="featured-wrapper py-5">
        <h3 className="section-heading">Lançamentos</h3>
        <div className="row">
          {products.map((item, i) => (
            <div key={i} className="col-lg-3 col-md-4 col-sm-6 col-12">
              <ProductCard {...item} />
            </div>
          ))}
        </div>
      </Container>

      {/* FAMOUS */}
      <Container className="py-5 home-famous">
        <div className="d-flex flex-wrap align-items-center justify-content-center">
          {famous.map((item, i) => (
            <div key={i} className="col-lg-3 col-md-4 col-sm-6 col-12">
              <FamousCard {...item} />
            </div>
          ))}
        </div>
      </Container>

      {/* OFFERS */}
      <Container className="py-5 home-specials">
        <h3 className="section-heading">Ofertas</h3>
        <div className="row">
          <div className="row">
            {products.map((item, i) => (
              <div key={i} className="col-md-6 col-12">
                <SpecialCard {...item} />
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* POPULAR */}
      <Container className="home-popular py-5">
        <h3 className="section-heading">Queridinhos</h3>
        <div className="row">
          {products.map((item, i) => (
            <div key={i} className="col-lg-3 col-md-4 col-sm-6 col-12">
              <ProductCard {...item} />
            </div>
          ))}
        </div>
      </Container>

      {/* BRANDS */}
      <Container className="home-brands py-5">
        <div className="row">
          <Marquee className="d-flex">
            {brands.map((item, i) => (
              <div key={i} className="mx-4 w-25">
                <img src={item.image} alt={item.title} />
              </div>
            ))}
          </Marquee>
        </div>
      </Container>

      {/* BLOG */}
      <Container className="home-blog py-5">
        <h3 className="section-heading">Últimos posts</h3>
        <div className="row">
          {blogs.map((item, i) => (
            <div key={i} className="col-lg-3 col-md-4 col-sm-6 col-12">
              <BlogCard {...item} />
            </div>
          ))}
        </div>
      </Container>
    </main>
  )
}

export default Home
