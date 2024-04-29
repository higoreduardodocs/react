/* eslint-disable react/prop-types */

import ReactStars from 'react-rating-stars-component'
import { Link } from 'react-router-dom'

import { currencyPrice } from '../utils/format'

const SpecialCard = ({
  cover,
  title,
  brand,
  stars,
  offerCreatedAt,
  offerDeadline,
  offer,
  price,
  stock,
  stockOffer,
}) => {
  const today = new Date()
  const offerDayCreatedAt = new Date(offerCreatedAt)
  const offerDayDeadlineAt = new Date(offerDeadline)
  const days = new Date(offerDayDeadlineAt - offerDayCreatedAt).getDate()
  const countdown = new Date(today - offerDayCreatedAt)
  const restStock = Math.round((stock / stockOffer) * 100)

  return (
    <div className="special-product-card d-sm-flex d-block justify-content-between">
      <div className="col-4">
        <img src={cover} className="img-fluid" alt={title} />
      </div>
      <div className="special-product-content col-7">
        <h5 className="brand">{brand}</h5>
        <h6 className="title">{title}</h6>
        <ReactStars
          count={5}
          size={24}
          value={stars}
          edit={false}
          activeColor="#ffd700"
        />
        <p className="price">
          <span className="red-p">{currencyPrice.format(offer)}</span> &nbsp;{' '}
          <strike>{currencyPrice.format(price)}</strike>
        </p>
        <div className="discount-till d-flex align-items-center gap-10">
          <p className="mb-0 me-3">
            <b>{days}&nbsp;</b>dias
          </p>
          <div className="d-flex gap-10 align-items-center">
            <span className="badge rounded-circle p-2 bg-danger">
              {countdown.getHours()}
            </span>
            :
            <span className="badge rounded-circle p-2 bg-danger">
              {countdown.getMinutes()}
            </span>
            :
            <span className="badge rounded-circle p-2 bg-danger">
              {countdown.getSeconds()}
            </span>
          </div>
        </div>
        <div className="prod-count my-3">
          <p>Unids restantes: {stock}</p>
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${restStock}%` }}
              aria-valuenow={stock}
              aria-valuemin="0"
              aria-valuemax={stockOffer}
            ></div>
          </div>
        </div>
        <Link className="button">Addiconar ao carrinho</Link>
      </div>
    </div>
  )
}

export default SpecialCard
