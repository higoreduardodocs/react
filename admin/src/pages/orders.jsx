import { useState } from 'react'
import { Table, Modal } from 'antd'
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'

const ordersTableHeader = [
  {
    title: 'No',
    dataIndex: 'key',
  },
  {
    title: 'Cliente',
    dataIndex: 'customer',
  },
  {
    title: 'Produtos',
    dataIndex: 'products',
  },
  {
    title: 'Total',
    dataIndex: 'amount',
  },
  {
    title: 'Data',
    dataIndex: 'date',
  },
  {
    title: 'Ações',
    dataIndex: 'action',
  },
]

const Orders = () => {
  const [showModel, setShowModal] = useState(false)
  const ordersTableData = []
  for (let i = 0; i < 30; i++) {
    ordersTableData.push({
      key: i,
      customer: `John Doe`,
      products: `Visualizar`,
      amount: `1000,00`,
      address: `São Paulo, SP Centro n. ${i} CEP: 123456-123`,
      date: new Date().toLocaleString(),
      action: (
        <>
          <BiEdit
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
      <h3 className="mb-4 title">Pedidos</h3>

      <div className="mt-4 overflow-auto">
        <div className="w-100">
          <Table columns={ordersTableHeader} dataSource={ordersTableData} />
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

export default Orders
