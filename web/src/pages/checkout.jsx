import { Link } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'

import { products } from '../utils/data'
import Container from '../components/container'

const Checkout = () => {
  return (
    <Container className="py-5">
      <div className="row">
        <div className="col-md-7 col-12">
          <h3 className="website-name">Finalizar compra</h3>
          <nav
            style={{ '--bs-breadcrumb-divider': '>' }}
            aria-label="breadcrumb"
          >
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link className="text-dark total-price" to="/carrinho">
                  Carrinho
                </Link>
              </li>
              &nbsp;/&nbsp;
              <li
                className="breadcrumb-ite total-price active"
                aria-current="page"
              >
                Informações
              </li>
              &nbsp;/&nbsp;
              <li className="breadcrumb-item total-price active">Frete</li>
              &nbsp;/&nbsp;
              <li
                className="breadcrumb-item total-price active"
                aria-current="page"
              >
                Pagamento
              </li>
            </ol>
          </nav>
          <h4 className="title total">Informações de contato</h4>
          <p className="user-details total">John Doe (johndoe@email.com)</p>
          <h4 className="mb-3">Endereço de entrega</h4>
          <form className="d-flex gap-2 flex-wrap justify-content-between">
            <div className="w-100">
              <select className="form-control form-select" value="">
                <option value="" disabled>
                  Selecionar Estado
                </option>
              </select>
            </div>
            <div className="flex-grow-1">
              <input
                type="text"
                placeholder="Nome completo"
                className="form-control"
              />
            </div>
            <div className="w-100">
              <input
                type="text"
                placeholder="Endereço"
                className="form-control"
              />
            </div>
            <div className="w-100">
              <input
                type="text"
                placeholder="Complemento"
                className="form-control"
              />
            </div>
            <div className="flex-grow-1">
              <input
                type="text"
                placeholder="Cidade"
                className="form-control"
              />
            </div>
            <div className="flex-grow-1">
              <input type="text" placeholder="CEP" className="form-control" />
            </div>
            <div className="w-100">
              <div className="d-flex justify-content-between align-items-center">
                <Link to="/carrinho" className="text-dark">
                  <BiArrowBack className="me-2" />
                  Retornar ao carrinho
                </Link>
                <Link to="/loja" className="button">
                  Continuar comprando
                </Link>
              </div>
            </div>
          </form>
        </div>

        <div className="col-md-5 col-12">
          <div className="border-bottom py-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="d-flex gap-2 mb-2 align-align-items-center"
              >
                <div className="d-flex gap-10">
                  <div className="w-25 position-relative">
                    <span
                      style={{ top: '-10px', right: '2px' }}
                      className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                    >
                      1
                    </span>
                    <img
                      src={products[0].thumbnail}
                      alt={products[0].title}
                      className="img-fluid"
                    />
                  </div>
                  <div>
                    <h5 className="total-price">{products[0].title}</h5>
                    <p className="total-price">Preço: {products[0].price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-bottom py-4">
            <div className="d-flex justify-content-between align-items-center">
              <p className="total">Subtotal</p>
              <p className="total-price">R$1000,00</p>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <p className="mb-0 total">Frete</p>
              <p className="mb-0 total-price">R$ 10,00</p>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center border-bootom py-4">
            <h4 className="total">Total</h4>
            <h5 className="total-price">R$ 1000,00</h5>
          </div>
          <Link to="/" className="button">
            Fazer pedido
          </Link>
        </div>
      </div>
    </Container>
  )
}

export default Checkout
