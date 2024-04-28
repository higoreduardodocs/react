import { useState } from 'react'
import { Table, Modal } from 'antd'
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'

import FormProduct from '../../components/form/product'

const productsTableHeader = [
  {
    title: 'No',
    dataIndex: 'key',
  },
  {
    title: 'Nome',
    dataIndex: 'title',
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: 'Marca',
    dataIndex: 'brand',
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: 'Categoria',
    dataIndex: 'category',
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: 'Cores',
    dataIndex: 'color',
  },
  {
    title: 'Preço',
    dataIndex: 'price',
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: 'Ações',
    dataIndex: 'action',
  },
]

const CatalogProducts = () => {
  const [isForm, setIsForm] = useState(false)
  const [showModel, setShowModal] = useState(false)
  const productsTableData = []
  for (let i = 0; i < 20; i++) {
    productsTableData.push({
      key: i + 1,
      title: 'IPad Pro 14+',
      brand: 'Apple',
      category: 'Smartphone',
      color: 'Branco, Preto',
      price: 'R$1900.99',
      action: (
        <>
          <BiEdit
            onClick={() => setIsForm(true)}
            title="Editar"
            role="button"
            className="fs-6 text-dark me-3"
          />
          <AiFillDelete
            onClick={() => setShowModal(true)}
            title="Excluir"
            role="button"
            className="fs-6 text-danger"
          />
        </>
      ),
    })
  }
  const deleteItem = () => setShowModal(false)

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
        <h3 className="mb-4 title">Produtos</h3>
        {!isForm && (
          <button
            type="button"
            onClick={() => setIsForm(true)}
            className="border-0 px-3 py-1 text-white text-center text-decoration-none fs-6"
            style={{ background: '#febd69' }}
          >
            Adicionar
          </button>
        )}
      </div>
      {isForm && <FormProduct setIsForm={setIsForm} />}
      <div className="mt-4 overflow-auto">
        <div className="w-100">
          <Table columns={productsTableHeader} dataSource={productsTableData} />
        </div>
      </div>
      <Modal
        title="Confirmação"
        open={showModel}
        onOk={() => deleteItem()}
        onCancel={() => setShowModal(false)}
        okText="Confirmar"
        cancelText="Cancelar"
      >
        <p>Deseja realmente excluir este item?</p>
      </Modal>
    </div>
  )
}

export default CatalogProducts
