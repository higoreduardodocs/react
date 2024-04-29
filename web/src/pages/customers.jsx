import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Selection,
  Inject,
  Edit,
  Toolbar,
  Sort,
  Filter,
} from '@syncfusion/ej2-react-grids'

import { customersData, customersGrid } from '../utils/customers-data'
import { Header } from '../widgets'

function Customers() {
  const selectionsettings = { persistSelection: true }
  const toolbarOptions = ['Delete']
  const editing = { allowDeleting: true, allowEditing: true }

  return (
    <section className="m-2 mt-10 p-4 dark:bg-secondary-dark-bg bg-light-gray dark:text-white">
      <Header category="Pages" title="Customers" />

      <div className="flex justify-center items-center">
        <GridComponent
          dataSource={customersData}
          enableHover={false}
          allowPaging
          pageSettings={{ pageCount: 5 }}
          selectionSettings={selectionsettings}
          toolbar={toolbarOptions}
          editSettings={editing}
          allowSorting
        >
          <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
          <ColumnsDirective>
            {customersGrid?.length > 0 &&
              customersGrid.map((item, index) => (
                <ColumnDirective key={index} {...item} />
              ))}
          </ColumnsDirective>
        </GridComponent>
      </div>
    </section>
  )
}

export default Customers
