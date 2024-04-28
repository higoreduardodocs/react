import { useState } from 'react'
import { Table, Modal } from 'antd'
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'

import BlogForm from '../../components/form/blog'

const blogsTableHeader = [
  {
    title: 'No',
    dataIndex: 'key',
  },
  {
    title: 'Nome',
    dataIndex: 'name',
  },
  {
    title: 'Categoria',
    dataIndex: 'category',
  },
  {
    title: 'Ações',
    dataIndex: 'action',
  },
]

BlogForm
const Blogs = () => {
  const [isForm, setIsForm] = useState(false)
  const [showModel, setShowModal] = useState(false)
  const blogsTableData = []
  for (let i = 0; i < 10; i++) {
    blogsTableData.push({
      key: i + 1,
      name: 'Texto',
      category: 'Sports',
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
        <h3 className="mb-4 title">Blogs</h3>
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
      {isForm && <BlogForm setIsForm={setIsForm} />}
      <div className="mt-4 overflow-auto">
        <div className="w-100">
          <Table columns={blogsTableHeader} dataSource={blogsTableData} />
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

export default Blogs
