import { BsArrowDownRight, BsArrowUpRight } from 'react-icons/bs'
import { Column } from '@ant-design/plots'
import { Table } from 'antd'

import {
  dashboardColumn,
  dashboardTableHeader,
  dashboardTableData,
} from '../utils/data'

const Dashboard = () => {
  return (
    <div>
      <h3 className="mb-4 title">Painel</h3>
      <div className="row justify-content-between align-items-center">
        <div className="col-md-4 col-12 mb-3 mb-md-0">
          <div className="p-3 bg-white d-flex justify-content-between align-items-end">
            <div>
              <p className="desc">Vendas</p>
              <h4 className="mb-0 sub-title">R$1100</h4>
            </div>
            <div className="d-flex flex-column align-items-end">
              <h6>
                <BsArrowDownRight />
                &nbsp;32%
              </h6>
              <p className="mb-0 desc">no mês</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 col-12 mb-3 mb-md-0">
          <div className="p-3 bg-white d-flex justify-content-between align-items-end">
            <div>
              <p className="desc">Devoluções</p>
              <h4 className="mb-0 sub-title">18</h4>
            </div>
            <div className="d-flex flex-column align-items-end">
              <h6>
                <BsArrowDownRight />
                &nbsp;95%
              </h6>
              <p className="mb-0 desc">no mês</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 col-12">
          <div className="p-3 bg-white d-flex justify-content-between align-items-end">
            <div>
              <p className="desc">Devoluções</p>
              <h4 className="mb-0 sub-title">18</h4>
            </div>
            <div className="d-flex flex-column align-items-end">
              <h6 className="green">
                <BsArrowUpRight />
                &nbsp;32%
              </h6>
              <p className="mb-0 desc">no mês</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 overflow-auto">
        <h3 className="mb-5 title">Vendas mensais</h3>
        <div className="w-100">
          <Column {...dashboardColumn} />
        </div>
      </div>

      <div className="mt-4 overflow-auto">
        <h3 className="mb-5 title">Pedidos hoje</h3>
        <div className="w-100">
          <Table
            columns={dashboardTableHeader}
            dataSource={dashboardTableData}
          />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
