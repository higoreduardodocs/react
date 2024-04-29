/* eslint-disable react/prop-types */

const WishlistCard = ({ thumbnail, title, price }) => {
  return (
    <div className="wishlist-card position-relative">
      <img src={thumbnail} alt={title} className="img-fluid w-100" />
      <div className="py-3 px-3">
        <h5 className="title">{title}</h5>
        <h6 className="price">{price}</h6>
      </div>
    </div>
  )
}

export default WishlistCard
