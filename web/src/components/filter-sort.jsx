/* eslint-disable react/prop-types */

const FilterSort = ({ setProductGrid }) => {
  return (
    <div className="mb-4 d-flex justify-content-between align-items-center">
      <div className="d-flex flex-wrap align-items-center gap-2">
        <p className="col-6 mb-0 d-block" style={{ width: '100px' }}>
          Ordernar por:
        </p>
        <select
          defaultValue="popular"
          className="col-6 form-control form-select"
        >
          <option value="popular">Queridinho</option>
          <option value="mais-vendidos">Mais vendidos</option>
          <option value="ordem-az">Ordem A-Z</option>
          <option value="ordem-za">Ordem Z-A</option>
          <option value="mais-barato">Mais barato</option>
          <option value="mais-caro">Mais caro</option>
          <option value="lancamentos">Lançamentos</option>
          <option value="mais-antigos">Mais antigos</option>
        </select>
      </div>

      <div className="d-lg-flex d-none align-items-center gap-2">
        <p className="mb-0">21 Produtos</p>

        <div className="d-flex gap-1 align-items-center grid">
          <img
            src="/icons/grid-4.svg"
            onClick={() => setProductGrid(3)}
            className="d-block img-fluid cursor-pointer p-2"
            role="button"
            style={{ height: '30px' }}
            alt="Grid"
          />
          <img
            src="/icons/grid-3.svg"
            onClick={() => setProductGrid(4)}
            className="d-block img-fluid cursor-pointer p-2"
            role="button"
            style={{ height: '30px' }}
            alt="Grid"
          />
          <img
            src="/icons/grid-2.svg"
            onClick={() => setProductGrid(6)}
            className="d-block img-fluid cursor-pointer p-2"
            role="button"
            style={{ height: '30px' }}
            alt="Grid"
          />
          <img
            src="/icons/grid.svg"
            onClick={() => setProductGrid(12)}
            className="d-block img-fluid cursor-pointer p-2"
            role="button"
            style={{ height: '30px' }}
            alt="Grid"
          />
        </div>
      </div>
    </div>
  )
}

export default FilterSort
