import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Page,
} from '@syncfusion/ej2-react-grids'

import { employeesData, employeesGrid } from '../utils/employees-data'
import { Header } from '../widgets'

function Employees() {
  const editing = { allowDeleting: true, allowEditing: true }
  const toolbarOptions = ['Search']

  return (
    <section className="m-2 mt-10 p-4 dark:bg-secondary-dark-bg bg-light-gray dark:text-white">
      <Header category="Pages" title="Employees" />

      <div className="flex justify-center items-center">
        <GridComponent
          dataSource={employeesData}
          width="auto"
          allowPaging
          allowSorting
          pageSettings={{ pageCount: 5 }}
          editSettings={editing}
          toolbar={toolbarOptions}
        >
          <Inject services={[Search, Page]} />
          <ColumnsDirective>
            {employeesGrid?.length > 0 &&
              employeesGrid.map((item, index) => (
                <ColumnDirective key={index} {...item} />
              ))}
          </ColumnsDirective>
        </GridComponent>
      </div>
    </section>
  )
}

export default Employees
