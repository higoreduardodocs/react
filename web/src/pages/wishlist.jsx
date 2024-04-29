import { products } from '../utils/data'
import Breadcrumb from '../components/breadcrumb'
import Container from '../components/container'
import WishlistCard from '../components/wishlist-card'

const Wishlist = () => {
  return (
    <>
      <Breadcrumb title="Favoritos" />
      <Container className="py-5">
        <div className="row">
          {products?.length > 0 &&
            products.map((item, i) => (
              <div key={i} className="col-3">
                <WishlistCard {...item} />
              </div>
            ))}
        </div>
      </Container>
    </>
  )
}

export default Wishlist
