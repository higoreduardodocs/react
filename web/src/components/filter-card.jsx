import ReactStars from 'react-rating-stars-component'

const FilterCard = () => {
  return (
    <>
      <div className="filter-card mb-3">
        <h3 className="filter-title">Categorias</h3>
        <div>
          <ul className="ps-0">
            <li>Watch</li>
            <li>Tv</li>
            <li>Camera</li>
            <li>Laptop</li>
          </ul>
        </div>
      </div>

      <div className="filter-card mb-3">
        <h3 className="filter-title">Filtrar por</h3>
        <div>
          <h5 className="sub-title">Avaliações</h5>
          <div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" />
              <label className="form-check-label">In Stock (1)</label>
            </div>
          </div>

          <h5 className="sub-title">Preço</h5>
          <div className="d-flex align-items-center gap-10">
            <div className="form-floating">
              <input type="number" className="form-control" />
              <label>De</label>
            </div>
            <div className="form-floating">
              <input type="number" className="form-control" />
              <label>Até</label>
            </div>
          </div>

          <h5 className="sub-title">Cores</h5>
          <div>
            <ul className="ps-0">
              <li>Watch</li>
              <li>Tv</li>
              <li>Camera</li>
              <li>Laptop</li>
            </ul>
          </div>

          <h5 className="sub-title">Tamanhos</h5>
          <div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" />
              <label className="form-check-label">In Stock (1)</label>
            </div>
          </div>
        </div>
      </div>

      <div className="filter-card mb-3">
        <h3 className="filter-title">Produtos</h3>
        <div>
          <div className="random-products mb-3 d-flex">
            <div className="w-50">
              <img
                src="/products/cover-watch.avif"
                className="img-fluid"
                alt="watch"
              />
            </div>
            <div className="w-50">
              <h5>Kids headphones bulk 10 pack multi colored for students</h5>
              <ReactStars
                count={5}
                size={24}
                value={4}
                edit={false}
                activeColor="#ffd700"
              />
              <b>R$ 300</b>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FilterCard
