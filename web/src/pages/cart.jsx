import { AiFillDelete } from 'react-icons/ai'
import { Link } from 'react-router-dom'

import { products } from '../utils/data'
import Breadcrumb from '../components/breadcrumb'
import Container from '../components/container'

const Cart = () => {
  return (
    <>
      <Breadcrumb title="Carrinho" />
      <Container className="cart-wrapper py-5">
        <div className="row">
          <div className="col-12">
            <div className="cart-header py-3 d-flex justify-content-between align-items-center">
              <h4 className="col-8">Produto</h4>
              <h4 className="col-4 d-sm-block d-none">Total</h4>
            </div>
            <div className="cart-data py-3 mb-2 row justify-content-between align-items-center">
              <div className="col-sm-8 col-12 gap-2 d-flex align-items-center">
                <div className="w-25">
                  <img
                    src={products[0].thumbnail}
                    alt={products[0].title}
                    className="img-fluid"
                  />
                </div>
                <div className="w-75">
                  <p>{products[0].title}</p>
                  <p>Tamanho: S</p>
                  <p>Cor: Preto</p>
                  <h5 className="price">Preço: {products[0].price}</h5>
                </div>
              </div>
              <div className="col-sm-4 col-12">
                <h5 className="price">Total: {products[0].price}</h5>
                <div className="d-flex align-items-center gap-2">
                  <input
                    className="form-control"
                    type="number"
                    min={1}
                    max={products[0].stock}
                    placeholder="Quantidade"
                  />
                  <AiFillDelete className="text-danger " />
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 py-2 mt-4">
            <div className="d-md-flex d-block justify-content-between align-items-baseline">
              <Link to="/loja" className="button">
                Continuar comprando
              </Link>
              <div className="d-flex flex-column align-items-end">
                <h4>SubTotal: {products[0].price}</h4>
                <p>O cálculo de frete é realizado no pagamento</p>
                <Link to="/finalizar-compra" className="button">
                  Finalizar compra
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Cart
