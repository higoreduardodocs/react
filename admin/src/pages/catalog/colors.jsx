import { useState } from 'react'
import { Table, Modal } from 'antd'
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'

import FormColor from '../../components/form/color'

const colorsTableHeader = [
  {
    title: 'No',
    dataIndex: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
]

const CatalogColors = () => {
  const [isForm, setIsForm] = useState(false)
  const [showModel, setShowModal] = useState(false)
  const colorsTableData = []
  for (let i = 0; i < 20; i++) {
    colorsTableData.push({
      key: i + 1,
      name: 'Branco',
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
        <h3 className="mb-4 title">Cores</h3>
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
      {isForm && <FormColor setIsForm={setIsForm} />}
      <div className="mt-4 overflow-auto">
        <div className="w-100">
          <Table columns={colorsTableHeader} dataSource={colorsTableData} />
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

export default CatalogColors
