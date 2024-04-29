import { Link } from 'react-router-dom'
import { TbGitCompare } from 'react-icons/tb'
import { AiOutlineHeart } from 'react-icons/ai'
import ReactImageZoom from 'react-image-zoom'
import ReactStars from 'react-rating-stars-component'

import { products } from '../utils/data'
import Breadcrumb from '../components/breadcrumb'
import Container from '../components/container'
import ProductCard from '../components/product-card'

const Product = () => {
  const orderedProduct = true

  const copyToClipboard = (text) => {
    var textField = document.createElement('textarea')
    textField.innerText = text
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
  }

  return (
    <>
      <Breadcrumb title="Produto" />

      {/* CONTENT */}
      <Container className="py-5">
        <div className="row">
          <div className="col-lg-6 col-md-7 col-12">
            <div className="main-product-image mb-2">
              <ReactImageZoom
                width={594}
                height={600}
                zoomWidth={600}
                img={products[0].thumbnail}
              />
            </div>

            <div className="other-product-images d-flex flex-wrap gap-2">
              <div className="col-5">
                <img
                  src={products[0].thumbnail}
                  className="img-fluid"
                  alt={products[0].title}
                />
              </div>
              <div className="col-5">
                <img
                  src={products[0].cover}
                  className="img-fluid"
                  alt={products[0].title}
                />
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-5 col-12">
            <div className="main-product-details">
              <h3 className="title border-bottom">{products[0].title}</h3>

              <div className="border-bottom py-3">
                <p className="price">{products[0].price}</p>
                <div className="d-flex align-items-center gap-1">
                  <ReactStars
                    count={5}
                    size={24}
                    value={products[0].stars}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p className="mb-0 t-review">( 2 Avaliações )</p>
                </div>
                <a className="review-btn" href="#">
                  Escrever uma avaliação
                </a>
              </div>

              <div className="py-3">
                <div className="d-flex gap-2 align-items-center my-2">
                  <h3 className="product-heading">Categoria:</h3>
                  <p className="product-data">{products[0].category}</p>
                </div>
                <div className="d-flex gap-2 align-items-center my-2">
                  <h3 className="product-heading">Marca:</h3>
                  <p className="product-data">{products[0].brand}</p>
                </div>
                <div className="d-flex gap-2 align-items-center my-2">
                  <h3 className="product-heading">Estoque:</h3>
                  <p className="product-data">{products[0].stock} unids</p>
                </div>
                <div className="d-flex gap-2 flex-column mt-2 mb-3">
                  <h3 className="product-heading">Tamanhos:</h3>
                  <div className="d-flex flex-wrap gap-2">
                    {products[0].sizes?.length > 0 &&
                      products[0].sizes.map((item, i) => (
                        <span
                          key={i}
                          className="badge border border-1 bg-white text-dark border-secondary"
                        >
                          {item}
                        </span>
                      ))}
                  </div>
                </div>
                <div className="d-flex gap-2 flex-column mt-2 mb-3">
                  <h3 className="product-heading">Cores:</h3>
                  <div className="d-flex flex-wrap gap-2">
                    {products[0].colors?.length > 0 &&
                      products[0].colors.map((item, i) => (
                        <span
                          key={i}
                          className="badge border border-1 bg-white text-dark border-secondary"
                        >
                          {item.title}
                        </span>
                      ))}
                  </div>
                  {products[0].colors?.length > 0 && (
                    <ul className="colors ps-0">
                      {products[0].colors.map((item, i) => (
                        <li
                          title={item.title}
                          key={i}
                          style={{ background: item.hex }}
                        ></li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="d-xl-flex d-block align-items-center gap-2 flex-row mt-2 mb-3">
                  <div className="d-flex gap-1 align-items-center mb-xl-0 mb-2">
                    <h3 className="product-heading">Quantidade:</h3>
                    <input
                      type="number"
                      min={1}
                      max={products[0].stock}
                      className="form-control"
                      style={{ width: '70px' }}
                    />
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <button
                      className="button border-0"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      type="button"
                    >
                      Adicionar ao carrinho
                    </button>
                    <button className="button border-0">Comprar agora</button>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center gap-2">
                <button type="button" className="button border-0">
                  <TbGitCompare className="fs-5 me-2" />
                  Comparar
                </button>
                <button type="button" className="button border-0">
                  <AiOutlineHeart className="fs-5 me-2" />
                  Favoritar
                </button>
              </div>
              <div className="d-flex gap-1 flex-column my-3">
                <h3 className="product-heading">Entregas e develuções:</h3>
                <p className="product-data">{products[0].shippingPolicy}</p>
              </div>
              <div className="d-flex gap-2 align-items-center my-3">
                <h3 className="product-heading">Link do produto:</h3>
                <button
                  type="button"
                  onClick={() => copyToClipboard(products[0].title)}
                  className="button border-0"
                >
                  Copiar produto
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* DESCRIPTION */}
      <Container className="description-wrapper py-5">
        <h4>Descrição</h4>
        <div className="bg-white p-3">
          <p>{products[0].description}</p>
        </div>
      </Container>

      {/* REVIEWS */}
      <Container className="reviews-wrapper py-5">
        <h3 id="review">Avaliações</h3>
        <div className="review-inner-wrapper">
          <div className="review-head d-sm-flex d-block mb-sm-0 mb-2 justify-content-between align-items-end">
            <div className="d-sm-flex d-block mb-sm-0 mb-2 align-items-center gap-2">
              <ReactStars
                count={5}
                size={24}
                value={products[0].stars}
                edit={false}
                activeColor="#ffd700"
              />
              <p className="mb-0">Baseada em 2 avaliações</p>
            </div>
            {orderedProduct && (
              <button type="button" className="button border-0">
                Fazer avaliação
              </button>
            )}
          </div>
          <div className="review-form py-4">
            <h4>Deixe sua avaliação</h4>
            <form className="d-flex flex-column gap-2">
              <ReactStars
                count={5}
                size={24}
                value={0}
                edit={true}
                activeColor="#ffd700"
              />
              <textarea
                className="w-100 form-control"
                cols="30"
                rows="4"
                placeholder="Insira um commentário"
              ></textarea>
              <button className="button border-0 align-self-end">
                Enviar avaliação
              </button>
            </form>
          </div>
          <div className="reviews mt-4">
            <div className="review">
              <div className="d-flex gap-1 align-items-center">
                <h6 className="mb-0">John Doe</h6>
                <ReactStars
                  count={5}
                  size={24}
                  value={4}
                  edit={false}
                  activeColor="#ffd700"
                />
              </div>
              <p className="mt-3">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Consectetur fugit ut excepturi quos. Id reprehenderit voluptatem
                placeat consequatur suscipit ex. Accusamus dolore quisquam
                deserunt voluptate, sit magni perspiciatis quas iste?
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* POPULAR PRODUCTS */}
      <Container className="popular-wrapper py-5 home-wrapper-2">
        <h3 className="section-heading">Mais populares</h3>
        <div className="row">
          {products.map((item, i) => (
            <div key={i} className="col-lg-3 col-md-4 col-sm-6 col-12">
              <ProductCard {...item} />
            </div>
          ))}
        </div>
      </Container>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header py-2 px-2 border-0">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="close"
                role="button"
              ></button>
            </div>

            <div className="modal-body py-0">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 w-50">
                  <img
                    src={products[0].thumbnail}
                    alt={products[0].title}
                    className="img-fluid"
                  />
                </div>
                <div className="d-flex flex-column flex-grow-1 w-50">
                  <h6 className="mb-3">{products[0].title}</h6>
                  <p className="mb-1">Quantidade: 1</p>
                  <p className="mb-1">Cor: Preta</p>
                  <p className="mb-1">Tamanho: S</p>
                </div>
              </div>
            </div>

            <div className="modal-footer border-0 py-0 justify-content-center gap-3">
              <button
                type="button"
                className="button border-0"
                data-bs-dismiss="modal"
              >
                Ir ao carrinho
              </button>
              <button type="button" className="button border-0">
                Finalizar compra
              </button>
            </div>

            <div className="d-flex justify-content-center py-3">
              <Link to="/" className="text-dark text-decoration-underline">
                Continuar comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Product
