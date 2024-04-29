import {
  KanbanComponent,
  ColumnsDirective,
  ColumnDirective,
} from '@syncfusion/ej2-react-kanban'

import { kanbanData, kanbanGrid } from '../utils/kanban-data'
import { Header } from '../widgets'

function Kanban() {
  return (
    <section className="m-2 mt-10 p-4 dark:bg-secondary-dark-bg bg-light-gray dark:text-white">
      <Header category="Apps" title="Kanban" />

      <div className="flex justify-center items-center">
        <KanbanComponent
          id="kanban"
          keyField="Status"
          dataSource={kanbanData}
          cardSettings={{ contentField: 'Summary', headerField: 'Id' }}
        >
          <ColumnsDirective>
            {kanbanGrid?.length > 0 &&
              kanbanGrid.map((item, index) => (
                <ColumnDirective key={index} {...item} />
              ))}
          </ColumnsDirective>
        </KanbanComponent>
      </div>
    </section>
  )
}

export default Kanban
