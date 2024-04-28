import { useState } from 'react'
import { Table, Modal } from 'antd'
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'

import FormCoupon from '../components/form/coupon'

const couponsTableHeader = [
  {
    title: 'No',
    dataIndex: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: 'Desconto',
    dataIndex: 'discount',
    sorter: (a, b) => a.discount - b.discount,
  },
  {
    title: 'Data expiração',
    dataIndex: 'expiry',
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: 'Ações',
    dataIndex: 'action',
  },
]

const Coupons = () => {
  const [isForm, setIsForm] = useState(false)
  const [showModel, setShowModal] = useState(false)
  const couponsTableData = []
  for (let i = 0; i < 30; i++) {
    couponsTableData.push({
      key: i,
      name: `Cupom ${i + 1}`,
      discount: `10%`,
      expiry: new Date().toLocaleString(),
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
        <h3 className="mb-4 title">Cupons</h3>
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
      {isForm && <FormCoupon setIsForm={setIsForm} />}
      <div className="mt-4 overflow-auto">
        <div className="w-100">
          <Table columns={couponsTableHeader} dataSource={couponsTableData} />
        </div>
      </div>
      <Modal
        title="Confirmação"
        open={showModel}
        onOk={() => deleteItem()}
        onCancel={() => setShowModal(false)}
        okText="Confirmar"
        cancelText="Cancela"
      >
        <p>Deseja realmente excluir este item?</p>
      </Modal>
    </div>
  )
}

export default Coupons
