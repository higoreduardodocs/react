import { useState } from 'react'
import { Table, Modal } from 'antd'
import { AiFillDelete } from 'react-icons/ai'

const shippingTableHeader = [
  {
    title: 'No',
    dataIndex: 'key',
  },
  {
    title: 'Nome',
    dataIndex: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'WhatsApp',
    dataIndex: 'mobile',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },

  {
    title: 'Ações',
    dataIndex: 'action',
  },
]

const Shipping = () => {
  const [showModel, setShowModal] = useState(false)
  const shippingTableData = []
  for (let i = 0; i < 30; i++) {
    shippingTableData.push({
      key: i + 1,
      name: `John Doe`,
      email: `johndoe@email.com`,
      mobile: `(11) 9 9999-9999`,
      status: (
        <>
          <select defaultValue="submitted" className="form-control form-select">
            <option value="submitted">Enviado</option>
            <option value="contacted">Em preparo</option>
            <option value="in-progress">Em transporte</option>
            <option value="resolved">Entregue</option>
          </select>
        </>
      ),

      action: (
        <>
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
      <h3 className="mb-4 title">Entregas</h3>

      <div className="mt-4 overflow-auto">
        <div className="w-100">
          <Table columns={shippingTableHeader} dataSource={shippingTableData} />
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

export default Shipping
