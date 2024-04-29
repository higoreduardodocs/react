/* eslint-disable react/prop-types */

const CompareCard = ({
  thumbnail,
  title,
  price,
  brand,
  category,
  stock,
  colors,
  sizes,
}) => {
  return (
    <div className="compare-product-card position-relative">
      <img src={thumbnail} alt={title} className="img-fluid" />
      <div className="compare-product-details">
        <h5 className="title">{title}</h5>
        <h6 className="price mb-3 mt-3">Preço: {price}</h6>
        <div>
          <div className="product-detail">
            <h5>Marca:</h5>
            <p>{brand}</p>
          </div>
          <div className="product-detail">
            <h5>Categoria:</h5>
            <p>{category}</p>
          </div>
          <div className="product-detail">
            <h5>Estoque:</h5>
            <p>{stock}</p>
          </div>
          <div className="product-detail">
            <h5>Cores:</h5>
            {colors?.length > 0 && (
              <ul className="colors ps-0">
                {colors.map((item, i) => (
                  <li
                    title={item.title}
                    key={i}
                    style={{ background: item.hex }}
                  ></li>
                ))}
              </ul>
            )}
          </div>
          <div className="product-detail">
            <h5>Tamanhos:</h5>
            {sizes?.length > 0 && (
              <div className="d-flex gap-2">
                {sizes.map((item, i) => (
                  <p key={i}>{item}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompareCard
