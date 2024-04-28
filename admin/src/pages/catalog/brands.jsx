import { useState } from 'react'
import { Table, Modal } from 'antd'
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'

import FormBrand from '../../components/form/brand'

const brandsTableHeader = [
  {
    title: 'No',
    dataIndex: 'key',
  },
  {
    title: 'Nome',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: 'Ações',
    dataIndex: 'action',
  },
]

const CatalogBrands = () => {
  const [isForm, setIsForm] = useState(false)
  const [showModel, setShowModal] = useState(false)
  const brandsTableData = []
  for (let i = 0; i < 20; i++) {
    brandsTableData.push({
      key: i + 1,
      name: 'Adidas',
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
        <h3 className="mb-4 title">Marcas</h3>
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
      {isForm && <FormBrand setIsForm={setIsForm} />}
      <div className="mt-4 overflow-auto">
        <div className="w-100">
          <Table columns={brandsTableHeader} dataSource={brandsTableData} />
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

export default CatalogBrands
