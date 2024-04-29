import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
  Inject,
} from '@syncfusion/ej2-react-grids'

import { ordersData, contextMenuItems, ordersGrid } from '../utils/orders-data'
import { Header } from '../widgets'

function Orders() {
  const editing = { allowDeleting: true, allowEditing: true }

  return (
    <section className="m-2 mt-10 p-4 dark:bg-secondary-dark-bg bg-light-gray dark:text-white">
      <Header category="Pages" title="Orders" />

      <div className="flex justify-center items-center">
        <GridComponent
          id="gridcomp"
          dataSource={ordersData}
          allowPaging
          allowSorting
          allowExcelExport
          allowPdfExport
          contextMenuItems={contextMenuItems}
          editSettings={editing}
        >
          <Inject
            services={[
              Resize,
              Sort,
              ContextMenu,
              Filter,
              Page,
              ExcelExport,
              Edit,
              PdfExport,
            ]}
          />
          <ColumnsDirective>
            {ordersGrid?.length > 0 &&
              ordersGrid.map((item, index) => (
                <ColumnDirective key={index} {...item} />
              ))}
          </ColumnsDirective>
        </GridComponent>
      </div>
    </section>
  )
}

export default Orders
