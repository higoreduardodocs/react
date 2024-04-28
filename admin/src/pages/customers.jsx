import { Table } from 'antd'

import { customerTableHeader, customerTableData } from '../utils/data'

const Customers = () => {
  return (
    <div>
      <h3 className="mb-4 title">Clientes</h3>

      <div className="mt-4 overflow-auto">
        <div className="w-100">
          <Table columns={customerTableHeader} dataSource={customerTableData} />
        </div>
      </div>
    </div>
  )
}

export default Customers
